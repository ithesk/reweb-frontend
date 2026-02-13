import type { ChurchEvent } from "@/lib/types";
import { getStrapiImageUrl } from "@/lib/api";

const fallbackEvents = [
  {
    date: "MAR 15 — DOMINGO",
    title: "Servicio Especial de Adoracion",
    description:
      "Una noche dedicada a la adoracion y la presencia de Dios. Invita a tu familia y amigos.",
    image:
      "https://images.unsplash.com/photo-1764643588195-e18878c0a39c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    date: "MAR 22 — SABADO",
    title: "Noche de Jovenes",
    description:
      "Un espacio disenado para la nueva generacion. Musica, comunidad y un mensaje que transforma.",
    image:
      "https://images.unsplash.com/photo-1758272133406-159ba07499dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    date: "ABR 5 — DOMINGO",
    title: "Dia de Familia",
    description:
      "Celebramos en familia con actividades para todas las edades. Un dia lleno de alegria y conexion.",
    image:
      "https://images.unsplash.com/photo-1763901326432-4b08b99e03e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

interface EventsProps {
  events?: ChurchEvent[];
}

export function Events({ events }: EventsProps) {
  const items = events && events.length > 0
    ? events.map((e) => ({
        date: e.displayDate,
        title: e.title,
        description: e.description,
        image: e.image ? getStrapiImageUrl(e.image) : fallbackEvents[0].image,
      }))
    : fallbackEvents;

  return (
    <section className="flex flex-col gap-10 md:gap-16 w-full px-6 md:px-10 lg:px-[80px] py-16 md:py-[100px] bg-[var(--bg-surface)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
        <div className="flex flex-col gap-4">
          <span className="font-display text-[12px] font-bold text-[var(--text-secondary)] tracking-[3px]">
            PROXIMOS EVENTOS
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] lg:text-[48px] font-extrabold text-[var(--text-primary)] tracking-[-1px]">
            No te pierdas lo que viene
          </h2>
        </div>
        <a
          href="#eventos"
          className="font-body text-[14px] font-semibold text-[var(--text-primary)] hover:opacity-70 transition-opacity"
        >
          Ver todos →
        </a>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {items.map((event) => (
          <div
            key={event.title}
            className="flex flex-col rounded-[16px] bg-[var(--bg-primary)] overflow-hidden"
          >
            <div
              className="w-full h-[200px] md:h-[220px] bg-cover bg-center"
              style={{ backgroundImage: `url('${event.image}')` }}
            />
            <div className="flex flex-col gap-2 p-6 md:p-7 w-full">
              <span className="font-display text-[12px] font-bold text-[var(--text-secondary)] tracking-[2px]">
                {event.date}
              </span>
              <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-[var(--text-primary)]">
                {event.title}
              </h3>
              <p className="font-body text-[14px] text-[var(--text-secondary)] leading-[1.5]">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
