import { useState, useEffect, useMemo } from 'react'
import MovieCard from '../components/MovieCard'
import { ticketAPI } from '../services/api'
import styles from './Home.module.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'date_asc', label: 'Upcoming First' },
  { value: 'date_desc', label: 'Latest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>✦ Discover & Book</div>
        <h1 className={styles.heroTitle}>
          Your Next<br />
          <span className={styles.heroAccent}>Experience</span><br />
          Awaits
        </h1>
        <p className={styles.heroSub}>
          Movies, live events, and travel — all in one place.
          Find what moves you.
        </p>
      </div>
      <div className={styles.heroOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>
    </section>
  )
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine} style={{ width: '60%', height: '18px' }} />
        <div className={styles.skeletonLine} style={{ width: '40%', height: '12px' }} />
        <div className={styles.skeletonLine} style={{ width: '80%', height: '12px' }} />
        <div className={styles.skeletonLine} style={{ width: '50%', height: '12px' }} />
      </div>
    </div>
  )
}

export default function Home({ searchQuery, activeCategory }) {
  const [allItems, setAllItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await ticketAPI.getAll()
        setAllItems(res.data?.data || [])
      } catch (err) {
        setError('Something went wrong while fetching data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    let items = [...allItems]

    if (activeCategory !== 'all') {
      items = items.filter(i => i.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(i =>
        i.title?.toLowerCase().includes(q) ||
        i.genre?.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'rating':
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      case 'date_asc':
        items.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)); break
      case 'date_desc':
        items.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); break
      case 'price_asc':
        items.sort((a, b) => (a.price || 0) - (b.price || 0)); break
      case 'price_desc':
        items.sort((a, b) => (b.price || 0) - (a.price || 0)); break
      default:
        break
    }

    return items
  }, [allItems, activeCategory, searchQuery, sortBy])

  const categoryLabel = activeCategory === 'all' ? 'All Tickets'
    : activeCategory === 'movie' ? 'Movies'
    : activeCategory === 'event' ? 'Events'
    : 'Travel'

  return (
    <main className={styles.main}>
      <Hero />

      <div className={styles.content}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <h2 className={styles.sectionTitle}>{categoryLabel}</h2>
            {!loading && (
              <span className={styles.count}>
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </span>
            )}
          </div>
          <div className={styles.toolbarRight}>
            <label className={styles.sortLabel} htmlFor="sort">Sort by</label>
            <select
              id="sort"
              className={styles.sortSelect}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search status */}
        {searchQuery && !loading && (
          <div className={styles.searchStatus}>
            {filtered.length > 0
              ? <><span className={styles.searchIcon}>🔍</span> Showing results for <strong>"{searchQuery}"</strong></>
              : <><span className={styles.searchIcon}>😕</span> No results for <strong>"{searchQuery}"</strong> — try a different keyword</>
            }
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.errorBox}>
            <span>⚠️</span>
            <div>
              <strong>Connection Error</strong>
              <p>{error}</p>
            </div>
            <button className={styles.retryBtn} onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className={styles.grid}>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <MovieCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : !error && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎭</div>
            <h3>Nothing found</h3>
            <p>Sorry, I couldn't find any results for that. Try searching something else.</p>
          </div>
        )}
      </div>
    </main>
  )
}
