// app/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Baby, Users, AlertTriangle, Search, ArrowRight, Lock } from 'lucide-react';

export default function Home() {
  // Counter hook
  const Counter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      if (!inView) return;
      
      let startTime: number;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * end);
        setCount(value);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationFrame);
    }, [inView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-[#0A1428] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1428]/90 backdrop-blur-lg border-b border-white/10">
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
            <a href="/crisis" className="hover:text-red-400 transition-colors">The Crisis</a>
            <a href="/pipeline" className="hover:text-red-400 transition-colors">Newborn Pipeline</a>
            <a href="/blackbox" className="hover:text-red-400 transition-colors">The Black Box</a>
            <a href="/risks" className="hover:text-red-400 transition-colors">Risks in Care</a>
            <a href="/action" className="hover:text-red-400 transition-colors">Take Action</a>
          </div>

          <a 
            href="/action"
            className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
          >
            DEMAND TRANSPARENCY
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{
            backgroundImage: "url('https://picsum.photos/id/1015/2000/1200')" // Replace with real emotional photo later
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428]/40 via-[#0A1428]/80 to-[#0A1428]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-3xl mb-8 border border-white/10">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="uppercase text-xs tracking-[3px] font-mono text-red-400">Official Government Data</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold leading-[1.05] tracking-tighter mb-6">
              Where Are<br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">The Children?</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-12">
              Every year, the state removes <span className="font-semibold text-white">thousands of newborns</span> from their parents.<br />
              Then the system loses track of many of them.<br />
              <span className="text-red-400 font-medium">This is the data they publish — and what they hide.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pipeline"
                className="group bg-white text-[#0A1428] font-semibold text-lg px-12 py-5 rounded-3xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                SEE THE PIPELINE
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/action"
                className="group border border-white/30 hover:border-white/50 font-semibold text-lg px-10 py-5 rounded-3xl backdrop-blur-xl transition-all flex items-center gap-3 active:scale-95"
              >
                DEMAND PUBLIC TRACKING
              </a>
            </div>

            <div className="mt-16 text-xs uppercase tracking-widest text-white/40 flex items-center justify-center gap-8">
              <div>DATA FROM HHS • AFCARS • NCMEC • OIG</div>
              <div>UPDATED FEBRUARY 2026</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll prompt */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="text-[10px] tracking-widest">SCROLL FOR THE TRUTH</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-24 bg-[#0A1428] border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Stat 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-red-500/30 transition-colors group"
            >
              <div className="text-red-400 mb-3">
                <Users className="w-10 h-10" />
              </div>
              <div className="text-5xl font-mono font-bold tabular-nums mb-2">
                <Counter end={328947} />
              </div>
              <div className="text-white/70 text-lg">children in foster care</div>
              <div className="text-xs text-white/40 mt-4">FY2024 • AFCARS</div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-red-500/30 transition-colors group"
            >
              <div className="text-red-400 mb-3">
                <Baby className="w-10 h-10" />
              </div>
              <div className="text-5xl font-mono font-bold tabular-nums mb-2">
                <Counter end={22097} />
              </div>
              <div className="text-white/70 text-lg">infants under 1 year old</div>
              <div className="text-xs text-white/40 mt-4">7% of all children in care • FY2024</div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-red-500/30 transition-colors group"
            >
              <div className="text-red-400 mb-3">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <div className="text-5xl font-mono font-bold tabular-nums mb-2">
                <Counter end={23160} />
              </div>
              <div className="text-white/70 text-lg">reported missing from care</div>
              <div className="text-xs text-white/40 mt-4">2024 • NCMEC • 92% "recovered"</div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-red-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="text-red-400 mb-3">
                <Lock className="w-10 h-10" />
              </div>
              <div className="text-5xl font-mono font-bold tabular-nums mb-2 text-red-400">
                69%
              </div>
              <div className="text-white/70 text-lg">of missing episodes never properly reported</div>
              <div className="text-xs text-white/40 mt-4">74,353 episodes • 2023 HHS OIG Audit</div>
              
              <div className="absolute -bottom-6 -right-6 text-[120px] font-black text-red-500/10">69</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pipeline Teaser */}
      <section className="py-24 bg-gradient-to-b from-[#0A1428] to-[#0A1428]/90">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="uppercase text-red-400 text-xs tracking-[4px] font-mono mb-4">START HERE</div>
            <h2 className="text-5xl font-bold tracking-tighter mb-4">The Newborn Pipeline</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto">We can count them when they enter the system.<br />We cannot publicly verify what happens after.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              {[
                { num: "3.6M", label: "U.S. births per year" },
                { num: "≈200K", label: "CPS removals" },
                { num: "22K", label: "Infants placed in foster care" },
                { num: "???", label: "What happens next?", accent: true }
              ].map((step, i) => (
                <div key={i} className="flex-1 text-center group">
                  <div className={`text-6xl font-mono font-bold ${step.accent ? 'text-red-400' : 'text-white'} group-hover:scale-110 transition-transform`}>
                    {step.num}
                  </div>
                  <div className={`h-px w-12 mx-auto my-6 bg-gradient-to-r from-transparent via-white/30 to-transparent ${step.accent && 'via-red-400'}`} />
                  <div className="text-white/60 text-sm uppercase tracking-wider">{step.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="/pipeline"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-lg font-semibold px-10 py-4 rounded-2xl transition-all group"
              >
                FOLLOW THE FULL PIPELINE
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#0A1428] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="text-red-400 text-sm tracking-[3px] uppercase font-mono mb-6">THE SYSTEM IS OPAQUE BY DESIGN</div>
          
          <h2 className="text-6xl font-bold leading-tight tracking-tighter mb-8">
            We are done being told<br />
            <span className="text-white/60">to just trust the process.</span>
          </h2>

          <a
            href="/action"
            className="inline-block bg-white text-[#0A1428] text-2xl font-bold px-16 py-8 rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-500/20"
          >
            DEMAND ANONYMIZED PUBLIC TRACKING NOW →
          </a>

          <p className="text-white/50 mt-12 text-sm max-w-md mx-auto">
            This site uses only official federal data.<br />
            No conspiracy. Just receipts.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40 text-xs">
          <p>wherearethechildren.net • Built to force accountability • All data is public government records</p>
          <p className="mt-4">Not affiliated with any government agency • For transparency and reform</p>
        </div>
      </footer>
    </div>
  );
}
