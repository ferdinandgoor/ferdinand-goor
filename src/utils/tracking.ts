import { trackGoogleEvent } from "./analytics";

type TrackingEvent =
  | "cta_contact_click"
  | "showreel_play"
  | "project_view"
  | "project_video_play"
  | "contact_form_start"
  | "contact_form_submit"
  | "instagram_click"
  | "youtube_click"
  | "google_reviews_click"
  | "email_click"
  | "phone_click"
  | "all_projects_click"
  | "films_visit";

export const trackEvent = (event: TrackingEvent, data: Record<string, string> = {}) => {
  if (typeof window === "undefined") return;
  trackGoogleEvent(event, data);
};
