// I am Ironman
"use client";

import { ChevronDown, Globe } from "lucide-react";
import { LANGUAGES } from "../lib/constants";

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
  id: string;
}

export function LanguageSelector({ value, onChange, label, id }: LanguageSelectorProps) {
  const current = LANGUAGES.find((l) => l.code === value);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 12px",
        borderRadius: "11px",
        background: "var(--highlight)",
        border: "1px solid var(--glass-border-subtle)",
        flex: 1,
        minWidth: 0,
        transition: "background 0.2s",
      }}
    >
      <Globe size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
      <span style={{
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ width: "1px", height: "14px", background: "var(--divider)", flexShrink: 0 }} />
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 1,
          }}
          aria-label={`Select ${label} language`}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label} — {l.native}
            </option>
          ))}
        </select>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}>
          <span style={{ fontSize: "14px" }}>{current?.flag}</span>
          <span style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {current?.label}
          </span>
          <ChevronDown size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}
