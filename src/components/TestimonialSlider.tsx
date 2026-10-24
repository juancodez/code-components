import { useState } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { RiDoubleQuotesR, RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import "../MicrocasingApp.css";
import "./TestimonialSlider.css";

const DATA = [
  {
    quote:
      "In over 10 years of design leadership, I've hired hundreds of designers and taught many more, and Juan stands out. He makes up for it with energy, ownership, curiosity, drive, and diligence. He's a real go-getter.",
    name: "Karolina Skali Skalska",
    role: "Director, Personio",
    company: "prev. Head of UX @ Shopify · Director UX @ Delivery Hero",
    initials: "KS",
    linkedIn: "https://www.linkedin.com/in/karolina-skali-skalska-a4920052/",
    img: "/skali.jpg",
    metrics: [] as { value: string; label: string }[],
  },
  {
    quote:
      "I got to know Juan as an exceptionally warm and team-oriented person. He brought great energy and managed to connect the whole team. He showed a lot of curiosity and courage, and with 'Supply Pro' developed a thoughtful project that skillfully combines his culinary background with smart product thinking.",
    name: "Markus Otten-Gambalat",
    role: "Head of Design Bootcamps",
    company: "Digitale Leute School",
    initials: "MO",
    linkedIn: "https://www.linkedin.com/in/gambalat/?isSelfProfile=false",
    img: "/markus.png",
    metrics: [] as { value: string; label: string }[],
  },
  {
    quote:
      "I worked with Juan for my app's (Micro-casing) UX/UI design. Juan was very thorough and very professional, and I had a great time working with him. His discipline in learning about the customer journey in the industry related to the app was very much appreciated.",
    name: "Shankar Ananth",
    role: "CEO, Cerebral Games",
    company: "Former McKinsey & Bain Consultant",
    initials: "SA",
    linkedIn: "https://www.linkedin.com/in/shankarananth8/",
    img: "/shankar.webp",
    metrics: [
      { value: "+508%", label: "user acquisitions" },
      { value: "2.84%", label: "conversion rate" },
      { value: "4 wks",  label: "sprint delivery"  },
    ],
  },
];

export function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"left" | "right">("right");
  const t = DATA[idx];

  function go(next: number) {
    setDir(next > idx ? "right" : "left");
    setIdx(next);
  }

  return (
    <section className="tslider-section">
      <div className="tslider-inner">
        <div className="tslider-card-row">
          <button
            className="tslider-btn"
            onClick={() => go(Math.max(0, idx - 1))}
            disabled={idx === 0}
            aria-label="Previous testimonial"
          >
            <RiArrowLeftLine size={16} />
          </button>

        <div className="tblock-wrap" key={idx} data-dir={dir}>
          <div className="tblock-card">
            <div className="tblock-accent" aria-hidden="true" />
            <RiDoubleQuotesR className="tblock-icon" aria-hidden="true" />
            <blockquote className="tblock-quote">{t.quote}</blockquote>
            <SeparatorPrimitive.Root className="tblock-separator" decorative />
            <div className="tblock-footer">
              <div className="tblock-author">
                <AvatarPrimitive.Root className="tblock-avatar">
                  <AvatarPrimitive.Image src={t.img} alt={t.name} className="tblock-avatar-img" />
                  <AvatarPrimitive.Fallback className="tblock-avatar-fallback">
                    {t.initials}
                  </AvatarPrimitive.Fallback>
                </AvatarPrimitive.Root>
                <div className="tblock-author-info">
                  <a
                    href={t.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tblock-name"
                  >
                    {t.name}
                  </a>
                  <span className="tblock-role">
                    {t.role},{" "}
                    <span className="tblock-company">{t.company}</span>
                  </span>
                </div>
              </div>
              {t.metrics.length > 0 && (
                <div className="tblock-metrics">
                  {t.metrics.map(m => (
                    <div key={m.label} className="tblock-metric">
                      <span className="tblock-metric-value">{m.value}</span>
                      <span className="tblock-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

          <button
            className="tslider-btn"
            onClick={() => go(Math.min(DATA.length - 1, idx + 1))}
            disabled={idx === DATA.length - 1}
            aria-label="Next testimonial"
          >
            <RiArrowRightLine size={16} />
          </button>
        </div>

        <div className="tslider-dots">
          {DATA.map((_, i) => (
            <button
              key={i}
              className={`tslider-dot${i === idx ? " tslider-dot--active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
