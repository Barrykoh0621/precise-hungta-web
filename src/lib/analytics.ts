type LeadEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, params: LeadEventParams) => void;
  }
}

export function trackLeadEvent(eventName: string, params: LeadEventParams = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event_category: "lead",
    ...params,
  };

  window.dataLayer?.push({
    event: eventName,
    ...payload,
  });

  window.gtag?.("event", eventName, payload);
}
