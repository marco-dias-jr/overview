"use client"

import { Briefcase, Download, Mail, MessageCircle, Terminal } from "lucide-react"
import { usePortfolioI18n } from "./i18n-provider"

function ContactIcon({ icon, className }: { icon: string; className?: string }) {
    const props = { className, strokeWidth: 1.3 }

    if (icon === "mail") return <Mail {...props} />
    if (icon === "terminal") return <Terminal {...props} />
    if (icon === "work") return <Briefcase {...props} />
    if (icon === "chat") return <MessageCircle {...props} />

    return <Mail {...props} />
}

export function ConnectSection() {
    const { content } = usePortfolioI18n()
    const connect = content.connect

    return (
        <section className="scroll-mt-[40px] relative overflow-hidden py-32" id="connect">
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

            <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
                <span className="mb-6 block font-label text-sm uppercase tracking-[0.3em] text-primary">
                    {connect.eyebrow}
                </span>
                <h2 className="mb-10 font-headline text-5xl font-extrabold leading-tight tracking-tighter text-white md:text-6xl">
                    {connect.title}
                </h2>

                <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {connect.links.map((link) => (
                        <a
                            key={link.label}
                            className="group flex flex-col items-center gap-3 rounded-sm border border-outline-variant/10 bg-surface-container-low p-6 transition-all hover:bg-surface-container-high"
                            href={link.href}
                            rel="noreferrer"
                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        >
                            <ContactIcon className="h-7 w-7 text-secondary transition-colors group-hover:text-primary" icon={link.icon} />
                            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                                {link.label}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-8 rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-8 md:flex-row md:p-12">
                    <div className="text-left">
                        <h3 className="mb-2 font-headline text-2xl font-bold text-white">
                            {connect.resumeTitle}
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                            {connect.resumeDescription}
                        </p>
                    </div>

                    <a
                        className="flex w-full items-center justify-center gap-3 bg-primary-container px-8 py-4 font-headline text-sm font-extrabold uppercase tracking-widest text-on-primary-container transition-shadow hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] md:w-auto"
                        download
                        href="/Marco%20Antonio%20Dias%20Junior%20Software%20Developer.pdf"
                    >
                        <Download className="h-5 w-5" strokeWidth={1.3} />
                        {connect.resumeButton}
                    </a>
                </div>
            </div>
        </section>
    )
}