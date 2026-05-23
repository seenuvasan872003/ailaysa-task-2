// I am Ironman
"use client";

import { Check } from "lucide-react";

interface SaveToastProps {
  show: boolean;
}

export function SaveToast({ show }: SaveToastProps) {
  if (!show) return null;

  return (
    <div
      className="save-toast glass-strong"
      style={{
        position: "fixed",
        bottom: "58px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 20px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        fontWeight: 500,
        color: "var(--text-primary)",
        zIndex: 1000,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      <Check size={14} style={{ color: "#22c55e" }} />
      Draft saved to localStorage
    </div>
  );
}
