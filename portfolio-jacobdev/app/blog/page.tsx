import React from "react";
import Link from "next/link";
import {Container} from "@/components/cotainer";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {fetchList} from "@/lib/payload";
import Reveal from "@/components/reveal";
import Image from 'next/image'

export default async function BlogPage() {
    const {docs} = await fetchList("posts", {depth: 2, limit: 100, sort: "-date"});

    return (
        <Container>
            <main className="p-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center lg:items-start pb-8">
                    <Reveal>
                        <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                            My
                        </h2>
                    </Reveal>
                    <Reveal>
                        <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                            Blog
                        </h2>
                    </Reveal>
                </div>

                <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div
                        className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                        <p className="text-lg font-medium text-muted-foreground">
                            No blog posts yet
                        </p>
                    </div>
                </div>


                {/*<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">*/}
                {/*    {(!docs || docs.length === 0) && <p>No posts found.</p>}*/}

                {/*    {(docs || []).map((post: any) => (*/}
                {/*        <Link */}
                {/*            key={post.id} */}
                {/*            href={`/blog/${post.slug ?? post.id}`}*/}
                {/*            className="group"*/}
                {/*        >*/}
                {/*            <Card className="overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-300 h-full">*/}
                {/*                /!* Image container with gray background *!/*/}
                {/*                <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center">*/}
                {/*                    <Image*/}
                {/*                        src="/placeholder.png"*/}
                {/*                        width={150}*/}
                {/*                        height={150}*/}
                {/*                        alt={post.title ?? "Blog post image"}*/}
                {/*                        className="object-contain"*/}
                {/*                    />*/}
                {/*                </div>*/}

                {/*                <CardContent className="p-6">*/}
                {/*                    /!* Author and Date *!/*/}
                {/*                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">*/}
                {/*                        <span className="font-medium">Sarah Chen</span>*/}
                {/*                        <span aria-hidden="true">•</span>*/}
                {/*                        <time dateTime={post.publishedAt}>*/}
                {/*                            {post.publishedAt */}
                {/*                                ? new Date(post.publishedAt).toLocaleDateString("en-US", {*/}
                {/*                                    day: "numeric",*/}
                {/*                                    month: "short",*/}
                {/*                                    year: "numeric"*/}
                {/*                                })*/}
                {/*                                : "Unknown"}*/}
                {/*                        </time>*/}
                {/*                    </div>*/}

                {/*                    /!* Title *!/*/}
                {/*                    <h3 className="text-xl font-bold mb-2 group-hover:underline line-clamp-2">*/}
                {/*                        {post.title ?? "Untitled"}*/}
                {/*                    </h3>*/}

                {/*                    /!* Description *!/*/}
                {/*                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">*/}
                {/*                        {post.description ?? "Explore the latest trends in web development, from AI-powered tools to innovative new frameworks and best practices that are shaping the future of the web."}*/}
                {/*                    </p>*/}

                {/*                    /!* Tags *!/*/}
                {/*                    {(post.tags || []).length > 0 && (*/}
                {/*                        <div className="flex flex-wrap gap-2">*/}
                {/*                            {(post.tags || []).map((t: any, i: number) => (*/}
                {/*                                <Badge */}
                {/*                                    key={i} */}
                {/*                                    variant="secondary"*/}
                {/*                                    className="text-xs"*/}
                {/*                                >*/}
                {/*                                    {typeof t === "string" ? t : t.label ?? String(t)}*/}
                {/*                                </Badge>*/}
                {/*                            ))}*/}
                {/*                        </div>*/}
                {/*                    )}*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*        </Link>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </main>
        </Container>
    );
}

