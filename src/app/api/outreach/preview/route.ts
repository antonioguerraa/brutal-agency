import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/outreach.json");
const TEMPLATE_PATH = path.join(process.cwd(), "src/data/email-template.html");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get("campaign") || "";
  const emailIndex = parseInt(searchParams.get("email") || "0", 10);

  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  // Default sample if no campaign specified
  let body = "Hola,\n\nEsto es una vista previa del template de email.\n\nAquí iría el cuerpo del mensaje personalizado para cada empresa.\n\nUn saludo,\nAntonio Guerra\nBRUTAL. · Huelva\nbrutalmk.com";
  let senderName = "Antonio Guerra";
  let subject = "Vista previa del template";

  const campaign = data.campaigns.find((c: { id: string }) => c.id === campaignId);
  if (campaign && campaign.emails[emailIndex]) {
    body = campaign.emails[emailIndex].body;
    subject = campaign.emails[emailIndex].subject;
    const sender = data.config.senders?.find((s: { id: string }) => s.id === campaign.sender);
    if (sender) senderName = sender.name;
  }

  // Convert body to HTML paragraphs
  const bodyHtml = body
    .split("\n\n")
    .map((p: string) => `<p style="margin:0 0 14px 0;">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");

  const cleanBody = bodyHtml
    .replace(/<p[^>]*>Un saludo,<br>(?:José García|Antonio Guerra|José Manuel Carrasco)<br>BRUTAL\.[^<]*<\/p>/gi, "")
    .replace(/<p[^>]*>(?:José García|Antonio Guerra|José Manuel Carrasco)<br>BRUTAL\.[^<]*<\/p>/gi, "")
    .replace(/<p[^>]*>(?:brutalmk\.com)<\/p>/gi, "");

  const html = template
    .replace("{{BODY_HTML}}", cleanBody)
    .replace("{{SENDER_NAME}}", senderName)
    .replace("{{SUBJECT}}", subject)
    .replace("{{UNSUBSCRIBE_URL}}", "https://brutalmk.com/unsubscribe");

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
