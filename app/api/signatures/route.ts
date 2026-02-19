// app/api/signatures/route.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY = 'petition:signatures';

// GET — return current count
export async function GET() {
  try {
    const count = (await redis.get<number>(KEY)) ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

// POST — increment and return new count
export async function POST() {
  try {
    const count = await redis.incr(KEY);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 });
  }
}
