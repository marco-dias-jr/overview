import { headers } from "next/headers"

import { ConnectSection } from "@/components/portfolio/connect-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { HeroSection } from "@/components/portfolio/hero-section"
import { PortfolioI18nProvider } from "@/components/portfolio/i18n-provider"
import { LanguageSwitcher } from "@/components/portfolio/language-switcher"
import { SiteHeader } from "@/components/portfolio/site-header"
import { StacksSection } from "@/components/portfolio/stacks-section"
import { detectLocaleFromAcceptLanguage } from "@/lib/portfolio-content"

export default async function Home() {
  const requestHeaders = await headers()
  const initialLocale = detectLocaleFromAcceptLanguage(
    requestHeaders.get("accept-language"),
  )

  return (
    <PortfolioI18nProvider initialLocale={initialLocale}>
      <SiteHeader />
      <LanguageSwitcher />
      <main>
        <HeroSection />
        <ExperienceSection />
        <StacksSection />
        <ConnectSection />
      </main>
      <SiteFooter />
    </PortfolioI18nProvider>
  )
}
