import { useEffect, useState } from "react"

interface Section {
  id: string
  label: string
}

interface CaseStudyNavProps {
  sections: Section[]
}

export function CaseStudyNav({ sections }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const handleScroll = () => {
      setVisible(window.scrollY > 120)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    const activeMap: Record<string, boolean> = {}

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          activeMap[id] = entry.isIntersecting
          const first = sections.find((s) => activeMap[s.id])
          if (first) setActiveId(first.id)
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      className={`csn${visible ? " csn--visible" : ""}`}
      aria-label="Page sections"
    >
      <div className="csn-panel">
        {sections.map(({ id, label }) => {
          const isActive = activeId === id
          return (
            <button
              key={id}
              className={`csn-item${isActive ? " csn-item--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              <span className={`csn-dot${isActive ? " csn-dot--active" : ""}`} />
              <span className="csn-label">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
