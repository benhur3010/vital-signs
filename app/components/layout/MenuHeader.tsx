"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import MenuHamburguer from "./MenuHamburguer";

type NavItem = { href: string; label: string };

const SCROLL_IDLE_MS = 600;

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

  const headerRef = useRef<HTMLElement | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const [headerH, setHeaderH] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const outerBgClass = scrolled ? "bg-transparent" : "bg-span";

  useEffect(() => {
    const measure = () => setHeaderH(headerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (open) return;

      const y = window.scrollY || 0;
      const isScrolled = y > 8;
      setScrolled(isScrolled);

      if (!isScrolled) {
        setVisible(true);
        if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
        return;
      }

      setVisible(false);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);

      scrollTimerRef.current = window.setTimeout(() => {
        setVisible(true);
      }, SCROLL_IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, [open]);

  const innerBgClass = scrolled
    ? "bg-[rgba(255,255,255,0.37)] backdrop-blur-[18px] border-b border-light shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
    : "bg-layout";

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed top-0 left-0 w-full z-999",
          outerBgClass,
          "transform-gpu transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className={["px-5 rounded-b-[60px]", innerBgClass].join(" ")}>
          <div className="container flex items-center justify-between py-7">
            <Image
              width={176}
              height={51}
              src="/logo.svg"
              alt="logo com a imagem de um coração e escrito Vital Signs"
              priority
              className="hover:cursor-pointer"
            />

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

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary hover:cursor-pointer transition hover:opacity-90"
              aria-label="Abrir menu"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                setVisible(true);
                setOpen(true);
              }}
            >
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
      </header>

      {/* spacer pra não cobrir o conteúdo */}
      <div aria-hidden style={{ height: headerH }} />

      <MenuHamburguer
        open={open}
        onClose={() => setOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
