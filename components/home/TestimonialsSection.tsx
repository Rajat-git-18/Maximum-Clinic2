import { clinic } from "@/content/clinic";

function Stars({ value, label }: { value: number; label: string }) {
  const fill = `${Math.max(0, Math.min(5, value)) * 20}%`;

  return (
    <span className="star-row" role="img" aria-label={label}>
      <span className="star-row-base" aria-hidden="true">
        ★★★★★
      </span>
      <span className="star-row-fill" style={{ width: fill }} aria-hidden="true">
        ★★★★★
      </span>
    </span>
  );
}

export function TestimonialsSection() {
  const reviews = clinic.googleReviews;
  const quotes = clinic.testimonials.filter((item) => item.authorised && item.quote.trim() && item.name.trim());

  if (reviews.items.length === 0 && quotes.length === 0) return null;

  return (
    <section className="section" aria-labelledby="stories-heading">
      <div className="container">
        {reviews.items.length > 0 ? (
          <>
            <p className="eyebrow">Google reviews</p>
            <h2 id="stories-heading">What patients wrote on Google.</h2>
            <p className="lede">
              {reviews.rating} from {reviews.count} reviews on the Maximum Clinics listing. These are patient
              reviews, shown as written.
            </p>
            <div className="review-summary">
              <p className="review-score">{reviews.rating}</p>
              <div>
                <Stars value={reviews.rating} label={`${reviews.rating} out of 5 on Google`} />
                <p className="review-count">{reviews.count} Google reviews</p>
              </div>
              <a className="btn btn-secondary" href={reviews.url} target="_blank" rel="noopener noreferrer">
                Read all {reviews.count} reviews
                <span className="sr-only"> on Google (opens in a new tab)</span>
              </a>
            </div>
            <ul className="review-grid">
              {reviews.items.map((item) => (
                <li className="review-card" key={item.name}>
                  <Stars value={item.stars} label={`${item.stars} out of 5`} />
                  <blockquote>
                    <p>{item.quote}</p>
                  </blockquote>
                  <footer>
                    <cite>{item.name}</cite>
                    <span>Google review</span>
                  </footer>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {quotes.length > 0 ? (
          <div className="quotes">
            {quotes.map((item) => (
              <blockquote key={item.name}>
                <p>{item.quote}</p>
                <footer>
                  <cite>{item.name}</cite>
                  {item.context ? <span>{item.context}</span> : null}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
