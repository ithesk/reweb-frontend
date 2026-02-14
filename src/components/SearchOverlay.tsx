"use client";

import { useRef, useEffect, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/hooks/useSearch";
import type { SearchResult } from "@/lib/types";

function ResultGroup({
  label,
  results,
  onSelect,
}: {
  label: string;
  results: SearchResult[];
  onSelect: () => void;
}) {
  return (
    <div>
      <div className="px-4 py-2 font-display text-[11px] font-bold text-[var(--text-muted)] tracking-[2px] uppercase border-b border-white/5">
        {label}
      </div>
      {results.map((r) => (
        <Link
          key={`${r.type}-${r.id}`}
          href={`/${r.slug}`}
          onClick={onSelect}
          className="flex flex-col gap-0.5 px-4 py-3 hover:bg-white/[0.05] transition-colors"
        >
          <span className="font-body text-[14px] text-[var(--text-inverted)] truncate">
            {r.title}
          </span>
          {r.description && (
            <span className="font-body text-[12px] text-[var(--text-muted)] truncate">
              {r.description}
            </span>
          )}
          {r.displayDate && (
            <span className="font-body text-[11px] text-[var(--text-muted)]">
              {r.displayDate}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

interface SearchOverlayProps {
  placeholder?: string;
  className?: string;
}

export function SearchOverlay({ placeholder = "Buscar", className }: SearchOverlayProps) {
  const { query, setQuery, results, isSearching, clearSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults =
    results &&
    (results.services.length > 0 ||
      results.events.length > 0 ||
      results.pages.length > 0);

  const showDropdown = isOpen && query.length >= 2;

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <div className={`flex items-center gap-[10px] ${className ? "w-full" : "w-[220px]"} h-[40px] rounded-[20px] bg-white/[0.08] px-4`}>
        {isSearching ? (
          <Loader2 className="w-[18px] h-[18px] text-[var(--text-muted)] animate-spin shrink-0" />
        ) : (
          <Search className="w-[18px] h-[18px] text-[var(--text-muted)] shrink-0" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              clearSearch();
              setIsOpen(false);
            }
          }}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none font-body text-[13px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] w-full"
          aria-label="Buscar contenido"
        />
        {query && (
          <button
            onClick={() => {
              clearSearch();
              setIsOpen(false);
            }}
          >
            <X className="w-[14px] h-[14px] text-[var(--text-muted)] shrink-0" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-[48px] left-0 w-[320px] max-h-[400px] overflow-y-auto rounded-lg bg-[var(--bg-elevated)] border border-white/10 shadow-2xl z-50">
          {isSearching && !results && (
            <div className="p-4 text-center text-[var(--text-muted)] font-body text-[13px]">
              Buscando...
            </div>
          )}
          {results && !hasResults && (
            <div className="p-4 text-center text-[var(--text-muted)] font-body text-[13px]">
              Sin resultados para &ldquo;{query}&rdquo;
            </div>
          )}
          {results && results.services.length > 0 && (
            <ResultGroup
              label="Servicios"
              results={results.services}
              onSelect={() => {
                clearSearch();
                setIsOpen(false);
              }}
            />
          )}
          {results && results.events.length > 0 && (
            <ResultGroup
              label="Eventos"
              results={results.events}
              onSelect={() => {
                clearSearch();
                setIsOpen(false);
              }}
            />
          )}
          {results && results.pages.length > 0 && (
            <ResultGroup
              label="Paginas"
              results={results.pages}
              onSelect={() => {
                clearSearch();
                setIsOpen(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
