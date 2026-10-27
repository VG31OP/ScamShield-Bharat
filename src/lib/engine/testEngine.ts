import { analyzeContent } from './scamDetector';
import { DEMO_EXAMPLES } from '../data/examples';

export interface TestResult {
  name: string;
  passed: boolean;
  details: string;
  score?: number;
  riskLevel?: string;
}

export function runDetectionTests(): { total: number; passed: number; results: TestResult[] } {
  const results: TestResult[] = [];

  // Test 1: Empty input handling
  try {
    const emptyRes = analyzeContent('');
    const passed = emptyRes.score === 0 && emptyRes.riskLevel === 'LOW';
    results.push({
      name: 'Empty Input Boundary Test',
      passed,
      details: passed ? 'Handled empty input gracefully with 0 score' : 'Failed to handle empty input',
      score: emptyRes.score,
      riskLevel: emptyRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Empty Input Boundary Test',
      passed: false,
      details: `Exception thrown: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 2: Whitespace and zero-width unicode bypass attempt
  try {
    const unicodeInput = '\u200B \u200C \uFEFF   ';
    const unicodeRes = analyzeContent(unicodeInput);
    const passed = unicodeRes.score === 0 && unicodeRes.riskLevel === 'LOW';
    results.push({
      name: 'Zero-Width Unicode Sanitization Test',
      passed,
      details: passed ? 'Properly sanitized zero-width whitespace bytes' : 'Failed on zero-width spaces',
      score: unicodeRes.score,
      riskLevel: unicodeRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Zero-Width Unicode Sanitization Test',
      passed: false,
      details: `Exception thrown: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 3: Malformed URL parsing (doesn't crash URL parser)
  try {
    const malformedUrl = 'http://:::invalid...url???foo=bar@@evil.com';
    const malformedRes = analyzeContent(malformedUrl);
    const passed = typeof malformedRes.score === 'number' && malformedRes.urlsFound.length > 0;
    results.push({
      name: 'Malformed URL Robustness Test',
      passed,
      details: passed ? 'Parsed malformed URL without throwing exceptions' : 'Failed on malformed URL',
      score: malformedRes.score,
      riskLevel: malformedRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Malformed URL Robustness Test',
      passed: false,
      details: `Exception thrown: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 4: Extremely long text input (DDoS / ReDoS resilience)
  try {
    const longText = 'Dear customer your account update required. '.repeat(200) + 'Visit bit.ly/kyc-fraud';
    const start = performance.now();
    const longRes = analyzeContent(longText);
    const elapsed = performance.now() - start;
    const passed = elapsed < 500 && longRes.score >= 30; // Under 500ms
    results.push({
      name: 'Long Text ReDoS / Stress Test (8,000+ chars)',
      passed,
      details: passed ? `Completed in ${elapsed.toFixed(1)}ms with proper scoring` : `Too slow or failed (${elapsed.toFixed(1)}ms)`,
      score: longRes.score,
      riskLevel: longRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Long Text ReDoS / Stress Test',
      passed: false,
      details: `Exception thrown: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 5: Verify all realistic demo scenarios evaluate to their expected risk levels
  for (const demo of DEMO_EXAMPLES) {
    try {
      const res = analyzeContent(demo.content);
      const passed =
        demo.expectedRisk === 'LOW'
          ? res.riskLevel === 'LOW'
          : demo.expectedRisk === 'CRITICAL'
          ? res.riskLevel === 'CRITICAL' || res.riskLevel === 'HIGH'
          : res.riskLevel === 'HIGH' || res.riskLevel === 'CRITICAL' || res.riskLevel === 'MEDIUM';

      results.push({
        name: `Scenario Test: ${demo.title.en}`,
        passed,
        details: `Expected: ${demo.expectedRisk}, Detected: ${res.riskLevel} (Score: ${res.score})`,
        score: res.score,
        riskLevel: res.riskLevel,
      });
    } catch (err: unknown) {
      results.push({
        name: `Scenario Test: ${demo.title.en}`,
        passed: false,
        details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  // Test 6: Multilingual Hindi Detection
  try {
    const hindiInput = 'बिजली कट जाएगी आज रात 9:30 बजे। तुरंत बिजली अधिकारी 9876543210 पर संपर्क करें।';
    const hindiRes = analyzeContent(hindiInput);
    const passed = hindiRes.score >= 50 && hindiRes.warnings.length > 0;
    results.push({
      name: 'Hindi Devanagari Detection Test',
      passed,
      details: passed ? `Detected threat from Hindi text (Score: ${hindiRes.score})` : 'Failed to flag Hindi keywords',
      score: hindiRes.score,
      riskLevel: hindiRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Hindi Devanagari Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 7: Multilingual Gujarati Detection
  try {
    const gujInput = 'તમારું બેંક ખાતું બંધ થઈ ગયું છે. કેવાયસી અપડેટ કરવા માટે ઓટીપી મોકલો.';
    const gujRes = analyzeContent(gujInput);
    const passed = gujRes.score >= 50 && gujRes.warnings.length > 0;
    results.push({
      name: 'Gujarati Script Detection Test',
      passed,
      details: passed ? `Detected threat from Gujarati text (Score: ${gujRes.score})` : 'Failed to flag Gujarati keywords',
      score: gujRes.score,
      riskLevel: gujRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Gujarati Script Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 8: Multilingual Bengali Detection
  try {
    const bnInput = 'আপনার বিদ্যুৎ বিল বকেয়া থাকায় আজ লাইন কেটে দেওয়া হবে। অবিলম্বে ৯৮৭৬৫৪৩২১০ নম্বরে যোগাযোগ করুন।';
    const bnRes = analyzeContent(bnInput);
    const passed = bnRes.score >= 30 && bnRes.warnings.length > 0;
    results.push({
      name: 'Bengali Script Detection Test',
      passed,
      details: passed ? `Detected threat from Bengali text (Score: ${bnRes.score})` : 'Failed to flag Bengali keywords',
      score: bnRes.score,
      riskLevel: bnRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Bengali Script Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 9: Multilingual Marathi Detection
  try {
    const mrInput = 'तुमचे वीज बिल भरले नसल्यामुळे आज रात्री वीज पुरवठा खंडित केला जाईल. ९८७६५४३२१० वर संपर्क साधा.';
    const mrRes = analyzeContent(mrInput);
    const passed = mrRes.score >= 30 && mrRes.warnings.length > 0;
    results.push({
      name: 'Marathi Script Detection Test',
      passed,
      details: passed ? `Detected threat from Marathi text (Score: ${mrRes.score})` : 'Failed to flag Marathi keywords',
      score: mrRes.score,
      riskLevel: mrRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Marathi Script Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 10: Multilingual Telugu Detection
  try {
    const teInput = 'విద్యుత్ బిల్లు చెల్లించనందున ఈ రాత్రి విద్యుత్ సరఫరా నిలిపివేయబడుతుంది. వెంటనే 9876543210 కు కాల్ చేయండి.';
    const teRes = analyzeContent(teInput);
    const passed = teRes.score >= 30 && teRes.warnings.length > 0;
    results.push({
      name: 'Telugu Script Detection Test',
      passed,
      details: passed ? `Detected threat from Telugu text (Score: ${teRes.score})` : 'Failed to flag Telugu keywords',
      score: teRes.score,
      riskLevel: teRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Telugu Script Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 11: Multilingual Tamil Detection
  try {
    const taInput = 'மின்சார கட்டணம் செலுத்தப்படாததால் இன்று இரவு மின் இணைப்பு துண்டிக்கப்படும். உடனடியாக 9876543210 தொடர்பு கொள்ளவும்.';
    const taRes = analyzeContent(taInput);
    const passed = taRes.score >= 30 && taRes.warnings.length > 0;
    results.push({
      name: 'Tamil Script Detection Test',
      passed,
      details: passed ? `Detected threat from Tamil text (Score: ${taRes.score})` : 'Failed to flag Tamil keywords',
      score: taRes.score,
      riskLevel: taRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Tamil Script Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Test 12: Multilingual Kannada Detection
  try {
    const knInput = 'ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿಸದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುವುದು. ತಕ್ಷಣ 9876543210 ಗೆ ಕರೆ ಮಾಡಿ.';
    const knRes = analyzeContent(knInput);
    const passed = knRes.score >= 30 && knRes.warnings.length > 0;
    results.push({
      name: 'Kannada Script Detection Test',
      passed,
      details: passed ? `Detected threat from Kannada text (Score: ${knRes.score})` : 'Failed to flag Kannada keywords',
      score: knRes.score,
      riskLevel: knRes.riskLevel,
    });
  } catch (err: unknown) {
    results.push({
      name: 'Kannada Script Detection Test',
      passed: false,
      details: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  const passedCount = results.filter((r) => r.passed).length;
  return {
    total: results.length,
    passed: passedCount,
    results,
  };
}
