"use client"

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react"

import {
    defaultLocale,
    normalizeLocale,
    portfolioContentByLocale,
    type Locale,
} from "@/lib/portfolio-content"

const STORAGE_KEY = "portfolio-locale"

type PortfolioI18nContextValue = {
    locale: Locale
    setLocale: (nextLocale: Locale) => void
    content: (typeof portfolioContentByLocale)[Locale]
}

const PortfolioI18nContext = createContext<PortfolioI18nContextValue | null>(null)

export function PortfolioI18nProvider({
    children,
    initialLocale,
}: {
    children: ReactNode
    initialLocale: Locale
}) {
    const [locale, setLocale] = useState<Locale>(() => {
        if (typeof window === "undefined") return initialLocale
        const storedValue = window.localStorage.getItem(STORAGE_KEY)
        return storedValue ? normalizeLocale(storedValue) : initialLocale
    })

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, locale)
        document.documentElement.lang = locale
    }, [locale])

    const value = useMemo(
        () => ({
            locale,
            setLocale,
            content: portfolioContentByLocale[locale] ?? portfolioContentByLocale[defaultLocale],
        }),
        [locale],
    )

    return (
        <PortfolioI18nContext.Provider value={value}>{children}</PortfolioI18nContext.Provider>
    )
}

export function usePortfolioI18n() {
    const context = useContext(PortfolioI18nContext)

    if (!context) {
        throw new Error("usePortfolioI18n must be used within PortfolioI18nProvider")
    }

    return context
}
