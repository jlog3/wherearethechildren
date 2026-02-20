// app/share/[stat]/ShareRedirect.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShareRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Small delay so the page fully renders (crawlers don't run JS anyway)
    const timer = setTimeout(() => {
      router.replace('/#sign');
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
