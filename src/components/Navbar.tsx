"use client";

import { useState } from "react";
import Image from "next/image";
import type { NavLink } from "@/lib/types";
import { SearchOverlay } from "./SearchOverlay";
import { UserMenu } from "./UserMenu";
import { MapModal } from "./MapModal";

const fallbackLinks = [
  { label: "Donar", href: "https://regiven.vercel.app/" },
  { label: "Servicios", href: "#servicios" },
  { label: "Conexion", href: "#conexion" },
  { label: "Nosotros", href: "/nosotros" },
];

interface NavbarProps {
  links?: NavLink[];
  searchPlaceholder?: string;
}

export function Navbar({ links, searchPlaceholder = "Buscar" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const navLinks = links && links.length > 0 ? links : fallbackLinks;

  return (
    <>
      <nav className="relative flex items-center justify-between w-full h-[70px] md:h-[80px] px-6 md:px-10 lg:px-[80px] bg-[var(--bg-dark)]">
        {/* Desktop: Logo */}
        <a href="/" className="hidden md:block">
          <Image
            src="/Artboard 1 copy.png"
            alt="Iglesia Revoluciona"
            width={180}
            height={40}
            className="object-contain h-[36px] w-auto invert"
            priority
          />
        </a>

        {/* Mobile: Logo */}
        <a href="/" className="flex md:hidden items-center h-full">
          <Image
            src="/logo1.png"
            alt="Iglesia Revoluciona"
            width={32}
            height={32}
            className="object-contain w-[28px] h-[28px] invert"
            priority
          />
        </a>

        {/* Desktop: Nav Links + Visitanos */}
        <div className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[14px] font-medium text-[var(--text-inverted)] hover:opacity-80 transition-opacity"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setMapOpen(true)}
            className="flex items-center justify-center px-6 py-2.5 rounded-[6px] bg-[var(--brand-primary)] font-display text-[13px] font-bold text-white hover:brightness-110 transition-all cursor-pointer"
          >
            Visitanos
          </button>
          <SearchOverlay placeholder={searchPlaceholder} />
          <UserMenu />
        </div>

        {/* Mobile: Visitanos button + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMapOpen(true)}
            className="flex items-center justify-center px-4 py-2 rounded-[6px] bg-[var(--brand-primary)] font-display text-[11px] font-bold text-white cursor-pointer"
          >
            Visitanos
          </button>
          <SearchOverlay placeholder={searchPlaceholder} className="w-[36px]" compact />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center gap-[5px] w-[36px] h-[36px]"
            aria-label="Menu"
          >
            <span className={`block w-[20px] h-[2px] bg-[var(--text-inverted)] transition-all ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-[20px] h-[2px] bg-[var(--text-inverted)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[20px] h-[2px] transition-all ${menuOpen ? "-rotate-45 -translate-y-[7px] bg-[var(--text-inverted)]" : "bg-[var(--brand-primary)]"}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full flex flex-col bg-[var(--bg-dark)] border-t border-white/10 z-50 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-[15px] font-medium text-[var(--text-inverted)] px-6 py-4 hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 px-6 py-4 border-t border-white/10">
              <UserMenu />
            </div>
          </div>
        )}
      </nav>

      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
    </>
  );
}
