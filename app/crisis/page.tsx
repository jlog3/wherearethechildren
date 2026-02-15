// app/crisis/page.tsx
'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Users, Search, ArrowRight } from 'lucide-react';
import OIGFunnel from '@/components/OIGFunnel';

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      {/* Navbar */}
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
            <a href="/" className="hover:text-red-400 transition-colors">Home</a>
            <a href="/crisis" className="text-red-400 font-semibold">The Crisis</a>
            <a href="/pipeline" className="hover:text-red-400 transition-colors">Newborn Pipeline</a>
            <a href="/blackbox" className="hover:text-red-400 transition-colors">The Black Box</a>
            <a href="/risks" className="hover:text-red-400 transition-colors">Risks in Care</a>
            <a href="/action" className="hover:text-red-400 transition-colors">Take Action</a>
          </div>

          <a 
            href="/action"
            className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95"
          >
            DEMAND TRANSPARENCY
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-red-500/10 text-red-400 px-6 py-3 rounded-3xl text-sm font-mono tracking-[4px] uppercase mb-8 border border-red-500/30">
              <AlertTriangle className="w-5 h-5" />
              THIS IS NOT SPECULATION
            </div>

            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              The<br />
              <span className="text-red-400">Crisis</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Thousands of children go missing from state care every year.<br />
              <span className="text-red-400 font-semibold">The government itself admits it loses track of them.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* OIG Funnel - The Bomb */}
      <section className="py-20 bg-gradient-to-b from-[#0A1428] via-red-950/20 to-[#0A1428]">
        <div className="max-w-6xl mx-auto px-6">
          <OIGFunnel />
        </div>
      </section>

      {/* 2024-2025 Missing Numbers */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center hover:border-red-500/30 transition-all group"
            >
              <div className="text-red-400 mb-6">
                <Users className="w-16 h-16 mx-auto" />
              </div>
              <div className="text-6xl font-mono font-bold tabular-nums mb-4">
                23,160
              </div>
              <div className="text-xl text-white/80 mb-2">reported missing from care</div>
              <div className="text-sm text-white/40">2024 • National Center for Missing & Exploited Children</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center hover:border-red-500/30 transition-all group"
            >
              <div className="text-red-400 mb-6">
                <AlertTriangle className="w-16 h-16 mx-auto" />
              </div>
              <div className="text-6xl font-mono font-bold tabular-nums mb-4 text-red-400">
                19–25%
              </div>
              <div className="text-xl text-white/80 mb-2">likely victims of sex trafficking</div>
              <div className="text-sm text-white/40">NCMEC estimate for missing-from-care cases</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center hover:border-red-500/30 transition-all group"
            >
              <div className="text-red-400 mb-6">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <div className="text-6xl font-mono font-bold tabular-nums mb-4">
                ???
              </div>
              <div className="text-xl text-white/80 mb-2">actual number missing in 2025–2026</div>
              <div className="text-sm text-white/40">Underreporting continues. No new national audit exists.</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trafficking Risk Callout */}
      <section className="py-20 bg-red-950/30 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">These Are Not Just Runaways</h2>
          <p className="text-2xl text-white/90 leading-relaxed">
            One in seven children reported missing from care is assessed by NCMEC<br />
            as <span className="text-red-400 font-bold">likely being trafficked</span>.
          </p>
          <p className="text-lg text-white/60 mt-8">
            And remember — thanks to the broken reporting exposed by the OIG audit —<br />
            <span className="text-red-400">these are only the ones we know about.</span>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-bold mb-12">
            The government admits it loses children.<br />
            <span className="text-white/60">We are no longer willing to look away.</span>
          </h2>

          <a
            href="/action"
            className="inline-block bg-red-600 hover:bg-red-500 text-2xl font-bold px-20 py-8 rounded-3xl transition-all active:scale-95 shadow-2xl shadow-red-600/50"
          >
            DEMAND PUBLIC TRACKING NOW →
          </a>

          <div className="mt-12 text-white/50 text-sm">
            Next: <a href="/pipeline" className="underline hover:text-red-400">The Newborn Pipeline →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
