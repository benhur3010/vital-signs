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

      <div className="container pt-19 text-center">
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
      </div>
    </section>
  );
}
