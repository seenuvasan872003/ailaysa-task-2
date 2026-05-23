// I am Ironman
"use client";

import { countWords, countChars } from "../lib/utils";
import { Type, Hash } from "lucide-react";

const MAX_WORDS = 500;

interface WordCountBarProps {
  text: string;
}

export function WordCountBar({ text }: WordCountBarProps) {
  const words = countWords(text);
  const chars = countChars(text);
  const pct = Math.min((words / MAX_WORDS) * 100, 100);
  const isWarning = pct > 75;
  const isDanger = pct > 90;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}>
      <div style={{
        flex: 1,
        height: "2px",
        background: "var(--divider)",
        borderRadius: "2px",
        overflow: "hidden",
      }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: isDanger ? "#ef4444" : isWarning ? "#f59e0b" : "var(--text-secondary)",
            borderRadius: "2px",
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexShrink: 0,
      }}>
        <Stat icon={<Type size={10} />} value={words} label="words" />
        <div style={{ width: "1px", height: "12px", background: "var(--divider)" }} />
        <Stat icon={<Hash size={10} />} value={chars} label="chars" />
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ color: "var(--text-muted)" }}>{icon}</span>
      <span style={{
        fontSize: "12px",
        color: "var(--text-secondary)",
        fontVariantNumeric: "tabular-nums",
        fontWeight: 600,
      }}>
        {value.toLocaleString()}
      </span>
      <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 400 }}>{label}</span>
    </div>
  );
}
