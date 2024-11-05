'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ClientSideAnimation({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
        >
            {children}
        </motion.div>
    )
}