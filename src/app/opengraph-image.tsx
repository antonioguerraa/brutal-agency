import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BRUTAL. - Agencia Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Background decorative squares */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            width: 300,
            height: 300,
            backgroundColor: "#0000FF",
            border: "4px solid #000",
            transform: "rotate(6deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            width: 300,
            height: 300,
            backgroundColor: "#FF0000",
            border: "4px solid #000",
            transform: "rotate(-3deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            width: 300,
            height: 300,
            backgroundColor: "#FFFF00",
            border: "4px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 140, fontWeight: 900, color: "#000" }}>*</span>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            width: "65%",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFF00",
                border: "3px solid #000",
                boxShadow: "6px 6px 0 #000",
                padding: "8px 20px",
                fontSize: 16,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
              }}
            >
              Agencia Digital
            </div>
          </div>

          {/* Logo */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              marginBottom: 20,
              display: "flex",
            }}
          >
            BRUTAL
            <span
              style={{
                backgroundColor: "#FF0000",
                color: "#FFF",
                padding: "0 4px",
              }}
            >
              .
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 0.95,
              color: "#000",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>HACEMOS</span>
            <span>QUE TE</span>
            <span
              style={{
                backgroundColor: "#FF0000",
                color: "#FFF",
                padding: "0 8px",
                display: "flex",
                width: "fit-content",
              }}
            >
              ENCUENTREN
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#666",
              marginTop: 24,
              display: "flex",
              maxWidth: 500,
            }}
          >
            SEO & AEO · Social Media · Google Ads · Meta Ads
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {["SEO", "AEO", "SOCIAL MEDIA", "GOOGLE ADS", "META ADS", "CONTENIDO"].map((item) => (
            <span
              key={item}
              style={{
                color: "#FFF",
                fontSize: 14,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {item}
              <span style={{ color: "#FFFF00" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
