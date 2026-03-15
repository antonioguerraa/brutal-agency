import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/outreach.json");

function readData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function buildPlainText(body: string, senderName: string): string {
  return body + "\n\n" + senderName + " · BRUTAL. · Huelva · brutalmk.com";
}

function writeData(data: ReturnType<typeof readData>) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET — return all campaigns
export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

// POST — send a specific email
export async function POST(request: NextRequest) {
  const { campaignId, emailIndex } = await request.json();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  const data = readData();
  const campaign = data.campaigns.find((c: { id: string }) => c.id === campaignId);
  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const email = campaign.emails[emailIndex];
  if (!email) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  if (!campaign.email) {
    return NextResponse.json({ error: "No email address for this company" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Find the sender for this campaign
    const sender = data.config.senders?.find((s: { id: string }) => s.id === campaign.sender)
      || data.config.senders?.[0]
      || { name: "BRUTAL.", email: "hola@brutalmk.com" };

    const text = buildPlainText(email.body, sender.name);

    const result = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: campaign.email,
      replyTo: data.config.replyTo,
      subject: email.subject,
      text,
    });

    // Update status
    email.status = "sent";
    email.sentAt = new Date().toISOString();
    writeData(data);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
