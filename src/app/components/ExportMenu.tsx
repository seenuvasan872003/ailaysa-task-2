// I am Ironman
"use client";

import { useState } from "react";
import { Download, FileText, Code } from "lucide-react";
import { LANGUAGES } from "../lib/constants";

interface ExportMenuProps {
  sourceText: string;
  targetText: string;
  targetLang: string;
  docTitle: string;
}

export function ExportMenu({ sourceText, targetText, targetLang, docTitle }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const lang = LANGUAGES.find((l) => l.code === targetLang);

  const exportTxt = () => {
    const content = `${docTitle}\n${"─".repeat(48)}\n\nSOURCE (English)\n\n${sourceText}\n\n${"─".repeat(48)}\n\nTARGET (${lang?.label})\n\n${targetText}`;
    download(content, "text/plain", `${slugify(docTitle)}.txt`);
    setOpen(false);
  };

  const exportHtml = () => {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${docTitle}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#fafafa;color:#111;padding:48px 24px}
    .container{max-width:960px;margin:0 auto}
    h1{font-size:22px;font-weight:700;margin-bottom:32px;letter-spacing:-0.02em}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:32px}
    .panel{background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:24px}
    .panel label{display:block;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888;margin-bottom:12px}
    .panel p{white-space:pre-wrap;line-height:1.8;font-size:14px;color:#333}
    @media(max-width:640px){.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="container">
    <h1>${esc(docTitle)}</h1>
    <div class="grid">
      <div class="panel">
        <label>Source — English</label>
        <p>${esc(sourceText)}</p>
      </div>
      <div class="panel">
        <label>Target — ${esc(lang?.label ?? targetLang)}</label>
        <p>${esc(targetText)}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
    download(content, "text/html", `${slugify(docTitle)}.html`);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btn-glass"
        onClick={() => setOpen((o) => !o)}
        style={{ padding: "8px 14px", borderRadius: "10px", gap: "6px" }}
        aria-label="Export options"
        aria-expanded={open}
      >
        <Download size={14} />
        Export
      </button>

      {open && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
            }}
            onClick={() => setOpen(false)}
          />
          <div
            className="glass-strong"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              borderRadius: "14px",
              padding: "6px",
              zIndex: 100,
              minWidth: "175px",
            }}
          >
            <DropdownItem icon={<FileText size={14} />} label="Export as .txt" onClick={exportTxt} />
            <DropdownItem icon={<Code size={14} />} label="Export as .html" onClick={exportHtml} />
          </div>
        </>
      )}
    </div>
  );
}

function DropdownItem({
  icon, label, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding: "10px 14px",
        background: "transparent",
        border: "none",
        color: "var(--text-primary)",
        fontFamily: "inherit",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        textAlign: "left",
        borderRadius: "9px",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--highlight)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ color: "var(--text-muted)" }}>{icon}</span>
      {label}
    </button>
  );
}

function download(content: string, type: string, filename: string) {
  const blob = new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function slugify(s: string): string {
  return s.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
}

function esc(s: string = ""): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
