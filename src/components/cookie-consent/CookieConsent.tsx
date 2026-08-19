import { useEffect, useState } from "react";
import { getAnalyticsConsent, initializeGoogleAnalytics, setAnalyticsConsent } from "@/utils/analytics";
import "./CookieConsent.scss";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getAnalyticsConsent();
    if (consent === "accepted") initializeGoogleAnalytics();
    if (consent === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (accepted: boolean) => {
    setAnalyticsConsent(accepted ? "accepted" : "refused");
    if (accepted) initializeGoogleAnalytics();
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
