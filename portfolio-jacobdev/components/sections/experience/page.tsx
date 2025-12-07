import React from "react";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, Building2, SquareArrowOutUpRight} from "lucide-react";
import Reveal from "@/components/reveal";
import ClientSideAnimation from "@/components/ClientSideAnimation";
import {renderLexicalRoot} from "@/hooks/lexicalRenderer";
import {fetchWorkExperienceCollection} from "@/lib/fetchCollections/fetcher";

/** ---------- Payload shapes (keys contain spaces) ---------- */
type PayloadTechnology = { id: string; name: string };

type PayloadWork = {
    id: number | string;
    "title of the job": string;
    "company name": string;
    "company website"?: string;
    "Work Type"?: "freelance" | "internship" | "studentjob" | string;
    "Start date": string; // ISO
    "End date"?: string | null; // ISO or null
    isCurrent?: boolean;
    slug?: string;
    content?: { root?: unknown };
    "technologies used"?: PayloadTechnology[];
    updatedAt?: string;
    createdAt?: string;
};

/** ---------- View model (clean keys) ---------- */
type WorkVM = {
    id: string;
    role: string;
    company: string;
    homepage?: string;
    workType?: string;
    start: Date | null;
    end: Date | null;
    isCurrent: boolean;
    slug?: string;
    lexicalRoot?: unknown;
    skills: string[];
};

/** ---------- Helpers ---------- */
function safeDate(d?: string | null): Date | null {
    if (!d) return null;
    const t = Date.parse(d);
    return Number.isFinite(t) ? new Date(t) : null;
}

function formatRange(start: Date | null, end: Date | null, isCurrent: boolean, locale: string = "en") {
    const fmt = new Intl.DateTimeFormat(locale, {month: "long", year: "numeric"});
    const left = start ? fmt.format(start) : "";
    const right = isCurrent ? "Present" : end ? fmt.format(end) : "";
    if (left && right) return `${left} - ${right}`;
    if (left) return left;
    return right || "";
}

function prettyWorkType(t?: string) {
    if (!t) return undefined;
    const norm = t.toLowerCase();
    if (norm === "studentjob") return "Student job";
    if (norm === "internship") return "Internship";
    if (norm === "freelance") return "Freelance";
    return t[0].toUpperCase() + t.slice(1);
}

function mapDoc(doc: PayloadWork): WorkVM {
    return {
        id: String(doc.id),
        role: doc["title of the job"],
        company: doc["company name"],
        homepage: doc["company website"],
        workType: prettyWorkType(doc["Work Type"]),
        start: safeDate(doc["Start date"]),
        end: safeDate(doc["End date"] ?? null),
        isCurrent: Boolean(doc.isCurrent),
        slug: doc.slug,
        lexicalRoot: doc.content?.root,
        skills: (doc["technologies used"] ?? []).map((t) => t.name),
    };
}

function sortCurrentThenStartDesc(a: WorkVM, b: WorkVM) {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    const at = a.start?.getTime() ?? -Infinity;
    const bt = b.start?.getTime() ?? -Infinity;
    return bt - at;
}

/** ---------- Card ---------- */
function ExperienceCard({exp}: { exp: WorkVM }) {
    const period = formatRange(exp.start, exp.end, exp.isCurrent, "en");

    return (
        <div className="relative">
            <Card
                className="relative z-10 transition-colors duration-300 hover:bg-muted/80"
                role="article"
                aria-label={`Experience at ${exp.company} as ${exp.role}`}
            >
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Building2 className="w-5 h-5 text-primary"/>
                                <h3 className="text-2xl font-bold">{exp.company}</h3>
                                {exp.workType && (
                                    <Badge variant="secondary" className="w-fit">
                                        {exp.workType}
                                    </Badge>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4"/>
                                <span>{period}</span>
                                {exp.homepage && (
                                    <>
                                        <SquareArrowOutUpRight className="w-4 h-4"/>
                                        <Link
                                            href={exp.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {exp.homepage.replace(/^https?:\/\//, "")}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <Badge variant="secondary" className="w-fit">
                            {exp.role}
                        </Badge>
                    </div>


                    {!!exp.lexicalRoot && (
                        <div className="text-muted-foreground py-2">
                            {renderLexicalRoot(exp.lexicalRoot, {
                                context: "detail",
                                mode: "block",
                                classMap: {
                                    containerClass: "",
                                    block: {
                                        paragraph: "leading-7 [&:not(:first-child)]:mt-4",
                                    },
                                },
                            }) as React.ReactNode}
                        </div>
                    )}

                    {/* Skills */}
                    {exp.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {exp.skills.map((s, i) => (
                                <Badge key={`${exp.id}-skill-${i}`} variant="outline">
                                    {s}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* timeline dot + ping */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-20">
                <div className="absolute inset-0 animate-ping bg-primary/50 rounded-full"/>
            </div>
        </div>
    );
}

/** ---------- Timeline (Server) ---------- */
export default async function ExperienceTimeline() {
    const raw = (await fetchWorkExperienceCollection()) as unknown;

// Accept both shapes: `[...]` or `{ docs: [...] }`
    const docs: PayloadWork[] = Array.isArray(raw)
        ? raw as PayloadWork[]
        : (raw && Array.isArray((raw as any).docs))
            ? (raw as any).docs as PayloadWork[]
            : [];

    const items: WorkVM[] = docs.map(mapDoc).sort(sortCurrentThenStartDesc);

    return (
        <section className="w-full pb-24 lg:pb-24">
            <div className="container">
                <div
                    className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left pb-5">
                    <div className="flex flex-col items-center lg:items-start">
                        <Reveal>
                            <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                                My
                            </h2>
                        </Reveal>
                        <Reveal>
                            <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                                Experience
                            </h2>
                        </Reveal>
                    </div>
                    <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
                        Here are some of my work experiences where I&apos;ve turned challenges into accomplishments,
                        making things happen.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute bottom-0 left-8 top-0 w-px bg-border"/>
                    <div className="relative space-y-12">
                        {items.map((exp) => (
                            <ClientSideAnimation key={exp.id}>
                                <ExperienceCard exp={exp}/>
                            </ClientSideAnimation>
                        ))}

                        {items.length === 0 && (
                            <div className="text-muted-foreground">No experiences found.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
