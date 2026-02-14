"use client";

import { Radio, MapPin, Heart, Users, Calendar, Phone, HandHeart } from "lucide-react";
import { useState } from "react";
import { MapModal } from "./MapModal";
import { StreamingModal } from "./StreamingModal";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  streaming: Radio,
  ubicacion: MapPin,
  donar: Heart,
  grupos: Users,
  eventos: Calendar,
  contacto: Phone,
  oracion: HandHeart,
};

export interface QuickAction {
  label: string;
  icon: string;
  href: string;
  isExternal?: boolean;
  opensMap?: boolean;
  opensStreaming?: boolean;
}

const fallbackActions: QuickAction[] = [
  { label: "Streaming", icon: "streaming", href: "#streaming", opensStreaming: true },
  { label: "Ubicacion", icon: "ubicacion", href: "#", opensMap: true },
  { label: "Donar", icon: "donar", href: "https://regiven.vercel.app/", isExternal: true },
  { label: "Grupos", icon: "grupos", href: "#grupos" },
  { label: "Eventos", icon: "eventos", href: "#eventos" },
];

interface QuickActionsProps {
  actions?: QuickAction[];
  streamingUrl?: string;
}

export function QuickActions({ actions, streamingUrl }: QuickActionsProps) {
  const [mapOpen, setMapOpen] = useState(false);
  const [streamingOpen, setStreamingOpen] = useState(false);
  const items = actions && actions.length > 0 ? actions : fallbackActions;

  return (
    <>
      <div className="flex md:hidden w-full overflow-x-auto bg-[var(--bg-dark)] border-t border-white/[0.06] scrollbar-none">
        <div className="flex items-center justify-between w-full min-w-max px-4 py-3 gap-2">
          {items.map((action) => {
            const Icon = iconMap[action.icon] || MapPin;

            if (action.opensMap) {
              return (
                <button
                  key={action.label}
                  onClick={() => setMapOpen(true)}
                  className="flex flex-col items-center gap-1.5 min-w-[60px] px-2"
                >
                  <Icon className="w-[22px] h-[22px] text-white/70" strokeWidth={1.5} />
                  <span className="font-body text-[10px] text-white/50">{action.label}</span>
                </button>
              );
            }

            if (action.opensStreaming || action.icon === "streaming") {
              return (
                <button
                  key={action.label}
                  onClick={() => setStreamingOpen(true)}
                  className="flex flex-col items-center gap-1.5 min-w-[60px] px-2"
                >
                  <Icon className="w-[22px] h-[22px] text-white/70" strokeWidth={1.5} />
                  <span className="font-body text-[10px] text-white/50">{action.label}</span>
                </button>
              );
            }

            return (
              <a
                key={action.label}
                href={action.href}
                {...(action.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex flex-col items-center gap-1.5 min-w-[60px] px-2"
              >
                <Icon className="w-[22px] h-[22px] text-white/70" strokeWidth={1.5} />
                <span className="font-body text-[10px] text-white/50">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
      <StreamingModal isOpen={streamingOpen} onClose={() => setStreamingOpen(false)} youtubeUrl={streamingUrl} />
    </>
  );
}
