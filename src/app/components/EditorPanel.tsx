// I am Ironman
"use client";

import { useRef, useState, useEffect } from "react";
import {
  Copy, Trash2, Check, Loader2, RefreshCw,
  AlignLeft, SplitSquareHorizontal,
} from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { WordCountBar } from "./WordCountBar";
import { splitToSegments } from "../lib/utils";
import { LANGUAGES } from "../lib/constants";

interface EditorPanelProps {
  /** "source" | "target" */
  side: "source" | "target";
  lang: string;
  onLangChange: (code: string) => void;
  text: string;
  onTextChange: (t: string) => void;
  /** Only for target panel */
  translating?: boolean;
  onTranslate?: () => void;
  translateError?: string;
  activeSegmentIdx?: number | null;
  highlightedSegmentIdx?: number | null;
  onSegmentClick?: (idx: number) => void;
}

export function EditorPanel({
  side,
  lang,
  onLangChange,
  text,
  onTextChange,
  translating,
  onTranslate,
  translateError,
  activeSegmentIdx,
  highlightedSegmentIdx,
  onSegmentClick,
}: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useClipboard();
  const segments = splitToSegments(text);
  const isTarget = side === "target";

  function copyText() {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }

  function clearText() {
    onTextChange("");
    textareaRef.current?.focus();
  }

  return (
    <div
      className="glass editor-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Panel Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "13px 16px",
          borderBottom: "1px solid var(--divider)",
          flexShrink: 0,
          minWidth: 0,
        }}
      >
        <LanguageSelector
          value={lang}
          onChange={onLangChange}
          label={isTarget ? "Target" : "Source"}
          id={`${side}-lang`}
        />

        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <IconButton
            icon={copied ? <Check size={13} /> : <Copy size={13} />}
            label={copied ? "Copied!" : "Copy"}
            onClick={copyText}
            active={copied}
          />
          <IconButton
            icon={<Trash2 size={13} />}
            label="Clear"
            onClick={clearText}
          />
        </div>
      </div>

      {/* ── Editor Body ── */}
      <div style={{ flex: 1, overflow: "auto", position: "relative", display: "flex", flexDirection: "column" }}>
        {isTarget && translating ? (
          <TranslatingPlaceholder />
        ) : (
          <>
            {/* Segment highlight banner */}
            {isTarget && segments.length > 1 && highlightedSegmentIdx !== null && highlightedSegmentIdx !== undefined && (
              <SegmentBanner
                text={segments[highlightedSegmentIdx]?.text ?? ""}
                idx={highlightedSegmentIdx}
              />
            )}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder={
                isTarget
                  ? `Translation in ${LANGUAGES.find((l) => l.code === lang)?.label} will appear here…\nClick "Re-translate" to auto-translate using Gemini AI.`
                  : "Start typing your source content here…\n\nTip: Click a segment button below to highlight the corresponding translation."
              }
              style={{
                flex: 1,
                padding: "20px",
                fontFamily: "inherit",
                fontSize: "14px",
                lineHeight: 1.85,
                color: "var(--text-primary)",
                background: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                caretColor: "var(--text-primary)",
                minHeight: "200px",
              }}
              aria-label={`${side} text editor`}
            />
          </>
        )}
      </div>

      {/* ── Segment Pills (Source) ── */}
      {!isTarget && segments.length > 1 && (
        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid var(--divider)",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <span style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "11px",
            color: "var(--text-muted)",
            fontWeight: 500,
            marginRight: "4px",
          }}>
            <SplitSquareHorizontal size={11} />
            Segments
          </span>
          {segments.map((seg, idx) => (
            <button
              key={seg.id}
              onClick={() => onSegmentClick?.(idx)}
              title={seg.text}
              style={{
                padding: "3px 9px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "inherit",
                border: "1px solid var(--glass-border-subtle)",
                background: activeSegmentIdx === idx ? "var(--text-primary)" : "var(--highlight)",
                color: activeSegmentIdx === idx ? "var(--bg-primary)" : "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              §{idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* ── Target panel footer with translate ── */}
      {isTarget && (
        <div
          style={{
            padding: "10px 16px",
            borderTop: "1px solid var(--divider)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          {translateError ? (
            <span style={{ fontSize: "12px", color: "#ef4444", flex: 1 }}>
              ⚠ {translateError}
            </span>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, color: "var(--text-muted)", fontSize: "12px" }}>
              <AlignLeft size={12} />
              {segments.length} segment{segments.length !== 1 ? "s" : ""}
              {activeSegmentIdx !== null && activeSegmentIdx !== undefined && (
                <span className="badge" style={{ marginLeft: "4px" }}>
                  §{activeSegmentIdx + 1} highlighted
                </span>
              )}
            </div>
          )}
          <button
            className="btn-glass"
            onClick={onTranslate}
            disabled={translating}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              gap: "6px",
              fontWeight: 600,
              opacity: translating ? 0.6 : 1,
              cursor: translating ? "not-allowed" : "pointer",
              background: "var(--highlight-active)",
            }}
            aria-label="Translate"
          >
            {translating ? (
              <Loader2 size={13} className="loading-ring" />
            ) : (
              <RefreshCw size={13} />
            )}
            {translating ? "Translating…" : "Re-translate"}
          </button>
        </div>
      )}

      {/* ── Footer — Word Count ── */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--divider)",
          flexShrink: 0,
        }}
      >
        <WordCountBar text={text} />
      </div>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function IconButton({
  icon, label, onClick, active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      className="btn-glass"
      onClick={onClick}
      style={{
        padding: "5px 10px",
        borderRadius: "8px",
        fontSize: "12px",
        gap: "5px",
        background: active ? "var(--highlight-active)" : undefined,
      }}
      title={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SegmentBanner({ text, idx }: { text: string; idx: number }) {
  return (
    <div
      className="segment-highlighted"
      style={{
        margin: "12px 16px 0",
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid var(--glass-border-subtle)",
        flexShrink: 0,
      }}
    >
      <div style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: "6px",
      }}>
        Segment {idx + 1}
      </div>
      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-primary)" }}>{text}</p>
    </div>
  );
}

function TranslatingPlaceholder() {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
      {[92, 78, 85, 60, 72, 88].map((w, i) => (
        <div
          key={i}
          className="shimmer-loading"
          style={{ height: "17px", width: `${w}%` }}
        />
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "13px", marginTop: "8px" }}>
        <Loader2 size={14} className="loading-ring" />
        Translating with Gemini AI…
      </div>
    </div>
  );
}

/* ─── Hook ───────────────────────────────────────────────── */
function useClipboard(timeout = 2000): [boolean, (v: boolean) => void] {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function set(v: boolean) {
    setCopied(v);
    clearTimeout(timerRef.current);
    if (v) {
      timerRef.current = setTimeout(() => setCopied(false), timeout);
    }
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return [copied, set];
}
