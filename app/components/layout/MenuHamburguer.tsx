"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef } from "react";

type NavItem = { href: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
};

export default function MenuHamburguer({ open, onClose, navItems }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement | null>(null);

  const focusablesSelector = useMemo(
    () =>
      [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(","),
    []
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(focusablesSelector)
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }

      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose, focusablesSelector]);

  useEffect(() => {
    const b = document.body;

    const lockBody = (lock: boolean) => {
      const html = document.documentElement;

      if (lock) {
        const scrollBarWidth = window.innerWidth - html.clientWidth;
        b.style.overflow = "hidden";
        if (scrollBarWidth > 0) b.style.paddingRight = `${scrollBarWidth}px`;
      } else {
        b.style.overflow = "";
        b.style.paddingRight = "";
      }
    };

    lockBody(open);

    if (open) {
      requestAnimationFrame(() => panelRef.current?.focus?.());
    }

    return () => lockBody(false);
  }, [open]);

  const closeAndNavigate = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-1000 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="mobile-menu"
        ref={(el) => {
          panelRef.current = el;
        }}
        className={[
          "fixed inset-y-0 right-0 z-1001 w-[88vw] max-w-95 bg-layout shadow-xl outline-none",
          "transition-transform duration-300 will-change-transform flex flex-col",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200">
          <h4 id={titleId} className="font-bold text-primary">
            Menu
          </h4>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center h-10 w-10 text-primary hover:text-secondary hover:cursor-pointer transition hover:opacity-90"
            aria-label="Fechar menu"
          >
            {/* Ícone X (sem lib) */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeAndNavigate}
                className="rounded-xl px-3 text-sm py-3 text-secondary font-semibold transition hover:bg-span"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl bg-span p-4">
            <p className="text-secondary font-semibold">Vital Signs</p>
            <p className="text-container text-12 mt-1">
              Acesse os tópicos acima ou baixe o app nos botões abaixo.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-6 bg-span rounded-t-2xl">
          <div className="flex gap-3 ">
            <a
              href="#planos-e-modelos-de-acesso"
              onClick={closeAndNavigate}
              className="w-full"
            >
              <div className="w-full p-3 transition bg-primary rounded-lg">
                <Image
                  width={140}
                  height={30}
                  src="/logo-google-play.svg"
                  alt="Baixar na Google Play"
                />
              </div>
            </a>

            <a
              href="#planos-e-modelos-de-acesso"
              onClick={closeAndNavigate}
              className="w-full"
            >
              <div className="w-full p-3 transition bg-primary rounded-lg">
                <Image
                  width={140}
                  height={30}
                  src="/logo-apple.svg"
                  alt="Baixar na App Store"
                />
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
