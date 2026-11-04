import { useRef, useEffect, useState } from "react"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerStyle?: React.CSSProperties
  strength?: number
}

export function ParallaxImg({ containerStyle, strength = 0.07, style, ...imgProps }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setOffset(center * strength)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [strength])

  // pull borderRadius + border onto the container so clipping is clean
  const { borderRadius, border, borderTop, borderBottom, borderLeft, borderRight, ...restStyle } = style ?? {}

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        borderRadius,
        border,
        borderTop,
        borderBottom,
        borderLeft,
        borderRight,
        ...containerStyle,
      }}
    >
      <img
        {...imgProps}
        style={{
          ...restStyle,
          transform: `translateY(${offset}px) scale(1.06)`,
          willChange: "transform",
          transformOrigin: "center",
        }}
      />
    </div>
  )
}
