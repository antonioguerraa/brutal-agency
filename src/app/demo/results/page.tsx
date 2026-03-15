"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface InsightBlock {
  title: string;
  icon: string;
  insight: string;
  severity: "critico" | "mejorable" | "correcto";
  quickWin: string;
}

interface ContentIdea {
  pillar: string;
  pillarColor: string;
  format: string;
  hook: string;
  description: string;
  platform: string;
}

interface FunnelStage {
  stage: string;
  stageNumber: string;
  color: string;
  objective: string;
  audience: string;
  creativeTypes: string[];
  exampleAd: string;
}

interface AnalysisResults {
  brandName: string;
  logoUrl?: string;
  tab1: {
    messaging: InsightBlock;
    seo: InsightBlock;
    aeo: InsightBlock;
    presence: InsightBlock;
  };
  tab2: {
    philosophy: string;
    cadence: string;
    ideas: ContentIdea[];
  };
  tab3: {
    overview: string;
    stages: FunnelStage[];
    keyInsight: string;
  };
}

type TabId = "seo" | "content" | "ads";

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("seo");
  const [revealedIdeas, setRevealedIdeas] = useState(4);
  const [isRevealing, setIsRevealing] = useState(false);
  const [typingIdeas, setTypingIdeas] = useState<number[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("demo-results");
    const storedUrl = sessionStorage.getItem("demo-url");
    if (!stored) {
      router.push("/demo");
      return;
    }
    setResults(JSON.parse(stored));
    setUrl(storedUrl || "");
  }, [router]);

  const handleRevealMore = useCallback(() => {
    if (!results || isRevealing) return;
    setIsRevealing(true);

    const totalIdeas = results.tab2.ideas.length;
    const newIdeas: number[] = [];

    for (let i = revealedIdeas; i < totalIdeas; i++) {
      newIdeas.push(i);
    }

    // Stagger reveal each idea
    newIdeas.forEach((ideaIndex, i) => {
      setTimeout(() => {
        setTypingIdeas((prev) => [...prev, ideaIndex]);
        setRevealedIdeas((prev) => prev + 1);

        // Remove from typing after animation
        setTimeout(() => {
          setTypingIdeas((prev) => prev.filter((idx) => idx !== ideaIndex));
        }, 600);

        if (i === newIdeas.length - 1) {
          setTimeout(() => setIsRevealing(false), 600);
        }
      }, i * 400);
    });
  }, [results, isRevealing, revealedIdeas]);

  const handleDownloadPdf = useCallback(async () => {
    if (!results || !email.trim()) return;
    setIsGeneratingPdf(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { ReportPDF } = await import("./ReportPDF");
      const React = (await import("react")).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(React.createElement(ReportPDF, { results, url }) as any).toBlob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `BRUTAL-Informe-${results.brandName.replace(/\s+/g, "-")}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
      setShowEmailModal(false);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error al generar el PDF. Inténtalo de nuevo.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [results, url, email]);

  if (!results) {
    return (
      <div className="creative-agency min-h-screen bg-white flex items-center justify-center">
        <div className="w-3 h-3 bg-[var(--primary)] animate-pulse" />
      </div>
    );
  }

  const tabs: { id: TabId; label: string; color: string }[] = [
    { id: "seo", label: "Web & SEO/AEO", color: "var(--primary)" },
    { id: "content", label: "Contenido", color: "var(--secondary)" },
    { id: "ads", label: "Meta Ads", color: "var(--cta)" },
  ];

  return (
    <div className="creative-agency min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: "3px solid black" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="cursor-pointer">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                BRUTAL<span className="highlight-red">.</span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/demo" className="hidden sm:block text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">
                Nuevo análisis
              </a>
              <a href="/#contact" className="btn-brutal text-sm py-2 px-4">Háblanos</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-28 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block brutal-border brutal-shadow px-4 py-2 mb-6 bg-[var(--cta)]">
            <span className="text-sm font-bold uppercase tracking-wider">Análisis Completo</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
            RESULTADOS PARA <span className="highlight-red">{results.brandName.toUpperCase()}</span>
          </h1>
          <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-6">{url}</p>
          <button
            onClick={() => setShowEmailModal(true)}
            className="btn-brutal text-sm py-3 px-6 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            DESCARGAR INFORME PDF
          </button>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-20 z-40 bg-white px-6" style={{ borderBottom: "3px solid black" }}>
        <div className="max-w-4xl mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-4 text-center text-sm font-bold uppercase tracking-wider transition-all cursor-pointer relative"
              style={{
                background: activeTab === tab.id ? tab.color : "transparent",
                color: activeTab === tab.id ? (tab.id === "ads" ? "var(--text)" : "white") : "var(--text)",
                borderLeft: "3px solid black",
                borderRight: tab.id === "ads" ? "3px solid black" : "none",
                borderTop: "3px solid black",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="px-6 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {activeTab === "seo" && <Tab1SEO blocks={results.tab1} />}
          {activeTab === "content" && (
            <Tab2Content
              data={results.tab2}
              revealedIdeas={revealedIdeas}
              typingIdeas={typingIdeas}
              isRevealing={isRevealing}
              onRevealMore={handleRevealMore}
            />
          )}
          {activeTab === "ads" && <Tab3Ads data={results.tab3} />}
        </div>
      </div>

      {/* CTA FOOTER */}
      <section className="px-6 py-12 sm:py-16 bg-[var(--text)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            ESTO ES SOLO EL <span className="highlight-red">PRINCIPIO</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
            Esto es una muestra de lo que haríamos con tu marca. ¿Quieres ver el plan completo?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowEmailModal(true)}
              className="btn-brutal inline-flex items-center justify-center bg-white text-black"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              DESCARGAR PDF
            </button>
            <a href="/#contact" className="btn-brutal inline-flex items-center justify-center">
              HÁBLANOS
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* EMAIL MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60" onClick={() => setShowEmailModal(false)}>
          <div
            className="bg-white brutal-border brutal-shadow p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold">DESCARGAR INFORME</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Introduce tu email para recibir el PDF
                </p>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-2xl font-bold hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full brutal-border p-3 text-base font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && email.trim()) handleDownloadPdf();
                  }}
                  autoFocus
                />
              </div>

              <button
                onClick={handleDownloadPdf}
                disabled={!email.trim() || isGeneratingPdf}
                className="btn-brutal w-full py-3 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingPdf ? (
                  <>
                    <span className="inline-block w-4 h-4 brutal-border animate-spin" style={{ borderTopColor: "var(--primary)" }} />
                    GENERANDO PDF...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="square" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    DESCARGAR PDF
                  </>
                )}
              </button>

              <p className="text-xs text-center text-[var(--text-muted)]">
                Al descargar aceptas recibir comunicaciones de BRUTAL.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== TAB 1: SEO/AEO ===================== */

const severityConfig = {
  critico: { label: "CRÍTICO", bg: "var(--primary)", color: "white" },
  mejorable: { label: "MEJORABLE", bg: "var(--cta)", color: "var(--text)" },
  correcto: { label: "CORRECTO", bg: "var(--secondary)", color: "white" },
};

function Tab1SEO({ blocks }: { blocks: AnalysisResults["tab1"] }) {
  const blockList: (InsightBlock & { accent: string })[] = [
    { ...blocks.messaging, accent: "var(--primary)" },
    { ...blocks.seo, accent: "var(--secondary)" },
    { ...blocks.aeo, accent: "var(--cta)" },
    { ...blocks.presence, accent: "var(--primary)" },
  ];

  return (
    <div className="space-y-6">
      {blockList.map((block, i) => {
        const sev = severityConfig[block.severity] || severityConfig.mejorable;
        return (
          <div key={i} className="brutal-border brutal-shadow p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-3">
              <div
                className="w-12 h-12 brutal-border flex items-center justify-center text-2xl shrink-0"
                style={{ background: block.accent, color: block.accent === "var(--cta)" ? "var(--text)" : "white" }}
              >
                {block.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">{block.title}</h3>
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1"
                    style={{ background: sev.bg, color: sev.color }}
                  >
                    {sev.label}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-base leading-relaxed mb-3">{block.insight}</p>
            <div className="brutal-border bg-[var(--cta)] px-4 py-3 inline-block">
              <p className="text-sm font-bold">{block.quickWin}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ===================== TAB 2: CONTENT ===================== */

function Tab2Content({
  data,
  revealedIdeas,
  typingIdeas,
  isRevealing,
  onRevealMore,
}: {
  data: AnalysisResults["tab2"];
  revealedIdeas: number;
  typingIdeas: number[];
  isRevealing: boolean;
  onRevealMore: () => void;
}) {
  const hasMore = revealedIdeas < data.ideas.length;

  return (
    <div>
      {/* Philosophy header */}
      <div className="brutal-border bg-[var(--text)] text-white p-6 mb-8">
        <p className="text-lg font-bold italic">&ldquo;{data.philosophy}&rdquo;</p>
        <p className="text-white/60 text-sm mt-2 font-bold uppercase tracking-wider">{data.cadence}</p>
      </div>

      {/* Content ideas */}
      <div className="space-y-4">
        {data.ideas.slice(0, revealedIdeas).map((idea, i) => (
          <div
            key={i}
            className={`brutal-border p-5 sm:p-6 transition-all ${typingIdeas.includes(i) ? "animate-slide-in" : ""}`}
            style={{ borderLeftWidth: "6px", borderLeftColor: idea.pillarColor }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-xs font-bold uppercase tracking-wider px-2 py-1"
                style={{ background: idea.pillarColor, color: idea.pillarColor === "var(--cta)" ? "var(--text)" : "white" }}
              >
                {idea.pillar}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] brutal-border px-2 py-1">
                {idea.format}
              </span>
              <span className="text-xs text-[var(--text-muted)] ml-auto">{idea.platform}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold mb-1">{idea.hook}</h4>
            <p className="text-sm text-[var(--text-muted)]">{idea.description}</p>
          </div>
        ))}
      </div>

      {/* Generate more button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onRevealMore}
            disabled={isRevealing}
            className="btn-brutal disabled:opacity-50"
          >
            {isRevealing ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 brutal-border animate-spin" style={{ borderTopColor: "var(--primary)" }} />
                GENERANDO...
              </span>
            ) : (
              <>
                GENERAR MÁS IDEAS
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="square" d="M12 4v16m8-8H4" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* ===================== TAB 3: ADS ===================== */

function Tab3Ads({ data }: { data: AnalysisResults["tab3"] }) {
  return (
    <div>
      {/* Overview */}
      <div className="brutal-border bg-[var(--text)] text-white p-6 mb-8">
        <p className="text-lg">{data.overview}</p>
      </div>

      {/* Funnel stages */}
      <div className="space-y-0">
        {data.stages.map((stage, i) => (
          <div key={i}>
            <div className="brutal-border p-6 sm:p-8" style={{ borderBottom: i < data.stages.length - 1 ? "none" : undefined }}>
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 brutal-border flex items-center justify-center text-xl font-bold shrink-0"
                  style={{ background: stage.color, color: stage.color === "var(--cta)" ? "var(--text)" : "white" }}
                >
                  {stage.stageNumber}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold">{stage.stage}</h3>
                  <p className="text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider">{stage.objective}</p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)] mb-4">
                <span className="font-bold text-[var(--text)]">Audiencia:</span> {stage.audience}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {stage.creativeTypes.map((ct, j) => (
                  <span key={j} className="brutal-border px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white">
                    {ct}
                  </span>
                ))}
              </div>

              <div className="brutal-border bg-gray-50 p-4">
                <p className="text-sm">
                  <span className="font-bold">Ejemplo de anuncio →</span>{" "}
                  <span className="text-[var(--text-muted)]">{stage.exampleAd}</span>
                </p>
              </div>
            </div>

            {/* Connector arrow */}
            {i < data.stages.length - 1 && (
              <div className="flex justify-center -my-1 relative z-10">
                <div className="w-10 h-10 bg-white brutal-border flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="square" d="M12 4v16m-4-4l4 4 4-4" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="mt-8 brutal-border brutal-shadow bg-[var(--cta)] p-6">
        <p className="font-bold text-lg">{data.keyInsight}</p>
      </div>
    </div>
  );
}
