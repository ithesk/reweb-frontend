"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const amounts = ["$25", "$50", "$100", "$250"];

export function DonarContent() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ── Desktop ── */}
      <section className="hidden lg:block">
        {/* Hero */}
        <header className="bg-[var(--bg-dark)] px-20 py-16">
          <p className="mb-4 font-display text-[11px] font-bold tracking-[3px] text-[var(--brand-primary)]">
            DONAR
          </p>
          <h1 className="max-w-[900px] font-display text-[56px] font-bold leading-[1.05] text-[var(--text-inverted)]">
            Tu generosidad transforma vidas
          </h1>
          <p className="mt-4 max-w-[760px] font-body text-[18px] leading-[1.5] text-[var(--text-inverted)]/80">
            Apoya la mision de Iglesia Revoluciona y se parte de cada historia de restauracion.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#donar-form"
              className="rounded-[8px] bg-[var(--brand-primary)] px-8 py-[14px] font-display text-[14px] font-bold text-white hover:brightness-110 transition-all"
            >
              Donar ahora
            </a>
            <a
              href="#impacto"
              className="rounded-[8px] border-[1.5px] border-[var(--brand-primary)] px-8 py-[14px] font-display text-[14px] font-bold text-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-colors"
            >
              Ver impacto
            </a>
            <a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[8px] bg-[var(--brand-primary)] px-8 py-[14px] font-display text-[14px] font-bold text-white hover:brightness-110 transition-all"
            >
              Ir a PayPal
            </a>
          </div>

          <div className="mt-4 flex gap-2">
            {amounts.map((a) => (
              <button
                key={a}
                className="rounded-[8px] border-[1.5px] border-[var(--brand-primary)] px-6 py-[14px] font-display text-[14px] font-bold text-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-colors"
              >
                {a}
              </button>
            ))}
          </div>
        </header>

        {/* Form + Impact */}
        <div className="flex gap-7 px-[120px] py-14">
          <div id="donar-form" className="flex-1 rounded-[16px] bg-[var(--bg-surface)] p-7">
            <h2 className="font-display text-[34px] font-bold text-[var(--text-primary)]">
              Completa tu donacion
            </h2>
            <p className="mb-5 font-body text-[14px] text-[var(--text-secondary)]">
              Elige un monto, agrega tus datos y finaliza en segundos.
            </p>
            <DonationForm />
          </div>

          <aside id="impacto" className="w-[360px] space-y-4">
            <h3 className="font-display text-[28px] font-bold text-[var(--text-primary)]">
              Impacto reciente
            </h3>
            <ImpactCard title="Noche de Adoracion" date="MAR 15 · 7:00 PM" />
            <ImpactCard title="Servicio Dominical" date="DOM · 10:00 AM" />
          </aside>
        </div>

        {/* FAQ */}
        <section className="px-[120px] pb-14">
          <h3 className="mb-4 font-display text-[24px] font-bold text-[var(--text-primary)]">
            Preguntas frecuentes
          </h3>
          <FaqItem q="¿Puedo donar una sola vez?" a="Si. Puedes apoyar con un aporte unico o configurar donaciones recurrentes." />
          <FaqItem q="¿Mi donacion es segura?" a="Si, usamos pasarelas de pago seguras y certificadas para proteger tus datos." />
          <FaqItem q="¿Puedo elegir el destino de mi donacion?" a="Si, puedes indicar el area o ministerio al que deseas destinar tu ofrenda." />
        </section>

        {/* Bank info */}
        <section className="px-[120px] pb-14">
          <h3 className="mb-4 font-display text-[24px] font-bold text-[var(--text-primary)]">
            Cuentas para transferencias
          </h3>
          <div className="rounded-[16px] bg-[var(--bg-surface)] p-6">
            <div className="flex flex-col gap-2">
              <p className="font-body text-[15px]">
                <span className="font-semibold">Banreservas:</span> 9606691535
              </p>
              <p className="font-body text-[15px]">
                <span className="font-semibold">RNC:</span> 430382507
              </p>
              <p className="font-body text-[13px] text-[var(--text-secondary)] mt-1">
                A nombre de Iglesia Revoluciona
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* ── Mobile ── */}
      <section className="lg:hidden">
        {/* Hero */}
        <header className="bg-[var(--bg-dark)] px-5 py-7">
          <p className="mb-3 font-display text-[11px] font-bold tracking-[3px] text-[var(--brand-primary)]">
            DONAR
          </p>
          <h1 className="font-display text-[36px] font-bold leading-[1.05] text-[var(--text-inverted)]">
            Tu donacion cambia historias
          </h1>
          <p className="mt-3 font-body text-[14px] leading-[1.5] text-[var(--text-inverted)]/80">
            Apoya nuestra mision con una ofrenda segura y rapida.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#donar-form-mobile"
              className="rounded-[8px] bg-[var(--brand-primary)] px-5 py-2.5 font-display text-[13px] font-bold text-white"
            >
              Donar ahora
            </a>
            <a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[8px] bg-[var(--brand-primary)] px-5 py-2.5 font-display text-[13px] font-bold text-white"
            >
              Ir a PayPal
            </a>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {amounts.map((a) => (
              <button
                key={a}
                className="rounded-[8px] border-[1.5px] border-[var(--brand-primary)] px-4 py-2 font-display text-[13px] font-bold text-[var(--brand-primary)]"
              >
                {a}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-6 p-5">
          {/* Form */}
          <div id="donar-form-mobile" className="rounded-[16px] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 font-display text-[28px] font-bold text-[var(--text-primary)]">
              Completa tu donacion
            </h2>
            <DonationForm />
          </div>

          {/* FAQ */}
          <section>
            <h3 className="mb-3 font-display text-[20px] font-bold text-[var(--text-primary)]">
              Preguntas frecuentes
            </h3>
            <FaqItem q="¿Aceptan donaciones unicas?" a="Si, unicas o recurrentes." />
            <FaqItem q="¿Puedo elegir destino?" a="Si, puedes indicar el area o ministerio." />
          </section>

          {/* Bank info */}
          <section>
            <h3 className="mb-3 font-display text-[20px] font-bold text-[var(--text-primary)]">
              Cuentas para transferencias
            </h3>
            <div className="rounded-[16px] bg-[var(--bg-surface)] p-5">
              <p className="font-body text-[14px] font-semibold">Banreservas: 9606691535</p>
              <p className="font-body text-[14px] font-semibold">RNC: 430382507</p>
              <p className="font-body text-[12px] text-[var(--text-secondary)] mt-1">
                A nombre de Iglesia Revoluciona
              </p>
            </div>
          </section>

          {/* Impact */}
          <section>
            <h3 className="mb-3 font-display text-[20px] font-bold text-[var(--text-primary)]">
              Historias que apoyas
            </h3>
            <ImpactCard title="Noche de Adoracion" date="MAR 15 · 7:00 PM" />
            <div className="mt-3" />
            <ImpactCard title="Servicio Dominical" date="DOM · 10:00 AM" />
          </section>
        </div>
      </section>
    </div>
  );
}

function DonationForm() {
  return (
    <div className="space-y-3">
      <input
        placeholder="Nombre completo"
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <input
        placeholder="Correo electronico"
        type="email"
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <input
        placeholder="Telefono"
        type="tel"
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <div className="flex h-12 items-center gap-2 rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 text-[var(--text-muted)]">
        <Search size={18} />
        <span className="font-body text-[14px]">Destino de la donacion</span>
      </div>
      <button className="rounded-[8px] bg-[var(--brand-primary)] px-6 py-3 font-display text-[14px] font-bold text-white hover:brightness-110 transition-all">
        Confirmar donacion
      </button>
    </div>
  );
}

function ImpactCard({ title, date }: { title: string; date: string }) {
  return (
    <article className="overflow-hidden rounded-[16px] bg-[var(--bg-surface)]">
      <div className="h-[160px] bg-[var(--border-subtle)]" />
      <div className="p-4">
        <p className="font-display text-[11px] font-bold tracking-[2px] text-[var(--brand-primary)]">
          {date}
        </p>
        <h4 className="font-display text-[18px] font-bold text-[var(--text-primary)]">
          {title}
        </h4>
      </div>
    </article>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mb-2 rounded-[16px] bg-[var(--bg-surface)] overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-4">
        <p className="font-body text-[15px] font-semibold text-[var(--text-primary)]">{q}</p>
        <ChevronDown
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <div className="px-4 pb-4">
          <p className="font-body text-[14px] text-[var(--text-secondary)]">{a}</p>
        </div>
      )}
    </div>
  );
}
