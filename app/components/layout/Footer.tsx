"use client";

import Image from "next/image";
import { useMemo } from "react";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "../icons/social";
type NavItem = { href: string; label: string };

export default function Footer() {
  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "#quem-somos", label: "Quem somos" },
      { href: "#como-funciona", label: "Como funciona" },
      { href: "#passo-a-passo", label: "Passo a passo" },
      { href: "#pra-quem-e", label: "Pra quem é" },
      {
        href: "#planos-e-modelos-de-acesso",
        label: "Planos e modelo de acesso",
      },
      { href: "#depoimentos", label: "Depoimentos" },
      { href: "#perguntas-frequentes", label: "Perguntas frequentes" },
    ],
    []
  );

  return (
    <footer className="bg-primary pt-12 pb-22 text-white">
      <div className="container px-5 space-y-10 md:flex md:justify-between md:gap-10 lg:gap-0">
        <div className="xl:w-[48%] md:w-1/2 w-full space-y-8 text-center md:text-left">
          <Image
            src="/logo-footer.png"
            alt="Logo Vital Signs"
            width={280}
            height={82}
            className="mx-auto md:mx-0"
          />
          <p className="text-12 font-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="xl:w-[40%] lg:w-[45%] md:w-1/2 w-full text-center md:text-left md:flex md:justify-start lg:gap-17 gap-5">
          <p className="md:text-11">Sobre a Vital Signs</p>

          <div className="mt-4 md:mt-0 flex items-start justify-center md:justify-start gap-3">
            <Image
              src="/arrow-right.svg"
              alt="seta"
              width={29}
              height={17}
              className="hidden md:block"
            />

            <nav className="flex flex-col gap-4 items-center md:items-start">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-light text-14 md:text-16 md:-mt-1.25"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="container px-5 pt-17 pb-2 border-b border-span/8 space-y-8 text-center md:space-y-0 md:flex md:justify-between md:text-left gap-10 lg:gap-0">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-center lg:w-[48%] md:w-1/2">
          <div className="flex gap-5 items-center justify-center md:justify-start">
            <a className="text-14">Baixe o app</a>
            <Image src="/arrow-right.svg" alt="seta" width={29} height={17} />
          </div>

          <div className="flex flex-col items-center space-y-2 lg:space-y-0 lg:flex-row lg:gap-5">
            <Image
              className="hover:cursor-pointer"
              width={140}
              height={30}
              src="/logo-google-play.svg"
              alt="Baixar na Google Play"
            />
            <Image
              className="hover:cursor-pointer"
              width={140}
              height={30}
              src="/logo-apple.svg"
              alt="Baixar na App Store"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-end md:items-center md:w-1/2 lg:w-[40%] lg:gap-15">
          <p className="text-11">Siga a gente nas redes sociais</p>

          <div className="flex gap-3 items-center justify-center md:justify-start">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-grid size-9 place-items-center leading-none text-white transition-colors hover:text-blue-light"
            >
              <InstagramIcon className="block size-5" />
            </a>

            <a className="inline-grid size-9 place-items-center leading-none text-white transition-colors hover:text-blue-light">
              <LinkedInIcon className="block size-5 " />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="inline-grid size-9 place-items-center leading-none text-white transition-colors hover:text-blue-light"
            >
              <YouTubeIcon className="block size-5 translate-y-0.5 transition-transform duration-200 ease-out group-hover:scale-110" />
            </a>
          </div>
        </div>
      </div>

      <div className="container px-5 text-8 pt-2 sm:text-start space-y-3 text-center sm:flex justify-between">
        <p>© 2025 Vital Signs. Todos os direitos reservados.</p>
        <div className="flex justify-center sm:justify-start gap-4 font-light">
          <a href="#">Termos de Serviço</a>
          <a href="#">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
