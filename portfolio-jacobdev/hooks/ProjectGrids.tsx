"use client"

import {useMasonry} from "@/components/Masonry/MasonryGrid"

export default function ProjectGrids() {
  const masonryContainer = useMasonry();

  return (
    <div
      ref={masonryContainer}
      className="grid items-start gap-4 sm:grid-cols-3 md:gap-6"
    >
      {/* Your masonry items here */}
    </div>
  )
}