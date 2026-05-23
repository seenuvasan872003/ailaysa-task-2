// I am Ironman
"use client";

import { useEditor } from "../hooks/useEditor";
import { Header } from "./Header";
import { EditorPanel } from "./EditorPanel";
// import { MasalaTab } from "./MasalaTab";
import { StatusBar } from "./StatusBar";
import { SaveToast } from "./SaveToast";

export default function BilingualEditor() {
  const editor = useEditor();

  if (!editor.mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "14px",
        gap: "10px",
        zIndex: 1,
      }}
    >
      {/* ── Header ── */}
      <Header
        theme={editor.theme}
        onToggleTheme={() => editor.setTheme(editor.theme === "light" ? "dark" : "light")}
        docTitle={editor.docTitle}
        onTitleChange={editor.setDocTitle}
        activeTab={editor.activeTab}
        onTabChange={editor.setActiveTab}
        onSave={editor.saveDraft}
        sourceText={editor.sourceText}
        targetText={editor.targetText}
        targetLang={editor.targetLang}
        docTitleValue={editor.docTitle}
        savedAt={editor.savedAt}
        timeAgoStr={editor.timeAgoStr}
      />

      {/* ── Main Content ── */}
      <main style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {editor.activeTab === "masala" ? (
          <div className="glass" style={{ flex: 1, borderRadius: "18px", overflow: "hidden" }}>
            {/* <MasalaTab /> */}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {/* Source Panel */}
            <EditorPanel
              side="source"
              lang={editor.sourceLang}
              onLangChange={editor.setSourceLang}
              text={editor.sourceText}
              onTextChange={editor.setSourceText}
              activeSegmentIdx={editor.activeSegmentIdx}
              onSegmentClick={editor.handleSegmentClick}
            />

            {/* Target Panel */}
            <EditorPanel
              side="target"
              lang={editor.targetLang}
              onLangChange={editor.setTargetLang}
              text={editor.targetText}
              onTextChange={editor.setTargetText}
              translating={editor.translating}
              onTranslate={editor.handleTranslate}
              translateError={editor.translateError}
              activeSegmentIdx={editor.activeSegmentIdx}
              highlightedSegmentIdx={editor.highlightedSegmentIdx}
              onSegmentClick={editor.handleSegmentClick}
            />
          </div>
        )}
      </main>

      {/* ── Status Bar ── */}
      <StatusBar
        savedAt={editor.savedAt}
        timeAgoStr={editor.timeAgoStr}
        sourceLang={editor.sourceLang}
        targetLang={editor.targetLang}
        onSwap={editor.swapLanguages}
      />

      {/* ── Toast ── */}
      <SaveToast show={editor.saveToast} />
    </div>
  );
}
