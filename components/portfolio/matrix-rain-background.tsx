"use client"

import { useEffect, useRef } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"

export function MatrixRainBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext("2d")
        if (!context) return

        const fontSize = 16
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
        let width = 0
        let height = 0
        let columns = 0
        let drops: number[] = []
        let delays: number[] = []
        let frameId = 0

        const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] || "A"

        const reset = () => {
            const bounds = canvas.getBoundingClientRect()
            width = Math.max(1, Math.floor(bounds.width))
            height = Math.max(1, Math.floor(bounds.height))

            canvas.width = Math.floor(width * devicePixelRatio)
            canvas.height = Math.floor(height * devicePixelRatio)
            context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

            columns = Math.ceil(width / fontSize)
            drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize))
            delays = Array.from({ length: columns }, () => Math.floor(Math.random() * 6))

            context.font = `${fontSize}px monospace`
            context.textBaseline = "top"
            context.clearRect(0, 0, width, height)
        }

        const draw = () => {
            context.fillStyle = "rgba(14, 14, 14, 0.2)"
            context.fillRect(0, 0, width, height)

            for (let column = 0; column < columns; column++) {
                if (delays[column]! > 0) {
                    delays[column]! -= 1
                    continue
                }

                const x = column * fontSize
                const y = drops[column]! * fontSize

                context.fillStyle = "rgba(238, 194, 0, 0.86)"
                context.fillText(randomGlyph(), x, y)

                if (Math.random() > 0.985) {
                    context.fillStyle = "rgba(255, 236, 185, 0.98)"
                    context.fillText(randomGlyph(), x, y - fontSize)
                }

                if (y > height && Math.random() > 0.975) {
                    drops[column] = 0
                }

                drops[column] += 0.9
                delays[column] = 1 + Math.floor(Math.random() * 5)
            }

            frameId = window.requestAnimationFrame(draw)
        }

        reset()

        frameId = window.requestAnimationFrame(draw)

        const handleResize = () => {
            reset()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.cancelAnimationFrame(frameId)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <canvas className="h-full w-full opacity-55" ref={canvasRef} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/80" />
        </div>
    )
}
