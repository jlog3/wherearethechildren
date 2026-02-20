// components/ShareButtons.tsx
'use client';

import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Mail, Link2, Check } from 'lucide-react';

const SITE_URL = 'https://wherearethechildren.net';
const SHARE_TEXT =
  'Where are the children? 69% of missing foster care episodes go unreported. The government\u2019s own auditors confirmed it. Sign the petition demanding public tracking:';
const SHARE_TITLE = 'Where Are The Children?';
const SHARE_DESCRIPTION =
  '69% of missing-from-care episodes go unreported. Sign the petition for the Newborn & Foster Child Accountability Act.';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface ShareButtonsProps {
  compact?: boolean;
}

export default function ShareButtons({ compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(SITE_URL);
  const encodedText = encodeURIComponent(SHARE_TEXT);
  const encodedTitle = encodeURIComponent(SHARE_TITLE);
  const encodedDescription = encodeURIComponent(SHARE_DESCRIPTION);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = SITE_URL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_DESCRIPTION,
          url: SITE_URL,
        });
      } catch {
        // User cancelled or share failed — no action needed
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2 justify-center">
        <span className="text-[11px] text-white/40 font-mono uppercase tracking-widest mr-1">
          Share
        </span>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1DA1F2]/20 border border-white/10 hover:border-[#1DA1F2]/30 flex items-center justify-center transition-all"
          aria-label="Share on X (Twitter)"
        >
          <Twitter className="w-4 h-4 text-white/60" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/30 flex items-center justify-center transition-all"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4 text-white/60" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/30 flex items-center justify-center transition-all"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4 text-white/60" />
        </a>
        <a
          href={shareLinks.email}
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all"
          aria-label="Share via email"
        >
          <Mail className="w-4 h-4 text-white/60" />
        </a>
        <button
          onClick={handleCopyLink}
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
    );
  }

  return (
    <div className="mt-6 pt-5 border-t border-white/10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Share2 className="w-4 h-4 text-white/40" />
        <span className="text-xs font-mono text-white/40 uppercase tracking-[3px]">
          Spread the word
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          <Twitter className="w-4 h-4" />
          <span className="text-white/80">X</span>
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          <Facebook className="w-4 h-4" />
          <span className="text-white/80">Facebook</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-white/80">LinkedIn</span>
        </a>

        <a
          href={shareLinks.email}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          <Mail className="w-4 h-4" />
          <span className="text-white/80">Email</span>
        </a>

        <button
          onClick={handleCopyLink}
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

        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-white/80">More…</span>
          </button>
        )}
      </div>
    </div>
  );
}
