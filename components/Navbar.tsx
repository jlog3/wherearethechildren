// components/Navbar.tsx
'use client';

import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1428]/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tighter">wherearethechildren</div>
            <div className="text-[10px] text-white/60 -mt-1">.net</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <Link href="/crisis" className="hover:text-red-400 transition-colors">The Crisis</Link>
          <Link href="/pipeline" className="hover:text-red-400 transition-colors">Newborn Pipeline</Link>
          <Link href="/blackbox" className="hover:text-red-400 transition-colors">The Black Box</Link>
          <Link href="/risks" className="hover:text-red-400 transition-colors">Risks in Care</Link>
          <Link href="/action" className="hover:text-red-400 transition-colors">Take Action</Link>
	  <Link href="/sources" className="hover:text-red-400 transition-colors">Sources</Link>
        </div>

        <Link 
          href="/action"
          className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
        >
          DEMAND TRANSPARENCY
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </nav>
  );
}
