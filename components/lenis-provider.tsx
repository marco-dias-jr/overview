"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function LenisProvider() {
    useEffect(() => {
        const compactViewport = window.matchMedia("(max-width: 1024px), (pointer: coarse)")
        let lenis: Lenis | null = null

        let frameId = 0
        const raf = (time: number) => {
            lenis?.raf(time)
            frameId = window.requestAnimationFrame(raf)
        }

        const setupLenis = () => {
            lenis?.destroy()

            const useNativeScroll = compactViewport.matches

            lenis = new Lenis({
                anchors: true,
                lerp: useNativeScroll ? 1 : 0.14,
                wheelMultiplier: useNativeScroll ? 1 : 0.85,
                touchMultiplier: 1,
                smoothWheel: !useNativeScroll,
                syncTouch: false,
            })
        }

        setupLenis()

        frameId = window.requestAnimationFrame(raf)

        const handleViewportChange = () => {
            setupLenis()
        }

        compactViewport.addEventListener("change", handleViewportChange)

        return () => {
            window.cancelAnimationFrame(frameId)
            compactViewport.removeEventListener("change", handleViewportChange)
            lenis?.destroy()
        }
    }, [])

    return null
}
