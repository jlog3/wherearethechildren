// app/sources/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';

const dataSources = [
  {
    source: "AFCARS (Adoption and Foster Care Analysis and Reporting System)",
    description: "Official federal data on children in foster care — entries, exits, demographics, and aggregate outcomes. The primary source for the 328,947 total and 22,097 infant figures used on this site.",
    link: "https://www.acf.hhs.gov/cb/data-research/afcars",
    lastUpdated: "May 2025 (FY2024 data)",
    type: "Federal Dashboard + Reports"
  },
  {
    source: "HHS Office of Inspector General (OIG) Audit",
    description: "Definitive audit identifying 74,353 missing episodes from foster care (2018–2020). Found 69% were never properly reported to the national system. The single most important document on this site.",
    link: "https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/",
    lastUpdated: "July 2023 (still the definitive national audit)",
    type: "Official Federal Audit"
  },
  {
    source: "National Center for Missing & Exploited Children (NCMEC)",
    description: "23,160+ reports of children missing from foster care in 2024. Source for the 1-in-7 trafficking risk estimate for missing foster youth.",
    link: "https://www.missingkids.org/ourwork/impact",
    lastUpdated: "2025 Impact Report",
    type: "Annual Report"
  },
  {
    source: "NCANDS / Child Maltreatment Reports",
    description: "Substantiated maltreatment rates while children are in foster care (0.9% national average). Source for state-by-state maltreatment comparisons.",
    link: "https://www.acf.hhs.gov/cb/data-research/child-maltreatment",
    lastUpdated: "2024 Report",
    type: "Federal Annual Report"
  },
  {
    source: "CDC National Vital Statistics System",
    description: "U.S. births (~3.6 million per year). Establishes the starting point of the pipeline visualization.",
    link: "https://www.cdc.gov/nchs/nvss/index.htm",
    lastUpdated: "2025 Provisional Data",
    type: "Federal Vital Statistics"
  },
  {
    source: "Casey Family Programs & State Audits",
    description: "Foster home turnover rates (30–50% annually), foster parent perpetrator data, and placement stability research.",
    link: "https://www.casey.org/research/",
    lastUpdated: "2024–2025",
    type: "Research Reports"
  }
];

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-6 py-3 rounded-3xl text-sm font-mono tracking-widest mb-6">
              <ShieldCheck className="w-5 h-5" />
              100% PUBLIC DATA
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Sources & <span className="text-emerald-400">Methodology</span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Every number on this site comes from official U.S. government sources.
              No speculation. No anonymous claims. Just receipts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sources Table */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tighter">All Primary Sources</h2>
            <div className="text-emerald-400 text-sm font-mono flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              LIVE VERIFIABLE
            </div>
          </div>

          <div className="space-y-4">
            {dataSources.map((item) => (
              <div key={item.source} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{item.source}</h3>
                    <p className="text-white/70 text-[15px] leading-relaxed mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                      <span className="uppercase tracking-wider">{item.type}</span>
                      <span>·</span>
                      <span>{item.lastUpdated}</span>
                    </div>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-2xl leading-relaxed text-white/90">
            This website was built to make the truth unavoidable.
            Every statistic is directly traceable to the federal government's own publications.
          </p>
          <div className="mt-10 text-white/40 text-sm font-mono">
            Last updated: February 2026
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-28">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">The data is here. The action is now.</h2>
          <a
            href="/#sign"
            className="inline-block bg-red-600 hover:bg-red-500 text-xl font-bold px-16 py-7 rounded-3xl transition-all active:scale-95 shadow-2xl shadow-red-600/50"
          >
            SIGN THE PETITION →
          </a>
        </div>
      </section>
    </div>
  );
}
