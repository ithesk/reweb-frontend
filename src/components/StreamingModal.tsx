"use client";

import { useEffect } from "react";
import { X, Radio, ExternalLink } from "lucide-react";

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeUrl?: string;
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : url;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function StreamingModal({
  isOpen,
  onClose,
  youtubeUrl = "https://www.youtube.com/watch?v=dwhe1Rh-_K8",
}: StreamingModalProps) {
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

  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);
  const fullYouTubeUrl = youtubeUrl.startsWith("http")
    ? youtubeUrl
    : `https://www.youtube.com/watch?v=${youtubeUrl}`;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-elevated)] rounded-2xl w-[960px] max-w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="font-display text-[20px] md:text-[24px] font-bold text-[var(--text-inverted)]">
                Streaming en vivo
              </h2>
              <p className="font-body text-[13px] text-[var(--text-muted)]">
                Iglesia Revoluciona
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/[0.08] hover:bg-white/[0.15] transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-[var(--text-inverted)]" />
          </button>
        </div>

        {/* YouTube Embed */}
        <div className="w-full aspect-video">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Streaming Iglesia Revoluciona"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <p className="font-body text-[13px] text-[var(--text-muted)]">
            Domingos 10:00 AM y 12:10 PM
          </p>
          <a
            href={fullYouTubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 font-body text-[13px] font-semibold text-white hover:bg-red-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver en YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
