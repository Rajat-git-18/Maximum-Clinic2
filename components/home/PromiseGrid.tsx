import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { clinic } from "@/content/clinic";

export function PromiseGrid() {
  return (
    <ul className="promise-grid">
      {clinic.principles.map((item) => (
        <li key={item.title}>
          <article className="promise-card">
            {"kicker" in item && item.kicker ? <p className="promise-kicker">{item.kicker}</p> : null}
            <h3>
              <EmphasizedText text={item.title} />
            </h3>
            <p>
              <EmphasizedText text={item.body} />
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
