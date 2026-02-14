import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getNavigation, getFooter } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quienes Somos | Iglesia Revoluciona",
  description: "Conoce nuestra historia, mision y vision. Somos una iglesia apasionada por transformar vidas.",
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi(endpoint: string) {
  if (!STRAPI_URL) return null;
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function NosotrosPage() {
  const [navLinks, footerColumns] = await Promise.all([
    getNavigation(),
    getFooter(),
  ]);

  const hpRes = await fetchStrapi('/home-page?populate[about][populate]=*');
  const about = hpRes?.data?.attributes?.about;

  const label = about?.label || "QUIENES SOMOS";
  const title = about?.title || "Una comunidad que transforma vidas";
  const description = about?.description || "Somos una iglesia apasionada por ver a las personas encontrar su proposito en Dios. Creemos que cada vida tiene un llamado unico y poderoso, y estamos aqui para caminar contigo en ese proceso de transformacion.";
  const image = "https://images.unsplash.com/photo-1762013728525-4e093240ae7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  return (
    <main className="flex flex-col w-full">
      <Navbar links={navLinks} />

      {/* Hero */}
      <section className="relative w-full py-20 md:py-32 bg-[var(--bg-dark)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
        <div className="relative flex flex-col items-center justify-center px-6 md:px-10 lg:px-[80px] gap-4">
          <span className="font-display text-[12px] font-bold text-white/50 tracking-[3px]">
            {label}
          </span>
          <h1 className="font-display text-[36px] md:text-[48px] lg:text-[64px] font-extrabold text-white tracking-[-1.5px] text-center">
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-6 md:px-10 lg:px-[200px] py-16 md:py-[80px] bg-[var(--bg-primary)]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[80px] items-center">
          <div className="flex flex-col gap-6 flex-1">
            <p className="font-body text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-[1.8]">
              {description}
            </p>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[20px] md:text-[24px] font-bold text-[var(--text-primary)]">
                  Nuestra Mision
                </h3>
                <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.7]">
                  Transformar vidas, construir comunidad e impactar ciudades con el mensaje de esperanza y amor de Dios.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[20px] md:text-[24px] font-bold text-[var(--text-primary)]">
                  Nuestra Vision
                </h3>
                <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.7]">
                  Ser una iglesia que levanta una generacion apasionada por Dios, comprometida con su proposito y dispuesta a revolucionar su entorno.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:flex-1 h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </div>
        </div>
      </section>

      <Footer columns={footerColumns} />
    </main>
  );
}
