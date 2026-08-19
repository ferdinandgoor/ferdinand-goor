import { useEffect, useState } from "react";
import { getAnalyticsConsent, initializeConsentMode, initializeGoogleAnalytics, setAnalyticsConsent, updateGoogleConsent } from "@/utils/analytics";
import "./CookieConsent.scss";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initializeConsentMode();
    const consent = getAnalyticsConsent();
    if (consent === "accepted") initializeGoogleAnalytics();
    if (consent === "refused") updateGoogleConsent(false);
    if (consent === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (accepted: boolean) => {
    setAnalyticsConsent(accepted ? "accepted" : "refused");
    if (accepted) initializeGoogleAnalytics();
    else updateGoogleConsent(false);
    setVisible(false);
  };

  return (
    <aside className="cookie-consent" aria-label="Choix des cookies" aria-live="polite">
      <p><strong>Mesure d’audience</strong><span>J’utilise Google Analytics pour comprendre quelles pages sont consultées et améliorer le site.</span></p>
      <div><button type="button" onClick={() => choose(false)}>Refuser</button><button type="button" onClick={() => choose(true)}>Accepter</button></div>
    </aside>
  );
};

export default CookieConsent;
