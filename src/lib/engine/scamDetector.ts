import {
  Language,
  RiskLevel,
  RuleCategory,
  ScamAnalysisResult,
  WarningIndicator,
} from './types';
import { SCAM_RULES } from './rules';
import { extractUrlsFromText, analyzeUrl } from './urlDetector';

/**
 * Normalizes input text and sanitizes special invisible unicode characters
 */
function sanitizeInput(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces often used to bypass filters
    .trim();
}

/**
 * Checks if a message resembles a standard legitimate automated bank debited/credited notification
 */
function isLegitimateBankNotification(text: string, urlsCount: number): boolean {
  if (urlsCount > 0) return false; // Genuine automated alert SMS from Indian banks rarely include suspicious raw URLs

  const legitPatterns = [
    /\b(?:debited|credited)\b.{0,30}\b(?:a\/c|account)\s*(?:no\.?)?\s*x+[0-9]+/i,
    /\b(?:avl|avail|available)\s*(?:bal|balance)\b/i,
    /\b(?:sms\s*block|call\s*1800|toll\s*free)\b/i,
    /\bupi\s*ref\s*(?:no|num)?\s*[0-9]+/i,
  ];

  let matches = 0;
  for (const p of legitPatterns) {
    if (p.test(text)) matches++;
  }
  return matches >= 2;
}

/**
 * Primary Explainable Scam Analysis Engine for ScamShield Bharat
 */
