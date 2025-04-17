export const languages = ["en", "es"] as const;

export type Language = (typeof languages)[number];
