// app/risks/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Users, Home, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import JourneyNav from '@/components/JourneyNav';

const riskStats = [
  {
    icon: AlertTriangle,
    number: "0.9%",
    label: "Substantiated maltreatment while in foster care",
    detail: "National average per year. But experts warn this figure is significantly underreported.",
    citation: "NCANDS / Child Maltreatment Reports, 2024",
    href: "https://www.acf.hhs.gov/cb/data-research/child-maltreatment",
    color: "text-amber-400"
  },
  {
    icon: Users,
    number: "40–60%",
    label: "Cases where foster parents were the perpetrators",
    detail: "In state-level audits of substantiated abuse within foster homes, foster parents are the perpetrators in 40–60% of cases.",
    citation: "Multiple state child welfare audits; Casey Family Programs",
    href: "https://www.casey.org/research/",
    color: "text-red-400"
  },
  {
    icon: Home,
    number: "30–50%",
    label: "Annual foster home turnover",
    detail: "Homes that quit, are closed, or have licenses revoked each year — creating constant instability for children placed in care.",
    citation: "Casey Family Programs & state licensing reports",
    href: "https://www.casey.org/research/",
    color: "text-orange-400"
  }
];

const stateExamples = [
  { state: "Texas", rate: "1.4%", reported: "Low", note: "Highest volume of removals" },
  { state: "California", rate: "0.7%", reported: "Medium", note: "Large system, varied compliance" },
  { state: "Florida", rate: "1.1%", reported: "Low", note: "High infant removals" },
  { state: "New York", rate: "0.6%", reported: "High", note: "Better reporting compliance" },
];

export default function RisksPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="uppercase text-red-400 text-sm font-mono tracking-[4px] mb-4">THE HUMAN COST</div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Risks in <span className="text-red-400">Care</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Most foster parents are dedicated people doing incredibly hard work.
              <span className="text-red-400"> The system that oversees them is failing both the parents and the children.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {riskStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all"
                >
                  <Icon className={`w-12 h-12 ${stat.color} mb-4`} strokeWidth={1.4} />
                  <div className="text-5xl font-mono font-bold mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold leading-tight mb-3">{stat.label}</div>
                  <p className="text-white/60 text-[15px] mb-4">{stat.detail}</p>
                  <a href={stat.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-red-400 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    {stat.citation}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newborn Vulnerability */}
      <section className="py-20 bg-gradient-to-b from-transparent via-red-950/20 to-transparent border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-red-400 text-sm font-mono tracking-widest mb-4">ESPECIALLY VULNERABLE</div>
          <h2 className="text-4xl font-bold tracking-tighter mb-6">
            Newborns cannot report abuse.
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Infants removed at birth are often placed in emergency or stranger foster homes with accelerated approvals.
            When something goes wrong, the child cannot speak, call for help, or run away.
          </p>
        </div>
      </section>

      {/* State Table */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold tracking-tighter mb-2">State-by-State Snapshot</h3>
            <p className="text-white/60">Maltreatment rates while children are in state care</p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-5 px-8 text-white/50 font-normal text-xs uppercase tracking-wider">State</th>
                  <th className="text-left py-5 px-8 text-white/50 font-normal text-xs uppercase tracking-wider">In-Care Maltreatment Rate</th>
                  <th className="text-left py-5 px-8 text-white/50 font-normal text-xs uppercase tracking-wider">NCMEC Reporting</th>
                  <th className="text-left py-5 px-8 text-white/50 font-normal text-xs uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stateExamples.map((row) => (
                  <tr key={row.state} className="hover:bg-white/5 transition-colors">
                    <td className="py-5 px-8 font-semibold">{row.state}</td>
                    <td className="py-5 px-8 text-xl font-mono text-red-400">{row.rate}</td>
                    <td className="py-5 px-8">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                        row.reported === 'High' ? 'bg-green-500/20 text-green-400' :
                        row.reported === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {row.reported}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-white/60 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-white/30 mt-6 font-mono">
            Data: NCANDS, AFCARS, state child welfare reports · 2024–2025
          </p>
        </div>
      </section>

      {/* Balanced Closing */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl leading-relaxed text-white/90">
            The vast majority of foster parents are good people doing a job most of us could never do.
            The problem is the system that places vulnerable newborns into their care —
            <span className="text-red-400"> with inadequate screening, training, and public accountability</span>.
          </p>
        </div>
      </section>

      {/* Journey Navigation */}
      <JourneyNav currentPath="/risks" />
    </div>
  );
}
