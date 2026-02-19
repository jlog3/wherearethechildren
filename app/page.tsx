// app/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Baby, Users, AlertTriangle, Search, ArrowRight, Lock, FileWarning, Shield, Scale, ExternalLink, ChevronRight } from 'lucide-react';
import PetitionForm from '@/components/PetitionForm';
import Navbar from '@/components/Navbar';

export default function Home() {
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
        setCount(Math.floor(progress * end));
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
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO + INLINE PETITION (Zero scroll to sign)
          ═══════════════════════════════════════════ */}
      <section id="sign" className="relative min-h-[100dvh] flex items-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428] via-[#12203d] to-[#0A1428]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.08)_0%,_transparent_60%)]" />

        <div className="relative w-full max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-3xl mb-6 border border-white/10">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="uppercase text-[11px] tracking-[3px] font-mono text-red-400">Official Government Data</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tighter mb-5">
                Where Are<br />
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">The Children?</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6">
                Every year, the U.S. government removes <span className="font-semibold text-white">~22,000 newborns and infants</span> from their families and places them in foster care.
                <Citation source="AFCARS FY2024" />
              </p>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6">
                Then the public record goes dark. The government's own auditors found <span className="text-red-400 font-semibold">69% of missing-from-care episodes were never properly reported</span>.
                <Citation source="HHS OIG Audit, 2023" href="https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/" />
              </p>
              <p className="text-lg text-white/60">
                We are demanding anonymized, public dashboards so that every child can be accounted for.
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-xs uppercase tracking-widest text-white/30">
                <span>HHS</span>
                <span>AFCARS</span>
                <span>NCMEC</span>
                <span>OIG</span>
                <span>CDC</span>
              </div>
            </motion.div>

            {/* Right: Petition Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-1">Sign the Petition</h2>
                <p className="text-white/50 text-sm mb-5">
                  Demand the <span className="text-red-400 font-medium">Newborn &amp; Foster Child Accountability Act</span>
                </p>
                <PetitionForm compact />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1: THE PROBLEM — In Plain Numbers
          ═══════════════════════════════════════════ */}
      <section id="the-problem" className="py-24 bg-[#0A1428] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="THE PROBLEM"
            title="What the numbers actually say"
            subtitle="Every statistic below comes from official federal sources. Click any citation to verify."
          />

          {/* The 4 key stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <StatCard
              icon={<Users className="w-9 h-9" />}
              value={<Counter end={328947} />}
              label="children currently in foster care"
              citation="AFCARS FY2024"
              href="https://www.acf.hhs.gov/cb/data-research/afcars"
            />
            <StatCard
              icon={<Baby className="w-9 h-9" />}
              value={<Counter end={22097} />}
              label="are infants under 1 year old"
              citation="AFCARS FY2024 — 7% of total"
              href="https://www.acf.hhs.gov/cb/data-research/afcars"
            />
            <StatCard
              icon={<AlertTriangle className="w-9 h-9" />}
              value={<Counter end={23160} />}
              label="reported missing from care in 2024"
              citation="NCMEC 2024 Report"
              href="https://www.missingkids.org/ourwork/impact"
            />
            <StatCard
              icon={<Lock className="w-9 h-9" />}
              value="69%"
              label="of missing episodes never properly reported"
              citation="HHS OIG Audit, 2023 — 74,353 episodes"
              href="https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/"
              highlight
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: HOW IT WORKS — The Pipeline
          ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0A1428] to-[#0c1830]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            label="HOW IT WORKS"
            title="From birth to the black box"
            subtitle="Follow the path a child takes when the state intervenes — and see exactly where public visibility ends."
          />

          <div className="mt-16 space-y-0">
            {[
              {
                num: "3.6M",
                title: "Babies born each year in the U.S.",
                desc: "Births are recorded through vital statistics — a public record managed by the CDC.",
                citation: "CDC National Vital Statistics System, 2024",
                href: "https://www.cdc.gov/nchs/nvss/index.htm",
                color: "border-blue-500/30",
                dotColor: "bg-blue-400"
              },
              {
                num: "~4M",
                title: "CPS referrals and investigations opened",
                desc: "Child Protective Services receives over 4 million reports of suspected maltreatment annually. Most are screened out or unsubstantiated.",
                citation: "HHS Child Maltreatment Report, 2024",
                href: "https://www.acf.hhs.gov/cb/data-research/child-maltreatment",
                color: "border-amber-500/30",
                dotColor: "bg-amber-400"
              },
              {
                num: "~200K",
                title: "Children physically removed from their homes",
                desc: "Roughly 200,000 children per year are removed from their families and placed into foster care, kinship care, or group homes.",
                citation: "AFCARS Report #30, 2025",
                href: "https://www.acf.hhs.gov/cb/data-research/afcars",
                color: "border-orange-500/30",
                dotColor: "bg-orange-400"
              },
              {
                num: "22K",
                title: "Newborns & infants placed in foster care",
                desc: "About 22,000 children under 1 year old are in foster care at any point. Most are removed within days of birth — often placed in emergency or stranger foster homes with accelerated approvals.",
                citation: "AFCARS FY2024 — 7% of all children in care",
                href: "https://www.acf.hhs.gov/cb/data-research/afcars",
                color: "border-red-500/30",
                dotColor: "bg-red-400"
              },
              {
                num: "???",
                title: "The public record ends here.",
                desc: "No public database exists to track individual outcomes. AFCARS publishes aggregate numbers only. You cannot follow what happened to any child after removal — reunification, adoption, aging out, or worse.",
                citation: "This is by design — see 'What They Hide' below",
                color: "border-red-500/50",
                dotColor: "bg-red-600",
                isBlackBox: true
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* Vertical line */}
                {i < 4 && (
                  <div className="absolute left-[18px] top-8 bottom-0 w-px bg-gradient-to-b from-white/20 to-white/5" />
                )}
                {/* Dot */}
                <div className={`absolute left-2.5 top-2 w-4 h-4 rounded-full ${step.dotColor} border-4 border-[#0A1428] z-10`} />

                <div className={`bg-white/[0.03] border ${step.color} rounded-2xl p-6 md:p-8 ${step.isBlackBox ? 'bg-red-950/10' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className={`text-4xl md:text-5xl font-mono font-bold tabular-nums flex-shrink-0 ${step.isBlackBox ? 'text-red-400' : 'text-white'}`}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 ${step.isBlackBox ? 'text-red-400' : ''}`}>{step.title}</h3>
                      <p className="text-white/70 leading-relaxed text-[15px]">{step.desc}</p>
                      <div className="mt-3">
                        {step.href ? (
                          <a href={step.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-red-400 transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            {step.citation}
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-red-400/60">{step.citation}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: WHAT THEY HIDE — The Black Box
          ═══════════════════════════════════════════ */}
      <section id="what-they-hide" className="py-24 bg-[#0A1428] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="WHAT THEY HIDE"
            title="The information you are forbidden from seeing"
            subtitle="These are not technical limitations. These are policy choices that keep the public in the dark."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <InfoCard
              icon={<Baby className="w-8 h-8 text-red-400" />}
              title="Individual child outcomes"
              body="AFCARS only publishes aggregate numbers. You cannot follow what happened to any specific child after the state removed them from their family."
              locked="Always"
              consequence="We know how many enter. We cannot verify how many exit safely."
              citation="AFCARS data structure"
              href="https://www.acf.hhs.gov/cb/data-research/afcars"
            />
            <InfoCard
              icon={<Shield className="w-8 h-8 text-red-400" />}
              title="Foster parent violation records"
              body="No national public database of licensed foster homes, complaints, investigations, or license revocations exists."
              locked="Always"
              consequence="Newborns are handed to strangers with no public oversight."
              citation="No federal registry exists"
            />
            <InfoCard
              icon={<FileWarning className="w-8 h-8 text-red-400" />}
              title="Real-time missing episodes"
              body="Many states fail to report missing foster children to NCMEC within 24 hours — even though federal law requires it."
              locked="Ongoing non-compliance"
              consequence="When children vanish from care, the public is kept in the dark."
              citation="HHS OIG Audit, 2023"
              href="https://oig.hhs.gov/reports/2023/missing-children-from-foster-care/"
            />
            <InfoCard
              icon={<Scale className="w-8 h-8 text-red-400" />}
              title="Maltreatment while in care"
              body="The national average is 0.9% substantiated maltreatment in care per year. But state-level audits consistently find 40–60% of perpetrators in substantiated cases are the foster parents themselves."
              locked="Deliberately underreported"
              consequence="The system meant to protect children sometimes becomes the source of harm."
              citation="NCANDS / Casey Family Programs"
              href="https://www.acf.hhs.gov/cb/data-research/child-maltreatment"
            />
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-red-950/30 border border-red-500/20 rounded-2xl px-8 py-5">
              <p className="text-lg text-white/80 italic">
                "Privacy should protect children — not shield a failing system."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: WHAT WE DEMAND
          ═══════════════════════════════════════════ */}
      <section id="what-we-demand" className="py-24 bg-gradient-to-b from-[#0c1830] to-[#0A1428] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            label="WHAT WE DEMAND"
            title="The Newborn & Foster Child Accountability Act"
            subtitle="Four concrete, achievable reforms that would make the system visible for the first time."
          />

          <div className="mt-16 space-y-6">
            <DemandCard
              number="01"
              title="Public, anonymized dashboards"
              desc="Every state must publish annual dashboards tracking children from removal to outcome — reunification, adoption, guardianship, or aging out. Anonymized, but accountable."
              why="Right now, the public cannot verify whether children exiting the system are safe. Aggregate numbers hide individual failures."
            />
            <DemandCard
              number="02"
              title="Real-time missing-from-care reporting"
              desc="Every missing-from-care episode must be reported to NCMEC automatically and immediately — not weeks or months later, not at the state's discretion."
              why="The OIG found 69% of 74,353 missing episodes went unreported. NCMEC estimates 1 in 7 missing foster children is a likely trafficking victim."
            />
            <DemandCard
              number="03"
              title="Standardized state-by-state performance metrics"
              desc="A national dashboard comparing every state on the same measures: removal rates, placement stability, time to permanency, missing episodes, and maltreatment in care."
              why="Some states report vastly different rates than others. Without standardized data, there is no way to identify which states are failing and which practices work."
            />
            <DemandCard
              number="04"
              title="Federal funding tied to compliance"
              desc="States that fail to report accurately or refuse to publish dashboards lose a percentage of their Title IV-E federal foster care funding."
              why="Voluntary compliance has not worked. The OIG audit proved this. Financial incentives are the only mechanism with a track record of driving state behavior."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: WHY THIS MATTERS TO YOU
          ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0A1428] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            label="WHY THIS MATTERS"
            title="This isn't just about foster care"
            subtitle="Substance abuse, trafficking, racial disparities, and system failures affect every community."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <ContextCard
              title="The opioid crisis drives removals"
              body="Substance abuse is the leading reason children are removed from homes. As overdose deaths continue rising, so do infant removals — but there's no public way to track the connection in real time."
              citation="AFCARS removal reasons; CDC WONDER overdose data"
            />
            <ContextCard
              title="Racial disparities are severe"
              body="Black and American Indian/Alaska Native children are removed at dramatically higher rates than white children. Without public data, these disparities remain invisible and unaddressed."
              citation="AFCARS demographic data; GAO reports on racial disproportionality"
            />
            <ContextCard
              title="Trafficking targets foster youth"
              body="NCMEC reports that 1 in 7 children reported missing from care is assessed as a likely sex trafficking victim. These children are uniquely vulnerable — and the system designed to protect them is losing them."
              citation="NCMEC 2024 annual data"
              href="https://www.missingkids.org/ourwork/impact"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: CONTINUE THE JOURNEY
          ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0A1428] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="uppercase text-white/40 text-xs tracking-[4px] font-mono mb-4">GO DEEPER</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Follow the Full Story</h2>
            <p className="text-lg text-white/60">Each page builds on the last. Start anywhere — but the truth compounds.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: '/crisis',
                step: '01',
                title: 'The Crisis',
                desc: 'The OIG audit, the 69% gap, and the trafficking link.',
                color: 'from-red-500/20 to-red-600/10',
                borderColor: 'hover:border-red-500/40'
              },
              {
                href: '/pipeline',
                step: '02',
                title: 'Newborn Pipeline',
                desc: 'From birth to removal — and where the public record goes dark.',
                color: 'from-orange-500/20 to-orange-600/10',
                borderColor: 'hover:border-orange-500/40'
              },
              {
                href: '/blackbox',
                step: '03',
                title: 'The Black Box',
                desc: 'What the system legally forbids you from seeing.',
                color: 'from-purple-500/20 to-purple-600/10',
                borderColor: 'hover:border-purple-500/40'
              },
              {
                href: '/risks',
                step: '04',
                title: 'Risks in Care',
                desc: 'Maltreatment rates, foster home turnover, and newborn vulnerability.',
                color: 'from-amber-500/20 to-amber-600/10',
                borderColor: 'hover:border-amber-500/40'
              }
            ].map((page, i) => (
              <motion.a
                key={page.href}
                href={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group block bg-gradient-to-b ${page.color} border border-white/10 ${page.borderColor} rounded-2xl p-6 transition-all hover:-translate-y-1`}
              >
                <div className="text-3xl font-mono font-bold text-white/20 mb-3">{page.step}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">{page.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{page.desc}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-white/40 group-hover:text-red-400 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA: SIGN THE PETITION (again)
          ═══════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-[#0A1428] to-black/60 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-red-400 text-sm tracking-[3px] uppercase font-mono mb-6">ADD YOUR NAME</div>
          <h2 className="text-5xl font-bold leading-tight tracking-tighter mb-4">
            The children cannot speak<br />
            <span className="text-red-400">for themselves.</span>
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Every signature brings us closer to forcing the system open.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 text-left">
            <PetitionForm />
          </div>

          <p className="text-white/40 mt-10 text-xs max-w-md mx-auto">
            This site uses only official federal data. No conspiracy. Just receipts.<br />
            <a href="/sources" className="underline hover:text-red-400 transition-colors">See all sources →</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-xs">
          <div>wherearethechildren.net · Built to force accountability · All data is public government records</div>
          <div className="flex items-center gap-6">
            <a href="/sources" className="hover:text-white transition-colors">Sources & Methodology</a>
            <a href="/action" className="hover:text-white transition-colors">Full Petition Page</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════ */

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto"
    >
      <div className="uppercase text-red-400 text-xs tracking-[4px] font-mono mb-4">{label}</div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{title}</h2>
      <p className="text-lg text-white/60">{subtitle}</p>
    </motion.div>
  );
}

function Citation({ source, href }: { source: string; href?: string }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-white/30 hover:text-red-400 transition-colors align-super ml-1">
        [{source}]
        <ExternalLink className="w-2.5 h-2.5" />
      </a>
    );
  }
  return <span className="text-[11px] font-mono text-white/30 align-super ml-1">[{source}]</span>;
}

function StatCard({ icon, value, label, citation, href, highlight }: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  citation: string;
  href?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white/5 border rounded-3xl p-8 hover:border-red-500/30 transition-all group ${highlight ? 'border-red-500/40 bg-red-950/10' : 'border-white/10'}`}
    >
      <div className="text-red-400 mb-3">{icon}</div>
      <div className={`text-4xl md:text-5xl font-mono font-bold tabular-nums mb-2 ${highlight ? 'text-red-400' : ''}`}>
        {value}
      </div>
      <div className="text-white/70 text-base mb-4">{label}</div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-red-400 transition-colors">
          <ExternalLink className="w-3 h-3" />
          {citation}
        </a>
      ) : (
        <div className="text-[11px] font-mono text-white/40">{citation}</div>
      )}
    </motion.div>
  );
}

