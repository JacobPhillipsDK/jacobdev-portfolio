import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, ArrowRight } from "lucide-react"
import ClientSideAnimation from "./ClientSideAnimation"

interface Experience {
  company: string
  role: string
  period: string
  description: string
  skills: string[]
}

const experiences: Experience[] = [
  {
    company: "Acme Inc",
    role: "WEB DEVELOPMENT",
    period: "2022 - Present",
    description: "Building beautiful and functional websites using modern web technologies, focusing on performance, accessibility, and SEO-friendly design.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    company: "Creative Designs Ltd",
    role: "UI/UX DESIGN",
    period: "2021 - 2022",
    description: "Creating delightful and intuitive user experiences, specializing in responsive design and user-centric methodologies.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"]
  },
  {
    company: "DataTech Solutions",
    role: "DATABASE MANAGEMENT",
    period: "2020 - 2022",
    description: "Storing and organizing data efficiently, ensuring data integrity, and optimizing database queries for high traffic applications.",
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQL"]
  },
  {
    company: "Innovative Apps Inc",
    role: "MOBILE DEVELOPMENT",
    period: "2019 - 2021",
    description: "Crafting engaging and scalable apps for smartphones and tablets, focusing on cross-platform development and native performance.",
    skills: ["React Native", "Flutter", "iOS", "Android"]
  }
]

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
      <div className="relative">
        <Card className="relative z-10 transition-colors duration-300 hover:bg-muted/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold">{experience.company}</h3>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-fit">
                {experience.role}
              </Badge>
            </div>
            <p className="mt-4 text-muted-foreground">{experience.description}</p>
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
          <div className="absolute inset-0 animate-ping bg-primary/50 rounded-full" />
        </div>
      </div>
  )
}

export default function ExperienceTimeline() {
  return (
      <section className="w-full py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-8">
            <ArrowRight className="w-6 h-6" />
            <h2 className="text-3xl font-bold">My Experience</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-[600px]">
            Here are some of my work experiences where I&apos;ve turned challenges into accomplishments, making things happen.
          </p>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12 relative">
              {experiences.map((experience, index) => (
                  <ClientSideAnimation key={experience.company}>
                    <ExperienceCard experience={experience} />
                  </ClientSideAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}