"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function LenisProvider() {
    useEffect(() => {
        const lenis = new Lenis({
            anchors: true,
            lerp: 0.14,
            wheelMultiplier: 0.85,
            touchMultiplier: 1,
            syncTouch: true,
        })

        let frameId = 0
        const raf = (time: number) => {
            lenis.raf(time)
            frameId = window.requestAnimationFrame(raf)
        }

        frameId = window.requestAnimationFrame(raf)

        return () => {
            window.cancelAnimationFrame(frameId)
            lenis.destroy()
        }
    }, [])

    return null
}
