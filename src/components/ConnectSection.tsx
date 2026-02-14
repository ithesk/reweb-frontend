"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ConnectCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const fallbackCards: ConnectCard[] = [
  {
    title: "Grupos de Vida",
    subtitle: "Conecta con una comunidad cercana",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "#grupos",
  },
  {
    title: "Eventos",
    subtitle: "Participa en nuestras actividades",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "#eventos",
  },
  {
    title: "Streaming",
    subtitle: "Mira nuestros servicios en vivo",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "#streaming",
  },
  {
    title: "Donar",
    subtitle: "Apoya la mision de la iglesia",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "https://regiven.vercel.app/",
  },
];

interface ConnectSectionProps {
  title?: string;
  description?: string;
  cards?: ConnectCard[];
}

export function ConnectSection({
  title = "Descubre formas de conectarnos",
  description = "Siempre hay nuevas formas de participar en lo que Dios esta haciendo a traves de nuestra iglesia, incluyendo eventos, grupos, musica y mucho mas.",
  cards,
}: ConnectSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = cards && cards.length > 0 ? cards : fallbackCards;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 1;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => container.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    }
  };

  const scroll = (dir: "left" | "right") => {
    const next = dir === "left" ? activeIndex - 1 : activeIndex + 1;
    scrollToIndex(Math.max(0, Math.min(next, items.length - 1)));
  };

  return (
    <section className="w-full py-12 md:py-[80px] bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 px-6 md:px-10 lg:px-[80px] mb-8 md:mb-12">
        <h2 className="font-display text-[28px] md:text-[40px] lg:text-[48px] font-extrabold text-[var(--text-primary)] tracking-[-1px] leading-[1.1] text-center max-w-[600px]">
          {title}
        </h2>
        <p className="font-body text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6] text-center max-w-[500px]">
          {description}
        </p>
      </div>

      {/* Cards */}
      <div className="relative group">
        {/* Desktop arrows */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-[44px] h-[44px] rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-[44px] h-[44px] rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-[80px] lg:pr-[80px] scrollbar-none snap-x snap-mandatory"
        >
          {items.map((card, i) => (
            <a
              key={i}
              href={card.href}
              className="flex-shrink-0 w-[calc(100vw-80px)] md:w-[300px] snap-center rounded-2xl overflow-hidden relative"
            >
              <div className="relative w-full aspect-[3/4] md:h-[380px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                  <h3 className="font-display text-[20px] md:text-[20px] font-bold text-white leading-[1.2]">
                    {card.title}
                  </h3>
                  <p className="font-body text-[13px] text-white/60">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`h-[8px] rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-[var(--text-primary)] w-[20px]"
                : "bg-[var(--text-muted)]/30 w-[8px]"
            }`}
            aria-label={`Tarjeta ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
