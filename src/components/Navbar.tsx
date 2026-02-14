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
      {/* Mobile: Hamburger left */}
      <div className="flex md:hidden items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-[40px] h-[40px]"
          aria-label="Menu"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Desktop: Logo left */}
      <div className="hidden md:flex items-center gap-3 h-full">
        <Image
          src="/logo1.png"
          alt="Iglesia Revoluciona"
          width={110}
          height={110}
          className="object-contain invert w-[110px] h-[110px]"
        />
      </div>

      {/* Mobile: Logo center */}
      <div className="flex md:hidden items-center justify-center absolute left-1/2 -translate-x-1/2 h-full">
        <Image
          src="/logo1.png"
          alt="Iglesia Revoluciona"
          width={80}
          height={80}
          className="object-contain invert w-[70px] h-[70px]"
        />
      </div>

      {/* Desktop: Nav Links */}
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

      {/* Desktop: Search + Profile */}
      <div className="hidden md:flex items-center gap-4 h-full">
        <SearchOverlay placeholder={searchPlaceholder} />
        <UserMenu />
      </div>

      {/* Mobile: Search + Profile right */}
      <div className="flex md:hidden items-center gap-2">
        <SearchOverlay placeholder={searchPlaceholder} className="w-[36px]" compact />
        <UserMenu />
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
        </div>
      )}
    </nav>
  );
}
