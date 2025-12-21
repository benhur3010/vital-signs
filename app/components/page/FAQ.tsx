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
          "Wearables são dispositivos vestíveis (como relógios e pulseiras inteligentes) que coletam dados do corpo em tempo real.",
      },
      {
        question: "Para quem o app é indicado?",
        answer:
          "Para pessoas que desejam acompanhar indicadores de saúde continuamente e compartilhar informações com profissionais quando necessário.",
      },
      {
        question: "Por que monitorar continuamente é importante?",
        answer:
          "Porque padrões e variações sutis podem indicar mudanças relevantes antes de sintomas se tornarem evidentes.",
      },
      {
        question: "Quais os benefícios?",
        answer:
          "Você acompanha seus sinais vitais com mais clareza, identifica tendências ao longo do tempo e pode compartilhar informações relevantes com seu médico para decisões mais rápidas e assertivas.",
      },
      {
        question: "Preciso usar o wearable o tempo todo?",
        answer:
          "Não necessariamente. Quanto mais tempo de uso, melhores as leituras e tendências, mas você pode usar conforme sua rotina. O ideal é manter uma frequência consistente para gerar comparações confiáveis.",
      },
      {
        question: "Quem tem acesso aos meus dados?",
        answer:
          "Somente você e as pessoas/profissionais que você autorizar dentro do app. Você controla os compartilhamentos e pode ajustar ou revogar permissões a qualquer momento.",
      },
      {
        question: "Quais marcas são compatíveis?",
        answer:
          "A compatibilidade depende do modelo e das integrações disponíveis no app. Na seção de dispositivos, você encontra a lista atualizada de marcas e modelos suportados e como conectá-los.",
      },
      {
        question: "Como escolho meu médico?",
        answer:
          "Você pode conectar um médico de confiança convidando-o pelo app (quando disponível) ou seguindo as opções de indicação/lista de profissionais integrados. O app guia o passo a passo de vínculo e autorização.",
      },
      {
        question: "Quanto custa?",
        answer:
          "O valor varia conforme o plano e as funcionalidades incluídas (por exemplo, recursos de acompanhamento e integração). Consulte a seção de Planos no site/app para ver preços e detalhes atualizados.",
      },
      {
        question: "Sou profissional de saúde. Como participar?",
        answer:
          "Você pode se cadastrar como profissional e solicitar participação na plataforma. A equipe valida as informações e, após aprovação, você poderá receber convites de pacientes e acompanhar dados conforme as permissões concedidas.",
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
