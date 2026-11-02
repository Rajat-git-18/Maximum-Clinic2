"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { searchCatalog } from "@/lib/search";

export function SiteSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const listId = useId();
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [path, setPath] = useState(pathname);

  if (pathname !== path) {
    setPath(pathname);
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  const results = searchCatalog(query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    setActive(0);
    router.push(href);
  }

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => inputRef.current?.focus());

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  function onKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = results[active];
      if (hit) go(hit.href);
    }
  }

  return (
    <div className={`site-search${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        ref={toggleRef}
        className="search-toggle"
        type="button"
        aria-label="Search a doctor"
        aria-expanded={open}
        aria-controls={inputId}
        onClick={() => {
          if (open) close();
          else setOpen(true);
        }}
      >
        <SearchIcon />
      </button>
      {open ? (
        <div className="search-panel">
          <div className="search-field">
            <SearchIcon />
            <label className="sr-only" htmlFor={inputId}>
              Search a doctor
            </label>
            <input
              id={inputId}
              ref={inputRef}
              type="search"
              autoComplete="off"
              placeholder="Search a doctor"
              value={query}
              aria-autocomplete="list"
              aria-controls={listId}
              aria-expanded={open}
              aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
              role="combobox"
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
            />
            <Link className="search-book" href="/book" aria-label="Book an appointment">
              <span className="btn-full">Book an appointment</span>
              <span className="btn-short">Book</span>
            </Link>
            <button className="search-close" type="button" aria-label="Close search" onClick={close}>
              <CloseIcon />
            </button>
          </div>
          <ul className="search-results" id={listId} role="listbox">
            {results.length === 0 ? (
              <li className="search-empty">
                Individual doctors are not listed yet. Try a specialty, or request a visit.
              </li>
            ) : (
              results.map((item, index) => (
                <li key={`${item.href}-${item.title}`} role="presentation">
                  <Link
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === active}
                    className={index === active ? "is-active" : undefined}
                    href={item.href}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <span>{item.title}</span>
                    <small>{item.hint}</small>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
