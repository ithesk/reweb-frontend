"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import type { NavLink } from "@/lib/types";
import { SearchOverlay } from "./SearchOverlay";
import { UserMenu } from "./UserMenu";

const fallbackLinks = [
  { label: "Donar", href: "https://regiven.vercel.app/" },
  { label: "Grupos", href: "#grupos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
];

interface NavbarProps {
  links?: NavLink[];
  searchPlaceholder?: string;
}

export function Navbar({ links, searchPlaceholder = "Buscar" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = links && links.length > 0 ? links : fallbackLinks;

  return (
    <nav className="relative flex items-center justify-between w-full h-[70px] md:h-[80px] px-6 md:px-10 lg:px-[80px] bg-[var(--bg-dark)]">
      {/* Logo */}
      <div className="flex items-center gap-3 h-full">
        <Image
          src="/logo1.png"
          alt="Iglesia Revoluciona"
          width={110}
          height={110}
          className="object-contain invert w-[80px] h-[80px] md:w-[110px] md:h-[110px]"
        />
      </div>

      {/* Nav Links — desktop */}
      <div className="hidden md:flex items-center gap-10 h-full">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-body text-[14px] font-medium text-[var(--text-inverted)] hover:opacity-80 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Search + Profile — desktop */}
      <div className="hidden md:flex items-center gap-4 h-full">
        <SearchOverlay placeholder={searchPlaceholder} />
        <UserMenu />
      </div>

      {/* Hamburger — mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex md:hidden items-center justify-center w-[40px] h-[40px]"
        aria-label="Menu"
      >
        {menuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

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
            <SearchOverlay placeholder={searchPlaceholder} className="flex-1" />
            <UserMenu />
          </div>
        </div>
      )}
    </nav>
  );
}
