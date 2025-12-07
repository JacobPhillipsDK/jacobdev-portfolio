import React from "react";
import { notFound } from "next/navigation";
import { renderLexicalRoot } from "@/hooks/lexicalRenderer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchDoc } from "@/lib/payload";
import { Container } from "@/components/cotainer";

export default async function BlogPostPage({ params, }: { params: { slug: string } | Promise<{ slug: string }>; }) {
  const { slug } = (await params) as { slug: string };

  // NOTE: assuming collection slug is "blog". Change if your collection is named differently.
  const post = await fetchDoc("blog", slug, { depth: 2 });

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <main className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex-1">
              <CardTitle>{post.title}</CardTitle>
              {post.description && <CardDescription>{post.description}</CardDescription>}

              <div className="mt-3 flex flex-wrap gap-2">
                {(post.tags || []).map((t: any, i: number) => (
                  <Badge key={i}>{typeof t === "string" ? t : t.label ?? String(t)}</Badge>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {post.content?.root ? (
              <div className="prose max-w-none">{renderLexicalRoot(post.content.root)}</div>
            ) : (
              <p>No content available.</p>
            )}
          </CardContent>

          <CardFooter className="text-sm text-muted-foreground">
            {post.date && <time dateTime={post.date}>Posted {new Date(post.date).toLocaleDateString("da-DK")}</time>}
          </CardFooter>
        </Card>
      </main>
    </Container>
  );
}

