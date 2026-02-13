import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Quote } from "@/components/Quote";
import { Events } from "@/components/Events";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { getServices, getEvents, getQuote, getNavigation, getFooter } from "@/lib/api";

export default async function Home() {
  const [services, events, quote, navLinks, footerColumns] = await Promise.all([
    getServices(),
    getEvents(3),
    getQuote(),
    getNavigation(),
    getFooter(),
  ]);

  return (
    <main className="flex flex-col w-full">
      <Navbar links={navLinks} />
      <Hero />
      <About />
      <Services services={services} />
      <Quote text={quote.text} reference={quote.reference} />
      <Events events={events} />
      <CTA />
      <Footer columns={footerColumns} />
    </main>
  );
}
