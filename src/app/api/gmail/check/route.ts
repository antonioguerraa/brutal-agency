import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const TOKEN_PATH = path.join(process.cwd(), "src/data/gmail-token.json");
const DATA_PATH = path.join(process.cwd(), "src/data/outreach.json");

function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  oauth2Client.setCredentials(tokens);

  // Auto-refresh token
  oauth2Client.on("tokens", (newTokens) => {
    const existing = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    fs.writeFileSync(TOKEN_PATH, JSON.stringify({ ...existing, ...newTokens }, null, 2));
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
}

export async function GET() {
  try {
    if (!fs.existsSync(TOKEN_PATH)) {
      return NextResponse.json({ error: "Gmail not connected. Visit /api/gmail/auth first." }, { status: 401 });
    }

    const gmail = getGmailClient();
    const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

    // Build a map of email addresses to campaign IDs
    const emailToCampaign = new Map<string, number>();
    data.campaigns.forEach((c: { email: string }, i: number) => {
      if (c.email) emailToCampaign.set(c.email.toLowerCase(), i);
    });

    // Fetch recent messages from inbox (last 7 days)
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "in:inbox newer_than:7d",
      maxResults: 100,
    });

    const messages = res.data.messages || [];
    const replies: { company: string; from: string; subject: string; snippet: string; date: string }[] = [];

    for (const msg of messages) {
      const detail = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "metadata",
        metadataHeaders: ["From", "Subject", "Date"],
      });

      const headers = detail.data.payload?.headers || [];
      const from = headers.find((h) => h.name === "From")?.value || "";
      const subject = headers.find((h) => h.name === "Subject")?.value || "";
      const date = headers.find((h) => h.name === "Date")?.value || "";
      const snippet = detail.data.snippet || "";

      // Extract email address from "Name <email>" format
      const emailMatch = from.match(/<([^>]+)>/);
      const senderEmail = (emailMatch ? emailMatch[1] : from).toLowerCase().trim();

      // Check if this sender matches any campaign
      const campaignIdx = emailToCampaign.get(senderEmail);
      if (campaignIdx !== undefined) {
        const campaign = data.campaigns[campaignIdx];

        // Mark as replied if not already
        if (!campaign.replied) {
          campaign.replied = true;
          campaign.repliedAt = new Date(date).toISOString();
          campaign.replySnippet = snippet;
        }

        replies.push({
          company: campaign.company,
          from: senderEmail,
          subject,
          snippet,
          date,
        });
      }
    }

    // Save updated data
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    const totalReplied = data.campaigns.filter((c: { replied?: boolean }) => c.replied).length;

    return NextResponse.json({
      checked: messages.length,
      newReplies: replies.length,
      totalReplied,
      replies,
    });
  } catch (err) {
    console.error("Gmail check error:", err);
    return NextResponse.json({ error: "Failed to check Gmail" }, { status: 500 });
  }
}
