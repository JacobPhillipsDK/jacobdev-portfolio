'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './style.module.scss';
import {
  motion,
  useMotionValue,
  useSpring,
  SpringOptions
} from 'framer-motion';

interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}

export default function Cursor() {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorSize = isPressed ? 21 : 15;
  const [isVisible, setIsVisible] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothOptions: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5
  };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  const manageResize = useCallback(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }
  }, []);

  const manageMouseMove = useCallback((e: MouseMoveEvent) => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }
    if (!isVisible) setIsVisible(true);

    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }, [isVisible, cursorSize, mouse.x, mouse.y]);

  const manageMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 2) return;
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', manageResize);
    document.body.addEventListener('mouseleave', manageMouseLeave, { passive: true });
    window.addEventListener('mousemove', manageMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('resize', manageResize);
      document.body.removeEventListener('mouseleave', manageMouseLeave);
      window.removeEventListener('mousemove', manageMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [manageResize, manageMouseLeave, manageMouseMove, handleMouseDown, handleMouseUp]);

  const template = ({ rotate, scaleX, scaleY }: { rotate: number; scaleX: number; scaleY: number }) => {
    return `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
      <div className={styles.cursorContainer}>
        <motion.div
            transformTemplate={template}
            style={{
              left: smoothMouse.x,
              top: smoothMouse.y,
              scaleX: mouse.x,
              scaleY: mouse.y
            }}
            animate={{
              width: cursorSize,
              height: cursorSize
            }}
            className={`${styles.cursor} ${isVisible ? styles.visible : styles.hidden}`}
            ref={cursor}
        ></motion.div>
      </div>
  );
}