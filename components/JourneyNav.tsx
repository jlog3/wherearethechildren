// components/JourneyNav.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const journeySteps = [
  {
    href: '/crisis',
    step: '01',
    title: 'The Crisis',
    desc: 'The OIG audit, the 69% gap, and the trafficking link.',
    color: 'from-red-500/20 to-red-600/10',
    activeColor: 'from-red-500/30 to-red-600/20',
    borderActive: 'border-red-500/50',
  },
  {
    href: '/pipeline',
    step: '02',
    title: 'Newborn Pipeline',
    desc: 'From birth to removal — where the public record goes dark.',
    color: 'from-orange-500/20 to-orange-600/10',
    activeColor: 'from-orange-500/30 to-orange-600/20',
    borderActive: 'border-orange-500/50',
  },
  {
    href: '/blackbox',
    step: '03',
    title: 'The Black Box',
    desc: 'What the system legally forbids you from seeing.',
    color: 'from-purple-500/20 to-purple-600/10',
    activeColor: 'from-purple-500/30 to-purple-600/20',
    borderActive: 'border-purple-500/50',
  },
  {
    href: '/risks',
    step: '04',
    title: 'Risks in Care',
    desc: 'Maltreatment, foster home turnover, and newborn vulnerability.',
    color: 'from-amber-500/20 to-amber-600/10',
    activeColor: 'from-amber-500/30 to-amber-600/20',
    borderActive: 'border-amber-500/50',
  },
];

interface JourneyNavProps {
  currentPath: '/crisis' | '/pipeline' | '/blackbox' | '/risks';
}

export default function JourneyNav({ currentPath }: JourneyNavProps) {
  const currentIndex = journeySteps.findIndex((s) => s.href === currentPath);
  const nextIndex = currentIndex + 1;
  const nextStep = nextIndex < journeySteps.length ? journeySteps[nextIndex] : null;

  return (
    <section className="py-24 bg-[#0A1428] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        {/* Next step callout */}
        {nextStep && (
          <motion.a
            href={nextStep.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group block bg-gradient-to-r ${nextStep.activeColor} border-2 ${nextStep.borderActive} rounded-2xl p-8 mb-10 transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono tracking-[3px] uppercase mb-3">
              <ArrowRight className="w-4 h-4" />
              CONTINUE TO NEXT CHAPTER
            </div>
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl font-mono font-bold text-white/30">{nextStep.step}</span>
                  <h3 className="text-2xl font-bold group-hover:text-red-400 transition-colors">{nextStep.title}</h3>
                </div>
                <p className="text-white/60">{nextStep.desc}</p>
              </div>
              <ArrowRight className="w-8 h-8 text-white/30 group-hover:text-red-400 group-hover:translate-x-2 transition-all flex-shrink-0" />
            </div>
          </motion.a>
        )}

        {/* If on last page, point to action */}
        {!nextStep && (
          <motion.a
            href="/#sign"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group block bg-gradient-to-r from-red-500/20 to-red-600/10 border-2 border-red-500/50 rounded-2xl p-8 mb-10 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono tracking-[3px] uppercase mb-3">
              <ArrowRight className="w-4 h-4" />
              YOU'VE SEEN THE EVIDENCE
            </div>
            <div className="flex items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold group-hover:text-red-400 transition-colors">Sign the Petition</h3>
                <p className="text-white/60">Add your name to demand the Newborn &amp; Foster Child Accountability Act.</p>
              </div>
              <ArrowRight className="w-8 h-8 text-white/30 group-hover:text-red-400 group-hover:translate-x-2 transition-all flex-shrink-0" />
            </div>
          </motion.a>
        )}

        {/* All steps mini-map */}
        <div className="grid grid-cols-4 gap-3">
          {journeySteps.map((page, i) => {
            const isCurrent = page.href === currentPath;
            const isCompleted = i < currentIndex;
            const isNext = i === nextIndex;

            return (
              <motion.a
                key={page.href}
                href={page.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group block rounded-xl p-4 transition-all border ${
                  isCurrent
                    ? `bg-gradient-to-b ${page.activeColor} ${page.borderActive}`
                    : isNext
                    ? `bg-gradient-to-b ${page.color} border-white/20 hover:-translate-y-0.5`
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-lg font-mono font-bold ${isCurrent ? 'text-white/60' : 'text-white/20'}`}>
                    {page.step}
                  </span>
                  {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-400/60" />}
                  {isCurrent && <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest">You are here</span>}
                </div>
                <h4 className={`text-sm font-semibold mb-1 ${isCurrent ? 'text-white' : 'text-white/60 group-hover:text-white/80'} transition-colors`}>
                  {page.title}
                </h4>
                <p className="text-[11px] text-white/30 leading-snug hidden sm:block">{page.desc}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
