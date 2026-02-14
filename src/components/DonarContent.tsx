"use client";

import { useState } from "react";
import { ChevronLeft, Loader2, CheckCircle, Copy, Check, ChevronDown } from "lucide-react";

const PAYPAL_URL = "https://www.paypal.com/paypalme/REVOLUCIONAIGLESIA";

type DonationType = "" | "diezmos" | "ofrendas";
type PaymentMethod = "" | "paypal" | "transferencia";
type Frequency = "normal" | "semanal" | "quincenal" | "mensual";

export function DonarContent() {
  const [step, setStep] = useState(1);
  const [donationType, setDonationType] = useState<DonationType>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");

  const handleSelectType = (type: DonationType) => {
    setDonationType(type);
    setStep(2);
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 3) {
      setPaymentMethod("");
      setStep(2);
    } else if (step === 2) {
      setDonationType("");
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDonationType("");
    setPaymentMethod("");
  };

  const typeLabel = donationType === "diezmos" ? "Diezmos" : "Ofrendas";

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="bg-[var(--bg-dark)] px-6 md:px-20 py-10 md:py-16">
        <p className="mb-3 font-display text-[11px] font-bold tracking-[3px] text-[var(--brand-primary)]">
          DONAR
        </p>
        <h1 className="max-w-[900px] font-display text-[32px] md:text-[56px] font-bold leading-[1.05] text-[var(--text-inverted)]">
          Tu generosidad transforma vidas
        </h1>
        <p className="mt-3 max-w-[760px] font-body text-[14px] md:text-[18px] leading-[1.5] text-[var(--text-inverted)]/80">
          Apoya la mision de Iglesia Revoluciona y se parte de cada historia de restauracion.
        </p>
      </header>

      {/* Wizard */}
      <div className="px-5 md:px-[120px] py-10 md:py-14">
        <div className="max-w-[640px] mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-[13px] font-bold transition-colors ${
                    step >= s
                      ? "bg-[var(--brand-primary)] text-white"
                      : "bg-[var(--border-subtle)] text-[var(--text-muted)]"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-[2px] transition-colors ${
                      step > s ? "bg-[var(--brand-primary)]" : "bg-[var(--border-subtle)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Back button */}
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 mb-4 font-body text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Atras
            </button>
          )}

          {/* Step 1: Type */}
          {step === 1 && (
            <div className="rounded-[16px] bg-[var(--bg-surface)] p-6 md:p-8">
              <h2 className="font-display text-[24px] md:text-[34px] font-bold text-[var(--text-primary)]">
                ¿Que deseas dar?
              </h2>
              <p className="mt-1 mb-6 font-body text-[14px] text-[var(--text-secondary)]">
                Selecciona el tipo de donacion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectType("diezmos")}
                  className="flex flex-col items-center gap-3 rounded-[16px] border-[1.5px] border-[var(--border-subtle)] p-8 hover:border-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-all"
                >
                  <span className="font-display text-[32px]">🙏</span>
                  <span className="font-display text-[20px] font-bold text-[var(--text-primary)]">Diezmos</span>
                  <span className="font-body text-[13px] text-[var(--text-secondary)] text-center">
                    Tu fidelidad honra a Dios y sostiene la obra.
                  </span>
                </button>
                <button
                  onClick={() => handleSelectType("ofrendas")}
                  className="flex flex-col items-center gap-3 rounded-[16px] border-[1.5px] border-[var(--border-subtle)] p-8 hover:border-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-all"
                >
                  <span className="font-display text-[32px]">💛</span>
                  <span className="font-display text-[20px] font-bold text-[var(--text-primary)]">Ofrendas</span>
                  <span className="font-body text-[13px] text-[var(--text-secondary)] text-center">
                    Una ofrenda voluntaria que impacta vidas.
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="rounded-[16px] bg-[var(--bg-surface)] p-6 md:p-8">
              <h2 className="font-display text-[24px] md:text-[34px] font-bold text-[var(--text-primary)]">
                ¿Como deseas dar tu {typeLabel.toLowerCase()}?
              </h2>
              <p className="mt-1 mb-6 font-body text-[14px] text-[var(--text-secondary)]">
                Elige tu metodo de pago preferido.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectPayment("paypal")}
                  className="flex flex-col items-center gap-3 rounded-[16px] border-[1.5px] border-[var(--border-subtle)] p-8 hover:border-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-all"
                >
                  <span className="font-display text-[32px]">💳</span>
                  <span className="font-display text-[20px] font-bold text-[var(--text-primary)]">PayPal</span>
                  <span className="font-body text-[13px] text-[var(--text-secondary)] text-center">
                    Paga con tarjeta o saldo PayPal.
                  </span>
                </button>
                <button
                  onClick={() => handleSelectPayment("transferencia")}
                  className="flex flex-col items-center gap-3 rounded-[16px] border-[1.5px] border-[var(--border-subtle)] p-8 hover:border-[var(--brand-primary)] hover:bg-[var(--accent-glow)] transition-all"
                >
                  <span className="font-display text-[32px]">🏦</span>
                  <span className="font-display text-[20px] font-bold text-[var(--text-primary)]">Transferencia</span>
                  <span className="font-body text-[13px] text-[var(--text-secondary)] text-center">
                    Transferencia bancaria a Banreservas.
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Form */}
          {step === 3 && (
            <div className="rounded-[16px] bg-[var(--bg-surface)] p-6 md:p-8">
              <h2 className="font-display text-[24px] md:text-[34px] font-bold text-[var(--text-primary)]">
                Completa tu {typeLabel.toLowerCase()}
              </h2>
              <p className="mt-1 mb-6 font-body text-[14px] text-[var(--text-secondary)]">
                {paymentMethod === "paypal"
                  ? "Ingresa los datos y seras redirigido a PayPal."
                  : "Ingresa los datos y realiza tu transferencia."}
              </p>

              {paymentMethod === "transferencia" && (
                <div className="rounded-[12px] bg-[var(--bg-primary)] p-4 mb-5 border border-[var(--border-subtle)]">
                  <p className="font-display text-[13px] font-bold text-[var(--text-primary)] mb-2">
                    Datos para transferencia
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-[14px]">
                      <span className="font-semibold">Banreservas:</span> 9606691535
                    </p>
                    <CopyButton text="9606691535" />
                  </div>
                  <p className="font-body text-[14px] mt-1">
                    <span className="font-semibold">RNC:</span> 430382507
                  </p>
                  <p className="font-body text-[12px] text-[var(--text-secondary)] mt-1">
                    A nombre de Iglesia Revoluciona
                  </p>
                </div>
              )}

              <DonationForm
                donationType={donationType}
                paymentMethod={paymentMethod}
                onSuccess={handleReset}
              />
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-5 md:px-[120px] pb-14">
        <div className="max-w-[640px] mx-auto">
          <h3 className="mb-4 font-display text-[20px] md:text-[24px] font-bold text-[var(--text-primary)]">
            Preguntas frecuentes
          </h3>
          <FaqItem q="¿Cual es la diferencia entre diezmo y ofrenda?" a="El diezmo es el 10% de tus ingresos como acto de fidelidad. La ofrenda es un aporte voluntario adicional para apoyar la obra." />
          <FaqItem q="¿Puedo dar de forma recurrente?" a="Si, puedes configurar tu donacion semanal, quincenal o mensual." />
          <FaqItem q="¿Mi donacion es segura?" a="Si, usamos pasarelas de pago seguras y certificadas para proteger tus datos." />
        </div>
      </div>
    </div>
  );
}

