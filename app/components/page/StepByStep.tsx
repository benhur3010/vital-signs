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
          className: "absolute top-0 right-0",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute bottom-0 right-40",
        },
      },
      {
        title: "Conecte seu Dispositivo",
        body: "Sincronize seu smartwatch e comece a registrar suas medições automaticamente.",
        mainImageSrc: "/step-by-step/conecte-seu-dispositivo.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/cadastre-se-relative.png",
          alt: "Card de métricas",
          width: 322,
          height: 137,
          className: "absolute bottom-0 left-70",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute top-0 left-70",
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
          className: "absolute top-0 right-54",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute bottom-0 left-60",
        },
      },
      {
        title: "Conte com profissionais ao seu lado",
        body: "Médicos, nutricionistas e especialistas monitoram seus dados e enviam orientações personalizadas.",
        mainImageSrc: "/step-by-step/profissionais.png",
        mainImageAlt: "Pessoa usando o aplicativo",

        topCard: {
          src: "/step-by-step/cadastre-se-relative.png",
          alt: "Card de métricas",
          width: 322,
          height: 163,
          className: "absolute bottom-0 right-10",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 131,
          height: 133,
          className: "absolute top-25 right-35",
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
          className: "absolute bottom-30 right-33",
        },

        bottomBadge: {
          src: "/step-by-step/cadastre-se-relative-detail.png",
          alt: "Ícones das lojas",
          width: 156,
          height: 133,
          className: "absolute top-0 left-60",
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
          className="flex flex-wrap gap-x-6 gap-y-4 border-b border-blue-extralight max-lg:justify-center lg:justify-between"
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
                  "pb-5 text-left transition-colors font-medium figtree",
                  "border-b-2 hover:cursor-pointer",
                  "lg:max-xl:last:w-full lg:max-xl:last:text-center",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-primary/70 hover:text-primary",
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
            "mt-15 pt-10 pb-7 transition-opacity duration-300 ease-in-out motion-reduce:transition-none max-w-210 mx-auto relative flex items-center gap-25",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {/* Texto */}
          <p className="text-primary max-w-50 text-18 font-light pb-4 border-b border-blue-extralight">
            {step.body}
          </p>

          {/* Imagens */}
          <div>
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
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={step.topCard.src}
                    alt={step.topCard.alt}
                    fill
                    sizes={`${step.topCard.width}px`}
                    className="object-cover"
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
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={step.bottomBadge.src}
                    alt={step.bottomBadge.alt}
                    fill
                    sizes={`${step.bottomBadge.width}px`}
                    className="object-cover"
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
