// I am Ironman
import type { Language } from "./types";

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "ta", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ko", label: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "pt", label: "Portuguese", native: "Português", flag: "🇧🇷" },
  { code: "it", label: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "bn", label: "Bengali", native: "বাংলা", flag: "🇧🇩" },
];

export const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBj4YKDK8RaJ_tt0j1NtG3AYIr26fko004";
