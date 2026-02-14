"use client";

import { useState } from "react";
import { Search, ChevronDown, Loader2, CheckCircle, Copy, Check } from "lucide-react";

const PAYPAL_URL = "https://www.paypal.com/paypalme/REVOLUCIONAIGLESIA";
const amountOptions = ["$25", "$50", "$100", "$250"];

export function DonarContent() {
  const [selectedAmount, setSelectedAmount] = useState("");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ── Desktop ── */}
      <section className="hidden lg:block">
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
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[8px] bg-[var(--brand-primary)] px-8 py-[14px] font-display text-[14px] font-bold text-white hover:brightness-110 transition-all"
            >
              Ir a PayPal
            </a>
          </div>

          <div className="mt-4 flex gap-2">
            {amountOptions.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAmount(a)}
                className={`rounded-[8px] border-[1.5px] px-6 py-[14px] font-display text-[14px] font-bold transition-colors ${
                  selectedAmount === a
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                    : "border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--accent-glow)]"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </header>

        <div className="flex gap-7 px-[120px] py-14">
          <div id="donar-form" className="flex-1 rounded-[16px] bg-[var(--bg-surface)] p-7">
            <h2 className="font-display text-[34px] font-bold text-[var(--text-primary)]">
              Completa tu donacion
            </h2>
            <p className="mb-5 font-body text-[14px] text-[var(--text-secondary)]">
              Elige un monto, agrega tus datos y finaliza en segundos.
            </p>
            <DonationForm initialAmount={selectedAmount} />
          </div>

          <aside id="impacto" className="w-[360px] space-y-4">
            <h3 className="font-display text-[28px] font-bold text-[var(--text-primary)]">
              Impacto reciente
            </h3>
            <ImpactCard title="Noche de Adoracion" date="MAR 15 · 7:00 PM" />
            <ImpactCard title="Servicio Dominical" date="DOM · 10:00 AM" />
          </aside>
        </div>

        <section className="px-[120px] pb-14">
          <h3 className="mb-4 font-display text-[24px] font-bold text-[var(--text-primary)]">
            Preguntas frecuentes
          </h3>
          <FaqItem q="¿Puedo donar una sola vez?" a="Si. Puedes apoyar con un aporte unico o configurar donaciones recurrentes." />
          <FaqItem q="¿Mi donacion es segura?" a="Si, usamos pasarelas de pago seguras y certificadas para proteger tus datos." />
          <FaqItem q="¿Puedo elegir el destino de mi donacion?" a="Si, puedes indicar el area o ministerio al que deseas destinar tu ofrenda." />
        </section>

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
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[8px] bg-[var(--brand-primary)] px-5 py-2.5 font-display text-[13px] font-bold text-white"
            >
              Ir a PayPal
            </a>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {amountOptions.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAmount(a)}
                className={`rounded-[8px] border-[1.5px] px-4 py-2 font-display text-[13px] font-bold transition-colors ${
                  selectedAmount === a
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                    : "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-6 p-5">
          <div id="donar-form-mobile" className="rounded-[16px] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 font-display text-[28px] font-bold text-[var(--text-primary)]">
              Completa tu donacion
            </h2>
            <DonationForm initialAmount={selectedAmount} />
          </div>

          <section>
            <h3 className="mb-3 font-display text-[20px] font-bold text-[var(--text-primary)]">
              Preguntas frecuentes
            </h3>
            <FaqItem q="¿Aceptan donaciones unicas?" a="Si, unicas o recurrentes." />
            <FaqItem q="¿Puedo elegir destino?" a="Si, puedes indicar el area o ministerio." />
          </section>

          <section>
            <h3 className="mb-3 font-display text-[20px] font-bold text-[var(--text-primary)]">
              Cuentas para transferencias
            </h3>
            <div className="rounded-[16px] bg-[var(--bg-surface)] p-5">
              <div className="flex items-center justify-between">
                <p className="font-body text-[14px] font-semibold">Banreservas: 9606691535</p>
                <CopyButton text="9606691535" />
              </div>
              <p className="font-body text-[14px] font-semibold mt-2">RNC: 430382507</p>
              <p className="font-body text-[12px] text-[var(--text-secondary)] mt-1">
                A nombre de Iglesia Revoluciona
              </p>
            </div>
          </section>

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

function DonationForm({ initialAmount }: { initialAmount: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const displayAmount = amount || initialAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Nombre y correo son requeridos.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          amount: displayAmount || undefined,
          destination: destination.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setAmount("");
      setDestination("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar la donacion");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <CheckCircle className="w-12 h-12 text-[var(--brand-primary)]" />
        <h3 className="font-display text-[20px] font-bold text-[var(--text-primary)]">
          Gracias por tu generosidad
        </h3>
        <p className="font-body text-[14px] text-[var(--text-secondary)] text-center">
          Tu donacion ha sido registrada. Nos pondremos en contacto contigo.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="rounded-[8px] border-[1.5px] border-[var(--brand-primary)] px-6 py-2.5 font-display text-[14px] font-bold text-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-colors"
        >
          Hacer otra donacion
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 rounded-[8px] bg-red-500/10 border border-red-500/20 font-body text-[13px] text-red-600">
          {error}
        </div>
      )}
      <input
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <input
        placeholder="Correo electronico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <input
        placeholder="Telefono"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <input
        placeholder="Monto (ej: $50)"
        value={displayAmount}
        onChange={(e) => setAmount(e.target.value)}
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <input
        placeholder="Destino de la donacion (opcional)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-[8px] bg-[var(--brand-primary)] px-6 py-3 font-display text-[14px] font-bold text-white hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Confirmar donacion
      </button>
    </form>
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-[8px] bg-[var(--brand-primary)] px-3 py-1.5 font-display text-[12px] font-bold text-white transition-all hover:brightness-110 active:scale-95"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copiar
        </>
      )}
    </button>
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
