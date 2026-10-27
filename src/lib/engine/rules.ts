import { RuleCategory, Language } from './types';

export interface DetectionRule {
  id: string;
  category: RuleCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  title: Partial<Record<Language, string>> & { en: string };
  explanation: Partial<Record<Language, string>> & { en: string };
  patterns: RegExp[];
}

export const SCAM_RULES: DetectionRule[] = [
  // 1. CREDENTIAL & OTP THEFT (Critical Severity)
  {
    id: 'CRED_OTP_REQUEST',
    category: 'credential',
    severity: 'critical',
    weight: 35,
    title: {
      en: 'Direct OTP / PIN / Password Request',
      hi: 'सीधा OTP / PIN / पासवर्ड मांगने का प्रयास',
      gu: 'સીધો OTP / PIN / પાસવર્ડ માંગવાનો પ્રયાસ',
    },
    explanation: {
      en: 'Legitimate banks and organizations NEVER ask for your OTP, UPI MPIN, or passwords. Any message asking for an OTP is an immediate sign of fraud.',
      hi: 'वैध बैंक या सरकारी विभाग कभी भी आपका OTP, UPI पिन या पासवर्ड नहीं मांगते। OTP मांगने वाला कोई भी संदेश सीधे धोखाधड़ी का संकेत है।',
      gu: 'માન્ય બેંકો કે સરકારી સંસ્થાઓ ક્યારેય તમારો OTP, UPI PIN કે પાસવર્ડ માંગતી નથી. OTP માંગતો સંદેશ છેતરપિંડીની ખાતરી આપે છે.',
    },
    patterns: [
      /\b(?:share|send|provide|enter|verify)\b.{0,30}\b(?:otp|one\s*time\s*password|mpin|upi\s*pin|cvv|atm\s*pin|password)\b/i,
      /\b(?:otp|mpin|upi\s*pin)\b.{0,30}\b(?:share|bhejo|batao|dijiye|bataye|darj\s*kare|verif(?:y|ication))\b/i,
      /(?:ओटीपी|पिन|पासवर्ड).{0,25}(?:बताएं|भेजें|साझा|दर्ज|शेयर)/i,
      /(?:ઓટીપી|પિન|પાસવર્ડ).{0,25}(?:મોકલો|આપો|શેર|દાખલ)/i,
      /(?:ওটিপি|পিন|পাসওয়ার্ড).{0,25}(?:পাঠান|দিন|শেয়ার|যাচাই)/i,
      /(?:ओटीपी|पिन|पासवर्ड).{0,25}(?:पाठवा|द्या|शेअर|नोंदवा)/i,
      /(?:ఓటీపీ|పిన్|పాస్‌వర్డ్).{0,25}(?:పంపండి|షేర్|నమోదు)/i,
      /(?:ஓடிபி|பின்|கடவுச்சொல்).{0,25}(?:அனுப்பவும்|பகிரவும்)/i,
      /(?:ಒಟಿಪಿ|ಪಿನ್|ಪಾಸ್‌ವರ್ಡ್).{0,25}(?:ಕಳುಹಿಸಿ|ಹಂಚಿಕೊಳ್ಳಿ)/i,
    ],
  },
  {
    id: 'CRED_KYC_PAN_UPDATE',
    category: 'credential',
    severity: 'high',
    weight: 30,
    title: {
      en: 'Suspicious KYC / PAN / Aadhaar Update Prompt',
      hi: 'संदिग्ध KYC / पैन / आधार अपडेट का झांसा',
      gu: 'શંકાસ્પદ KYC / પાન / આધાર અપડેટની લાલચ',
    },
    explanation: {
      en: 'Scammers frequently send fake KYC suspension warnings to trick citizens into entering PAN, Aadhaar, or banking credentials on phishing pages.',
      hi: 'धोखेबाज बैंक खाता बंद होने का डर दिखाकर फर्जी लिंक के जरिए पैन, आधार या नेटबैंकिंग क्रेडेंशियल चुराते हैं।',
      gu: 'છેતરપિંડી કરનારાઓ એકાઉન્ટ બંધ થવાનો ડર બતાવીને નકલી લિંક દ્વારા પાન, આધાર કે નેટબેંકિંગ વિગતો ચોરી લે છે.',
    },
    patterns: [
      /\b(?:kyc|pan|aadhaar|aadhar|re-kyc)\b.{0,40}\b(?:suspend(?:ed)?|block(?:ed)?|deactivat(?:ed)?|updat(?:e|ed)|expir(?:ed|y)|mandat(?:e|ory))\b/i,
      /\b(?:account|yono|netbanking)\b.{0,40}\b(?:blocked|suspended|hold|inactive)\b.{0,40}\b(?:update|link|click|visit)\b/i,
      /(?:केवाईसी|पैन|आधार).{0,30}(?:अपडेट|ब्लॉक|सस्पेंड|बंद)/i,
      /(?:કેવાયસી|પાન|આધાર).{0,30}(?:અપડેટ|બ્લોક|બંધ)/i,
    ],
  },

  // 2. URGENCY & DIGITAL THREAT TACTICS (High / Critical Severity)
  {
    id: 'URG_ELECTRICITY_DISCONNECT',
    category: 'urgency',
    severity: 'critical',
    weight: 30,
    title: {
      en: 'Electricity Bill Disconnection Threat',
      hi: 'बिजली कनेक्शन काटने की फर्जी धमकी',
      gu: 'લાઈટ કનેક્શન કાપી નાખવાની નકલી ધમકી',
    },
    explanation: {
      en: 'A widespread Indian scam falsely claiming your power will be disconnected at 9:30 PM tonight unless you call an unofficial mobile number.',
      hi: 'भारत में बेहद आम घोटाला जिसमें आज रात 9:30 बजे बिजली कटने की धमकी देकर किसी निजी नंबर पर कॉल करने या ऐप इंस्टॉल करने को कहा जाता है।',
      gu: 'ભારતમાં બહુ પ્રચલિત છેતરપિંડી જેમાં આજે રાત્રે લાઈટ કપાઈ જશે તેવી ધમકી આપી ખાનગી નંબર પર ફોન કરવા કહેવામાં આવે છે.',
    },
    patterns: [
      /\b(?:electricity|power|bijli|bijlee)\b.{0,40}\b(?:disconnect(?:ed)?|cut\s*off|will\s*be\s*cut)\b/i,
      /\b(?:tonight|9:30\s*pm|today\s*night)\b.{0,40}\b(?:power|electricity|bill|officer)\b/i,
      /(?:बिजली|लाइट).{0,30}(?:कट|काट|डिस्कनेक्ट|बिल).{0,30}(?:रात|आज)/i,
      /(?:વીજળી|લાઈટ).{0,30}(?:કપાઈ|કાપી|બંધ).{0,30}(?:રાત્રે|આજે)/i,
      /(?:বিদ্যুৎ|কারেন্ট|বিল).{0,30}(?:বিচ্ছিন্ন|কেটে|বন্ধ)/i,
      /(?:वीज|विद्युत|लाईट).{0,30}(?:खंडित|कापली|बंद|बिल)/i,
      /(?:విద్యుత్|కరెంట్|బిల్లు).{0,30}(?:నిలిపి|కట్|సరఫరా)/i,
      /(?:மின்சார|மின்|கட்டணம்).{0,30}(?:துண்டிக்க|இணைப்பு)/i,
      /(?:ವಿದ್ಯುತ್|ಕರೆಂಟ್|ಬಿಲ್).{0,30}(?:ಕಡಿತ|ಸಂಪರ್ಕ)/i,
    ],
  },
  {
    id: 'URG_DIGITAL_ARREST_POLICE',
    category: 'urgency',
    severity: 'critical',
    weight: 35,
    title: {
      en: 'Digital Arrest / Fake Law Enforcement Threat',
      hi: 'डिजिटल अरेस्ट / फर्जी पुलिस या सीबीआई नोटिस',
      gu: 'ડિજિટલ અરેસ્ટ / નકલી પોલીસ અથવા CBI નોટિસ',
    },
    explanation: {
      en: 'Indian authorities NEVER declare "Digital Arrest" over phone or WhatsApp. Any video call or message threatening immediate arrest or narcotics parcel detention is fraud.',
      hi: 'भारतीय पुलिस, सीबीआई या नारकोटिक्स विभाग कभी व्हाट्सएप या फोन पर "डिजिटल अरेस्ट" नहीं करते। पार्सल जब्ती या गिरफ्तारी की धमकी पूरी तरह फर्जी है।',
      gu: 'ભારતીય પોલીસ કે CBI ક્યારેય ફોન કે વોટ્સએપ પર "ડિજિટલ અરેસ્ટ" કરતી નથી. તાત્કાલિક ધરપકડ કે પાર્સલ જપ્તીની ધમકી શુદ્ધ છેતરપિંડી છે.',
    },
    patterns: [
      /\b(?:digital\s*arrest|cbi\s*arrest|narcotics\s*parcel|customs\s*detention|mumbai\s*police\s*notice|arrest\s*warrant|trai\s*disconnect)\b/i,
      /\b(?:police|cbi|ed|customs|cyber\s*cell)\b.{0,40}\b(?:arrest|fir|case\s*registered|money\s*laundering|drugs\s*found)\b/i,
      /(?:डिजिटल\s*अरेस्ट|सीबीआई|नारकोटिक्स|गिरफ्तारी|पुलिस\s*नोटिस|वारंट)/i,
      /(?:ડિજિટલ\s*અરેસ્ટ|સીબીઆઈ|ધરપકડ|પોલીસ\s*નોટિસ|વોરંટ)/i,
      /(?:ডিজিটাল\s*গ্রেফতার|সিবিআই|গ্রেপ্তার|পুলিশ\s*নোটিশ)/i,
      /(?:डिजिटल\s*अटक|सीबीआय|अटक|पोलीस\s*नोटीस)/i,
      /(?:డిజిటల్\s*అరెస్ట్|పోలీస్\s*నోటీస్|అరెస్ట్\s*వారెంట్)/i,
      /(?:டிஜிட்டல்\s*கைது|காவல்துறை|கைது\s*வாரண்ட்)/i,
      /(?:ಡಿಜಿಟಲ್\s*ಬಂಧನ|ಪೊಲೀಸ್\s*ನೋಟಿಸ್|ಬಂಧನ\s*ವಾರಂಟ್)/i,
    ],
  },
  {
    id: 'URG_TIME_PRESSURE',
    category: 'urgency',
    severity: 'medium',
    weight: 20,
    title: {
      en: 'Extreme Artificial Urgency (24 Hours / Immediate)',
      hi: 'अत्यधिक जल्दबाजी या समय का दबाव (तुरंत / 24 घंटे)',
      gu: 'અતિશય ઉતાવળ અથવા સમયનું દબાણ (તાત્કાલિક / 24 કલાક)',
    },
    explanation: {
      en: 'Scammers deliberately induce panic with tight deadlines (e.g., "within 24 hours", "immediate action required") so victims act before verifying.',
      hi: 'पीड़ित को सोचने या जांचने का मौका न मिले इसलिए 24 घंटे या तुरंत कार्रवाई करने का झूठा दबाव बनाया जाता है।',
      gu: 'ભોગ બનનારને વિચારવાનો સમય ન મળે તે માટે 24 કલાક કે તાત્કાલિક પગલાં લેવાનું કૃત્રિમ દબાણ કરવામાં આવે છે.',
    },
    patterns: [
      /\b(?:within\s*(?:12|24|48)\s*hours|immediate(?:ly)?|urgent\s*action|act\s*now|last\s*chance|today\s*itself|before\s*midnight)\b/i,
      /\b(?:turant|tatkal|aaj\s*hi|24\s*ghante\s*ke\s*andar)\b/i,
      /(?:तुरंत|तत्काल|24\s*घंटे|आज\s*ही|अंतिम\s*अवसर)/i,
      /(?:તાત્કાલિક|તરત\s*જ|24\s*કલાક|આજે\s*જ|છેલ્લી\s*તક)/i,
    ],
  },

  // 3. FINANCIAL TRAPS & REWARD / LOTTERY SCAMS
  {
    id: 'FIN_LOTTERY_PRIZE_KBC',
    category: 'financial',
    severity: 'critical',
    weight: 35,
    title: {
      en: 'Lottery / Lucky Draw / KBC Prize Fraud',
      hi: 'लॉटरी / लकी ड्रॉ / KBC इनाम का फर्जीवाड़ा',
      gu: 'લોટરી / લકી ડ્રો / KBC ઇનામની છેતરપિંડી',
    },
    explanation: {
      en: 'Fake notifications claiming you have won lakhs in a lottery or lucky draw. They will eventually ask for an advance "processing or tax fee" to release the funds.',
      hi: 'केबीसी या लकी ड्रा में लाखों रुपये जीतने का झूठा दावा। बाद में प्रोसेसिंग फीस या टैक्स के नाम पर पैसे ठगे जाते हैं।',
      gu: 'KBC કે લકી ડ્રોમાં લાખો રૂપિયા જીતવાનો જૂઠો દાવો. બાદમાં પ્રોસેસિંગ ફીના નામે પૈસા પડાવવામાં આવે છે.',
    },
    patterns: [
      /\b(?:kbc|jio\s*lucky\s*draw|lottery|winner|won\s*(?:rs|inr|₹)?\s*[0-9,]+|cash\s*prize|congratulations\s*you\s*won)\b/i,
      /\b(?:rana\s*pratap\s*singh|whatsapp\s*lottery|processing\s*fee\s*to\s*claim)\b/i,
      /(?:लॉटरी|इनाम|विजेता|जीते\s*हैं|लाख\s*रुपये|लकी\s*ड्रॉ)/i,
      /(?:લોટરી|ઇનામ|વિજેતા|જીત્યા\s*છો|લાખ\s*રૂપિયા|લકી\s*ડ્રો)/i,
    ],
  },
  {
    id: 'FIN_PART_TIME_JOB_FRAUD',
    category: 'financial',
    severity: 'high',
    weight: 30,
    title: {
      en: 'Work-From-Home / YouTube Like Task Fraud',
      hi: 'घर बैठे कमाई / यूट्यूब लाइक टास्क फ्रॉड',
      gu: 'ઘેર બેઠા કમાણી / યુટ્યુબ લાઈક ટાસ્ક ફ્રોડ',
    },
    explanation: {
      en: 'Offers ₹2,000–₹10,000 daily for simple tasks like liking videos or rating hotels, followed by demands for upfront "registration" or "cryptocurrency deposit" fees.',
      hi: 'यूट्यूब वीडियो लाइक करने या होटल रिव्यू के बदले रोजाना हजारों रुपये देने का लालच देकर टेलीग्राम ग्रुप में निवेश के नाम पर ठगी की जाती है।',
      gu: 'યુટ્યુબ વિડીયો લાઈક કરવા જેવા સરળ કામ માટે હજારો રૂપિયા કમાવવાની લાલચ આપી રોકાણના નામે છેતરપિંડી થાય છે.',
    },
    patterns: [
      /\b(?:part\s*time\s*job|work\s*from\s*home|daily\s*income|earn\s*(?:rs|₹)\s*[0-9,]+\s*daily|like\s*youtube\s*video|hotel\s*review\s*job)\b/i,
      /\b(?:registration\s*fee|telegram\s*group|prepaid\s*task|crypto\s*task)\b/i,
      /(?:घर\s*बैठे\s*कमाएं|पार्ट\s*टाइम\s*जॉब|रोजाना\s*कमाई|टास्क)/i,
      /(?:ઘેર\s*બેઠા\s*કમાઓ|પાર્ટ\s*ટાઇમ\s*જોબ|દૈનિક\s*આવક|ટાસ્ક)/i,
    ],
  },
  {
    id: 'FIN_QR_UPI_REVERSE_SCAM',
    category: 'financial',
    severity: 'critical',
    weight: 35,
    title: {
      en: 'UPI / QR Code Money Receiving Trap',
      hi: 'QR कोड / UPI से पैसे पाने का फर्जीवाड़ा',
      gu: 'QR કોડ / UPI થી પૈસા મેળવવાની છેતરપિંડી',
    },
    explanation: {
      en: 'CRITICAL RULE: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money. Entering a PIN always DEBITS money from your account.',
      hi: 'महत्वपूर्ण नियम: पैसे प्राप्त करने के लिए कभी भी UPI पिन दर्ज करने या QR कोड स्कैन करने की आवश्यकता नहीं होती। पिन डालने से पैसे कटते हैं।',
      gu: 'મહત્વપૂર્ણ નિયમ: પૈસા મેળવવા માટે ક્યારેય UPI PIN નાખવો કે QR કોડ સ્કેન કરવો પડતો નથી. પિન નાખવાથી પૈસા કપાય છે.',
    },
    patterns: [
      /\b(?:scan\s*qr\s*to\s*receive|enter\s*pin\s*to\s*receive|pay\s*(?:re|rs|inr|₹)\s*1\s*to\s*verify|claim\s*cashback)\b/i,
      /\b(?:upi\s*pin\s*dalo\s*paise\s*aayenge|qr\s*code\s*scan\s*karo)\b/i,
      /(?:पैसे\s*पाने\s*के\s*लिए\s*पिन|क्रेडिट\s*के\s*लिए\s*पिन|स्कैन\s*करके\s*पैसे\s*पाएं)/i,
      /(?:પૈસા\s*મેળવવા\s*પિન|ક્રેડિટ\s*માટે\s*પિન|સ્કેન\s*કરી\s*પૈસા\s*મેળવો)/i,
    ],
  },

  // 4. REMOTE ACCESS & MALICIOUS APK (Critical Severity)
  {
    id: 'REMOTE_APP_INSTALL',
    category: 'remote_access',
    severity: 'critical',
    weight: 35,
    title: {
      en: 'Remote Desktop App / Unknown APK Install',
      hi: 'रिमोट एक्सेस ऐप / अज्ञात APK डाउनलोड का निर्देश',
      gu: 'રિમોટ એક્સેસ એપ / અજાણી APK ડાઉનલોડ કરવાનો આદેશ',
    },
    explanation: {
      en: 'Fraudsters instruct victims to install screen-sharing software (AnyDesk, TeamViewer, RustDesk) or rogue APKs to read OTPs and drain bank accounts directly.',
      hi: 'धोखेबाज स्क्रीन-शेयरिंग ऐप (जैसे AnyDesk या QuickSupport) या अज्ञात APK इंस्टॉल करवाकर फोन का पूरा नियंत्रण ले लेते हैं और बैंक खाली कर देते हैं।',
      gu: 'છેતરપિંડી કરનારા AnyDesk કે અજાણી APK ઇન્સ્ટોલ કરાવીને ફોનનો સંપૂર્ણ કંટ્રોલ મેળવી લે છે અને બેંક એકાઉન્ટ ખાલી કરી નાખે છે.',
    },
    patterns: [
      /\b(?:anydesk|teamviewer|rustdesk|quicksupport|zoho\s*assist|airdroid)\b/i,
      /\b(?:download\s*apk|install\s*apk|sbi.*\.apk|yono.*\.apk|support.*\.apk)\b/i,
      /\b(?:screen\s*share|remote\s*access|allow\s*permission)\b/i,
      /(?:एनीडेस्क|टीमव्यूअर|रिमोट\s*एक्सेस|एपीके\s*डाउनलोड)/i,
      /(?:એનીડેસ્ક|ટીમવ્યૂઅર|રિમોટ\s*એક્સેસ|APK\s*ડાઉનલોડ)/i,
    ],
  },

  // 5. IMPERSONATION OF AUTHORITIES & DELIVERY
  {
    id: 'IMP_DELIVERY_PACKAGE_SCAM',
    category: 'impersonation',
    severity: 'high',
    weight: 25,
    title: {
      en: 'India Post / Courier Address Update Scam',
      hi: 'इंडिया पोस्ट / कूरियर पार्सल एड्रेस अपडेट फ्रॉड',
      gu: 'ઇન્ડિયા પોસ્ટ / કુરિયર સરનામું અપડેટ કરવાની છેતરપિંડી',
    },
    explanation: {
      en: 'Fake SMS pretending to be India Post or courier saying your parcel cannot be delivered due to incomplete address. It directs to a phishing site to steal credit card details.',
      hi: 'इंडिया पोस्ट या कूरियर के नाम से फर्जी एसएमएस जिसमें अधूरा पता बताकर 24 घंटे में अपडेट करने का लिंक दिया जाता है ताकि कार्ड की जानकारी चुराई जा सके।',
      gu: 'ઇન્ડિયા પોસ્ટ કે કુરિયરના નામે નકલી SMS જેમાં અધૂરું સરનામું કહી 24 કલાકમાં લિંક પર કાર્ડ વિગતો ચોરી લેવાય છે.',
    },
    patterns: [
      /\b(?:india\s*post|speed\s*post|delivery\s*failed|package|parcel|courier|consignment)\b.{0,40}\b(?:address|update|reschedule|returned|hold)\b/i,
      /\b(?:house\s*number\s*missing|postal\s*fee|redeliver)\b/i,
      /(?:इंडिया\s*पोस्ट|स्पीड\s*पोस्ट|पार्सल|कूरियर).{0,30}(?:डिलीवरी|पता|अपडेट)/i,
      /(?:ઇન્ડિયા\s*પોસ્ટ|સ્પીડ\s*પોસ્ટ|પાર્સલ|કુરિયર).{0,30}(?:ડિલિવરી|સરનામું|અપડેટ)/i,
    ],
  },
  {
    id: 'IMP_BANK_OR_GOVT_ENTITY',
    category: 'impersonation',
    severity: 'medium',
    weight: 20,
    title: {
      en: 'Bank or Government Institution Claim',
      hi: 'बैंक या सरकारी संस्था का नाम लेकर संदेश',
      gu: 'બેંક અથવા સરકારી સંસ્થાના નામે સંદેશ',
    },
    explanation: {
      en: 'The message mentions an official bank (SBI, HDFC, ICICI, etc.) or government agency (Income Tax, TRAI) together with call-to-action links or phone numbers.',
      hi: 'संदेश में किसी प्रतिष्ठित बैंक या सरकारी एजेंसी का नाम लेकर अनौपचारिक कार्रवाई या लिंक पर क्लिक करने को कहा जा रहा है।',
      gu: 'સંદેશમાં પ્રતિષ્ઠિત બેંક અથવા સરકારી એજન્સીનું નામ લઈને અનૌપચારિક લિંક પર ક્લિક કરવા કહેવામાં આવે છે.',
    },
    patterns: [
      /\b(?:sbi|yono|hdfc|icici|axis\s*bank|pnb|canara\s*bank|income\s*tax\s*department|trai|epfo)\b/i,
      /(?:एसबीआई|एचडीएफसी|आईसीआईसीआई|इनकम\s*टैक्स|आयकर\s*विभाग)/i,
      /(?:SBI|HDFC|ICICI|ઇન્કમ\s*ટેક્સ)/i,
    ],
  },
  {
    id: 'FIN_ADVANCE_FEE_TRAP',
    category: 'financial',
    severity: 'high',
    weight: 30,
    title: {
      en: 'Upfront Verification or Processing Fee Demand',
      hi: 'अग्रिम सत्यापन या प्रोसेसिंग फीस की मांग',
      gu: 'એડવાન્સ વેરિફિકેશન કે પ્રોસેસિંગ ફીની માંગણી',
    },
    explanation: {
      en: 'Demanding upfront money (processing fee, registration charge, verification tax) to receive a prize or job is the classic hallmark of advance-fee fraud.',
      hi: 'इनाम पाने या नौकरी शुरू करने के लिए एडवांस प्रोसेसिंग फीस या रजिस्ट्रेशन चार्ज मांगना धोखाधड़ी का पक्का सबूत है।',
      gu: 'ઇનામ મેળવવા કે નોકરી માટે એડવાન્સ પ્રોસેસિંગ ફી કે રજીસ્ટ્રેશન ચાર્જ માંગવો એ છેતરપિંડીનો મોટો પુરાવો છે.',
    },
    patterns: [
      /\b(?:paying|pay|deposit)\b.{0,40}\b(?:fee|charge|charges|tax|deposit|amount)\b/i,
      /\b(?:verification\s*fee|registration\s*fee|processing\s*fee|advance\s*fee)\b/i,
      /(?:प्रोसेसिंग\s*फीस|रजिस्ट्रेशन\s*फीस|सत्यापन\s*शुल्क|फीस\s*जमा)/i,
      /(?:પ્રોસેસિંગ\s*ફી|રજીસ્ટ્રેશન\s*ફી|ચકાસણી\s*ફી)/i,
    ],
  },
  {
    id: 'IMP_UNOFFICIAL_WHATSAPP_CONTACT',
    category: 'impersonation',
    severity: 'high',
    weight: 25,
    title: {
      en: 'Unofficial WhatsApp Contact for Official Claims',
      hi: 'आधिकारिक कार्य के लिए निजी व्हाट्सएप पर संपर्क का निर्देश',
      gu: 'સત્તાવાર બાબતો માટે ખાનગી વોટ્સએપ પર સંપર્ક કરવાનો આદેશ',
    },
    explanation: {
      en: 'Directing users to private WhatsApp numbers for lottery prizes, official notices, or jobs avoids institutional audit and facilitates fraud.',
      hi: 'लॉटरी पुरस्कार, बैंक या सरकारी सूचना के लिए निजी व्हाट्सएप नंबर पर बात करने को कहना धोखाधड़ी का मुख्य जरिया है।',
      gu: 'લોટરી, બેંક કે સરકારી નોટિસ માટે ખાનગી વોટ્સએપ નંબર પર વાત કરવા કહેવું એ છેતરપિંડીની મુખ્ય રીત છે.',
    },
    patterns: [
      /\b(?:contact|whatsapp)\b.{0,30}\b(?:manager|officer|rana\s*pratap|sir)\b/i,
      /\b(?:on\s*whatsapp\s*at|contact.*whatsapp)\b/i,
      /(?:व्हाट्सएप\s*पर\s*संपर्क|व्हाट्सएप\s*नंबर)/i,
      /(?:વોટ્સએપ\s*પર\s*સંપર્ક|વોટ્સએપ\s*નંબર)/i,
    ],
  },
];
