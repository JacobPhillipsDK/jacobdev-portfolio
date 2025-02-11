import React from 'react';

import MotionWrap from '@/components/motion-wrap';
import ProjectCard from './project-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import Reveal from '@/components/reveal';
import { project } from '@/app/source';

function Projects() {
  const projects = [...project.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime()
  );

  return (
    <MotionWrap className="w-full pb-16 lg:pb-16" id="projects">
        <div className="grid gap-10">
          <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
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
            <Carousel
              opts={{
                align: 'start'
              }}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project, index) => (
                    <CarouselItem
                        key={`project_${index}`}
                        className="sm:m-2 md:m-4 lg:m-6 xl:m-8 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                    <div className="h-full">
                        <ProjectCard
                            title={project.data.title}
                            href={project.url}
                            description={project.data.description}
                            tags={project.data.tags}
                            thumbnail={project.data.thumbnail}
                        />
                      </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
      </div>
    </MotionWrap>
  );
}

export default Projects;
