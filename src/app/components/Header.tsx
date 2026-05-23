// I am Ironman
"use client";


import {
  Moon, Sun, LayoutTemplate, Flame,
  Circle
} from "lucide-react";
import { ExportMenu } from "./ExportMenu";
import { Save } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  docTitle: string;
  onTitleChange: (t: string) => void;
  activeTab: "editor" | "masala";
  onTabChange: (t: "editor" | "masala") => void;
  onSave: () => void;
  sourceText: string;
  targetText: string;
  targetLang: string;
  docTitleValue: string;
  savedAt: Date | null;
  timeAgoStr: string;
}

export function Header({
  theme, onToggleTheme,
  docTitle, onTitleChange,
  activeTab, onTabChange,
  onSave,
  sourceText, targetText, targetLang, docTitleValue,
  savedAt, timeAgoStr,
}: HeaderProps) {
  return (
    <header className="glass" style={{
      borderRadius: "16px",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexShrink: 0,
      height: "58px",
      position: "relative",
    }}>
      {/* ── Logo ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
          border: "1px solid var(--glass-border)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ailaysa.com/logo512.png"
            alt="Ailaysa logo"
            width={32}
            height={32}
            style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
          />
        </div>
        <span style={{
          fontWeight: 700,
          fontSize: "16px",
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
        }}>
          ailaysa
        </span>
      </div>

      {/* ── Divider ── */}
      <div style={{ width: "1px", height: "22px", background: "var(--divider)", flexShrink: 0 }} />

      {/* ── Editable title ── */}
      <input
        value={docTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--text-secondary)",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "inherit",
          minWidth: "80px",
          maxWidth: "200px",
          flex: "0 1 auto",
          cursor: "text",
        }}
        placeholder="Document title..."
        aria-label="Document title"
      />

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Nav tabs ── */}
      <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <TabButton
          label="Editor"
          icon={<LayoutTemplate size={13} />}
          active={activeTab === "editor"}
          onClick={() => onTabChange("editor")}
        />
        <TabButton
          label="Masala Packet"
          icon={<Flame size={13} />}
          active={activeTab === "masala"}
          onClick={() => onTabChange("masala")}
          spicy
        />
      </nav>

      <div style={{ width: "1px", height: "22px", background: "var(--divider)", flexShrink: 0 }} />

      {/* ── Actions ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Save status pill */}
        {savedAt && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "99px",
            background: "var(--highlight)",
            border: "1px solid var(--glass-border-subtle)",
            fontSize: "11px",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}>
            <Circle size={6} fill="#22c55e" color="#22c55e" />
            {timeAgoStr}
          </div>
        )}

        <button
          className="btn-glass"
          onClick={onToggleTheme}
          style={{ padding: "8px 14px", borderRadius: "10px", gap: "6px" }}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <ExportMenu
          sourceText={sourceText}
          targetText={targetText}
          targetLang={targetLang}
          docTitle={docTitleValue}
        />

        <button
          className="btn-glass btn-primary"
          onClick={onSave}
          style={{ padding: "8px 16px", borderRadius: "10px", gap: "6px" }}
          aria-label="Save draft"
        >
          <Save size={14} />
          Save Draft
        </button>
      </div>
    </header>
  );
}

function TabButton({
  label, icon, active, onClick, spicy,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  spicy?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={spicy ? "masala-tab" : ""}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "6px 12px",
        borderRadius: "9px",
        border: "none",
        background: active ? "var(--highlight-active)" : "transparent",
        color: active ? "var(--text-primary)" : "var(--text-muted)",
        fontSize: "13px",
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        transition: "all 0.15s ease",
        fontFamily: "inherit",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
