import { Metadata } from 'next';
import { KnowledgeAcademyPage } from '@/components/knowledge-academy-page';
import { ACADEMY_MODULES } from '@/lib/knowledge-data';

export function generateStaticParams() {
  return Object.keys(ACADEMY_MODULES).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const moduleData = ACADEMY_MODULES[resolvedParams.id];

  if (!moduleData) {
    return {
      title: 'Academy Module | Elite Trading Hub',
      description: 'Free Trading & Investment Education Academy.',
    };
  }

  return {
    title: `${moduleData.title} | Free Academy Knowledge`,
    description: moduleData.desc,
    keywords: [
      moduleData.title,
      moduleData.category,
      'Trading Education',
      'NSE India',
      'NIFTY Trading Academy',
      ...moduleData.topics.map((t) => t.title),
    ],
    alternates: {
      canonical: `https://elite-tradinghub.com/knowledge/${resolvedParams.id}`,
    },
    openGraph: {
      title: `${moduleData.title} | Free Academy Knowledge`,
      description: moduleData.desc,
      url: `https://elite-tradinghub.com/knowledge/${resolvedParams.id}`,
      siteName: 'Elite Trading Hub',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${moduleData.title} | Free Academy Knowledge`,
      description: moduleData.desc,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <KnowledgeAcademyPage moduleId={resolvedParams.id} />;
}
