import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL requerida" }, { status: 400 });
    }

    // Fetch the website content and extract logo
    let pageContent: string;
    let logoUrl: string | null = null;
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; BRUTALBot/1.0; +https://brutalmk.com)",
        },
        signal: AbortSignal.timeout(10000),
      });
      const html = await res.text();
      pageContent = stripHtml(html).slice(0, 8000);
      logoUrl = extractLogo(html, url);
    } catch {
      pageContent = `[Could not fetch the page. URL provided: ${url}. Analyze based on the URL/domain name only and make reasonable assumptions about the business.]`;
    }

    // Fallback: use Google favicon service
    if (!logoUrl) {
      try {
        const domain = new URL(url).hostname;
        logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      } catch {}
    }

    const systemPrompt = `You are an expert digital strategist for BRUTAL., a digital agency specializing in SEO, AEO (Answer Engine Optimization), social media content, and Meta Ads.

You will analyze a website and generate a comprehensive report in Spanish with 3 sections. Be specific, direct, and actionable. Reference actual content from the website when possible.

IMPORTANT: All text output must be in Spanish. Be brutally honest but constructive. Show the prospect what they're missing and what you'd fix.

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "brandName": "short brand/business name extracted from the site",
  "tab1": {
    "messaging": {
      "title": "Lo que tu web le dice al mundo",
      "icon": "💬",
      "insight": "3 sentences, max 15 words each. What the site says now vs what the client needs to hear. Reference real content from the site.",
      "severity": "critico | mejorable | correcto",
      "quickWin": "One simple, concrete action they can do today. Max 14 words. E.g. 'Cambia tu titular a [suggested headline]'"
    },
    "seo": {
      "title": "Así te ve Google",
      "icon": "🔍",
      "insight": "3 sentences, max 15 words each. The single most important SEO problem. Reference the actual title tag or structure.",
      "severity": "critico | mejorable | correcto",
      "quickWin": "One specific fix. Max 14 words. E.g. 'Añade meta descriptions a cada página'"
    },
    "aeo": {
      "title": "Así te ve la IA",
      "icon": "🤖",
      "insight": "3 sentences, max 15 words each. Would AI recommend them? Why not. Be direct.",
      "severity": "critico | mejorable | correcto",
      "quickWin": "One action to improve AI visibility. Max 14 words. E.g. 'Añade schema markup de negocio local'"
    },
    "presence": {
      "title": "Tu perfil digital",
      "icon": "📱",
      "insight": "3 sentences, max 15 words each. What's missing in their digital footprint.",
      "severity": "critico | mejorable | correcto",
      "quickWin": "One quick fix. Max 14 words. E.g. 'Crea tu perfil de Google Business'"
    }
  },
  "tab2": {
    "philosophy": "A custom version of 'No vendemos [their product]. Construimos confianza, autoridad y deseo.' adapted to their specific business.",
    "cadence": "4-5 Reels/semana + Stories diarios en Instagram",
    "ideas": [
      {
        "pillar": "Autoridad",
        "pillarColor": "var(--primary)",
        "format": "Micro-podcast",
        "hook": "The first line / first 3 seconds hook - catchy, specific to their business",
        "description": "2-3 sentence description of what this content piece would show",
        "platform": "IG Reel"
      }
    ]
  },
  "tab3": {
    "overview": "Brief description of the Meta Ads strategy we'd run for this business. 2-3 sentences.",
    "stages": [
      {
        "stage": "Stage name",
        "stageNumber": "01",
        "color": "one of: var(--primary), var(--secondary), var(--cta)",
        "objective": "Stage objective",
        "audience": "Who we're targeting",
        "creativeTypes": ["Type 1", "Type 2", "Type 3"],
        "exampleAd": "A specific ad concept for this business at this stage"
      }
    ],
    "keyInsight": "One powerful closing insight about their ads potential."
  }
}

For tab2.ideas, generate exactly 8 ideas:
- 3 Autoridad ideas (pillarColor: "var(--primary)")
- 3 Trending ideas (pillarColor: "var(--secondary)")
- 2 Día a día ideas (pillarColor: "var(--cta)")

For tab3.stages, generate exactly 4 stages:
- Stage 01: TOFU - Cold audience (color: "var(--primary)")
- Stage 02: MOFU - Warm audience (color: "var(--secondary)")
- Stage 03: BOFU - Hot audience (color: "var(--cta)")
- Stage 04: Retención (color: "var(--primary)")

Content format ideas to draw from:
- Autoridad: Micro-podcast, profesional reacciona a caso real, verdades incómodas del sector, antes/después con historia, educación clara, opinión profesional
- Trending: Música + texto potente, POVs, mitos rápidos, errores comunes, morbo controlado, adaptación de trends
- Día a día: Behind the scenes, reunión de equipo, atendiendo clientes, reacciones reales, día real, preparación

Make hooks catchy and specific to their business — not generic. Return ONLY the JSON, no other text.`;

    const completion = await getClient().chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 4000,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Analyze this website and generate the report.\n\nURL: ${url}\n\nPage content:\n${pageContent}`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("No response from AI");
    }

    // Parse JSON — handle possible markdown code blocks
    let jsonStr = text;
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const analysis = JSON.parse(jsonStr.trim());

    // Attach logoUrl to the response
    analysis.logoUrl = logoUrl;

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Error al analizar la web. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}

function extractLogo(html: string, baseUrl: string): string | null {
  const resolve = (href: string) => {
    try {
      return new URL(href, baseUrl).href;
    } catch {
      return null;
    }
  };

  // 1. og:image
  const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (ogMatch) {
    const resolved = resolve(ogMatch[1]);
    if (resolved) return resolved;
  }

  // 2. apple-touch-icon
  const appleMatch = html.match(/<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i);
  if (appleMatch) {
    const resolved = resolve(appleMatch[1]);
    if (resolved) return resolved;
  }

  // 3. Large favicon (icon with sizes)
  const iconSizes = html.match(/<link[^>]+rel=["']icon["'][^>]+sizes=["'](\d+)x\d+["'][^>]+href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']icon["'][^>]+sizes=["'](\d+)/i);
  if (iconSizes) {
    const href = iconSizes[2] || iconSizes[1];
    const resolved = resolve(href);
    if (resolved) return resolved;
  }

  // 4. Any shortcut icon or icon
  const faviconMatch = html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i);
  if (faviconMatch) {
    const resolved = resolve(faviconMatch[1]);
    if (resolved) return resolved;
  }

  // 5. First img in header/nav with "logo" in src/alt/class
  const headerMatch = html.match(/<(?:header|nav)[\s\S]*?<\/(?:header|nav)>/i);
  if (headerMatch) {
    const logoImg = headerMatch[0].match(/<img[^>]+(?:src|alt|class)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["']/i)
      || headerMatch[0].match(/<img[^>]+src=["']([^"']+)["'][^>]*(?:alt|class)=["'][^"']*logo/i);
    if (logoImg) {
      const resolved = resolve(logoImg[1]);
      if (resolved) return resolved;
    }
  }

  return null;
}

function stripHtml(html: string): string {
  let text = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[\s\S]*?<\/style>/gi, "");
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, "");
  text = text.replace(/<[^>]+>/g, " ");
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/\s+/g, " ").trim();
  return text;
}
