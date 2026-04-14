"use client"

import { useEffect, useMemo, useState } from "react"

import { usePortfolioI18n } from "./i18n-provider"

export function SiteHeader() {
    const { content } = usePortfolioI18n()
    const navigationItems = content.navigationItems

    const sectionHrefs = useMemo(
        () => navigationItems.map((item) => item.href).filter((href) => href.startsWith("#")),
        [navigationItems],
    )

    const [activeHref, setActiveHref] = useState(sectionHrefs[0] ?? "")

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

    return (
        <>
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-900/60 shadow-none backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
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

            <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-sm border border-white/10 bg-neutral-900/75 p-2 backdrop-blur-xl md:hidden">
                <div className="grid grid-cols-4 gap-1">
                    {navigationItems.map((item) => (
                        <a
                            key={`mobile-${item.label}`}
                            className={
                                item.href === activeHref
                                    ? "rounded-sm bg-surface-container px-2 py-2 text-center font-headline text-[10px] uppercase tracking-wider text-yellow-400 transition-colors"
                                    : "rounded-sm px-2 py-2 text-center font-headline text-[10px] uppercase tracking-wider text-neutral-400 transition-colors hover:text-white"
                            }
                            href={item.href}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>
        </>
    )
}