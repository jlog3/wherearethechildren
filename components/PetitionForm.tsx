// components/PetitionForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronDown, ChevronUp, Target, ExternalLink, Copy, Check, User, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShareButtons from '@/components/ShareButtons';

const SIGNATURE_GOAL_1 = 10000;
const SIGNATURE_GOAL_2 = 50000;

function buildPetitionText(signerName: string, signerZip?: string) {
  const zipLine = signerZip ? `\nConstituent ZIP code: ${signerZip}` : '';
  return `Dear Members of Congress,

I am writing to demand the immediate passage of the Newborn and Foster Child Accountability Act.

Every year, the state removes approximately 22,000 newborns and infants from their parents and places them into foster care.

The 2023 HHS OIG audit revealed that 69% of missing episodes from foster care were never properly reported to the national system. Thousands of children are lost in a system with zero public visibility.

We demand:

1. Annual public, anonymized dashboards tracking every CPS-involved child from removal to outcome (reunification, adoption, guardianship, or aging out).
2. Automatic, real-time public reporting of every missing-from-care episode to NCMEC.
3. Mandatory state-by-state performance dashboards — open to the public — with standardized metrics.
4. Federal funding tied to compliance and transparent reporting.

Privacy should protect children — not shield a failing system. The public has a right to know where the children are.

Sincerely,
${signerName}${zipLine}`;
}

// Example community messages — replace with real data from your backend
const communityMessages = [
  { name: "Anonymous", message: "As a former foster youth, I aged out with no one checking on me. This system needs sunlight.", time: "2 hours ago" },
  { name: "David R.", message: "My niece was in 7 placements in 2 years. We had no way to track what was happening. This has to change.", time: "5 hours ago" },
  { name: "Anonymous", message: "I'm a social worker. We need these dashboards. I've been saying this for years.", time: "1 day ago" },
  { name: "Anonymous", message: "69% unreported is criminal negligence. Period.", time: "1 day ago" },
  { name: "Priya N.", message: "Every child deserves to be accounted for. This is the bare minimum.", time: "2 days ago" },
];

interface PetitionFormProps {
  compact?: boolean;
}

