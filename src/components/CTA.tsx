"use client";

import { useState } from "react";
import { MapModal } from "./MapModal";

interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonPrimaryLabel?: string;
  buttonSecondaryLabel?: string;
  buttonSecondaryHref?: string;
}

export function CTA({
  title = "Se parte de la revolucion",
  subtitle = "Tu historia importa. Ven y descubre lo que Dios tiene preparado para ti.",
  buttonPrimaryLabel = "Visitanos este domingo",
  buttonSecondaryLabel = "Contactanos",
  buttonSecondaryHref = "#contacto",
}: CTAProps) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <section className="relative w-full h-[400px] md:h-[500px] bg-[var(--bg-dark)] overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1722520478058-f4ae69dba56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
          }}
        />

        {/* Radial Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.87)_0%,_rgba(0,0,0,1)_100%)]" />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full px-6 md:px-10 lg:px-[80px] gap-6 md:gap-8">
          <h2 className="font-display text-[32px] md:text-[44px] lg:text-[56px] font-extrabold text-[var(--text-inverted)] tracking-[-1.5px] text-center">
            {title}
          </h2>
          <p className="font-body text-[15px] md:text-[18px] text-white/[0.67] text-center max-w-[600px]">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setMapOpen(true)}
              className="flex items-center justify-center px-8 md:px-12 py-4 rounded-full bg-[var(--bg-primary)] font-display text-[14px] md:text-[16px] font-bold text-[var(--text-primary)] hover:bg-white/90 transition-colors cursor-pointer"
            >
              {buttonPrimaryLabel}
            </button>
            <a
              href={buttonSecondaryHref}
              className="flex items-center justify-center px-8 md:px-12 py-4 rounded-full border border-white/40 font-display text-[14px] md:text-[16px] font-medium text-white/80 hover:bg-white/10 transition-colors"
            >
              {buttonSecondaryLabel}
            </a>
          </div>
        </div>
      </section>

      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
    </>
  );
}
