import { useRef } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder="Search movies, events, destinations..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Clear search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  )
}
