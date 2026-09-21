import { useEffect, useState } from "react";

const EN = {
  title: "Imprint",
  sections: [
    {
      label: "Legal Notice",
      heading: "Imprint (pursuant to § 5 TMG)",
      body: "Juan Gomez-Vara\nGermany\nEmail: juangomezvara@gmail.com",
    },
    {
      label: "Liability",
      heading: "Liability for Links",
      body: "This website contains links to external third-party websites over whose content I have no influence. I cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking — no illegal content was apparent at that time.",
    },
    {
      label: "Copyright",
      heading: "Copyright Notice",
      body: "All content and works on this website created by me are subject to German copyright law. Any reproduction, editing, distribution or use outside the limits of copyright law requires my written consent. Downloads and copies of this page are only permitted for private, non-commercial use.\n\nWhere content on this website was not created by me, the copyrights of third parties are respected and marked accordingly. If you become aware of a copyright infringement, please let me know — I will remove the affected content immediately.",
    },
    {
      label: "Privacy Policy",
      heading: "Data Protection",
      body: "1. Responsible Party\nJuan Gomez-Vara\nGermany\nEmail: juangomezvara@gmail.com\n\n2. Collection and Processing of Personal Data\nWhen visiting this website, technical access data (e.g. IP address, browser type, date and time) is automatically collected by the web server. This data is technically required to display the website correctly and is not used to draw conclusions about your identity. No further processing takes place.\n\nIf you contact me by email, the data you submit will be used exclusively to process your enquiry.\n\n3. Data Transfer\nYour data will not be passed on to third parties unless required by law.\n\n4. Your Rights\nYou have the right at any time to request information about your stored personal data, its origin, recipients and the purpose of data processing. You also have the right to have this data corrected and — where legally applicable — erased or restricted (Art. 15–18 GDPR).\n\nYou also have the right to lodge a complaint with the competent supervisory authority: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), www.ldi.nrw.de.\n\nFor any requests, please use the contact details provided in the legal notice above. I will respond within one month.\n\n5. Hosting\nThis website is hosted by:\nVercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA\n\nThe server region is set to Frankfurt (fra1). When you visit this website, Vercel processes technical access data (including IP address, browser type, timestamp) on the basis of Art. 6(1)(f) GDPR (legitimate interest in the secure and efficient operation of the website). Vercel also uses a global CDN — static content may therefore be delivered via servers outside the EU.\n\nFurther information: vercel.com/legal/privacy-policy",
    },
    {
      label: "Cookies",
      heading: "Cookie Policy",
      body: "This website only uses technically necessary cookies that are required for the functionality of the site. No tracking and no analysis of your usage behaviour takes place. Therefore, no consent is required.",
    },
  ],
};

const DE = {
  title: "Impressum",
  sections: [
    {
      label: "§ 5 TMG",
      heading: "Impressum",
      body: "Juan Gomez-Vara\nDeutschland\nE-Mail: juangomezvara@gmail.com",
    },
    {
      label: "Haftung",
      heading: "Haftung für Links",
      body: "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen. Der jeweilige Anbieter oder Betreiber der Seiten ist stets für deren Inhalte verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft — rechtswidrige Inhalte waren dabei nicht erkennbar.",
    },
    {
      label: "Urheberrecht",
      heading: "Urheberrechtshinweis",
      body: "Die durch mich erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.\n\nSoweit Inhalte auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet und entsprechend gekennzeichnet. Sollten Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis — ich werde den betreffenden Inhalt umgehend entfernen.",
    },
    {
      label: "DSGVO",
      heading: "Datenschutzerklärung",
      body: "1. Verantwortliche Person\nJuan Gomez-Vara\nDeutschland\nE-Mail: juangomezvara@gmail.com\n\n2. Erhebung und Verarbeitung personenbezogener Daten\nBeim Besuch dieser Website werden vom Webserver automatisch technische Zugriffsdaten erfasst (z. B. IP-Adresse, Browsertyp, Datum und Uhrzeit). Diese Daten sind technisch erforderlich, um die Website korrekt darzustellen, und werden nicht genutzt, um Rückschlüsse auf Ihre Person zu ziehen. Eine weitergehende Verarbeitung findet nicht statt.\n\nWenn Sie mich per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.\n\n3. Weitergabe von Daten\nIhre Daten werden nicht an Dritte weitergegeben, sofern ich nicht gesetzlich dazu verpflichtet bin.\n\n4. Ihre Rechte\nSie haben das Recht, jederzeit Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger und Zweck der Verarbeitung zu erhalten. Außerdem haben Sie das Recht auf Berichtigung und — soweit die gesetzlichen Voraussetzungen vorliegen — auf Löschung oder Einschränkung der Verarbeitung Ihrer Daten (Art. 15–18 DSGVO).\n\nDarüber hinaus haben Sie das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), www.ldi.nrw.de.\n\nFür Anfragen wenden Sie sich bitte an die im Impressum angegebene Adresse. Ich antworte innerhalb von einem Monat.\n\n5. Hosting\nDiese Website wird gehostet von:\nVercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA\n\nDie Serverregion ist auf Frankfurt (fra1) eingestellt. Beim Aufruf der Website verarbeitet Vercel technische Zugriffsdaten (u. a. IP-Adresse, Browsertyp, Zeitstempel) auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und effizienten Betrieb). Vercel nutzt außerdem ein globales CDN — statische Inhalte können dabei auch über Server außerhalb der EU ausgeliefert werden.\n\nWeitere Informationen: vercel.com/legal/privacy-policy",
    },
    {
      label: "Cookies",
      heading: "Cookie-Hinweis",
      body: "Diese Website verwendet ausschließlich technisch notwendige Cookies, die für die Funktionsfähigkeit der Seite erforderlich sind. Es findet kein Tracking und keine Analyse Ihres Nutzungsverhaltens statt. Eine Einwilligung ist daher nicht erforderlich.",
    },
  ],
};

export function ImprintModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lang, setLang] = useState<"en" | "de">("en");
  const content = lang === "en" ? EN : DE;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="imprint-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={content.title}>
      <div className="imprint-panel" onClick={e => e.stopPropagation()}>
        <div className="imprint-topbar">
          <h2 className="imprint-title">{content.title}</h2>
          <div className="imprint-controls">
            <div className="imprint-lang-toggle">
              <button
                className={"imprint-lang-btn" + (lang === "en" ? " imprint-lang-active" : "")}
                onClick={() => setLang("en")}
              >EN</button>
              <button
                className={"imprint-lang-btn" + (lang === "de" ? " imprint-lang-active" : "")}
                onClick={() => setLang("de")}
              >DE</button>
            </div>
            <button className="imprint-close" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="imprint-body">
          {content.sections.map(s => (
            <div key={s.label} className="imprint-section">
              <span className="imprint-section-label">{s.label}</span>
              <h3 className="imprint-section-heading">{s.heading}</h3>
              <p className="imprint-section-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
