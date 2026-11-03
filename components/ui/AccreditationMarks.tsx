type MarkId = "nabh" | "nabl" | "afi" | string;

const logos: Record<string, { full: string; mark: string }> = {
  nabh: { full: "/logos/nabh.png", mark: "/logos/nabh-mark.png" },
  nabl: { full: "/logos/nabl.png", mark: "/logos/nabl-mark.svg" },
  afi: { full: "/logos/afi.svg", mark: "/logos/afi.svg" },
};

export function AccreditationMark({ id, variant = "mark" }: { id: MarkId; variant?: "full" | "mark" }) {
  const file = logos[id] ?? logos.afi;
  const src = variant === "full" ? file.full : file.mark;

  return (
    <img
      className={`accreditation-mark${variant === "full" ? " is-full" : ""}`}
      src={src}
      alt=""
    />
  );
}
