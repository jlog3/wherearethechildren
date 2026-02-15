// app/blackbox/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Lock, FileLock, Shield, Users, Search, ArrowRight, Baby } from 'lucide-react';

const lockedItems = [
  {
    icon: Baby,
    title: "Recent Birth Certificates",
    description: "No public national database of newborns exists. States seal recent birth records for 75–125 years.",
    lockedFor: "75–125 years",
    impact: "We cannot even start tracking a child who was removed at birth."
  },
  {
    icon: FileLock,
    title: "Individual CPS Outcomes",
    description: "AFCARS only publishes aggregate numbers. You cannot follow what happened to any specific child after removal.",
    lockedFor: "Always",
    impact: "We know how many enter. We are not allowed to know how many exit safely."
  },
  {
    icon: Users,
    title: "Foster Parent Violation Records",
    description: "No national public database of licensed foster homes, complaints, or revocations exists.",
    lockedFor: "Always",
    impact: "We hand newborns to strangers with almost zero public oversight."
  },
  {
    icon: Shield,
    title: "Real-Time Missing Episodes",
    description: "Many states fail to report missing foster children to NCMEC within 24 hours — as required by law.",
    lockedFor: "Ongoing",
    impact: "Even when children disappear from care, the public is kept in the dark."
  }
];

export default function BlackBoxPage() {
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
            <a href="/blackbox" className="text-red-400 font-semibold">The Black Box</a>
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

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Big Locked Cabinet */}
                <div className="w-80 h-96 bg-gradient-to-br from-zinc-800 to-black rounded-3xl border-8 border-red-500/50 shadow-2xl relative overflow-hidden">
                  {/* Cabinet lines */}
                  <div className="absolute inset-4 border border-white/10 rounded-2xl" />
                  <div className="absolute inset-8 border border-white/10 rounded-xl" />
                  
                  {/* Lock */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Lock className="w-16 h-16 text-white" strokeWidth={2} />
                  </div>

                  {/* Red "CLASSIFIED" stamp */}
                  <div className="absolute -top-6 -right-12 rotate-45 bg-red-600 text-white text-xs font-bold tracking-widest px-20 py-1 text-center shadow">
                    BLACK BOX
                  </div>
                </div>

                {/* Floating labels */}
                <div className="absolute -top-6 -left-8 bg-red-500/90 text-white text-xs font-mono px-4 py-1.5 rounded-full shadow">
                  LOCKED
                </div>
                <div className="absolute -bottom-4 right-12 bg-black/90 text-white/70 text-xs px-5 py-2 rounded-2xl border border-white/10">
                  No public access
                </div>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="uppercase text-red-400 text-sm font-mono tracking-[4px] mb-4">THE REAL SCANDAL</div>
              <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                The<br />
                <span className="text-red-400">Black Box</span>
              </h1>
              <p className="text-3xl text-white/80 leading-tight">
                We are allowed to know when a child is taken.<br />
                <span className="text-white">We are forbidden from knowing what happens next.</span>
              </p>

              <div className="mt-12 text-white/60 text-lg">
                This is not a glitch.<br />
                This is deliberate design.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locked Items Grid */}
      <section className="py-24 bg-[#0A1428]/80 border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tighter mb-4">What the Public Is Legally Forbidden From Seeing</h2>
            <p className="text-xl text-white/60">These are not technical limitations.<br />These are policy choices.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {lockedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 border border-white/10 hover:border-red-500/50 rounded-3xl p-10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                      <Icon className="w-9 h-9 text-red-400" strokeWidth={1.8} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-red-400">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-semibold">{item.title}</h3>
                      </div>

                      <p className="text-white/70 mt-4 leading-relaxed text-[17px]">
                        {item.description}
                      </p>

                      <div className="mt-8 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-white/40 font-mono uppercase tracking-widest">Locked for</div>
                          <div className="text-red-400 font-semibold text-lg">{item.lockedFor}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-white/40 font-mono uppercase tracking-widest">Impact on newborns</div>
                          <div className="text-white/80 text-sm max-w-[180px]">{item.impact}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advocacy Message */}
      <section className="py-28 bg-gradient-to-br from-red-950/30 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-8">“Privacy should protect children —</div>
            <div className="text-4xl text-red-400 font-light">not shield a failing system.”</div>

            <div className="mt-16 text-white/60 max-w-lg mx-auto text-lg">
              Every time someone says “we can’t release this data because of privacy,” 
              remember: the same system uses that privacy to hide the children it loses.
            </div>

            <div className="mt-12 text-xs text-white/30 font-mono tracking-widest">— This site exists to change that.</div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-bold leading-none tracking-tighter mb-10">
            The black box only stays closed<br />
            <span className="text-red-400">if we let it.</span>
          </h2>

          <a
            href="/action"
            className="inline-block bg-red-600 hover:bg-red-500 text-2xl font-bold px-20 py-8 rounded-3xl transition-all active:scale-95 shadow-2xl shadow-red-600/50"
          >
            DEMAND ANONYMIZED PUBLIC TRACKING →
          </a>

          <div className="mt-12 text-white/50 text-sm">
            Next: <a href="/risks" className="underline hover:text-red-400">What happens inside the foster homes →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
