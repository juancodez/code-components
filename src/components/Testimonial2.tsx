import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { RiDoubleQuotesR } from "@remixicon/react";
import shankarImg from "../assets/shankar.webp";

const testimonial = {
  quote:
    "I worked with Juan for my app's (Micro-casing) UX/UI design. Juan was very thorough and very professional, and I had a great time working with him. His discipline in learning about the customer journey in the industry related to the app was very much appreciated.",
  name: "Shankar Ananth",
  role: "CEO, Cerebral Games",
  company: "Former McKinsey & Bain Consultant",
  initials: "SA",
  linkedIn: "https://www.linkedin.com/in/shankarananth8/",
};

const metrics = [
  { value: "+508%", label: "user acquisitions" },
  { value: "2.84%", label: "conversion rate" },
  { value: "4 wks", label: "sprint delivery" },
];

export function Testimonial2() {
  return (
    <div className="tblock-wrap">
      <div className="tblock-card">
        <div className="tblock-accent" aria-hidden="true" />

        <RiDoubleQuotesR className="tblock-icon" aria-hidden="true" />

        <blockquote className="tblock-quote">{testimonial.quote}</blockquote>

        <SeparatorPrimitive.Root className="tblock-separator" decorative />

        <div className="tblock-footer">
          <div className="tblock-author">
            <AvatarPrimitive.Root className="tblock-avatar">
              <AvatarPrimitive.Image
                src={shankarImg}
                alt={testimonial.name}
                className="tblock-avatar-img"
              />
              <AvatarPrimitive.Fallback className="tblock-avatar-fallback">
                {testimonial.initials}
              </AvatarPrimitive.Fallback>
            </AvatarPrimitive.Root>

            <div className="tblock-author-info">
              <a
                href={testimonial.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="tblock-name"
              >
                {testimonial.name}
              </a>
              <span className="tblock-role">
                {testimonial.role},{" "}
                <span className="tblock-company">{testimonial.company}</span>
              </span>
            </div>
          </div>

          <div className="tblock-metrics">
            {metrics.map((m) => (
              <div key={m.label} className="tblock-metric">
                <span className="tblock-metric-value">{m.value}</span>
                <span className="tblock-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
