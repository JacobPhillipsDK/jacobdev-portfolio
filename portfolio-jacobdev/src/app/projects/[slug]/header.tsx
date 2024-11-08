'use client';

import {Button, buttonVariants} from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';

const animation = {
    hide: {
        x: -30,
        opacity: 0
    },
    show: {
        x: 0,
        opacity: 1
    }
};

type HeaderProps = {
    metadata: Project;
};

const Header = ({ metadata }: HeaderProps) => {
    const { title, description, website, github, tags, showDemo, showGithub } = metadata;

    return (
        <motion.div initial={animation.hide} animate={animation.show}>
            <Card >
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">{title}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    {website && showDemo ? (
                        <Button asChild variant={'outline'}>
                            <a href={website} target="_blank">
                                View Demo<ArrowUpRightIcon className="ml-2 size-5"/>
                            </a>
                        </Button>
                    ) : null}
                    {github &&  showGithub ? (
                        <Button asChild variant={"default"}>
                            <a href={github} target="_blank">
                                Github <ArrowUpRightIcon className="ml-2 size-5"/>
                            </a>
                        </Button>
                    ) : null }
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                    {tags?.map((tag, index) => (
                        <Badge key={`project-tag_${index}`}>{tag.label}</Badge>
                    ))}
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default Header;
