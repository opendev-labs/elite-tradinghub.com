import { Metadata } from 'next';
import { KnowledgeHubPage } from '@/components/knowledge-hub-page';

export const metadata: Metadata = {
  title: 'Free Knowledge & Trading Education | Elite Trading Hub',
  description: 'Master Technical Analysis, Fundamental Evaluation, Chart Patterns, Market Trends, Risk/Reward Math, Position Sizing, Trading Psychology, and Portfolio Management Principles.',
  keywords: [
    'Free Trading Education',
    'Technical Analysis',
    'Fundamental Analysis',
    'Chart Patterns',
    'Market Trends',
    'Risk Reward Concepts',
    'Position Sizing',
    'Trading Psychology',
    'Portfolio Management Principles',
    'NSE NIFTY Education'
  ],
  alternates: {
    canonical: 'https://elite-tradinghub.com/knowledge',
  },
  openGraph: {
    title: 'Free Knowledge & Trading Education | Elite Trading Hub',
    description: 'Free structured educational curriculum covering Technical Analysis, Chart Patterns, Risk Sizing, and Trading Psychology.',
    url: 'https://elite-tradinghub.com/knowledge',
    siteName: 'Elite Trading Hub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Knowledge & Trading Education | Elite Trading Hub',
    description: 'Free structured educational curriculum covering Technical Analysis, Chart Patterns, Risk Sizing, and Trading Psychology.',
  },
};

export default function Page() {
  return <KnowledgeHubPage />;
}