export default function PetitionForm({ compact = false }: PetitionFormProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showName, setShowName] = useState(false); // anonymous by default
  const [signatureCount, setSignatureCount] = useState(0);
  const [countLoaded, setCountLoaded] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [copied, setCopied] = useState(false);

  // Hash email client-side (SHA-256) — we never send raw email to our API
  async function hashEmail(email: string): Promise<string> {
    const normalized = email.trim().toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fetch real signature count on mount
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
  const personalizedLetter = buildPetitionText(name || 'A Concerned Citizen', zip || undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    // Capture form data BEFORE any async calls (React recycles the event)
    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullMessage = customMessage.trim()
      ? `${personalizedLetter}\n\n--- PERSONAL MESSAGE ---\n${customMessage}\n\n--- DISPLAY PREFERENCE ---\n${showName ? `Show as: ${name}` : 'Anonymous'}`
      : `${personalizedLetter}\n\n--- DISPLAY PREFERENCE ---\n${showName ? `Show as: ${name}` : 'Anonymous'}`;
    formData.set('message', fullMessage);
    formData.set('petition_letter', personalizedLetter);

    // Check for duplicate email first
    const emailH = await hashEmail(email);
    try {
      const dedupRes = await fetch('/api/signatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailHash: emailH }),
      });
      const dedupData = await dedupRes.json();

      if (dedupData.duplicate) {
        setSignatureCount(dedupData.count);
        alert('You have already signed this petition. Thank you for your support!');
        setFormStatus('idle');
        return;
      }

      setSignatureCount(dedupData.count);
    } catch {
      // If dedup check fails, continue anyway
    }

    // Submit to Formspree
    try {
      const res = await fetch('https://formspree.io/f/xlgwbzwe', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
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

  const copyLetter = () => {
    navigator.clipboard.writeText(personalizedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ═══════════════════════════════════════
  // SUCCESS STATE
  // ═══════════════════════════════════════
  if (formStatus === 'success') {
    return (
      <div className={compact ? '' : 'max-w-3xl mx-auto'}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 md:p-10"
        >
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">✊</div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">
              Thank you, {name || 'friend'}.
            </h3>
            <p className="text-white/70 text-sm">
              Signature #{signatureCount.toLocaleString()} recorded toward our goal of {currentGoal.toLocaleString()}.
            </p>
            <SignatureProgress count={signatureCount} goal={currentGoal} />
          </div>

          {/* ── STEP 2: Send to Your Reps ── */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-mono text-red-400 uppercase tracking-[3px] mb-3">
              STEP 2 — SEND YOUR LETTER DIRECTLY
            </div>
            <p className="text-white/70 text-sm mb-4">
              Your signature is recorded. Now send the letter directly to your representatives —
              it takes about 30 seconds per rep.
            </p>

            {/* Copy letter button */}
            <button
              onClick={copyLetter}
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl text-sm font-medium transition-all mb-4"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Letter copied to clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  1. Copy your letter to clipboard
                </>
              )}
            </button>

            {/* Direct links to find & contact reps */}
            <div className="space-y-3">
              <a
                href="https://www.congress.gov/members/find-your-member"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-red-600 hover:bg-red-500 rounded-xl px-5 py-4 transition-all group"
              >
                <div>
                  <div className="font-semibold text-sm">2. Find your Senators & Representative</div>
                  <div className="text-xs text-white/70">
                    Enter your address on congress.gov
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>

              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div className="font-semibold text-sm mb-1">3. Paste the letter into each rep's contact form</div>
                <div className="text-xs text-white/50">
                  Click each representative's name on congress.gov → find their "Contact" page → paste your letter
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="text-xs text-white/40 mb-2 font-mono uppercase tracking-widest">Or use Resistbot — even faster</div>
                <a
                  href="https://resist.bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="font-semibold text-sm">Text RESIST to 50409</div>
                    <div className="text-xs text-white/50">Sends your letter to all your reps via text message</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40" />
                </a>
              </div>
            </div>

            <p className="text-[11px] text-white/30 mt-4 text-center">
              Congressional offices use web forms — that's why we prepare the letter for you to paste.
            </p>
          </div>

          {/* ── Community Messages ── */}
          {customMessage.trim() && (
            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Your message</div>
              <p className="text-white/80 text-sm italic">"{customMessage}"</p>
              <div className="text-xs text-white/30 mt-1">
                Displayed as: {showName ? name : 'Anonymous'}
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3 text-center">Messages from fellow signers</div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {communityMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-left"
                >
                  <p className="text-white/80 text-sm italic mb-1">"{msg.message}"</p>
                  <div className="text-xs text-white/30">— {msg.name} · {msg.time}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Share — always visible below success state */}
          <ShareButtons compact={compact} />
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════
  // FORM STATE
  // ═══════════════════════════════════════
  return (
    <div className={compact ? '' : 'max-w-3xl mx-auto'}>
      <SignatureProgress count={signatureCount} goal={currentGoal} />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name + Email + ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30"
            placeholder="Your full name *"
          />
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30"
            placeholder="Email address *"
          />
          <input
            name="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30"
            placeholder="ZIP code"
          />
        </div>

        {/* Pre-filled letter preview with name */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowFullMessage(!showFullMessage)}
            className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
              {name
                ? `Letter to Congress — signed by ${name}`
                : 'Pre-written letter to Congress (your name will be added)'}
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
                  {personalizedLetter}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Optional personal message */}
        <div className="space-y-2">
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={2}
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none text-sm placeholder:text-white/30 resize-none"
            placeholder="Add a personal message (optional — shown to other signers)"
          />

          {/* Anonymous toggle — only show if they wrote a message */}
          {customMessage.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-3 px-1"
            >
              <button
                type="button"
                onClick={() => setShowName(!showName)}
                className={`relative w-10 h-6 rounded-full transition-colors ${
                  showName ? 'bg-red-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    showName ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-white/50">
                {showName ? (
                  <>
                    <User className="w-3.5 h-3.5" />
                    Show my name: <span className="text-white/80 font-medium">{name}</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    Anonymous — your name will not be displayed
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

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

        <div className="space-y-1.5 text-center text-[11px] text-white/30 px-2">
          <p>
            Your letter is <span className="text-white/50">not sent automatically</span> — after signing, we'll help you send it directly to your representatives.
          </p>
          <p>
            Your name and ZIP are stored to verify petition signatures when delivered to Congress. <span className="text-white/50">We will never sell or share your information.</span>
          </p>
        </div>
      </form>

      {/* Share — always visible below the petition form */}
      <ShareButtons compact={compact} />
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
