import shankarImg from "../assets/shankar.webp"

export function SplitTestimonial() {
  return (
    <figure className="t2-figure">
      <blockquote className="t2-quote">
        <span className="t2-mark t2-mark--open" aria-hidden="true">"</span>
        <p className="t2-text">
          I worked with Juan for my app's (Micro-casing) UX/UI design. Juan was very thorough and very professional,
          and I had a great time working with him. His discipline in learning about the customer journey in the industry
          related to the app was very much appreciated.
        </p>
        <span className="t2-mark t2-mark--close" aria-hidden="true">"</span>
      </blockquote>

      <figcaption className="t2-caption">
        <span className="t2-line" aria-hidden="true" />
        <div className="t2-author">
          <img src={shankarImg} alt="Shankar Ananth" className="t2-avatar" />
          <div className="t2-author-text">
            <a
              href="https://www.linkedin.com/in/shankarananth8/"
              target="_blank"
              rel="noopener noreferrer"
              className="t2-name"
            >
              Shankar Ananth
            </a>
            <span className="t2-tagline">CEO, Cerebral Games · Former McKinsey and Bain Consultant</span>
          </div>
        </div>
      </figcaption>
    </figure>
  )
}
