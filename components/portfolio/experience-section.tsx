"use client"

import { CheckCircle2 } from 'lucide-react'
import { usePortfolioI18n } from "./i18n-provider"

export function ExperienceSection() {
    const { content } = usePortfolioI18n()
    const experience = content.experience

    return (
        <section className="scroll-mt-[80px] bg-surface-container-lowest py-32" id="experience">
            <div className="mx-auto max-w-7xl px-8">
                <div className="flex flex-col gap-16 md:flex-row">
                    <div className="md:w-1/3">
                        <span className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-primary">
                            {experience.eyebrow}
                        </span>
                        <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-white">
                            {experience.title}
                        </h2>
                    </div>

                    <div className="space-y-12 md:w-2/3">
                        {experience.items.map((item) => (
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
                                    <h3 className="font-headline text-2xl font-bold text-white">
                                        {item.title}
                                    </h3>
                                    <span
                                        className={
                                            item.highlighted
                                                ? "border border-primary/20 bg-transparent px-2 py-1 font-label text-xs uppercase text-primary-fixed-dim"
                                                : "border border-white/5 bg-transparent px-2 py-1 font-label text-xs uppercase text-on-surface-variant"
                                        }
                                    >
                                        {item.period}
                                    </span>
                                </div>

                                <p className="mb-4 text-lg font-medium text-secondary">{item.company}</p>

                                <ul className="space-y-4 text-on-surface-variant">
                                    {item.achievements.map((achievement) => (
                                        <li key={achievement} className="flex gap-3">
                                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}