const shankarImg = "/shankar.webp";

const testimonial = {
  quote:
    "I worked with Juan for my app's (Micro-casing) UX/UI design. Juan was very thorough and very professional, and I had a great time working with him. His discipline in learning about the customer journey in the industry related to the app was very much appreciated.",
  name: "Shankar Ananth",
  tagline: "CEO, Cerebral Games · Ex-Bain & McKinsey",
  linkedIn: "https://www.linkedin.com/in/shankarananth8/",
};

export function Testimonial2() {
  return (
    <>
      <div style={{ marginBottom: 0 }}>
        <div
          style={{
            width: 60, height: 60, borderRadius: "50%",
            overflow: "hidden", border: "2px solid rgba(0,0,0,0.12)",
            background: "#e2e8f0", flexShrink: 0,
          }}
        >
          <img
            src={shankarImg}
            alt={testimonial.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
          />
        </div>
      </div>
      <figure className="t2-figure" style={{ marginTop: 32 }}>
        <blockquote className="t2-quote">
          <span className="t2-mark t2-mark--open">"</span>
          <span className="t2-text">{testimonial.quote}</span>
          <span className="t2-mark t2-mark--close">"</span>
        </blockquote>
        <figcaption className="t2-caption">
          <div className="t2-author">
            <div className="t2-author-text">
              <a
                href={testimonial.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="t2-name"
              >
                {testimonial.name}
              </a>
              <span className="t2-tagline">{testimonial.tagline}</span>
            </div>
          </div>
        </figcaption>
      </figure>
    </>
  );
}
