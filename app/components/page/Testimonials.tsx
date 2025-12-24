"use client";

import { useMemo, useRef, useState } from "react";

type Testimonial = {
  initial: string;
  name: string;
  role: string;
  quote: string;
};

const VISIBLE_COUNT = 2;
const ITEM_HEIGHT = 140;

export default function Testimonials() {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        initial: "J",
        name: "Joana M., paciente",
        role: "Paciente",
        quote:
          "Antes do VitalScore™, eu só descobria que minha pressão subia quando quando já estava mal. Agora recebo alertas e sigo orientações antes de piorar.",
      },
      {
        initial: "R",
        name: "Dr. Rafael Costa",
        role: "Geriatra",
        quote:
          "Uso a plataforma com meus pacientes idosos. A previsibilidade me ajuda a agir antes da urgência.",
      },
      {
        initial: "M",
        name: "Mariana S.",
        role: "Enfermeira",
        quote:
          "Uso a plataforma com meus pacientes idosos. A previsibilidade me ajuda a agir antes da urgência.",
      },
      {
        initial: "L",
        name: "Lucas P.",
        role: "Paciente",
        quote:
          "Uso a plataforma com meus pacientes idosos. A previsibilidade me ajuda a agir antes da urgência.",
      },
      {
        initial: "A",
        name: "Ana C.",
        role: "Nutricionista",
        quote:
          "Uso a plataforma com meus pacientes idosos. A previsibilidade me ajuda a agir antes da urgência.",
      },
      {
        initial: "C",
        name: "Carla R.",
        role: "Paciente",
        quote:
          "Uso a plataforma com meus pacientes idosos. A previsibilidade me ajuda a agir antes da urgência.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const maxIndex = Math.max(0, testimonials.length - VISIBLE_COUNT);

  function next() {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }

  function prev() {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }

  const startYRef = useRef(0);
  const lastYRef = useRef(0);
  const startTimeRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const rafRef = useRef<number | null>(null);
  const pendingOffsetRef = useRef(0);

  function setOffsetRaf(value: number) {
    pendingOffsetRef.current = value;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      setDragOffset(pendingOffsetRef.current);
      rafRef.current = null;
    });
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
    startYRef.current = e.clientY;
    lastYRef.current = e.clientY;
    startTimeRef.current = performance.now();
    setOffsetRaf(0);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    if (pointerIdRef.current !== e.pointerId) return;

    lastYRef.current = e.clientY;

    const rawDy = e.clientY - startYRef.current;

    const maxDrag = ITEM_HEIGHT * 0.9;
    const dy = Math.max(-maxDrag, Math.min(maxDrag, rawDy));

    setOffsetRaf(dy);
  }

  function endDrag() {
    if (!isDragging) return;

    const dy = pendingOffsetRef.current;
    const dt = Math.max(1, performance.now() - startTimeRef.current);
    const velocity = dy / dt;

    const distanceThreshold = Math.max(40, ITEM_HEIGHT * 0.25);
    const flickVelocity = 0.8;

    const swipeUp = dy < -distanceThreshold || velocity < -flickVelocity;
    const swipeDown = dy > distanceThreshold || velocity > flickVelocity;

    setIsDragging(false);
    setDragOffset(0);
    pendingOffsetRef.current = 0;

    if (swipeUp) next();
    else if (swipeDown) prev();
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current === e.pointerId) pointerIdRef.current = null;
    endDrag();
  }

  function onPointerCancel(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current === e.pointerId) pointerIdRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
    pendingOffsetRef.current = 0;
  }

  const translateY = -index * ITEM_HEIGHT + dragOffset;

  return (
    <section className="max-w-260 mx-auto py-22">
      <h3 className="text-primary font-bold text-center px-10">
        +10 mil sinais vitais <span className="font-normal">monitorados </span>
        98% <span className="font-normal">de precisão em alertas</span>{" "}
        preventivos
      </h3>

      <div className="mt-20 grid grid-cols-[80px_1fr] gap-10 items-center">
        <h4 className="[writing-mode:vertical-rl] rotate-180 text-secondary font-medium">
          DEPOIMENTOS
        </h4>

        <div className="relative">
          <div
            className="
              overflow-hidden select-none
              touch-none cursor-grab active:cursor-grabbing
            "
            style={{ height: ITEM_HEIGHT * VISIBLE_COUNT }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <div
              className={[
                "will-change-transform",
                isDragging
                  ? "transition-none"
                  : "transition-transform duration-500 ease-in-out",
              ].join(" ")}
              style={{ transform: `translateY(${translateY}px)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="flex items-center border-b py-5"
                  style={{ height: ITEM_HEIGHT }}
                >
                  <div className="w-full flex gap-28">
                    {/* Nome e cargo */}
                    <div className="w-45">
                      <div className="h-10 w-10 rounded-full text-20 figtree bg-accent flex items-center justify-center text-secondary font-medium">
                        {t.initial}
                      </div>

                      <div className="mt-2">
                        <div className="text-20 figtree font-medium text-secondary">
                          {t.name}
                        </div>
                        <div className="text-secondary font-light">
                          {t.role}
                        </div>
                      </div>
                    </div>

                    {/* Depoimento */}
                    <p className="text-18 flex items-center max-w-108 text-[#bcbcbc]">
                      “{t.quote}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Próximos depoimentos"
            className="mx-auto mt-8 flex items-center justify-center text-secondary/60 hover:text-secondary hover:cursor-pointer transition"
          >
            <svg
              width="28"
              height="18"
              viewBox="0 0 28 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 hover:translate-y-0.5"
            >
              <path
                d="M2 2L14 14L26 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
