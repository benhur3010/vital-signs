"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

function FaqToggleIcon({
  open,
  className = "",
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <Image
      src={open ? "/faq/menos.svg" : "/faq/mais.svg"}
      alt={open ? "Fechar" : "Abrir"}
      width={24}
      height={24}
      className={className}
    />
  );
}

export default function Faq() {
  const items = useMemo<FaqItem[]>(
    () => [
      {
        question: "Para que serve e como funciona o monitoramento remoto?",
        answer:
          "A Vital Signs coleta, interpreta e conecta seus sinais vitais a médicos de confiança, utilizando IA preditiva para transformar dados em cuidado.",
      },
      {
        question: "O que são wearables?",
        answer:
          "São dispositivos vestíveis (como smartwatches e pulseiras) capazes de medir frequência cardíaca, pressão, oxigenação e muito mais.",
      },
      {
        question: "Para quem o app é indicado?",
        answer:
          "Para quem busca prevenção, possui doenças crônicas, pratica esportes, está em gestação ou deseja viver com mais autonomia e segurança.",
      },
      {
        question: "Por que monitorar continuamente é importante?",
        answer:
          "Porque a saúde não espera. O monitoramento contínuo identifica alterações antes que se tornem emergências.",
      },
      {
        question: "Quais os benefícios?",
        answer:
          "Prevenção ativa, personalização do cuidado, autoconhecimento e melhor comunicação com profissionais de saúde.",
      },
      {
        question: "Preciso usar o wearable o tempo todo?",
        answer:
          "Não, mas quanto mais leituras diárias, maior a precisão do VitalScore™ e a qualidade das recomendações.",
      },
      {
        question: "Quem tem acesso aos meus dados?",
        answer:
          "Apenas você e os profissionais que autorizar. Todos os dados são protegidos conforme a LGPD.",
      },
      {
        question: "Quais marcas são compatíveis?",
        answer:
          "Apple Watch, Samsung, Fitbit, Oura Ring e outros via Health Connect (Android) e HealthKit (iOS).",
      },
      {
        question: "Como escolho meu médico?",
        answer:
          "Pelo app. Você define o profissional ou solicita que a Vital Signs convide seu médico para a plataforma.",
      },
      {
        question: "Quanto custa?",
        answer:
          "Modelo de assinatura mensal, com opção gratuita para uso independente.",
      },
      {
        question: "Sou profissional de saúde. Como participar?",
        answer:
          "Envie seu contato para vitalsigns@vitalsigns.com.br e integre-se à nossa rede de monitoramento inteligente.",
      },
    ],
    []
  );

  const faqId = useId();

  const [isFaqOpen, setIsFaqOpen] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq() {
    setIsFaqOpen((prev) => {
      const next = !prev;
      setOpenIndex(next ? 0 : null);
      return next;
    });
  }

  function toggleItem(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="bg-secondary text-white">
      <div className="container px-5 md:py-20 py-10">
        <div className="max-w-250 ml-auto">
          <button
            type="button"
            onClick={toggleFaq}
            aria-expanded={isFaqOpen}
            aria-controls={`${faqId}-content`}
            className="w-full text-left"
          >
            <div className="flex items-center gap-8">
              <h2>FAQ</h2>

              <span className="inline-flex">
                <FaqToggleIcon
                  open={isFaqOpen}
                  className="h-15 w-15 hover:cursor-pointer"
                />
              </span>
            </div>

            <div className="mt-5 border-b border-span/8" />
          </button>

          <div
            id={`${faqId}-content`}
            className={[
              "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out",
              isFaqOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            ].join(" ")}
          >
            <div className="min-h-0">
              <div className="divide-y divide-span/8">
                {items.map((item, index) => {
                  const isOpen = openIndex === index;
                  const number = String(index + 1).padStart(2, "0");
                  const itemPanelId = `${faqId}-item-${index}`;

                  return (
                    <div key={itemPanelId} className="py-10">
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        aria-expanded={isOpen}
                        aria-controls={`${itemPanelId}-panel`}
                        className="w-full"
                      >
                        <div className="flex md:gap-42 gap-5 items-start text-left">
                          <span>
                            <FaqToggleIcon
                              open={isOpen}
                              className="h-8 w-8 hover:cursor-pointer"
                            />
                          </span>

                          <div>
                            <div className="flex md:gap-9 gap-2">
                              <h6 className="text-accent">{number}.</h6>
                              <h6>{item.question}</h6>
                            </div>

                            <div
                              id={`${itemPanelId}-panel`}
                              className={[
                                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                                isOpen
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0",
                              ].join(" ")}
                            >
                              <div className="min-h-0">
                                <div className="grid grid-cols-[44px,72px,1fr] gap-3">
                                  <p className=" sm:text-18 text-14 font-extralight max-w-140 md:mt-12 mt-5 md:mb-8">
                                    {item.answer}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
