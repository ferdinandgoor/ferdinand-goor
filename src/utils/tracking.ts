type TrackingEvent =
  | "cta_contact_click"
  | "showreel_play"
  | "project_view"
  | "contact_form_start"
  | "contact_form_submit"
  | "instagram_click"
  | "youtube_click"
  | "google_reviews_click";

export const trackEvent = (event: TrackingEvent, data: Record<string, string> = {}) => {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  dataLayer?.push({ event, ...data });
};

