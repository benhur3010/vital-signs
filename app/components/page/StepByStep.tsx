"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type FloatingImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

type Step = {
  title: string;
  body: string;
  mainImageSrc: string;
  mainImageAlt: string;
  topCard?: FloatingImage;
  bottomBadge?: FloatingImage;
};

export default function StepByStep() {
  const steps = useMemo<Step[]>(
    () => [
      {
        title: "Cadastre-se no App",
        body: "Baixe o aplicativo, crie seu perfil e informe seus dados de saúde.",
        mainImageSrc: "/step-by-step/cadastre-se.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/cadastre-se-relative.png",
          alt: "Card de métricas",
          width: 322,
          height: 157,
          className: "absolute md:top-0 md:bottom-auto bottom-0 md:right-0",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className:
            "absolute md:bottom-0 md:top-auto top-25 xl:right-40 md:right-30",
        },
      },
      {
        title: "Conecte seu Dispositivo",
        body: "Sincronize seu smartwatch e comece a registrar suas medições automaticamente.",
        mainImageSrc: "/step-by-step/conecte-seu-dispositivo.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/conecte-seu-dispositivo-relative.png",
          alt: "Card de métricas",
          width: 322,
          height: 137,
          className: "absolute md:-bottom-15 bottom-0 xl:left-70 md:left-90",
        },

        bottomBadge: {
          src: "/step-by-step/conecte-seu-dispositivo-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute md:top-0 top-25 xl:left-70 md:left-90",
        },
      },
      {
        title: "Acompanhe sua Saúde",
        body: "Acompanhe seus indicadores e receba alertas quando algo precisar de atenção.",
        mainImageSrc: "/step-by-step/acompanhe-sua-saude.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/cadastre-se-relative.png",
          alt: "Card de métricas",
          width: 200,
          height: 139,
          className: "absolute md:top-0 top-25 xl:right-54 md:right-28",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute bottom-0 xl:left-60 md:left-90",
        },
      },
      {
        title: "Conte com profissionais ao seu lado",
        body: "Médicos, nutricionistas e especialistas monitoram seus dados e enviam orientações personalizadas.",
        mainImageSrc: "/step-by-step/profissionais.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/profissionais-relative.png",
          alt: "Card de métricas",
          width: 322,
          height: 163,
          className: "absolute bottom-0 xl:right-10 md:right-0",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 131,
          height: 133,
          className:
            "absolute xl:top-25 md:top-45 top-30 xl:right-35 md:right-10",
        },
      },
      {
        title: "Previna e viva melhor",
        body: "Com o VitalScore™, nossa inteligência preditiva traduz seus sinais vitais em insights claros, ajudando você a prever e prevenir doenças.",
        mainImageSrc: "/step-by-step/previna.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/cadastre-se-relative.png",
          alt: "Card de métricas",
          width: 156,
          height: 133,
          className: "absolute md:bottom-30 bottom-0 xl:right-33 md:right-10",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute xl:top-0 md:top-5 top-35 xl:left-60 md:left-80",
        },
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [renderIndex, setRenderIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const timerRef = useRef<number | null>(null);

  function handleSelect(nextIndex: number) {
    if (nextIndex === activeIndex) return;

    setActiveIndex(nextIndex);

    setVisible(false);

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setRenderIndex(nextIndex);
      setVisible(true);
    }, 180);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const step = steps[renderIndex];

  return (
    <section className="container">
      <div className="px-5 lg:py-25 md:py-15 py-10">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Como funciona"
          className="
            flex flex-nowrap overflow-x-auto whitespace-nowrap
            justify-start
            gap-3 md:pb-0 pb-3 -mx-5 md:mx-0 px-3
            border-b border-blue-extralight
            scroll-px-5 scroll-smooth
            snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
            md:flex-wrap md:overflow-visible md:whitespace-normal md:px-0
            md:justify-center
            xl:justify-between
        "
        >
          {steps.map((s, i) => {
            const isActive = i === activeIndex;
            const number = String(i + 1).padStart(2, "0");

            return (
              <button
                key={s.title}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => handleSelect(i)}
                className={[
                  "snap-start transition-colors font-medium figtree hover:cursor-pointer",
                  "border-b-2 md:pb-5",
                  "px-4 py-2 rounded-full md:rounded-none",
                  "border-transparent md:border-b-2",
                  isActive
                    ? "bg-primary text-white md:bg-transparent md:text-primary md:border-primary"
                    : "bg-primary/5 text-primary/70 md:bg-transparent md:border-transparent hover:text-primary",
                ].join(" ")}
              >
                <span className="text-blue-light">{number}.</span>{" "}
                <span className="lg:whitespace-nowrap">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Contéudo das Tabs */}
        <div
          className={[
            "mt-15 xl:pt-10 md:pt-25 pb-7 transition-opacity duration-300 ease-in-out motion-reduce:transition-none max-w-210 justify-center xl:justify-start mx-auto relative md:flex items-center gap-25",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {/* Texto */}
          <p className="text-primary md:max-w-50 md:text-left text-center text-18 font-light pb-4 border-b border-blue-extralight">
            {step.body}
          </p>

          {/* Imagens */}
          <div className="flex justify-center mt-20 md:mt-0">
            <div className="w-83 h-100 rounded-[28px] overflow-hidden">
              <Image
                width={332}
                height={400}
                src={step.mainImageSrc}
                alt={step.mainImageAlt}
                priority={false}
                className="w-full h-full object-cover"
              />
            </div>

            {step.topCard && (
              <div
                className={step.topCard.className}
                style={{
                  width: step.topCard.width,
                  height: step.topCard.height,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-md backdrop-saturate-150"
                  />

                  <Image
                    src={step.topCard.src}
                    alt={step.topCard.alt}
                    fill
                    sizes={`${step.topCard.width}px`}
                    className="relative z-10 object-cover"
                  />
                </div>
              </div>
            )}

            {step.bottomBadge && (
              <div
                className={step.bottomBadge.className}
                style={{
                  width: step.bottomBadge.width,
                  height: step.bottomBadge.height,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-md backdrop-saturate-150"
                  />
                  <Image
                    src={step.bottomBadge.src}
                    alt={step.bottomBadge.alt}
                    fill
                    sizes={`${step.bottomBadge.width}px`}
                    className="relative z-10 object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
