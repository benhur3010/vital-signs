"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type CardItem = {
  title: string;
  description: string;
  imageSrc: string;
  iconSrc: string;
  iconAlt: string;
};

export default function WhoIsItFor() {
  const cards = useMemo<CardItem[]>(
    () => [
      {
        title: "Monitoramento da Melhor Idade",
        description: "Acompanhe o bem-estar e a autonomia de quem você ama.",
        imageSrc: "/who-is-it-for/monitoramento-melhor-idade.png",
        iconSrc: "/who-is-it-for/monitoramento-icone.png",
        iconAlt: "Indicadores",
      },
      {
        title: "Doenças Crônicas",
        description: "Viva melhor com suporte remoto e dados contínuos.",
        imageSrc: "/who-is-it-for/doencas-cronicas.png",
        iconSrc: "/who-is-it-for/monitoramento-icone.png",
        iconAlt: "Indicadores",
      },
      {
        title: "Medicina Preditiva e Preventiva",
        description: "Antecipe riscos e evite emergências com VitalScore™.",
        imageSrc: "/who-is-it-for/medicina-preditiva.png",
        iconSrc: "/who-is-it-for/monitoramento-icone.png",
        iconAlt: "Indicadores",
      },
      {
        title: "Gestação",
        description: "Mais segurança para a mãe e bebê em cada fase.",
        imageSrc: "/who-is-it-for/gestacao.png",
        iconSrc: "/who-is-it-for/monitoramento-icone.png",
        iconAlt: "Indicadores",
      },
      {
        title: "Vital Corporativo",
        description: "Saúde preventiva para equipes e redução de absenteísmo",
        imageSrc: "/who-is-it-for/monitoramento-melhor-idade.png",
        iconSrc: "/who-is-it-for/monitoramento-icone.png",
        iconAlt: "Indicadores",
      },
    ],
    []
  );

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [pages, setPages] = useState(1);
  const [thumbLeftPct, setThumbLeftPct] = useState(0);
  const [thumbWidthPct, setThumbWidthPct] = useState(100);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const getGap = () => {
      const cs = getComputedStyle(el);
      const gapStr = cs.columnGap || cs.gap || "0px";
      const n = Number.parseFloat(gapStr);
      return Number.isFinite(n) ? n : 0;
    };

    const getStep = () => {
      const first = el.querySelector<HTMLElement>("[data-card]");
      if (!first) return 0;
      return first.offsetWidth + getGap();
    };

    const compute = () => {
      const step = getStep();
      if (!step) {
        setThumbWidthPct(100);
        setThumbLeftPct(0);
        return;
      }

      const gap = getGap();
      const visible = Math.max(1, Math.floor((el.clientWidth + gap) / step));
      const pgs = Math.max(1, cards.length - visible + 1);

      setPages(pgs);
      setThumbWidthPct(100 / pgs);

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0 || pgs === 1) {
        setThumbLeftPct(0);
        return;
      }

      const ratio = el.scrollLeft / maxScroll;
      let idx = Math.round(ratio * (pgs - 1));
      idx = Math.max(0, Math.min(pgs - 1, idx));

      setThumbLeftPct((idx * 100) / pgs);
    };

    compute();
    el.addEventListener("scroll", compute, { passive: true });

    const ro = new ResizeObserver(compute);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", compute);
      ro.disconnect();
    };
  }, [cards.length]);

  return (
    <section className=" bg-black pb-12">
      <div className="bg-span px-5 pt-15 pb-32 rounded-br-[180px]">
        <div className="container text-center">
          <h2 className="text-primary font-light">
            Seu corpo {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/who-is-it-for/homem-camisa-branca.png"
              alt="pessoa praticando esporte"
              className="inline-block align-middle h-12 w-17"
            />{" "}
            <span className="font-bold">fala.</span> <br />A{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/who-is-it-for/relogio.png"
              alt="coração"
              className="inline-block align-middle h-12 w-17"
            />{" "}
            <span className="font-bold">tecnologia</span> traduz.
          </h2>

          <div className="flex-col flex items-center mt-15 gap-2">
            <Image
              src="/who-is-it-for/icone-usuario.png"
              alt="Pessoa praticando esporte"
              width={53}
              height={53}
            />
            <h6 className="text-secondary font-bold">Usuários/Pacientes</h6>
          </div>
        </div>

        <div className="w-full mt-12 lg:max-w-[85%] lg:ml-auto">
          <div
            ref={scrollerRef}
            className={[
              "flex overflow-x-auto pb-6",
              "gap-4 sm:gap-6 lg:gap-8",
              "px-3 lg:px-0",
              isDragging ? "snap-none" : "snap-x snap-mandatory",
              "scroll-smooth",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              "cursor-grab active:cursor-grabbing select-none",
            ].join(" ")}
            onPointerDown={(e) => {
              const el = scrollerRef.current;
              if (!el) return;

              isDownRef.current = true;
              setIsDragging(true);

              startXRef.current = e.clientX;
              startScrollLeftRef.current = el.scrollLeft;
              (e.currentTarget as HTMLDivElement).setPointerCapture(
                e.pointerId
              );
            }}
            onPointerMove={(e) => {
              const el = scrollerRef.current;
              if (!el || !isDownRef.current) return;

              e.preventDefault();
              const dx = e.clientX - startXRef.current;
              el.scrollLeft = startScrollLeftRef.current - dx;
            }}
            onPointerUp={(e) => {
              isDownRef.current = false;
              setIsDragging(false);
              try {
                (e.currentTarget as HTMLDivElement).releasePointerCapture(
                  e.pointerId
                );
              } catch {}
            }}
            onPointerCancel={() => {
              isDownRef.current = false;
              setIsDragging(false);
            }}
          >
            {cards.map((item, idx) => (
              <article
                key={`${item.title}-${idx}`}
                data-card
                className="
    shrink-0 snap-start
    w-full sm:w-1/2 lg:w-80
    flex lg:block justify-center
  "
              >
                <div
                  className="
      relative h-112 overflow-hidden rounded-2xl
      w-full max-w-[320px] mx-auto
      sm:max-w-none
    "
                >
                  {/* Imagem de fundo */}
                  <Image
                    src={item.imageSrc}
                    alt={item.title.replace("\n", " ")}
                    fill
                    className="object-cover pointer-events-none"
                    priority={false}
                  />

                  {/* Conteúdo */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white text-left pointer-events-none">
                    <div className="mb-4 w-32">
                      <Image
                        src={item.iconSrc}
                        alt={item.iconAlt}
                        width={128}
                        height={76}
                        className="w-full h-auto"
                      />
                    </div>

                    <h6 className="max-w-42">{item.title}</h6>
                    <p className="mt-2 font-light">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="h-0.5 w-full bg-blue-extralight relative overflow-hidden">
            <div
              className="absolute top-0 h-0.5 bg-primary transition-[left] duration-200"
              style={{
                width: `${thumbWidthPct}%`,
                left: `${thumbLeftPct}%`,
              }}
            />
          </div>
        </div>

        <div className="container">
          <div className="flex-col flex items-center lg:my-18 my-10 gap-2">
            <Image
              src="/who-is-it-for/icone-estetoscopio.png"
              alt="Pessoa praticando esporte"
              width={53}
              height={53}
            />
            <h6 className="text-secondary font-bold">
              Profissionais e Operadoras
            </h6>
          </div>

          <div
            className="
    max-w-212 mx-auto
    flex flex-col items-center gap-6
    md:flex-row md:items-stretch md:gap-8
    lg:gap-12
  "
          >
            {/* CARD 1 */}
            <div
              className="
      group relative overflow-hidden rounded-2xl hover:cursor-pointer
      w-full max-w-100
      md:max-w-none md:flex-1 md:min-w-0
    "
            >
              <div
                className="
        absolute inset-0
        bg-[url('/who-is-it-for/profissionais-saude-clinica.png')]
        bg-cover bg-center bg-no-repeat
        transition-transform duration-500 ease-out
        group-hover:scale-[1.06]
      "
              />
              <div className="absolute inset-0 bg-black/0 transition-opacity duration-500 group-hover:bg-black/35" />

              <div className="relative z-10 flex h-120 flex-col justify-end p-4 md:p-5 lg:pl-6 lg:pb-4">
                <h6 className="leading-tight mb-2 text-sm md:text-base">
                  Profissionais de Saúde e Clínicas
                </h6>
                <p className="font-extralight leading-tight text-xs md:text-sm">
                  Melhore o desfecho clínico com dados objetivos em tempo real.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div
              className="
      group relative overflow-hidden rounded-2xl hover:cursor-pointer
      w-full max-w-100
      md:max-w-none md:flex-1 md:min-w-0
    "
            >
              <div
                className="
        absolute inset-0
        bg-[url('/who-is-it-for/planos-e-operadoras.png')]
        bg-cover bg-center bg-no-repeat
        transition-transform duration-500 ease-out
        group-hover:scale-[1.06]
      "
              />
              <div className="absolute inset-0 bg-black/0 transition-opacity duration-500 group-hover:bg-black/35" />

              <div className="relative z-10 flex h-120 flex-col justify-end p-4 md:p-5 lg:px-6 lg:pb-4">
                <h6 className="leading-tight mb-2 text-sm md:text-base">
                  Planos e Operadoras de Saúde
                </h6>
                <p className="font-extralight leading-tight text-xs md:text-sm">
                  Reduza custos com prevenção baseada em dados e maior adesão
                  dos beneficiários.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
