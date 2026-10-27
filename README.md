# 🛡️ ScamShield Bharat (भारत का डिजिटल सुरक्षा कवच) 🇮🇳

> **Citizen-First, AI-Assisted Cyber Scam & Fraud Detection Platform for India**  
> *Identify fraud before it strikes. Transparent, Explainable, Multilingual, and 100% Private.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-Zero_Storage-green?style=for-the-badge&logo=shield)](file:///e:/Project/ScamShield%20Bharat/README.md#security--privacy-guarantees)
[![Helpline](https://img.shields.io/badge/National_Helpline-1930-red?style=for-the-badge&logo=phone)](tel:1930)

---

## 📌 Table of Contents

1. [Executive Summary & Problem Statement](#-executive-summary--problem-statement)
2. [What is ScamShield Bharat?](#-what-is-scamshield-bharat)
3. [Core Capabilities & Features](#-core-capabilities--features)
   - [A. Multilingual Scam Analyzer](#a-multilingual-scam-analyzer)
   - [B. Deep URL Safety & Lookalike Inspector](#b-deep-url-safety--lookalike-inspector)
   - [C. Realistic Demo Scenarios](#c-realistic-demo-scenarios)
   - [D. Safety Action Center & Incident Triage](#d-safety-action-center--incident-triage)
   - [E. Live Diagnostics & Verification Suite](#e-live-diagnostics--verification-suite)
4. [Detection Engine & Scoring Mathematics](#-detection-engine--scoring-mathematics)
5. [System Architecture & Project Structure](#-system-architecture--project-structure)
6. [API Specification](#-api-specification)
7. [Security & Privacy Guarantees](#-security--privacy-guarantees)
8. [Installation & Local Setup](#-installation--local-setup)
9. [Deployment Guide (Vercel Ready)](#-deployment-guide-vercel-ready)
10. [Official Government Cybercrime Portals](#-official-government-cybercrime-portals)

---

## 🚨 Executive Summary & Problem Statement

India is undergoing an unprecedented digital revolution, with over 800 million smartphone users and billions of UPI transactions processed monthly. However, this rapid adoption has triggered a surge in sophisticated cyber fraud targeting everyday citizens:

- **Fake Bank KYC Notices**: Fraudulent SMS claiming SBI/HDFC/ICICI accounts are locked to steal netbanking credentials.
- **Electricity Disconnection Threats**: Mass panic messages claiming "Power supply will be cut off tonight at 9:30 PM".
- **"Digital Arrest" Extortion**: Fraudsters impersonating the CBI, ED, or Mumbai Police on video calls accusing victims of narcotics parcel seizures.
- **Part-Time Work-From-Home Traps**: Telegram investment schemes promising ₹3,000–₹8,000 daily for liking YouTube videos.
- **Courier / Delivery Address Phishing**: Fake India Post/courier SMS using `.top` domains to harvest credit card details.

Existing anti-virus solutions are designed for enterprise IT systems, not for ordinary citizens, vernacular speakers, or elderly family members. Most AI chatbots generate vague, hallucinated advice or require expensive paid API keys.

**ScamShield Bharat** solves this crisis by delivering a fast, explainable, zero-storage scam analyzer directly in the browser, completely free of charge.

---

## 🇮🇳 What is ScamShield Bharat?

**ScamShield Bharat** is an open-source civic cybersecurity platform engineered specifically for the Indian threat landscape. It translates technical cyber indicators into clear, explainable guidance in **English**, **Hindi (हिन्दी)**, and **Gujarati (ગુજરાતી)**.

### Core Tenets
1. **Explainable AI & Heuristics**: No black boxes. Every risk score is calculated from transparent, documented threat indicators.
2. **Zero-Storage Privacy**: Sensitive messages, phone numbers, and URLs are analyzed locally in the user's browser and **never saved to a database**.
3. **Action-Oriented Response**: Moves beyond warning signs to provide a step-by-step triage checklist and direct access to India's **1930** national cybercrime helpline.
4. **Zero Paid Dependencies**: Runs autonomously with no required paid APIs, no hardware, and no mandatory cloud databases.

---

## ⚡ Core Capabilities & Features

### A. Multilingual Scam Analyzer
- **Multilingual Support**: Switch seamlessly between **English**, **हिन्दी (Hindi)**, and **ગુજરાતી (Gujarati)** with dynamic UI and explanation translation.
- **Explainable 0–100 Risk Score**:
  - 🟢 **LOW RISK (0–29)**: Standard transactional or informational alert (e.g. genuine bank debit alerts with masked account numbers `XX1234` score 5).
  - 🟡 **MEDIUM RISK (30–59)**: Moderate suspicion or urgency tactics.
  - 🟠 **HIGH RISK (60–79)**: Prominent threat patterns (e.g. 9:30 PM electricity disconnection threat).
  - 🔴 **CRITICAL RISK (80–100)**: Direct OTP theft, APK trojans, lottery advance fees, or fake banking lookalikes.
- **Threat Vector Breakdown**: Visual progress bars quantifying:
  - *Artificial Urgency & Threats*
  - *Brand & Authority Impersonation*
  - *Credential & OTP Harvesting*
  - *Financial Traps & Advance Fees*
  - *Remote Access & APK Malware*
  - *Deceptive Links & Lookalike Domains*
- **Actionable Report Sharing**: 1-click **Copy Assessment Report** (clean markdown) and **Share on WhatsApp** (`https://wa.me/?text=...`) to warn family members and elderly relatives.

### B. Deep URL Safety & Lookalike Inspector
- **Brand Lookalike / Typosquatting**: Identifies domains posing as Indian institutions (`sbi`, `yono`, `hdfc`, `icici`, `indiapost`, `incometax`, `epfo`) on unofficial hosts.
- **High-Abuse TLDs**: Flags disposable domain extensions (`.top`, `.xyz`, `.buzz`, `.club`, `.work`).
- **URL Shortener Masking**: Detects destination masking via `bit.ly`, `tinyurl.com`, `is.gd`, `cutt.ly`, etc.
- **Malicious APK / Executables**: Warns against direct `.apk` and `.exe` downloads.
- **Raw IP Hosts**: Detects URLs pointing directly to IP addresses.
- **Explicit Safety Notice**: Strictly warns: *"Never claim a website is safe merely because no suspicious pattern was matched."*

### C. Realistic Demo Scenarios
Pre-loaded authentic Indian fraud scenarios for 1-click demonstration:
1. **Fake Bank KYC Suspension SMS**: SBI/YONO account locked alert with malicious shortlink.
2. **Electricity Disconnection Scare**: Urgent 9:30 PM power cutoff notice demanding a phone call.
3. **KBC / Jio ₹25 Lakh Lottery Fraud**: Fake lottery manager asking for ₹1,200 verification fee.
4. **Work-from-Home YouTube Like Task Scam**: ₹3,000 daily pay promise leading to Telegram deposit traps.
5. **India Post Delivery Phishing**: Address update phishing on a lookalike `.top` domain.
6. **Digital Arrest / Narcotics Parcel Threat**: Fake Mumbai Police notice threatening video call arrest.
7. **Legitimate Bank Transaction Alert**: Authentic debited SMS with masked account number and standard block shortcode.

### D. Safety Action Center & Incident Triage
- **Interactive Triage Wizard ("What happened to you?")**:
  1. *I just received this message* (Do not click, block and report)
  2. *I clicked the link but entered nothing* (Disconnect internet, clear cache, delete APKs)
  3. *I entered my OTP or credentials* (Call bank to freeze accounts, change passwords)
  4. *I transferred money or was scammed* (Dial 1930 within the Golden Hours)
- **Golden Hours Alert**: Emphasizes the critical first 2 hours to freeze fraudulent beneficiary accounts via I4C.
- **Emergency Helpline Badge**: One-tap direct dial to `tel:1930` and links to `https://cybercrime.gov.in/`, DoT Chakshu (`sancharsaathi.gov.in`), and RBI Sachet (`sachet.rbi.org.in`).
- **Evidence Preservation Checklist**: Guidance on preserving alphanumeric SMS headers, 12-digit UTR numbers, and WhatsApp chat logs.

### E. Live Diagnostics & Verification Suite
- Built-in live test runner for hackathon judges and developers to test the rule engine directly in the browser across 13 test cases.

---

## 🧮 Detection Engine & Scoring Mathematics

The ScamShield Bharat detection engine (`src/lib/engine/`) combines deterministic pattern matching with weighted heuristic accumulation.

### Indicator Weights Matrix

| Category | Indicator Rule | Weight | Severity |
| :--- | :--- | :---: | :---: |
| **Credential** | Direct OTP / PIN / Password Request | `+35` | Critical |
| **Credential** | Fake KYC / PAN / Aadhaar Suspension Prompt | `+30` | High |
| **Urgency** | Digital Arrest / Fake Law Enforcement Threat | `+35` | Critical |
| **Urgency** | Electricity Disconnection Threat (9:30 PM) | `+30` | Critical |
| **Urgency** | Artificial Urgency (Within 24 Hours / Today) | `+20` | Medium |
| **Financial** | UPI / QR Code Money Receiving Trap | `+35` | Critical |
| **Financial** | Lottery / Lucky Draw / KBC Prize Fraud | `+35` | Critical |
| **Financial** | Upfront Processing / Verification Fee Trap | `+30` | High |
| **Financial** | Work-From-Home / YouTube Like Task Scam | `+30` | High |
| **Remote Access** | AnyDesk / TeamViewer / Remote Control Apps | `+35` | Critical |
| **Remote Access** | Direct `.APK` or Executable Link | `+35` | Critical |
| **URL Heuristic** | Lookalike Banking/Govt Domain Host | `+35` | Critical |
| **URL Heuristic** | Raw IP Address as Hostname | `+30` | Critical |
| **URL Heuristic** | URL Shortener Masking (`bit.ly`, `tinyurl`) | `+20` | Medium |
| **URL Heuristic** | High-Abuse TLD (`.top`, `.xyz`, etc.) | `+20` | Medium |
| **URL Heuristic** | Insecure Unencrypted HTTP Protocol | `+10` | Low |

### Scoring Calculation
1. **Raw Accumulation**:
   $$\text{RawScore} = \sum_{i=1}^{n} \text{Weight}_i$$
2. **Legitimate Message Detection**:
   If the message contains authentic automated bank alert signatures (e.g. `debited from A/c XX1234`, `Avl Bal`, `SMS BLOCK to 567676`) and contains **no external URLs**, the score is capped at **5 (LOW RISK)**.
3. **Composite Normalization**:
   $$\text{FinalScore} = \min(100, \text{RawScore})$$

---

## 🏗️ System Architecture & Project Structure

```
scamshield-bharat/
├── public/                     # Static assets & icons
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts    # REST API endpoint (POST analysis & GET diagnostics)
│   │   ├── globals.css         # Theme tokens, cyber grid, animations
│   │   ├── layout.tsx          # Root layout, metadata, SEO & viewport config
│   │   └── page.tsx            # Main application controller & state coordinator
│   ├── components/
│   │   ├── ActionCenter.tsx    # Incident triage wizard, Golden Hours, helpline links
│   │   ├── ExampleScenarios.tsx# 1-click interactive demo scenarios
│   │   ├── Footer.tsx          # Civic tech disclosures, privacy badge
│   │   ├── HeroBanner.tsx      # National cyber awareness header & ticker
│   │   ├── HowItWorks.tsx      # Rule weight breakdown & live browser test runner
│   │   ├── Navbar.tsx          # 1930 emergency badge, language selector, theme toggle
│   │   ├── ResultDashboard.tsx # Animated SVG gauge, breakdown bars, WhatsApp share
│   │   └── UrlSafetyChecker.tsx# Deep domain inspection & lookalike analyzer
│   └── lib/
│       ├── data/
│       │   └── examples.ts     # Curated Indian scam & legitimate test cases
│       ├── engine/
│       │   ├── rules.ts        # Comprehensive Indian scam rules & regexes
│       │   ├── scamDetector.ts # Core evaluation engine & multilingual summaries
│       │   ├── testEngine.ts   # 13-test automated verification harness
│       │   ├── types.ts        # TypeScript data models & domain types
│       │   └── urlDetector.ts  # Safe URL parser, TLDs & lookalike brand matcher
│       └── i18n/
│           └── translations.ts # Trilingual dictionary (English, Hindi, Gujarati)
├── AGENTS.md                   # Development instructions
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Complete documentation
```

---

## 📡 API Specification

ScamShield Bharat includes an integrated REST API for server-side evaluation, automated testing, and developer integrations.

### 1. Analyze Content

- **Endpoint**: `POST /api/analyze`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "text": "Dear customer your SBI account is locked. Update KYC at bit.ly/sbi-pan"
}
```

#### Response (`200 OK`)
```json
{
  "input": "Dear customer your SBI account is locked. Update KYC at bit.ly/sbi-pan",
  "inputType": "mixed",
  "score": 85,
  "riskLevel": "CRITICAL",
  "summary": {
    "en": "CRITICAL DANGER: Detected 4 high-confidence red flags consistent with active cyber fraud or credential theft...",
    "hi": "अत्यंत गंभीर जोखिम: सक्रिय साइबर धोखाधड़ी और गोपनीय जानकारी चोरी के 4 पुख्ता संकेत मिले हैं...",
    "gu": "અતિ ગંભીર જોખમ: સક્રિય સાયબર છેતરપિંડી અને ખાનગી વિગતો ચોરી કરવાના 4 મજબૂત સંકેતો મળ્યા છે..."
  },
  "warnings": [
    {
      "id": "CRED_KYC_PAN_UPDATE",
      "category": "credential",
      "severity": "high",
      "weight": 30,
      "title": { "en": "Suspicious KYC / PAN / Aadhaar Update Prompt", ... },
      "explanation": { "en": "Scammers frequently send fake KYC suspension warnings...", ... },
      "matchedPatterns": ["account is locked"]
    },
    {
      "id": "URL_SHORTENER_bit.ly",
      "category": "suspicious_link",
      "severity": "medium",
      "weight": 20,
      "title": { "en": "URL Shortener Masking Destination (bit.ly)", ... },
      "explanation": { "en": "Shortened URLs mask the true destination server...", ... },
      "matchedPatterns": ["bit.ly"]
    }
  ],
  "categoryScores": {
    "urgency": 0,
    "impersonation": 20,
    "credential": 30,
    "financial": 0,
    "remote_access": 0,
    "suspicious_link": 35
  },
  "urlsFound": [
    {
      "rawUrl": "bit.ly/sbi-pan",
      "domain": "bit.ly",
      "isShortener": true,
      "isHttps": false
    }
  ],
  "recommendedActions": {
    "en": [
      "NEVER share your OTP, UPI MPIN, ATM PIN, or passwords with anyone under any circumstances.",
      "Do NOT click the link. If you need to access your account, type the official bank website directly.",
      "Immediately call India Cybercrime Helpline 1930 and report at cybercrime.gov.in."
    ]
  },
  "analyzedAt": "2026-10-27T18:55:57.000Z",
  "detectionMode": "rule_engine"
}
```

### 2. Diagnostics & Healthcheck

- **Endpoint**: `GET /api/analyze`
- **Response**: Returns engine status and executes all 13 built-in verification test cases.

```json
{
  "status": "ScamShield Bharat Engine Online",
  "timestamp": "2026-10-27T13:24:56.948Z",
  "tests": {
    "total": 13,
    "passed": 13,
    "results": [ ... ]
  }
}
```

---

## 🔒 Security & Privacy Guarantees

1. **Client-Side First Processing**: All text analysis and URL heuristic calculations execute locally in the user's browser whenever accessed via the frontend UI.
2. **Zero Storage Guarantee**: No databases, cookies, or telemetry stores user-submitted text, passwords, or telephone numbers.
3. **Safe URL Evaluation**: ScamShield Bharat **never** automatically visits, pings, or downloads content from submitted URLs. All analysis is performed through structural string parsing and domain syntax heuristics.
4. **Input Sanitization**: Special zero-width unicode characters (often used by attackers to bypass keyword filters) are stripped before processing. All user input is rendered as inert text to prevent Cross-Site Scripting (XSS).

---

## 💻 Installation & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher (Tested on v24.13.1)
- [npm](https://www.npmjs.com/) v9.0.0 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/VG31OP/scamshield-bharat.git
cd scamshield-bharat

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Run Production Build & Tests

```bash
# Run type check and production compilation
npm run build

# Start production server
npm start

# Run API diagnostics via curl
curl http://localhost:3000/api/analyze
```

---

## 🚀 Deployment Guide (Vercel Ready)

ScamShield Bharat is completely free of native binary dependencies, database configs, and paid API keys, making it ready for 1-click deployment on **Vercel**:

1. Push your repository to **GitHub** or **GitLab**.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `scamshield-bharat` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

No environment variables are required for the core application to function.

---

## 🏛️ Official Government Cybercrime Portals

If you or someone you know has been defrauded, utilize these official Government of India resources:

- 📞 **National Cyber Crime Helpline**: **1930** (Toll-Free, 24x7)
- 🌐 **National Cyber Crime Reporting Portal**: [https://cybercrime.gov.in](https://cybercrime.gov.in/)
- 📱 **DoT Chakshu Portal (Report Fraud SMS / Numbers)**: [https://sancharsaathi.gov.in](https://sancharsaathi.gov.in/)
- 🏦 **RBI Sachet (Report Unauthorized Financial Entities)**: [https://sachet.rbi.org.in](https://sachet.rbi.org.in/)

---

## 📄 License & Disclaimer

This project is open-source under the [MIT License](LICENSE).

**Disclaimer**: ScamShield Bharat is a civic technology initiative designed to aid Indian citizens in identifying common cybercrime indicators. While our rule sets are aligned with CERT-In and I4C advisories, no automated heuristic system can guarantee 100% accuracy. Always independently verify unexpected communications with official institutional helplines.

---

*Built with ❤️ for a Cyber-Safe Bharat 🇮🇳*
