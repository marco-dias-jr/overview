import { useEffect, useLayoutEffect, useRef, useState } from "react"

export function useReplayInView<T extends Element>({
    /** Slightly negative margins shrink the IO root a bit; less negative = hide/replay a touch later. */
    rootMargin = "-10% 0px -14% 0px",
    threshold = 0.2,
}: {
    rootMargin?: string
    threshold?: number | number[]
} = {}) {
    const ref = useRef<T | null>(null)
    const [replayKey, setReplayKey] = useState(0)
    /** `null` = not measured yet (treat as visible; avoids hiding before layout). */
    const [inView, setInView] = useState<boolean | null>(null)
    const wasIntersectingRef = useRef(false)

    useLayoutEffect(() => {
        const node = ref.current
        if (!node || typeof window === "undefined") return

        const rect = node.getBoundingClientRect()
        const vh = window.innerHeight
        const intersecting = rect.top < vh && rect.bottom > 0
        setInView(intersecting)
        // Leave `wasIntersectingRef` at false so the first IO callback can still
        // bump `replayKey` when the section is already visible on load.
    }, [])

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (!entry) return

                const isIntersecting = entry.isIntersecting
                const wasIntersecting = wasIntersectingRef.current

                setInView(isIntersecting)

                if (isIntersecting && !wasIntersecting) {
                    setReplayKey((value) => value + 1)
                }

                wasIntersectingRef.current = isIntersecting
            },
            { root: null, rootMargin, threshold },
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [rootMargin, threshold])

    return { ref, replayKey, inView }
}

