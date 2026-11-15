'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { Monitor, Moon, Sun, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type ThemeOption = 'system' | 'dark' | 'light'

const OPTIONS: { key: ThemeOption; icon: React.ElementType; label: string }[] = [
  { key: 'system', icon: Monitor, label: 'System' },
  { key: 'dark',   icon: Moon,    label: 'Dark'   },
  { key: 'light',  icon: Sun,     label: 'Light'  },
]

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted]   = useState(false)
  const [open, setOpen]         = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  if (!mounted) return <div className="h-9 w-24" />

  const current = OPTIONS.find((o) => o.key === theme) ?? OPTIONS[0]
  const ActiveIcon = resolvedTheme === 'dark' ? Moon : resolvedTheme === 'light' ? Sun : Monitor

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select colour theme"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="
          flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold
          transition-all duration-300 outline-none select-none
          border-[var(--border-nav)] bg-[var(--bg-card)]
          text-[var(--fg-muted)] hover:border-[var(--accent)]/50
          hover:text-[var(--fg)] hover:bg-[var(--accent)]/8
          focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50
        "
      >
        <ActiveIcon size={13} />
        <span>{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown size={12} />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Theme options"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="
              absolute right-0 top-[calc(100%+6px)] z-[200] min-w-[130px]
              overflow-hidden rounded-2xl border shadow-xl
              border-[var(--border-nav)] bg-[var(--bg-mobile)]
              backdrop-blur-xl
            "
          >
            {OPTIONS.map(({ key, icon: Icon, label }) => {
              const active = theme === key
              return (
                <motion.li
                  key={key}
                  role="option"
                  aria-selected={active}
                  onClick={() => { setTheme(key); setOpen(false) }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.14 }}
                  className={`
                    flex cursor-pointer items-center gap-2.5 px-4 py-2.5 text-xs font-medium
                    transition-colors duration-150
                    ${active
                      ? 'text-[var(--accent)] bg-[var(--accent)]/8'
                      : 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--accent)]/5'
                    }
                  `}
                >
                  <Icon size={13} />
                  {label}
                  {active && (
                    <motion.span
                      layoutId="theme-check"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
