'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface PageEntranceProps {
  children: React.ReactNode;
  className?: string;
}

export function PageEntrance({ children, className = '' }: PageEntranceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for cinematic deceleration
      }}
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directionOffsets = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: 0.98,
        filter: 'blur(6px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Smooth cinematic bezier curve
      }}
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}
