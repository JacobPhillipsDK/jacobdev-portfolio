import Image from "next/image"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import ClientSideSelect from "./clientside"
import MotionWrap from '@/components/motion-wrap';
import TextReveal from "@/components/motion/text-reveal";
import React from "react";

interface Technology {
    name: string
    icon: string
    learning?: boolean
}

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

const tabs = [
    {id: "mostused", label: "Most Used"},
    {id: "languages", label: "Languages"},
    {id: "webdev", label: "Web Dev"},
    {id: "aidata", label: "AI & Data Science"},
    {id: "devops", label: "DevOps & Tools"},
]


export default function TechnologyTabs() {
    return (
        <MotionWrap className="w-full py-24 lg:py-32" id="technologies">
            <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight pb-4">
                <TextReveal>Technologies I&apos;ve worked with</TextReveal>
            </h2>
            <div className="hidden lg:block">
                <Tabs defaultValue="mostused" className="w-full">
                    <TabsList
                        className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 text-sm sm:text-base lg:text-lg">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.id}>
                            <TechnologyGrid/>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            <div className="flex items-center mt-4 pb-6 lg:mt-6 lg:pb-8">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm sm:text-base lg:text-lg">Currently Learning</span>
                </div>
            </div>

            {/* Mobile Select Dropdown */}
            <div className="lg:hidden">
                <ClientSideSelect tabs={tabs}/>
                <TechnologyGrid/>
            </div>
        </MotionWrap>
    )
}

function TechnologyGrid() {
    return (
        <Card className="w-full max-w-none">
            <CardContent className="p-4 sm:p-6 lg:p-8 w-full">
                <div
                    className="grid gap-4 sm:gap-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                    {technologies.map((tech) => (
                        <div
                            key={tech.name}
                            className={` relative aspect-square flex items-center justify-center bg-muted rounded-lg p-2 sm:p-3 lg:p-4 transition-all duration-300 hover:scale-105 group ${tech.learning ? "ring-2 ring-green-500 ring-offset-2 ring-offset-background" : ""} `}
                        >
                            <Image
                                src={`/icons/${tech.icon}`}
                                alt={tech.name}
                                width={48}
                                height={48}
                                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                            />
                            <span
                                className="absolute inset-0 flex items-center justify-center bg-black/75 text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        {tech.name}{" "}
                </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}