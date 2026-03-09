"use client";

import { useState, useEffect, useCallback } from "react";

const steps = [
  { text: "Leyendo contenido y mensajes", color: "var(--primary)" },
  { text: "Analizando SEO y estructura", color: "var(--secondary)" },
  { text: "Evaluando visibilidad en IA", color: "var(--cta)" },
  { text: "Generando estrategia de contenido", color: "var(--primary)" },
  { text: "Diseñando embudo de anuncios", color: "var(--secondary)" },
];

export default function TestAnimation() {
  const [running, setRunning] = useState(false);

  return (
    <div className="creative-agency min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: "3px solid black" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a href="/demo" className="cursor-pointer">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                BRUTAL<span className="highlight-red">.</span>
              </span>
            </a>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">Test Animation</span>
          </div>
        </div>
      </nav>

      {running ? (
        <AnalysisAnimation onComplete={() => setRunning(false)} />
      ) : (
        <section className="pt-20 min-h-screen flex flex-col items-center justify-center px-6">
          <button onClick={() => setRunning(true)} className="btn-brutal text-lg px-12 py-6">
            LANZAR ANIMACIÓN
            <svg className="w-6 h-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </section>
      )}
    </div>
  );
}

function AnalysisAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"intro" | "steps" | "outro">("intro");
  const [activeStep, setActiveStep] = useState(-1);
  const [typedChars, setTypedChars] = useState(0);
  const [stepComplete, setStepComplete] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [outroReady, setOutroReady] = useState(false);

  // Intro phase
  useEffect(() => {
    if (phase === "intro") {
      const timer = setTimeout(() => {
        setPhase("steps");
        setActiveStep(0);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Typing effect for each step
  useEffect(() => {
    if (phase !== "steps" || activeStep < 0 || activeStep >= steps.length) return;

    const currentText = steps[activeStep].text;
    setTypedChars(0);
    setStepComplete(false);

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedChars(charIndex);
      if (charIndex >= currentText.length) {
        clearInterval(typeInterval);
        setStepComplete(true);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [phase, activeStep]);

  // Progress bar
  useEffect(() => {
    if (phase !== "steps") return;
    const progress = activeStep >= 0 ? ((activeStep + (stepComplete ? 1 : 0.5)) / steps.length) * 100 : 0;
    setProgressWidth(progress);
  }, [phase, activeStep, stepComplete]);

  // Advance to next step after typing complete
  useEffect(() => {
    if (!stepComplete || phase !== "steps") return;

    const timer = setTimeout(() => {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        setPhase("outro");
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [stepComplete, activeStep, phase]);

  // Outro
  useEffect(() => {
    if (phase === "outro") {
      const t1 = setTimeout(() => setOutroReady(true), 400);
      const t2 = setTimeout(() => onComplete(), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, black 0px, black 3px, transparent 3px, transparent 60px),
                            repeating-linear-gradient(90deg, black 0px, black 3px, transparent 3px, transparent 60px)`,
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 brutal-border bg-[var(--primary)] animate-corner-tl" />
      <div className="absolute top-8 right-8 w-16 h-16 brutal-border bg-[var(--secondary)] animate-corner-tr" />
      <div className="absolute bottom-8 left-8 w-16 h-16 brutal-border bg-[var(--cta)] animate-corner-bl" />
      <div className="absolute bottom-8 right-8 w-16 h-16 brutal-border bg-[var(--primary)] animate-corner-br" />

      {/* Intro */}
      {phase === "intro" && (
        <div className="text-center animate-intro">
          <div className="text-6xl md:text-8xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
            BRUTAL<span className="highlight-red">.</span>
          </div>
        </div>
      )}

      {/* Steps */}
      {phase === "steps" && (
        <div className="w-full max-w-2xl px-8">
          {/* Step counter */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 brutal-border flex items-center justify-center text-lg font-bold transition-colors duration-300"
                style={{ background: steps[activeStep]?.color, color: steps[activeStep]?.color === "var(--cta)" ? "black" : "white" }}
              >
                {String(activeStep + 1).padStart(2, "0")}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                de {String(steps.length).padStart(2, "0")}
              </span>
            </div>
            <div className="text-2xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
              BRUTAL<span className="highlight-red">.</span>
            </div>
          </div>

          {/* Main text area */}
          <div className="min-h-[120px] mb-10">
            <h2
              className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {steps[activeStep]?.text.slice(0, typedChars)}
              <span
                className="inline-block w-[3px] h-[0.9em] ml-1 align-middle"
                style={{
                  background: steps[activeStep]?.color,
                  animation: stepComplete ? "none" : "blink-cursor 0.6s step-end infinite",
                }}
              />
            </h2>
          </div>

          {/* Progress bar */}
          <div className="brutal-border h-4 bg-white overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{ width: `${progressWidth}%`, background: steps[activeStep]?.color }}
            />
          </div>

          {/* Completed steps trail */}
          <div className="mt-8 space-y-2">
            {steps.slice(0, activeStep).map((step, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-in">
                <div className="w-2 h-2" style={{ background: step.color }} />
                <span className="text-sm text-[var(--text-muted)] line-through">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outro */}
      {phase === "outro" && (
        <div className={`text-center transition-all duration-500 ${outroReady ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="inline-block brutal-border brutal-shadow px-8 py-6 bg-[var(--cta)] mb-6">
            <div className="text-xl md:text-2xl font-bold uppercase tracking-wider">Análisis completo</div>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <div className="w-4 h-4 brutal-border bg-[var(--primary)] animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-4 h-4 brutal-border bg-[var(--secondary)] animate-bounce" style={{ animationDelay: "100ms" }} />
            <div className="w-4 h-4 brutal-border bg-[var(--cta)] animate-bounce" style={{ animationDelay: "200ms" }} />
          </div>
        </div>
      )}
    </div>
  );
}
