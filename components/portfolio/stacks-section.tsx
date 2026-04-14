"use client"

import { Brain, Cloud, Database, Globe } from "lucide-react"
import { usePortfolioI18n } from "./i18n-provider"

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

    return (
        <section className="scroll-mt-[40px] bg-surface py-32" id="stacks">
            <div className="mx-auto max-w-7xl px-8">
                <div className="mb-20 text-center">
                    <span className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-primary">
                        {stacks.eyebrow}
                    </span>
                    <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-white">
                        {stacks.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                    {stacks.categories.map((category) => (
                        <article
                            key={category.title}
                            className={`${category.className} group rounded-sm bg-surface-container-low p-10 transition-colors hover:bg-surface-container`}
                        >
                            {category.tags ? (
                                <>
                                    <div className="mb-10 flex items-start justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-2 font-headline text-3xl font-bold text-white">
                                                {category.title}
                                            </h3>
                                            <p className="max-w-md text-on-surface-variant">
                                                {category.description}
                                            </p>
                                        </div>

                                        <StackIcon className="h-8 w-8 shrink-0 text-primary" icon={category.icon} />
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {category.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="border border-outline-variant/10 bg-surface-container px-3 py-2 text-sm font-medium"
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
                                        <h3 className="min-w-0 flex-1 font-headline text-2xl font-bold text-white">
                                            {category.title}
                                        </h3>
                                        <StackIcon className="h-8 w-8 shrink-0 text-primary" icon={category.icon} />
                                    </div>

                                    <ul className="space-y-3 font-medium text-on-surface-variant">
                                        {category.items.map((item) => (
                                            <li key={item} className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-none bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : null}

                            {category.columns ? (
                                <>
                                    <div className="mb-8 flex items-start justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-2 font-headline text-3xl font-bold text-white">
                                                {category.title}
                                            </h3>
                                            <p className="text-on-surface-variant">{category.description}</p>
                                        </div>

                                        <StackIcon className="h-8 w-8 shrink-0 text-primary" icon={category.icon} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        {category.columns.map((column) => (
                                            <div key={column.title}>
                                                <h4 className="mb-3 font-label text-xs uppercase tracking-widest text-secondary">
                                                    {column.title}
                                                </h4>
                                                <p className="text-sm text-on-surface-variant">
                                                    {column.description}
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
        </section>
    )
}