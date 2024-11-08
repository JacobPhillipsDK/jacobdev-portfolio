import React from 'react';
import { CardContent, CardFooter, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, GlobeIcon, InfoIcon } from 'lucide-react';

import { Project } from '@/types/project';


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import TextReveal from '@/components/motion/text-reveal';
import { AspectRatio } from '@/components/ui/aspect-ratio';


interface ProjectCardProps extends Project {
  href: string;
  className?: string;
}

function ProjectCard({
  title,
  description,
  href,
  thumbnail,
  tags,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'relative flex h-full flex-col justify-between border border-zinc-50/10 bg-zinc-900',
          'w-[20rem] max-h-[40rem]', // Adjust these classes to change the size
        className
      )}
    >
      <CardContent className="p-4 md:p-6">
        <div className="grid gap-2">
          <AspectRatio ratio={16 / 9} className="bg-white relative rounded-lg overflow-hidden shadow-md">
            {thumbnail ? (
                <Image
                    src={thumbnail}
                    width={400}
                    height={200}
                    alt={`Image of ${title}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                      className="w-full h-full text-gray-800"
                      viewBox="0 0 300 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="300" height="200" rx="8" fill="white" />
                    <rect width="300" height="300" rx="8" fill="currentColor" fillOpacity="0.05" />
                    <path
                        d="M150 80C150 91.0457 141.046 100 130 100C118.954 100 110 91.0457 110 80C110 68.9543 118.954 60 130 60C141.046 60 150 68.9543 150 80Z"
                        fill="currentColor"
                        fillOpacity="0.2"
                    />
                    <path
                        d="M70 140L110 100L150 140"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M150 120L190 80L230 120"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <text
                        x="150"
                        y="180"
                        fontFamily="sans-serif"
                        fontSize="16"
                        fill="currentColor"
                        textAnchor="middle"
                        className="font-medium"
                    >
                      NO IMAGE AVAILABLE
                    </text>
                  </svg>
                </div>
            )}
          </AspectRatio>
          <h3 className="text-xl font-bold">
            <TextReveal>{title}</TextReveal>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <TextReveal>{description || ''}</TextReveal>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Badge key={`project-tag_${index}`}>{tag.label}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end p-4 md:p-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="z-[2] rounded-md border border-zinc-950/10 dark:border-zinc-50/10"
                asChild
              >
                <Link href={href}>
                  <InfoIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      <Link href={href} className="z-1 absolute inset-0 block" />
    </Card>
  );
}

export default ProjectCard;
