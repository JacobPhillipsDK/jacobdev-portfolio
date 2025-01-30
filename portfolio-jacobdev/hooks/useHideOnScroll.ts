"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

export function useHideOnScroll(opts?: {
  upDelay?: number;
  downDelay?: number;
  topEpsilon?: number;
}) {
  const { upDelay = 12, downDelay = 12, topEpsilon = 8 } = opts || {};
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const accRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (y) => {
    const lastY = lastYRef.current;
    const delta = y - lastY;
    lastYRef.current = y;

    setAtTop(y <= topEpsilon);

    if (delta > 0) {
      accRef.current += delta;
      if (accRef.current >= downDelay && !hidden) {
        setHidden(true);
        accRef.current = 0;
      }
    } else if (delta < 0) {
      accRef.current += -delta;
      if (accRef.current >= upDelay && hidden) {
        setHidden(false);
        accRef.current = 0;
      }
    }
  });

  return { hidden, atTop };
}
