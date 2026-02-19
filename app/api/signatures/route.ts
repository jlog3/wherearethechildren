// app/api/signatures/route.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const COUNT_KEY = 'petition:signatures';
const EMAILS_KEY = 'petition:emails'; // Redis Set of hashed emails

// GET — return current count
export async function GET() {
  try {
    const count = (await redis.get<number>(COUNT_KEY)) ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

// POST — check for duplicate, increment if new
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailHash = body.emailHash;

    if (!emailHash) {
      return NextResponse.json({ error: 'Missing emailHash' }, { status: 400 });
    }

    // Check if this email hash already exists
    const alreadySigned = await redis.sismember(EMAILS_KEY, emailHash);

    if (alreadySigned) {
      const count = (await redis.get<number>(COUNT_KEY)) ?? 0;
      return NextResponse.json({ count, duplicate: true });
    }

    // New signer — add hash to set and increment count
    await redis.sadd(EMAILS_KEY, emailHash);
    const count = await redis.incr(COUNT_KEY);

    return NextResponse.json({ count, duplicate: false });
  } catch {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}
