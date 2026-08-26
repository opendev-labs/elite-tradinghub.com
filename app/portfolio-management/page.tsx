import { Metadata } from 'next';
import { PortfolioManagementPage } from '@/components/portfolio-management-page';

export const metadata: Metadata = {
  title: 'Portfolio Management Service | Elite Trading Hub',
  description: 'Customized portfolio management, market research & analysis, risk management, and transparent performance reporting aligned with SEBI framework standards.',
  keywords: [
    'Portfolio Management Service',
    'PMS India',
    'SEBI Portfolio Manager Framework',
    'Risk Management',
    'Market Research',
    'Portfolio Monitoring',
    'Transparent Reporting',
    'Elite Trading Hub'
  ],
  alternates: {
    canonical: 'https://elite-tradinghub.com/portfolio-management',
  },
  openGraph: {
    title: 'Portfolio Management Service | Elite Trading Hub',
    description: 'Customized investment approach, technical research, disciplined risk parameters, and transparent reporting.',
    url: 'https://elite-tradinghub.com/portfolio-management',
    siteName: 'Elite Trading Hub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Management Service | Elite Trading Hub',
    description: 'Customized investment approach, technical research, disciplined risk parameters, and transparent reporting.',
  },
};

export default function Page() {
  return <PortfolioManagementPage />;
}
