import Image from "next/image";

interface QuoteProps {
  text?: string;
  reference?: string;
}

export function Quote({ text, reference }: QuoteProps) {
  const quoteText = text || "Porque donde estan dos o tres congregados en mi nombre, alli estoy yo en medio de ellos.";
  const quoteRef = reference || "Mateo 18:20";

  return (
    <section className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full px-6 md:px-16 lg:px-[200px] py-16 md:py-[120px] bg-[var(--bg-primary)]">
      <Image
        src="/logo1.png"
        alt="re"
        width={60}
        height={60}
        className="object-contain w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
      />
      <blockquote className="font-display text-[24px] md:text-[30px] lg:text-[36px] font-light text-[var(--text-primary)] tracking-[-0.5px] leading-[1.3] text-center max-w-[900px]">
        {quoteText}
      </blockquote>
      <cite className="font-body text-[13px] md:text-[14px] font-semibold text-[var(--text-secondary)] tracking-[2px] not-italic">
        {quoteRef}
      </cite>
    </section>
  );
}
