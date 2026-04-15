"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MessageCircle } from "lucide-react"

import { usePortfolioI18n } from "./i18n-provider"

export function SiteHeader() {
    const CLOSED_MENU_WIDTH = 156
    const CLOSED_MENU_HEIGHT = 108
    const MOBILE_MENU_SAFE_GAP = 12

    const { content } = usePortfolioI18n()
    const navigationItems = content.navigationItems

    const sectionHrefs = useMemo(
        () => navigationItems.map((item) => item.href).filter((href) => href.startsWith("#")),
        [navigationItems],
    )

    const [activeHref, setActiveHref] = useState(sectionHrefs[0] ?? "")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobileMenuInteracting, setIsMobileMenuInteracting] = useState(false)
    const [mobileMenuWidth, setMobileMenuWidth] = useState(CLOSED_MENU_WIDTH)
    const [mobileMenuHeight, setMobileMenuHeight] = useState(CLOSED_MENU_HEIGHT)
    const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true)
    const mobileMenuItemsRef = useRef<HTMLDivElement | null>(null)
    const lastScrollYRef = useRef(0)
    const lastTouchMoveAtRef = useRef<number | null>(null)
    const [mobileMenuCursorHref, setMobileMenuCursorHref] = useState(sectionHrefs[0] ?? "")
    const mobileMenuTouchStartYRef = useRef<number | null>(null)
    const mobileMenuTouchConsumedRef = useRef(false)

    const getExpandedMenuWidth = useCallback(() => {
        const contentWidth = mobileMenuItemsRef.current?.scrollWidth ?? CLOSED_MENU_WIDTH
        const viewportMaxWidth = Math.max(CLOSED_MENU_WIDTH, window.innerWidth - MOBILE_MENU_SAFE_GAP)
        return Math.min(contentWidth, viewportMaxWidth)
    }, [])

    const getExpandedMenuHeight = useCallback(() => {
        const contentHeight = mobileMenuItemsRef.current?.scrollHeight ?? CLOSED_MENU_HEIGHT
        const viewportMaxHeight = Math.max(CLOSED_MENU_HEIGHT, window.innerHeight - MOBILE_MENU_SAFE_GAP)
        return Math.min(contentHeight, viewportMaxHeight)
    }, [])

    const openMobileMenu = useCallback(() => {
        setIsMobileMenuInteracting(false)
        setIsMobileMenuOpen(true)

        window.requestAnimationFrame(() => {
            setMobileMenuWidth(getExpandedMenuWidth())
            setMobileMenuHeight(getExpandedMenuHeight())
        })
    }, [getExpandedMenuHeight, getExpandedMenuWidth])

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuInteracting(false)
        setIsMobileMenuOpen(false)
        setMobileMenuWidth(CLOSED_MENU_WIDTH)
        setMobileMenuHeight(CLOSED_MENU_HEIGHT)
    }, [])

    useEffect(() => {
        const visibilityById = new Map<string, number>()

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = `#${entry.target.id}`
                    if (entry.isIntersecting) {
                        visibilityById.set(id, entry.intersectionRatio)
                    } else {
                        visibilityById.delete(id)
                    }
                }

                let nextActive = sectionHrefs[0] ?? ""
                let bestRatio = -1

                for (const href of sectionHrefs) {
                    const ratio = visibilityById.get(href) ?? -1
                    if (ratio > bestRatio) {
                        bestRatio = ratio
                        nextActive = href
                    }
                }

                setActiveHref((previous) => (previous === nextActive ? previous : nextActive))
            },
            {
                root: null,
                rootMargin: "-30% 0px -45% 0px",
                threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
            },
        )

        for (const href of sectionHrefs) {
            const section = document.getElementById(href.slice(1))
            if (section) observer.observe(section)
        }

        return () => observer.disconnect()
    }, [sectionHrefs])

    useEffect(() => {
        const getIsMobileViewport = () => window.matchMedia("(max-width: 767px)").matches
        const MIN_DELTA = 6
        const HIDE_AFTER_Y = 24
        const TOUCH_SCROLL_WINDOW_MS = 180

        lastScrollYRef.current = window.scrollY

        const onScroll = () => {
            if (!getIsMobileViewport()) {
                if (!isMobileHeaderVisible) setIsMobileHeaderVisible(true)
                lastScrollYRef.current = window.scrollY
                return
            }

            const current = window.scrollY
            const previous = lastScrollYRef.current
            const delta = current - previous

            if (Math.abs(delta) < MIN_DELTA) return

            const lastTouchMoveAt = lastTouchMoveAtRef.current
            const isLikelyTouchScroll =
                lastTouchMoveAt !== null && Date.now() - lastTouchMoveAt < TOUCH_SCROLL_WINDOW_MS

            if (delta > 0 && current > HIDE_AFTER_Y && isLikelyTouchScroll) {
                setIsMobileHeaderVisible(false)
            } else if (delta < 0) {
                setIsMobileHeaderVisible(true)
            }

            lastScrollYRef.current = current
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [isMobileHeaderVisible])

    useEffect(() => {
        const getIsMobileViewport = () => window.matchMedia("(max-width: 767px)").matches

        const onTouchMove = () => {
            if (!getIsMobileViewport()) return
            lastTouchMoveAtRef.current = Date.now()
        }

        window.addEventListener("touchmove", onTouchMove, { passive: true })
        return () => window.removeEventListener("touchmove", onTouchMove)
    }, [])

    useEffect(() => {
        if (!activeHref) return
        if (isMobileMenuOpen) return
        setMobileMenuCursorHref(activeHref)
    }, [activeHref, isMobileMenuOpen])

    useEffect(() => {
        if (!isMobileMenuOpen || isMobileMenuInteracting) return

        const timeoutId = window.setTimeout(() => {
            closeMobileMenu()
        }, 2500)

        return () => window.clearTimeout(timeoutId)
    }, [closeMobileMenu, isMobileMenuInteracting, isMobileMenuOpen])

    useEffect(() => {
        if (!isMobileMenuOpen) return

        const onResize = () => {
            setMobileMenuWidth(getExpandedMenuWidth())
            setMobileMenuHeight(getExpandedMenuHeight())
        }

        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [getExpandedMenuHeight, getExpandedMenuWidth, isMobileMenuOpen])

    const mobileMenuCursorIndex = useMemo(() => {
        const index = navigationItems.findIndex((item) => item.href === mobileMenuCursorHref)
        if (index >= 0) return index
        return navigationItems.findIndex((item) => item.href === activeHref)
    }, [activeHref, mobileMenuCursorHref, navigationItems])

    const shiftMobileMenuCursor = useCallback(
        (direction: -1 | 1) => {
            if (navigationItems.length === 0) return
            const baseIndex = mobileMenuCursorIndex >= 0 ? mobileMenuCursorIndex : 0
            const nextIndex = (baseIndex + direction + navigationItems.length) % navigationItems.length
            setMobileMenuCursorHref(navigationItems[nextIndex]?.href ?? "")
            setIsMobileMenuInteracting(true)
            window.setTimeout(() => setIsMobileMenuInteracting(false), 220)
        },
        [mobileMenuCursorIndex, navigationItems],
    )

    return (
        <>
            <nav
                className={
                    isMobileHeaderVisible
                        ? "fixed top-0 z-50 w-full translate-y-0 border-b border-white/10 bg-neutral-900/60 shadow-none backdrop-blur-xl transition-transform duration-300 ease-out md:translate-y-0"
                        : "fixed top-0 z-50 w-full -translate-y-full border-b border-white/10 bg-neutral-900/60 shadow-none backdrop-blur-xl transition-transform duration-300 ease-out md:translate-y-0"
                }
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 md:px-8">
                    <div className="font-headline text-xl font-bold tracking-tighter text-white">
                        marco.dev
                    </div>

                    <a href="https://wa.me/5511933044711" className='md:hidden flex' onClick={() => { return }}><MessageCircle strokeWidth={1.4} className='h-6 w-6 text-secondary transition-colors group-hover:text-primary' /></a>

                    <div className="hidden items-center gap-10 font-headline text-sm font-medium uppercase tracking-tight md:flex">
                        {navigationItems.map((item) => (
                            <a
                                key={item.label}
                                className={
                                    item.href === activeHref
                                        ? "relative py-1 text-yellow-400 transition-all duration-300"
                                        : "py-1 text-neutral-400 transition-colors hover:text-white"
                                }
                                href={item.href}
                            >
                                {item.label}
                                {item.href === activeHref ? (
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-yellow-400 transition-all duration-300 animate-fade-in" />
                                ) : null}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="fixed bottom-4 right-4 z-50 md:hidden">
                <div
                    className="transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${mobileMenuWidth}px`, height: `${mobileMenuHeight}px` }}
                >
                    <nav
                        className="relative h-full min-h-0 overflow-hidden"
                        onMouseEnter={() => setIsMobileMenuInteracting(true)}
                        onMouseLeave={() => setIsMobileMenuInteracting(false)}
                        onTouchCancel={() => setIsMobileMenuInteracting(false)}
                        onTouchEnd={() => setIsMobileMenuInteracting(false)}
                        onTouchStart={() => setIsMobileMenuInteracting(true)}
                    >
                        <div className="relative flex h-full w-full items-end justify-end">
                            <div className="relative">
                                <div
                                    className={
                                        isMobileMenuOpen
                                            ? "pointer-events-none absolute bottom-0 right-0 w-[156px] translate-y-2 opacity-0 transition-all duration-300"
                                            : "absolute bottom-0 right-0 w-[156px] translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    }
                                    onTouchStart={(event) => {
                                        mobileMenuTouchStartYRef.current = event.touches[0]?.clientY ?? null
                                        mobileMenuTouchConsumedRef.current = false
                                    }}
                                    onTouchMove={(event) => {
                                        const startY = mobileMenuTouchStartYRef.current
                                        const currentY = event.touches[0]?.clientY
                                        if (startY === null || currentY === undefined) return
                                        if (mobileMenuTouchConsumedRef.current) return
                                        const deltaY = currentY - startY
                                        if (Math.abs(deltaY) < 18) return
                                        mobileMenuTouchConsumedRef.current = true
                                        shiftMobileMenuCursor(deltaY > 0 ? 1 : -1)
                                    }}
                                    onTouchEnd={() => {
                                        mobileMenuTouchStartYRef.current = null
                                        mobileMenuTouchConsumedRef.current = false
                                    }}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isMobileMenuOpen}
                                        aria-label="Open mobile navigation"
                                        className="group flex w-[156px] select-none items-center justify-between gap-3 rounded-full bg-surface-container/20 px-4 py-3 backdrop-blur-md"
                                        onClick={() => {
                                            if (isMobileMenuOpen) closeMobileMenu()
                                            else openMobileMenu()
                                        }}
                                    >
                                        <span className="truncate font-headline text-[11px] font-semibold uppercase tracking-[0.14em] text-yellow-400">
                                            {navigationItems[mobileMenuCursorIndex]?.label ?? ""}
                                        </span>
                                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400" />
                                    </button>
                                </div>

                                <div
                                    ref={mobileMenuItemsRef}
                                    className={
                                        isMobileMenuOpen
                                            ? "flex w-[156px] flex-col items-stretch gap-2 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                            : "pointer-events-none flex w-[156px] translate-y-2 flex-col items-stretch gap-2 opacity-0 transition-all duration-300"
                                    }
                                >
                                    {navigationItems.map((item) => {
                                        const isActive = item.href === activeHref
                                        return (
                                            <a
                                                key={`mobile-${item.label}`}
                                                className="flex items-center justify-between gap-3 rounded-full bg-surface-container/20 px-4 py-3 font-headline text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-200 backdrop-blur-md transition-colors hover:text-white"
                                                href={item.href}
                                                onClick={() => {
                                                    setIsMobileMenuInteracting(true)
                                                    setMobileMenuCursorHref(item.href)
                                                    window.setTimeout(() => closeMobileMenu(), 260)
                                                }}
                                            >
                                                <span className="truncate">{item.label}</span>
                                                <span
                                                    className={
                                                        isActive
                                                            ? "h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400"
                                                            : "h-2.5 w-2.5 shrink-0 rounded-full bg-white/20"
                                                    }
                                                />
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}