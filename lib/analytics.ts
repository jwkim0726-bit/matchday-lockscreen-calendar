export type AnalyticsEventName =
  | "team_select"
  | "month_select"
  | "background_upload"
  | "customize_start"
  | "screen_type_select"
  | "wallpaper_download";

type AnalyticsParameters = Record<string, string | boolean | number>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(eventName: AnalyticsEventName, parameters: AnalyticsParameters) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...parameters });
}
