export type Lang = "tr" | "en"; 

// Get language from environment variable or default to "en"
// Cast to Lang type for type safety
export const LANG: Lang = (process.env.LANG as Lang) || "en";