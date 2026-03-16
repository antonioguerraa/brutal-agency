"use client";

import { useState, useEffect, useCallback } from "react";

interface EmailEntry {
  day: number;
  subject: string;
  body: string;
  status: "pending" | "sent" | "failed";
  sentAt: string | null;
}

interface Sender {
  id: string;
  name: string;
  email: string;
}

interface Campaign {
  id: string;
  company: string;
  sector: string;
  location: string;
  email: string;
  phone: string;
  web: string;
  notes: string;
  sender: string;
  replied?: boolean;
  repliedAt?: string;
  replySnippet?: string;
  emails: EmailEntry[];
}

interface OutreachData {
  campaigns: Campaign[];
  config: { senders: Sender[]; replyTo: string };
}

const statusStyles: Record<string, { bg: string; label: string }> = {
  pending: { bg: "var(--cta)", label: "PENDIENTE" },
  sent: { bg: "var(--secondary)", label: "ENVIADO" },
  failed: { bg: "var(--primary)", label: "ERROR" },
};

export default function OutreachPage() {
  const [data, setData] = useState<OutreachData | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewEmail, setPreviewEmail] = useState<{ campaign: Campaign; index: number } | null>(null);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/outreach");
    const json = await res.json();
    setData(json);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!data) {
    return (
      <div className="creative-agency min-h-screen bg-white flex items-center justify-center">
        <div className="w-3 h-3 bg-[var(--primary)] animate-pulse" />
      </div>
    );
  }

  const totalEmails = data.campaigns.reduce((sum, c) => sum + c.emails.length, 0);
  const sentEmails = data.campaigns.reduce((sum, c) => sum + c.emails.filter(e => e.status === "sent").length, 0);
  const companiesWithEmail = data.campaigns.filter(c => c.email).length;

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
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Outreach Dashboard
            </span>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-28 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            OUTREACH <span className="highlight-red">TRACKER</span>
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="brutal-border p-4 text-center">
              <div className="text-3xl font-bold">{data.campaigns.length}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Empresas</div>
            </div>
            <div className="brutal-border p-4 text-center bg-[var(--cta)]">
              <div className="text-3xl font-bold">{companiesWithEmail}</div>
              <div className="text-xs font-bold uppercase tracking-wider">Con email</div>
            </div>
            <div className="brutal-border p-4 text-center" style={{ background: "var(--secondary)", color: "white" }}>
              <div className="text-3xl font-bold">{sentEmails}/{totalEmails}</div>
              <div className="text-xs font-bold uppercase tracking-wider">Enviados</div>
            </div>
          </div>

        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto space-y-4">
          {data.campaigns.map((campaign) => {
            const isExpanded = expandedId === campaign.id;
            const sentCount = campaign.emails.filter(e => e.status === "sent").length;
            const total = campaign.emails.length;

            return (
              <div key={campaign.id} className="brutal-border brutal-shadow">
                {/* Company header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : campaign.id)}
                  className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className="w-10 h-10 brutal-border flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        background: campaign.replied ? "#22c55e" : sentCount === total && total > 0 ? "var(--secondary)" : sentCount > 0 ? "var(--cta)" : "white",
                        color: campaign.replied || (sentCount === total && total > 0) ? "white" : "black",
                      }}
                    >
                      {campaign.replied ? "✓" : `${sentCount}/${total}`}
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {campaign.company}
                        {campaign.replied && <span className="ml-2 text-xs font-bold text-green-600 uppercase">Respondió</span>}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] flex gap-2 flex-wrap">
                        <span>{campaign.sector}</span>
                        <span>·</span>
                        <span>{campaign.location}</span>
                        <span>·</span>
                        <span className="font-bold">{data.config.senders?.find(s => s.id === campaign.sender)?.name || "—"}</span>
                        {!campaign.email && <span className="text-[var(--primary)] font-bold">· SIN EMAIL</span>}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                  >
                    <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t-[3px] border-black p-5">
                    {/* Company info */}
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      {campaign.email && (
                        <span className="brutal-border px-3 py-1 bg-white font-bold">{campaign.email}</span>
                      )}
                      {campaign.phone && (
                        <span className="brutal-border px-3 py-1 bg-white">{campaign.phone}</span>
                      )}
                      {campaign.web && (
                        <a href={`https://${campaign.web}`} target="_blank" rel="noopener noreferrer" className="brutal-border px-3 py-1 bg-white hover:bg-[var(--cta)] transition-colors">
                          {campaign.web}
                        </a>
                      )}
                    </div>

                    {campaign.replied && campaign.replySnippet && (
                      <div className="brutal-border bg-green-50 p-4 mb-4" style={{ borderLeftWidth: "4px", borderLeftColor: "#22c55e" }}>
                        <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">
                          Respuesta {campaign.repliedAt && `· ${new Date(campaign.repliedAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}`}
                        </div>
                        <p className="text-sm text-green-900">{campaign.replySnippet}</p>
                      </div>
                    )}

                    {campaign.notes && (
                      <p className="text-sm text-[var(--text-muted)] mb-4 italic">{campaign.notes}</p>
                    )}

                    {/* Emails */}
                    <div className="space-y-3">
                      {campaign.emails.map((email, idx) => (
                          <div
                            key={idx}
                            className="brutal-border p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => setPreviewEmail({ campaign, index: idx })}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-[var(--text-muted)]">DÍA {email.day}</span>
                              {email.status === "sent" && (
                                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                  ✓ {email.sentAt && new Date(email.sentAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                                </span>
                              )}
                              <div className="flex-1 font-bold text-sm">{email.subject}</div>
                            </div>
                          </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* EMAIL PREVIEW MODAL */}
      {previewEmail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60" onClick={() => setPreviewEmail(null)}>
          <div
            className="bg-white brutal-border brutal-shadow p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  De: {data?.config.senders?.find(s => s.id === previewEmail.campaign.sender)?.name} · Para: {previewEmail.campaign.email || "Sin email"}
                </div>
                <h3 className="text-xl font-bold">{previewEmail.campaign.emails[previewEmail.index].subject}</h3>
              </div>
              <button onClick={() => setPreviewEmail(null)} className="text-2xl font-bold cursor-pointer hover:text-[var(--primary)]">×</button>
            </div>
            <pre className="whitespace-pre-wrap font-[Manrope,sans-serif] text-sm leading-relaxed text-[var(--text-muted)]">
              {previewEmail.campaign.emails[previewEmail.index].body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
