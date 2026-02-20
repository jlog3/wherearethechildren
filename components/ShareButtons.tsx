// components/ShareButtons.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Mail, Link2, Check, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { shareStats, buildShareLinks, type ShareStat } from '@/lib/shareStats';

interface ShareButtonsProps {
  compact?: boolean;
}

export default function ShareButtons({ compact = false }: ShareButtonsProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedStat, setSelectedStat] = useState<ShareStat | null>(null);
  const [copied, setCopied] = useState(false);
  const [randomStat, setRandomStat] = useState<ShareStat>(shareStats[0]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Pick a random stat on mount (client-side only to avoid hydration mismatch)
  useEffect(() => {
    const idx = Math.floor(Math.random() * shareStats.length);
    setRandomStat(shareStats[idx]);
  }, []);

  // Close modal on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowPicker(false);
        setSelectedStat(null);
      }
    }
    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  // Close on escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowPicker(false);
        setSelectedStat(null);
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleShareClick = () => {
    setShowPicker(true);
    setSelectedStat(null);
  };

  const handleSelectStat = (stat: ShareStat) => {
    setSelectedStat(stat);
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async (stat: ShareStat) => {
    const links = buildShareLinks(stat);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: stat.ogTitle,
          text: stat.shareText,
          url: links.url,
        });
      } catch {
        // cancelled
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  // ═══════════════════════════════════════
  // STAT PICKER MODAL
  // ═══════════════════════════════════════
  const StatPickerModal = () => (
    <AnimatePresence>
      {showPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-[#0E1B33] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedStat ? 'Share this stat' : 'Choose what to share'}
                </h3>
                <p className="text-xs text-white/40 mt-0.5">
                  {selectedStat
                    ? 'Pick a platform below'
                    : 'Each option creates a unique social post with its own preview image'}
                </p>
              </div>
              <button
                onClick={() => { setShowPicker(false); setSelectedStat(null); }}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-4">
              <AnimatePresence mode="wait">
                {!selectedStat ? (
                  // ── STEP 1: Pick a stat ──
                  <motion.div
                    key="picker"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2"
                  >
                    {shareStats.map((stat) => (
                      <button
                        key={stat.id}
                        onClick={() => handleSelectStat(stat)}
                        className="w-full text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-red-500/30 rounded-2xl p-4 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-16 text-center">
                            <div className="text-2xl font-mono font-bold text-red-400 leading-tight">
                              {stat.number}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-0.5">
                              {stat.label}
                            </div>
                            <div className="text-sm text-white/70 leading-snug">
                              {stat.description}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  // ── STEP 2: Share platforms ──
                  <motion.div
                    key="platforms"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    {/* Back button */}
                    <button
                      onClick={() => setSelectedStat(null)}
                      className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors mb-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                      Choose a different stat
                    </button>

                    {/* Preview card */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                      <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                        Preview
                      </div>
                      <div className="text-3xl font-mono font-bold text-red-400 mb-1">
                        {selectedStat.number}
                      </div>
                      <div className="text-sm text-white/60 mb-3">
                        {selectedStat.description}
                      </div>
                      <div className="text-xs text-white/40 leading-relaxed bg-white/5 rounded-xl p-3 border border-white/5">
                        "{selectedStat.shareText}"
                      </div>
                    </div>

                    {/* Platform buttons */}
                    {(() => {
                      const links = buildShareLinks(selectedStat);
                      return (
                        <div className="space-y-2">
                          <a
                            href={links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 px-5 py-3.5 rounded-xl transition-all"
                          >
                            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                            <span className="text-sm font-medium text-white/80">Share on X (Twitter)</span>
                          </a>

                          <a
                            href={links.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 px-5 py-3.5 rounded-xl transition-all"
                          >
                            <Facebook className="w-5 h-5 text-[#1877F2]" />
                            <span className="text-sm font-medium text-white/80">Share on Facebook</span>
                          </a>

                          <a
                            href={links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 px-5 py-3.5 rounded-xl transition-all"
                          >
                            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                            <span className="text-sm font-medium text-white/80">Share on LinkedIn</span>
                          </a>

                          <a
                            href={links.email}
                            className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-5 py-3.5 rounded-xl transition-all"
                          >
                            <Mail className="w-5 h-5 text-white/60" />
                            <span className="text-sm font-medium text-white/80">Send via Email</span>
                          </a>

                          <button
                            onClick={() => handleCopyLink(links.url)}
                            className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-5 py-3.5 rounded-xl transition-all"
                          >
                            {copied ? (
                              <>
                                <Check className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-medium text-emerald-400">Link copied!</span>
                              </>
                            ) : (
                              <>
                                <Link2 className="w-5 h-5 text-white/60" />
                                <span className="text-sm font-medium text-white/80">Copy Share Link</span>
                              </>
                            )}
                          </button>

                          {hasNativeShare && (
                            <button
                              onClick={() => handleNativeShare(selectedStat)}
                              className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-5 py-3.5 rounded-xl transition-all"
                            >
                              <Share2 className="w-5 h-5 text-white/60" />
                              <span className="text-sm font-medium text-white/80">More options…</span>
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ═══════════════════════════════════════
  // COMPACT VARIANT (used inside PetitionForm)
  // ═══════════════════════════════════════
  if (compact) {
    const randomLinks = buildShareLinks(randomStat);
    return (
      <>
        <div className="mt-4 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="text-[11px] text-white/40 font-mono uppercase tracking-widest mr-1">
              Share
            </span>
            <a
              href={randomLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1DA1F2]/20 border border-white/10 hover:border-[#1DA1F2]/30 flex items-center justify-center transition-all"
              aria-label="Share on X (Twitter)"
            >
              <Twitter className="w-4 h-4 text-white/60" />
            </a>
            <a
              href={randomLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/30 flex items-center justify-center transition-all"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4 text-white/60" />
            </a>
            <a
              href={randomLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/30 flex items-center justify-center transition-all"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-white/60" />
            </a>
            <a
              href={randomLinks.email}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all"
              aria-label="Share via email"
            >
              <Mail className="w-4 h-4 text-white/60" />
            </a>
            <button
              onClick={() => handleCopyLink(randomLinks.url)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all"
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Link2 className="w-4 h-4 text-white/60" />
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleShareClick}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 px-5 py-2.5 rounded-xl text-xs text-white/50 hover:text-red-400 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Or choose a specific stat to share
            </button>
          </div>
        </div>
        <StatPickerModal />
      </>
    );
  }

  // ═══════════════════════════════════════
  // FULL VARIANT
  // ═══════════════════════════════════════
  const randomLinks = buildShareLinks(randomStat);

  return (
    <>
      <div className="mt-6 pt-5 border-t border-white/10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Share2 className="w-4 h-4 text-white/40" />
          <span className="text-xs font-mono text-white/40 uppercase tracking-[3px]">
            Spread the word
          </span>
        </div>

        {/* Main platform buttons with random stat */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          <a
            href={randomLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-white/80">X</span>
          </a>

          <a
            href={randomLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-white/80">Facebook</span>
          </a>

          <a
            href={randomLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-white/80">LinkedIn</span>
          </a>

          <a
            href={randomLinks.email}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <Mail className="w-4 h-4" />
            <span className="text-white/80">Email</span>
          </a>

          <button
            onClick={() => handleCopyLink(randomLinks.url)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                <span className="text-white/80">Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Stat picker CTA below */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShareClick}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Or choose a specific stat to share
          </button>
        </div>
      </div>
      <StatPickerModal />
    </>
  );
}
