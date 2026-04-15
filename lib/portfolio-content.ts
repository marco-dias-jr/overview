export type Locale = "en" | "pt-BR"

export type NavigationItem = {
    href: string
    label: string
    isActive?: boolean
}

export type ExperienceItem = {
    company: string
    period: string
    title: string
    achievements: string[]
    highlighted?: boolean
}

export type StackCategory = {
    title: string
    icon: string
    description?: string
    items?: string[]
    tags?: string[]
    columns?: Array<{
        title: string
        description: string
    }>
    className: string
}

export type ContactLink = {
    href: string
    icon: string
    label: string
}

export type FooterLink = {
    href: string
    label: string
}

export type PortfolioContent = {
    languageName: string
    navigationItems: NavigationItem[]
    heroContent: {
        firstName: string
        lastName: string
        role: string
        summary: string
        cta: {
            href: string
            label: string
        }
    }
    experience: {
        eyebrow: string
        title: string
        items: ExperienceItem[]
    }
    stacks: {
        eyebrow: string
        title: string
        categories: StackCategory[]
    }
    connect: {
        eyebrow: string
        title: string
        resumeTitle: string
        resumeDescription: string
        resumeButton: string
        links: ContactLink[]
    }
    footer: {
        links: FooterLink[]
        copyright: string
    }
    languageModal: {
        title: string
        description: string
        close: string
    }
}

export const localeOptions: Array<{ code: Locale; label: string }> = [
    { code: "en", label: "English" },
    { code: "pt-BR", label: "Português (Brasil)" },
]

export const defaultLocale: Locale = "en"

export function normalizeLocale(value: string | null | undefined): Locale {
    if (!value) return defaultLocale
    const normalizedValue = value.toLowerCase()
    if (normalizedValue.startsWith("pt")) return "pt-BR"
    return "en"
}

export function detectLocaleFromAcceptLanguage(
    acceptLanguageHeader: string | null,
): Locale {
    if (!acceptLanguageHeader) return defaultLocale

    const languages = acceptLanguageHeader
        .split(",")
        .map((entry) => entry.trim().split(";")[0]?.trim())
        .filter(Boolean)

    for (const language of languages) {
        const locale = normalizeLocale(language)
        if (locale === "pt-BR") return locale
    }

    return defaultLocale
}

