// lib/shareStats.ts

export interface ShareStat {
  id: string;
  label: string;
  number: string;
  description: string;
  shareText: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  color: string; // tailwind accent color
}

export const SITE_URL = 'https://wherearethechildren.net';

export const shareStats: ShareStat[] = [
  {
    id: 'default',
    label: 'The headline',
    number: '22K+',
    description: '22,000 newborns removed. Then the record goes dark.',
    shareText:
      'Where are the children? The U.S. removes 22,000 newborns from their families every year — then loses track of them. The government\'s own auditors confirmed it.',
    ogImage: `${SITE_URL}/og/og-default.jpg`,
    ogTitle: 'Where Are The Children?',
    ogDescription:
      'The system removes 22,000 newborns every year. Then it loses track of them. Sign the petition for the Newborn & Foster Child Accountability Act.',
    color: 'red',
  },
  {
    id: '69-percent',
    label: 'The cover-up',
    number: '69%',
    description: 'of missing-from-care episodes were never properly reported.',
    shareText:
      '69% of missing-from-care episodes in foster care were never properly reported to the national system. 74,353 episodes audited. 51,303 invisible. This is from the government\'s own audit.',
    ogImage: `${SITE_URL}/og/og-69-percent.jpg`,
    ogTitle: '69% Never Reported — Where Are The Children?',
    ogDescription:
      '74,353 missing episodes audited by federal inspectors. 69% were never properly reported. The government\'s own data.',
    color: 'red',
  },
  {
    id: '22k-newborns',
    label: 'The newborns',
    number: '22,000',
    description: 'infants removed and placed in foster care each year.',
    shareText:
      '22,000 newborns and infants are removed from their families and placed in foster care every year. No public database tracks what happens to them after. The public record goes dark.',
    ogImage: `${SITE_URL}/og/og-22k-newborns.jpg`,
    ogTitle: '22,000 Newborns Removed Every Year — Where Are The Children?',
    ogDescription:
      '22,000 infants placed in foster care each year. No public database tracks what happens next. Demand transparency.',
    color: 'orange',
  },
  {
    id: 'trafficking',
    label: 'The trafficking link',
    number: '1 in 7',
    description: 'missing foster children is a likely trafficking victim.',
    shareText:
      '1 in 7 children reported missing from foster care is assessed as a likely sex trafficking victim. 23,160 children went missing from care in 2024. And 69% of episodes are never even reported.',
    ogImage: `${SITE_URL}/og/og-trafficking.jpg`,
    ogTitle: '1 in 7 — Where Are The Children?',
    ogDescription:
      '1 in 7 missing foster children is a likely sex trafficking victim. 23,160 reported missing in 2024. Demand accountability.',
    color: 'rose',
  },
  {
    id: '23k-missing',
    label: 'The missing',
    number: '23,160',
    description: 'children reported missing from foster care in 2024.',
    shareText:
      '23,160 children were reported missing from foster care in 2024 — children the government was supposed to protect. Most were never even reported to the national system.',
    ogImage: `${SITE_URL}/og/og-23k-missing.jpg`,
    ogTitle: '23,160 Missing — Where Are The Children?',
    ogDescription:
      '23,160 children reported missing from care in 2024. These are children the government was supposed to protect.',
    color: 'amber',
  },
  {
    id: 'blackbox',
    label: 'The black box',
    number: '???',
    description: 'No public database tracks children after removal.',
    shareText:
      'No public database in the U.S. tracks what happens to children after the state removes them from their families. We know when they are taken. We are forbidden from knowing what happens next.',
    ogImage: `${SITE_URL}/og/og-blackbox.jpg`,
    ogTitle: 'The Black Box — Where Are The Children?',
    ogDescription:
      'No public database tracks children after state removal. We are forbidden from knowing what happens next. Demand the data.',
    color: 'purple',
  },
];

export function getStatById(id: string): ShareStat {
  return shareStats.find((s) => s.id === id) || shareStats[0];
}

export function buildShareLinks(stat: ShareStat) {
  const shareUrl = `${SITE_URL}/share/${stat.id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(stat.shareText);
  const encodedTitle = encodeURIComponent(stat.ogTitle);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
    url: shareUrl,
  };
}
