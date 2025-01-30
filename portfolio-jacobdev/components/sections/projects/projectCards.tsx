import React from 'react';
import {CardContent, CardFooter, Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

import Link from 'next/link';
import Image from 'next/image';
import {InfoIcon} from 'lucide-react';


export interface Project {
    title: string;
    description?: string;
    website?: string;
    github?: string;
    thumbnail?: string;
    showDemo?: boolean;
    showGithub?: boolean;
    tags?: Array<{ label: string }>;
}


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

import {cn} from '@/lib/utils';
import {Badge} from '@/components/ui/badge';
import TextReveal from '@/components/Motion/textReveal';
import {AspectRatio} from '@/components/ui/aspect-ratio';


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
                                    <rect width="300" height="200" rx="8" fill="white"/>
                                    <rect width="300" height="300" rx="8" fill="currentColor" fillOpacity="0.05"/>
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
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                        {(() => {
                            const visibleCount = 5;
                            const visible = tags?.slice(0, visibleCount) ?? [];
                            const hidden = tags?.slice(visibleCount) ?? [];

                            return (
                                <>
                                    {visible.map((tag, index) => (
                                        <Badge key={`project-tag_${index}`}>{tag.label}</Badge>
                                    ))}

                                    {hidden.length > 0 && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        type="button"
                                                        aria-label={`Show ${hidden.length} more tags`}
                                                        className="inline-flex p-0 bg-transparent border-0"
                                                    >
                                                        <Badge className="cursor-pointer">+{hidden.length}</Badge>
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" align="center">
                                                    <div className="max-w-xs">
                                                        {hidden.map((t, i) => (
                                                            <div
                                                                key={`hidden-tag_${i}`}
                                                                className="text-sm text-gray-700 dark:text-gray-200 py-1"
                                                            >
                                                                {t.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </>
                            );
                        })()}
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
                                    <InfoIcon/>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>More Details</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
            <Link href={href} className="z-1 absolute inset-0 block"/>
        </Card>
    );
}

export default ProjectCard;
