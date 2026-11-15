import { useState } from 'react';

const ID_RE = /^[\w-]{11}$/;

export default function VideoEmbed({
  youtubeId,
  title,
  startSeconds,
}: {
  youtubeId: string | null;
  title: string;
  startSeconds?: number;
}) {
  const [playing, setPlaying] = useState(false);
  if (!youtubeId || !ID_RE.test(youtubeId)) {
    return (
      <div className="video-frame" role="img" aria-label="Video coming soon">
        <p style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', margin: 0 }}>
          Video coming soon
        </p>
      </div>
    );
  }
  const start = startSeconds ? `&start=${Math.floor(startSeconds)}` : '';
  const watch = `https://www.youtube.com/watch?v=${youtubeId}${startSeconds ? `&t=${Math.floor(startSeconds)}s` : ''}`;
  return (
    <div>
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0${start}`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="thumb"
            aria-label={`Play video: ${title}`}
            onClick={() => setPlaying(true)}
            style={{ background: `#000 url(https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg) center/cover`, borderRadius: 0 }}
          >
            <span style={{ fontSize: '3rem', color: '#C9A227' }}>▶</span>
          </button>
        )}
      </div>
      <p>
        <a href={watch} target="_blank" rel="noreferrer">
          Open on YouTube
        </a>
      </p>
    </div>
  );
}
