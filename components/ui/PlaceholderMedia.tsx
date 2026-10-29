type Motif = "arch" | "window" | "lines" | "court";
type Tone = "green" | "sage" | "paper";
type Ratio = "portrait" | "landscape" | "wide" | "square";

function MotifSvg({ motif }: { motif: Motif }) {
  if (motif === "window") {
    return (
      <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
        <rect x="36" y="28" width="128" height="168" stroke="currentColor" strokeWidth="1.2" />
        <path d="M36 112H164M100 28V196" stroke="currentColor" strokeWidth="1.2" />
        <path d="M52 196V150C52 124 148 124 148 150V196" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (motif === "lines") {
    return (
      <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
        <path d="M40 48H160M40 80H140M40 112H160M40 144H120M40 176H150" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="156" cy="176" r="10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (motif === "court") {
    return (
      <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
        <path d="M28 188H172" stroke="currentColor" strokeWidth="1.2" />
        <path d="M48 188V96H152V188" stroke="currentColor" strokeWidth="1.2" />
        <path d="M48 96L100 52L152 96" stroke="currentColor" strokeWidth="1.2" />
        <rect x="88" y="132" width="24" height="56" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <path d="M46 196V118C46 74 154 74 154 118V196" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 196H166" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="100" cy="108" r="16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function PlaceholderMedia({
  label,
  caption,
  motif = "arch",
  tone = "green",
  ratio = "portrait",
}: {
  label: string;
  caption: string;
  motif?: Motif;
  tone?: Tone;
  ratio?: Ratio;
}) {
  return (
    <figure className={`media media-${ratio} tone-${tone}`}>
      <MotifSvg motif={motif} />
      <figcaption>
        <span className="media-kicker">Placeholder</span>
        <span className="media-title">{label}</span>
        <span className="sr-only">{caption}</span>
      </figcaption>
    </figure>
  );
}
