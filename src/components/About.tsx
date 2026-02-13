interface AboutProps {
  label?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
}

export function About({
  label = "QUIENES SOMOS",
  title = "Una comunidad que transforma vidas",
  description = "Somos una iglesia apasionada por ver a las personas encontrar su proposito en Dios. Creemos que cada vida tiene un llamado unico y poderoso, y estamos aqui para caminar contigo en ese proceso de transformacion.",
  ctaLabel = "Conoce nuestra historia",
  ctaHref = "#historia",
  image = "https://images.unsplash.com/photo-1762013728525-4e093240ae7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
}: AboutProps) {
  return (
    <section
      id="nosotros"
      className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[80px] w-full px-6 md:px-10 lg:px-[80px] py-16 md:py-[100px] bg-[var(--bg-primary)]"
    >
      {/* Left Content */}
      <div className="flex flex-col gap-6 md:gap-8 flex-1">
        <span className="font-display text-[12px] font-bold text-[var(--text-secondary)] tracking-[3px]">
          {label}
        </span>
        <h2 className="font-display text-[32px] md:text-[40px] lg:text-[48px] font-extrabold text-[var(--text-primary)] tracking-[-1px] leading-[1.05]">
          {title}
        </h2>
        <p className="font-body text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6]">
          {description}
        </p>
        <a
          href={ctaHref}
          className="flex items-center justify-center w-fit px-9 py-[14px] rounded-full bg-[var(--bg-dark)] font-display text-[14px] font-semibold text-[var(--text-inverted)] hover:opacity-90 transition-opacity"
        >
          {ctaLabel}
        </a>
      </div>

      {/* Right Image */}
      <div className="w-full lg:flex-1 h-[300px] md:h-[400px] lg:h-[500px] rounded-[16px] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />
      </div>
    </section>
  );
}
