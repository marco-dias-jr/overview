"use client"

import { MatrixRainBackground } from "./matrix-rain-background"
import { usePortfolioI18n } from "./i18n-provider"

export function HeroSection() {
    const { content } = usePortfolioI18n()
    const heroContent = content.heroContent

    return (
        <section
            className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
            id="hero"
        >
            <MatrixRainBackground />
            <div className="bg-grid-pattern absolute inset-0 z-[1] opacity-20" />

            <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
                <h1 className="mb-6 font-headline text-6xl font-extrabold leading-tight tracking-tighter text-white md:text-8xl">
                    {heroContent.firstName} <span className="text-primary">{heroContent.lastName}</span>
                </h1>

                <h2 className="mb-8 font-headline text-2xl font-medium tracking-tight text-secondary-fixed-dim md:text-3xl">
                    {heroContent.role}
                </h2>

                <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
                    {heroContent.summary}
                </p>

                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                    <a
                        className="flex w-full items-center justify-center border border-primary bg-transparent px-10 py-4 text-center font-headline text-sm font-medium uppercase tracking-widest text-primary transition-all hover:bg-primary/10 active:scale-95 sm:w-auto"
                        href={heroContent.cta.href}
                    >
                        {heroContent.cta.label}
                    </a>
                </div>
            </div>
        </section>
    )
}