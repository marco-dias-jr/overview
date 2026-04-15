"use client"

import { CheckCircle2 } from 'lucide-react'
import { usePortfolioI18n } from "./i18n-provider"
import { useReplayInView } from "./use-replay-in-view"

export function ExperienceSection() {
    const { content } = usePortfolioI18n()
    const experience = content.experience
    const { ref, replayKey, inView } = useReplayInView<HTMLElement>({
        threshold: 0.24,
        rootMargin: "-10% 0px -17% 0px",
    })
    const hideAnimated = inView === false

    return (
        <section ref={ref} className="scroll-mt-10 bg-surface-container-lowest py-20 md:scroll-mt-[80px] md:py-32" id="experience">
            <div
                aria-hidden={hideAnimated}
                className={
                    hideAnimated
                        ? "pointer-events-none opacity-0 transition-opacity duration-300 ease-out"
                        : "opacity-100 transition-opacity duration-200 ease-out"
                }
            >
                <div key={replayKey} className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <span
                            className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-primary animate-slide-fade-in-left"
                            style={{ animationDelay: "0.02s" }}
                        >
                            {experience.eyebrow}
                        </span>
                        <h2
                            className="font-headline text-4xl font-extrabold tracking-tighter text-white md:text-5xl animate-slide-fade-in-left"
                            style={{ animationDelay: "0.06s" }}
                        >
                            {experience.title}
                        </h2>
                    </div>

                    <div className="space-y-10 md:w-2/3 md:space-y-12">
                        {experience.items.map((item, index) => (
                            <article
                                key={`${item.title}-${item.period}`}
                                className="group relative border-l border-outline-variant/30 pl-8"
                            >
                                <div
                                    className={
                                        item.highlighted
                                            ? "absolute -left-[5px] top-0 h-2.5 w-2.5 bg-primary ring-4 ring-primary/10 transition-transform group-hover:scale-120 rounded-full"
                                            : "absolute -left-[5px] top-0 h-2.5 w-2.5 bg-outline-variant transition-transform group-hover:scale-120 group-hover:bg-primary rounded-full"
                                    }
                                />

                                <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                                    <h3
                                        className="font-headline text-2xl font-bold text-white animate-slide-fade-in-left"
                                        style={{ animationDelay: `${0.12 + index * 0.08}s` }}
                                    >
                                        {item.title}
                                    </h3>
                                    <span
                                        className={
                                            item.highlighted
                                                ? "border border-primary/20 bg-transparent px-2 py-1 font-label text-xs uppercase text-primary-fixed-dim"
                                                : "border border-white/5 bg-transparent px-2 py-1 font-label text-xs uppercase text-on-surface-variant"
                                        }
                                        style={{ animationDelay: `${0.14 + index * 0.08}s` }}
                                    >
                                        <span className="inline-block animate-slide-fade-in-left">{item.period}</span>
                                    </span>
                                </div>

                                <p
                                    className="mb-4 text-lg font-medium text-secondary animate-slide-fade-in-left"
                                    style={{ animationDelay: `${0.18 + index * 0.08}s` }}
                                >
                                    {item.company}
                                </p>

                                <ul className="space-y-4 text-on-surface-variant">
                                    {item.achievements.map((achievement, achievementIndex) => (
                                        <li key={achievement} className="flex gap-3">
                                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                                            <span
                                                className="animate-slide-fade-in-left"
                                                style={{
                                                    animationDelay: `${0.22 + index * 0.08 + achievementIndex * 0.06}s`,
                                                }}
                                            >
                                                {achievement}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}