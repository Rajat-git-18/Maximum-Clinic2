import { EmphasizedText } from "@/components/ui/EmphasizedText";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  split = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
  split?: boolean;
}) {
  if (split) {
    return (
      <div className="section-heading split">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id}>
            <EmphasizedText text={title} />
          </h2>
        </div>
        {lede ? (
          <p className="lede">
            <EmphasizedText text={lede} />
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>
        <EmphasizedText text={title} />
      </h2>
      {lede ? (
        <p className="lede">
          <EmphasizedText text={lede} />
        </p>
      ) : null}
    </div>
  );
}
