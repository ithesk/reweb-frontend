import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getNavigation, getFooter } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quienes Somos | Iglesia Revoluciona",
  description: "Conoce nuestra historia, mision y vision. Somos una iglesia apasionada por transformar vidas.",
};

export default async function NosotrosPage() {
  const [navLinks, footerColumns] = await Promise.all([
    getNavigation(),
    getFooter(),
  ]);

  return (
    <main className="flex flex-col w-full">
      <Navbar links={navLinks} />

      {/* Vision Board */}
      <section className="w-full bg-[var(--bg-dark)] py-16 md:py-24">
        <div className="px-6 md:px-10 lg:px-[120px] mb-10 text-center">
          <span className="font-display text-[12px] font-bold text-[var(--brand-primary)] tracking-[3px]">
            QUIENES SOMOS
          </span>
          <h1 className="mt-3 font-display text-[32px] md:text-[44px] lg:text-[56px] font-extrabold text-white tracking-[-1px] leading-[1.05]">
            Amar a Dios y revolucionar el<br className="hidden md:block" /> corazon de las personas
          </h1>
        </div>

        {/* Desktop grid - 3 columns mosaic */}
        <div className="hidden md:grid grid-cols-3 gap-4 px-6 md:px-10 lg:px-[120px]">
          <div className="row-span-1 rounded-[16px] overflow-hidden">
            <img src="/visionBoard/2 4.png" alt="94 Servicios de Domingo" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 rounded-[16px] overflow-hidden">
            <img src="/visionBoard/3 3.png" alt="Top 5 Canciones" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 rounded-[16px] overflow-hidden">
            <img src="/visionBoard/4 3.png" alt="80 Personas Fundamentos, +50 Bautizadas" className="w-full h-full object-cover" />
          </div>
          <div className="row-span-1 rounded-[16px] overflow-hidden">
            <img src="/visionBoard/5 3.png" alt="9 Series de Mensajes" className="w-full h-full object-cover" />
          </div>
          <div className="row-span-1 rounded-[16px] overflow-hidden">
            <img src="/visionBoard/6 3.png" alt="Grupo 2030" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 rounded-[16px] overflow-hidden">
            <img src="/visionBoard/7 3.png" alt="RE Campus UASD" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mobile - vertical stack */}
        <div className="md:hidden flex flex-col gap-3 px-5">
          <div className="rounded-[16px] overflow-hidden">
            <img src="/visionBoard/2 4.png" alt="94 Servicios de Domingo" className="w-full object-cover" />
          </div>
          <div className="rounded-[16px] overflow-hidden">
            <img src="/visionBoard/3 3.png" alt="Top 5 Canciones" className="w-full object-cover" />
          </div>
          <div className="rounded-[16px] overflow-hidden">
            <img src="/visionBoard/4 3.png" alt="80 Personas Fundamentos, +50 Bautizadas" className="w-full object-cover" />
          </div>
          <div className="rounded-[16px] overflow-hidden">
            <img src="/visionBoard/5 3.png" alt="9 Series de Mensajes" className="w-full object-cover" />
          </div>
          <div className="rounded-[16px] overflow-hidden">
            <img src="/visionBoard/6 3.png" alt="Grupo 2030" className="w-full object-cover" />
          </div>
          <div className="rounded-[16px] overflow-hidden">
            <img src="/visionBoard/7 3.png" alt="RE Campus UASD" className="w-full object-cover" />
          </div>
        </div>
      </section>

      <Footer columns={footerColumns} />
    </main>
  );
}
