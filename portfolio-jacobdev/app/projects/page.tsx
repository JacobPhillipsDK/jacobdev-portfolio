import React from "react";
import MasonryGrid, {type ProjectLike as MasonryProject} from "@/components/Masonry/MasonryGrid";
import {Container} from "@/components/cotainer"; // keep your existing import path
import {getProjectsFromPayload} from "@/lib/projects";
import Reveal from "@/components/reveal";
import MotionWrap from "@/components/Motion/motionWrapper";


type ProjectSummary = {
    id: number | string;
    title?: string;
    slug?: string;
    description?: string;
    date?: string;
    tags?: Array<{ label?: string } | string>;
    thumbnail?: any;
    thumbnailURL?: string;
    __thumbPath?: string | null;
    __thumbSize?: { w: number; h: number } | null;
};


export default async function ProjectPage() {
    const projects = await getProjectsFromPayload();


    // Map to the MasonryGrid shape (uses `imageUrl`)
    const masonryProjects: MasonryProject[] = projects.map((p: ProjectSummary) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: p.tags as any,
        date: p.date,
        slug: p.slug,
        imageUrl: p.__thumbPath ?? null, // <- critical: what MasonryGrid consumes
    }));

    return (
        <Container>
            <MotionWrap className="w-full pb-16 lg:pb-16" id="projects">
                <div className="grid gap-10">
                    <div
                        className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
                        <div className="flex flex-col items-center lg:items-start">
                            <Reveal>
                                <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                                    My
                                </h2>
                            </Reveal>
                            <Reveal>
                                <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                                    Projects
                                </h2>
                            </Reveal>
                        </div>
                        <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
                            Here are some of my projects where I&apos;ve turned code into
                            cool, functional stuff.
                        </p>
                    </div>

                    <div className="flex items-center justify-center overflow-hidden lg:px-12">
                        <MasonryGrid
                            projects={masonryProjects}
                            gutterPx={12}
                        />

                    </div>
                </div>
            </MotionWrap>
        </Container>
    );
}
