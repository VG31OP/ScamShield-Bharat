import { Language, RiskLevel } from '../engine/types';

export interface ScamExample {
  id: string;
  title: Partial<Record<Language, string>> & { en: string };
  category: string;
  expectedRisk: RiskLevel;
  badge: Partial<Record<Language, string>> & { en: string };
  description: Partial<Record<Language, string>> & { en: string };
  content: string;
}

export const DEMO_EXAMPLES: ScamExample[] = [
  {
    id: 'sbi-kyc-scam',
    title: {
      en: 'Fake Bank KYC Suspension SMS',
      hi: 'एसबीआई फर्जी केवाईसी सस्पेंशन एसएमएस',
      gu: 'એસબીઆઈ નકલી કેવાયસી સસ્પેન્શન SMS',
    },
    category: 'Banking / Phishing',
    expectedRisk: 'CRITICAL',
    badge: {
      en: 'Bank Phishing',
      hi: 'बैंक फिशिंग',
      gu: 'બેંક ફિશિંગ',
    },
    description: {
      en: 'Pretends to be SBI warning that your YONO account is locked and demands immediate PAN update via a malicious shortlink.',
      hi: 'एसबीआई योनो अकाउंट ब्लॉक होने का डर दिखाकर फर्जी शॉर्टलिंक पर पैन कार्ड अपडेट करने को कहता है।',
      gu: 'એસબીઆઈ યોનો એકાઉન્ટ બ્લોક થવાનો ડર બતાવી નકલી લિંક પર પાન કાર્ડ અપડેટ કરવા કહે છે.',
    },
    content:
      'Dear SBI Customer, your YONO NetBanking account has been suspended due to pending KYC verification. Update your PAN immediately at https://bit.ly/sbi-pan-kyc-update to avoid account deactivation within 24 hours.',
  },
  {
    id: 'electricity-bill-scam',
    title: {
      en: 'Electricity Bill Disconnection Threat',
      hi: 'बिजली कनेक्शन काटने की फर्जी धमकी',
      gu: 'વીજળી કનેક્શન કાપવાની નકલી ધમકી',
    },
    category: 'Utility Scam',
    expectedRisk: 'HIGH',
    badge: {
      en: 'Utility Threat',
      hi: 'बिजली धमकी',
      gu: 'વીજળી ધમકી',
    },
    description: {
      en: 'Urgent notice claiming tonight 9:30 PM power cutoff due to unpaid bill, asking victim to call a personal mobile number.',
      hi: 'आज रात 9:30 बजे बिजली कटने की धमकी देकर किसी अनजान मोबाइल नंबर पर कॉल करने को मजबूर करता है।',
      gu: 'આજે રાત્રે 9:30 વાગ્યે વીજળી કપાઈ જશે તેવી ધમકી આપી ખાનગી નંબર પર ફોન કરવા કહે છે.',
    },
    content:
      'Dear Consumer, your electricity bill was not updated in the system. Your power supply will be disconnected tonight at 9:30 PM from the electricity office. Call our electricity officer immediately at 9876543210.',
  },
  {
    id: 'kbc-lottery-scam',
    title: {
      en: 'KBC / Jio ₹25 Lakh Lottery Fraud',
      hi: 'केबीसी / जियो ₹25 लाख लॉटरी फ्रॉड',
      gu: 'KBC / જીઓ ₹25 લાખ લોટરી ફ્રોડ',
    },
    category: 'Lottery / Advance Fee',
    expectedRisk: 'CRITICAL',
    badge: {
      en: 'Lottery Fraud',
      hi: 'लॉटरी फ्रॉड',
      gu: 'લોટરી ફ્રોડ',
    },
    description: {
      en: 'Classic advance-fee fraud claiming you won a huge cash prize, requiring WhatsApp contact and upfront fees.',
      hi: 'लाखों के लकी ड्रा का झांसा देकर व्हाट्सऐप पर संपर्क करने और बाद में टैक्स/प्रोसेसिंग फीस मांगने का जाल।',
      gu: 'લાખોના લકી ડ્રોની લાલચ આપી વોટ્સએપ પર વાત કરી પ્રોસેસિંગ ફી પડાવવાની જાળ.',
    },
    content:
      'Congratulations! Your SIM number has won ₹25,00,000 cash prize in KBC Jio Lucky Draw 2026. Contact lottery manager Rana Pratap Singh on WhatsApp at +91-9988776655 to claim your prize after paying ₹1,200 verification fee.',
  },
  {
    id: 'job-part-time-scam',
    title: {
      en: 'Work-from-Home YouTube Like Task Scam',
      hi: 'घर बैठे कमाई / यूट्यूब वीडियो टास्क स्कैम',
      gu: 'ઘેર બેઠા કમાણી / યુટ્યુબ ટાસ્ક સ્કેમ',
    },
    category: 'Employment Fraud',
    expectedRisk: 'HIGH',
    badge: {
      en: 'Job Task Fraud',
      hi: 'जॉब टास्क फ्रॉड',
      gu: 'જોબ ટાસ્ક ફ્રોડ',
    },
    description: {
      en: 'Promises high daily pay for liking videos, but demands registration money and leads victims to Telegram investment traps.',
      hi: 'वीडियो लाइक करके रोजाना ₹3,000 कमाने का लालच और शुरू करने के लिए रजिस्ट्रेशन फीस की मांग।',
      gu: 'વિડીયો લાઈક કરીને રોજના ₹3,000 કમાવવાની લાલચ અને શરૂ કરવા રજીસ્ટ્રેશન ફીની માંગણી.',
    },
    content:
      'Part-time job offer! Earn ₹3,000 to ₹8,000 daily from home just by liking YouTube videos and rating hotels. No experience required. Pay ₹499 registration fee to start today. Join our official Telegram group @QuickDailyIncome.',
  },
  {
    id: 'india-post-delivery-scam',
    title: {
      en: 'India Post Delivery Address Update Phishing',
      hi: 'इंडिया पोस्ट पार्सल पता अपडेट फिशिंग',
      gu: 'ઇન્ડિયા પોસ્ટ પાર્સલ સરનામું અપડેટ ફિશિંગ',
    },
    category: 'Courier Phishing',
    expectedRisk: 'CRITICAL',
    badge: {
      en: 'Courier Phishing',
      hi: 'कूरियर फिशिंग',
      gu: 'કુરિયર ફિશિંગ',
    },
    description: {
      en: 'Claims a parcel failed delivery due to missing address and points to a lookalike domain with a suspicious .top extension.',
      hi: 'अधूरा पता बताकर पार्सल रुकने का दावा और .top डोमेन वाली फर्जी वेबसाइट पर एड्रेस व कार्ड डिटेल्स मांगने का खेल।',
      gu: 'અધૂરું સરનામું બતાવી પાર્સલ અટકવાનો દાવો અને .top ડોમેન પર કાર્ડ વિગતો ચોરવાનો ખેલ.',
    },
    content:
      'India Post: Your package #IN748291 could not be delivered due to an incomplete street address. Please update your delivery details within 24 hours at http://indiapost-parcel-update.top/address to prevent return to sender.',
  },
  {
    id: 'digital-arrest-scam',
    title: {
      en: 'Digital Arrest / Narcotics Parcel Threat',
      hi: 'डिजिटल अरेस्ट / नारकोटिक्स पार्सल की धमकी',
      gu: 'ડિજિટલ અરેસ્ટ / નાર્કોટિક્સ પાર્સલની ધમકી',
    },
    category: 'Law Enforcement Threat',
    expectedRisk: 'CRITICAL',
    badge: {
      en: 'Digital Arrest',
      hi: 'डिजिटल अरेस्ट',
      gu: 'ડિજિટલ અરેસ્ટ',
    },
    description: {
      en: 'Falsely claims Mumbai Police & Narcotics department found illegal drugs in a parcel sent in your name and threatens digital arrest.',
      hi: 'आपके नाम से भेजे पार्सल में नशीले पदार्थ मिलने का झूठा दावा और गिरफ्तारी से बचने के लिए वीडियो कॉल करने का दबाव।',
      gu: 'તમારા નામના પાર્સલમાં ડ્રગ્સ મળ્યાનો ખોટો દાવો અને ધરપકડથી બચવા વિડીયો કોલ કરવાનું દબાણ.',
    },
    content:
      'MUMBAI POLICE & CUSTOMS NOTICE: A parcel containing illegal narcotics and 5 passports registered under your Aadhaar has been intercepted at Mumbai Airport. An immediate arrest warrant is issued. Connect on Skype for official Digital Arrest interrogation.',
  },
  {
    id: 'legitimate-bank-sms',
    title: {
      en: 'Legitimate Bank Transaction Alert (Safe)',
      hi: 'असली बैंक ट्रांजेक्शन अलर्ट (सुरक्षित)',
      gu: 'અસલી બેંક ટ્રાન્ઝેક્શન એલર્ટ (સુરક્ષિત)',
    },
    category: 'Genuine Notification',
    expectedRisk: 'LOW',
    badge: {
      en: 'Legitimate Alert',
      hi: 'सुरक्षित संदेश',
      gu: 'સુરક્ષિત સંદેશ',
    },
    description: {
      en: 'Authentic automated bank debit SMS with masked account number, balance update, and standard telecom block shortcode. No suspicious links.',
      hi: 'बैंक का सामान्य लेन-देन एसएमएस जिसमें सुरक्षित रूप से छुपाया हुआ खाता नंबर और बैलेंस है, कोई संदिग्ध लिंक नहीं।',
      gu: 'બેંકનો સામાન્ય વ્યવહાર SMS જેમાં સુરક્ષિત ખાતા નંબર અને બેલેન્સ છે, કોઈ શંકાસ્પદ લિંક નથી.',
    },
    content:
      'Rs 1,500.00 debited from A/c XX1234 on 24-Oct-2026 14:20:10 via UPI ref 4293810294. Available Balance: Rs 24,530.00. If not done by you, SMS BLOCK to 567676 or call 1800112211.',
  },
];
