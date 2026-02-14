import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getNavigation, getFooter } from "@/lib/api";
import { DonarContent } from "@/components/DonarContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donar | Iglesia Revoluciona",
  description: "Tu generosidad transforma vidas. Apoya la mision de Iglesia Revoluciona.",
};

export default async function DonarPage() {
  const [navLinks, footerColumns] = await Promise.all([
    getNavigation(),
    getFooter(),
  ]);

  return (
    <main className="flex flex-col w-full">
      <Navbar links={navLinks} />
      <DonarContent />
      <Footer columns={footerColumns} />
    </main>
  );
}
