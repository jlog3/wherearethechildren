// components/OIGFunnel.tsx
'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const funnelSteps = [
  {
    label: "Total missing episodes identified by OIG",
    value: "74,353",
    width: "100%",
    color: "from-red-500/80 to-red-600/80",
    note: "2018–2020 audit period"
  },
  {
    label: "Episodes never properly reported to the national system",
    value: "69%",
    width: "69%",
    color: "from-red-600/90 to-red-700/90",
    note: "~51,303 episodes invisible to federal tracking"
  },
  {
    label: "Episodes reported to NCMEC as required by law",
    value: "31%",
    width: "31%",
    color: "from-red-700 to-red-800",
    note: "Only these were visible to the public system"
  }
];

export default function OIGFunnel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-red-400 text-sm font-mono tracking-widest mb-3">THE OIG AUDIT — THE DEFINITIVE PROOF</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          74,353 missing episodes.<br />
          <span className="text-red-400">69% never properly reported.</span>
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          In 2023, the HHS Office of Inspector General audited missing-from-care reports from 2018–2020. 
          What they found was a systemic reporting failure.
        </p>
      </div>

      <div className="space-y-4">
        {funnelSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
            style={{ width: step.width, transformOrigin: 'left' }}
            className="mx-auto"
          >
            <div className={`bg-gradient-to-r ${step.color} rounded-2xl p-6 md:p-8`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-mono font-bold">{step.value}</div>
                  <div className="text-white/90 text-sm mt-1">{step.label}</div>
                </div>
                <div className="text-white/60 text-xs text-right font-mono">{step.note}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-red-400 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Read the full HHS OIG Audit Report →
        </a>
      </div>
    </div>
  );
}
