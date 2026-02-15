// app/pipeline/page.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { Baby, FileText, Scale, Home, ArrowDown, Search, AlertCircle } from 'lucide-react';
import { useRef } from 'react';

const pipelineSteps = [
  {
    id: 1,
    icon: Baby,
    number: "3.6M",
    label: "U.S. births per year",
    description: "Approximately 3.6 million children are born in the United States each year (CDC, 2025).",
    source: "CDC National Vital Statistics System",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 2,
    icon: FileText,
    number: "≈4M",
    label: "CPS referrals / investigations",
    description: "Child Protective Services receives over 4 million reports of suspected child maltreatment annually.",
    source: "HHS Child Maltreatment Report 2024",
    color: "from-amber-400 to-orange-400"
  },
  {
    id: 3,
    icon: Scale,
    number: "≈200K",
    label: "Children removed from home",
    description: "Roughly 200,000 children are removed from their parents each year and enter the foster system.",
    source: "AFCARS Report #30 (2025)",
    color: "from-red-400 to-rose-500"
  },
  {
    id: 4,
    icon: Home,
    number: "22K",
    label: "Newborns & infants placed in foster care",
    description: "About 22,000 children under the age of 1 are in foster care at any given time — most removed shortly after birth.",
    source: "AFCARS FY2024 • 7% of all children in care",
    color: "from-purple-400 to-violet-500"
  },
  {
    id: 5,
    icon: AlertCircle,
    number: "???",
    label: "What happens next?",
    description: "The system places them in foster homes, relative care, or group facilities. Then the public record ends.",
    source: "The Black Box",
    color: "from-red-600 to-rose-600",
    isBlackBox: true
  }
];

export default function PipelinePage() {
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
            <a href="/crisis" className="hover:text-red-400 transition-colors">The Crisis</a>
            <a href="/pipeline" className="text-red-400 font-semibold">Newborn Pipeline</a>
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

      <div className="pt-24 pb-32">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="uppercase text-red-400 text-sm tracking-[4px] font-mono mb-4">YOUR CHILD’S JOURNEY</div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              The Newborn<br />
              <span className="text-red-400">Pipeline</span>
            </h1>
            <p className="text-2xl text-white/70 max-w-2xl mx-auto">
              We can count them when they enter.<br />
              We are not allowed to know what happens after.
            </p>
          </motion.div>
        </div>

        {/* The Pipeline Visualization */}
        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {pipelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === pipelineSteps.length - 1;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex gap-12 items-start mb-20 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Connecting dot */}
                <div className="absolute left-1/2 top-8 w-5 h-5 -translate-x-1/2 rounded-full border-4 border-[#0A1428] bg-red-500 z-10" />

                {/* Icon Circle */}
                <div className={`w-24 h-24 rounded-3xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${step.color} shadow-xl shadow-black/50 relative z-20`}>
                  <Icon className="w-12 h-12 text-white" strokeWidth={1.75} />
                  {step.isBlackBox && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-red-500">
                      <span className="text-xs font-bold text-red-400">?</span>
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-red-500/30 transition-all group ${step.isBlackBox ? 'border-red-500/50' : ''}`}>
                  <div className="text-6xl font-mono font-bold tabular-nums mb-3 text-white group-hover:text-red-400 transition-colors">
                    {step.number}
                  </div>
                  
                  <div className="text-2xl font-semibold mb-4 leading-tight">
                    {step.label}
                  </div>

                  <p className="text-white/70 leading-relaxed mb-6 text-[17px]">
                    {step.description}
                  </p>

                  <div className="text-xs uppercase tracking-widest text-white/40 font-mono">
                    {step.source}
                  </div>

                  {step.isBlackBox && (
                    <div className="mt-8 pt-8 border-t border-red-500/30">
                      <div className="flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-semibold uppercase tracking-widest text-sm">The Black Box Begins</span>
                      </div>
                      <p className="text-sm text-red-400/80 mt-3">
                        No public database exists to follow these children. Their outcomes are hidden from view.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="max-w-2xl mx-auto text-center mt-24 px-6">
          <div className="inline-flex items-center gap-4 bg-red-500/10 border border-red-500/30 rounded-3xl px-8 py-4">
            <div className="text-4xl">📉</div>
            <div>
              <div className="text-red-400 font-semibold">We track entry.</div>
              <div className="text-white/60 text-sm">We are forbidden from tracking outcomes.</div>
            </div>
          </div>

          <div className="mt-16">
            <a
              href="/blackbox"
              className="inline-flex items-center gap-4 text-xl font-medium group"
            >
              Continue to The Black Box →
              <ArrowDown className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent h-28 flex items-end justify-center pb-8 z-50 pointer-events-none">
        <a
          href="/action"
          className="pointer-events-auto bg-red-600 hover:bg-red-500 px-14 py-5 rounded-2xl font-bold text-lg tracking-wider transition-all active:scale-95 shadow-2xl shadow-red-600/50"
        >
          DEMAND WE BE ALLOWED TO SEE WHAT HAPPENS NEXT
        </a>
      </div>
    </div>
  );
}
