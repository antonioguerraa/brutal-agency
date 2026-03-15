"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Syne",
  fonts: [
    { src: "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_3fvj6k.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_24vj6k.ttf", fontWeight: 800 },
  ],
});

Font.register({
  family: "Manrope",
  fonts: [
    { src: "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf", fontWeight: 700 },
  ],
});

const RED = "#FF0000";
const BLUE = "#0000FF";
const YELLOW = "#FFFF00";
const BLACK = "#000000";

const s = StyleSheet.create({
  page: { padding: 50, fontFamily: "Manrope", fontSize: 10, color: BLACK },
  // Cover
  coverPage: { padding: 50, fontFamily: "Syne", backgroundColor: BLACK, color: "white", justifyContent: "space-between" },
  coverLogos: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  coverLogo: { width: 60, height: 60, objectFit: "contain" },
  coverBrand: { fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: "white" },
  coverAsterisk: { fontFamily: "Syne", fontSize: 40, fontWeight: 800, color: "white" },
  coverTitle: { fontFamily: "Syne", fontSize: 42, fontWeight: 800, color: "white", marginBottom: 8 },
  coverSubtitle: { fontFamily: "Manrope", fontSize: 14, color: "rgba(255,255,255,0.6)" },
  coverUrl: { fontFamily: "Manrope", fontSize: 11, color: "rgba(255,255,255,0.4)" },
  coverFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  coverSquares: { flexDirection: "row", gap: 6 },
  coverSquare: { width: 20, height: 20, borderWidth: 1.5, borderColor: "white" },
  // Section headers
  sectionHeader: { fontFamily: "Syne", fontSize: 22, fontWeight: 800, marginBottom: 16, paddingBottom: 8, borderBottomWidth: 3, borderBottomColor: BLACK },
  sectionSubheader: { fontFamily: "Syne", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, color: "rgba(0,0,0,0.5)" },
  // Insight block
  insightCard: { marginBottom: 14, padding: 14, borderWidth: 2, borderColor: BLACK },
  insightHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  insightIcon: { width: 28, height: 28, borderWidth: 2, borderColor: BLACK, justifyContent: "center", alignItems: "center" },
  insightIconText: { fontSize: 14 },
  insightTitle: { fontFamily: "Syne", fontSize: 14, fontWeight: 700, flex: 1 },
  severityBadge: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  insightText: { fontSize: 9, color: "#555", lineHeight: 1.5, marginBottom: 8 },
  quickWin: { backgroundColor: YELLOW, padding: 8, borderWidth: 2, borderColor: BLACK },
  quickWinText: { fontSize: 8, fontWeight: 700 },
  // Content ideas
  ideaCard: { marginBottom: 8, padding: 10, borderWidth: 2, borderColor: BLACK, borderLeftWidth: 4 },
  ideaHeader: { flexDirection: "row", gap: 6, marginBottom: 4, alignItems: "center" },
  ideaPillar: { paddingHorizontal: 5, paddingVertical: 2, fontSize: 7, fontWeight: 700, color: "white", textTransform: "uppercase" },
  ideaFormat: { paddingHorizontal: 5, paddingVertical: 2, fontSize: 7, fontWeight: 700, borderWidth: 1, borderColor: BLACK },
  ideaPlatform: { fontSize: 7, color: "#999", marginLeft: "auto" },
  ideaHook: { fontFamily: "Syne", fontSize: 10, fontWeight: 700, marginBottom: 2 },
  ideaDesc: { fontSize: 8, color: "#666", lineHeight: 1.4 },
  // Funnel
  stageCard: { marginBottom: 10, padding: 12, borderWidth: 2, borderColor: BLACK },
  stageHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
  stageNumber: { width: 32, height: 32, borderWidth: 2, borderColor: BLACK, justifyContent: "center", alignItems: "center" },
  stageNumText: { fontFamily: "Syne", fontSize: 12, fontWeight: 800, color: "white" },
  stageName: { fontFamily: "Syne", fontSize: 14, fontWeight: 700 },
  stageObjective: { fontSize: 8, color: "#666", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 3 },
  stageAudience: { fontSize: 9, color: "#555", marginBottom: 6 },
  stageTypes: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 6 },
  stageType: { paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: BLACK, fontSize: 7, fontWeight: 700, textTransform: "uppercase" },
  stageExample: { backgroundColor: "#F5F5F5", padding: 8, borderWidth: 1, borderColor: "#DDD" },
  stageExText: { fontSize: 8, color: "#555" },
  stageExBold: { fontSize: 8, fontWeight: 700 },
  // Key insight
  keyInsight: { backgroundColor: YELLOW, padding: 14, borderWidth: 2, borderColor: BLACK, marginTop: 10 },
  keyInsightText: { fontFamily: "Syne", fontSize: 11, fontWeight: 700 },
  // Philosophy
  philoBox: { backgroundColor: BLACK, color: "white", padding: 14, marginBottom: 14 },
  philoText: { fontFamily: "Syne", fontSize: 12, fontWeight: 700, color: "white" },
  philoCadence: { fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 6 },
  // Page footer
  pageFooter: { position: "absolute", bottom: 30, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerText: { fontSize: 8, color: "#999" },
  footerAsterisk: { fontFamily: "Syne", fontSize: 16, fontWeight: 800 },
  // CTA page
  ctaPage: { padding: 50, fontFamily: "Syne", backgroundColor: BLACK, color: "white", justifyContent: "center", alignItems: "center" },
  ctaTitle: { fontFamily: "Syne", fontSize: 36, fontWeight: 800, color: "white", textAlign: "center", marginBottom: 12 },
  ctaHighlight: { color: RED },
  ctaSub: { fontFamily: "Manrope", fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: 30 },
  ctaButton: { backgroundColor: RED, paddingHorizontal: 30, paddingVertical: 14, borderWidth: 2, borderColor: "white" },
  ctaButtonText: { fontFamily: "Syne", fontSize: 14, fontWeight: 800, color: "white" },
});

