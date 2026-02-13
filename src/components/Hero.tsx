export function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[720px] bg-[var(--bg-dark)] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Hero Background.png')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full px-6 md:px-10 lg:px-[80px] gap-6 md:gap-8">
        <span className="font-display text-[12px] md:text-[16px] font-semibold text-white tracking-[4px]">
          BIENVENIDO A
        </span>

        <div className="flex flex-col">
          <span className="font-display text-[24px] md:text-[36px] font-light text-white tracking-[-0.5px]">
            Iglesia
          </span>
          <div className="flex items-end">
            <span className="font-display text-[56px] md:text-[72px] lg:text-[96px] font-black text-white tracking-[-3px] leading-[0.85]">
              re
            </span>
            <span className="font-display text-[56px] md:text-[72px] lg:text-[96px] font-light text-white tracking-[-3px] leading-[0.85]">
              voluciona
            </span>
          </div>
        </div>

        <p className="font-body text-[16px] md:text-[20px] text-white/80 max-w-[500px]">
          Un lugar donde tu vida es transformada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#conecta"
            className="flex items-center justify-center px-10 py-4 rounded-full bg-white font-display text-[14px] md:text-[16px] font-bold text-black hover:bg-white/90 transition-colors"
          >
            Conecta
          </a>
          <a
            href="#conoce"
            className="flex items-center justify-center px-10 py-4 rounded-full border-2 border-white font-display text-[14px] md:text-[16px] font-medium text-white hover:bg-white/10 transition-colors"
          >
            Conoce mas
          </a>
        </div>
      </div>
    </section>
  );
}
