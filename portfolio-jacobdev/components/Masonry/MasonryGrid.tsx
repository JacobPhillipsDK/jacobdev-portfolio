"use client";

import React, {useEffect, useRef} from "react";
import {ExternalLink} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export type ProjectLike = {
    id: string | number;
    title?: string;
    description?: string;
    tags?: Array<string | { label?: string }>;
    date?: string;
    slug?: string | number;
    imageUrl?: string | null; // use this (or map from your payload thumbnail)
};


type MasonryGridProps = {
    projects: ProjectLike[];
    className?: string;
    // Change columns by editing the responsive widths below on .masonry-sizer / .masonry-item
    gutterPx?: number; // horizontal & vertical gap used by Masonry (default 16)
};

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

export default function MasonryGrid({
                                        projects,
                                        className,
                                        gutterPx = 16,
                                    }: MasonryGridProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let msnry: any;
        let imgLoad: any;
        let canceled = false;

        (async () => {
            try {
                const Masonry = (await import("masonry-layout")).default;
                const imagesLoaded = (await import("imagesloaded")).default;

                if (!containerRef.current || canceled) return;

                // Initialize Masonry
                msnry = new Masonry(containerRef.current, {
                    itemSelector: ".masonry-item",
                    columnWidth: ".masonry-sizer", // use the responsive sizer element
                    percentPosition: false,
                    gutter: gutterPx,
                    transitionDuration: "0.2s",
                });

                // Layout after each image loads
                imgLoad = imagesLoaded(containerRef.current);
                imgLoad.on("progress", () => msnry.layout());
                imgLoad.on("always", () => msnry.layout());
            } catch {
                // no-op if the libs fail to load (SSR race, etc.)
            }
        })();

        return () => {
            canceled = true;
            try {
                imgLoad?.off?.("progress");
                imgLoad?.off?.("always");
                msnry?.destroy?.();
            } catch {
                /* noop */
            }
        };
    }, [projects, gutterPx]);

    return (
        <div className={cn("w-full", className)}>
            {/* Masonry container – do NOT use display:grid here */}
            {/* Use column sizing via a hidden sizer element for responsive columns */}
            <div ref={containerRef} className="relative">
                {/* Sizer controls column width at breakpoints.
           Example: 1/1 (100%) on base, 1/2 on sm, 1/3 on md, 1/4 on lg. */}
                <div
                    className={cn(
                        "masonry-sizer",
                        "w-[360px]"
                    )}
                    aria-hidden
                />

                {/* Items should share the same width classes as the sizer */}
                {projects.map((p) => {
                    const link =
                        p.slug != null
                            ? `/projects/${encodeURIComponent(String(p.slug))}`
                            : `/projects/${encodeURIComponent(String(p.id))}`;

                    return (
                        <article
                            key={p.id}
                            className={cn(
                                "masonry-item w-[360px] mb-4 rounded-lg border bg-card shadow-sm overflow-hidden group"
                            )}
                        >
                            {p.imageUrl ? (
                                <div className="relative w-full">
                                    <Image
                                        src={p.imageUrl}
                                        alt={p.title ?? "project image"}
                                        className="block w-full h-auto object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                                        width={1000}
                                        height={1000}
                                        quality={100}

                                    />
                                </div>
                            ) : null}

                            <div className="p-4">
                                {p.title ? (
                                    <h3 className="text-base font-semibold leading-6 mb-1 hover:underline focus:outline-none focus:underline">
                                        <a
                                            href={link}
                                            className="hover:underline focus:outline-none focus:underline"
                                        >
                                            {p.title}
                                        </a>
                                    </h3>
                                ) : null}

                                {p.description ? (
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {p.description}
                                    </p>
                                ) : null}

                                {p.tags?.length ? (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {p.tags.map((t: any, i: number) => {
                                            const label = typeof t === "string" ? t : t?.label ?? String(t);
                                            return (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-muted px-2 py-1 rounded-full"
                                                >
                          {label}
                        </span>
                                            );
                                        })}
                                    </div>
                                ) : null}

                                <div className="mt-2 flex items-center justify-between">
                                    <time className="text-xs text-muted-foreground">
                                        {p.date ? new Date(p.date).toLocaleDateString("da-DK") : ""}
                                    </time>
                                    <Link
                                        href={link}
                                        className="text-sm inline-flex items-center gap-2 rounded-md px-2 py-1 bg-muted hover:bg-muted/80"
                                    >
                                        Open
                                        <ExternalLink/>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
