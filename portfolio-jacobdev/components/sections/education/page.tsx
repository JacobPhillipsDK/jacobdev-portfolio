import React from "react";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, School, SquareArrowOutUpRight} from "lucide-react";
import Reveal from "@/components/reveal";
import ClientSideAnimation from "@/components/ClientSideAnimation";
import {fetchAllEducationCollection} from "@/lib/fetchCollections/fetcher";
import {renderLexicalRoot} from "@/hooks/lexicalRenderer";


/** ---------- Payload shapes (keys contain spaces) ---------- */
type PayloadTechnology = { id: string; name: string };

type PayloadEducation = {
    id: number | string;
    "Full Education Title": string;
    "University webpage"?: string;
    "University Name": string;
    "Start date": string; // ISO
    "End date"?: string;  // ISO
    isCurrent?: boolean;
    slug?: string;
    content?: { root?: unknown };
    "technologies used"?: PayloadTechnology[];
    updatedAt?: string;
    createdAt?: string;
};

/** ---------- View model (clean keys) ---------- */
type EducationVM = {
    id: string;
    title: string;
    schoolName: string;
    homepage?: string;
    start: Date | null;
    end: Date | null;
    isCurrent: boolean;
    slug?: string;
    lexicalRoot?: unknown;
    skills: string[];
};

/** ---------- Helpers ---------- */
function safeDate(d?: string): Date | null {
    if (!d) return null;
    const t = Date.parse(d);
    return Number.isFinite(t) ? new Date(t) : null;
}

function formatRange(start: Date | null, end: Date | null, isCurrent: boolean): string {
    const fmt = new Intl.DateTimeFormat("en", {month: "short", year: "numeric"});
    const left = start ? fmt.format(start) : "";
    const right = isCurrent ? "Present" : end ? fmt.format(end) : "";
    if (left && right) return `${left} – ${right}`;
    if (left) return left;
    return right || "";
}

function mapDoc(doc: PayloadEducation): EducationVM {
    return {
        id: String(doc.id),
        title: doc["Full Education Title"],
        schoolName: doc["University Name"],
        homepage: doc["University webpage"],
        start: safeDate(doc["Start date"]),
        end: safeDate(doc["End date"]),
        isCurrent: Boolean(doc.isCurrent),
        slug: doc.slug,
        lexicalRoot: doc.content?.root,
        skills: (doc["technologies used"] ?? []).map((t) => t.name),
    };
}

function sortByStartDesc(a: EducationVM, b: EducationVM) {
    const at = a.start?.getTime() ?? -Infinity;
    const bt = b.start?.getTime() ?? -Infinity;
    return bt - at;
}

/** ---------- Card ---------- */
function ExperienceCard({exp}: { exp: EducationVM }) {
    const period = formatRange(exp.start, exp.end, exp.isCurrent);

    return (
        <div className="relative">
            <Card className="relative z-10 transition-colors duration-300 hover:bg-muted/80">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <School className="h-5 w-5 text-primary"/>
                                <h3 className="text-2xl font-bold">{exp.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4"/>
                                <span>{period}</span>
                                {exp.homepage && (
                                    <>
                                        <SquareArrowOutUpRight className="h-4 w-4"/>
                                        <Link
                                            className="underline"
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
                            {exp.schoolName}
                        </Badge>
                    </div>


                    {!!exp.lexicalRoot && (
                        <div className="mt-4 text-muted-foreground">
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
                        <div className="mt-4 flex flex-wrap gap-2">
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
            <div className="absolute left-0 top-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full bg-primary">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/50"/>
            </div>
        </div>
    );
}

/** ---------- Timeline (Server) ---------- */
export default async function ExperienceTimeline() {
    const docs = (await fetchAllEducationCollection()) as PayloadEducation[];

    // map + sort
    const items: EducationVM[] = (docs ?? []).map(mapDoc).sort(sortByStartDesc);

    return (
        <section className="w-full pb-24 lg:pb-24">
            <div className="container">
                <div
                    className="flex w-full flex-col items-center justify-center pb-5 text-center lg:flex-row lg:justify-between lg:text-left">
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
                        Masters and Bachelor&#39;s degree in Medialogy from Aalborg University, Denmark.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute bottom-0 left-8 top-0 w-px bg-border"/>
                    <div className="relative space-y-12">
                        {items.map((exp) => (
                            <ClientSideAnimation key={exp.id}>
                                {/* Server component as child of server (this file). The client wrapper just animates children. */}
                                <ExperienceCard exp={exp}/>
                            </ClientSideAnimation>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
