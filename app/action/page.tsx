// app/action/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Send, Share2, Mail, Twitter, Facebook, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PetitionForm from '@/components/PetitionForm';

const petitionTextForEmail = `Dear Members of Congress,

I am writing to demand the immediate passage of the Newborn and Foster Child Accountability Act.

Every year, the state removes approximately 22,000 newborns and infants from their parents and places them into foster care.

The 2023 HHS OIG audit revealed that 69% of missing episodes from foster care were never properly reported to the national system.

We demand:
1. Annual public, anonymized dashboards tracking every CPS-involved child from removal to outcome.
2. Automatic, real-time public reporting of every missing-from-care episode to NCMEC.
3. Mandatory state-by-state performance dashboards open to the public.
4. Federal funding tied to compliance and transparent reporting.

Privacy should protect children — not shield a failing system.

The public has a right to know where the children are.

Sincerely,`;

export default function ActionPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto px-6"
        >
          <div className="text-red-400 text-sm font-mono tracking-[4px] uppercase mb-4">THE MOMENT IS NOW</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            Take <span className="text-red-400">Action</span>
          </h1>
          <p className="text-xl text-white/70">
            The data is undeniable. Sign the petition, email your representatives, and share the truth.
          </p>
        </motion.div>
      </section>

      {/* Petition Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2">Sign the Petition</h2>
            <p className="text-white/50 mb-8">
              Demand the <span className="text-red-400 font-medium">Newborn &amp; Foster Child Accountability Act</span>
            </p>
            <PetitionForm />
          </div>
        </div>
      </section>

      {/* Email Your Reps */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-center text-2xl font-bold mb-8">Or Email Your Representatives Directly</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-8 h-8 text-red-400" />
                <div>
                  <div className="font-semibold text-lg">Email Your Senators</div>
                  <div className="text-white/50 text-sm">Takes 30 seconds</div>
                </div>
              </div>
              <a
                href={`mailto:senator@senate.gov?subject=Pass%20the%20Newborn%20and%20Foster%20Child%20Accountability%20Act&body=${encodeURIComponent(petitionTextForEmail)}`}
                className="block w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl text-center font-medium transition-colors"
              >
                OPEN EMAIL TO SENATORS →
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-8 h-8 text-red-400" />
                <div>
                  <div className="font-semibold text-lg">Email Your Representative</div>
                  <div className="text-white/50 text-sm">Takes 30 seconds</div>
                </div>
              </div>
              <a
                href={`mailto:representative@house.gov?subject=Pass%20the%20Newborn%20and%20Foster%20Child%20Accountability%20Act&body=${encodeURIComponent(petitionTextForEmail)}`}
                className="block w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl text-center font-medium transition-colors"
              >
                OPEN EMAIL TO REPRESENTATIVE →
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-white/30 mt-6 font-mono">
            Tip: Replace the generic emails with your actual representatives — use{' '}
            <a href="https://www.congress.gov/members/find-your-member" target="_blank" className="underline hover:text-red-400">congress.gov</a> or{' '}
            <a href="https://resist.bot" target="_blank" className="underline hover:text-red-400">resist.bot</a>
          </p>
        </div>
      </section>

      {/* Share */}
      <section className="py-16 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-8">Share This Site</h3>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://twitter.com/intent/tweet?text=Where%20are%20the%20children%3F%2069%25%20of%20missing%20foster%20care%20episodes%20go%20unreported.%20Sign%20the%20petition%3A%20https%3A%2F%2Fwherearethechildren.net"
              target="_blank"
              className="flex items-center gap-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 px-8 py-4 rounded-2xl transition-all"
            >
              <Twitter className="w-5 h-5" />
              Share on X
            </a>

            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://wherearethechildren.net"
              target="_blank"
              className="flex items-center gap-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 px-8 py-4 rounded-2xl transition-all"
            >
              <Facebook className="w-5 h-5" />
              Share on Facebook
            </a>

            <button
              onClick={() => navigator.clipboard.writeText('https://wherearethechildren.net')}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl transition-all"
            >
              <Share2 className="w-5 h-5" />
              Copy Link
            </button>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 text-center border-t border-white/5">
        <p className="text-3xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
          The children cannot speak for themselves.<br />
          <span className="text-red-400">We must.</span>
        </p>
      </section>
    </div>
  );
}
