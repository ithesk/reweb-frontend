"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [identifier, setIdentifier] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { login, register, isLoading, error } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setIdentifier("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLocalError(null);
      setMode("login");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login(identifier, password);
      onClose();
    } catch {
      // Error is set in context
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError("Las contrasenas no coinciden");
      return;
    }
    if (password.length < 6) {
      setLocalError("La contrasena debe tener al menos 6 caracteres");
      return;
    }
    try {
      await register(username, email, password);
      onClose();
    } catch {
      // Error is set in context
    }
  };

  const displayError = localError || error;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-elevated)] rounded-xl p-8 w-[400px] max-w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-[24px] font-bold text-[var(--text-inverted)] mb-6">
          {mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
        </h2>

        {displayError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-body text-[13px]">
            {displayError}
          </div>
        )}

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[13px] text-[var(--text-muted)]">
                Email
              </label>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="h-[44px] rounded-[8px] bg-white/[0.06] border border-white/10 px-4 font-body text-[14px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[13px] text-[var(--text-muted)]">
                Contrasena
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[44px] rounded-[8px] bg-white/[0.06] border border-white/10 px-4 font-body text-[14px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                placeholder="Tu contrasena"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="h-[44px] rounded-[8px] bg-[var(--brand-primary)] text-white font-display text-[14px] font-bold hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Iniciar Sesion
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[13px] text-[var(--text-muted)]">
                Nombre
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-[44px] rounded-[8px] bg-white/[0.06] border border-white/10 px-4 font-body text-[14px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[13px] text-[var(--text-muted)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[44px] rounded-[8px] bg-white/[0.06] border border-white/10 px-4 font-body text-[14px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[13px] text-[var(--text-muted)]">
                Contrasena
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[44px] rounded-[8px] bg-white/[0.06] border border-white/10 px-4 font-body text-[14px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                placeholder="Minimo 6 caracteres"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[13px] text-[var(--text-muted)]">
                Confirmar Contrasena
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-[44px] rounded-[8px] bg-white/[0.06] border border-white/10 px-4 font-body text-[14px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                placeholder="Repite tu contrasena"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="h-[44px] rounded-[8px] bg-[var(--brand-primary)] text-white font-display text-[14px] font-bold hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Crear Cuenta
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setLocalError(null);
            }}
            className="font-body text-[13px] text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors"
          >
            {mode === "login"
              ? "No tienes cuenta? Registrate"
              : "Ya tienes cuenta? Inicia sesion"}
          </button>
        </div>
      </div>
    </div>
  );
}
