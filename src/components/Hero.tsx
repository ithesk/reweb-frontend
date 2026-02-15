"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

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
  slides,
}: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefDesktop = useRef<HTMLVideoElement>(null);
  const videoRefMobile = useRef<HTMLVideoElement>(null);
  const heroSlides = slides || defaultSlides;
  const totalSlides = heroSlides.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance carousel (pause on first slide while video plays)
  useEffect(() => {
    if (current === 0) return; // stay on video slide
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, current]);

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (videoRefDesktop.current) videoRefDesktop.current.muted = newMuted;
    if (videoRefMobile.current) videoRefMobile.current.muted = newMuted;
  };

  return (
    <>
      {/* Desktop */}
      <section className="hidden md:block relative w-full h-[600px] lg:h-[720px] bg-[var(--bg-dark)] overflow-hidden">
        <video
          ref={videoRefDesktop}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="/HOY.mp4"
          poster="/portadashek.jpg"
          playsInline
          autoPlay
          muted
          loop
        />

        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #0A0A0A66 0%, #0A0A0A99 100%)' }} />

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-10 flex items-center justify-center w-[48px] h-[48px] rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        <div className="relative flex flex-col items-center justify-center h-full text-center gap-3">
          <span className="font-display text-[13px] font-semibold text-[var(--brand-primary)] tracking-[5px] uppercase">
            {welcomeLabel}
          </span>
          <div className="flex flex-col items-center">
            <span className="font-display text-[28px] font-light text-white/90 tracking-[1px]">
              {titleLine1}
            </span>
            <div className="flex items-end">
              <span className="font-display text-[64px] lg:text-[80px] font-black text-white tracking-[-2px] leading-[0.9]">
                {titleBoldPart}
              </span>
              <span className="font-display text-[64px] lg:text-[80px] font-light text-white/90 tracking-[-2px] leading-[0.9]">
                {titleLightPart}
              </span>
            </div>
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
              {i === 0 ? (
                <video
                  ref={videoRefMobile}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/HOY.mp4"
                  poster="/portadashek.jpg"
                  playsInline
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
                />
              )}
              <div className="absolute inset-0" style={{ background: i === 0 ? 'radial-gradient(ellipse at center, #0A0A0A55 0%, #0A0A0A88 100%)' : 'linear-gradient(to bottom, #0A0A0AEE 0%, #0A0A0A44 35%, #0A0A0A22 60%, #0A0A0ABB 100%)' }} />

              {/* Content */}
              <div className={`relative flex flex-col h-full px-6 gap-3 ${i === 0 ? "items-center justify-center text-center" : "justify-end pb-6"}`}>
                {i === 0 ? (
                  <>
                    <span className="font-display text-[11px] font-semibold text-[var(--brand-primary)] tracking-[5px] uppercase">
                      {welcomeLabel}
                    </span>
                    <div className="flex flex-col items-center -mt-1">
                      <span className="font-display text-[20px] font-light text-white/90 tracking-[1px]">
                        {titleLine1}
                      </span>
                      <div className="flex items-end">
                        <span className="font-display text-[48px] font-black text-white tracking-[-2px] leading-[0.9]">
                          {titleBoldPart}
                        </span>
                        <span className="font-display text-[48px] font-light text-white/90 tracking-[-2px] leading-[0.9]">
                          {titleLightPart}
                        </span>
                      </div>
                    </div>
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

                {/* CTAs (hidden on video slide) */}
                {i !== 0 && (
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
                )}
              </div>

              {/* Mute button on first slide */}
              {i === 0 && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-20 right-4 z-10 flex items-center justify-center w-[40px] h-[40px] rounded-full bg-black/50 backdrop-blur-sm border border-white/20"
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                >
                  {muted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              )}
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
