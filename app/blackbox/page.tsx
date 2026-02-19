// app/blackbox/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Lock, FileLock, Shield, Users, Baby, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import JourneyNav from '@/components/JourneyNav';

const lockedItems = [
  {
    icon: Baby,
    title: "Individual Child Outcomes",
    description: "AFCARS only publishes aggregate numbers. You cannot follow what happened to any specific child after the state removed them — reunification, adoption, aging out, or death.",
    lockedFor: "Always",
    impact: "We know how many enter. We cannot verify how many exit safely.",
    citation: "AFCARS data structure",
    href: "https://www.acf.hhs.gov/cb/data-research/afcars"
  },
  {
    icon: Users,
    title: "Foster Parent Violation Records",
    description: "No national public database of licensed foster homes, complaints, investigations, or license revocations exists anywhere in the U.S.",
    lockedFor: "Always",
    impact: "Newborns are placed with strangers with no public accountability.",
    citation: "No federal registry exists"
  },
  {
    icon: Shield,
    title: "Real-Time Missing Episodes",
    description: "Many states fail to report missing foster children to NCMEC within 24 hours — even though federal law (Preventing Sex Trafficking and Strengthening Families Act of 2014) requires it.",
    lockedFor: "Ongoing non-compliance",
    impact: "When children vanish from care, the public is kept in the dark.",
    citation: "HHS OIG Audit, 2023",
    href: "https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/"
  },
  {
    icon: FileLock,
    title: "Recent Birth Certificates",
    description: "No public national database of newborns exists. States seal recent birth records for 75–125 years, varying by state.",
    lockedFor: "75–125 years",
    impact: "Tracking a child removed at birth starts with a sealed record.",
    citation: "State vital records laws (varies by state)"
  }
];

export default function BlackBoxPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-88 bg-gradient-to-br from-zinc-800 to-black rounded-3xl border-8 border-red-500/50 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-4 border border-white/10 rounded-2xl" />
                  <div className="absolute inset-8 border border-white/10 rounded-xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Lock className="w-14 h-14 text-white" strokeWidth={2} />
                  </div>
                  <div className="absolute -top-6 -right-12 rotate-45 bg-red-600 text-white text-xs font-bold tracking-widest px-20 py-1 text-center shadow">
                    BLACK BOX
                  </div>
                </div>
                <div className="absolute -top-6 -left-8 bg-red-500/90 text-white text-xs font-mono px-4 py-1.5 rounded-full shadow">
                  LOCKED
                </div>
                <div className="absolute -bottom-4 right-8 bg-black/90 text-white/70 text-xs px-5 py-2 rounded-2xl border border-white/10">
                  No public access
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="uppercase text-red-400 text-sm font-mono tracking-[4px] mb-4">THE REAL SCANDAL</div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                The <span className="text-red-400">Black Box</span>
              </h1>
              <p className="text-2xl text-white/80 leading-tight mb-4">
                We are allowed to know when a child is taken.
                <span className="text-white"> We are forbidden from knowing what happens next.</span>
              </p>
              <p className="text-lg text-white/50">
                This is not a glitch. This is deliberate design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locked Items */}
      <section className="py-20 bg-[#0A1428]/80 border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tighter mb-3">What the Public Cannot See</h2>
            <p className="text-lg text-white/60">These are policy choices, not technical limitations.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {lockedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/[0.03] border border-white/10 hover:border-red-500/30 rounded-2xl p-8 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <Icon className="w-7 h-7 text-red-400" strokeWidth={1.8} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-red-400/60" />
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-white/70 leading-relaxed text-[15px] mb-6">{item.description}</p>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Locked for</div>
                      <div className="text-red-400 font-semibold">{item.lockedFor}</div>
                    </div>
                    <div className="text-right flex-1">
                      <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Impact</div>
                      <div className="text-white/60 text-sm">{item.impact}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/30 hover:text-red-400 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        {item.citation}
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-white/30">{item.citation}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-gradient-to-br from-red-950/30 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-3xl mb-6 text-white/80">"Privacy should protect children —</div>
          <div className="text-3xl text-red-400 font-light">not shield a failing system."</div>
          <div className="mt-10 text-white/50 max-w-lg mx-auto">
            Every time someone says "we can't release this data because of privacy,"
            remember: the same system uses that privacy to hide the children it loses.
          </div>
        </div>
      </section>

      {/* Journey Navigation */}
      <JourneyNav currentPath="/blackbox" />
    </div>
  );
}
