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
  compact?: boolean;
}

export function SearchOverlay({ placeholder = "Buscar", className, compact }: SearchOverlayProps) {
  const { query, setQuery, results, isSearching, clearSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (compact && !query) setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [compact, query]);

  const hasResults =
    results &&
    (results.services.length > 0 ||
      results.events.length > 0 ||
      results.pages.length > 0);

  const showDropdown = isOpen && query.length >= 2;

  // Compact mode: just show icon button, expand on click
  if (compact && !expanded) {
    return (
      <button
        onClick={() => {
          setExpanded(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white/[0.08] hover:bg-white/[0.12] transition-colors"
        aria-label="Buscar"
      >
        <Search className="w-[18px] h-[18px] text-[var(--text-inverted)]" />
      </button>
    );
  }

  // Compact expanded: full-screen search overlay on mobile
  if (compact && expanded) {
    return (
      <div className="fixed inset-0 z-[60] bg-[var(--bg-dark)]" ref={containerRef}>
        <div className="flex items-center gap-3 px-4 h-[60px] border-b border-white/10">
          <Search className="w-[18px] h-[18px] text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none font-body text-[16px] text-[var(--text-inverted)] placeholder:text-[var(--text-muted)] w-full"
            aria-label="Buscar contenido"
            autoFocus
          />
          <button
            onClick={() => {
              clearSearch();
              setIsOpen(false);
              setExpanded(false);
            }}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/[0.08]"
          >
            <X className="w-[18px] h-[18px] text-[var(--text-inverted)]" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-60px)]">
          {isSearching && !results && (
            <div className="flex items-center justify-center gap-2 p-6 text-[var(--text-muted)] font-body text-[14px]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando...
            </div>
          )}
          {query.length >= 2 && results && !hasResults && (
            <div className="p-6 text-center text-[var(--text-muted)] font-body text-[14px]">
              Sin resultados para &ldquo;{query}&rdquo;
            </div>
          )}
          {results && results.services.length > 0 && (
            <ResultGroup
              label="Servicios"
              results={results.services}
              onSelect={() => {
                clearSearch();
                setExpanded(false);
              }}
            />
          )}
          {results && results.events.length > 0 && (
            <ResultGroup
              label="Eventos"
              results={results.events}
              onSelect={() => {
                clearSearch();
                setExpanded(false);
              }}
            />
          )}
          {results && results.pages.length > 0 && (
            <ResultGroup
              label="Paginas"
              results={results.pages}
              onSelect={() => {
                clearSearch();
                setExpanded(false);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // Default desktop mode
  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <div className="flex items-center gap-[10px] w-[220px] h-[40px] rounded-[8px] bg-white/[0.08] px-4 transition-colors focus-within:ring-1 focus-within:ring-[var(--brand-primary)]">
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
