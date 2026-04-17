import { useState } from 'react'
import styles from './MovieCard.module.css'

const CATEGORY_COLORS = {
  movie: { accent: '#f5c842', bg: 'rgba(245,200,66,0.12)', label: 'Movie' },
  event: { accent: '#00e5c3', bg: 'rgba(0,229,195,0.12)', label: 'Event' },
  travel: { accent: '#a78bfa', bg: 'rgba(167,139,250,0.12)', label: 'Travel' },
}

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`${styles.star} ${i < full ? styles.starFull : i === full && half ? styles.starHalf : styles.starEmpty}`}>★</span>
      ))}
      <span className={styles.ratingNum}>{rating?.toFixed(1)}</span>
    </div>
  )
}

export default function MovieCard({ item, index }) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cat = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.movie

  const formattedDate = item.release_date
    ? new Date(item.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Date TBA'

  const formatPrice = (price) => {
    if (!price) return 'Free'
    return `$${parseFloat(price).toFixed(2)}`
  }

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrap}>
        {!imgError ? (
          <img
            src={item.poster}
            alt={item.title}
            className={styles.poster}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterFallback}>
            <span>{item.category === 'movie' ? '🎬' : item.category === 'event' ? '🎭' : '✈️'}</span>
          </div>
        )}
        <div className={styles.imageOverlay} />

        <span className={styles.badge} style={{ color: cat.accent, background: cat.bg }}>
          {cat.label}
        </span>

        {item.genre && (
          <span className={styles.genre}>{item.genre}</span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{item.title}</h3>

        {item.rating && <StarRating rating={parseFloat(item.rating)} />}

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            {formattedDate}
          </span>
          {item.duration && (
            <span className={styles.metaItem}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {item.duration}
            </span>
          )}
        </div>

        {item.description && (
          <p className={styles.desc}>{item.description}</p>
        )}

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceLabel}>from</span>
            <span className={styles.priceAmount} style={{ color: cat.accent }}>{formatPrice(item.price)}</span>
          </div>
          <button className={styles.bookBtn} style={{ '--accent': cat.accent }}>
            <span>Get Tickets</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {item.available_seats !== undefined && (
          <div className={styles.seats}>
            <div className={styles.seatsBar}>
              <div
                className={styles.seatsProgress}
                style={{
                  width: `${Math.min((item.available_seats / 200) * 100, 100)}%`,
                  background: item.available_seats < 30 ? 'var(--coral)' : cat.accent
                }}
              />
            </div>
            <span className={styles.seatsText} style={{ color: item.available_seats < 30 ? 'var(--coral)' : 'var(--text-muted)' }}>
              {item.available_seats < 30 ? `⚡ Only ${item.available_seats} left!` : `${item.available_seats} seats available`}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
