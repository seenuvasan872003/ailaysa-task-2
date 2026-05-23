// I am Ironman
"use client";

import { Flame, Sparkles } from "lucide-react";

export function MasalaTab() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "48px 24px",
        textAlign: "center",
        gap: "20px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "20px",
          background: "var(--highlight-active)",
          border: "1px solid var(--glass-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Flame size={32} style={{ color: "var(--text-primary)" }} />
      </div>

      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Masala Packet
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            lineHeight: 1.75,
            maxWidth: "360px",
            margin: "0 auto",
          }}
        >
          A pinch of spice in every translation. This editor is crafted with
          boldness — hot, vibrant, and unforgettable.
        </p>
      </div>

      {/* Ironman callout */}
      <div
        className="glass"
        style={{
          padding: "14px 24px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--text-primary)",
          fontStyle: "italic",
        }}
      >
        <Sparkles size={16} style={{ color: "var(--text-muted)" }} />
        "I am Ironman" — and I translate in every language
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
          maxWidth: "400px",
        }}
      >
        {[
          "Chilli Pepper",
          "Garlic Garam",
          "Golden Turmeric",
          "Coriander Fresh",
          "Star Anise",
          "Black Pepper",
        ].map((s) => (
          <span key={s} className="badge" style={{ fontSize: "12px", padding: "5px 12px" }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