function InfoCard({ icon, title, body, locked, consequence, citation, href }: {
  icon: React.ReactNode;
  title: string;
  body: string;
  locked: string;
  consequence: string;
  citation: string;
  href?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/[0.03] border border-white/10 hover:border-red-500/30 rounded-2xl p-8 transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-red-400/60" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed text-[15px] mb-4">{body}</p>
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div>
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Status</div>
          <div className="text-red-400 text-sm font-medium">{locked}</div>
        </div>
        <div className="text-right flex-1">
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Consequence</div>
          <div className="text-white/60 text-sm">{consequence}</div>
        </div>
      </div>
      <div className="mt-4">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/30 hover:text-red-400 transition-colors">
            <ExternalLink className="w-3 h-3" />
            {citation}
          </a>
        ) : (
          <span className="text-[11px] font-mono text-white/30">{citation}</span>
        )}
      </div>
    </motion.div>
  );
}

function DemandCard({ number, title, desc, why }: {
  number: string;
  title: string;
  desc: string;
  why: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/[0.03] border border-white/10 hover:border-red-500/30 rounded-2xl p-8 md:p-10 transition-all"
    >
      <div className="flex items-start gap-6">
        <div className="text-5xl font-mono font-bold text-red-400/30 flex-shrink-0 leading-none">{number}</div>
        <div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-white/80 leading-relaxed mb-4">{desc}</p>
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Why this matters</div>
            <p className="text-white/60 text-sm leading-relaxed">{why}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContextCard({ title, body, citation, href }: {
  title: string;
  body: string;
  citation: string;
  href?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
    >
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-white/70 text-[15px] leading-relaxed mb-4">{body}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/30 hover:text-red-400 transition-colors">
          <ExternalLink className="w-3 h-3" />
          {citation}
        </a>
      ) : (
        <span className="text-[11px] font-mono text-white/30">{citation}</span>
      )}
    </motion.div>
  );
}
