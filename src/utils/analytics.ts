const measurementId = "G-J0Y9N2YPWX";
const consentKey = "ferd-analytics-consent";

type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag };
let consentDefaultsSet = false;

export type AnalyticsConsent = "accepted" | "refused" | null;

export const getAnalyticsConsent = (): AnalyticsConsent => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(consentKey);
  return value === "accepted" || value === "refused" ? value : null;
};

export const setAnalyticsConsent = (consent: Exclude<AnalyticsConsent, null>) => {
  window.localStorage.setItem(consentKey, consent);
};

export const initializeConsentMode = () => {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag ||= (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
  if (consentDefaultsSet) return;
  analyticsWindow.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  consentDefaultsSet = true;
};

export const updateGoogleConsent = (analyticsGranted: boolean) => {
  initializeConsentMode();
  (window as AnalyticsWindow).gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analyticsGranted ? "granted" : "denied",
  });
};

export const initializeGoogleAnalytics = () => {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "accepted") return;
  initializeConsentMode();
  const analyticsWindow = window as AnalyticsWindow;
  updateGoogleConsent(true);
  if (document.querySelector(`script[data-google-analytics="${measurementId}"]`)) return;

  analyticsWindow.gtag?.("js", new Date());
  analyticsWindow.gtag?.("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.googleAnalytics = measurementId;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
};

export const trackGoogleEvent = (event: string, data: Record<string, string> = {}) => {
  if (getAnalyticsConsent() !== "accepted") return;
  initializeGoogleAnalytics();
  (window as AnalyticsWindow).gtag?.("event", event, data);
};

export const trackPageView = (path: string) => {
  if (getAnalyticsConsent() !== "accepted") return;
  initializeGoogleAnalytics();
  (window as AnalyticsWindow).gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
};
