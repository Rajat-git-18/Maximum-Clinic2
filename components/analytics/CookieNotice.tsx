"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics, measurementId } from "@/components/analytics/GoogleAnalytics";

const STORAGE_KEY = "mh-analytics-choice";

export function CookieNotice() {
  const id = measurementId();
  const [choice, setChoice] = useState<"accepted" | "declined" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setChoice(stored === "accepted" || stored === "declined" ? stored : null);
    setReady(true);
  }, []);

  function choose(next: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
  }

  if (!id || !ready) return null;

  return (
    <>
      {choice === "accepted" ? <GoogleAnalytics id={id} /> : null}
      {choice ? null : (
        <div className="cookie-notice" role="dialog" aria-label="Analytics cookies">
          <p>
            This site can count visits with Google Analytics. That starts only if you accept. There are no
            advertising cookies.
          </p>
          <div className="cookie-notice-actions">
            <button type="button" className="btn btn-primary btn-capsule" onClick={() => choose("accepted")}>
              Accept
            </button>
            <button type="button" className="btn btn-glass btn-capsule" onClick={() => choose("declined")}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
