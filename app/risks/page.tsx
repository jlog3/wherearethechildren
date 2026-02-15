// app/risks/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Users, Home, Search, ArrowRight } from 'lucide-react';

const riskStats = [
  {
    icon: AlertTriangle,
    number: "0.9%",
    label: "Substantiated maltreatment while in foster care",
    detail: "Per year (national average)",
    source: "NCANDS / Child Maltreatment Reports",
    color: "text-amber-400"
  },
  {
    icon: Users,
    number: "40–60%",
    label: "Cases where foster parents were the perpetrators",
    detail: "In detailed state-level audits of substantiated abuse in foster homes",
    source: "Multiple state child welfare audits",
    color: "text-red-400"
  },
  {
    icon: Home,
    number: "30–50%",
    label: "Annual foster home turnover",
    detail: "Homes that quit, are closed, or have licenses revoked each year",
    source: "Casey Family Programs & state reports",
    color: "text-orange-400"
  }
];

const stateExamples = [
  { state: "Texas", rate: "1.4%", reported: "Low", note: "Highest volume of removals" },
  { state: "California", rate: "0.7%", reported: "Medium", note: "Large system challenges" },
  { state: "Florida", rate: "1.1%", reported: "Low", note: "High infant removals" },
  { state: "New York", rate: "0.6%", reported: "High", note: "Better reporting compliance" },
];

export default function RisksPage() {
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
            <a href="/pipeline" className="hover:text-red-400 transition-colors">Newborn Pipeline</a>
            <a href="/blackbox" className="hover:text-red-400 transition-colors">The Black Box</a>
            <a href="/risks" className="text-red-400 font-semibold">Risks in Care</a>
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

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="uppercase text-red-400 text-sm font-mono tracking-[4px] mb-6">THE HUMAN COST</div>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              Risks in<br />
              <span className="text-red-400">Care</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Most foster parents are dedicated people doing incredibly hard work.<br />
              <span className="text-red-400">The system that oversees them is failing both the parents and the children.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="py-20 bg-[#0A1428]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {riskStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-red-500/40 transition-all group"
                >
                  <div className={`text-7xl mb-6 ${stat.color}`}>
                    <Icon strokeWidth={1.4} />
                  </div>
                  <div className="text-6xl font-mono font-bold tabular-nums mb-3">
                    {stat.number}
                  </div>
                  <div className="text-2xl font-semibold leading-tight mb-4">
                    {stat.label}
                  </div>
                  <div className="text-white/60 text-lg mb-8">
                    {stat.detail}
                  </div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
                    {stat.source}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newborn Vulnerability */}
      <section className="py-24 bg-gradient-to-b from-transparent via-red-950/20 to-transparent border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-red-400 text-sm font-mono tracking-widest mb-4">ESPECIALLY VULNERABLE</div>
          <h2 className="text-5xl font-bold tracking-tighter mb-8">
            Newborns have almost no voice<br />
            and almost no protection once placed.
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Infants removed at birth are often placed in emergency or stranger foster homes with accelerated approvals. 
            When something goes wrong, the child cannot speak.
          </p>
        </div>
      </section>

      {/* State Comparison Table */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h3 className="text-4xl font-bold tracking-tighter mb-3">State-by-State Snapshot</h3>
            <p className="text-white/60">Maltreatment rates while children are in state care</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-6 px-10 text-white/60 font-normal text-sm uppercase tracking-wider">State</th>
                  <th className="text-left py-6 px-10 text-white/60 font-normal text-sm uppercase tracking-wider">Maltreatment Rate in Care</th>
                  <th className="text-left py-6 px-10 text-white/60 font-normal text-sm uppercase tracking-wider">NCMEC Reporting</th>
                  <th className="text-left py-6 px-10 text-white/60 font-normal text-sm uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stateExamples.map((row) => (
                  <tr key={row.state} className="hover:bg-white/5 transition-colors">
                    <td className="py-7 px-10 font-semibold">{row.state}</td>
                    <td className="py-7 px-10 text-xl font-mono text-red-400">{row.rate}</td>
                    <td className="py-7 px-10">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                        row.reported === 'High' ? 'bg-green-500/20 text-green-400' :
                        row.reported === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {row.reported}
                      </span>
                    </td>
                    <td className="py-7 px-10 text-white/70 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-white/40 mt-8 font-mono">
            Data drawn from NCANDS, AFCARS, and state-specific child welfare reports • 2024–2025
          </p>
        </div>
      </section>

      {/* Balanced Closing */}
      <section className="py-28 bg-[#0A1428]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-3xl leading-relaxed text-white/90">
            The vast majority of foster parents are good people doing a job most of us could never do.<br /><br />
            The problem is the system that places vulnerable newborns into their care — 
            <span className="text-red-400">with inadequate screening, training, and public accountability</span>.
          </p>

          <div className="mt-16">
            <a
              href="/action"
              className="inline-block bg-red-600 hover:bg-red-500 text-2xl font-bold px-20 py-8 rounded-3xl transition-all active:scale-95"
            >
              FIX THE SYSTEM →
            </a>
          </div>
        </div>
      </section>

      {/* Footer Navigation Hint */}
      <div className="py-16 text-center text-white/40 text-sm">
        Next: <a href="/action" className="underline hover:text-red-400">Take Action → Demand Public Tracking</a>
      </div>
    </div>
  );
}
