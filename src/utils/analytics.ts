const measurementId = "G-J0Y9N2YPWX";
const consentKey = "ferd-analytics-consent";

type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag };

export type AnalyticsConsent = "accepted" | "refused" | null;

export const getAnalyticsConsent = (): AnalyticsConsent => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(consentKey);
  return value === "accepted" || value === "refused" ? value : null;
};

export const setAnalyticsConsent = (consent: Exclude<AnalyticsConsent, null>) => {
  window.localStorage.setItem(consentKey, consent);
};

export const initializeGoogleAnalytics = () => {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "accepted") return;
  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.gtag) return;

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
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
