// portfolio-jacobdev/app/projects/[slug]/page.tsx
import React from "react";
import {getProjectBySlug/*, getProjectSlugs*/} from "@/lib/projects";
import MDXClient from "../MDXClient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {ArrowUpRightIcon} from "lucide-react";

export const dynamic = 'force-dynamic';

// Static params disabled to avoid build-time MDX render issues.
// export async function generateStaticParams() {
//   const slugs = getProjectSlugs();
//   return slugs.map((slug) => ({slug}));
// }

interface TagObject {
  label: string;
}

type Tag = string | TagObject;

interface ProjectFrontMatter {
  title?: string;
  description?: string;
  website?: string;
  github?: string;
  showDemo?: boolean;
  showGithub?: boolean;
  tags?: Tag[];
  date?: string;
}

interface PageProps { params: { slug: string } }

export default async function ProjectPage({params}: PageProps) {
  const {slug} = params;
  const {mdxSource, frontMatter} = await getProjectBySlug(slug);

  const {
    title = "Untitled",
    description = "",
    website,
    github,
    showDemo = false,
    showGithub = false,
    tags = [],
    date,
  } = frontMatter as ProjectFrontMatter;

  const formattedDate = date ? new Date(date).toLocaleDateString() : null;

  return (
    <main className="space-y-8">
      <header className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <CardTitle className="text-xl">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.isArray(tags) &&
                    tags.map((t: Tag, i: number) => (
                      <Badge key={`tag-${i}`} variant="secondary">
                        {typeof t === "string" ? t : t.label}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-3">
            {website && showDemo ? (
              <Button asChild variant="outline">
                <a href={website} target="_blank" rel="noopener noreferrer">
                  View Demo <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}

            {github && showGithub ? (
              <Button asChild variant="default">
                <a href={github} target="_blank" rel="noopener noreferrer">
                  Github <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2">
            {formattedDate && (
              <time dateTime={date} className="text-sm text-muted-foreground">
                Posted {formattedDate}
              </time>
            )}
          </CardFooter>
        </Card>
      </header>

      <MDXClient mdxSource={mdxSource} />
    </main>
  );
}