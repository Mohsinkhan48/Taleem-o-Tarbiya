export const themes = [
  "light",
  "dark",
  "forest",
  "dracula",
  "nord",
  "oceanic",
  "autumn",
] as const;

export type Theme = (typeof themes)[number];
