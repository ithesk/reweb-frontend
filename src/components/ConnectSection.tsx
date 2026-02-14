"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface ConnectCard {
  tag?: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const fallbackCards: ConnectCard[] = [
  {
    tag: "FAMILIAS",
    title: "Familias Unidas",
    subtitle:
      "Un espacio para fortalecer los lazos familiares y crecer juntos en fe y amor.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "#grupos",
  },
  {
    tag: "JOVENES",
    title: "Generacion RE",
    subtitle:
      "Disenado para la nueva generacion. Musica, comunidad y un mensaje que transforma.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "#eventos",
  },
  {
    tag: "GRUPOS DE VIDA",
    title: "Grupos de Vida",
    subtitle:
      "Conectate en comunidad a traves de grupos pequenos. Un espacio intimo para crecer.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "#streaming",
  },
  {
    tag: "VOLUNTARIADO",
    title: "Sirve con Nosotros",
    subtitle:
      "Descubre como puedes marcar la diferencia sirviendo con tus dones y talentos.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    href: "https://regiven.vercel.app/",
  },
];

interface ConnectSectionProps {
  label?: string;
  title?: string;
  description?: string;
  cards?: ConnectCard[];
}

const CARD_W = 300;
const CARD_H = 400;
const GAP = 16;

export function ConnectSection({
  label = "CONEXION",
  title = "Encuentra tu comunidad",
  description = "Espacios disenados para cada etapa de tu vida. Conectate y forma parte de una familia.",
  cards,
}: ConnectSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const items = cards && cards.length > 0 ? cards : fallbackCards;
  const [active, setActive] = useState(0);
  const dragging = useRef(false);

  const scrollToCard = useCallback(
    (index: number) => {
      if (!sliderRef.current) return;
      const containerW = sliderRef.current.offsetWidth;
      const offset = index * (CARD_W + GAP) - (containerW - CARD_W) / 2;
      sliderRef.current.scrollTo({ left: offset, behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    scrollToCard(active);
  }, [active, scrollToCard]);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current || dragging.current) return;
    const containerW = sliderRef.current.offsetWidth;
    const scroll = sliderRef.current.scrollLeft;
    const center = scroll + containerW / 2;
    const idx = Math.round((center - CARD_W / 2) / (CARD_W + GAP));
    const clamped = Math.max(0, Math.min(items.length - 1, idx));
    setActive((prev) => (prev !== clamped ? clamped : prev));
  }, [items.length]);

  const onTouchStart = () => {
    dragging.current = true;
  };
  const onTouchEnd = () => {
    dragging.current = false;
    handleScroll();
  };

  return (
    <section className="w-full py-14 md:py-[80px] bg-[var(--bg-primary)] flex flex-col items-center gap-7">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 px-6">
        <span className="font-display text-[11px] font-bold tracking-[4px] text-[var(--brand-primary)]">
          {label}
        </span>
        <h2 className="font-display text-[28px] md:text-[40px] lg:text-[48px] font-extrabold tracking-[-1px] text-[var(--text-primary)] text-center">
          {title}
        </h2>
        <p className="font-body text-[14px] md:text-[16px] leading-[1.6] text-[var(--text-secondary)] text-center max-w-[500px]">
          {description}
        </p>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="w-full overflow-x-auto scrollbar-none flex"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: `${GAP}px`,
          paddingLeft: `calc((100% - ${CARD_W}px) / 2)`,
          paddingRight: `calc((100% - ${CARD_W}px) / 2)`,
        }}
      >
        {items.map((card, i) => (
          <a
            key={i}
            href={card.href}
            onClick={(e) => {
              if (i !== active) {
                e.preventDefault();
                setActive(i);
              }
            }}
            className="flex-shrink-0 rounded-[16px] overflow-hidden no-underline relative snap-center"
            style={{
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              opacity: i === active ? 1 : 0.4,
              transform: i === active ? "scale(1)" : "scale(0.97)",
              transition:
                "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
              boxShadow:
                i === active
                  ? "0 8px 32px rgba(0,0,0,0.15)"
                  : "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            {/* Full background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${card.image}')` }}
            />

            {/* Gradient overlay: transparent top → dark bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* Pill tag at top */}
            {card.tag && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--brand-primary)] font-display text-[10px] font-bold tracking-[2px] text-white">
                  {card.tag}
                </span>
              </div>
            )}

            {/* Text content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-1.5">
              <h3 className="font-display text-[18px] font-extrabold text-white leading-tight">
                {card.title}
              </h3>
              <p className="font-body text-[13px] leading-[1.5] text-white/80">
                {card.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className="rounded-full border-none p-0 cursor-pointer transition-all duration-300"
            style={{
              width: i === active ? "8px" : "6px",
              height: i === active ? "8px" : "6px",
              backgroundColor:
                i === active
                  ? "var(--brand-primary)"
                  : "rgba(212, 160, 83, 0.25)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