export const portfolioContentByLocale: Record<Locale, PortfolioContent> = {
    en: {
        languageName: "English",
        navigationItems: [
            { href: "#hero", label: "Resume", isActive: true },
            { href: "#experience", label: "Experience" },
            { href: "#stacks", label: "Stacks" },
            { href: "#connect", label: "Connect" },
        ],
        heroContent: {
            firstName: "Marco",
            lastName: "Dias",
            role: "Senior Software Engineer",
            summary:
                "Engineering high-performance systems and AI-integrated architectures. I transform complex business logic into elegant, scalable digital experiences.",
            cta: {
                href: "#experience",
                label: "View Work",
            },
        },
        experience: {
            eyebrow: "Applied knowledge",
            title: "Professional Journey",
            items: [
                {
                    title: "Senior Software Engineer",
                    period: "2024 — PRESENT",
                    company: "Future Secure AI",
                    highlighted: true,
                    achievements: [
                        "Delivered complex software and AI initiatives end-to-end, from solution design to deployment in client environments.",
                        "Improved performance, security, and operational reliability in mission-critical products, contributing to 3 major international AI projects under NDA.",
                    ],
                },
                {
                    title: "Full Stack Developer",
                    period: "2020 — 2024",
                    company: "Arena Consultoria",
                    achievements: [
                        "Delivered web platforms, integrations, and administrative/commercial systems, covering implementation, maintenance, deployment, and change management across multiple project cycles.",
                        "Supported large-scale international deliveries under confidentiality, collaborating with clients and multidisciplinary teams through structured delivery workflows.",
                    ],
                },
            ],
        },
        stacks: {
            eyebrow: "Tech Ecosystem",
            title: "The Stack I Mastered",
            categories: [
                {
                    title: "Frontend Development",
                    icon: "web",
                    description:
                        "Building reactive, high-performance interfaces with a focus on modern UX patterns and accessibility.",
                    tags: [
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "CSS Modules",
                        "Vitest",
                        "Design Systems",
                    ],
                    className: "md:col-span-8",
                },
                {
                    title: "Cloud & DevOps",
                    icon: "cloud",
                    items: ["Docker", "CI/CD", "Azure", "GitHub Actions", "Jira / Bitbucket"],
                    className: "md:col-span-4",
                },
                {
                    title: "Backend Architecture",
                    icon: "database",
                    items: [
                        "Node.js / NestJS",
                        "Go",
                        "PostgreSQL / Redis",
                        "BullMQ",
                        "REST APIs",
                        "Clean Architecture",
                    ],
                    className: "md:col-span-4",
                },
                {
                    title: "AI & Intelligence",
                    icon: "psychology",
                    description:
                        "Integrating Large Language Models and custom automation workflows into enterprise software.",
                    columns: [
                        {
                            title: "LLM & Automation",
                            description:
                                "LangChain, n8n, and Flowise for orchestration and AI-driven workflow automation.",
                        },
                        {
                            title: "Realtime & Integrations",
                            description:
                                "LiveKit, Twilio, and Supabase integrations with observability using Grafana.",
                        },
                    ],
                    className: "md:col-span-8",
                },
            ],
        },
        connect: {
            eyebrow: "Let's build together",
            title: "Ready to architect your next digital leap?",
            resumeTitle: "Detailed Resume",
            resumeDescription:
                "Download the comprehensive PDF for full project history and references.",
            resumeButton: "Download CV (PDF)",
            links: [
                { href: "mailto:marcodias.dev@icloud.com", icon: "mail", label: "Email" },
                { href: "https://github.com/marco-dias-jr", icon: "terminal", label: "GitHub" },
                { href: "https://linkedin.com/in/marco-dias-dev", icon: "work", label: "LinkedIn" },
                { href: "https://wa.me/5511933044711", icon: "chat", label: "WhatsApp" },
            ],
        },
        footer: {
            links: [
                { href: "https://github.com/marco-dias-jr", label: "GitHub" },
                { href: "https://linkedin.com/in/marco-dias-dev", label: "LinkedIn" },
                { href: "https://instagram.com/__diasjr", label: "Instagram" },
                { href: "mailto:marcodias.dev@icloud.com", label: "Email" },
            ],
            copyright: "© 2026 MADJ.",
        },
        languageModal: {
            title: "Choose language",
            description: "Select your preferred language.",
            close: "Close",
        },
    },
    "pt-BR": {
        languageName: "Português (Brasil)",
        navigationItems: [
            { href: "#hero", label: "Resumo", isActive: true },
            { href: "#experience", label: "Experiência" },
            { href: "#stacks", label: "Stacks" },
            { href: "#connect", label: "Contato" },
        ],
        heroContent: {
            firstName: "Marco",
            lastName: "Dias",
            role: "Engenheiro de Software Sênior",
            summary:
                "Desenvolvimento de sistemas de alta performance e arquiteturas integradas com IA. Transformo regras de negócio complexas em experiências digitais elegantes e escaláveis.",
            cta: {
                href: "#experience",
                label: "Navegar",
            },
        },
        experience: {
            eyebrow: "Conhecimento aplicado",
            title: "Trajetória profissional",
            items: [
                {
                    title: "Engenheiro de Software Sênior",
                    period: "2024 — ATUAL",
                    company: "Future Secure AI",
                    highlighted: true,
                    achievements: [
                        "Entreguei projetos complexos de software e IA de ponta a ponta, do desenho da solução ao deploy em clientes.",
                        "Elevei performance, segurança e confiabilidade em produtos críticos, contribuindo para 3 projetos internacionais de IA sob NDA.",
                    ],
                },
                {
                    title: "Desenvolvedor Full Stack",
                    period: "2020 — 2024",
                    company: "Arena Consultoria",
                    achievements: [
                        "Entreguei plataformas web, integrações e sistemas administrativos, cobrindo implementação, manutenção, deploy e evolução contínua.",
                        "Atuei em entregas internacionais sob confidencialidade, colaborando com clientes e times multidisciplinares.",
                    ],
                },
            ],
        },
        stacks: {
            eyebrow: "Ecossistema técnico",
            title: "Stack principal",
            categories: [
                {
                    title: "Desenvolvimento Frontend",
                    icon: "web",
                    description:
                        "Interfaces reativas e rápidas, com foco em UX moderna e acessibilidade.",
                    tags: [
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "CSS Modules",
                        "Vitest",
                        "Design Systems",
                    ],
                    className: "md:col-span-8",
                },
                {
                    title: "Cloud & DevOps",
                    icon: "cloud",
                    items: ["Docker", "CI/CD", "Azure", "GitHub Actions", "Jira / Bitbucket"],
                    className: "md:col-span-4",
                },
                {
                    title: "Arquitetura Backend",
                    icon: "database",
                    items: [
                        "Node.js / NestJS",
                        "Go",
                        "PostgreSQL / Redis",
                        "BullMQ",
                        "REST APIs",
                        "Clean Architecture",
                    ],
                    className: "md:col-span-4",
                },
                {
                    title: "IA & Inteligência",
                    icon: "psychology",
                    description:
                        "Integração de LLMs e automações sob medida em software corporativo.",
                    columns: [
                        {
                            title: "LLM & Automação",
                            description:
                                "LangChain, n8n e Flowise para orquestração e automações com IA.",
                        },
                        {
                            title: "Tempo real & Integrações",
                            description:
                                "LiveKit, Twilio e Supabase com observabilidade via Grafana.",
                        },
                    ],
                    className: "md:col-span-8",
                },
            ],
        },
        connect: {
            eyebrow: "Vamos construir",
            title: "Pronto para o próximo salto digital?",
            resumeTitle: "Currículo detalhado",
            resumeDescription:
                "Baixe o PDF com histórico de projetos e referências.",
            resumeButton: "Baixar CV (PDF)",
            links: [
                { href: "mailto:marcodias.dev@icloud.com", icon: "mail", label: "Email" },
                { href: "https://github.com/marco-dias-jr", icon: "terminal", label: "GitHub" },
                { href: "https://linkedin.com/in/marco-dias-dev", icon: "work", label: "LinkedIn" },
                { href: "https://wa.me/5511933044711", icon: "chat", label: "WhatsApp" },
            ],
        },
        footer: {
            links: [
                { href: "https://github.com/marco-dias-jr", label: "GitHub" },
                { href: "https://linkedin.com/in/marco-dias-dev", label: "LinkedIn" },
                { href: "https://instagram.com/__diasjr", label: "Instagram" },
                { href: "mailto:marcodias.dev@icloud.com", label: "Email" },
            ],
            copyright: "© 2026 MADJ.",
        },
        languageModal: {
            title: "Selecionar idioma",
            description: "Escolha o idioma.",
            close: "Fechar",
        },
    },
}