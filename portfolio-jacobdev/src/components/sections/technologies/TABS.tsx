import React from 'react'
import Image from 'next/image'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import TextReveal from '@/components/motion/text-reveal';
import MotionWrap from '@/components/motion-wrap';


type Technology = {
    name: string;
    icon: string;
    learning?: boolean;
};

const technologies: Technology[] = [
    {name: 'React', icon: '/placeholder.svg', learning: true},
    {name: 'Next.js', icon: '/placeholder.svg'},
    {name: 'Tailwind CSS', icon: '/placeholder.svg'},
    {name: 'Fiber', icon: '/placeholder.svg'},
    {name: 'CSS', icon: '/placeholder.svg', learning: true},
    {name: 'JAMstack', icon: '/placeholder.svg'},
    {name: 'Node.js', icon: '/placeholder.svg', learning: true},
    {name: 'Express', icon: '/placeholder.svg'},
    {name: 'Django', icon: '/placeholder.svg'},
    {name: 'MongoDB', icon: '/placeholder.svg'},
    {name: 'PostgreSQL', icon: '/placeholder.svg'},
    {name: 'Redis', icon: '/placeholder.svg'},
    {name: 'Bootstrap', icon: '/placeholder.svg'},
    {name: 'Celery', icon: '/placeholder.svg'},
    {name: 'NGINX', icon: '/placeholder.svg'},
    {name: 'Socket.io', icon: '/placeholder.svg'},
    {name: 'Spring Boot', icon: '/placeholder.svg'},
    {name: 'GraphQL', icon: '/placeholder.svg'},
    {name: 'Fastify', icon: '/placeholder.svg'},
    {name: 'Mantine', icon: '/placeholder.svg'},
    {name: 'Stripe', icon: '/placeholder.svg'},
];


export default function TechnologiesGrid() {
    return (
        <MotionWrap className="w-full py-24 lg:py-32" id="technologies">
            <div className="px-4 md:px-6">
                <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight pb-4">
                    <TextReveal>Technologies I&apos;ve worked with</TextReveal>
                </h2>
                <div>
                    <div className="max-w-full">
                        <Tabs defaultValue="webdev" className="w-full">
                            <TabsList
                                className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 text-sm sm:text-base lg:text-lg">
                                <TabsTrigger value="mostused">Most Used</TabsTrigger>
                                <TabsTrigger value="languages">Languages</TabsTrigger>
                                <TabsTrigger value="webdev">Web Dev</TabsTrigger>
                                <TabsTrigger value="aidata">AI & Data Science</TabsTrigger>
                                <TabsTrigger value="devops">DevOps & Tools</TabsTrigger>
                            </TabsList>
                            {['webdev', 'devops', 'languages', 'aidata', 'mostused'].map((tab) => (
                                <TabsContent key={tab} value={tab}>
                                    <Card className="w-full max-w-none">
                                        <CardContent className="p-4 sm:p-6 lg:p-8 w-full">
                                            <div className="w-full grid auto-rows-auto gap-4 place-items-start
                                                grid-cols-3
                                                sm:grid-cols-4
                                                md:grid-cols-5
                                                lg:grid-cols-6
                                                xl:grid-cols-7
                                                2xl:grid-cols-13
                                                3xl:grid-cols-15
                                               ">
                                                {technologies.map((tech) => (
                                                    <div
                                                        key={tech.name}
                                                        className={`
                                                            w-full max-w-[120px] aspect-square
                                                            flex items-center justify-center 
                                                            bg-muted rounded-lg 
                                                            p-2 sm:p-3 lg:p-4
                                                            transition-all duration-300 hover:scale-105
                                                            ${tech.learning ? 'ring-4 ring-green-500 ring-offset-1 ring-offset-background' : ''}
                                                        `}
                                                    >
                                                        <Image
                                                            src={`/icons/${tech.icon}`}
                                                            alt={tech.name}
                                                            width={40}
                                                            height={40}
                                                            className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-contain"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                        <div className="flex items-center mt-4 pb-6 lg:mt-6 lg:pb-8">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"></div>
                                <span className="text-sm sm:text-base lg:text-lg">Currently Learning</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MotionWrap>
    )
}