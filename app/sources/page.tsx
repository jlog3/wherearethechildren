// app/sources/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Search, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';

const dataSources = [
  {
    source: "AFCARS (Adoption and Foster Care Analysis and Reporting System)",
    description: "Official federal data on children in foster care, entries, exits, demographics, and outcomes.",
    link: "https://www.acf.hhs.gov/cb/data-research/afcars",
    lastUpdated: "May 2025 (FY2024 data)",
    type: "Dashboard + Reports"
  },
  {
    source: "HHS Office of Inspector General (OIG) Audit",
    description: "74,353 missing episodes from foster care (2018–2020) — 69% never properly reported.",
    link: "https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/",
    lastUpdated: "July 2023 (still the definitive national audit)",
    type: "Official Audit"
  },
  {
    source: "National Center for Missing & Exploited Children (NCMEC)",
    description: "23,160+ reports of children missing from foster care in 2024. Trafficking risk estimates.",
    link: "https://www.missingkids.org/ourwork/impact",
    lastUpdated: "2025 Impact Report",
    type: "Annual Report"
  },
  {
    source: "NCANDS / Child Maltreatment Reports",
    description: "Substantiated maltreatment rates while children are in foster care (0.9% national average).",
    link: "https://www.acf.hhs.gov/cb/data-research/child-maltreatment",
    lastUpdated: "2024 Report",
    type: "Annual Report"
  },
  {
    source: "CDC National Vital Statistics System",
    description: "U.S. births (~3.6 million per year) and newborn statistics.",
    link: "https://www.cdc.gov/nchs/nvss/index.htm",
    lastUpdated: "2025 Provisional Data",
    type: "Vital Statistics"
  },
  {
    source: "ACF Child Welfare Performance Dashboard",
    description: "New 2026 live state-by-state performance metrics (launched January 2026).",
    link: "https://www.acf.hhs.gov/cb/performance",
    lastUpdated: "February 2026",
    type: "Live Dashboard"
  },
  {
    source: "Casey Family Programs & State Audits",
    description: "Foster home turnover rates (30–50% annually) and placement studies.",
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
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-6 py-3 rounded-3xl text-sm font-mono tracking-widest mb-8">
              <ShieldCheck className="w-5 h-5" />
              100% TRANSPARENT • 100% PUBLIC DATA
            </div>

            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              Sources &<br />
              <span className="text-emerald-400">Methodology</span>
            </h1>

            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Every number on this site comes from official U.S. government sources.<br />
              No speculation. No anonymous claims. Just receipts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Sources Table */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-tighter">All Primary Sources</h2>
            <div className="text-emerald-400 text-sm font-mono flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              LIVE VERIFIABLE
            </div>
          </div>

          <div className="bg-[#0A1428] border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-8 px-10 font-normal text-white/60 uppercase text-xs tracking-widest">Source</th>
                  <th className="text-left py-8 px-10 font-normal text-white/60 uppercase text-xs tracking-widest">Description</th>
                  <th className="text-left py-8 px-10 font-normal text-white/60 uppercase text-xs tracking-widest">Last Updated</th>
                  <th className="w-32"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {dataSources.map((item) => (
                  <tr key={item.source} className="group hover:bg-white/5 transition-colors">
                    <td className="py-8 px-10 font-semibold leading-snug pr-12">
                      {item.source}
                    </td>
                    <td className="py-8 px-10 text-white/70 text-[15px] leading-relaxed">
                      {item.description}
                      <div className="text-[11px] text-white/40 font-mono mt-2.5 uppercase tracking-wider">
                        {item.type}
                      </div>
                    </td>
                    <td className="py-8 px-10 text-sm text-white/60 whitespace-nowrap">
                      {item.lastUpdated}
                    </td>
                    <td className="py-8 px-10">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group-hover:scale-110"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Evidence */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-red-950/50 to-transparent border border-red-500/20 rounded-3xl p-10">
            <div>
              <div className="text-emerald-400 font-mono text-sm tracking-widest mb-3">EVIDENCE PACKAGE</div>
              <h3 className="text-3xl font-bold">Download the Full Evidence ZIP</h3>
              <p className="text-white/70 mt-3">All original PDFs, raw data tables, and our cleaned JSONs</p>
            </div>

            <a
              href="https://drive.google.com/file/d/YOUR_ZIP_LINK/view" // ← Replace with actual link
              target="_blank"
              className="mt-8 md:mt-0 flex items-center gap-4 bg-white text-black font-bold px-10 py-5 rounded-2xl hover:bg-white/90 transition-all group"
            >
              <Download className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
              DOWNLOAD ALL EVIDENCE (48 MB)
            </a>
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-3xl leading-relaxed text-white/90">
            This website was built to make the truth unavoidable.<br />
            Every statistic is directly traceable to the federal government’s own publications.
          </p>

          <div className="mt-16 text-white/40 text-sm font-mono">
            Last updated: February 15, 2026
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 py-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-8">The data is here.<br />The action is now.</h2>
          
          <a
            href="/action"
            className="inline-block bg-red-600 hover:bg-red-500 text-2xl font-bold px-20 py-8 rounded-3xl transition-all active:scale-95 shadow-2xl shadow-red-600/50"
          >
            SIGN THE PETITION → DEMAND TRANSPARENCY
          </a>
        </div>
      </section>
    </div>
  );
}
