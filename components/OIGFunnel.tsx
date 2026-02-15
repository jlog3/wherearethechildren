// components/OIGFunnel.tsx
'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowDown } from 'lucide-react';

const funnelData = [
  {
    label: "Missing Episodes Identified by States",
    value: 74353,
    percent: 100,
    color: "bg-white",
    textColor: "text-white",
    description: "States knew these children were missing for 2+ days"
  },
  {
    label: "Reported to NCMEC (timely or late)",
    value: 40893,
    percent: 55,
    color: "bg-amber-400",
    textColor: "text-amber-950",
    description: "Only 55% ever made it into the national system"
  },
  {
    label: "Reported Within 24 Hours (Federal Law)",
    value: 24536,
    percent: 33,
    color: "bg-yellow-400",
    textColor: "text-yellow-950",
    description: "The legal requirement"
  },
  {
    label: "NEVER REPORTED",
    value: 34869,
    percent: 47,
    color: "bg-red-600",
    textColor: "text-white",
    description: "Completely lost from the national tracking system",
    isRed: true
  }
];

export default function OIGFunnel() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-red-500/10 text-red-400 text-sm font-mono tracking-[3px] uppercase px-6 py-2 rounded-2xl mb-4">
          <AlertTriangle className="w-5 h-5" />
          THE 2023 HHS OIG AUDIT
        </div>
        <h2 className="text-5xl font-bold tracking-tighter">The Underreporting Funnel</h2>
        <p className="text-xl text-white/70 mt-4">74,353 missing episodes from foster care</p>
      </div>

      {/* Funnel Container */}
      <div className="relative mx-auto" style={{ maxWidth: '620px' }}>
        <div className="space-y-3 relative">
          {funnelData.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className={`relative group overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02] ${step.isRed ? 'shadow-2xl shadow-red-600/50' : ''}`}
              style={{
                width: `${step.percent}%`,
                marginLeft: `${(100 - step.percent) / 2}%`,
              }}
            >
              {/* Funnel Layer */}
              <div
                className={`h-20 md:h-24 flex items-center px-8 font-mono font-bold text-xl md:text-2xl border border-white/10 ${step.color} ${step.textColor}`}
              >
                <div className="flex-1">
                  <div className="text-sm md:text-base opacity-75 font-normal tracking-wide uppercase text-[11px] md:text-xs">
                    {step.label}
                  </div>
                  <div className="tabular-nums">
                    {step.value.toLocaleString()}
                    <span className="text-xs md:text-sm font-normal opacity-70 ml-2">({step.percent}%)</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-black opacity-90">
                    {step.percent}
                    <span className="text-base align-super">%</span>
                  </div>
                </div>
              </div>

              {/* Description tooltip on hover */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black/90 text-white text-sm px-5 py-3 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap border border-white/10">
                {step.description}
              </div>

              {/* Arrow connector */}
              {index < funnelData.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-red-950/50 border border-red-500/30 rounded-3xl p-8 text-center"
        >
          <div className="text-red-400 text-sm font-mono tracking-widest uppercase mb-3">Direct quote from the OIG Report</div>
          <p className="text-lg italic leading-relaxed text-white/90">
            “State agencies that do not properly report missing children from foster care 
            increase the risk that the children may not be safely and swiftly recovered.”
          </p>
          <div className="text-xs text-white/40 mt-6">— U.S. Department of Health and Human Services, Office of Inspector General, 2023</div>
        </motion.div>
      </div>

      {/* Source */}
      <div className="text-center mt-12 text-white/40 text-xs font-mono">
        Data: 2023 HHS OIG Audit of 46 States (July 2018 – Dec 2020) • Still the most comprehensive national study
      </div>
    </div>
  );
}
