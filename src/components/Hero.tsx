"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

interface HeroProps {
  welcomeLabel?: string;
  titleLine1?: string;
  titleBoldPart?: string;
  titleLightPart?: string;
  subtitle?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  backgroundImage?: string;
  slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [
  {
    title: "Transformando vidas",
    subtitle: "Un lugar donde tu vida es transformada por el poder de Dios.",
    backgroundImage: "/Hero Background.png",
    ctaLabel: "Conecta",
    ctaHref: "#conecta",
    ctaSecondaryLabel: "Conoce mas",
    ctaSecondaryHref: "#conoce",
  },
  {
    title: "Comunidad que impacta",
    subtitle: "Se parte de una familia que esta cambiando la ciudad.",
    backgroundImage: "https://images.unsplash.com/photo-1722520478058-f4ae69dba56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    ctaLabel: "Grupos",
    ctaHref: "#grupos",
  },
];

export function Hero({
  welcomeLabel = "BIENVENIDO A",
  titleLine1 = "Iglesia",
  titleBoldPart = "re",
  titleLightPart = "voluciona",
  subtitle = "Un lugar donde tu vida es transformada.",
  ctaPrimaryLabel = "Conecta",
  ctaPrimaryHref = "#conecta",
  ctaSecondaryLabel = "Conoce mas",
  ctaSecondaryHref = "#conoce",
  backgroundImage = "/Hero Background.png",
  slides,
}: HeroProps) {
  const [current, setCurrent] = useState(0);
  const heroSlides = slides || defaultSlides;
  const totalSlides = heroSlides.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      {/* Desktop: Original hero layout */}
      <section className="hidden md:block relative w-full h-[600px] lg:h-[720px] bg-[var(--bg-dark)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A0A0AEE 0%, #0A0A0A44 35%, #0A0A0A22 60%, #0A0A0ABB 100%)' }} />
        <div className="relative flex flex-col justify-center h-full px-10 lg:px-[80px] gap-8">
          <span className="font-display text-[16px] font-semibold text-[var(--brand-primary)] tracking-[4px]">
            {welcomeLabel}
          </span>
          <div className="flex flex-col">
            <span className="font-display text-[36px] font-light text-white tracking-[-0.5px]">
              {titleLine1}
            </span>
            <div className="flex items-end">
              <span className="font-display text-[72px] lg:text-[96px] font-black text-white tracking-[-3px] leading-[0.85]">
                {titleBoldPart}
              </span>
              <span className="font-display text-[72px] lg:text-[96px] font-light text-white tracking-[-3px] leading-[0.85]">
                {titleLightPart}
              </span>
            </div>
          </div>
          <p className="font-body text-[20px] text-white/80 max-w-[500px]">
            {subtitle}
          </p>
          <div className="flex flex-row gap-4">
            <a
              href={ctaPrimaryHref}
              className="flex items-center justify-center px-10 py-4 rounded-[8px] bg-[var(--brand-primary)] font-display text-[16px] font-bold text-white hover:brightness-110 transition-all"
            >
              {ctaPrimaryLabel}
            </a>
            <a
              href={ctaSecondaryHref}
              className="flex items-center justify-center px-10 py-4 rounded-[8px] border-[1.5px] border-[var(--brand-primary)] font-display text-[16px] font-medium text-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-colors"
            >
              {ctaSecondaryLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Mobile: Carousel hero */}
      <section className="block md:hidden relative w-full bg-[var(--bg-dark)] overflow-hidden">
        <div className="relative w-full h-[420px]">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A0A0AEE 0%, #0A0A0A44 35%, #0A0A0A22 60%, #0A0A0ABB 100%)' }} />

              {/* Content */}
              <div className="relative flex flex-col justify-end h-full px-6 pb-6 gap-3">
                {i === 0 ? (
                  <>
                    <span className="font-display text-[12px] font-semibold text-[var(--brand-primary)] tracking-[4px]">
                      {welcomeLabel}
                    </span>
                    <div className="flex flex-col -mt-1">
                      <span className="font-display text-[24px] font-light text-white tracking-[-0.5px]">
                        {titleLine1}
                      </span>
                      <div className="flex items-end">
                        <span className="font-display text-[56px] font-black text-white tracking-[-3px] leading-[0.85]">
                          {titleBoldPart}
                        </span>
                        <span className="font-display text-[56px] font-light text-white tracking-[-3px] leading-[0.85]">
                          {titleLightPart}
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-[14px] text-white/70 leading-[1.5]">
                      {subtitle}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-[28px] font-extrabold text-white tracking-[-1px] leading-[1.1]">
                      {slide.title}
                    </h2>
                    <p className="font-body text-[14px] text-white/70 leading-[1.5]">
                      {slide.subtitle}
                    </p>
                  </>
                )}

                {/* CTAs */}
                <div className="flex flex-col gap-2.5 mt-1">
                  {slide.ctaLabel && (
                    <a
                      href={slide.ctaHref || "#"}
                      className="flex items-center justify-center w-full py-3.5 rounded-[8px] bg-[var(--brand-primary)] font-display text-[14px] font-bold text-white"
                    >
                      {slide.ctaLabel}
                    </a>
                  )}
                  {slide.ctaSecondaryLabel && (
                    <a
                      href={slide.ctaSecondaryHref || "#"}
                      className="flex items-center justify-center w-full py-3.5 rounded-[8px] border-[1.5px] border-[var(--brand-primary)] font-display text-[14px] font-medium text-[var(--brand-primary)]"
                    >
                      {slide.ctaSecondaryLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-[36px] h-[36px] rounded-full bg-black/40 backdrop-blur-sm z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-[36px] h-[36px] rounded-full bg-black/40 backdrop-blur-sm z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 bg-[var(--bg-dark)]">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-[8px] h-[8px] rounded-full transition-all ${
                  i === current
                    ? "bg-[var(--brand-primary)] w-[20px]"
                    : "bg-white/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
