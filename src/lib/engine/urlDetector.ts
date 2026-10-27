import { UrlAnalysis } from './types';

// Curated list of legitimate Indian institutional domains
export const OFFICIAL_DOMAINS: Record<string, string[]> = {
  sbi: ['sbi.co.in', 'onlinesbi.sbi', 'onlinesbi.com', 'bank.sbi'],
  hdfc: ['hdfcbank.com', 'hdfc.com'],
  icici: ['icicibank.com'],
  axis: ['axisbank.com'],
  pnb: ['pnbindia.in'],
  paytm: ['paytm.com'],
  phonepe: ['phonepe.com'],
  googlepay: ['pay.google.com', 'google.com'],
  incometax: ['incometax.gov.in', 'incometaxindia.gov.in'],
  indiapost: ['indiapost.gov.in'],
  epfo: ['epfindia.gov.in'],
  cybercrime: ['cybercrime.gov.in'],
};

// Known URL shorteners often used in SMS phishing
export const KNOWN_SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  'is.gd',
  'cutt.ly',
  't.co',
  'rb.gy',
  'shorturl.at',
  'ow.ly',
  'goo.gl',
  'buff.ly',
  'rebrand.ly',
  'v.gd',
  'soo.gd',
  's.id',
  'tiny.cc',
  'qr.ae',
]);

// Suspicious / high-abuse TLDs frequently seen in Indian mobile phishing campaigns
export const SUSPICIOUS_TLDS = new Set([
  'top',
  'xyz',
  'club',
  'work',
  'click',
  'buzz',
  'cam',
  'live',
  'stream',
  'rest',
  'gq',
  'cf',
  'ml',
  'tk',
  'ga',
  'website',
  'online',
  'site',
  'icu',
  'monster',
  'space',
  'download',
  'loan',
  'win',
  'bid',
  'trade',
]);

// High-profile targeted Indian brands
const TARGET_BRANDS: { brand: string; name: string; patterns: RegExp[] }[] = [
  { brand: 'sbi', name: 'State Bank of India (SBI)', patterns: [/sbi/i, /yono/i, /onlinesbi/i] },
  { brand: 'hdfc', name: 'HDFC Bank', patterns: [/hdfc/i] },
  { brand: 'icici', name: 'ICICI Bank', patterns: [/icici/i] },
  { brand: 'axis', name: 'Axis Bank', patterns: [/axisbank/i] },
  { brand: 'pnb', name: 'Punjab National Bank (PNB)', patterns: [/pnb/i] },
  { brand: 'paytm', name: 'Paytm', patterns: [/paytm/i] },
  { brand: 'phonepe', name: 'PhonePe', patterns: [/phonepe/i] },
  { brand: 'incometax', name: 'Income Tax Department (India)', patterns: [/incometax/i, /itr-gov/i, /tax-refund/i] },
  { brand: 'indiapost', name: 'India Post / Speed Post', patterns: [/indiapost/i, /speedpost/i, /dak-sewa/i] },
  { brand: 'epfo', name: 'EPFO (Provident Fund)', patterns: [/epfo/i, /epfindia/i] },
];

/**
 * Extracts all URLs or potential web addresses from text
 */
