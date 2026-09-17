import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useId, useState } from "react";
import "./LiquidToggle.css";

/* ══ LiquidToggle ═════════════════════════════════════════
   Two blobs, ONE POSITION between them. The thumb's x is a
   motion value — a click writes it, a spring settles it —
   and the drop is a spring FOLLOWING that value rather than
   the same target with a delay on it.

   That difference is the whole component. A delay describes
   a click and nothing else: the drop sets off late and lands
   where the thumb already was. A spring is always chasing
   wherever the thumb is NOW, so the pair stretches by
   exactly how fast you are moving it — flick it and the
   goo necks out behind, wait and it stays one shape.

   Both blobs are opaque on purpose: a goo filter over a
   translucent fill thresholds the alpha away and the shape
   disappears. */

type Props = {
  /* speed — 0 to 100 */
  speed?: number;
  /* how much it lengthens as it moves — 0 to 100 */
  stretch?: number;
  /* optional controlled state */
  on?: boolean;
  onToggle?: (v: boolean) => void;
};

const OFF_X = 4;
const ON_X = 48;

export function LiquidToggle({
  speed = 60,
  stretch = 60,
  on: onProp,
  onToggle,
}: Props) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const on = onProp ?? uncontrolled;

  /* Unique filter id per instance — two toggles on the same
     page would otherwise share the same goo layer and the
     second one would render into the first one's viewport. */
  const uid = useId().replace(/:/g, "");
  const gooId = `liq-goo-${uid}`;

  const x = useMotionValue(on ? ON_X : OFF_X);

  /* Speed → stiffness of both springs. High speed = snappy
     follow, tight goo. Low speed = lazy follow, long neck.
     The chase spring stays lazy on purpose so there's
     always a lag to blend AWAY from at stretch=0. */
  const chaseStiff = 90 + (speed / 100) * 220;
  const settleStiff = 200 + (speed / 100) * 260;

  const chase = useSpring(x, {
    stiffness: chaseStiff,
    damping: 20,
    mass: 1.6,
  });

  /* Stretch → how much of the chase lag actually shows.
     At 0, the drop rides ON the thumb, so both blobs share
     one position and the goo collapses to a single circle
     (no neck). At 100, the drop rides the raw chase spring
     (max lag → max neck). A motion value lets the slider
     retune this without remounting the springs. */
  const stretchMV = useMotionValue(stretch);
  useEffect(() => { stretchMV.set(stretch); }, [stretch, stretchMV]);

  const dropX = useTransform(
    [x, chase, stretchMV] as const,
    ([t, c, s]: number[]) => t + (c - t) * (s / 100)
  );

  useEffect(() => {
    /* Let go, and it lands. Damping fixed at 18 for a subtle
       overshoot — the squash lives in the easing, a drop
       that keeps a perfect circle the whole way is a ball
       not a liquid. */
    const c = animate(x, on ? ON_X : OFF_X, {
      type: "spring",
      stiffness: settleStiff,
      damping: 18,
      mass: 0.9,
    });
    return () => c.stop();
  }, [on, settleStiff, x]);

  const flip = () => {
    const next = !on;
    if (onProp === undefined) setUncontrolled(next);
    onToggle?.(next);
  };

  return (
    <>
      {/* The filter, shared by both blobs */}
      <svg className="liq-defs" aria-hidden="true" width="0" height="0">
        <filter id={gooId}>
          <feGaussianBlur stdDeviation="9" result="smear" />
          <feColorMatrix
            in="smear"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          />
        </filter>
      </svg>

      <button
        type="button"
        className={"liq" + (on ? " liq-on" : "")}
        role="switch"
        aria-checked={on}
        onClick={flip}
      >
        {/* The goo layer only wraps the blobs, not the track,
            so the track background stays crisp — the filter
            would eat it otherwise. */}
        <span className="liq-goo" style={{ filter: `url(#${gooId})` }}>
          <motion.span className="liq-drop" style={{ x: dropX }} />
          <motion.span className="liq-thumb" style={{ x }} />
        </span>
      </button>
    </>
  );
}
