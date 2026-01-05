import React from "react";
import Image from "next/image";

import {fetchTopPartWithID} from "@/lib/fetchCollections/fetcher";
import {renderLexicalRoot} from "@/hooks/lexicalRenderer";
import MotionWrap from "@/components/Motion/motionWrapper";
import TextReveal from "@/components/Motion/textReveal";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function getPayloadOrigin(): string {
    const raw = process.env.PAYLOAD_URL ?? "";
    if (!raw) return "";
    try {
        return new URL(raw).origin;
    } catch {
        return raw.replace(/\/api\/?$/, "");
    }
}

function randomBetween(min: number, max: number) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

export function HaloAvatar() {
    const scaleMin = randomBetween(0.9, 0.97);
    const scaleMax = randomBetween(1.08, 1.18);
    const opacityMin = randomBetween(0.15, 0.3);
    const opacityMax = randomBetween(0.35, 0.55);
    const duration = `${randomBetween(1.8, 2.8)}s`;
    const delay = `${randomBetween(0, 1)}s`;

    const styleVars = {
        "--halo-scale-min": scaleMin,
        "--halo-scale-max": scaleMax,
        "--halo-opacity-min": opacityMin,
        "--halo-opacity-max": opacityMax,
        "--halo-duration": duration,
        animationDelay: delay,
    } as React.CSSProperties;

    return (
        <div
            style={styleVars}
            className="
          pointer-events-none absolute inset-0
          -inset-1 sm:-inset-1.5 md:-inset-2
          rounded-full bg-emerald-500/25
          motion-safe:animate-halo-random
        "
            aria-hidden
        />
    )
}

async function About() {
    const aboutMe = await fetchTopPartWithID({id: 1});

    // 1) Render Lexical description as inline nodes (no outer container)
    const inlineNodes = renderLexicalRoot(aboutMe?.description?.root, {
        mode: "inline",
        context: "detail",
        classMap: {containerClass: ""},
    });

    // 2) Safely read "Profile Picture" (note the space in the key)
    const pic = aboutMe?.["Profile Picture"];
    const origin = getPayloadOrigin();
    const imgSrc =
        pic?.url && typeof pic.url === "string"
            ? (pic.url.startsWith("/") && origin ? origin + pic.url : pic.url)
            : "/Github Profile Picture.png"; // fallback

    return (
        <MotionWrap className="w-full pt-28 lg:pt-28" id="about">
            <Card className="bg-background">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative aspect-square w-32">
                            <HaloAvatar/>

                            <Image
                                src={imgSrc}
                                alt={pic?.alt ?? "Profile picture"}
                                fill
                                className="rounded-full object-cover relative z-10"
                                sizes="(max-width: 768px) 128px, 128px"
                                priority
                            />
                        </div>

                        <CardTitle
                            className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl">
                            <TextReveal>Hey, I&apos;m <span className="text-[#22c55e]">Jacob</span></TextReveal>
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                        <TextReveal>{inlineNodes}</TextReveal>
                    </p>
                </CardContent>
            </Card>
        </MotionWrap>
    );
}

export default About;