export function extractUrlsFromText(text: string): string[] {
  if (!text) return [];

  // Match http/https URLs or bare domain-like patterns (e.g., bit.ly/abc, sbi-kyc.top)
  const urlRegex = /\b(?:https?:\/\/|www\.)[a-z0-9+&@#/%?=~_|!:,.;-]*[a-z0-9+&@#/%=~_|]|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*(?:\.(?:com|org|net|in|co\.in|gov\.in|top|xyz|live|site|online|club|click|work|buzz|info|io|ai|ly|me|cc|link|app|vip))\b(?:[/?][^\s]*)?/gi;

  const matches = text.match(urlRegex) || [];
  return Array.from(new Set(matches.map((u) => u.trim())));
}

/**
 * Normalizes and analyzes a given URL string for suspicious characteristics
 */
export function analyzeUrl(rawUrl: string): UrlAnalysis {
  let cleaned = rawUrl.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'http://' + cleaned;
  }

  let domain = '';
  let protocol = 'http:';
  let hasCredentialsInUrl = false;
  let pathname = '';

  try {
    const parsed = new URL(cleaned);
    domain = parsed.hostname.toLowerCase();
    protocol = parsed.protocol.toLowerCase();
    hasCredentialsInUrl = Boolean(parsed.username || parsed.password);
    pathname = parsed.pathname.toLowerCase();
  } catch {
    // Fallback for malformed URLs
    domain = cleaned.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0].toLowerCase();
    protocol = rawUrl.toLowerCase().startsWith('https://') ? 'https:' : 'http:';
  }

  const isHttps = protocol === 'https:';
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(domain) || /^\[?[a-f0-9:]+\]?$/i.test(domain);
  const domainParts = domain.split('.');
  const tld = domainParts.length > 1 ? domainParts[domainParts.length - 1] : '';

  const isShortener = KNOWN_SHORTENERS.has(domain);
  const hasSuspiciousTld = SUSPICIOUS_TLDS.has(tld);
  const hasExcessiveSubdomains = domainParts.length >= 4 && !domain.endsWith('.co.in') && !domain.endsWith('.gov.in');
  const hasSuspiciousExtension = /\.(apk|exe|scr|bat|cmd|vbs|msi|iso)$/i.test(pathname);

  // Lookalike & Impersonation Detection
  let isLookalike = false;
  let targetBrand: string | undefined;
  let lookalikeDetails: string | undefined;

  for (const item of TARGET_BRANDS) {
    const matchesBrand = item.patterns.some((p) => p.test(domain) || p.test(pathname));
    if (matchesBrand) {
      const legitDomains = OFFICIAL_DOMAINS[item.brand] || [];
      const isActuallyOfficial = legitDomains.some(
        (legit) => domain === legit || domain.endsWith('.' + legit)
      );

      if (!isActuallyOfficial) {
        isLookalike = true;
        targetBrand = item.name;
        lookalikeDetails = `Domain "${domain}" references "${item.name}" but is NOT on an official domain (${legitDomains.join(', ')}).`;
        break;
      }
    }
  }

  // Check deceptive subdomain tricks (e.g. sbi.co.in.fraudserver.com)
  if (!isLookalike && (domain.includes('sbi.co.in') || domain.includes('hdfcbank') || domain.includes('gov.in'))) {
    if (!domain.endsWith('gov.in') && !domain.endsWith('sbi.co.in') && !domain.endsWith('hdfcbank.com')) {
      isLookalike = true;
      targetBrand = 'Indian Institution';
      lookalikeDetails = `Subdomain deceit detected: Host "${domain}" places official name inside an unofficial host.`;
    }
  }

  // Punycode / Homograph check
  const isPunycode = domain.startsWith('xn--') || domain.includes('.xn--');

  const flags: UrlAnalysis['flags'] = [];

  if (isLookalike) {
    flags.push({
      code: 'LOOKALIKE_DOMAIN',
      severity: 'danger',
      description: {
        en: `Lookalike domain detected! Pretends to be ${targetBrand || 'official service'} but uses an unofficial host.`,
        hi: `नकली डोमेन पाया गया! यह ${targetBrand || 'आधिकारिक सेवा'} होने का दिखावा करता है लेकिन अनधिकृत होस्ट पर है।`,
        gu: `બનાવટી ડોમેન જણાયું! આ ${targetBrand || 'સત્તાવાર સેવા'} હોવાનો ડોળ કરે છે પરંતુ બિનસત્તાવાર હોસ્ટ પર છે.`,
      },
    });
  }

  if (isIpAddress) {
    flags.push({
      code: 'RAW_IP_HOST',
      severity: 'danger',
      description: {
        en: 'Direct IP address used instead of a legitimate domain name, typical of malicious hosting.',
        hi: 'वैध डोमेन के स्थान पर सीधे IP एड्रेस का उपयोग किया गया है, जो फर्जी वेबसाइटों का लक्षण है।',
        gu: 'માન્ય ડોમેન નેમના બદલે ડાયરેક્ટ IP એડ્રેસ વાપરવામાં આવ્યું છે, જે શંકાસ્પદ છે.',
      },
    });
  }

  if (isShortener) {
    flags.push({
      code: 'URL_SHORTENER',
      severity: 'warning',
      description: {
        en: 'URL shortener hides the true destination address, masking potential phishing pages.',
        hi: 'URL शॉर्टनर असली वेबसाइट पते को छिपाता है, जिससे फिशिंग पेज का खतरा बढ़ता है।',
        gu: 'URL શોર્ટનર અસલી વેબસાઇટ એડ્રેસ છુપાવે છે, જે ફિશિંગનું જોખમ વધારે છે.',
      },
    });
  }

  if (hasSuspiciousTld) {
    flags.push({
      code: 'HIGH_ABUSE_TLD',
      severity: 'warning',
      description: {
        en: `High-risk top-level domain (.${tld}) frequently associated with disposable fraud sites.`,
        hi: `उच्च-जोखिम वाला डोमेन एक्सटेंशन (.${tld}) जो आमतौर पर फर्जी या अस्थायी साइटों में देखा जाता है।`,
        gu: `ઉચ્ચ જોખમ ધરાવતું ડોમેન એક્સ્ટેંશન (.${tld}) જે મોટે ભાગે છેતરપિંડી કરતી સાઇટ્સ પર હોય છે.`,
      },
    });
  }

  if (hasSuspiciousExtension) {
    flags.push({
      code: 'EXECUTABLE_OR_APK',
      severity: 'danger',
      description: {
        en: 'Direct link to an Android APK or executable application file. High malware / banking trojan risk.',
        hi: 'Android APK या एप्लिकेशन फ़ाइल डाउनलोड करने का सीधा लिंक। मैलवेयर/बैंकिंग ट्रोजन का गंभीर खतरा।',
        gu: 'Android APK અથવા એપ ડાઉનલોડ કરવાની સીધી લિંક. માલવેર / બેંકિંગ ટ્રોજનનું ભારે જોખમ.',
      },
    });
  }

  if (!isHttps) {
    flags.push({
      code: 'INSECURE_HTTP',
      severity: 'warning',
      description: {
        en: 'Insecure unencrypted HTTP connection. Sensitive data can be intercepted.',
        hi: 'असुरक्षित अनएन्क्रिप्टेड HTTP कनेक्शन। आपकी निजी जानकारी चुराई जा सकती है।',
        gu: 'અસુરક્ષિત અનએન્ક્રિપ્ટેડ HTTP કનેક્શન. તમારી ખાનગી માહિતી ચોરાઈ શકે છે.',
      },
    });
  }

  if (hasExcessiveSubdomains) {
    flags.push({
      code: 'EXCESSIVE_SUBDOMAINS',
      severity: 'warning',
      description: {
        en: 'Unusual number of subdomain levels designed to deceive users on small screens.',
        hi: 'असामान्य सबडोमेन स्तर जो मोबाइल स्क्रीन पर उपयोगकर्ताओं को भ्रमित करने के लिए बनाए जाते हैं।',
        gu: 'અસામાન્ય સબડોમેન લેવલ જે મોબાઇલ સ્ક્રીન પર વપરાશકર્તાઓને છેતરવા માટે રચાયેલ છે.',
      },
    });
  }

  if (isPunycode) {
    flags.push({
      code: 'HOMOGRAPH_PUNYCODE',
      severity: 'danger',
      description: {
        en: 'Internationalized / Punycode characters detected; can be used to mimic authentic Latin letters.',
        hi: 'प्यूनिकोड (Punycode) वर्ण मिले; यह असली अक्षरों की नकल करने का प्रयास हो सकता है।',
        gu: 'પ્યુનિકોડ (Punycode) કેરેક્ટર્સ મળ્યા; આ અસલી અક્ષરોની નકલ કરવાનો પ્રયાસ હોઈ શકે છે.',
      },
    });
  }

  if (hasCredentialsInUrl) {
    flags.push({
      code: 'USER_INFO_TRICK',
      severity: 'danger',
      description: {
        en: 'URL uses @ symbol to spoof the destination server.',
        hi: 'URL में @ प्रतीक का उपयोग करके वास्तविक गंतव्य को छिपाने का प्रयास किया गया है।',
        gu: 'URL માં @ પ્રતીકનો ઉપયોગ કરીને અસલી સાઇટ છુપાવવાનો પ્રયાસ કરવામાં આવ્યો છે.',
      },
    });
  }

  return {
    rawUrl,
    cleanedUrl: cleaned,
    domain,
    protocol,
    isHttps,
    isIpAddress,
    isShortener,
    hasSuspiciousTld,
    isLookalike,
    targetBrand,
    lookalikeDetails,
    hasSuspiciousExtension,
    hasCredentialsInUrl,
    hasExcessiveSubdomains,
    flags,
  };
}
