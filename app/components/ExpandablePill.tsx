"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ExpandablePillProps = {
  collapsedSrc: string;
  expandedSrc: string;
  alt: string;
  height?: number;
  collapsedWidth?: number;
  expandedWidth?: number;
  expandMs?: number;
  collapseMs?: number;
  minOpenMs?: number;
  extraHoldMs?: number;

  className?: string;
};

export function ExpandablePill({
  collapsedSrc,
  expandedSrc,
  alt,
  height = 48,
  collapsedWidth = 68,
  expandedWidth = 260,
  expandMs = 550,
  collapseMs = 450,
  minOpenMs = 650,
  extraHoldMs = 120,
  className = "",
}: ExpandablePillProps) {
  const [expanded, setExpanded] = useState(false);

  const openedAtRef = useRef<number>(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const open = () => {
    clearCloseTimer();
    openedAtRef.current = Date.now();
    setExpanded(true);
  };

  const scheduleClose = () => {
    const elapsed = Date.now() - openedAtRef.current;
    const wait = Math.max(minOpenMs - elapsed, 0) + extraHoldMs;

    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setExpanded(false);
    }, wait);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <span
      tabIndex={0}
      aria-label={alt}
      onPointerEnter={open}
      onPointerLeave={scheduleClose}
      onFocus={open}
      onBlur={scheduleClose}
      className={[
        "relative inline-flex align-middle shrink-0 overflow-hidden rounded-full",
        "cursor-pointer select-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70",
        "transition-[width] motion-reduce:transition-none",
        className,
      ].join(" ")}
      style={{
        width: expanded ? expandedWidth : collapsedWidth,
        height,
        transitionDuration: `${expanded ? expandMs : collapseMs}ms`,
        transitionTimingFunction: expanded
          ? "cubic-bezier(.2,.9,.2,1)"
          : "cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* Imagem “normal” (fica visível quando recolhida) */}
      <Image
        src={collapsedSrc}
        alt={alt}
        fill
        sizes={`${expandedWidth}px`}
        className={[
          "object-cover object-center transition-opacity",
          expanded ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />

      {/* Imagem “expandida” (aparece quando expande) */}
      <Image
        src={expandedSrc}
        alt={alt}
        fill
        sizes={`${expandedWidth}px`}
        className={[
          "object-cover object-center transition-opacity",
          expanded ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </span>
  );
}
