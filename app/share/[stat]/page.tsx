// app/share/[stat]/page.tsx
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { shareStats, getStatById, SITE_URL } from '@/lib/shareStats';

// Generate static params for all stat variants
export function generateStaticParams() {
  return shareStats.map((stat) => ({ stat: stat.id }));
}

// Dynamic OG metadata per stat
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

// The page itself just redirects to the homepage petition
export default async function SharePage({
  params,
}: {
  params: Promise<{ stat: string }>;
}) {
  // When a human visits this URL (not a crawler), redirect to the homepage
  redirect('/#sign');
}
