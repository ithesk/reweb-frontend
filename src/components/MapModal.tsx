"use client";

import { useEffect } from "react";
import { X, MapPin, Clock, ExternalLink } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MapModal({ isOpen, onClose }: MapModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-elevated)] rounded-2xl w-[900px] max-w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="font-display text-[20px] md:text-[24px] font-bold text-[var(--text-inverted)]">
              Visitanos
            </h2>
            <p className="font-body text-[13px] text-[var(--text-muted)]">
              Iglesia Revoluciona
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/[0.08] hover:bg-white/[0.15] transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-[var(--text-inverted)]" />
          </button>
        </div>

        {/* Map */}
        <div className="w-full h-[300px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d474.3!2d-69.9616184!3d18.4487401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea561d8d1819065%3A0x7d5fa6416ad5cded!2sIGLESIA%20REVOLUCIONA!5e0!3m2!1ses!2sdo"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicacion Iglesia Revoluciona"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 px-6 py-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Clock className="w-[18px] h-[18px] text-[var(--text-muted)] shrink-0" />
            <div className="font-body text-[13px] text-[var(--text-muted)]">
              <span className="text-[var(--text-inverted)] font-medium">Domingos</span> 9:00 AM y 11:00 AM
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-[18px] h-[18px] text-[var(--text-muted)] shrink-0" />
            <span className="font-body text-[13px] text-[var(--text-muted)]">
              Santo Domingo, Rep. Dominicana
            </span>
          </div>
          <div className="sm:ml-auto">
            <a
              href="https://maps.app.goo.gl/eG2CUmUYPQBhqBas8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white font-body text-[13px] font-semibold text-black hover:bg-white/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
