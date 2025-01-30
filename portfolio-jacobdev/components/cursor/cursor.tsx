'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './style.module.scss';
import { motion, useMotionValue, useSpring, SpringOptions } from 'motion/react';

export default function Cursor() {
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorSize = isPressed ? 35 : 15;
  const pressScale = isPressed ? 0.9 : 1;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smooth: SpringOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, smooth);
  const y = useSpring(mouseY, smooth);

  const ensureFinePointer = useCallback(() => {
    setIsVisible(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    if (!window.matchMedia('(pointer: fine)').matches) return setIsVisible(false);
    if (!isVisible) setIsVisible(true);
    mouseX.set(e.clientX - cursorSize / 2);
    mouseY.set(e.clientY - cursorSize / 2);
  }, [isVisible, mouseX, mouseY, cursorSize]);

  const onDown = useCallback((e: MouseEvent) => {
    if (e.button !== 2) setIsPressed(true);
  }, []);

  const onUp = useCallback(() => setIsPressed(false), []);
  const onLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    ensureFinePointer();
    window.addEventListener('resize', ensureFinePointer);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.body.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('resize', ensureFinePointer);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.body.removeEventListener('mouseleave', onLeave);
    };
  }, [ensureFinePointer, onMove, onDown, onUp, onLeave]);

  return (
    <motion.div
      className={`${styles.cursor} ${isVisible ? styles.visible : styles.hidden}`}
      style={{ x, y, scale: pressScale, transformOrigin: 'center' }}
      animate={{ width: cursorSize, height: cursorSize }}
    />
  );
}
