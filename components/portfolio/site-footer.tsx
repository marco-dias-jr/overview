"use client"

import { usePortfolioI18n } from "./i18n-provider"

export function SiteFooter() {
    const { content } = usePortfolioI18n()

    return (
        <footer className="w-full border-t border-white/5 bg-neutral-950 pb-28 pt-12 md:py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 font-headline text-xs uppercase tracking-widest text-neutral-500 md:flex-row">
                <div className="self-start flex flex-col items-start gap-3 md:self-auto md:flex-row md:items-center md:gap-8">
                    {content.footer.links.map((link) => (
                        <a
                            key={link.label}
                            className="cursor-pointer text-neutral-500 transition-colors hover:text-white"
                            href={link.href}
                            rel="noreferrer"
                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="self-start text-left md:self-auto md:text-right">
                    <p>{content.footer.copyright}</p>
                </div>
            </div>
        </footer>
    )
}