"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import MenuHamburguer from "./MenuHamburguer";

type NavItem = { href: string; label: string };

export default function MenuHeader() {
  const [open, setOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "#quem-somos", label: "QUEM SOMOS" },
      { href: "#como-funciona", label: "COMO FUNCIONA" },
      { href: "#passo-a-passo", label: "PASSO A PASSO" },
      { href: "#pra-quem-e", label: "PRA QUEM É" },
      {
        href: "#planos-e-modelos-de-acesso",
        label: "PLANOS E MODELOS DE ACESSO",
      },
    ],
    []
  );

  return (
    <header className="bg-span">
      <div className="bg-layout rounded-b-[60px] px-5">
        <div className="container flex items-center justify-between py-7">
          {/* Logo */}
          <Image
            width={176}
            height={51}
            src="/logo.svg"
            alt="logo com a imagem de um coração e escrito Vital Signs"
            priority
          />

          {/* Menu desktop (>= lg) */}
          <nav className="hidden lg:flex gap-4 text-12 font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-opacity hover:opacity-80"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Badges desktop (>= lg) */}
          <div className="hidden xl:flex xl:gap-5 lg:grid lg:gap-2">
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

          {/* Botão mobile (< lg) */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary hover:cursor-pointer transition hover:opacity-90"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            {/* Ícone hambúrguer */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <MenuHamburguer
        open={open}
        onClose={() => setOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
