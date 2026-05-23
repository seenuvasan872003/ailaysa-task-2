// I am Ironman
"use client";

import { useState, useEffect, useCallback } from "react";
import type { DraftData } from "../lib/types";
import { timeAgo } from "../lib/utils";
import { GEMINI_API_KEY, LANGUAGES } from "../lib/constants";

const STORAGE_KEY = "ailaysa-draft";
const THEME_KEY = "ailaysa-theme";

export function useEditor() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<"editor" | "masala">("editor");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ta");
  const [docTitle, setDocTitle] = useState("Product launch blog — draft 1");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");
  const [timeAgoStr, setTimeAgoStr] = useState("");
  const [activeSegmentIdx, setActiveSegmentIdx] = useState<number | null>(null);
  const [highlightedSegmentIdx, setHighlightedSegmentIdx] = useState<number | null>(null);

  // ── Mount & hydrate from storage ──
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d: DraftData = JSON.parse(saved);
        setSourceText(d.sourceText || "");
        setTargetText(d.targetText || "");
        setSourceLang(d.sourceLang || "en");
        setTargetLang(d.targetLang || "ta");
        setDocTitle(d.docTitle || "Product launch blog — draft 1");
      }
      const savedTheme = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
      if (savedTheme) setTheme(savedTheme);
    } catch { /* noop */ }
  }, []);

  // ── Apply theme to html element ──
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  // ── Time ago ticker ──
  useEffect(() => {
    if (!savedAt) return;
    const interval = setInterval(() => setTimeAgoStr(timeAgo(savedAt)), 15000);
    setTimeAgoStr(timeAgo(savedAt));
    return () => clearInterval(interval);
  }, [savedAt]);

  // ── Save draft ──
  const saveDraft = useCallback(() => {
    const data: DraftData = { sourceText, targetText, sourceLang, targetLang, docTitle };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const now = new Date();
    setSavedAt(now);
    setTimeAgoStr(timeAgo(now));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  }, [sourceText, targetText, sourceLang, targetLang, docTitle]);

  // ── Ctrl+S shortcut ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveDraft();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [saveDraft]);

  // ── Translate via Gemini ──
  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) return;
    const srcLang = LANGUAGES.find((l) => l.code === sourceLang);
    const tgtLang = LANGUAGES.find((l) => l.code === targetLang);
    setTranslating(true);
    setTranslateError("");
    const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
    let success = false;
    let finalError = "";

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Translate the following text from ${srcLang?.label} (${srcLang?.native}) to ${tgtLang?.label} (${tgtLang?.native}). Return ONLY the translated text, no explanations, no quotes, no preamble:\n\n${sourceText}`,
                    },
                  ],
                },
              ],
              generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
            }),
          }
        );

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(`Rate limit exceeded on ${model} (429)`);
          }
          throw new Error(`API error ${response.status} on ${model}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        if (text) {
          setTargetText(text.trim());
          success = true;
          break;
        }
      } catch (err) {
        console.warn(`Translation attempt with ${model} failed:`, err);
        finalError = err instanceof Error ? err.message : "Translation failed";
      }
    }

    if (!success) {
      if (finalError.includes("429")) {
        setTranslateError(
          "Gemini AI API rate limit exceeded (429) on all fallback models. Please wait a moment or configure your own NEXT_PUBLIC_GEMINI_API_KEY in a .env.local file."
        );
      } else {
        setTranslateError(finalError || "Translation failed. Please try again.");
      }
    }
    setTranslating(false);
  }, [sourceText, sourceLang, targetLang]);

  // ── Swap languages ──
  const swapLanguages = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  }, [sourceLang, targetLang, sourceText, targetText]);

  // ── Segment click ──
  const handleSegmentClick = useCallback((idx: number) => {
    setActiveSegmentIdx(idx);
    setHighlightedSegmentIdx(idx);
    setTimeout(() => setHighlightedSegmentIdx(null), 2200);
  }, []);

  return {
    mounted,
    theme, setTheme,
    activeTab, setActiveTab,
    sourceText, setSourceText,
    targetText, setTargetText,
    sourceLang, setSourceLang,
    targetLang, setTargetLang,
    docTitle, setDocTitle,
    savedAt,
    saveToast,
    saveDraft,
    translating,
    translateError,
    handleTranslate,
    swapLanguages,
    timeAgoStr,
    activeSegmentIdx,
    highlightedSegmentIdx,
    handleSegmentClick,
  };
}
