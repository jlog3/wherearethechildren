// app/action/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Search, Send, Share2, Mail, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function ActionPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [zip, setZip] = useState('');

  const petitionText = `Dear Members of Congress,

I am writing to demand the immediate passage of the **Newborn and Foster Child Accountability Act**.

Every year, the state removes approximately 22,000 newborns and infants from their parents and places them into foster care. 

The 2023 HHS OIG audit revealed that **69% of missing episodes from foster care were never properly reported** to the national system. Thousands of children are lost in the black box.

We demand:

1. Annual **public, anonymized dashboards** tracking every CPS-involved child from removal to outcome (reunification, adoption, guardianship, or aging out).
2. Secure linkage between birth records and foster outcomes (fully de-identified).
3. Automatic, real-time public reporting of every missing-from-care episode to NCMEC.
4. Funding tied to compliance.

Privacy should protect children — not shield a failing system.

The public has a right to know where the children are.

Thank you for your leadership.

Sincerely,`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    // Replace with your Formspree endpoint
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/YOUR_CODE_HERE', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
        setFormStatus('idle');
      }
    } catch (err) {
      alert('Network error. Please try again.');
      setFormStatus('idle');
    }
  };

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
            <a href="/blackbox" className="hover:text-red-400 transition-colors">The Black Box</a>
            <a href="/risks" className="hover:text-red-400 transition-colors">Risks in Care</a>
            <a href="/action" className="text-red-400 font-semibold">Take Action</a>
          </div>

          <a href="/" className="text-sm text-white/60 hover:text-white">← Back to Home</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-red-400 text-sm font-mono tracking-[4px] uppercase mb-6">THE MOMENT IS NOW</div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
            Take<br />
            <span className="text-red-400">Action</span>
          </h1>
          <p className="text-2xl text-white/80 max-w-2xl mx-auto">
            The data is undeniable.<br />
            The black box must be opened.
          </p>
        </motion.div>
      </section>

      {/* Petition Form */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#0A1428] border border-red-500/30 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl font-bold mb-4">Sign the Petition</h2>
            <p className="text-white/70 mb-10">Demand the **Newborn and Foster Child Accountability Act**</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-2">FIRST NAME</label>
                  <input name="name" required className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:border-red-400 outline-none" placeholder="Alex" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/50 mb-2">EMAIL</label>
                  <input name="email" type="email" required className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:border-red-400 outline-none" placeholder="you@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 mb-2">ZIP CODE (for your representatives)</label>
                <input 
                  name="zip" 
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:border-red-400 outline-none" 
                  placeholder="90210" 
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 mb-2">YOUR MESSAGE TO CONGRESS (pre-filled)</label>
                <textarea 
                  name="message"
                  defaultValue={petitionText}
                  rows={14}
                  className="w-full bg-white/10 border border-white/20 rounded-3xl px-6 py-6 focus:border-red-400 outline-none font-light text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-red-600 hover:bg-red-500 py-6 rounded-2xl font-bold text-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {formStatus === 'loading' ? 'SENDING...' : 'SIGN & SEND TO CONGRESS'}
                <Send className="w-6 h-6" />
              </button>
            </form>

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center text-green-400 font-medium"
              >
                ✅ Thank you. Your voice has been sent.
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* One-Click Email Tools */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-center text-3xl font-bold mb-12">Or Email Your Representatives Directly</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Senators */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-red-500/30 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <Mail className="w-10 h-10 text-red-400" />
                <div>
                  <div className="font-semibold text-xl">Email Both Senators</div>
                  <div className="text-white/50 text-sm">Takes 30 seconds</div>
                </div>
              </div>
              <a
                href={`mailto:senator@senate.gov?subject=Pass the Newborn and Foster Child Accountability Act&body=${encodeURIComponent(petitionText)}`}
                className="block w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl text-center font-medium transition-colors"
              >
                OPEN EMAIL TO SENATORS →
              </a>
            </div>

            {/* Representative */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-red-500/30 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <Mail className="w-10 h-10 text-red-400" />
                <div>
                  <div className="font-semibold text-xl">Email Your Representative</div>
                  <div className="text-white/50 text-sm">Takes 30 seconds</div>
                </div>
              </div>
              <a
                href={`mailto:representative@house.gov?subject=Pass the Newborn and Foster Child Accountability Act&body=${encodeURIComponent(petitionText)}`}
                className="block w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl text-center font-medium transition-colors"
              >
                OPEN EMAIL TO REPRESENTATIVE →
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-white/40 mt-10 font-mono">
            Tip: Replace the generic emails above with your actual reps (use congress.gov or resist.bot)
          </p>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10">Share This Site</h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://twitter.com/intent/tweet?text=Where%20are%20the%20children%3F%20Official%20data%20shows%20the%20foster%20system%20loses%20track%20of%20thousands.%20Read%20the%20receipts%3A%20https%3A%2F%2Fwherearethechildren.net"
              target="_blank"
              className="flex items-center gap-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 px-10 py-4 rounded-2xl transition-all"
            >
              <Twitter className="w-6 h-6" />
              Share on X
            </a>

            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://wherearethechildren.net"
              target="_blank"
              className="flex items-center gap-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 px-10 py-4 rounded-2xl transition-all"
            >
              <Facebook className="w-6 h-6" />
              Share on Facebook
            </a>

            <button
              onClick={() => navigator.clipboard.writeText('https://wherearethechildren.net')}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-4 rounded-2xl transition-all"
            >
              <Share2 className="w-6 h-6" />
              Copy Link
            </button>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-32 text-center border-t border-white/10">
        <p className="text-4xl font-light text-white/80 max-w-3xl mx-auto leading-tight">
          The children cannot speak for themselves.<br />
          <span className="text-red-400">We must.</span>
        </p>
      </section>
    </div>
  );
}