const severityConfig: Record<string, { label: string; bg: string; color: string }> = {
  critico: { label: "CRITICO", bg: RED, color: "white" },
  mejorable: { label: "MEJORABLE", bg: YELLOW, color: BLACK },
  correcto: { label: "CORRECTO", bg: BLUE, color: "white" },
};

const colorMap: Record<string, string> = {
  "var(--primary)": RED,
  "var(--secondary)": BLUE,
  "var(--cta)": YELLOW,
};

const resolveColor = (c: string) => colorMap[c] || c;

interface ReportPDFProps {
  results: {
    brandName: string;
    logoUrl?: string;
    tab1: {
      messaging: { title: string; icon: string; insight: string; severity: string; quickWin: string };
      seo: { title: string; icon: string; insight: string; severity: string; quickWin: string };
      aeo: { title: string; icon: string; insight: string; severity: string; quickWin: string };
      presence: { title: string; icon: string; insight: string; severity: string; quickWin: string };
    };
    tab2: {
      philosophy: string;
      cadence: string;
      ideas: {
        pillar: string;
        pillarColor: string;
        format: string;
        hook: string;
        description: string;
        platform: string;
      }[];
    };
    tab3: {
      overview: string;
      stages: {
        stage: string;
        stageNumber: string;
        color: string;
        objective: string;
        audience: string;
        creativeTypes: string[];
        exampleAd: string;
      }[];
      keyInsight: string;
    };
  };
  url: string;
}

const PageFooter = () => (
  <View style={s.pageFooter} fixed>
    <Text style={s.footerText}>brutalmk.com</Text>
    <Text style={s.footerAsterisk}>*</Text>
  </View>
);