function DonationForm({
  donationType,
  paymentMethod,
  onSuccess,
}: {
  donationType: DonationType;
  paymentMethod: PaymentMethod;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("normal");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !amount.trim()) {
      setError("Nombre, correo y cantidad son requeridos.");
      return;
    }

    // PayPal: redirect
    if (paymentMethod === "paypal") {
      const cleanAmount = amount.replace(/[^0-9.]/g, "");
      window.open(`${PAYPAL_URL}/${cleanAmount}`, "_blank");
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
          amount: amount.trim(),
          destination: donationType === "diezmos" ? "Diezmos" : "Ofrendas",
          status: "pendiente",
          frequency,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
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
          {paymentMethod === "paypal"
            ? "Tu donacion fue registrada. Completa el pago en la ventana de PayPal."
            : "Tu donacion fue registrada. Realiza la transferencia con los datos indicados."}
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            onSuccess();
          }}
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

      {/* Frequency */}
      <div>
        <p className="font-display text-[13px] font-bold text-[var(--text-primary)] mb-2">Frecuencia</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([
            { value: "normal", label: "Una vez" },
            { value: "semanal", label: "Semanal" },
            { value: "quincenal", label: "Quincenal" },
            { value: "mensual", label: "Mensual" },
          ] as { value: Frequency; label: string }[]).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFrequency(opt.value)}
              className={`rounded-[8px] border-[1.5px] px-3 py-2.5 font-display text-[13px] font-bold transition-colors ${
                frequency === opt.value
                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <input
        placeholder="Cantidad (ej: 50)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />

      {/* Personal info */}
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
        placeholder="Telefono (opcional)"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-12 w-full rounded-[8px] border border-[var(--border-subtle)] bg-white px-4 font-body text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-[8px] bg-[var(--brand-primary)] px-6 py-3 font-display text-[14px] font-bold text-white hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {paymentMethod === "paypal" ? "Continuar a PayPal" : "Registrar donacion"}
      </button>
    </form>
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
