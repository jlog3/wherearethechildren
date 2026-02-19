// components/Navbar.tsx
'use client';

import { Search, ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/crisis', label: 'The Crisis' },
    { href: '/pipeline', label: 'Newborn Pipeline' },
    { href: '/blackbox', label: 'The Black Box' },
    { href: '/risks', label: 'Risks in Care' },
    { href: '/sources', label: 'Sources' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1428]/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tighter text-white">wherearethechildren</div>
            <div className="text-[10px] text-white/60 -mt-1">.net</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-7 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors whitespace-nowrap ${
                pathname === link.href
                  ? 'text-red-400 font-semibold'
                  : 'text-white/70 hover:text-red-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sign CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/#sign"
            className="bg-red-600 hover:bg-red-500 px-6 py-2.5 rounded-2xl font-semibold text-sm transition-all active:scale-95 flex items-center gap-2 text-white whitespace-nowrap"
          >
            SIGN PETITION
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#0A1428]/98 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 rounded-xl transition-colors ${
                pathname === link.href
                  ? 'text-red-400 font-semibold bg-white/5'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
