import type { ReactNode } from "react";
import { EXPERIAN_VIDEOS, type ExperianVideoKey } from "@/data/experianVideos";
import { useI18n } from "@/i18n";

interface ExperianVideoEmbedProps {
  videoKey: ExperianVideoKey;
  footerNote?: ReactNode;
  className?: string;
}

function PlayCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      className="exp-video-chevron"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ExperianVideoEmbed({
  videoKey,
  footerNote,
  className = "",
}: ExperianVideoEmbedProps) {
  const { t, lang } = useI18n();
  const isEs = lang === "es";
  const video = EXPERIAN_VIDEOS[videoKey];

  const title = isEs ? video.title.es : video.title.en;
  const caption = isEs ? video.caption.es : video.caption.en;
  const takeaways = isEs ? video.takeaways.es : video.takeaways.en;
  const transcript = isEs ? video.transcript.es : video.transcript.en;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&playsinline=1`;
  const watchUrl = `https://youtu.be/${video.youtubeId}`;

  return (
    <div className={`exp-video-wrap ${className}`.trim()}>
      <figure className={`exp-video-card ${video.isShort ? "exp-video-card-short" : ""}`}>
        {/* Video Frame */}
        <div className={video.isShort ? "exp-video-short-col" : "exp-video-media-col"}>
          <div className="exp-video-header">
            <span className="exp-video-badge">
              <PlayCircleIcon />
              <span>{video.isShort ? t("video.shortBadge") : t("video.watchBadge")}</span>
            </span>
            <h3 className="exp-video-title">{title}</h3>
          </div>

          <div className={video.isShort ? "exp-video-frame exp-video-frame-short" : "exp-video-frame"}>
            <iframe
              src={embedSrc}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Details Column (Below video for 16:9, side-by-side on desktop for 9:16 Short) */}
        <div className="exp-video-details">
          <figcaption className="exp-video-caption-block">
            <p className="exp-video-caption">{caption}</p>
            <div className="exp-video-credit">
              <span>{t("video.credit")}</span>
              <span aria-hidden="true">·</span>
              <a href={watchUrl} target="_blank" rel="noreferrer noopener">
                {t("video.watchOnYouTube")} ↗
              </a>
            </div>
          </figcaption>

          {/* Key Takeaways Box */}
          <div className="exp-video-takeaways">
            <h4 className="exp-video-takeaways-heading">{t("video.takeaways")}</h4>
            <ul className="exp-video-takeaways-list">
              {takeaways.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Collapsed Transcript Dropdown (Rendered in HTML DOM for Search Indexing) */}
          <details className="exp-video-transcript">
            <summary className="exp-video-transcript-summary">
              <span>{t("video.transcript")}</span>
              <ChevronDownIcon />
            </summary>
            <div className="exp-video-transcript-body">
              {transcript.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        </div>
      </figure>

      {footerNote && <div className="exp-video-footer-note">{footerNote}</div>}
    </div>
  );
}

