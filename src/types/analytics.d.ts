// types/analytics.d.ts

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
    fbq: (command: string, ...args: unknown[]) => void;
    _fbq: Record<string, unknown>;
  }
}

export {};