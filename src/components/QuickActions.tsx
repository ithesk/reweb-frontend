"use client";

import { Play, Radio, MapPin, Heart, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { MapModal } from "./MapModal";

const actions = [
  { icon: Play, label: "Sermones", href: "#sermones" },
  { icon: Radio, label: "Streaming", href: "#streaming" },
  { icon: MapPin, label: "Ubicacion", href: "__map__" },
  { icon: Heart, label: "Donar", href: "https://regiven.vercel.app/", external: true },
  { icon: Users, label: "Grupos", href: "#grupos" },
  { icon: Calendar, label: "Eventos", href: "#eventos" },
];

export function QuickActions() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <div className="flex md:hidden w-full overflow-x-auto bg-[var(--bg-dark)] border-t border-white/[0.06] scrollbar-none">
        <div className="flex items-center justify-between w-full min-w-max px-4 py-3 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;

            if (action.href === "__map__") {
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

            return (
              <a
                key={action.label}
                href={action.href}
                {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
    </>
  );
}
