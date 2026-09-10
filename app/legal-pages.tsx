import { LegalPage } from '@/components/site-shell'

export function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL / TERMS" title="Terms & Conditions">
      <h2>1. General Information</h2>
      <p>
        Elite Trading Hub provides quantitative market analysis, algorithmic models, educational material, and software tools intended to support independent market research. By accessing or using this website, you agree to comply with and be bound by these Terms & Conditions.
      </p>
      <h2>2. No Investment Advice or SEBI Registration</h2>
      <p>
        Nothing on this platform constitutes financial, investment, legal, or tax advice, nor does it constitute an offer, solicitation, or recommendation to buy or sell any securities, derivatives, or financial instruments. Elite Trading Hub is not registered with SEBI (Securities and Exchange Board of India) as an Investment Adviser or Research Analyst. Users are solely responsible for their independent trading and financial decisions.
      </p>
      <h2>3. Access and Platform Use</h2>
      <p>
        You agree to use this platform only for lawful purposes. You may not reproduce, redistribute, reverse engineer, scrape, or commercially exploit any content, charts, or algorithms without prior written authorization from Elite Trading Hub.
      </p>
      <h2>4. Intellectual Property</h2>
      <p>
        All proprietary analysis frameworks, algorithms, UI components, branding, logos, and research documentation are the intellectual property of Elite Trading Hub.
      </p>
      <h2>5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Elite Trading Hub and its operators shall not be liable for any direct, indirect, incidental, or consequential loss or damages resulting from trading losses, market volatility, execution delays, system outages, or data inaccuracies.
      </p>
      <h2>6. Contact & Support</h2>
      <p>
        For inquiries regarding these Terms & Conditions or platform operations, please contact support@elite-tradinghub.com or reach out via our official communication channels.
      </p>
    </LegalPage>
  )
}

export function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL / PRIVACY" title="Privacy Policy">
      <h2>1. Information We Collect</h2>
      <p>
        We collect information necessary to deliver and protect our platform services, including your name, email address, profile picture (via authenticated Google Sign-In), and interaction data. We may also collect technical device logs and aggregated usage analytics.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>
        Your information is utilized solely to personalize your portal experience, provide customer support, ensure account security, and improve analytical features. We do not sell, rent, or trade your personal data to third-party advertisers.
      </p>
      <h2>3. Data Retention and Security</h2>
      <p>
        We employ industry-standard encryption protocols and secure database architectures to safeguard your personal information. Session data is stored securely and retained only as long as necessary to fulfill account service objectives.
      </p>
      <h2>4. User Rights and Controls</h2>
      <p>
        You have the right to request access to, correction of, or permanent deletion of your stored user profile data at any time by contacting our support team.
      </p>
      <h2>5. Inquiries & Data Governance</h2>
      <p>
        For privacy-related questions or data deletion requests, please contact our governance desk at support@elite-tradinghub.com. Platform operations are governed in accordance with applicable laws of India.
      </p>
    </LegalPage>
  )
}

export function DisclaimerPage() {
  return (
    <LegalPage eyebrow="LEGAL / RISK" title="Risk Disclosure & Statutory Disclaimer">
      <h2>Important Regulatory Disclosure</h2>
      <p>
        <strong>Elite Trading Hub is NOT registered with SEBI (Securities and Exchange Board of India) as an Investment Adviser or Research Analyst.</strong> All information, charts, setups, models, and educational content provided through this website are intended strictly for educational, informational, and research purposes.
      </p>
      <h2>Market Risk & Leverage</h2>
      <p>
        Trading in equities, futures, and especially options carries substantial risk of capital loss and may not be suitable for all investors. Derivatives trading involves high leverage, which can magnify both profits and catastrophic losses. Never risk capital that you cannot afford to lose completely.
      </p>
      <h2>85–95% Historical Accuracy Disclaimer</h2>
      <p>
        Where historical accuracy figures (such as 85–95%) are cited, they reflect observed historical or backtested performance under specific market conditions and predefined rule parameters. <strong>Past performance or backtested results are not a guarantee of future accuracy, profits, or returns.</strong>
      </p>
      <p>
        Actual market outcomes vary significantly due to factors including, but not limited to: market volatility, execution timing, slippage, liquidity constraints, brokerages and statutory taxes, sudden geopolitical or macroeconomic news events, and individual emotional trading decisions.
      </p>
      <h2>No Guaranteed Returns</h2>
      <p>
        There is no guaranteed-profit system or strategy in financial markets. Nothing on this website should ever be construed as a promise of fixed returns or assured gains.
      </p>
      <h2>Independent Decision Making</h2>
      <p>
        You are solely responsible for conducting your own research and evaluation before taking any market position. Users are encouraged to practice strict risk management (predefined stop-loss levels and disciplined position sizing) and, where appropriate, consult a SEBI-registered professional before making investment decisions.
      </p>
    </LegalPage>
  )
}
