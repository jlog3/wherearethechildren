// app/pipeline/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Baby, FileText, Scale, Home, ArrowDown, AlertCircle, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import JourneyNav from '@/components/JourneyNav';

const pipelineSteps = [
  {
    icon: Baby,
    number: "3.6M",
    label: "U.S. births per year",
    description: "Approximately 3.6 million children are born in the United States each year. Births are tracked through the CDC's vital statistics system — a public record.",
    citation: "CDC National Vital Statistics System, 2024",
    href: "https://www.cdc.gov/nchs/nvss/index.htm",
    color: "from-blue-400 to-cyan-400"
  },
  {
    icon: FileText,
    number: "~4M",
    label: "CPS referrals and investigations",
    description: "Child Protective Services receives over 4 million reports of suspected child maltreatment annually. The majority are screened out or found unsubstantiated.",
    citation: "HHS Child Maltreatment Report, 2024",
    href: "https://www.acf.hhs.gov/cb/data-research/child-maltreatment",
    color: "from-amber-400 to-orange-400"
  },
  {
    icon: Scale,
    number: "~200K",
    label: "Children removed from home",
    description: "Roughly 200,000 children are removed from their parents each year and placed in foster care, kinship care, or group homes.",
    citation: "AFCARS Report #30, 2025",
    href: "https://www.acf.hhs.gov/cb/data-research/afcars",
    color: "from-red-400 to-rose-500"
  },
  {
    icon: Home,
    number: "22K",
    label: "Newborns & infants placed in foster care",
    description: "About 22,000 children under age 1 are in foster care at any given time — most removed shortly after birth, often placed in emergency or stranger foster homes with accelerated approvals.",
    citation: "AFCARS FY2024 — 7% of all children in care",
    href: "https://www.acf.hhs.gov/cb/data-research/afcars",
    color: "from-purple-400 to-violet-500"
  },
  {
    icon: AlertCircle,
    number: "???",
    label: "What happens next?",
    description: "The system places them in foster homes, relative care, or group facilities. Then the public record ends. No database tracks individual outcomes. AFCARS only publishes aggregate numbers.",
    citation: "See: What They Hide",
    color: "from-red-600 to-rose-600",
    isBlackBox: true
  }
];

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      <Navbar />

      <div className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="uppercase text-red-400 text-sm tracking-[4px] font-mono mb-4">FOLLOW THE PATH</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-4">
              The Newborn <span className="text-red-400">Pipeline</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We can count them when they enter.
              We are not allowed to know what happens after.
            </p>
          </motion.div>
        </div>

        {/* Pipeline */}
        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {pipelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className={`relative flex gap-8 md:gap-12 items-start mb-16 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="absolute left-1/2 top-8 w-5 h-5 -translate-x-1/2 rounded-full border-4 border-[#0A1428] bg-red-500 z-10" />

                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${step.color} shadow-xl shadow-black/50 relative z-20`}>
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.75} />
                </div>

                <div className={`flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all group ${step.isBlackBox ? 'border-red-500/40 bg-red-950/10' : ''}`}>
                  <div className="text-5xl md:text-6xl font-mono font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    {step.number}
                  </div>
                  <div className="text-xl font-semibold mb-3">{step.label}</div>
                  <p className="text-white/70 leading-relaxed text-[15px] mb-4">{step.description}</p>

                  {step.href ? (
                    <a href={step.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-red-400 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      {step.citation}
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-red-400/60">{step.citation}</span>
                  )}

                  {step.isBlackBox && (
                    <div className="mt-6 pt-6 border-t border-red-500/30">
                      <div className="flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-semibold uppercase tracking-widest text-sm">The Black Box Begins</span>
                      </div>
                      <p className="text-sm text-red-400/80 mt-2">
                        No public database exists to follow these children from this point forward.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Journey Navigation */}
        </div>
        <JourneyNav currentPath="/pipeline" />
    </div>
  );
}
