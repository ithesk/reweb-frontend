"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";

export function UserMenu() {
  const { user, logout, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white/[0.08]">
        <div className="w-[18px] h-[18px] rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white/[0.08] hover:bg-white/[0.12] transition-colors"
          aria-label="Iniciar sesion"
        >
          <User className="w-[18px] h-[18px] text-[var(--text-inverted)]" />
        </button>
        <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white/[0.15] hover:bg-white/[0.20] transition-colors"
        aria-label="Menu de usuario"
      >
        <span className="font-display text-[16px] font-bold text-[var(--text-inverted)]">
          {user.username.charAt(0).toUpperCase()}
        </span>
      </button>

      {showMenu && (
        <div className="absolute right-0 top-[48px] w-[200px] rounded-lg bg-[var(--bg-elevated)] border border-white/10 shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="font-body text-[14px] font-medium text-[var(--text-inverted)] truncate">
              {user.username}
            </p>
            <p className="font-body text-[12px] text-[var(--text-muted)] truncate">
              {user.email}
            </p>
          </div>
          <button
            onClick={async () => {
              await logout();
              setShowMenu(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-3 font-body text-[13px] text-[var(--text-muted)] hover:text-[var(--text-inverted)] hover:bg-white/[0.05] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesion
          </button>
        </div>
      )}
    </div>
  );
}
