import React from 'react';

import Image from 'next/image';

import MotionWrap from '@/components/Motion/motionWrapper';
import TextReveal from '@/components/Motion/textReveal';


import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




function About() {
    return (
        <MotionWrap className="w-full pt-28 lg:pt-28" id="about">
            <Card className="bg-background">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative aspect-square w-32">
                            <div className="absolute inset-0 z-0 flex justify-center items-center">
                                <div
                                    className="w-20 h-20 sm:w-16 sm:h-16 md:w-12 md:h-12 lg:w-20 lg:h-20 bg-green-700 rounded-full animate-ping">

                                </div>
                            </div>
                            <Image
                                src="/Github Profile Picture.png"
                                alt="Profile picture"
                                fill
                                className="rounded-full object-cover"
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
                    <TextReveal>
                        I love working on web applications, automation, and network solutions.<br/>
                        In my free time, I enjoy building Raspberry Pi projects, solving challenges, and working on personal projects.
                        </TextReveal>
                    </p>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </MotionWrap>
    );
}

export default About;
