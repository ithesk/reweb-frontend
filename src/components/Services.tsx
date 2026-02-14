import type { Service } from "@/lib/types";
import { getStrapiImageUrl } from "@/lib/api";

const fallbackImages = [
  "https://images.unsplash.com/photo-1762967022036-d9a86874183a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1613256454413-02d1d8202de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1755718669605-e0c89e2ea60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const fallbackServices = [
  {
    title: "Servicios Dominicales",
    description:
      "Cada domingo celebramos juntos con alabanza, oracion y la Palabra de Dios. Un espacio para encontrar esperanza.",
    image: fallbackImages[0],
  },
  {
    title: "Grupos de Vida",
    description:
      "Conectate en comunidad a traves de nuestros grupos pequenos. Un espacio intimo para crecer y compartir.",
    image: fallbackImages[1],
  },
  {
    title: "Servicio Comunitario",
    description:
      "Impactamos nuestra ciudad sirviendo a los demas. Descubre como puedes marcar la diferencia.",
    image: fallbackImages[2],
  },
];

function getSafeImageUrl(image: Service["image"] | undefined, fallback: string): string {
  if (!image || !image.url || image.url.includes('placeholder')) return fallback;
  const url = getStrapiImageUrl(image);
  if (url.startsWith('http://')) return fallback;
  return url;
}

interface ServicesProps {
  services?: Service[];
  headerLabel?: string;
  headerTitle?: string;
  headerDescription?: string;
}

export function Services({
  services,
  headerLabel = "NUESTROS SERVICIOS",
  headerTitle = "Encuentra tu lugar",
  headerDescription = "Tenemos algo para cada etapa de tu vida. Descubre como puedes crecer y servir en comunidad.",
}: ServicesProps) {
  const items = services && services.length > 0
    ? services.map((s, i) => ({
        title: s.title,
        description: s.description,
        image: getSafeImageUrl(s.image, fallbackImages[i % fallbackImages.length]),
      }))
    : fallbackServices;

  return (
    <section
      id="servicios"
      className="flex flex-col items-center gap-10 md:gap-16 w-full px-6 md:px-10 lg:px-[80px] py-16 md:py-[100px] bg-[var(--bg-dark)]"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 max-w-[700px]">
        <span className="font-display text-[12px] font-bold text-[var(--brand-primary)] tracking-[3px]">
          {headerLabel}
        </span>
        <h2 className="font-display text-[32px] md:text-[40px] lg:text-[48px] font-extrabold text-[var(--text-inverted)] tracking-[-1px] text-center">
          {headerTitle}
        </h2>
        <p className="font-body text-[15px] md:text-[16px] text-[var(--text-muted)] leading-[1.6] text-center max-w-[600px]">
          {headerDescription}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {items.map((service) => (
          <div
            key={service.title}
            className="flex flex-col rounded-[20px] bg-[var(--bg-elevated)] overflow-hidden shadow-[0_4px_24px_#00000020]"
          >
            <div
              className="w-full h-[200px] md:h-[240px] bg-cover bg-center"
              style={{ backgroundImage: `url('${service.image}')` }}
            />
            <div className="flex flex-col gap-3 p-6 md:p-7 w-full">
              <div className="w-[36px] h-[3px] bg-[var(--brand-primary)] rounded-full" />
              <h3 className="font-display text-[20px] md:text-[22px] font-extrabold text-[var(--text-inverted)]">
                {service.title}
              </h3>
              <p className="font-body text-[14px] text-[var(--text-muted)] leading-[1.5]">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
