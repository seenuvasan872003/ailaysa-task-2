// I am Ironman
import type { Segment } from "./types";

export function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export function countChars(text: string): number {
  return text.length;
}

export function splitToSegments(text: string): Segment[] {
  if (!text.trim()) return [];
  const parts = text.split(/(?<=[.!?।。！？])\s+/);
  return parts
    .map((t, i) => ({ id: `seg-${i}`, text: t.trim() }))
    .filter((s) => s.text.length > 0);
}

export function timeAgo(date: Date): string {
  const sec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (sec < 60) return "Just now";
  if (sec < 3600) return `${Math.floor(sec / 60)} min ago`;
  return `${Math.floor(sec / 3600)}h ago`;
}
