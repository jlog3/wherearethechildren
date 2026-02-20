// app/one-pager/page.tsx
'use client';

import { Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OnePagerPage() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* ── Screen-only toolbar ── */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A1428]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs font-mono hidden sm:block">
              Optimized for US Letter / A4
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── The One-Pager ── */}
      <div className="op-root">
        <div className="op-page">

          {/* RED TOP RULE */}
          <div className="op-top-rule" />

          {/* HEADER */}
          <header className="op-header">
            <div className="op-header-main">
              <div className="op-header-left">
                <h1 className="op-title">WHERE ARE THE CHILDREN?</h1>
                <div className="op-title-rule" />
                <p className="op-subtitle">Legislative briefing on the foster care accountability crisis</p>
              </div>
              <div className="op-header-right">
                <div className="op-act-badge">
                  <div className="op-act-badge-top">PROPOSED LEGISLATION</div>
                  <div className="op-act-badge-name">Newborn &amp; Foster Child<br/>Accountability Act</div>
                </div>
              </div>
            </div>
            <div className="op-source-bar">
              <span className="op-source-dot" />
              All statistics from official federal publications. Full citations &amp; methodology: <strong>wherearethechildren.net/sources</strong>
            </div>
          </header>

          {/* KEY NUMBERS */}
          <section className="op-stats">
            <div className="op-stat">
              <div className="op-stat-num">328,947</div>
              <div className="op-stat-desc">children in foster care</div>
              <div className="op-stat-src">AFCARS FY 2024</div>
            </div>
            <div className="op-stat-divider" />
            <div className="op-stat">
              <div className="op-stat-num">22,097</div>
              <div className="op-stat-desc">infants under age 1</div>
              <div className="op-stat-src">AFCARS FY 2024</div>
            </div>
            <div className="op-stat-divider" />
            <div className="op-stat">
              <div className="op-stat-num">23,160</div>
              <div className="op-stat-desc">missing from care (2024)</div>
              <div className="op-stat-src">NCMEC Annual Report</div>
            </div>
            <div className="op-stat-divider" />
            <div className="op-stat op-stat-alert">
              <div className="op-stat-num">69%</div>
              <div className="op-stat-desc">of episodes unreported</div>
              <div className="op-stat-src">HHS OIG Audit, 2023</div>
            </div>
          </section>

          {/* TWO-COLUMN BODY */}
          <div className="op-body">
            {/* LEFT: THE CRISIS */}
            <section className="op-col op-col-left">
              <h2 className="op-col-title">The Crisis</h2>

              <div className="op-item">
                <span className="op-bullet" />
                <p><strong>69% of missing episodes go unreported.</strong> The HHS OIG audited 74,353 missing-from-care episodes (2018–2020) and found the vast majority were never reported to the federal system. States are ignoring existing mandates.</p>
              </div>

              <div className="op-item">
                <span className="op-bullet" />
                <p><strong>1 in 7 missing foster children are likely trafficking victims.</strong> NCMEC's own assessment. Under-reporting means the true scope remains unknown.</p>
              </div>

              <div className="op-item">
                <span className="op-bullet" />
                <p><strong>No public outcome tracking exists.</strong> AFCARS publishes aggregate counts only. No database follows any child from removal to outcome. The public cannot verify that children exit the system safely.</p>
              </div>

              <div className="op-item">
                <span className="op-bullet" />
                <p><strong>Newborns are uniquely at risk.</strong> ~22,000 infants under 1 enter care annually — many within days of birth via emergency placements with accelerated approvals. They cannot speak, report abuse, or run.</p>
              </div>

              <div className="op-item">
                <span className="op-bullet" />
                <p><strong>Voluntary compliance has failed.</strong> The Preventing Sex Trafficking Act (2014) already requires 24-hour NCMEC reporting. The OIG proved states ignore this with no consequence.</p>
              </div>

              <div className="op-item">
                <span className="op-bullet" />
                <p><strong>Racial disparities are severe and hidden.</strong> Black and AI/AN children are removed at dramatically higher rates. Without public data, these disparities remain invisible and unaddressed.</p>
              </div>
            </section>

            {/* RIGHT: THE SOLUTION */}
            <section className="op-col op-col-right">
              <h2 className="op-col-title">The Solution: Four Reforms</h2>

              <div className="op-reform">
                <div className="op-reform-num">1</div>
                <div>
                  <strong>Mandated public anonymized dashboards.</strong> States publish real-time dashboards tracking every child from removal to outcome — reunification, adoption, guardianship, or aging out. Direct automated feeds from CCWIS systems, no pre-publication state review.
                </div>
              </div>

              <div className="op-reform">
                <div className="op-reform-num">2</div>
                <div>
                  <strong>Automatic real-time NCMEC reporting.</strong> Every missing-from-care episode reported immediately and automatically — not weeks later, not at state discretion. Closes the 69% gap.
                </div>
              </div>

              <div className="op-reform">
                <div className="op-reform-num">3</div>
                <div>
                  <strong>Standardized state performance metrics.</strong> National dashboard comparing all 50 states on removal rates, placement stability, permanency timelines, missing episodes, and in-care maltreatment.
                </div>
              </div>

              <div className="op-reform">
                <div className="op-reform-num">4</div>
                <div>
                  <strong>Title IV-E funding tied to compliance.</strong> States that fail to report or publish dashboards lose a percentage of federal foster care funding. Voluntary compliance has failed — financial consequences are the proven lever.
                </div>
              </div>

              <div className="op-pullquote">
                Privacy should protect children — not shield a failing system.
              </div>
            </section>
          </div>

          {/* ── LEGISLATIVE CONTEXT STRIP ── */}
          <section className="op-legal">
            <h2 className="op-legal-title">Builds on Existing Federal Law &amp; Infrastructure</h2>
            <div className="op-legal-grid">
              <div className="op-legal-item">
                <div className="op-legal-tag">PRECEDENT</div>
                <p><strong>Family First Prevention Services Act</strong> (2018) established that federal funding can be conditioned on state compliance with evidence-based standards. This bill extends that principle to data transparency.</p>
              </div>
              <div className="op-legal-item">
                <div className="op-legal-tag">EXISTING MANDATE</div>
                <p><strong>Preventing Sex Trafficking Act</strong> (2014) already requires states to report missing foster children to NCMEC within 24 hours. The OIG proved non-compliance. This bill adds enforcement.</p>
              </div>
              <div className="op-legal-item">
                <div className="op-legal-tag">INFRASTRUCTURE</div>
                <p><strong>CCWIS modernization rules</strong> already require states to build interoperable data systems with bi-directional exchange. Real-time public dashboards are a natural extension — not new infrastructure.</p>
              </div>
              <div className="op-legal-item">
                <div className="op-legal-tag">STATE MODELS</div>
                <p><strong>CA, WI, MN, NJ</strong> already publish near-real-time child welfare dashboards. The 2026 federal CFSR Data Profile Dashboard proves the model works at scale. This bill makes it mandatory and uniform.</p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="op-footer">
            <div className="op-footer-l">
              <strong>wherearethechildren.net</strong>&ensp;·&ensp;Full briefing packet &amp; data analyses available on request
            </div>
            <div className="op-footer-r">
              Sources: AFCARS FY2024&ensp;·&ensp;HHS OIG 2023&ensp;·&ensp;NCMEC 2024&ensp;·&ensp;NCANDS&ensp;·&ensp;CDC NVSS
            </div>
          </footer>
        </div>
      </div>

      {/* ── Screen-only bottom CTA ── */}
      <div className="print:hidden bg-[#0A1428] border-t border-white/5 py-16 text-center">
        <p className="text-white/60 mb-6 text-sm">
          Print this page or save as PDF to email to your representative.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-8 py-4 rounded-2xl font-bold text-white transition-all active:scale-95"
          >
            <Printer className="w-5 h-5" />
            Print / Save as PDF
          </button>
          <Link
            href="/action"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl font-bold text-white transition-all"
          >
            Take Action →
          </Link>
        </div>
      </div>

      <style jsx global>{`
        /* ══════════════════════════════════════════
           BASE / SCREEN
           ══════════════════════════════════════════ */
        .op-root {
          background: #0A1428;
          min-height: 100vh;
          padding: 80px 20px 40px;
          display: flex;
          justify-content: center;
        }

        .op-page {
          width: 100%;
          max-width: 816px;           /* ~ 8.5in at 96dpi */
          background: #fff;
          color: #1a1a1a;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.55);
          display: flex;
          flex-direction: column;
        }

        /* ── Top red rule ── */
        .op-top-rule {
          height: 4px;
          background: linear-gradient(90deg, #b91c1c 0%, #dc2626 40%, #b91c1c 100%);
        }

        /* ── Header ── */
        .op-header {
          padding: 16px 28px 0;
        }

        .op-header-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .op-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #111;
          margin: 0;
          line-height: 1.1;
        }

        .op-title-rule {
          width: 48px;
          height: 3px;
          background: #b91c1c;
          margin: 6px 0 5px;
          border-radius: 2px;
        }

        .op-subtitle {
          font-family: 'Georgia', serif;
          font-size: 10.5px;
          color: #666;
          margin: 0;
          font-style: italic;
        }

        .op-act-badge {
          border: 1.5px solid #b91c1c;
          border-radius: 6px;
          padding: 6px 12px;
          text-align: center;
          flex-shrink: 0;
        }

        .op-act-badge-top {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 6.5px;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #b91c1c;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .op-act-badge-name {
          font-family: 'Georgia', serif;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.35;
          color: #111;
        }

        .op-source-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          background: #f7f7f8;
          border: 1px solid #e8e8ec;
          border-radius: 4px;
          padding: 5px 12px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 8px;
          color: #666;
          letter-spacing: 0.1px;
        }

        .op-source-bar strong {
          color: #111;
        }

        .op-source-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #16a34a;
          flex-shrink: 0;
        }

        /* ── Stats row ── */
        .op-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 28px;
          gap: 0;
          border-bottom: 1.5px solid #ddd;
        }

        .op-stat {
          flex: 1;
          text-align: center;
          padding: 4px 6px;
        }

        .op-stat-divider {
          width: 1px;
          height: 36px;
          background: #ddd;
          flex-shrink: 0;
        }

        .op-stat-num {
          font-family: system-ui, -apple-system, 'Helvetica Neue', sans-serif;
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          color: #111;
          letter-spacing: -0.5px;
        }

        .op-stat-alert .op-stat-num {
          color: #b91c1c;
        }

        .op-stat-desc {
          font-family: system-ui, sans-serif;
          font-size: 7.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: #555;
          margin-top: 2px;
        }

        .op-stat-src {
          font-family: system-ui, sans-serif;
          font-size: 6.5px;
          color: #aaa;
          margin-top: 2px;
        }

        /* ── Two-column body ── */
        .op-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          flex: 1;
        }

        .op-col {
          padding: 12px 20px 10px;
        }

        .op-col-left {
          border-right: 1px solid #e5e5ea;
        }

        .op-col-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 10.5px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #b91c1c;
          margin: 0 0 8px;
          padding-bottom: 4px;
          border-bottom: 1.5px solid #b91c1c;
        }

        /* Fact items */
        .op-item {
          display: flex;
          gap: 6px;
          margin-bottom: 6px;
        }

        .op-bullet {
          flex-shrink: 0;
          width: 4px;
          height: 4px;
          margin-top: 4px;
          border-radius: 50%;
          background: #b91c1c;
        }

        .op-item p {
          font-family: 'Georgia', serif;
          font-size: 9px;
          line-height: 1.42;
          color: #333;
          margin: 0;
        }

        .op-item strong {
          color: #111;
        }

        /* Reform items */
        .op-reform {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .op-reform-num {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #b91c1c;
          color: #fff;
          font-family: system-ui, sans-serif;
          font-size: 9px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        .op-reform > div {
          font-family: 'Georgia', serif;
          font-size: 9px;
          line-height: 1.42;
          color: #333;
        }

        .op-reform strong {
          color: #111;
        }

        .op-pullquote {
          margin-top: 10px;
          padding: 7px 10px;
          border-left: 2.5px solid #b91c1c;
          font-family: 'Georgia', serif;
          font-style: italic;
          font-size: 9.5px;
          color: #444;
          line-height: 1.4;
          background: #fdf2f2;
          border-radius: 0 4px 4px 0;
        }

        /* ── Legislative context strip ── */
        .op-legal {
          background: #f8f8fa;
          border-top: 1.5px solid #ddd;
          padding: 10px 20px 11px;
        }

        .op-legal-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #333;
          margin: 0 0 7px;
        }

        .op-legal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .op-legal-item {
          font-family: 'Georgia', serif;
          font-size: 8px;
          line-height: 1.38;
          color: #444;
        }

        .op-legal-item strong {
          color: #111;
        }

        .op-legal-tag {
          font-family: system-ui, sans-serif;
          font-size: 6px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #b91c1c;
          margin-bottom: 2px;
        }

        /* ── Footer ── */
        .op-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 20px;
          background: #1a1a1a;
          color: #999;
          font-family: system-ui, sans-serif;
          font-size: 7px;
        }

        .op-footer-l strong {
          color: #fff;
          font-size: 7.5px;
        }

        .op-footer-r {
          color: #777;
        }

        /* ══════════════════════════════════════════
           PRINT
           ══════════════════════════════════════════ */
        @media print {
          @page {
            size: letter;
            margin: 0.3in 0.4in;
          }

          html, body {
            background: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .op-root {
            background: #fff !important;
            padding: 0 !important;
            min-height: auto !important;
          }

          .op-page {
            max-width: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          /* Force color printing for key elements */
          .op-top-rule { background: linear-gradient(90deg, #b91c1c, #dc2626, #b91c1c) !important; }
          .op-title-rule { background: #b91c1c !important; }
          .op-stat-alert .op-stat-num { color: #b91c1c !important; }
          .op-source-bar { background: #f7f7f8 !important; border-color: #e8e8ec !important; }
          .op-source-dot { background: #16a34a !important; }
          .op-col-title { color: #b91c1c !important; border-bottom-color: #b91c1c !important; }
          .op-bullet { background: #b91c1c !important; }
          .op-reform-num { background: #b91c1c !important; color: #fff !important; }
          .op-pullquote { background: #fdf2f2 !important; border-left-color: #b91c1c !important; }
          .op-legal { background: #f8f8fa !important; }
          .op-legal-tag { color: #b91c1c !important; }
          .op-act-badge { border-color: #b91c1c !important; }
          .op-act-badge-top { color: #b91c1c !important; }
          .op-footer { background: #1a1a1a !important; color: #999 !important; }
          .op-footer-l strong { color: #fff !important; }
        }

        /* ══════════════════════════════════════════
           RESPONSIVE (screen only — print ignores)
           ══════════════════════════════════════════ */
        @media screen and (max-width: 640px) {
          .op-stats { flex-wrap: wrap; }
          .op-stat-divider { display: none; }
          .op-stat { min-width: 45%; }
          .op-body { grid-template-columns: 1fr; }
          .op-col-left { border-right: none; border-bottom: 1px solid #e5e5ea; }
          .op-header-main { flex-direction: column; }
          .op-legal-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .op-footer { flex-direction: column; gap: 3px; text-align: center; }
        }
      `}</style>
    </>
  );
}
