'use client'

import { cubicBezier, easeIn, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

// Compact header height (2.75rem of content + 2*2rem of vertical padding)
export const COMPACT_HEIGHT_REM = 6.75
const COMPACT_HEIGHT_PX = COMPACT_HEIGHT_REM * 16

const LOGO_EASE = cubicBezier(0.22, 1, 0.9, 1)
const SNAP_THRESHOLD = 0.2
const SNAP_DELAY = 150

function useHeader(scrollable: boolean) {

  /**
   *  |--------------------------------------------------|
   *  |  Scroll treatment                                |
   *  |--------------------------------------------------|
   */

  const { scrollY } = useScroll()

  // `true` -> locked header (compact), no way back
  const [scrolled, setScrolled] = useState<boolean>(!scrollable)
  const scrollTargetRef = useRef<number | null>(null)

  // Scroll distance necessary to switch from "full screen" to "compact" (100vh - compact height).
  // Kept in a MotionValue (not in React state) so resizing never triggers a re-render.
  const range = useMotionValue<number>(600)
  useEffect(() => {
    const update = () => range.set(Math.max(window.innerHeight - COMPACT_HEIGHT_PX, 1))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [range])

  // 0 = full screen, 1 = compact
  const scrollProgress = useTransform([scrollY, range], ([y, r]: number[]) => Math.min(Math.max(y / r, 0), 1))
  const staticProgress = useMotionValue(1)
  // scrolled = true -> always compact, no more link with the scroll
  const p = scrolled ? staticProgress : scrollProgress

  // Lock as soon as the progress reaches 1.
  // Also covers a page reloaded already scrolled (the first scrollY measure emits a change).
  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (!scrollable || scrolled || v < 1) return
    // Position to restore once the spacer is reduced, so the content doesn't jump
    scrollTargetRef.current = Math.max(0, scrollY.get() - range.get())
    setScrolled(true)
  })

  // Once the spacer is reduced, restore the scroll before paint
  useLayoutEffect(() => {
    if (scrolled && scrollTargetRef.current !== null) {
      window.scrollTo(0, scrollTargetRef.current)
      scrollTargetRef.current = null
    }
  }, [scrolled])

  // Snap: once the scroll stops past SNAP_THRESHOLD, finish the animation
  useEffect(() => {
    if (!scrollable || scrolled) return

    let timeout: ReturnType<typeof setTimeout>
    let touching = false

    const snap = () => {
      if (touching) return
      const progress = scrollProgress.get()
      if (progress >= SNAP_THRESHOLD && progress < 1) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: range.get(), behavior: reduceMotion ? "auto" : "smooth" })
      } else if (progress > 0 && progress < SNAP_THRESHOLD) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
    // Every scroll event (wheel, keyboard, touch momentum, our own smooth scroll) re-arms the timer,
    // so `snap` only runs once the scroll has really stopped
    const schedule = () => {
      clearTimeout(timeout)
      timeout = setTimeout(snap, SNAP_DELAY)
    }
    const onTouchStart = () => {
      touching = true
      clearTimeout(timeout)
    }
    const onTouchEnd = () => {
      touching = false
      schedule()
    }

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [scrollable, scrolled, scrollProgress, range])


  /**
   *  |--------------------------------------------------|
   *  |  Animation values                                |
   *  |--------------------------------------------------|
   */

  // Header
  const headerHeight = useTransform(p, [0, 1], ["100vh", "0vh"])
  const headerPaddingY = useTransform(p, [0, 1], ["0rem", "2rem"])

  // Inner container: from --full-w (responsive) to 100%
  const containerWidth = useTransform(p, (v) => `calc(var(--full-w) + (100% - var(--full-w)) * ${v})`)

  // Logo
  const logoTop = useTransform(p, [0, 0.75], ["35%", "0%"])
  const logoY = useTransform(p, [0, 0.75], ["-50%", "0%"])
  const logoWidthProgress = useTransform(p, [0, 0.5], [0, 1], { ease: LOGO_EASE })
  const logoWidth = useTransform(logoWidthProgress, (t) => `calc(${(1 - t) * 100}% + ${t * 7.5}rem)`)

  // Tagline
  const taglineTop = useTransform(p, [0, 0.9], ["50%", "0%"])
  const taglineY = useTransform(p, [0, 0.9], ["-50%", "0%"])
  const taglineOpacity = useTransform(p, [0, 0.3], [1, 0])

  // Search bar
  const searchTop = useTransform(p, [0.5, 1], ["60%", "0%"], { ease: easeIn })
  const searchY = useTransform(p, [0.5, 1], ["-50%", "0%"])
  const searchLeft = useTransform(p, [0, 0.75], ["0rem", "9.5rem"])
  const searchRight = useTransform(p, [0, 0.75], ["0rem", "8rem"])

  // Actions
  const actionsOpacity = useTransform(p, [0.95, 1], [0, 1])
  const actionsPointerEvents = useTransform(p, (v) => (v < 0.6 ? "none" : "auto"))

  // Scroll CTA
  const ctaOpacity = useTransform(p, [0, 0.3], [1, 0])


  /**
   *  |--------------------------------------------------|
   *  |  Returns                                         |
   *  |--------------------------------------------------|
   */

  return {
    scrolled,
    headerStyle: { height: headerHeight, paddingTop: headerPaddingY, paddingBottom: headerPaddingY },
    containerStyle: { width: containerWidth },
    logoStyle: { top: logoTop, y: logoY, width: logoWidth },
    taglineStyle: { top: taglineTop, y: taglineY, opacity: taglineOpacity },
    searchStyle: { top: searchTop, y: searchY, left: searchLeft, right: searchRight },
    actionsStyle: { opacity: actionsOpacity, pointerEvents: actionsPointerEvents },
    ctaStyle: { opacity: ctaOpacity },
  }
}

export { useHeader }