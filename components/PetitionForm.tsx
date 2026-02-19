// components/PetitionForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronDown, ChevronUp, MessageSquare, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SIGNATURE_GOAL_1 = 10000;
const SIGNATURE_GOAL_2 = 50000;

const petitionText = `Dear Members of Congress,

I am writing to demand the immediate passage of the Newborn and Foster Child Accountability Act.

Every year, the state removes approximately 22,000 newborns and infants from their parents and places them into foster care.

The 2023 HHS OIG audit revealed that 69% of missing episodes from foster care were never properly reported to the national system. Thousands of children are lost in a system with zero public visibility.

We demand:

1. Annual public, anonymized dashboards tracking every CPS-involved child from removal to outcome (reunification, adoption, guardianship, or aging out).
2. Automatic, real-time public reporting of every missing-from-care episode to NCMEC.
3. Mandatory state-by-state performance dashboards — open to the public — with standardized metrics.
4. Federal funding tied to compliance and transparent reporting.

Privacy should protect children — not shield a failing system. The public has a right to know where the children are.

Sincerely,`;

// Example community messages — replace with real data from your backend
const communityMessages = [
  { name: "Sarah M.", state: "TX", message: "As a former foster youth, I aged out with no one checking on me. This system needs sunlight.", time: "2 hours ago" },
  { name: "David R.", state: "OH", message: "My niece was in 7 placements in 2 years. We had no way to track what was happening. This has to change.", time: "5 hours ago" },
  { name: "Maria L.", state: "CA", message: "I'm a social worker. We need these dashboards. I've been saying this for years.", time: "1 day ago" },
  { name: "James K.", state: "FL", message: "69% unreported is criminal negligence. Period.", time: "1 day ago" },
  { name: "Priya N.", state: "NY", message: "Every child deserves to be accounted for. This is the bare minimum.", time: "2 days ago" },
];

interface PetitionFormProps {
  compact?: boolean; // compact = homepage inline version
}

export default function PetitionForm({ compact = false }: PetitionFormProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [signatureCount, setSignatureCount] = useState(0);
  const [countLoaded, setCountLoaded] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');

  // Fetch real count on mount
  useEffect(() => {
    fetch('/api/signatures')
      .then(res => res.json())
      .then(data => {
        setSignatureCount(data.count ?? 0);
        setCountLoaded(true);
      })
      .catch(() => setCountLoaded(true));
  }, []);
  const currentGoal = signatureCount < SIGNATURE_GOAL_1 ? SIGNATURE_GOAL_1 : SIGNATURE_GOAL_2;
  const progress = Math.min((signatureCount / currentGoal) * 100, 100);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add the full petition text + any custom message
    const fullMessage = customMessage.trim()
      ? `${petitionText}\n\n--- PERSONAL MESSAGE ---\n${customMessage}`
      : petitionText;
    formData.set('message', fullMessage);

    try {
      const res = await fetch('https://formspree.io/f/xlgwbzwe', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        // Increment real signature count
        try {
          const countRes = await fetch('/api/signatures', { method: 'POST' });
          const countData = await countRes.json();
          setSignatureCount(countData.count);
        } catch {
          setSignatureCount(prev => prev + 1); // fallback
        }
        setFormStatus('success');
      } else {
        alert('Something went wrong. Please try again.');
        setFormStatus('idle');
      }
    } catch (err) {
      alert('Network error. Please try again.');
      setFormStatus('idle');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className={compact ? '' : 'max-w-3xl mx-auto'}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="text-5xl mb-4">✊</div>
          <h3 className="text-3xl font-bold text-emerald-400 mb-3">Your voice has been heard.</h3>
          <p className="text-white/70 mb-6">
            Signature #{signatureCount.toLocaleString()} recorded toward our goal of {currentGoal.toLocaleString()}.
          </p>

          {/* Signature Progress */}
          <SignatureProgress count={signatureCount} goal={currentGoal} />

          {/* Community Messages */}
          {customMessage.trim() && (
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Your message</div>
              <p className="text-white/80 italic">"{customMessage}"</p>
            </div>
          )}

          <div className="mt-8">
            <div className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4">Messages from fellow signers</div>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {communityMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left"
                >
                  <p className="text-white/80 text-sm italic mb-2">"{msg.message}"</p>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>{msg.name} · {msg.state}</span>
                    <span>{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just signed the petition demanding public tracking of children in foster care. 69% of missing episodes go unreported. The black box must be opened. https://wherearethechildren.net")}`}
              target="_blank"
              className="bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/30 px-6 py-3 rounded-2xl text-sm font-medium transition-all"
            >
              Share on X →
            </a>
            <button
              onClick={() => navigator.clipboard.writeText('https://wherearethechildren.net')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-2xl text-sm font-medium transition-all"
            >
              Copy link to share
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={compact ? '' : 'max-w-3xl mx-auto'}>
      {/* Signature Counter */}
      <SignatureProgress count={signatureCount} goal={currentGoal} />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name + Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30"
            placeholder="Your name"
          />
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30"
            placeholder="Email address"
          />
          <input
            name="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30"
            placeholder="ZIP code"
          />
        </div>

        {/* Pre-filled message toggle */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowFullMessage(!showFullMessage)}
            className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
              Pre-written letter to Congress included
            </span>
            {showFullMessage ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
          </button>
          <AnimatePresence>
            {showFullMessage && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 text-xs text-white/50 leading-relaxed whitespace-pre-line border-t border-white/10 pt-3">
                  {petitionText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Optional custom message */}
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows={2}
          className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30 resize-none"
          placeholder="Add a personal message (optional — visible to other signers)"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={formStatus === 'loading'}
          className="w-full bg-red-600 hover:bg-red-500 py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-red-600/30"
        >
          {formStatus === 'loading' ? (
            'SENDING...'
          ) : (
            <>
              SIGN THE PETITION
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-white/30">
          Your signature sends a letter to Congress demanding the Newborn &amp; Foster Child Accountability Act.
        </p>
      </form>
    </div>
  );
}

function SignatureProgress({ count, goal }: { count: number; goal: number }) {
  const progress = Math.min((count / goal) * 100, 100);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-red-400" />
          <span className="text-sm font-semibold">
            <span className="text-red-400 font-mono">{count.toLocaleString()}</span>
            <span className="text-white/50"> / {goal.toLocaleString()} signatures</span>
          </span>
        </div>
        <span className="text-xs text-white/40 font-mono">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
        />
      </div>
    </div>
  );
}
