"use client"

import { useEffect, useState } from "react"
import { Globe, X } from "lucide-react"

import { localeOptions } from "@/lib/portfolio-content"
import { usePortfolioI18n } from "./i18n-provider"

export function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const { locale, setLocale, content } = usePortfolioI18n()

    useEffect(() => {
        if (!isOpen) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [isOpen])

    return (
        <>
            <button
                aria-label={content.languageModal.title}
                className="fixed right-0 top-[15%] z-[70] flex h-12 w-12 items-center justify-center rounded-l-full border border-outline-variant/30 bg-surface-container/85 text-primary shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-surface-container-high"
                onClick={() => setIsOpen(true)}
                type="button"
            >
                <Globe className="h-5 w-5" strokeWidth={1.5} />
            </button>

            {isOpen ? (
                <div className="fixed inset-0 z-[80] flex items-center justify-center px-6">
                    <button
                        aria-label={content.languageModal.close}
                        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                        type="button"
                    />

                    <div className="relative w-full max-w-md rounded-sm border border-outline-variant/40 bg-surface-container-low p-7 text-on-surface shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                        <button
                            aria-label={content.languageModal.close}
                            className="absolute right-4 top-4 rounded-sm p-1 text-on-surface-variant transition-colors hover:text-primary"
                            onClick={() => setIsOpen(false)}
                            type="button"
                        >
                            <X className="h-4 w-4" strokeWidth={1.6} />
                        </button>

                        <h2 className="font-headline text-2xl font-bold text-white">
                            {content.languageModal.title}
                        </h2>
                        <p className="mt-2 text-sm text-on-surface-variant">
                            {content.languageModal.description}
                        </p>

                        <div className="mt-6 space-y-3">
                            {localeOptions.map((option) => {
                                const selected = option.code === locale

                                return (
                                    <button
                                        key={option.code}
                                        className={
                                            selected
                                                ? "w-full rounded-sm border border-primary/40 bg-primary/15 px-4 py-3 text-left font-label text-sm font-semibold uppercase tracking-wider text-primary"
                                                : "w-full rounded-sm border border-outline-variant/25 bg-surface-container px-4 py-3 text-left font-label text-sm font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/30 hover:text-primary"
                                        }
                                        onClick={() => {
                                            setLocale(option.code)
                                            setIsOpen(false)
                                        }}
                                        type="button"
                                    >
                                        {option.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
