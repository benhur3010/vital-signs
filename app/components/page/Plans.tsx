"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

type XY = { x: number; y: number };
type ResponsivePos = { lg: XY };

type Callout = {
  id: string;
  img: string;
  alt: string;
  anchor: ResponsivePos; // bolinha no "braço"
  card: ResponsivePos; // posição do card (centro)
  depth: number; // intensidade do parallax
  w: number;
  h: number;
  variant: "plain" | "glass";
  attach?: { x: number; y: number };
  attachOffsetPx?: { x?: number; y?: number };
  stopAtCardEdge?: boolean;
  stopPaddingPx?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Plans() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});
  const dotRefs = useRef<Record<string, SVGCircleElement | null>>({});

  const GLASS_BLUR = 6.16;
  const GLASS_BG = "rgba(246, 246, 246, 0.15)";
  const BORDER_THICKNESS = 0.88;
  const BORDER_GRADIENT =
    "linear-gradient(180deg, rgba(252,252,252,0.45) 0%, rgba(216,215,215,0.45) 100%)";
  const GLASS_RADIUS = 14;
  const CALLOUTS = useMemo<Callout[]>(
    () => [
      {
        id: "oxigenacao",
        img: "/plans/oxigenacao-do-sangue.png",
        alt: "Oxigenação do sangue",
        anchor: { lg: { x: 91, y: 67 } },
        card: { lg: { x: 88, y: 60 } },
        depth: 0.9,
        w: 138,
        h: 95,
        variant: "plain",
        attach: { x: -0.4, y: 0 },
        attachOffsetPx: { y: -10 },
      },
      {
        id: "distancia",
        img: "/plans/distancia-caminhada.png",
        alt: "Distância caminhada",
        anchor: { lg: { x: 56, y: 72 } },
        card: { lg: { x: 67, y: 67 } },
        depth: 0.75,
        w: 108,
        h: 108,
        variant: "glass",
        attach: { x: 0, y: -0.5 },
        attachOffsetPx: { y: 10 },
        stopAtCardEdge: true,
        stopPaddingPx: 0,
      },
      {
        id: "distancia2",
        img: "/plans/distancia-caminhada-2.png",
        alt: "Distância caminhada 2",
        anchor: { lg: { x: 80, y: 74 } },
        card: { lg: { x: 87, y: 87 } },
        depth: 1.0,
        w: 110,
        h: 97,
        variant: "glass",
        attach: { x: 0.5, y: 1 },
        attachOffsetPx: { y: -50 },
        stopAtCardEdge: true,
        stopPaddingPx: 0,
      },
    ],
    []
  );

  function segmentRectEntry(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    left: number,
    top: number,
    right: number,
    bottom: number
  ): { x: number; y: number } | null {
    const dx = x2 - x1;
    const dy = y2 - y1;

    let u1 = 0;
    let u2 = 1;

    const p = [-dx, dx, -dy, dy];
    const q = [x1 - left, right - x1, y1 - top, bottom - y1];

    for (let i = 0; i < 4; i++) {
      const pi = p[i];
      const qi = q[i];

      if (pi === 0) {
        if (qi < 0) return null;
        continue;
      }

      const u = qi / pi;
      if (pi < 0) u1 = Math.max(u1, u);
      else u2 = Math.min(u2, u);

      if (u1 > u2) return null;
    }

    return { x: x1 + u1 * dx, y: y1 + u1 * dy };
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const isLg = () => window.innerWidth >= 1024;

    let rect = section.getBoundingClientRect();
    const updateRect = () => {
      rect = section.getBoundingClientRect();
    };

    const ro = new ResizeObserver(updateRect);
    ro.observe(section);
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);

    const draw = (shiftX: number, shiftY: number) => {
      if (!isLg()) return;

      for (const c of CALLOUTS) {
        const a = c.anchor.lg;
        const k = c.card.lg;

        const x1 = (rect.width * a.x) / 100;
        const y1 = (rect.height * a.y) / 100;

        const cx = (rect.width * k.x) / 100 + shiftX * c.depth;
        const cy = (rect.height * k.y) / 100 + shiftY * c.depth;

        const ax = c.attach?.x ?? 0.5;
        const ay = c.attach?.y ?? 0.5;

        const ox = (ax - 0.5) * c.w + (c.attachOffsetPx?.x ?? 0);
        const oy = (ay - 0.5) * c.h + (c.attachOffsetPx?.y ?? 0);

        const x2Target = cx + ox;
        const y2Target = cy + oy;

        let x2 = x2Target;
        let y2 = y2Target;

        if (c.stopAtCardEdge) {
          const left = cx - c.w / 2;
          const right = cx + c.w / 2;
          const top = cy - c.h / 2;
          const bottom = cy + c.h / 2;

          const entry = segmentRectEntry(
            x1,
            y1,
            x2Target,
            y2Target,
            left,
            top,
            right,
            bottom
          );
          if (entry) {
            const pad = c.stopPaddingPx ?? 6;

            const dx = x2Target - x1;
            const dy = y2Target - y1;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;

            x2 = entry.x - ux * pad;
            y2 = entry.y - uy * pad;
          }
        }

        const line = lineRefs.current[c.id];
        const dot = dotRefs.current[c.id];

        if (line) {
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute("x2", String(x2));
          line.setAttribute("y2", String(y2));
        }
        if (dot) {
          dot.setAttribute("cx", String(x1));
          dot.setAttribute("cy", String(y1));
        }

        const cardEl = cardRefs.current[c.id];
        if (cardEl) {
          cardEl.style.transform = `translate(-50%, -50%) translate3d(${
            shiftX * c.depth
          }px, ${shiftY * c.depth}px, 0)`;
        }
      }
    };

    draw(0, 0);

    if (reducedMotion || !canHover) {
      const onResize = () => {
        updateRect();
        draw(0, 0);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        ro.disconnect();
        window.removeEventListener("scroll", updateRect);
        window.removeEventListener("resize", updateRect);
      };
    }

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (!isLg()) return;

      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      target.x = clamp(nx, -1, 1);
      target.y = clamp(ny, -1, 1);
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    const MAX_SHIFT = 18;

    const tick = () => {
      if (!isLg()) {
        target.x = 0;
        target.y = 0;
        current.x = 0;
        current.y = 0;
        raf = requestAnimationFrame(tick);
        return;
      }

      current.x = lerp(current.x, target.x, 0.08);
      current.y = lerp(current.y, target.y, 0.08);

      draw(current.x * MAX_SHIFT, current.y * MAX_SHIFT);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, [CALLOUTS]);

  const GlassImage = ({
    src,
    alt,
    w,
    h,
  }: {
    src: string;
    alt: string;
    w: number;
    h: number;
  }) => {
    return (
      <div
        style={{
          width: w,
          height: h,
          borderRadius: GLASS_RADIUS,
          overflow: "hidden",

          border: `${BORDER_THICKNESS}px solid transparent`,
          background: `
          linear-gradient(${GLASS_BG}, ${GLASS_BG}) padding-box,
          ${BORDER_GRADIENT} border-box
        `,

          backdropFilter: `blur(${GLASS_BLUR}px) saturate(1.15)`,
          WebkitBackdropFilter: `blur(${GLASS_BLUR}px) saturate(1.15)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          className="block h-full w-full object-contain"
          priority={false}
        />
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative 2xl:h-430 h-380 overflow-hidden"
      id="planos-e-modelos-de-acesso"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/plans/bg-plano-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="md:hidden object-cover object-center"
        />

        <Image
          src="/plans/bg-plano.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-fill"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black via-black/60 to-transparent z-10" />

      <div className="absolute inset-0 z-20 hidden lg:block">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CALLOUTS.map((c) => (
            <g key={c.id} filter="url(#softGlow)">
              <line
                ref={(el) => {
                  lineRefs.current[c.id] = el;
                }}
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.95"
              />
              <circle
                ref={(el) => {
                  dotRefs.current[c.id] = el;
                }}
                r="5"
                fill="white"
              />
            </g>
          ))}
        </svg>

        {CALLOUTS.map((c) => {
          const pos = c.card.lg;

          return (
            <div
              key={c.id}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[c.id] = el;
                }}
                className="pointer-events-auto -translate-x-1/2 -translate-y-1/2 will-change-transform"
              >
                {c.variant === "glass" ? (
                  <GlassImage src={c.img} alt={c.alt} w={c.w} h={c.h} />
                ) : (
                  <Image
                    src={c.img}
                    alt={c.alt}
                    width={c.w}
                    height={c.h}
                    className="block h-auto w-auto drop-shadow-md"
                    priority={false}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-30 max-w-230 mx-auto 2xl:pt-19 pt-5 text-center">
        <h2>
          Invista na{" "}
          <Image
            src="/plans/relogio-pulso.png"
            alt="pessoa praticando esporte"
            width={68}
            height={48}
            className="inline-block align-middle h-12 w-17"
            priority={false}
          />{" "}
          <br />
          <Image
            src="/plans/fone-de-ouvido.png"
            alt="coração"
            width={68}
            height={48}
            className="inline-block align-middle h-12 w-17"
            priority={false}
          />{" "}
          sua saúde!
        </h2>

        <div className="flex flex-col lg:flex-row gap-15 lg:gap-0 lg:justify-between items-center text-start 2xl:mt-25 mt-20 min-h-125 text-secondary">
          <div className="md:w-105 pt-8 mx-5 md:mx-0 px-10 pb-11 bg-white rounded-2xl space-y-5">
            <h4 className="text-primary font-bold">PLANO FREE</h4>
            <p>
              Acompanhe seus sinais vitais e histórico de saúde de forma
              independente, com acesso ao{" "}
              <span className="font-bold">VitalScore™ básico.</span>
            </p>
            <h4 className="text-primary font-extrabold">Grátis</h4>
            <ul className="space-y-2">
              {[
                "Monitoramento de sinais vitais",
                "Histórico de saúde pessoal",
                "VitalScoreTM básico",
              ].map((item) => (
                <li
                  key={item}
                  className="relative pl-5 before:absolute before:left-0 before:top-0 before:content-['✓'] before:text-primary before:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-3 border border-primary text-primary rounded-full hover:cursor-pointer hover:bg-primary hover:text-white transition duration-300 py-1 px-3">
              Baixe o App <span className="ml-2">→</span>
            </button>
          </div>

          <div className="md:w-115 pt-8 mx-5 md:mx-0 px-10 pb-4 bg-accent rounded-2xl space-y-5 relative">
            <h4 className="text-primary font-bold">PLANO ASSINATURA</h4>
            <p>
              Receba{" "}
              <span className="font-bold">
                acompanhamento por profissionais de saúde,
              </span>{" "}
              alertas avançados e relatórios preditivos{" "}
              <span className="font-bold">integrados ao seu médico</span>
              ou plano de saúde.
            </p>
            <h4 className="text-primary font-extrabold">R$ 200/mês</h4>
            <ul className="space-y-2">
              {[
                "Tudo do Plano Free",
                "Acompanhamento por profissionais de saúde",
                "Alertas avançados",
                "Relatórios preditivos completos",
                "Integração com seu médico/plano de saúde",
              ].map((item) => (
                <li
                  key={item}
                  className="relative pl-5 before:absolute before:left-0 before:top-0 before:content-['✓'] before:text-primary before:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-3 text-white bg-primary hover:bg-secondary rounded-full hover:cursor-pointer transition duration-300 py-1.5 px-3">
              Baixe o App <span className="ml-2">→</span>
            </button>

            <div className="absolute bg-span fitgree py-1 px-5 rounded-full -top-5 lg:right-0">
              RECOMENDADO
            </div>
            <div className="absolute bg-blue-light text-primary fitgree py-1 px-5 rounded-full md:-bottom-7 right-8">
              Em breve integração com planos e operadoras
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
