// app/share/[stat]/page.tsx
import { Metadata } from 'next';
import { shareStats, getStatById, SITE_URL } from '@/lib/shareStats';
import ShareRedirect from './ShareRedirect';

// Generate static params for all stat variants
export function generateStaticParams() {
  return shareStats.map((stat) => ({ stat: stat.id }));
}

// Dynamic OG metadata per stat — this is what crawlers read
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stat: string }>;
}): Promise<Metadata> {
  const { stat: statId } = await params;
  const stat = getStatById(statId);

  return {
    title: stat.ogTitle,
    description: stat.ogDescription,
    openGraph: {
      title: stat.ogTitle,
      description: stat.ogDescription,
      url: `${SITE_URL}/share/${stat.id}`,
      siteName: 'Where Are The Children?',
      images: [
        {
          url: stat.ogImage,
          width: 1200,
          height: 630,
          alt: stat.ogTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: stat.ogTitle,
      description: stat.ogDescription,
      images: [stat.ogImage],
    },
  };
}

// Render a real page so crawlers can read the <head> meta tags
// Then redirect human visitors client-side
export default async function SharePage({
  params,
}: {
  params: Promise<{ stat: string }>;
}) {
  const { stat: statId } = await params;
  const stat = getStatById(statId);

  return (
    <div className="min-h-screen bg-[#0A1428] text-white flex items-center justify-center">
      {/* Client component handles the redirect for real browsers */}
      <ShareRedirect />

      {/* Visible briefly before redirect + serves as fallback */}
      <div className="text-center px-6">
        <h1 className="text-3xl font-bold mb-4">{stat.ogTitle}</h1>
        <p className="text-white/60 mb-8">{stat.ogDescription}</p>
        <a
          href="/#sign"
          className="inline-block bg-red-600 hover:bg-red-500 px-8 py-4 rounded-2xl font-bold transition-all"
        >
          Sign the Petition →
        </a>
      </div>
    </div>
  );
}
