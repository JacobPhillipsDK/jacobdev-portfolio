import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, School, SquareArrowOutUpRight } from "lucide-react"
import ClientSideAnimation from "@/components/ClientSideAnimation"
import Reveal from '@/components/reveal'
import React from 'react'
import Link from 'next/link'

interface Education {
  school_name: string;
  homePage_link?: string;
  degree: string;
  period: string;
  highlighted_skills: string[];
  thesis?: string;
}

const experiences: Education[] = [
  {
    school_name: "Aalborg University, Aalborg",
    degree: "Master of Science (MSc) in Medialogy",
    homePage_link: "https://aau.dk",
    period: "2022 - 2024",
    highlighted_skills: ["User Experience", "User Interface", "HCI", "Python", "FastAPI", "Machine Learning", "A* Algorithm", "Image Recognition", "Pathfinding", "Full Stack Development"],
    thesis: "My Master's thesis focused on generating user preferences based on walking routes in Aalborg, Denmark. " +
        "Using a combination of Machine Learning, specifically ResNet, I developed a model to recognize and analyze Street View images, achieving over 90% accuracy in image recognition.\n" +
        "To model optimal walking routes, I applied the A* algorithm in a node system, allowing for pathfinding that adapted to user-defined preferences. " +
        "The results demonstrated successful identification of preferred walking routes, effectively combining image recognition with weighted pathfinding to meet user needs. \n" +
        "All of this was implemented in a FastAPI REST API, providing a user-friendly interface for route generation and customization, the user also had the opportunity see and walk the suggested route virtually in a street view experience."
  },
  {
    school_name: "Aalborg University, Aalborg",
    degree: "Bachelor of Science (BSc) in Medialogy",
    homePage_link: "https://aau.dk",
    period: "2019 - 2022",
    highlighted_skills: [
      "User Experience",
      "User Interface",
      "HCI",
      "Python",
      "Machine Learning",
      "Full Stack Development",
      "Virtual Reality programming",
      "Sound and image processing",
      "Development of web and complex software systems",
      "object-oriented programming (OOP)",
      "Interaction design",
      "Human-computer interaction (HCI)",
      "Java",
      "Python",
      "C#",
      "HTML/CSS/Javascript",
      "SQL",
      "Unity",
      "Git",
      "Scrum",
      "Agile"
    ],
    thesis: "In my bachelor thesis, titled Comfortable Hand Gestures for Movement in Virtual Reality, I conducted a hand-gesture elicitation study to identify suitable gestures for locomotion control within a virtual reality environment. This project aimed to improve VR movement gestures, specifically continuous and teleportation gestures, using an elicitation-based approach.\n" +
        "Key research areas included defining gesture types, applying Wobbrok's study method with Morris' modifications, and minimizing legacy bias in user-generated gestures." +
        "The study involved 30 participants in both the elicitation study and a post-test, utilizing a logging system and NASA-TLX survey to assess task load.\n" +
        "The results indicated that gestures derived from the elicitation study had a lower task load index than industry-standard gestures, leading to discussions on the optimal number of gestures before quality declines. Additionally, I implemented software that could recognize these gestures in real-time within the virtual reality environment.",
  },
]

function ExperienceCard({ experience }: { experience: Education }) {
  return (
      <div className="relative">
        <Card className="relative z-10 transition-colors duration-300 hover:bg-muted/80">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-primary"/>
                  <h3 className="text-2xl font-bold">{experience.degree}</h3>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4"/>
                  <span>{experience.period}</span>
                  {experience.homePage_link && (
                      <>
                        <SquareArrowOutUpRight className="h-4 w-4"/>
                        <Link
                            className="underline"
                            href={experience.homePage_link ? experience.homePage_link : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          {experience.homePage_link?.replace(/^https?:\/\//, '')}
                        </Link>
                      </>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className="w-fit">
                {experience.school_name}
              </Badge>
            </div>
            {experience.thesis && (
                <div className="mt-4 text-muted-foreground">
                  {experience.thesis.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                  ))}
                </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.highlighted_skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="absolute left-0 top-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full bg-primary">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
        </div>
      </div>
  );
}

export default function ExperienceTimeline() {
  return (
      <section className="w-full pb-24 lg:pb-24">
        <div className="container">
          <div className="flex w-full flex-col items-center justify-center pb-5 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <Reveal>
                <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  My
                </h2>
              </Reveal>
              <Reveal>
                <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  Education
                </h2>
              </Reveal>
            </div>
            <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
              Masters and Bachelor&#39;s degree in Medialogy from Aalborg
              University, Denmark.
            </p>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 left-8 top-0 w-px bg-border" />
            <div className="relative space-y-12">
              {experiences.map((experience, index) => (
                  <ClientSideAnimation key={index}>
                    <ExperienceCard experience={experience} />
                  </ClientSideAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}