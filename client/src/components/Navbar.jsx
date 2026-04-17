import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: 'movie', label: 'Movies', icon: '🎬' },
  { id: 'event', label: 'Events', icon: '🎭' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
]

export default function Navbar({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎟️</span>
          <span className={styles.logoText}>TicketVerse</span>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <nav className={styles.categories}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.catBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className={styles.catIcon}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
