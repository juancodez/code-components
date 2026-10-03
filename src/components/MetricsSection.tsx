import { useState, useEffect, useRef } from "react"

const METRICS = [
  {
    value: "+508%",
    label: "increase in new user acquisitions",
    platform: "App Store · between February 2026 and May 2026",
    growth: "237 First-Time Downloads",
    signal: "Redesigned store presence improved discovery and install intent",
  },
  {
    value: "38",
    label: "Monthly Active Users",
    platform: "Google Play · last 28 days",
    growth: "+65% MAU growth · 57 active devices, +25%",
    signal: "Redesigned experience supports recurring engagement",
  },
  {
    value: "2.84%",
    label: "Download-to-Paid Rate",
    platform: "Day 35 post-download conversion",
    growth: "8 active subscription plans · +700% since launch",
    signal: "Freemium onboarding drives measurable revenue conversion",
  },
]

const DIGITS = "0123456789"

function useScramble(target: string, active: boolean, delay = 0) {
  const [display, setDisplay] = useState(target)
  const triggered = useRef(false)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!active || triggered.current) return
    triggered.current = true

    const t = window.setTimeout(() => {
      let frame = 0
      const totalFrames = 30
      const numericChars = target.replace(/[^0-9]/g, "").length || 1

      const tick = () => {
        frame++
        const progress = frame / totalFrames

        const result = target
          .split("")
          .map((char, i) => {
            if (!/[0-9]/.test(char)) return char
            const numericIndex = target.slice(0, i + 1).replace(/[^0-9]/g, "").length - 1
            const lockAt = (numericIndex / numericChars) * 0.55
            if (progress > lockAt + 0.4) return char
            return DIGITS[Math.floor(Math.random() * 10)]
          })
          .join("")

        setDisplay(result)

        if (frame < totalFrames) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(target)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(rafRef.current)
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  return display
}

function MetricItem({ value, label, platform, growth, signal, animate, index }: {
  value: string
  label: string
  platform: string
  growth: string
  signal: string
  animate: boolean
  index: number
}) {
  const display = useScramble(value, animate, index * 220)

  return (
    <div className="mc-metric-item">
      <p className="mc-metric-value">{display}</p>
      <p className="mc-metric-label">{label}</p>
      <p className="mc-metric-platform">{platform}</p>
      <p className="mc-metric-growth">{growth}</p>
      <p className="mc-metric-signal">{signal}</p>
    </div>
  )
}

export function MetricsSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="mc-metrics-wrap">
      <h2 className="mc-metrics-heading">Metrics from February to May 2026</h2>

      <p className="mc-metrics-desc">
        Following metrics across App Store and Google Play Store. The redesigned experience drove
        measurable growth across every tracked signal — from first-time downloads to paid conversions.
      </p>

      <div className="mc-metrics-list">
        {METRICS.map((m, i) => (
          <MetricItem
            key={i}
            {...m}
            animate={inView}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
