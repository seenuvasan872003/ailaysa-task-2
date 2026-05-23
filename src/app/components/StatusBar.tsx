// I am Ironman
"use client";

import { ArrowLeftRight, Circle, Zap } from "lucide-react";
import { LANGUAGES } from "../lib/constants";

interface StatusBarProps {
  savedAt: Date | null;
  timeAgoStr: string;
  targetLang: string;
  sourceLang: string;
  onSwap: () => void;
}

export function StatusBar({ savedAt, timeAgoStr, targetLang, sourceLang, onSwap }: StatusBarProps) {
  const srcLang = LANGUAGES.find((l) => l.code === sourceLang);
  const tgtLang = LANGUAGES.find((l) => l.code === targetLang);

  return (
    <footer
      className="glass"
      style={{
        borderRadius: "12px",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
        height: "38px",
      }}
    >
      {/* Save status */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: "var(--text-muted)",
      }}>
        <Circle
          size={6}
          fill={savedAt ? "#22c55e" : "var(--text-muted)"}
          color={savedAt ? "#22c55e" : "var(--text-muted)"}
        />
        {savedAt
          ? <span>Draft saved · <span style={{ color: "var(--text-secondary)" }}>{timeAgoStr}</span></span>
          : <span>Unsaved · Press <kbd style={{
              padding: "1px 5px",
              borderRadius: "4px",
              background: "var(--highlight-active)",
              border: "1px solid var(--glass-border-subtle)",
              fontSize: "10px",
              fontFamily: "JetBrains Mono, monospace",
            }}>Ctrl+S</kbd> to save</span>
        }
      </div>

      <div style={{ flex: 1 }} />

      {/* Language pair swap */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
          {srcLang?.native}
        </span>
        <button
          onClick={onSwap}
          className="btn-glass"
          style={{
            padding: "4px 10px",
            borderRadius: "8px",
            gap: "5px",
            fontSize: "11px",
            fontWeight: 600,
          }}
          title="Swap languages and content"
          aria-label="Swap source and target"
        >
          <ArrowLeftRight size={11} />
          Swap
        </button>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
          {tgtLang?.native}
        </span>
      </div>

      <div style={{ width: "1px", height: "16px", background: "var(--divider)" }} />

      {/* Branding */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)" }}>
        <Zap size={11} />
        <span>I am Ironman</span>
      </div>
    </footer>
  );
}
