import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, Building2, SquareArrowOutUpRight} from "lucide-react"
import ClientSideAnimation from "./ClientSideAnimation"
import Reveal from '@/components/reveal';
import React from 'react';
import Link from 'next/link'

interface Experience {
    company: string
    homePage_link?: string
    role: string
    period: string
    description: string
    skills: string[]
    type_of_job: string
    key: number
}

const experiences: Experience[] = [
    {
        company: "Ad Fontes Society",
        role: "Full stack Developer",
        homePage_link: "https://adfontessociety.dk",
        period: "January 2025",
        description: "Design implementations and spearheading the development of an MVP for an alternative healthcare platform, with the purpose of helping people finding alternative treatments\n" +
            "Utilizing React, Next.js, Tailwind CSS, ShadcnUI/Radix UI, Firebase, and PostgreSQL to build the platform.\n" +

            "Currently guiding an intern in developing their skills and contributing to the front-end part of the project.",
        skills: ["React", "Next.js", "Tailwind CSS", "Figma", "UI/UX", "Agile", "Scrum", "Firebase", "PostgreSQL", "ShadcnUI/Radix UI"],
        type_of_job: "Full time",
        key: 1
    },
    {
        company: "Ad Fontes Society",
        role: "Full stack Developer",
        homePage_link: "https://adfontessociety.dk",
        period: "December 2024 - December 2024",
        description: "Conducted initial design, UX, and UI processes, and translated Figma designs into a landing page built with",
        skills: ["React", "Next.js", "Tailwind CSS", "Figma", "UI/UX", "Agile", "Scrum"],
        type_of_job: "Internship",
        key: 2

    },
    {
        company: "Vokalo ",
        role: "Software Developer",
        homePage_link: "https://vokalo.io",
        period: "September 2023 - December 2023",
        description: "Designed a robust Linux-based controller for charging stations on Raspberry Pi Compute Modules, incorporating automated test environments, secure remote access, OTA updates with Mender, and a FastAPI REST API for streamlined user interaction",
        skills: ["Python", "C++", "Javascript", "App Script", "Linux", "FastAPI", "Mender", "Raspberry Pi", "Linux Kernel", "Git", "Linux Network", "Scrum"],
        type_of_job: "Internship",
        key: 3
    },
    {
        company: "KMD - Clubtimiser",
        role: "Software Student Assistant",
        homePage_link: "https://kmd.dk",
        period: "September 2022 - February 2023",
        description: "Contributed to the UX and UI development of KMD Clubtimiser, a Microsoft Dynamics 365-based CRM for sports clubs, optimizing the customer information dashboard for usability and enhancing user experience through HCI principles.",
        skills: ["HTML", "CSS", "Microsoft Dynamics 365", "JavaScript", "Table/Dashboard design", "User Experience", "User Interface", "HCI", "Agile", "Photoshop", "Figma"],
        type_of_job: "Student job",
        key: 4
    },
]

function ExperienceCard({experience}: { experience: Experience }) {
    return (
        <div className="relative">
            <Card className="relative z-10 transition-colors duration-300 hover:bg-muted/80">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-primary"/>
                                <h3 className="text-2xl font-bold">{experience.company}</h3>
                                <Badge variant="secondary" className="w-fit">
                                    {experience.type_of_job}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4"/>
                                <span>{experience.period}</span>
                                <SquareArrowOutUpRight className="w-4 h-4"/>
                                <Link
                                    className="underline"
                                    href={experience.homePage_link ? experience.homePage_link : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {experience.homePage_link?.replace(/^https?:\/\//, '')}
                                </Link>
                            </div>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                            {experience.role}
                        </Badge>
                    </div>
                    {experience.description && (
                        <div className="mt-4 text-muted-foreground">
                            {experience.description.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-20">
                <div className="absolute inset-0 animate-ping bg-primary/50 rounded-full"/>
            </div>
        </div>
    )
}

export default function ExperienceTimeline() {
    return (
        <section className="w-full pb-24 lg:pb-24">
            <div className="container">
                <div
                    className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left pb-5">
                    <div className="flex flex-col items-center lg:items-start">
                        <Reveal>
                            <h2
                                className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                                My
                            </h2>
                        </Reveal>
                        <Reveal>
                            <h2
                                className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                                Experience
                            </h2>
                        </Reveal>
                    </div>
                    <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
                        Here are some of my work experiences where I&apos;ve turned challenges
                        into accomplishments, making things happen.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute bottom-0 left-8 top-0 w-px bg-border"/>
                    <div className="relative space-y-12">
                        {experiences.map((experience, index) => (
                            <ClientSideAnimation key={experience.key}>
                                <ExperienceCard experience={experience}/>
                            </ClientSideAnimation>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}