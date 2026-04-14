"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Menu, MoveLeft } from "lucide-react"

import { usePortfolioI18n } from "./i18n-provider"

export function SiteHeader() {
    const CLOSED_MENU_WIDTH = 48
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
    const mobileMenuItemsRef = useRef<HTMLDivElement | null>(null)

    const getExpandedMenuWidth = useCallback(() => {
        const contentWidth = mobileMenuItemsRef.current?.scrollWidth ?? CLOSED_MENU_WIDTH
        const viewportMaxWidth = Math.max(CLOSED_MENU_WIDTH, window.innerWidth - MOBILE_MENU_SAFE_GAP)
        return Math.min(contentWidth, viewportMaxWidth)
    }, [])

    const openMobileMenu = useCallback(() => {
        setIsMobileMenuInteracting(false)
        setIsMobileMenuOpen(true)

        window.requestAnimationFrame(() => {
            setMobileMenuWidth(getExpandedMenuWidth())
        })
    }, [getExpandedMenuWidth])

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuInteracting(false)
        setIsMobileMenuOpen(false)
        setMobileMenuWidth(CLOSED_MENU_WIDTH)
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
        }

        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [getExpandedMenuWidth, isMobileMenuOpen])

    return (
        <>
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-900/60 shadow-none backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 md:px-8">
                    <div className="font-headline text-xl font-bold tracking-tighter text-white">
                        marco.dev
                    </div>

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

            <div className="fixed bottom-4 right-0 z-50 md:hidden">
                <div
                    className="transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${mobileMenuWidth}px` }}
                >
                    <nav
                        className="relative overflow-hidden rounded-l-full border border-white/10 bg-neutral-900/80 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                        onMouseEnter={() => setIsMobileMenuInteracting(true)}
                        onMouseLeave={() => setIsMobileMenuInteracting(false)}
                        onTouchCancel={() => setIsMobileMenuInteracting(false)}
                        onTouchEnd={() => setIsMobileMenuInteracting(false)}
                        onTouchStart={() => setIsMobileMenuInteracting(true)}
                    >
                        <div className="flex min-h-12 items-center justify-end">
                            <div
                                ref={mobileMenuItemsRef}
                                className={
                                    isMobileMenuOpen
                                        ? "flex w-fit translate-x-0 items-center gap-2 px-3 py-2 pr-14 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                        : "pointer-events-none flex w-fit translate-x-6 items-center gap-2 px-3 py-2 pr-14 opacity-0 transition-all duration-300"
                                }
                            >
                                {navigationItems.map((item) => (
                                    <a
                                        key={`mobile-${item.label}`}
                                        className={
                                            item.href === activeHref
                                                ? "flex-none whitespace-nowrap rounded-full bg-surface-container px-3 py-2 text-center font-headline text-[10px] uppercase tracking-[0.14em] text-yellow-400 transition-colors"
                                                : "flex-none whitespace-nowrap rounded-full px-3 py-2 text-center font-headline text-[10px] uppercase tracking-[0.14em] text-neutral-300 transition-colors"
                                        }
                                        href={item.href}
                                        onClick={() => {
                                            setIsMobileMenuInteracting(true)

                                            window.setTimeout(() => {
                                                closeMobileMenu()
                                            }, 300)
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>

                            <button
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Open mobile navigation"
                                className={
                                    isMobileMenuOpen
                                        ? "absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-none bg-surface-container/90 text-primary transition-colors hover:bg-surface-container-high"
                                        : "absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-l-full bg-surface-container/90 text-primary transition-colors hover:bg-surface-container-high"
                                }
                                onClick={() => {
                                    if (isMobileMenuOpen) {
                                        closeMobileMenu()
                                        return
                                    }

                                    openMobileMenu()
                                }}
                                type="button"
                            >
                                {isMobileMenuOpen ? (
                                    <MoveLeft className="h-5 w-5" strokeWidth={1.6} />
                                ) : (
                                    <Menu className="h-5 w-5" strokeWidth={1.6} />
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}