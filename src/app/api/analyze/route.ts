import { NextRequest, NextResponse } from 'next/server';
import { analyzeContent } from '@/lib/engine/scamDetector';
import { runDetectionTests } from '@/lib/engine/testEngine';

export async function POST(request: NextRequest) {
  try {
    // Check Content-Length before consuming stream to protect against memory exhaustion
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json(
        { error: 'Payload too large: Max 64KB permitted' },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body: Malformed request payload' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid request body: Expected JSON object' },
        { status: 400 }
      );
    }

    const { text } = body as { text?: unknown };

    if (typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: "text" must be a string' },
        { status: 400 }
      );
    }

    // Rate-limiting / payload size protection
    if (text.length > 20000) {
      return NextResponse.json(
        { error: 'Payload too large: Max 20,000 characters permitted' },
        { status: 413 }
      );
    }

    const result = analyzeContent(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error in /api/analyze:', error);
    return NextResponse.json(
      { error: 'Internal server error processing analysis' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const shouldRunTests = request.nextUrl.searchParams.get('tests') === 'true';

  if (shouldRunTests) {
    const testResults = runDetectionTests();
    return NextResponse.json({
      status: 'ScamShield Bharat Engine Online',
      timestamp: new Date().toISOString(),
      tests: testResults,
    });
  }

  // Lightweight health-check endpoint for standard uptime monitors and load balancers
  return NextResponse.json({
    status: 'ScamShield Bharat Engine Online',
    timestamp: new Date().toISOString(),
    service: 'scamshield-bharat-api',
    version: '1.0.0',
    mode: 'heuristic_rule_engine',
  });
}
