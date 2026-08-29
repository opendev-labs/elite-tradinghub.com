import {
  LineChart,
  Search,
  Layers,
  Activity,
  Scale,
  Shield,
  Brain,
  PieChart,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Award,
  Zap,
  Target,
  FileText,
  BarChart2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export interface TopicDetail {
  id: string;
  title: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  formulasOrRules?: string[];
  externalSources: { name: string; url: string; category: string }[];
}

export interface AcademyModule {
  id: string;
  title: string;
  category: string;
  level: string;
  readTime: string;
  iconName: string;
  desc: string;
  heroQuote: string;
  topics: TopicDetail[];
  chartType: 'candlestick' | 'macro' | 'patterns' | 'trends' | 'ev' | 'sizing' | 'psychology' | 'allocation';
  checklist: string[];
  recommendedBooks: { title: string; author: string; note: string }[];
}

export const ACADEMY_MODULES: Record<string, AcademyModule> = {
  'tech-analysis': {
    id: 'tech-analysis',
    title: '1. Technical Analysis & Price Action Mechanics',
    category: 'Chart Analytics',
    level: 'Core Knowledge',
    readTime: '15 min read',
    iconName: 'LineChart',
    desc: 'Master the science of reading raw price action, candlestick geometry, moving average dynamics, momentum indicators, and institutional volume profile.',
    heroQuote: 'Price is the final aggregator of all public information, order flow, and market psychology.',
    chartType: 'candlestick',
    topics: [
      {
        id: 'candlesticks',
        title: 'Candlestick Price Action Dynamics & Reversal Signals',
        summary: 'Understanding real-time buying and selling pressure through single and multi-candle formations.',
        content: `
### Understanding Price Action Mechanics

Candlestick charts originated in 18th century Japan by rice trader Homma Munehisa. In modern quantitative and discretionary trading, a single candlestick represents the battle between buyers (bulls) and sellers (bears) within a specific timeframe.

#### Core Anatomy of a Candlestick:
- **Body**: The range between the Open and Close prices. A green/white body indicates buying aggression (Close > Open), while a red/black body indicates selling pressure (Close < Open).
- **Upper Shadow (Wick)**: Represents the highest price achieved during the session before sellers rejected higher levels.
- **Lower Shadow (Tail)**: Represents the lowest price reached before aggressive buyers entered to push prices back up.

#### High-Probability Reversal Formations:
1. **Pin Bar / Hammer**: Characterized by a long tail (at least 2–3x body length) rejecting a key support level. Indicates institutional absorption of selling flow.
2. **Engulfing Pattern**: A large candle whose body completely overlaps the previous candle's body. Bullish engulfings at structural demand zones suggest an immediate shift in market control.
3. **Morning / Evening Star**: A 3-candle momentum reversal cluster that marks cyclical turning points in index futures (NIFTY / BANK NIFTY).
        `,
        keyTakeaways: [
          'Never trade candle patterns in isolation; always align them with structural Support & Resistance.',
          'Long upper wicks at resistance signify institutional distribution; long lower wicks at support signify accumulation.',
          'Candle body size directly reflects directional conviction and market momentum.',
        ],
        formulasOrRules: [
          'Wick-to-Body Ratio > 2:1 = High Reversal Potential',
          'Close in Top 25% of Candle Range = Bullish Dominance',
        ],
        externalSources: [
          { name: 'Investopedia: Candlestick Patterns', url: 'https://www.investopedia.com/trading/candlestick-charting-what-is-it/', category: 'Education' },
          { name: 'TradingView Charting Manual', url: 'https://www.tradingview.com/support/solutions/43000501980-candlesticks/', category: 'Tools' },
          { name: 'NSE India Market Data', url: 'https://www.nseindia.com/', category: 'Exchange' },
        ],
      },
      {
        id: 'ema-trends',
        title: 'Exponential Moving Averages (EMA 20, 50, 200) for Trend Confirmation',
        summary: 'Utilizing dynamic trend lines to identify market momentum, pullbacks, and regime shifts.',
        content: `
### Exponential vs. Simple Moving Averages

Unlike Simple Moving Averages (SMA) which assign equal weight to all historical price points, Exponential Moving Averages (EMA) assign exponentially higher weight to recent price data. This reduces lag while preserving trend direction.

#### Key EMA Periods in Professional Trading:
- **20 EMA (Short-Term Momentum)**: Acts as dynamic support during strong trending moves on 5-minute, 15-minute, and daily charts.
- **50 EMA (Medium-Term Trend)**: Used by institutional managers to define medium-term trend bias and secondary pullback entries.
- **200 EMA (Macro Bull/Bear Divider)**: The golden benchmark for major market regimes. Price above 200 EMA indicates macro bull market conditions.

#### Golden Cross & Death Cross:
- **Golden Cross**: Occurs when the 50 EMA crosses above the 200 EMA, signaling long-term bullish continuation.
- **Death Cross**: Occurs when the 50 EMA crosses below the 200 EMA, confirming macro bearish environment.
        `,
        keyTakeaways: [
          'Use 20 EMA for trailing stop-losses during fast momentum trends.',
          'Avoid entering long positions when price is trading far extended above the 20 EMA (mean reversion risk).',
          'Confluence between 50 EMA and structural horizontal support creates high-probability trade locations.',
        ],
        formulasOrRules: [
          'Multiplier = 2 / (Time Period + 1)',
          'EMA_today = (Price_today × Multiplier) + (EMA_yesterday × (1 - Multiplier))',
        ],
        externalSources: [
          { name: 'StockCharts Technical Indicators: EMA', url: 'https://school.stockcharts.com/doku.php?id=technical_indicators:moving_averages', category: 'Research' },
          { name: 'Zerodha Varsity: Moving Averages', url: 'https://zerodha.com/varsity/module/technical-analysis/', category: 'Course' },
        ],
      },
      {
        id: 'rsi-divergence',
        title: 'Relative Strength Index (RSI) & Momentum Divergence',
        summary: 'Spotting underlying trend fatigue and upcoming reversals using momentum indicators.',
        content: `
### The Mathematics of RSI

Developed by J. Welles Wilder in 1978, the Relative Strength Index (RSI) measures the velocity and magnitude of directional price movements on a scale from 0 to 100.

#### Standard Thresholds:
- **Overbought (> 70)**: Market may be temporarily overextended; look for reversal triggers.
- **Oversold (< 30)**: Market may be deeply discounted; watch for bullish exhaustion.

#### Regular vs. Hidden Divergence:
1. **Regular Bullish Divergence**: Price makes a Lower Low, but RSI makes a Higher Low. Signals that selling momentum is drying up despite price drop.
2. **Regular Bearish Divergence**: Price makes a Higher High, but RSI makes a Lower High. Signals buying momentum is fading near key resistance.
3. **Hidden Divergence**: Indicates trend continuation after a brief consolidation period.
        `,
        keyTakeaways: [
          'In strong uptrends, RSI often fluctuates between 40 and 80 without dipping below 30.',
          'RSI divergence is one of the most reliable leading indicators for trend exhaustion.',
          'Combine 14-period RSI divergence with candle reversal patterns for optimal execution.',
        ],
        formulasOrRules: [
          'RSI = 100 - (100 / (1 + RS))',
          'RS = Average Gain of N days / Average Loss of N days',
        ],
        externalSources: [
          { name: 'Investopedia: RSI Divergence', url: 'https://www.investopedia.com/terms/d/divergence.asp', category: 'Education' },
          { name: 'TradingView RSI Documentation', url: 'https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/', category: 'Tools' },
        ],
      },
      {
        id: 'volume-profile',
        title: 'Volume Profile & High Volume Nodes (HVN)',
        summary: 'Mapping volume distribution across price levels to identify true institutional support & resistance.',
        content: `
### What is Volume Profile?

Unlike traditional volume indicators that plot total traded volume per unit of *time* at the bottom of a chart, Volume Profile displays volume traded at specific *price levels* horizontally.

#### Critical Volume Profile Concepts:
- **Point of Control (POC)**: The single price level where the highest volume was executed during the selected period. Acts as a magnet for price.
- **Value Area High (VAH) & Value Area Low (VAL)**: The price range containing 68% (one standard deviation) of total volume traded.
- **High Volume Nodes (HVN)**: Areas of high trading activity representing fair value where price consolidates.
- **Low Volume Nodes (LVN)**: Areas of rapid price movement where market passed through quickly due to imbalance.
        `,
        keyTakeaways: [
          'Prices move rapidly through Low Volume Nodes (LVNs) and stall/range near High Volume Nodes (HVNs).',
          'Trading breakouts out of Value Area High or Low produces powerful directional moves.',
          'Institutions accumulate inventory in fair value zones (POC/HVN).',
        ],
        formulasOrRules: [
          'Value Area = 68% of Total Volume executed in period',
          'Buy Strategy: Test of VAL with bullish confirmation target POC/VAH',
        ],
        externalSources: [
          { name: 'CME Group: Volume Profile Guide', url: 'https://www.cmegroup.com/education/courses/introduction-to-order-flow.html', category: 'Research' },
          { name: 'TradingView Volume Profile Manual', url: 'https://www.tradingview.com/support/solutions/43000502035-volume-profile/', category: 'Tools' },
        ],
      },
    ],
    checklist: [
      'Identify overall trend using 200 EMA on daily timeframe.',
      'Mark major horizontal Support & Resistance levels.',
      'Check RSI for divergence or extreme overbought/oversold levels.',
      'Verify Volume Profile Point of Control (POC) for confluence.',
      'Wait for a valid candlestick trigger before placing orders.',
    ],
    recommendedBooks: [
      { title: 'Japanese Candlestick Charting Techniques', author: 'Steve Nison', note: 'The ultimate Bible on candlestick price action.' },
      { title: 'Technical Analysis of the Financial Markets', author: 'John J. Murphy', note: 'Comprehensive reference covering all classical technical analysis tools.' },
    ],
  },

  'fund-analysis': {
    id: 'fund-analysis',
    title: '2. Fundamental Analysis & Economic Drivers',
    category: 'Market Drivers',
    level: 'Market Fundamentals',
    readTime: '18 min read',
    iconName: 'Search',
    desc: 'Evaluate balance sheets, earnings growth, cash flow dynamics, macroeconomic interest rate policies, and institutional FII/DII flow metrics.',
    heroQuote: 'In the short run, the market is a voting machine, but in the long run, it is a weighing machine.',
    chartType: 'macro',
    topics: [
      {
        id: 'financial-statements',
        title: 'Quarterly Financial Statement Analysis & Earnings Quality',
        summary: 'Reading income statements, balance sheets, and cash flow statements to identify high-quality businesses.',
        content: `
### Decoding Corporate Financial Statements

Fundamental analysis examines the financial health and intrinsic value of a company. To evaluate a public company in the Indian stock market (NSE/BSE), investors analyze three primary financial statements:

#### 1. Balance Sheet:
- **Assets = Liabilities + Equity**
- Focus on Debt-to-Equity ratio (ideally < 0.5 for capital-intensive sectors, 0 for debt-free companies).
- Check Return on Equity (ROE > 15%) and Return on Capital Employed (ROCE > 18%).

#### 2. Income Statement (P&L):
- Revenue / Sales growth (Year-over-Year YoY and Quarter-over-Quarter QoQ).
- Operating Profit Margin (OPM %): Higher and stable margins indicate strong pricing power.
- Net Profit after Tax (PAT) & Earnings Per Share (EPS) growth.

#### 3. Cash Flow Statement:
- **Cash Flow from Operations (CFO)**: The true test of earnings quality. If Net Profit rises but CFO is negative, earnings may be distorted by aggressive accounting.
- **Free Cash Flow (FCF)** = Operating Cash Flow - Capital Expenditures (CapEx).
        `,
        keyTakeaways: [
          'Always cross-check Reported Net Profit against Cash Flow from Operations (CFO).',
          'High ROCE (>20%) maintained over 5+ years indicates a strong economic moat.',
          'Monitor promoter holding percentage and pledged shares (pledging > 15% is a red flag).',
        ],
        formulasOrRules: [
          'ROE = Net Income / Shareholder Equity',
          'ROCE = EBIT / (Total Assets - Current Liabilities)',
          'FCF = Cash Flow from Operations - CapEx',
        ],
        externalSources: [
          { name: 'Screener.in Financial Analytics', url: 'https://www.screener.in/', category: 'Data Tools' },
          { name: 'Moneycontrol Financial News', url: 'https://www.moneycontrol.com/', category: 'News' },
          { name: 'NSE Corporate Filing Portal', url: 'https://www.nseindia.com/companies-listing/corporate-filings-announcements', category: 'Exchange' },
        ],
      },
      {
        id: 'macroeconomics',
        title: 'Macroeconomic Indicators: Inflation, GDP, RBI Interest Rates',
        summary: 'How central bank monetary policy and macroeconomic metrics influence broad market regimes.',
        content: `
### Macroeconomic Dynamics & Interest Rates

Stock markets do not trade in a vacuum; they respond aggressively to macroeconomic conditions and Reserve Bank of India (RBI) Monetary Policy Committee (MPC) decisions.

#### Key Macro Indicators:
1. **RBI Repo Rate**: The rate at which RBI lends money to commercial banks. Rate hikes increase borrowing costs, slowing corporate expansion and suppressing P/E multiples. Rate cuts boost liquidity and asset prices.
2. **CPI Inflation**: High inflation forces central banks to raise interest rates, impacting consumer discretionary spending.
3. **GDP Growth Rate**: Indicates country-wide economic productivity and corporate revenue potential.
4. **USD/INR Exchange Rate**: Rupee depreciation impacts import-heavy sectors (Oil & Gas) while benefiting exporters (IT, Pharma).
        `,
        keyTakeaways: [
          'Rising interest rates contract valuation multiples, particularly for high-growth/high-P/E stocks.',
          'Monitor RBI MPC policy announcements and US Federal Reserve rate decisions.',
          'Yield Curve inversion often precedes economic slowdowns and equity bear markets.',
        ],
        formulasOrRules: [
          'Real Interest Rate = Nominal Repo Rate - CPI Inflation Rate',
        ],
        externalSources: [
          { name: 'Reserve Bank of India (RBI) Official Portal', url: 'https://www.rbi.org.in/', category: 'Government' },
          { name: 'TradingEconomics India Data', url: 'https://tradingeconomics.com/india/indicators', category: 'Research' },
        ],
      },
      {
        id: 'fii-dii-flows',
        title: 'Sectoral Rotation & Institutional Capital Flows (FII / DII)',
        summary: 'Tracking foreign and domestic institutional order flow to capitalize on major market trends.',
        content: `
### Institutional Footprints in Indian Markets

Foreign Institutional Investors (FIIs) and Domestic Institutional Investors (DIIs / Mutual Funds) control the vast majority of daily liquidity in Indian equities.

#### Sectoral Rotation Cycle:
- **Early Bull Phase**: High-beta financials, capital goods, and industrials lead.
- **Mid Bull Phase**: Consumer discretionary, auto, metals, and real estate perform strongly.
- **Late Bull / Defensive Phase**: Capital flows into defensive sectors like Pharma, IT, and FMCG to preserve capital.
        `,
        keyTakeaways: [
          'Consistently positive combined FII + DII net buying fuels sustainable index rallies.',
          'Sectoral rotation reveals where smart money is positioning ahead of quarterly earnings.',
          'Track monthly SIP inflows into Indian Mutual Funds to gauge retail liquidity backbone.',
        ],
        formulasOrRules: [
          'Net Institutional Flow = FII Net Buy/Sell + DII Net Buy/Sell',
        ],
        externalSources: [
          { name: 'NSE FII & DII Trading Activity', url: 'https://www.nseindia.com/reports/fii-dii', category: 'Data' },
          { name: 'AMFI India Mutual Fund Statistics', url: 'https://www.amfiindia.com/', category: 'Industry' },
        ],
      },
      {
        id: 'valuation-ratios',
        title: 'Valuation Ratios: P/E, P/B, EV/EBITDA & DCF Basics',
        summary: 'Determining whether a stock is trading at a premium or discount relative to earnings power.',
        content: `
### Measuring Valuation Metrics

Valuation ratios help investors determine if a stock's price accurately reflects its fundamental earnings capacity.

#### Essential Ratios:
1. **Price-to-Earnings (P/E)** = Share Price / Earnings Per Share. Compare with historical 5-year average P/E and sector P/E.
2. **Price-to-Book (P/B)** = Share Price / Book Value Per Share. Crucial for banks and financial institutions.
3. **EV/EBITDA**: Enterprise Value relative to Operating Profit; ideal for debt-heavy industrial companies.
4. **Discounted Cash Flow (DCF)**: Calculates intrinsic value by discounting future projected cash flows to present value using WACC.
        `,
        keyTakeaways: [
          'A low P/E is not automatically a bargain; inspect earnings stability and debt levels (avoid value traps).',
          'Compare valuations relative to sector peers and company historical median ranges.',
          'DCF valuation relies heavily on long-term growth rate assumptions.',
        ],
        formulasOrRules: [
          'P/E Ratio = Market Price per Share / EPS',
          'P/B Ratio = Market Price per Share / Book Value per Share',
        ],
        externalSources: [
          { name: 'Investopedia: Discounted Cash Flow (DCF)', url: 'https://www.investopedia.com/terms/d/dcf.asp', category: 'Education' },
          { name: 'Damodaran Valuation Reference Page', url: 'https://pages.stern.nyu.edu/~adamodar/', category: 'Academic' },
        ],
      },
    ],
    checklist: [
      'Check Debt-to-Equity ratio (< 0.5 preferred).',
      'Verify 3-year YoY Sales & PAT growth > 12%.',
      'Confirm positive Cash Flow from Operations (CFO).',
      'Examine promoter holding & check for pledged shares.',
      'Assess valuation (P/E & P/B) relative to 5-year historical median.',
    ],
    recommendedBooks: [
      { title: 'The Intelligent Investor', author: 'Benjamin Graham', note: 'The classic foundation of value investing and margin of safety.' },
      { title: 'One Up On Wall Street', author: 'Peter Lynch', note: 'Practical guide to discovering multi-bagger growth stocks.' },
    ],
  },

  'chart-patterns': {
    id: 'chart-patterns',
    title: '3. Chart Patterns & Structural Formations',
    category: 'Pattern Recognition',
    level: 'Execution Setup',
    readTime: '14 min read',
    iconName: 'Layers',
    desc: 'Identify structural continuation and reversal geometries across multiple timeframes for high-probability entries.',
    heroQuote: 'Patterns repeat because human nature and group psychology haven’t changed for hundreds of years.',
    chartType: 'patterns',
    topics: [
      {
        id: 'head-and-shoulders',
        title: 'Head and Shoulders & Inverse Head & Shoulders',
        summary: 'Identifying structural distribution and accumulation tops and bottoms.',
        content: `
### Head and Shoulders Geometry

The Head and Shoulders (H&S) pattern is one of the most reliable structural trend reversal patterns in technical analysis.

#### Structural Components:
1. **Left Shoulder**: Peak formed after a strong rally, followed by a pullback.
2. **Head**: A higher peak formed with higher volume, followed by a decline to the neckline.
3. **Right Shoulder**: A lower peak that fails to reach the Head, indicating buying exhaustion.
4. **Neckline**: The horizontal or slightly sloped support line connecting the two low points.

#### Execution Rules:
- **Short Entry**: Triggered on a decisive close below the Neckline with expanding volume.
- **Price Target**: Measure vertical distance from Head peak to Neckline and project downward from breakout point.
        `,
        keyTakeaways: [
          'Volume should diminish on the Right Shoulder, signaling buyer weakness.',
          'Re-tests of the broken Neckline offer secondary low-risk entry points.',
          'Inverse Head & Shoulders at macro support signals major trend bottoms.',
        ],
        formulasOrRules: [
          'Target Price = Breakout Point - (Head High - Neckline Level)',
        ],
        externalSources: [
          { name: 'Bulkowski Pattern Encyclopedia: Head & Shoulders', url: 'thepatternsite.com', category: 'Research' },
          { name: 'TradingView Chart Patterns Library', url: 'https://www.tradingview.com/chart-patterns/', category: 'Tools' },
        ],
      },
      {
        id: 'double-reversals',
        title: 'Double Tops, Double Bottoms & Triple Reversals',
        summary: 'Recognizing classical "M" and "W" price rejections at key structural boundaries.',
        content: `
### Double Tops (M) & Double Bottoms (W)

Double Tops and Bottoms indicate that the market has tested a price level twice and failed to break through, marking a transition in control.

#### Double Top Setup (M Formation):
- Price reaches a peak, pulls back to a support level (neckline), rises to re-test the peak, and fails.
- Confirmed when price closes below the neckline.

#### Double Bottom Setup (W Formation):
- Price drops to a swing low, bounces, drops again to test the low, and holds support.
- Confirmed when price breaks above the swing high neckline.
        `,
        keyTakeaways: [
          'Look for RSI bearish divergence on the second peak of a Double Top.',
          'Volume is typically lower on the second peak/trough test.',
          'Never front-run a pattern before neckline confirmation.',
        ],
        formulasOrRules: [
          'Target = Neckline Breakout +/- Distance between Peak/Trough and Neckline',
        ],
        externalSources: [
          { name: 'Investopedia: Double Top & Double Bottom', url: 'https://www.investopedia.com/terms/d/doubletop.asp', category: 'Education' },
        ],
      },
      {
        id: 'flags-triangles',
        title: 'Bull & Bear Flags, Pennants, and Symmetrical Triangles',
        summary: 'Capitalizing on trend continuation consolidation patterns.',
        content: `
### Flag & Triangle Dynamics

Continuation patterns occur during trend pauses before the market resumes its primary direction.

#### Bull & Bear Flags:
- Consists of a sharp price move (the Flagpole) followed by a tight parallel consolidation channel moving against the main trend.
- Breakout in the direction of the flagpole signals strong trend continuation.

#### Triangles (Symmetrical, Ascending, Descending):
- **Ascending Triangle**: Flat resistance top + higher lows = Bullish bias.
- **Descending Triangle**: Flat support floor + lower highs = Bearish bias.
- **Symmetrical Triangle**: Converging trendlines indicating upcoming volatility expansion.
        `,
        keyTakeaways: [
          'Flags offer the highest risk-to-reward continuation trades in momentum markets.',
          'Volume typically dries up during consolidation and spikes on breakout.',
        ],
        formulasOrRules: [
          'Flag Target = Breakout Level + Length of Flagpole',
        ],
        externalSources: [
          { name: 'StockCharts School: Chart Patterns', url: 'https://school.stockcharts.com/doku.php?id=chart_analysis:chart_patterns', category: 'Education' },
        ],
      },
      {
        id: 'breakout-traps',
        title: 'Breakout Validation vs. False Breakout Traps',
        summary: 'Filtering out false breakouts and fakeouts using volume and close confirmations.',
        content: `
### Avoiding False Breakout Traps

Institutional market makers often push price beyond obvious support/resistance levels to trigger retail stop-loss orders (liquidity sweeps) before reversing price.

#### How to Validate a True Breakout:
1. **Closing Price Confirmation**: Wait for candle body to close beyond the level on the operational timeframe.
2. **Volume Surge**: True breakouts require volume significantly above 20-period average volume.
3. **Retest & Rejection**: High-probability trades enter on the retest of the broken level when it converts from resistance to support.
        `,
        keyTakeaways: [
          'False breakouts usually feature rapid long wicks penetrating levels but closing back inside the range.',
          'Entering on re-tests reduces drawdown risk compared to chasing initial breakout spikes.',
        ],
        formulasOrRules: [
          'True Breakout Condition = Close > Level AND Volume > 1.5 × 20-period Avg Volume',
        ],
        externalSources: [
          { name: 'TradingView False Breakout Guide', url: 'https://www.tradingview.com/ideas/falsebreakout/', category: 'Community' },
        ],
      },
    ],
    checklist: [
      'Identify pattern on higher timeframe first (Daily / 4H).',
      'Confirm clear Neckline or trendline boundaries.',
      'Check volume profile during pattern formation.',
      'Wait for daily/hourly candle close beyond neckline.',
      'Set stop-loss above/below the pattern breakout candle or swing point.',
    ],
    recommendedBooks: [
      { title: 'Encyclopedia of Chart Patterns', author: 'Thomas N. Bulkowski', note: 'Statistical performance metrics for over 50 chart patterns.' },
    ],
  },

  'market-trends': {
    id: 'market-trends',
    title: '4. Market Trends & Structural Regimes',
    category: 'Trend Structure',
    level: 'Regime Filter',
    readTime: '13 min read',
    iconName: 'Activity',
    desc: 'Classify market regimes across timeframes: trending uptrends (HH/HL), downtrends (LH/LL), and sideways range consolidations.',
    heroQuote: 'The trend is your friend until the bend at the end.',
    chartType: 'trends',
    topics: [
      {
        id: 'dow-theory',
        title: 'Dow Theory Principles & Market Structure Breaks (MSB)',
        summary: 'Understanding higher highs, lower lows, and structural trend shifts.',
        content: `
### Foundations of Market Structure

Formulated by Charles Dow, Dow Theory remains the foundational framework for structural technical analysis.

#### Market Structure Classifications:
1. **Uptrend**: Characterized by a sequence of **Higher Highs (HH)** and **Higher Lows (HL)**.
2. **Downtrend**: Characterized by a sequence of **Lower Highs (LH)** and **Lower Lows (LL)**.
3. **Market Structure Break (MSB)**: Occurs when price breaks below the previous higher low in an uptrend, or above the previous lower high in a downtrend, signaling structural trend change.
        `,
        keyTakeaways: [
          'Trade in the direction of the dominant higher timeframe market structure.',
          'An uptrend remains intact until the most recent Higher Low is broken.',
          'MSB combined with volume surge is the earliest signal of major market reversals.',
        ],
        formulasOrRules: [
          'Uptrend Rule = High_N > High_N-1 AND Low_N > Low_N-1',
        ],
        externalSources: [
          { name: 'Investopedia: Dow Theory Basics', url: 'https://www.investopedia.com/terms/d/dowtheory.asp', category: 'Education' },
        ],
      },
      {
        id: 'trendlines-channels',
        title: 'Trendlines, Channels, and Dynamic Support/Resistance',
        summary: 'Drawing geometric trendlines to identify dynamic trend channels and bounds.',
        content: `
### Drawing Valid Trendlines

A valid trendline requires at least **three touch points** on a price chart.

#### Channel Trading:
- Parallel channels connect swing highs and swing lows.
- **Channel Top**: Represents dynamic resistance / profit-taking zone.
- **Channel Bottom**: Represents dynamic support / buy zone.
        `,
        keyTakeaways: [
          'Steep trendlines (> 60 degrees) are fragile and subject to sharp mean-reversions.',
          'Stepping out of a channel often leads to rapid accelerated breakout moves.',
        ],
        formulasOrRules: [
          'Valid Trendline = Minimum 3 distinct price swing touches',
        ],
        externalSources: [
          { name: 'TradingView Trendline Tools', url: 'https://www.tradingview.com/support/solutions/43000520140-trend-line/', category: 'Tools' },
        ],
      },
      {
        id: 'regime-identification',
        title: 'Identifying Market Regimes: Trending vs. Choppy Volatility',
        summary: 'Filtering strategies according to current market regime conditions.',
        content: `
### The 4 Market Regimes

1. **Bull Trend (High Momentum)**: Buy pullbacks using EMAs.
2. **Bear Trend (Aggressive Selling)**: Short rallies at resistance.
3. **High Volatility Range (Expansion)**: Trade boundary rejections; widen stop-losses.
4. **Low Volatility Squeeze (Compression)**: Prepare for imminent breakout expansion.
        `,
        keyTakeaways: [
          'Never use trend-following strategies in a low-volatility sideways range.',
          'Identify regime before picking strategy; regime selection is 70% of edge.',
        ],
        formulasOrRules: [
          'ADX > 25 = Strong Trend Regime; ADX < 20 = Ranging Regime',
        ],
        externalSources: [
          { name: 'Investopedia: Average Directional Index (ADX)', url: 'https://www.investopedia.com/terms/a/adx.asp', category: 'Education' },
        ],
      },
      {
        id: 'nifty-intraday',
        title: 'NIFTY / BANK NIFTY Intraday Trend Alignment',
        summary: 'Aligning multi-index correlation and opening range breakouts (ORB).',
        content: `
### Multi-Index Correlation in Indian Markets

NIFTY 50 and BANK NIFTY represent over 60% of total derivatives turnover on the National Stock Exchange of India.

#### Key Alignment Factors:
- **Index Divergence**: If NIFTY makes new high while BANK NIFTY fails to confirm, exercise caution (divergence signal).
- **Opening Range Breakout (ORB)**: Monitor the high/low of the first 15-minute candle for directional momentum.
        `,
        keyTakeaways: [
          'Always check HDFC Bank, ICICI Bank, Reliance, and Infosys weighting before trading index options.',
          'Never trade against both NIFTY & BANK NIFTY moving in unison.',
        ],
        formulasOrRules: [
          'ORB Rule = Buy above 15-min High / Sell below 15-min Low',
        ],
        externalSources: [
          { name: 'NSE Index Live Weightages', url: 'https://www.nseindia.com/market-data/live-equity-market', category: 'Exchange' },
        ],
      },
    ],
    checklist: [
      'Define weekly, daily, and 15-min trend direction.',
      'Check ADX indicator (>25 for trend, <20 for range).',
      'Verify NIFTY & BANK NIFTY directional alignment.',
      'Identify nearest structural Higher Low or Lower High.',
    ],
    recommendedBooks: [
      { title: 'Trading in the Zone', author: 'Mark Douglas', note: 'Mastering market structure and mindset.' },
    ],
  },

  'risk-reward': {
    id: 'risk-reward',
    title: '5. Risk/Reward Concepts & Expected Value Math',
    category: 'Math & Edge',
    level: 'Quant Edge',
    readTime: '16 min read',
    iconName: 'Scale',
    desc: 'The mathematical foundation of trading: Expected Value (EV), win rates, asymmetric payout ratios, and volatility ATR stop placement.',
    heroQuote: 'It’s not whether you’re right or wrong that’s important, but how much money you make when you’re right and how much you lose when you’re wrong.',
    chartType: 'ev',
    topics: [
      {
        id: 'expected-value',
        title: 'Calculating Expected Value: EV = (Win Rate × Win Size) - (Loss Rate × Loss Size)',
        summary: 'The core mathematical formula determining long-term profitability.',
        content: `
### What is Expected Value (EV)?

Expected Value (EV) is the average amount an investor expects to win or lose per trade over a sample of 100+ trades.

#### The EV Equation:
$$EV = (P_{win} \\times W) - (P_{loss} \\times L)$$

Where:
- $P_{win}$ = Probability of winning trade (Win Rate %)
- $W$ = Average gain size in ₹
- $P_{loss}$ = Probability of losing trade (1 - Win Rate)
- $L$ = Average loss size in ₹

#### EV Example:
Suppose a setup has a **40% Win Rate**, average win of **₹15,000**, and average loss of **₹5,000**:
$$EV = (0.40 \\times 15000) - (0.60 \\times 5000) = 6000 - 3000 = +₹3,000\\text{ per trade}$$

Even though you lose 6 out of 10 trades, you generate **+₹3,000 per trade** on average!
        `,
        keyTakeaways: [
          'A system with positive EV (+EV) is mathematically guaranteed to grow capital over a large sample of trades.',
          'Focus on maximizing average win size rather than chasing unrealistically high win rates.',
        ],
        formulasOrRules: [
          'EV = (Win Rate % × Avg Win) - (Loss Rate % × Avg Loss)',
          'Positive EV Requirement = (Win Rate % × R:R Ratio) > (1 - Win Rate %)',
        ],
        externalSources: [
          { name: 'Investopedia: Expected Value in Trading', url: 'https://www.investopedia.com/terms/e/expected-value.asp', category: 'Education' },
          { name: 'Khan Academy Probability & EV', url: 'https://www.khanacademy.org/math/statistics-probability', category: 'Math' },
        ],
      },
      {
        id: 'rr-ratios',
        title: 'Structuring Trades with Minimum 1:2 or 1:3 R:R Ratio',
        summary: 'Why asymmetric payout ratios create an unshakeable statistical edge.',
        content: `
### The Power of Asymmetric Payoffs

Risk-to-Reward (R:R) ratio compares potential loss (Risk) against potential gain (Reward).

#### Break-Even Win Rate Matrix:
- **1:1 R:R**: Requires > 50.0% Win Rate to break even.
- **1:2 R:R**: Requires > 33.3% Win Rate to break even.
- **1:3 R:R**: Requires > 25.0% Win Rate to break even.
- **1:5 R:R**: Requires > 16.7% Win Rate to break even.

By targeting a minimum **1:2.5 or 1:3 R:R**, you can be wrong 60% of the time and still build significant wealth!
        `,
        keyTakeaways: [
          'Never enter a trade where the risk exceeds potential reward.',
          'Always calculate Risk-to-Reward *before* executing an order.',
        ],
        formulasOrRules: [
          'R:R Ratio = Target Distance in Points / Stop Loss Distance in Points',
          'Break-Even Win Rate = 1 / (1 + R:R Ratio)',
        ],
        externalSources: [
          { name: 'TradingView Risk-Reward Tool', url: 'https://www.tradingview.com/support/solutions/43000520146-risk-reward-ratio/', category: 'Tools' },
        ],
      },
      {
        id: 'winrate-vs-rr',
        title: 'Why 40% Win-Rate with 1:2.5 R:R Outperforms 80% Win-Rate with Poor Risk',
        summary: 'Debunking the high win-rate fallacy.',
        content: `
### The High Win-Rate Trap

Many beginner traders seek 80–90% win rate systems. However, high win-rate strategies often suffer from asymmetric loss profiles—winning 8 small trades of ₹1,000 (+₹8,000) but wiping out everything on 1 unmanaged loss of ₹10,000 (-₹10,000).

#### Institutional Comparison:
- **Trader A**: 80% Win Rate, 1:0.3 R:R → Net Result: -₹2,000 per 10 trades.
- **Trader B**: 40% Win Rate, 1:2.5 R:R → Net Result: +₹4,000 per 10 trades.
        `,
        keyTakeaways: [
          'Professional quants optimize for Positive Expected Value, not Win Rate.',
          'A single unmanaged loss can destroy months of high win-rate gains.',
        ],
        formulasOrRules: [
          'Net Profit = (Wins × Avg Win) - (Losses × Avg Loss)',
        ],
        externalSources: [
          { name: 'Investopedia: Risk Reward Matrix', url: 'https://www.investopedia.com/articles/trading/09/risk-reward-ratio.asp', category: 'Education' },
        ],
      },
      {
        id: 'atr-stops',
        title: 'Stop-Loss Placement based on Volatility (ATR)',
        summary: 'Using Average True Range (ATR) to place stops outside market noise.',
        content: `
### Dynamic Volatility-Based Stops

Placing fixed arbitrary point stops (e.g. fixed 20 points on NIFTY) leads to premature stop-outs during high volatility regimes.

#### Average True Range (ATR) Solution:
- Measure 14-period ATR on your operational timeframe.
- Set Stop-Loss = **Entry - (1.5 × ATR)** for long trades.
- This ensures your stop-loss adapts dynamically to current market noise.
        `,
        keyTakeaways: [
          'Widen stop distances during high VIX / high ATR market regimes.',
          'Never move a stop-loss further away once a trade is live.',
        ],
        formulasOrRules: [
          'ATR Stop Distance = Current ATR(14) × 1.5',
        ],
        externalSources: [
          { name: 'StockCharts ATR Indicator', url: 'https://school.stockcharts.com/doku.php?id=technical_indicators:average_true_range_atr', category: 'Research' },
        ],
      },
    ],
    checklist: [
      'Calculate potential R:R ratio before order entry (minimum 1:2).',
      'Check ATR(14) to size stop-loss distance appropriately.',
      'Log trade parameters into journal to track EV over 50+ trades.',
      'Ensure risk per trade does not exceed account risk budget.',
    ],
    recommendedBooks: [
      { title: 'The Mathematics of Money Management', author: 'Ralph Vince', note: 'Advanced mathematical principles of optimal position sizing and EV.' },
    ],
  },

  'position-sizing': {
    id: 'position-sizing',
    title: '6. Position Sizing & Capital Protection',
    category: 'Capital Safety',
    level: 'Risk Engine',
    readTime: '15 min read',
    iconName: 'Shield',
    desc: 'Protect account equity using fixed risk parameters, fractional Kelly criterion, F&O margin rules, and drawdown preservation algorithms.',
    heroQuote: 'Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.',
    chartType: 'sizing',
    topics: [
      {
        id: 'fixed-risk-rule',
        title: 'The 1% - 2% Fixed Risk Rule per Trade',
        summary: 'Limiting maximum account loss on any single trade to 1% or 2% of total capital.',
        content: `
### The 1% Risk Rule Explained

The 1% Rule mandates that you never risk more than 1% of your total trading equity on a single trade.

#### Step-by-Step Position Sizing Formula:
1. **Account Equity**: ₹10,00,000
2. **Maximum Risk Allowed (1%)**: ₹10,00,000 × 0.01 = **₹10,000**
3. **Trade Entry**: NIFTY at 24,500
4. **Stop-Loss**: NIFTY at 24,450 (Risk = 50 points = ₹2,500 per lot of 50)
5. **Position Quantity**:
$$\\text{Position Size (Lots)} = \\frac{\\text{Max Risk Budget (₹)}}{\\text{Risk Per Lot (₹)}} = \\frac{10,000}{2,500} = 4\\text{ Lots (200 qty)}$$
        `,
        keyTakeaways: [
          'Position sizing is calculated from Stop-Loss distance, NOT arbitrarily.',
          'Relying on fixed 1% risk ensures you can withstand 10 consecutive losses and retain > 90% of equity.',
        ],
        formulasOrRules: [
          'Risk Amount (₹) = Account Capital × Risk %',
          'Position Size (Units) = Risk Amount (₹) / (Entry Price - Stop Loss Price)',
        ],
        externalSources: [
          { name: 'Investopedia: 1% Risk Rule', url: 'https://www.investopedia.com/articles/active-trading/021915/one-percent-rule-day-trading.asp', category: 'Education' },
          { name: 'Zerodha Risk Calculator', url: 'https://zerodha.com/varsity/module/risk-management/', category: 'Tools' },
        ],
      },
      {
        id: 'kelly-criterion',
        title: 'Fractional Kelly Criterion & Volatility-Adjusted Allocation',
        summary: 'Optimal capital growth formula modified for financial markets.',
        content: `
### The Kelly Criterion Formula

Developed by John L. Kelly Jr. in 1956 at Bell Labs, the Kelly Criterion calculates the optimal percentage of capital to allocate to maximize long-term logarithm of wealth.

$$f^* = \\frac{p \\cdot b - q}{b}$$

Where:
- $f^*$ = Fraction of capital to wager
- $p$ = Probability of winning (Win Rate)
- $q$ = Probability of losing ($1 - p$)
- $b$ = Odds received (Reward to Risk ratio)

#### Fractional Kelly (Half Kelly):
Full Kelly can lead to extreme portfolio volatility. Institutional quantitative funds utilize **Half-Kelly (0.5 × f*)** or **Quarter-Kelly (0.25 × f*)** to achieve 75% of maximum growth rate with 50% less drawdown.
        `,
        keyTakeaways: [
          'Never use Full Kelly in live trading due to parameter estimation uncertainty.',
          'Half-Kelly or Quarter-Kelly provides optimal capital growth with smooth equity curves.',
        ],
        formulasOrRules: [
          'Kelly % = Win Rate % - [(1 - Win Rate %) / R:R Ratio]',
          'Half Kelly % = 0.5 × Kelly %',
        ],
        externalSources: [
          { name: 'Wikipedia: Kelly Criterion', url: 'https://en.wikipedia.org/wiki/Kelly_criterion', category: 'Reference' },
        ],
      },
      {
        id: 'fo-margin',
        title: 'Futures & Options Margin Management & Leverage Limits',
        summary: 'Handling SEBI peak margin mandates and option buying vs writing risks.',
        content: `
### SEBI Peak Margin Framework

The Securities and Exchange Board of India (SEBI) enforces strict peak margin requirements across equity derivatives.

#### Margin Sizing Principles:
1. **Option Buying**: Limited risk (premium paid), but time decay (Theta) works against you. Maintain strict capital allocation (< 3-5% of portfolio).
2. **Option Writing / Futures**: Unlimited potential risk. Requires Span + Exposure margin. Always hedge naked short positions with protective wings (spreads).
        `,
        keyTakeaways: [
          'Never utilize 100% of available margin; maintain a 30% cash margin buffer for spike volatility.',
          'Use hedged option strategies (Iron Condors, Spreads) to reduce margin requirements.',
        ],
        formulasOrRules: [
          'Free Margin Buffer = Total Margin Available - Utilized Margin >= 30%',
        ],
        externalSources: [
          { name: 'SEBI Margin Regulations', url: 'https://www.sebi.gov.in/', category: 'Government' },
          { name: 'NSE Margin Calculator', url: 'https://www.nseindia.com/products-services/equity-derivatives-margin-calculator', category: 'Exchange' },
        ],
      },
      {
        id: 'drawdown-reduction',
        title: 'Dynamic Position Reduction during Drawdown Phases',
        summary: 'De-leveraging trading size after consecutive losses to protect capital.',
        content: `
### Defensive De-leveraging Protocol

When experiencing a drawdown streak (e.g. 3 consecutive losses), reduce position size by 50% until equity returns to a new high.

#### Drawdown Ladder Protocol:
- **Peak Capital**: 100% Sizing
- **5% Drawdown**: Reduce position size to 75%
- **10% Drawdown**: Reduce position size to 50%
- **15% Drawdown**: Halt trading; perform mandatory system audit.
        `,
        keyTakeaways: [
          'Cutting position size during drawdowns stops equity curve degradation.',
          'Increase position size only when account equity is at or near new all-time highs.',
        ],
        formulasOrRules: [
          'If Drawdown > 5%, New Risk % = Normal Risk % × 0.5',
        ],
        externalSources: [
          { name: 'Investopedia: Drawdown Management', url: 'https://www.investopedia.com/terms/d/drawdown.asp', category: 'Education' },
        ],
      },
    ],
    checklist: [
      'Calculate exact quantity using 1% risk rule before placing order.',
      'Verify free margin buffer > 30% after margin lock.',
      'If in a 3-loss streak, cut trade size by 50%.',
      'Never double position size to "revenge trade" out of a loss.',
    ],
    recommendedBooks: [
      { title: 'Trade Your Way to Financial Freedom', author: 'Van K. Tharp', note: 'The definitive textbook on position sizing architectures.' },
    ],
  },

  'trading-psychology': {
    id: 'trading-psychology',
    title: '7. Trading Psychology & Discipline',
    category: 'Mindset & Discipline',
    level: 'Behavioral Edge',
    readTime: '14 min read',
    iconName: 'Brain',
    desc: 'Master the mental game of trading: eliminate FOMO, accept market uncertainty, enforce trade journaling, and maintain emotional neutrality.',
    heroQuote: 'The market is a device for transferring money from the impatient to the patient.',
    chartType: 'psychology',
    topics: [
      {
        id: 'accepting-risk',
        title: 'Accepting Risk & Embracing Market Uncertainty',
        summary: 'Shifting mindset from needing to be right to executing statistical edge.',
        content: `
### The Mental Shift to Probabilities

The fundamental struggle in trading stems from treating the market like a traditional job where effort directly guarantees specific output.

#### Core Psychological Axioms (Mark Douglas):
1. Anything can happen in the market at any time.
2. You do not need to know what is going to happen next to make money.
3. There is a random distribution between wins and losses for any given set of variables that define an edge.
4. An edge is nothing more than an indication of a higher probability of one thing happening over another.
        `,
        keyTakeaways: [
          'Pre-define your risk on every trade so you are never surprised by a loss.',
          'A losing trade does not mean you made a mistake if you followed your plan.',
        ],
        formulasOrRules: [
          'Trade Acceptance = Pre-set Stop Loss Order Placed BEFORE Entry',
        ],
        externalSources: [
          { name: 'Investopedia: Trading Psychology', url: 'https://www.investopedia.com/articles/trading/02/012202.asp', category: 'Education' },
        ],
      },
      {
        id: 'fomo-overtrading',
        title: 'Overcoming FOMO (Fear of Missing Out) and Overtrading',
        summary: 'Developing patience and eliminating impulse trades outside your system rules.',
        content: `
### Overcoming Cognitive Biases

FOMO (Fear Of Missing Out) drives traders to chase extended price moves after a breakout has already occurred, resulting in buying at highs and selling at lows.

#### Overtrading Antidotes:
- Set a **Maximum 3 Trades Per Day** rule.
- If you hit 2 consecutive losses in a day, close your terminal and step away.
- Remember: Cash is a valid market position. Sitting on hands preserves capital for high-conviction setups.
        `,
        keyTakeaways: [
          'Chasing a trade already 3 ATRs away from entry leads to negative expected value.',
          'Market opportunities are infinite; your capital is finite.',
        ],
        formulasOrRules: [
          'Max Daily Loss Rule = Stop trading after 2 losses in a single day',
        ],
        externalSources: [
          { name: 'Psychology Today: Overcoming FOMO', url: 'https://www.psychologytoday.com/', category: 'Health' },
        ],
      },
      {
        id: 'emotional-neutrality',
        title: 'Building Emotional Neutrality During Win and Loss Series',
        summary: 'Preventing euphoria after wins and revenge trading after losses.',
        content: `
### Maintaining Emotional Homeostasis

- **Euphoria Trap**: After 5 consecutive wins, traders feel invincible, double their position size, neglect stops, and lose everything on the 6th trade.
- **Revenge Trap**: After a loss, traders feel angry at the market, immediately re-enter out of impulse, and spiral into catastrophic drawdowns.
        `,
        keyTakeaways: [
          'Treat win streaks and loss streaks with equal detachment.',
          'Your trade outcome has zero bearing on your self-worth as a human being.',
        ],
        formulasOrRules: [
          'Cool-Down Period = Take a 15-minute break after any trade exit',
        ],
        externalSources: [
          { name: 'Brett Steenbarger Trader Psychology Blog', url: 'https://traderfeed.blogspot.com/', category: 'Research' },
        ],
      },
      {
        id: 'trading-journal',
        title: 'Maintaining a Structured Trading Journal & Review Ritual',
        summary: 'Using data logging to identify execution mistakes and optimize your edge.',
        content: `
### The Power of Journaling

You cannot improve what you do not measure. A structured trade log converts subjective trading into an objective scientific process.

#### Required Journal Fields:
- Date, Time, Instrument (NIFTY/BANK NIFTY/Equity)
- Setup Type (Breakout, Pullback, Reversal)
- Planned Entry, Planned Stop, Planned Target
- Actual Execution Prices & Slip Page
- Emotion Rating (1-5) and Execution Mistakes
- Screenshot of Chart on Entry and Exit
        `,
        keyTakeaways: [
          'Perform a weekly Sunday review of all journaled trades.',
          'Tag trades as "Flawless Execution" or "Mistake" regardless of P&L.',
        ],
        formulasOrRules: [
          'Execution Rate = (Trades Following 100% Plan / Total Trades) × 100',
        ],
        externalSources: [
          { name: 'Edgewonk Trading Journal Reference', url: 'https://edgewonk.com/', category: 'Tools' },
        ],
      },
    ],
    checklist: [
      'Is stop loss placed before entering?',
      'Am I calm and relaxed, or feeling urgent/anxious?',
      'Does this trade meet 100% of my pre-written trading plan rules?',
      'Have I logged the setup into my trading journal?',
    ],
    recommendedBooks: [
      { title: 'Trading in the Zone', author: 'Mark Douglas', note: 'Essential reading for emotional discipline and probability mindset.' },
      { title: 'The Daily Trading Coach', author: 'Brett N. Steenbarger', note: '101 lessons for becoming your own trading psychologist.' },
    ],
  },

  'portfolio-principles': {
    id: 'portfolio-principles',
    title: '8. Portfolio Management & Asset Allocation',
    category: 'Asset Allocation',
    level: 'Wealth Longevity',
    readTime: '17 min read',
    iconName: 'PieChart',
    desc: 'Build long-term compound wealth using strategic multi-asset allocation, periodic rebalancing, non-correlated assets, and portfolio hedging.',
    heroQuote: 'Diversification is the only free lunch in finance.',
    chartType: 'allocation',
    topics: [
      {
        id: 'asset-allocation',
        title: 'Strategic Asset Allocation Across Equities, Debt, and Cash',
        summary: 'Structuring portfolio weighting to match risk appetite and investment horizon.',
        content: `
### Principles of Asset Allocation

Asset allocation accounts for over 90% of long-term investment return variance according to landmark studies by Brinson, Hood, and Beebower.

#### Benchmark Core-Satellite Structure:
1. **Core Equity (50-60%)**: Large-cap index funds, high-quality compounding growth stocks.
2. **Debt & Fixed Income (20-30%)**: Government bonds, AAA corporate bonds, liquid funds for capital preservation.
3. **Satellite Tactical / Alpha (10-20%)**: Active quantitative setups, momentum trading, options strategies.
4. **Cash Reserve (5-10%)**: Dry powder reserved for major market panics/crashes.
        `,
        keyTakeaways: [
          'Never allocate 100% of capital to short-term trading or single asset classes.',
          'Asset allocation should reflect your age, investment horizon, and downside tolerance.',
        ],
        formulasOrRules: [
          'Equity Allocation Rule (Rough Guide) = 100 - Age (Adjusted for Risk Tolerance)',
        ],
        externalSources: [
          { name: 'Investopedia: Asset Allocation', url: 'https://www.investopedia.com/terms/a/assetallocation.asp', category: 'Education' },
          { name: 'SEBI Investor Education Portal', url: 'https://investor.sebi.gov.in/', category: 'Government' },
        ],
      },
      {
        id: 'portfolio-rebalancing',
        title: 'Periodic Portfolio Rebalancing & Profit Harvesting',
        summary: 'Systematic rules for selling high and buying low across asset classes.',
        content: `
### Rebalancing Mechanics

Over time, outperforming assets grow to represent an oversized percentage of your portfolio, increasing overall risk.

#### Rebalancing Triggers:
- **Calendar Rebalancing**: Conducted annually or semi-annually (e.g. every April 1st).
- **Tolerance Band Rebalancing**: Triggered whenever an asset class deviates by > 5% from target allocation.
        `,
        keyTakeaways: [
          'Rebalancing systematically forces you to sell overvalued assets and buy undervalued assets.',
          'Account for capital gains tax implications during rebalancing.',
        ],
        formulasOrRules: [
          'Rebalance Signal = |Current Allocation % - Target Allocation %| > 5%',
        ],
        externalSources: [
          { name: 'Vanguard Research on Rebalancing', url: 'https://corporate.vanguard.com/content/corporatesite/us/en/corp/research-commentary.html', category: 'Research' },
        ],
      },
      {
        id: 'correlation-analysis',
        title: 'Correlation Analysis to Avoid Over-Exposure to Single Sectors',
        summary: 'Combining non-correlated assets to reduce overall portfolio volatility.',
        content: `
### Understanding Asset Correlation

Correlation ($r$) measures how two assets move in relation to one another on a scale from -1.0 to +1.0.

- **+1.0 (Perfect Positive Correlation)**: Assets move together. Holding 10 banking stocks is NOT true diversification.
- **0.0 (Uncorrelated)**: Asset price movements are independent.
- **-1.0 (Inverse Correlation)**: Assets move in opposite directions (e.g. Gold vs. Risk Assets during crises).
        `,
        keyTakeaways: [
          'True diversification requires combining assets with low or negative correlation.',
          'Spreading money across 15 stocks in the same sector provides zero structural protection.',
        ],
        formulasOrRules: [
          'Portfolio Variance = w1²σ1² + w2²σ2² + 2w1w2σ1σ2ρ1,2',
        ],
        externalSources: [
          { name: 'Investopedia: Correlation Coefficient', url: 'https://www.investopedia.com/terms/c/correlationcoefficient.asp', category: 'Education' },
        ],
      },
      {
        id: 'index-hedging',
        title: 'Hedging Portfolio Equity with Index Options',
        summary: 'Using NIFTY Put options to protect equity portfolios during market panics.',
        content: `
### Portfolio Protection with Protective Puts

During macro downturns or geopolitical crises, liquidating long equity holdings incurs tax friction and missed recovery gains.

#### Protective Put Hedging Strategy:
- Purchase out-of-the-money (OTM) NIFTY Put options covering your equity portfolio beta.
- If market crashes by 15%, the gains on Put options offset portfolio drawdown.
- Limits maximum portfolio loss while leaving upside potential open.
        `,
        keyTakeaways: [
          'Treat index puts as an insurance premium policy for your equity portfolio.',
          'Hedge when market volatility (India VIX) is low and option premiums are cheap.',
        ],
        formulasOrRules: [
          'Hedge Ratio = Portfolio Beta × (Portfolio Value / Index Contract Value)',
        ],
        externalSources: [
          { name: 'NSE Equity Derivatives Hedging Guide', url: 'https://www.nseindia.com/products-services/equity-derivatives-nifty', category: 'Exchange' },
        ],
      },
    ],
    checklist: [
      'Confirm core equity vs debt allocation matches target split.',
      'Check portfolio for concentration risk (> 15% in single stock).',
      'Conduct annual rebalancing audit.',
      'Evaluate hedging needs when India VIX is near historical lows (< 12).',
    ],
    recommendedBooks: [
      { title: 'A Random Walk Down Wall Street', author: 'Burton G. Malkiel', note: 'Timeless principles of asset allocation and indexing.' },
      { title: 'Pioneering Portfolio Management', author: 'David F. Swensen', note: 'Institutional endowment asset management framework.' },
    ],
  },
};
