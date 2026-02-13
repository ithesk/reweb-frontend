import Image from "next/image";
import type { FooterColumn } from "@/lib/types";

const fallbackColumns = [
  {
    title: "NOSOTROS",
    links: [
      { label: "Nuestra Historia", href: "#" },
      { label: "Vision y Mision", href: "#" },
      { label: "Pastores", href: "#" },
      { label: "Ubicaciones", href: "#" },
    ],
  },
  {
    title: "SERVICIOS",
    links: [
      { label: "Servicios Dominicales", href: "#" },
      { label: "Grupos de Vida", href: "#" },
      { label: "Jovenes", href: "#" },
      { label: "Donar", href: "#" },
    ],
  },
  {
    title: "REDES",
    links: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
];

interface FooterProps {
  columns?: FooterColumn[];
}

export function Footer({ columns }: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : fallbackColumns;

  return (
    <footer className="flex flex-col gap-10 md:gap-16 w-full px-6 md:px-10 lg:px-[80px] pt-16 md:pt-[80px] pb-8 md:pb-[40px] bg-[var(--bg-dark)]">
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-5 w-full md:w-[320px]">
          <Image
            src="/logo2.png"
            alt="Iglesia Revoluciona"
            width={200}
            height={56}
            className="object-contain object-left w-[160px] md:w-[200px]"
          />
          <p className="font-body text-[14px] text-[var(--text-muted)] leading-[1.5] max-w-[300px]">
            Transformando vidas, construyendo comunidad, impactando ciudades.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-[80px]">
          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-display text-[12px] font-bold text-[var(--text-inverted)] tracking-[2px]">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[14px] text-[var(--text-muted)] hover:text-white transition-colors"
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
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
        <span className="font-body text-[12px] text-[var(--text-muted)]">
          © 2026 Iglesia Revoluciona. Todos los derechos reservados.
        </span>
        <div className="flex gap-6">
          <a
            href="#"
            className="font-body text-[12px] text-[var(--text-muted)] hover:text-white transition-colors"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="font-body text-[12px] text-[var(--text-muted)] hover:text-white transition-colors"
          >
            Terminos
          </a>
        </div>
      </div>
    </footer>
  );
}
