// app/crisis/page.tsx
'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Users, Search, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import JourneyNav from '@/components/JourneyNav';
import OIGFunnel from '@/components/OIGFunnel';

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 bg-red-500/10 text-red-400 px-6 py-3 rounded-3xl text-sm font-mono tracking-[4px] uppercase mb-6 border border-red-500/30">
              <AlertTriangle className="w-5 h-5" />
              THIS IS NOT SPECULATION
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
              The <span className="text-red-400">Crisis</span>
            </h1>

            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Thousands of children go missing from state care every year.
              The government's own auditors have confirmed it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OIG Funnel */}
      <section className="py-16 bg-gradient-to-b from-[#0A1428] via-red-950/20 to-[#0A1428]">
        <div className="max-w-6xl mx-auto px-6">
          <OIGFunnel />
        </div>
      </section>

      {/* Missing Numbers */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:border-red-500/30 transition-all"
            >
              <Users className="w-14 h-14 text-red-400 mx-auto mb-4" />
              <div className="text-5xl font-mono font-bold mb-3">23,160</div>
              <div className="text-lg text-white/80 mb-2">reported missing from care</div>
              <Cite source="NCMEC 2024 Annual Report" href="https://www.missingkids.org/ourwork/impact" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:border-red-500/30 transition-all"
            >
              <AlertTriangle className="w-14 h-14 text-red-400 mx-auto mb-4" />
              <div className="text-5xl font-mono font-bold text-red-400 mb-3">1 in 7</div>
              <div className="text-lg text-white/80 mb-2">assessed as likely trafficking victims</div>
              <Cite source="NCMEC estimate for missing-from-care" href="https://www.missingkids.org/ourwork/impact" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center hover:border-red-500/30 transition-all"
            >
              <Search className="w-14 h-14 text-red-400 mx-auto mb-4" />
              <div className="text-5xl font-mono font-bold mb-3">???</div>
              <div className="text-lg text-white/80 mb-2">actual number in 2025–2026</div>
              <span className="text-xs font-mono text-white/40">No new national audit exists since 2023 OIG report</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trafficking Callout */}
      <section className="py-16 bg-red-950/30 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">These Are Not Just Runaways</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            NCMEC reports that 1 in 7 children reported missing from care
            is assessed as a <span className="text-red-400 font-bold">likely sex trafficking victim</span>.
          </p>
          <p className="text-white/60 mt-6">
            And thanks to the broken reporting exposed by the OIG audit —
            <span className="text-red-400"> these are only the ones we know about.</span>
          </p>
          <div className="mt-6">
            <Cite source="NCMEC 2024 data; HHS OIG Audit, 2023" href="https://www.missingkids.org/ourwork/impact" />
          </div>
        </div>
      </section>

      {/* Journey Navigation */}
      <JourneyNav currentPath="/crisis" />
    </div>
  );
}

function Cite({ source, href }: { source: string; href?: string }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-red-400 transition-colors">
        <ExternalLink className="w-3 h-3" />
        {source}
      </a>
    );
  }
  return <span className="text-xs font-mono text-white/40">{source}</span>;
}