export function analyzeContent(rawInput: string): ScamAnalysisResult {
  const input = sanitizeInput(rawInput);
  const now = new Date().toISOString();

  // Edge Case: Empty or whitespace
  if (!input) {
    return {
      input: '',
      inputType: 'message',
      score: 0,
      riskLevel: 'LOW',
      citizenCategory: 'NO_OBVIOUS_WARNINGS',
      categoryDescription: {
        en: 'We did not find clear warning signs in this check. This does not mean the message or website is guaranteed to be safe.',
        hi: 'इस जांच में हमें कोई स्पष्ट चेतावनी संकेत नहीं मिले। इसका यह मतलब बिल्कुल नहीं है कि यह संदेश या वेबसाइट पूरी तरह सुरक्षित होने की गारंटी है।',
        gu: 'આ તપાસમાં અમને કોઈ સ્પષ્ટ ચેતવણી સંકેતો મળ્યા નથી. આનો અર્થ એ નથી કે મેસેજ કે વેબસાઇટ સંપૂર્ણપણે સુરક્ષિત હોવાની ખાતરી છે.',
        bn: 'এই পরীক্ষায় স্পষ্ট কোনো সতর্কবার্তা পাওয়া যায়নি। তবে এর অর্থ এই নয় যে বার্তাটি সম্পূর্ণ নিরাপদ।',
        mr: 'या तपासणीत कोणतेही स्पष्ट चेतावणीचे संकेत आढळले नाहीत. याचा अर्थ असा नाही की संदेश सुरक्षित असल्याची हमी आहे.',
        te: 'ఈ తనిખీలో స్పష్టమైన హెచ్చరిక సంకేతాలు ఏవీ కనిపించలేదు. అయితే ఇది సందేశం సురಕ್ಷితమని హామీ ఇవ్వదు.',
        ta: 'இந்த சோதனையில் தெளிவான எச்சரிக்கை அறிகுறிகள் எதுவும் காணப்படவில்லை. எனினும் செய்தி முற்றிலும் பாதுகாப்பானது என்று உத்தரவாதம் இல்லை.',
        kn: 'ಈ ತಪಾಸಣೆಯಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೆ ಇದು ಸಂದೇಶ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವೆಂದು ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ.',
      },
      summary: {
        en: 'No input provided to analyze.',
        hi: 'विश्लेषण के लिए कोई टेक्स्ट या लिंक नहीं दिया गया है।',
        gu: 'વિશ્લેષણ માટે કોઈ ટેક્સ્ટ કે લિંક આપવામાં આવી નથી.',
        bn: 'বিশ্লেষণ করার জন্য কোনো টেক্সট বা লিঙ্ক প্রদান করা হয়নি।',
        mr: 'विश्लेषणासाठी कोणताही मजकूर किंवा लिंक दिलेली नाही.',
        te: 'విశ్లేషణ కోసం టెక్స్ట్ లేదా లింక్ అందించబడలేదు.',
        ta: 'பகுப்பாய்வு செய்ய எந்த உரையும் அல்லது இணைப்பும் வழங்கப்படவில்லை.',
        kn: 'ವಿಶ್ಲೇಷಿಸಲು ಯಾವುದೇ ಪಠ್ಯ ಅಥವಾ ಲಿಂಕ್ ನೀಡಿಲ್ಲ.',
      },
      warnings: [],
      categoryScores: {
        urgency: 0,
        impersonation: 0,
        credential: 0,
        financial: 0,
        remote_access: 0,
        suspicious_link: 0,
      },
      urlsFound: [],
      recommendedActions: {
        en: ['Paste a message, SMS, email, or URL into the analyzer to inspect for fraud.'],
        hi: ['धोखाधड़ी की जांच के लिए कोई संदेश, एसएमएस, ईमेल या लिंक पेस्ट करें।'],
        gu: ['છેતરપિંડીની તપાસ કરવા માટે કોઈ મેસેજ, SMS, ઈમેઇલ કે લિંક પેસ્ટ કરો.'],
        bn: ['প্রতারণার পরীক্ষার জন্য একটি বার্তা, এসএমএস, ইমেল বা লিঙ্ক পেস্ট করুন।'],
        mr: ['फसवणुकीची तपासणी करण्यासाठी संदेश, एसएमएस, ईमेल किंवा लिंक पेस्ट करा.'],
        te: ['మోసాన్ని తనిఖీ చేయడానికి సందేశం, SMS, ఇమెయిల్ లేదా లింక్‌ను ఇక్కడ పేస్ట్ చేయండి.'],
        ta: ['மோசடி சோதிக்க ஒரு செய்தி, எஸ்எம்எஸ், மின்னஞ்சல் அல்லது இணைப்பை ஒட்டவும்.'],
        kn: ['ವಂಚನೆ ಪರೀಕ್ಷಿಸಲು ಸಂದೇಶ, SMS, ಇಮೇಲ್ ಅಥವಾ ಲಿಂಕ್ ಅನ್ನು ಅಂಟಿಸಿ.'],
      },
      disclaimer: {
        en: 'This tool uses explainable security heuristics to detect patterns of fraud. It does not access private accounts.',
        hi: 'यह टूल ज्ञात धोखाधड़ी पैटर्न को पहचानने के लिए सुरक्षा नियमों का उपयोग करता है। यह किसी निजी खाते तक नहीं पहुंचता।',
        gu: 'આ ટૂલ જાણીતી છેતરપિંડી પેટર્ન શોધવા માટે સુરક્ષા નિયમોનો ઉપયોગ કરે છે.',
        bn: 'এই সরঞ্জামটি প্রতারণার ধরণ সনাক্ত করতে সুরক্ষা নিয়ম ব্যবহার করে। এটি ব্যক্তিগত অ্যাকাউন্ট অ্যাক্সেস করে না।',
        mr: 'हे साधन फसवणुकीचे प्रकार शोधण्यासाठी सुरक्षा नियम वापरते. हे खाजगी खात्यांमध्ये प्रवेश करत नाही.',
        te: 'ఈ సాధనం మోసపూరిత విధానాలను గుర్తించడానికి భద్రతా నియమాలను ఉపయోగిస్తుంది.',
        ta: 'இந்த கருவி மோசடி முறைகளைக் கண்டறிய பாதுகாப்பு விதிகளைப் பயன்படுத்துகிறது.',
        kn: 'ಈ ಉಪಕರಣವು ವಂಚನೆಯ ಮಾದರಿಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಬಳಸುತ್ತದೆ.',
      },
      analyzedAt: now,
      detectionMode: 'rule_engine',
    };
  }

  // 1. URL Extraction & URL Heuristic Analysis
  const extractedUrls = extractUrlsFromText(input);
  const urlDetails = extractedUrls.map((u) => analyzeUrl(u));
  const hasPureUrlInput = input.startsWith('http://') || input.startsWith('https://') || (extractedUrls.length === 1 && input === extractedUrls[0]);
  const inputType = hasPureUrlInput ? 'url' : extractedUrls.length > 0 ? 'mixed' : 'message';

  const warnings: WarningIndicator[] = [];
  const categoryScores: Record<RuleCategory, number> = {
    urgency: 0,
    impersonation: 0,
    credential: 0,
    financial: 0,
    remote_access: 0,
    suspicious_link: 0,
  };

  // 2. Evaluate URL-Specific Threat Indicators
  for (const urlItem of urlDetails) {
    if (urlItem.isLookalike) {
      warnings.push({
        id: `URL_LOOKALIKE_${urlItem.domain}`,
        category: 'suspicious_link',
        severity: 'critical',
        weight: 35,
        title: {
          en: `Lookalike Phishing Domain (${urlItem.domain})`,
          hi: `फर्जी / मिलता-जुलता डोमेन (${urlItem.domain})`,
          gu: `બનાવટી / મળતું-આવતું ડોમેન (${urlItem.domain})`,
        },
        explanation: {
          en: urlItem.lookalikeDetails || `The domain impersonates ${urlItem.targetBrand || 'a trusted entity'} on an unofficial host.`,
          hi: `यह डोमेन अनौपचारिक वेबसाइट पर ${urlItem.targetBrand || 'विश्वसनीय संस्था'} की नकल कर रहा है।`,
          gu: `આ ડોમેન બિનસત્તાવાર વેબસાઇટ પર ${urlItem.targetBrand || 'વિશ્વસનીય સંસ્થા'} ની નકલ કરે છે.`,
        },
        matchedPatterns: [urlItem.domain],
      });
      categoryScores.suspicious_link += 35;
    }

    if (urlItem.isIpAddress) {
      warnings.push({
        id: `URL_RAW_IP_${urlItem.domain}`,
        category: 'suspicious_link',
        severity: 'critical',
        weight: 30,
        title: {
          en: 'Direct Raw IP Address Used',
          hi: 'सीधे IP एड्रेस का उपयोग',
          gu: 'ડાયરેક્ટ IP એડ્રેસનો ઉપયોગ',
        },
        explanation: {
          en: 'Hosting on a raw IP address is heavily correlated with malicious temporary phishing infrastructure.',
          hi: 'वेबसाइट के लिए सीधे आईपी एड्रेस का उपयोग आमतौर पर फर्जी और अस्थायी फिशिंग साइटों में होता है।',
          gu: 'વેબસાઇટ માટે સીધા IP એડ્રેસનો ઉપયોગ સામાન્ય રીતે અસ્થાયી ફિશિંગ સાઇટ્સમાં થાય છે.',
        },
        matchedPatterns: [urlItem.domain],
      });
      categoryScores.suspicious_link += 30;
    }

    if (urlItem.hasSuspiciousExtension) {
      warnings.push({
        id: `URL_APK_EXEC_${urlItem.domain}`,
        category: 'remote_access',
        severity: 'critical',
        weight: 35,
        title: {
          en: 'Direct Download of Executable/APK File',
          hi: 'अज्ञात APK या एप्लिकेशन फ़ाइल डाउनलोड',
          gu: 'અજાણી APK અથવા એપ્લિકેશન ફાઇલ ડાઉનલોડ',
        },
        explanation: {
          en: 'The link prompts direct download of an application (.apk/.exe). Banks never distribute security updates via raw APK links.',
          hi: 'यह लिंक सीधे मोबाइल एप्लिकेशन (.apk) डाउनलोड करवाता है। बैंक कभी भी अनधिकृत लिंक से सुरक्षा ऐप नहीं भेजते।',
          gu: 'આ લિંક સીધી એપ્લિકેશન (.apk) ડાઉનલોડ કરાવે છે. બેંકો ક્યારેય લિંક દ્વારા APK મોકલતી નથી.',
        },
        matchedPatterns: [urlItem.cleanedUrl],
      });
      categoryScores.remote_access += 35;
    }

    if (urlItem.isShortener) {
      warnings.push({
        id: `URL_SHORTENER_${urlItem.domain}`,
        category: 'suspicious_link',
        severity: 'medium',
        weight: 20,
        title: {
          en: `URL Shortener Masking Destination (${urlItem.domain})`,
          hi: `असली पता छिपाने वाला URL शॉर्टनर (${urlItem.domain})`,
          gu: `અસલી એડ્રેસ છુપાવતું URL શોર્ટનર (${urlItem.domain})`,
        },
        explanation: {
          en: 'Shortened URLs mask the true destination server. Phishers use shorteners to bypass SMS filtering engines.',
          hi: 'शॉर्टनर लिंक से अंतिम वेबसाइट का पता छिप जाता है। ठग अक्सर एसएमएस फिल्टर से बचने के लिए इसे प्रयोग करते हैं।',
          gu: 'શોર્ટનર લિંકથી અસલી વેબસાઇટ છુપાઈ જાય છે. છેતરપિંડી કરનારા ફિલ્ટરથી બચવા તેનો ઉપયોગ કરે છે.',
        },
        matchedPatterns: [urlItem.domain],
      });
      categoryScores.suspicious_link += 20;
    }

    if (urlItem.hasSuspiciousTld) {
      warnings.push({
        id: `URL_SUSPICIOUS_TLD_${urlItem.domain}`,
        category: 'suspicious_link',
        severity: 'medium',
        weight: 20,
        title: {
          en: `High-Risk Top-Level Domain Extension`,
          hi: `उच्च-जोखिम वाला डोमेन एक्सटेंशन`,
          gu: `ઉચ્ચ-જોખમ ધરાવતું ડોમેન એક્સ્ટેન્શન`,
        },
        explanation: {
          en: `The domain uses an extension (.${urlItem.domain.split('.').pop()}) disproportionately registered by scam syndicates.`,
          hi: `इस डोमेन का एक्सटेंशन साइबर अपराधियों द्वारा धोखाधड़ी अभियानों के लिए बहुतायत में खरीदा जाता है।`,
          gu: `આ ડોમેન એક્સ્ટેન્શન સાયબર અપરાધીઓ દ્વારા છેતરપિંડી માટે મોટા પ્રમાણમાં વાપરવામાં આવે છે.`,
        },
        matchedPatterns: [urlItem.domain],
      });
      categoryScores.suspicious_link += 20;
    }

    if (!urlItem.isHttps) {
      warnings.push({
        id: `URL_INSECURE_HTTP_${urlItem.domain}`,
        category: 'suspicious_link',
        severity: 'low',
        weight: 10,
        title: {
          en: 'Unencrypted Connection (HTTP)',
          hi: 'असुरक्षित कनेक्शन (HTTP)',
          gu: 'અસુરક્ષિત જોડાણ (HTTP)',
        },
        explanation: {
          en: 'The site does not use HTTPS encryption. Legitimate financial or administrative portals always enforce HTTPS.',
          hi: 'वेबसाइट पर सुरक्षित HTTPS एन्क्रिप्शन नहीं है। सभी वैध बैंक और सरकारी पोर्टल सदैव HTTPS का उपयोग करते हैं।',
          gu: 'વેબસાઇટ પર સુરક્ષિત HTTPS એન્ક્રિપ્શન નથી. તમામ માન્ય બેંકો હંમેશા HTTPS વાપરે છે.',
        },
        matchedPatterns: [urlItem.protocol],
      });
      categoryScores.suspicious_link += 10;
    }
  }

  // 3. Evaluate Rule-based Content Threat Indicators
  for (const rule of SCAM_RULES) {
    const matchedPhrases: string[] = [];

    for (const pattern of rule.patterns) {
      const match = input.match(pattern);
      if (match) {
        matchedPhrases.push(match[0]);
      }
    }

    if (matchedPhrases.length > 0) {
      warnings.push({
        id: rule.id,
        category: rule.category,
        severity: rule.severity,
        weight: rule.weight,
        title: rule.title,
        explanation: rule.explanation,
        matchedPatterns: matchedPhrases,
      });

      categoryScores[rule.category] += rule.weight;
    }
  }

  // 4. Calculate Final Composite Risk Score
  let rawScore = warnings.reduce((sum, w) => sum + w.weight, 0);

  // Check if message is a standard legitimate transaction alert
  const isLegitTxn = isLegitimateBankNotification(input, extractedUrls.length);
  if (isLegitTxn && rawScore < 30) {
    rawScore = 5; // Minimal benign score for normal transaction notifications
  }

  // Dampen score to 0-100 scale
  const finalScore = Math.min(100, rawScore);

  // Determine Risk Level and 3 Clear Citizen Categories
  let riskLevel: RiskLevel = 'LOW';
  let citizenCategory: 'HIGH_RISK' | 'SOME_WARNINGS' | 'NO_OBVIOUS_WARNINGS' = 'NO_OBVIOUS_WARNINGS';

  const hasCriticalWarning = warnings.some((w) => w.severity === 'critical' || w.severity === 'high');

  if (finalScore >= 50 || hasCriticalWarning) {
    riskLevel = finalScore >= 80 ? 'CRITICAL' : 'HIGH';
    citizenCategory = 'HIGH_RISK';
  } else if (finalScore >= 15) {
    riskLevel = 'MEDIUM';
    citizenCategory = 'SOME_WARNINGS';
  } else {
    riskLevel = 'LOW';
    citizenCategory = 'NO_OBVIOUS_WARNINGS';
  }

  // Verbatim Citizen-Friendly Category Descriptions requested by public service UX guidelines
  const categoryDescription: Partial<Record<Language, string>> & { en: string } = {
    en:
      citizenCategory === 'HIGH_RISK'
        ? 'This message has warning signs commonly associated with scams. Do not click the link, send money, or share personal information until you verify it independently.'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'We found a few things that may be suspicious. Check the sender through an official contact method before taking action.'
          : 'We did not find clear warning signs in this check. This does not mean the message or website is guaranteed to be safe.',
    hi:
      citizenCategory === 'HIGH_RISK'
        ? 'इस संदेश में धोखाधड़ी (स्कैम) से जुड़े गंभीर चेतावनी संकेत मिले हैं। जब तक आप किसी आधिकारिक माध्यम से इसकी पुष्टि न कर लें, तब तक किसी भी लिंक पर क्लिक न करें, पैसे न भेजें और अपनी निजी जानकारी साझा न करें।'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'हमें कुछ ऐसी चीजें मिली हैं जो संदेहास्पद हो सकती हैं। कोई भी कदम उठाने से पहले किसी आधिकारिक तरीके से भेजने वाले की पुष्टि करें।'
          : 'इस जांच में हमें कोई स्पष्ट चेतावनी संकेत नहीं मिले। इसका यह मतलब बिल्कुल नहीं है कि यह संदेश या वेबसाइट पूरी तरह सुरक्षित होने की गारंटी है।',
    gu:
      citizenCategory === 'HIGH_RISK'
        ? 'આ મેસેજમાં છેતરપિંડી (સ્કેમ) સાથે જોડાયેલા ગંભીર ચેતવણી સંકેતો મળ્યા છે. જ્યાં સુધી તમે કોઈ સત્તાવાર માર્ગથી ચકાસણી ન કરો ત્યાં સુધી કોઈપણ લિંક પર ક્લિક કરશો નહીં, પૈસા મોકલશો નહીં કે તમારી અંગત માહિતી આપશો નહીં.'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'અમને અમુક એવી બાબતો મળી છે જે શંકાસ્પદ હોઈ શકે છે. કોઈ પગલું ભરતા પહેલાં સત્તાવાર માધ્યમ દ્વારા મોકલનારની ખાતરી કરો.'
          : 'આ તપાસમાં અમને કોઈ સ્પષ્ટ ચેતવણી સંકેતો મળ્યા નથી. આનો અર્થ એ નથી કે મેસેજ કે વેબસાઇટ સંપૂર્ણપણે સુરક્ષિત હોવાની ખાતરી છે.',
    bn:
      citizenCategory === 'HIGH_RISK'
        ? 'এই বার্তায় প্রতারণার (স্ক্যাম) সাথে যুক্ত স্পষ্ট সতর্কবার্তা পাওয়া গেছে। কোনো লিঙ্কে ক্লিক করবেন না, টাকা পাঠাবেন না বা ব্যক্তিগত তথ্য দেবেন না।'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'আমরা কিছু বিষয় খুঁজে পেয়েছি যা সন্দেহজনক হতে পারে। কোনো পদক্ষেপ নেওয়ার আগে অফিসিয়াল যোগাযোগের মাধ্যমে যাচাই করুন।'
          : 'এই পরীক্ষায় স্পষ্ট কোনো সতর্কবার্তা পাওয়া যায়নি। তবে এর অর্থ এই নয় যে বার্তাটি সম্পূর্ণ নিরাপদ।',
    mr:
      citizenCategory === 'HIGH_RISK'
        ? 'या संदेशामध्ये फसवणुकीशी (स्कॅम) संबंधित गंभीर इशारे आढळले आहेत. अधिकृत माध्यमाद्वारे खात्री केल्याशिवाय कोणत्याही लिंकवर क्लिक करू नका, पैसे पाठवू नका किंवा वैयक्तिक माहिती शेअर करू नका.'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'आम्हाला काही संशयास्पद गोष्टी आढळल्या आहेत. कोणतीही कृती करण्यापूर्वी अधिकृत संपर्काद्वारे पडताळणी करा.'
          : 'या तपासणीत कोणतेही स्पष्ट चेतावणीचे संकेत आढळले नाहीत. याचा अर्थ असा नाही की संदेश सुरक्षित असल्याची हमी आहे.',
    te:
      citizenCategory === 'HIGH_RISK'
        ? 'ఈ సందేశంలో మోసపూరిత (స్కామ్) హెచ్చరిక సంకేతాలు ఉన్నాయి. అధికారికంగా ధృవీకరించే వరకు లింక్‌పై క్లిక్ చేయవద్దు, డబ్బు పంపవద్దు లేదా వ్యక్తిగత సమాచారాన్ని పంచుకోవద్దు.'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'అనుమానాస్పదంగా ఉండే కొన్ని విషయాలు కనిపించాయి. ఏదైనా చర్య తీసుకునే ముందు అధికారిక మార్గాల ద్వారా పంపినవారిని ధృవీకరించండి.'
          : 'ఈ తనిఖీలో స్పష్టమైన హెచ్చరిక సంకేతాలు ఏవీ కనిపించలేదు. అయితే ఇది సందేశం సురಕ್ಷితమని హామీ ఇవ్వదు.',
    ta:
      citizenCategory === 'HIGH_RISK'
        ? 'இந்த செய்தியில் மோசடி தொடர்பான தெளிவான எச்சரிக்கை அறிகுறிகள் உள்ளன. அதிகாரப்பூர்வமாக சரிபார்க்கும் வரை இணைப்பைக் கிளிக் செய்யாதீர்கள், பணம் அனுப்பாதீர்கள் அல்லது தனிப்பட்ட தகவல்களைப் பகிராதீர்கள்.'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'சந்தேகத்திற்குரிய சில எச்சரிக்கைகள் கண்டறியப்பட்டுள்ளன. நடவடிக்கை எடுப்பதற்கு முன் அதிகாரப்பூர்வ தொடர்பு மூலம் சரிபார்க்கவும்.'
          : 'இந்த சோதனையில் தெளிவான எச்சரிக்கை அறிகுறிகள் எதுவும் காணப்படவில்லை. எனினும் செய்தி முற்றிலும் பாதுகாப்பானது என்று உத்தரவாதம் இல்லை.',
    kn:
      citizenCategory === 'HIGH_RISK'
        ? 'ಈ ಸಂದೇಶದಲ್ಲಿ ವಂಚನೆಗೆ (ಸ್ಕ್ಯಾಮ್) ಸಂಬಂಧಿಸಿದ ಸ್ಪಷ್ಟ ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು ಕಂಡುಬಂದಿವೆ. ಅಧಿಕೃತವಾಗಿ ಪರಿಶೀಲಿಸುವವರೆಗೆ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ, ಹಣ ಕಳುಹಿಸಬೇಡಿ ಅಥವಾ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.'
        : citizenCategory === 'SOME_WARNINGS'
          ? 'ಅನುಮಾನಾಸ್ಪದವೆನಿಸುವ ಕೆಲವು ಅಂಶಗಳು ಕಂಡುಬಂದಿವೆ. ಯಾವುದೇ ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಮುನ್ನ ಅಧಿಕೃತ ಸಂಪರ್ಕ ವಿಧಾನದ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.'
          : 'ಈ ತಪಾಸಣೆಯಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೆ ಇದು ಸಂದೇಶ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವೆಂದು ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ.',
  };

  // 5. Generate Multilingual Summaries
  let summary: Partial<Record<Language, string>> & { en: string };
  if (citizenCategory === 'HIGH_RISK') {
    summary = {
      en: `High risk: Detected ${warnings.length} warning signs commonly associated with active fraud or credential theft. Do NOT click links or reply.`,
      hi: `उच्च जोखिम: धोखाधड़ी या पासवर्ड/ओटीपी चोरी के ${warnings.length} चेतावनी संकेत मिले हैं। किसी लिंक पर क्लिक न करें।`,
      gu: `ઉચ્ચ જોખમ: છેતરપિંડી કે OTP ચોરીના ${warnings.length} ચેતવણી સંકેતો મળ્યા છે. કોઈ લિંક પર ક્લિક કરશો નહીં.`,
      bn: `উচ্চ ঝুঁকি: প্রতারণা বা ওটিপি চুরির ${warnings.length}টি সতর্কবার্তা সনাক্ত হয়েছে। লিঙ্কে ক্লিক করবেন না।`,
      mr: `उच्च धोका: फसवणूक किंवा ओटीपी चोरीचे ${warnings.length} चेतावणी संकेत आढळले आहेत. लिंकवर क्लिक करू नका.`,
      te: `అధిక ప్రమాదం: మోసం లేదా OTP దొంగతనానికి సంబంధించి ${warnings.length} హెచ్చరిక సంకేతాలు గుర్తించబడ్డాయి. లింక్‌లపై క్లిక్ చేయవద్దు.`,
      ta: `அதிக ஆபத்து: மோசடி அல்லது OTP திருட்டு தொடர்பான ${warnings.length} எச்சரிக்கை அறிகுறிகள் கண்டறியப்பட்டுள்ளன. இணைப்புகளைக் கிளிக் செய்யாதீர்கள்.`,
      kn: `ಹೆಚ್ಚಿನ ಅಪಾಯ: ವಂಚನೆ ಅಥವಾ OTP ಕಳ್ಳತನಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ${warnings.length} ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು ಪತ್ತೆಯಾಗಿವೆ. ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.`,
    };
  } else if (citizenCategory === 'SOME_WARNINGS') {
    summary = {
      en: `Some warning signs: Found ${warnings.length} suspicious pattern(s). Verify the sender through an official contact method before taking action.`,
      hi: `कुछ चेतावनी संकेत: ${warnings.length} संदेहास्पद संकेत मिले हैं। कोई कदम उठाने से पहले आधिकारिक माध्यम से पुष्टि करें।`,
      gu: `અમુક ચેતવણી સંકેતો: ${warnings.length} શંકાસ્પદ સંકેતો મળ્યા છે. કોઈ પગલું ભરતા પહેલા સત્તાવાર રીતે ચકાસણી કરો.`,
      bn: `কিছু সতর্কতা: ${warnings.length}টি সন্দেহজনক প্যাটার্ন পাওয়া গেছে। পদক্ষেপ নেওয়ার আগে অফিসিয়াল সূত্রে যাচাই করুন।`,
      mr: `काही इशारे: ${warnings.length} संशयास्पद बाबी आढळल्या आहेत. कृती करण्यापूर्वी अधिकृत संपर्काद्वारे खात्री करा.`,
      te: `కొన్ని హెచ్చరికలు: ${warnings.length} అనుమానాస్పద సంకేతాలు కనిపించాయి. చర్య తీసుకునే ముందు అధికారికంగా ధృవీకరించండి.`,
      ta: `சில எச்சரிக்கைகள்: ${warnings.length} சந்தேகத்திற்கிடமான அம்சங்கள் கண்டறியப்பட்டுள்ளன. அதிகாரப்பூர்வமாக சரிபார்க்கவும்.`,
      kn: `ಕೆಲವು ಎಚ್ಚರಿಕೆಗಳು: ${warnings.length} ಅನುಮಾನಾಸ್ಪದ ಮಾದರಿಗಳು ಕಂಡುಬಂದಿವೆ. ಮುಂದುವರಿಯುವ ಮೊದಲು ಅಧಿಕೃತವಾಗಿ ಪರಿಶೀಲಿಸಿ.`,
    };
  } else {
    summary = {
      en: isLegitTxn
        ? 'No obvious warning signs: Looks like a standard transactional notification. However, remember this does not guarantee absolute safety.'
        : 'No obvious warning signs found in this check. This does not mean the message or website is guaranteed to be safe.',
      hi: isLegitTxn
        ? 'कोई स्पष्ट चेतावनी संकेत नहीं: यह सामान्य सूचनात्मक लेन-देन का संदेश प्रतीत होता है। फिर भी सावधानी बरतें।'
        : 'इस जांच में कोई स्पष्ट चेतावनी संकेत नहीं मिले। इसका यह मतलब नहीं है कि संदेश या वेबसाइट सुरक्षित होने की गारंटी है।',
      gu: isLegitTxn
        ? 'કોઈ સ્પષ્ટ ચેતવણી સંકેત નથી: આ સામાન્ય વ્યવહાર અંગેનો સંદેશ જણાય છે. છતાં સાવધાની રાખવી જરૂરી છે.'
        : 'આ તપાસમાં કોઈ સ્પષ્ટ ચેતવણી સંકેતો મળ્યા નથી. આનો અર્થ એ નથી કે મેસેજ કે વેબસાઇટ સંપૂર્ણપણે સુરક્ષિત હોવાની ખાતરી છે.',
      bn: isLegitTxn
        ? 'কোনো স্পষ্ট সতর্কতা নেই: এটি একটি স্বাভাবিক লেনদেন বিজ্ঞপ্তি মনে হচ্ছে। তবুও সতর্ক থাকুন।'
        : 'এই পরীক্ষায় কোনো স্পষ্ট সতর্কতা পাওয়া যায়নি। তবে এর অর্থ এই নয় যে এটি সম্পূর্ণ নিরাপদ।',
      mr: isLegitTxn
        ? 'कोणतेही स्पष्ट चेतावणीचे संकेत नाहीत: हा एक सामान्य व्यवहार संदेश दिसतो. तरीही काळजी घ्या.'
        : 'या तपासणीत कोणतेही स्पष्ट चेतावणीचे संकेत आढळले नाहीत. याचा अर्थ हा सुरक्षित असल्याचा दावा नाही.',
      te: isLegitTxn
        ? 'స్పష్టమైన హెచ్చరికలు లేవు: ఇది సాధారణ లావాదేవీ సందేశం వలె కనిపిస్తుంది. అయినప్పటికీ జాగ్రత్తగా ఉండండి.'
        : 'ఈ తనిఖీలో స్పష్టమైన హెచ్చరికలు లేవు. అయితే ఇది సురక్షితమని హామీ కాదు.',
      ta: isLegitTxn
        ? 'தெளிவான எச்சரிக்கைகள் இல்லை: இது வழக்கமான பரிவர்த்தனை அறிவிப்பு போல தெரிகிறது. இருப்பினும் விழிப்புடன் இருங்கள்.'
        : 'இந்த சோதனையில் தெளிவான எச்சரிக்கைகள் இல்லை. ஆனால் இது பாதுகாப்பானது என்பதற்கான முழு உத்தரவாதம் அல்ல.',
      kn: isLegitTxn
        ? 'ಯಾವುದೇ ಸ್ಪಷ್ಟ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ: ಇದು ಸಾಮಾನ್ಯ ವಹಿವಾಟು ಸಂದೇಶದಂತೆ ಕಾಣುತ್ತದೆ. ಆದರೂ ಜಾಗರೂಕರಾಗಿರಿ.'
        : 'ಈ ತಪಾಸಣೆಯಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ಎಚ್ಚರಿಕೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೆ ಇದು ಸುರಕ್ಷಿತವೆಂದು ಖಾತರಿಪಡಿಸುವುದಿಲ್ಲ.',
    };
  }

  // 6. Tailor Recommended Actions Based on Detected Threats
  const enActions: string[] = [];
  const hiActions: string[] = [];
  const guActions: string[] = [];

  // Default Golden Rules
  if (categoryScores.credential > 0 || categoryScores.urgency > 0 || riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    enActions.push('NEVER share your OTP, UPI MPIN, ATM PIN, or passwords with anyone under any circumstances.');
    hiActions.push('किसी भी परिस्थिति में अपना OTP, UPI पिन, ATM पिन या पासवर्ड कभी किसी से साझा न करें।');
    guActions.push('કોઈપણ સંજોગોમાં તમારો OTP, UPI પિન, ATM પિન કે પાસવર્ડ ક્યારેય કોઈને આપશો નહીં.');
  }

  if (categoryScores.suspicious_link > 0 || extractedUrls.length > 0) {
    enActions.push('Do NOT click the link. If you need to access your account, type the official bank or portal website directly into your browser.');
    hiActions.push('संदेश में दिए लिंक पर क्लिक न करें। खाते तक पहुंचने के लिए हमेशा आधिकारिक वेबसाइट का पता ब्राउज़र में खुद टाइप करें।');
    guActions.push('મેસેજમાં આપેલી લિંક પર ક્લિક કરશો નહીં. તમારા એકાઉન્ટ માટે સત્તાવાર વેબસાઇટ બ્રાઉઝરમાં જાતે ટાઇપ કરો.');
  }

  if (categoryScores.remote_access > 0) {
    enActions.push('NEVER install AnyDesk, TeamViewer, QuickSupport, or any unknown .APK file sent over message or WhatsApp.');
    hiActions.push('संदेश या व्हाट्सएप पर भेजे गए AnyDesk, QuickSupport या किसी भी अनजान .APK ऐप को कभी इंस्टॉल न करें।');
    guActions.push('મેસેજ કે વોટ્સએપ પર આવેલી AnyDesk, QuickSupport કે અજાણી .APK ફાઇલ ક્યારેય ઇન્સ્ટોલ કરશો નહીં.');
  }

  if (categoryScores.financial > 0) {
    enActions.push('Remember: You NEVER need to enter a UPI PIN or scan a QR code to RECEIVE money. Entering a PIN always debits funds.');
    hiActions.push('याद रखें: पैसे प्राप्त करने के लिए कभी UPI पिन दर्ज करने या QR स्कैन करने की आवश्यकता नहीं होती। पिन डालने से पैसे कटते हैं।');
    guActions.push('યાદ રાખો: પૈસા મેળવવા માટે ક્યારેય UPI PIN નાખવો કે QR સ્કેન કરવો પડતો નથી. પિન નાખવાથી પૈસા કપાય છે.');
  }

  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    enActions.push('If you have already sent money or shared credentials, immediately call India Cybercrime Helpline 1930 and report at cybercrime.gov.in.');
    hiActions.push('यदि आपने पैसे भेज दिए हैं या जानकारी दे दी है, तो तुरंत राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें और cybercrime.gov.in पर रिपोर्ट दर्ज करें।');
    guActions.push('જો તમે પૈસા મોકલી દીધા હોય કે વિગતો આપી હોય, તો તરત જ રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઇન 1930 પર કોલ કરો અને cybercrime.gov.in પર ફરિયાદ કરો.');

    enActions.push('Block and report the sender on WhatsApp/SMS to protect other citizens.');
    hiActions.push('अन्य नागरिकों की सुरक्षा के लिए प्रेषक के नंबर को व्हाट्सएप और एसएमएस पर ब्लॉक व रिपोर्ट करें।');
    guActions.push('અન્ય નાગરિકોની સુરક્ષા માટે મોકલનાર નંબરને વોટ્સએપ અને SMS પર બ્લોક અને રિપોર્ટ કરો.');
  } else {
    enActions.push('Always verify unexpected messages by contacting the institution via their official verified helpline numbers.');
    hiActions.push('अप्रत्याशित संदेशों की पुष्टि हमेशा संबंधित संस्था के आधिकारिक हेल्पलाइन नंबर से करें।');
    guActions.push('અણધાર્યા સંદેશાઓની ખાતરી હંમેશા સંસ્થાના સત્તાવાર હેલ્પલાઇન નંબર પર સંપર્ક કરીને કરો.');
  }

  const recommendedActions = {
    en: enActions,
    hi: hiActions,
    gu: guActions,
    bn: hiActions,
    mr: hiActions,
    te: enActions,
    ta: enActions,
    kn: enActions,
  };

  const disclaimer = {
    en: 'Disclaimer: Automated heuristic analysis based on known Indian cyber threat patterns. A low risk score does not guarantee absolute legitimacy; always exercise caution and verify independently.',
    hi: 'अस्वीकरण: यह स्वचालित सुरक्षा विश्लेषण ज्ञात भारतीय साइबर खतरों के आधार पर है। कम जोखिम का अर्थ शत-प्रतिशत सुरक्षा की गारंटी नहीं है; हमेशा स्वयं सतर्कता बरतें।',
    gu: 'અસ્વીકરણ: આ સ્વચાલિત સુરક્ષા વિશ્લેષણ જાણીતી ભારતીય સાયબર છેતરપિંડી પર આધારિત છે. ઓછું જોખમ એ સંપૂર્ણ સલામતીની ખાતરી નથી; હંમેશા સાવધાની રાખો.',
    bn: 'দাবিত্যাগ: এই স্বয়ংক্রিয় সুরক্ষা বিশ্লেষণ পরিচিত ভারতীয় সাইবার হুমকির ধরণের উপর ভিত্তি করে তৈরি। কম ঝুঁকি সম্পূর্ণ সুরক্ষার গ্যারান্টি দেয় না; সর্বদা সতর্কতা অবলম্বন করুন।',
    mr: 'अस्वीकरण: हे स्वयंचलित सुरक्षा विश्लेषण ज्ञात भारतीय सायबर धोक्यांच्या पॅटर्नवर आधारित आहे. कमी धोका पूर्ण सुरक्षिततेची हमी देत नाही; नेहमी स्वतः काळजी घ्या.',
    te: 'నిరాకరణ: ఈ స్వయంచాలక భద్రతా విశ్లేషణ తెలిసిన భారతీయ సైబర్ ముప్పు నమూనాలపై ఆధారపడి ఉంటుంది. తక్కువ ప్రమాదం అంటే పూర్తి భద్రతకు హామీ కాదు.',
    ta: 'மறுப்பு: இந்த தானியங்கி பாதுகாப்பு பகுப்பாய்வு அறியப்பட்ட இந்திய இணைய அச்சுறுத்தல் முறைகளை அடிப்படையாகக் கொண்டது. குறைந்த ஆபத்து என்பது முழுமையான பாதுகாப்பிற்கு உத்தரவாதம் அல்ல.',
    kn: 'ಹಕ್ಕುತ್ಯಾಗ: ಈ ಸ್ವಯಂಚಾಲಿತ ಭದ್ರತಾ ವಿಶ್ಲೇಷಣೆಯು ತಿಳಿದಿರುವ ಭಾರತೀಯ ಸೈಬರ್ ಬೆದರಿಕೆ ಮಾದರಿಗಳನ್ನು ಆಧರಿಸಿದೆ. ಕಡಿಮೆ ಅಪಾಯವು ಸಂಪೂರ್ಣ ಸುರಕ್ಷತೆಯನ್ನು ಖಾತರಿಪಡಿಸುವುದಿಲ್ಲ.',
  };

  return {
    input,
    inputType,
    score: finalScore,
    riskLevel,
    citizenCategory,
    categoryDescription,
    summary,
    warnings,
    categoryScores,
    urlsFound: urlDetails,
    recommendedActions,
    disclaimer,
    analyzedAt: now,
    detectionMode: 'rule_engine',
  };
}