export const ReportPDF: React.FC<ReportPDFProps> = ({ results, url }) => {
  const blocks = [
    { ...results.tab1.messaging, accent: RED },
    { ...results.tab1.seo, accent: BLUE },
    { ...results.tab1.aeo, accent: YELLOW },
    { ...results.tab1.presence, accent: RED },
  ];

  return (
    <Document>
      {/* ── COVER PAGE ── */}
      <Page size="A4" style={s.coverPage}>
        <View style={s.coverLogos}>
          <Text style={s.coverAsterisk}>*</Text>
          {results.logoUrl && (
            <Image src={results.logoUrl} style={s.coverLogo} />
          )}
        </View>

        <View>
          <Text style={s.coverTitle}>
            INFORME{"\n"}DIGITAL
          </Text>
          <Text style={s.coverSubtitle}>
            Análisis completo para {results.brandName}
          </Text>
          <Text style={s.coverUrl}>{url}</Text>
        </View>

        <View style={s.coverFooter}>
          <Text style={{ fontFamily: "Manrope", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
            Preparado por BRUTAL. — brutalmk.com
          </Text>
          <View style={s.coverSquares}>
            <View style={[s.coverSquare, { backgroundColor: RED }]} />
            <View style={[s.coverSquare, { backgroundColor: BLUE }]} />
            <View style={[s.coverSquare, { backgroundColor: YELLOW }]} />
          </View>
        </View>
      </Page>

      {/* ── TAB 1: SEO / AEO ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionSubheader}>Sección 01</Text>
        <Text style={s.sectionHeader}>Web & SEO/AEO</Text>

        {blocks.map((block, i) => {
          const sev = severityConfig[block.severity] || severityConfig.mejorable;
          return (
            <View key={i} style={s.insightCard} wrap={false}>
              <View style={s.insightHeader}>
                <View style={[s.insightIcon, { backgroundColor: block.accent }]}>
                  <Text style={[s.insightIconText, { color: block.accent === YELLOW ? BLACK : "white" }]}>
                    {block.icon}
                  </Text>
                </View>
                <Text style={s.insightTitle}>{block.title}</Text>
                <View style={[s.severityBadge, { backgroundColor: sev.bg }]}>
                  <Text style={{ fontSize: 7, fontWeight: 700, color: sev.color }}>{sev.label}</Text>
                </View>
              </View>
              <Text style={s.insightText}>{block.insight}</Text>
              <View style={s.quickWin}>
                <Text style={s.quickWinText}>{block.quickWin}</Text>
              </View>
            </View>
          );
        })}
        <PageFooter />
      </Page>

      {/* ── TAB 2: CONTENT ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionSubheader}>Sección 02</Text>
        <Text style={s.sectionHeader}>Estrategia de Contenido</Text>

        <View style={s.philoBox}>
          <Text style={s.philoText}>&ldquo;{results.tab2.philosophy}&rdquo;</Text>
          <Text style={s.philoCadence}>{results.tab2.cadence}</Text>
        </View>

        {results.tab2.ideas.map((idea, i) => {
          const pillarBg = resolveColor(idea.pillarColor);
          return (
            <View key={i} style={[s.ideaCard, { borderLeftColor: pillarBg }]} wrap={false}>
              <View style={s.ideaHeader}>
                <View style={[s.ideaPillar, { backgroundColor: pillarBg }]}>
                  <Text style={{ fontSize: 7, fontWeight: 700, color: pillarBg === YELLOW ? BLACK : "white" }}>
                    {idea.pillar}
                  </Text>
                </View>
                <View style={s.ideaFormat}>
                  <Text style={{ fontSize: 7, fontWeight: 700 }}>{idea.format}</Text>
                </View>
                <Text style={s.ideaPlatform}>{idea.platform}</Text>
              </View>
              <Text style={s.ideaHook}>{idea.hook}</Text>
              <Text style={s.ideaDesc}>{idea.description}</Text>
            </View>
          );
        })}
        <PageFooter />
      </Page>

      {/* ── TAB 3: META ADS ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionSubheader}>Sección 03</Text>
        <Text style={s.sectionHeader}>Meta Ads Strategy</Text>

        <View style={[s.philoBox, { marginBottom: 14 }]}>
          <Text style={s.philoText}>{results.tab3.overview}</Text>
        </View>

        {results.tab3.stages.map((stage, i) => {
          const stageBg = resolveColor(stage.color);
          return (
            <View key={i} style={s.stageCard} wrap={false}>
              <View style={s.stageHeader}>
                <View style={[s.stageNumber, { backgroundColor: stageBg }]}>
                  <Text style={[s.stageNumText, { color: stageBg === YELLOW ? BLACK : "white" }]}>
                    {stage.stageNumber}
                  </Text>
                </View>
                <Text style={s.stageName}>{stage.stage}</Text>
              </View>
              <Text style={s.stageObjective}>{stage.objective}</Text>
              <Text style={s.stageAudience}>
                <Text style={{ fontWeight: 700 }}>Audiencia: </Text>
                {stage.audience}
              </Text>
              <View style={s.stageTypes}>
                {stage.creativeTypes.map((ct, j) => (
                  <View key={j} style={s.stageType}>
                    <Text style={{ fontSize: 7, fontWeight: 700 }}>{ct}</Text>
                  </View>
                ))}
              </View>
              <View style={s.stageExample}>
                <Text style={s.stageExText}>
                  <Text style={s.stageExBold}>Ejemplo de anuncio → </Text>
                  {stage.exampleAd}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={s.keyInsight}>
          <Text style={s.keyInsightText}>{results.tab3.keyInsight}</Text>
        </View>
        <PageFooter />
      </Page>

      {/* ── CTA PAGE ── */}
      <Page size="A4" style={s.ctaPage}>
        <Text style={s.ctaTitle}>
          ESTO ES SOLO EL{"\n"}<Text style={s.ctaHighlight}>PRINCIPIO</Text>
        </Text>
        <Text style={s.ctaSub}>
          Esto es una muestra de lo que haríamos con tu marca.{"\n"}¿Quieres ver el plan completo?
        </Text>
        <Link src="https://brutalmk.com/#contact">
          <View style={s.ctaButton}>
            <Text style={s.ctaButtonText}>HÁBLANOS →</Text>
          </View>
        </Link>
        <Text style={{ fontFamily: "Manrope", fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 20 }}>
          brutalmk.com
        </Text>
      </Page>
    </Document>
  );
};
