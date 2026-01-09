import Link from "next/link";

type Props = {
  href?: string;
  label?: string;
};

export default function SideFloatingButton({
  href = "/profissional-de-saude",
  label = "SOU PROFISSIONAL DE SAÚDE",
}: Props) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={[
        "fixed right-0 top-1/2 -translate-y-1/2",
        "z-50",
        "bg-primary text-white figtree text-13 font-bold",
        "rounded-l-2xl shadow-lg",
        "px-3 py-6",
        "hover:brightness-110 active:brightness-95 hover:scale-105 duration-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/0",
      ].join(" ")}
    >
      <span
        className={[
          "[writing-mode:vertical-rl] rotate-180",
          "text-xs font-semibold tracking-[0.2em]",
          "select-none",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}
