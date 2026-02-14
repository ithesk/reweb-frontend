import Image from "next/image";
import type { FooterColumn } from "@/lib/types";

const fallbackColumns = [
  {
    title: "NOSOTROS",
    links: [
      { label: "Nuestra Mision", href: "#" },
      { label: "Vision y Valores", href: "#" },
      { label: "Pastores", href: "#" },
    ],
  },
  {
    title: "SERVICIOS",
    links: [
      { label: "Dominicales", href: "#" },
      { label: "Grupos de Vida", href: "#" },
      { label: "Jovenes", href: "#" },
    ],
  },
  {
    title: "REDES",
    links: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
];

interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
  copyright?: string;
  privacyLabel?: string;
  privacyHref?: string;
  termsLabel?: string;
  termsHref?: string;
}

export function Footer({
  columns,
  tagline = "Transforma tu vida, construyendo comunidad, levantando propositos.",
  copyright = "\u00A9 2026 Iglesia Revoluciona.",
  privacyLabel = "Privacidad",
  privacyHref = "#",
  termsLabel = "Terminos",
  termsHref = "#",
}: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : fallbackColumns;

  return (
    <footer className="flex flex-col gap-10 md:gap-16 w-full px-6 md:px-10 lg:px-[80px] pt-16 md:pt-[80px] pb-8 md:pb-[40px] bg-[var(--bg-dark)]">
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-5 w-full md:w-[320px]">
          <Image
            src="/logo1.png"
            alt="Iglesia Revoluciona"
            width={48}
            height={48}
            className="object-contain w-[40px] h-[40px] md:w-[48px] md:h-[48px] invert"
          />
          <p className="font-body text-[14px] text-[var(--text-muted)] leading-[1.6] max-w-[340px]">
            {tagline}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-8 md:gap-[80px]">
          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-display text-[12px] font-bold text-[var(--brand-primary)] tracking-[2px]">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[14px] text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--border-strong)]" />

      {/* Bottom */}
      <div className="flex flex-col items-center gap-3 w-full">
        <span className="font-body text-[12px] text-[var(--text-muted)]">
          {copyright}
        </span>
        <div className="flex gap-6">
          <a
            href={privacyHref}
            className="font-body text-[12px] text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors"
          >
            {privacyLabel}
          </a>
          <a
            href={termsHref}
            className="font-body text-[12px] text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors"
          >
            {termsLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
