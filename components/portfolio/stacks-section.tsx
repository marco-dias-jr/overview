"use client"

import { Brain, Cloud, Database, Globe } from "lucide-react"
import { usePortfolioI18n } from "./i18n-provider"
import { useReplayInView } from "./use-replay-in-view"

function StackIcon({ icon, className }: { icon: string; className?: string }) {
    const props = { className, strokeWidth: 1.3 }

    if (icon === "web") return <Globe {...props} />
    if (icon === "cloud") return <Cloud {...props} />
    if (icon === "database") return <Database {...props} />
    if (icon === "psychology") return <Brain {...props} />

    return <Globe {...props} />
}

export function StacksSection() {
    const { content } = usePortfolioI18n()
    const stacks = content.stacks
    const { ref, replayKey, inView } = useReplayInView<HTMLElement>({
        threshold: 0.2,
        rootMargin: "-10% 0px -15% 0px",
    })
    const hideAnimated = inView === false

    return (
        <section ref={ref} className="scroll-mt-10 bg-surface py-20 md:scroll-mt-[40px] md:py-32" id="stacks">
            <div
                aria-hidden={hideAnimated}
                className={
                    hideAnimated
                        ? "pointer-events-none opacity-0 transition-opacity duration-300 ease-out"
                        : "opacity-100 transition-opacity duration-200 ease-out"
                }
            >
            <div key={replayKey} className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                <div className="mb-14 text-center md:mb-20">
                    <span
                        className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-primary animate-slide-fade-in-left"
                        style={{ animationDelay: "0.02s" }}
                    >
                        {stacks.eyebrow}
                    </span>
                    <h2
                        className="font-headline text-4xl font-extrabold tracking-tighter text-white md:text-5xl animate-slide-fade-in-left"
                        style={{ animationDelay: "0.06s" }}
                    >
                        {stacks.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                    {stacks.categories.map((category, categoryIndex) => (
                        <article
                            key={category.title}
                            className={`${category.className} group rounded-sm bg-surface-container-low p-6 transition-colors hover:bg-surface-container md:p-10 animate-slide-fade-in-left`}
                            style={{ animationDelay: `${0.12 + categoryIndex * 0.08}s` }}
                        >
                            {category.tags ? (
                                <>
                                    <div className="mb-8 flex items-start justify-between gap-4 md:mb-10">
                                        <div className="min-w-0 flex-1">
                                            <h3
                                                className="mb-2 font-headline text-2xl font-bold text-white md:text-3xl animate-slide-fade-in-left"
                                                style={{ animationDelay: `${0.16 + categoryIndex * 0.08}s` }}
                                            >
                                                {category.title}
                                            </h3>
                                            <p
                                                className="max-w-md text-on-surface-variant animate-slide-fade-in-left"
                                                style={{ animationDelay: `${0.2 + categoryIndex * 0.08}s` }}
                                            >
                                                {category.description}
                                            </p>
                                        </div>

                                        <StackIcon className="h-8 w-8 shrink-0 text-primary" icon={category.icon} />
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {category.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tag}
                                                className="inline-flex origin-left border border-outline-variant/10 bg-surface-container px-3 py-2 text-sm font-medium animate-tag-grow"
                                                style={{
                                                    animationDelay: `${
                                                        0.26 + categoryIndex * 0.08 + tagIndex * 0.035
                                                    }s`,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : null}

                            {category.items ? (
                                <>
                                    <div className="mb-6 flex items-start justify-between gap-4">
                                        <h3
                                            className="min-w-0 flex-1 font-headline text-2xl font-bold text-white animate-slide-fade-in-left"
                                            style={{ animationDelay: `${0.16 + categoryIndex * 0.08}s` }}
                                        >
                                            {category.title}
                                        </h3>
                                        <StackIcon className="h-8 w-8 shrink-0 text-primary" icon={category.icon} />
                                    </div>

                                    <ul className="space-y-3 font-medium text-on-surface-variant">
                                        {category.items.map((item, itemIndex) => (
                                            <li key={item} className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-none bg-primary" />
                                                <span
                                                    className="animate-slide-fade-in-left"
                                                    style={{
                                                        animationDelay: `${
                                                            0.2 + categoryIndex * 0.08 + itemIndex * 0.04
                                                        }s`,
                                                    }}
                                                >
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : null}

                            {category.columns ? (
                                <>
                                    <div className="mb-8 flex items-start justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <h3
                                                className="mb-2 font-headline text-3xl font-bold text-white animate-slide-fade-in-left"
                                                style={{ animationDelay: `${0.16 + categoryIndex * 0.08}s` }}
                                            >
                                                {category.title}
                                            </h3>
                                            <p
                                                className="text-on-surface-variant animate-slide-fade-in-left"
                                                style={{ animationDelay: `${0.2 + categoryIndex * 0.08}s` }}
                                            >
                                                {category.description}
                                            </p>
                                        </div>

                                        <StackIcon className="h-8 w-8 shrink-0 text-primary" icon={category.icon} />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                                        {category.columns.map((column, columnIndex) => (
                                            <div key={column.title}>
                                                <h4 className="mb-3 font-label text-xs uppercase tracking-widest text-secondary">
                                                    <span
                                                        className="inline-block animate-slide-fade-in-left"
                                                        style={{
                                                            animationDelay: `${
                                                                0.24 +
                                                                categoryIndex * 0.08 +
                                                                columnIndex * 0.06
                                                            }s`,
                                                        }}
                                                    >
                                                        {column.title}
                                                    </span>
                                                </h4>
                                                <p className="text-sm text-on-surface-variant">
                                                    <span
                                                        className="inline-block animate-slide-fade-in-left"
                                                        style={{
                                                            animationDelay: `${
                                                                0.28 +
                                                                categoryIndex * 0.08 +
                                                                columnIndex * 0.06
                                                            }s`,
                                                        }}
                                                    >
                                                        {column.description}
                                                    </span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </article>
                    ))}
                </div>
            </div>
            </div>
        </section>
    )
}