"use client";

export default function Plans() {
  return (
    <section
      className="
        relative h-400
        bg-[url('/plans/bg-plano.png')] bg-no-repeat bg-cover bg-center
        overflow-hidden
      "
    >
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-28
          bg-linear-to-b from-black via-black/60 to-transparent
        "
      />

      <div className="max-w-230 mx-auto pt-19 text-center">
        <h2>
          Invista na {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/plans/relogio-pulso.png"
            alt="pessoa praticando esporte"
            className="inline-block align-middle h-12 w-17"
          />{" "}
          <br />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/plans/fone-de-ouvido.png"
            alt="coração"
            className="inline-block align-middle h-12 w-17"
          />{" "}
          sua saúde!
        </h2>

        <div className="flex flex-col lg:flex-row gap-15 lg:gap-0 lg:justify-between items-center text-start mt-25 min-h-125 text-secondary">
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
              Baixe o App
              <span className="ml-2">→</span>
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
              Baixe o App
              <span className="ml-2">→</span>
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
