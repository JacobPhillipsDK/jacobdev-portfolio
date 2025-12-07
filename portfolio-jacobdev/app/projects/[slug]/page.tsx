import {notFound} from "next/navigation";
import {renderLexicalRoot} from "@/hooks/lexicalRenderer";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter, CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {fetchDoc, fetchList} from "@/lib/payload";
import { Project } from "@/types/project";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowUpRightIcon} from "lucide-react";
import React from "react";



export default async function ProjectSlugPage({params,}: { params: { slug: string } | Promise<{ slug: string }>; }) {
    const {slug} = (await params) as { slug: string };

    console.log("[page] params.slug:", slug);
    const project = (await fetchDoc("Projects", slug, { depth: 2 })) as Project | null;

    if (!project) {
        // not found -> 404
        notFound();
    }

    return (
        <main className="p-6 max-w-4xl mx-auto">

            <Card>
                <CardHeader>
                    <div className="flex-1">
                        <CardTitle>{project.title}</CardTitle>
                        {project.description && <CardDescription>{project.description}</CardDescription>}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {(project.tags || []).map((t: any, i: number) => (
                                <Badge key={i}>{typeof t === "string" ? t : t.label ?? String(t)}</Badge>
                            ))}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-3">
                    {
                        project.showGithub && project.github &&
                        <Button asChild variant="default">
                            <Link href={project.github} target="_blank" rel="noopener noreferrer"
                                  className="inline-block">Github <ArrowUpRightIcon className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    }

                    {
                        project.showDemo && project.website &&
                        <Button asChild variant="default">
                            <Link href={project.website} target="_blank" rel="noopener noreferrer"
                                  className="inline-block">View Demo <ArrowUpRightIcon className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    }

                </CardContent>

                <CardFooter className="flex flex-wrap gap-2">


                    {project.date &&
                        <time dateTime={project.date}
                              className="text-sm text-muted-foreground">Posted {new Date(project.date).toLocaleDateString("da-DK")}</time>}

                </CardFooter>
            </Card>

            <div className="space-y-6">

                {project.content?.root ? (
                    <div className="prose max-w-none">{renderLexicalRoot(project.content.root)}</div>
                ) : (
                    <p>No content available.</p>
                )}
            </div>

        </main>
    );
}
