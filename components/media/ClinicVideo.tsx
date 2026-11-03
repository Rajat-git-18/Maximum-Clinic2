"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ClinicVideo as ClinicVideoItem } from "@/content/clinic";

export function ClinicVideo({ video, caption = true }: { video: ClinicVideoItem; caption?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playing) return;
    const start = player.current?.play();
    if (start) void start.catch(() => undefined);
  }, [playing]);

  return (
    <figure className="clinic-video" id={video.slug}>
      <div className="clinic-video-frame">
        {playing ? (
          <video
            ref={player}
            controls
            playsInline
            preload="none"
            poster={video.poster}
            width={720}
            height={1280}
            aria-label={video.title}
          >
            <source src={video.src} type="video/mp4" />
            This browser cannot play the video. Call the clinic if you need the same information another way.
          </video>
        ) : (
          <button type="button" className="clinic-video-start" onClick={() => setPlaying(true)}>
            <Image
              src={video.poster}
              alt=""
              width={720}
              height={1280}
              sizes="(max-width: 720px) 80vw, 280px"
            />
            <span className="clinic-video-play" aria-hidden="true" />
            <span className="sr-only">Play {video.title}</span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption>
          <strong>{video.title}</strong>
          <span>{video.lede}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
