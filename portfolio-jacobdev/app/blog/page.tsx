import React from "react";
import {Container} from "@/components/cotainer";
import {fetchList} from "@/lib/payload";
import Reveal from "@/components/reveal";

export default async function BlogPage() {
    // Fetch posts (currently not displayed)
    await fetchList("posts", {depth: 2, limit: 100, sort: "-date"});

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

                <div className="flex flex-col items-center justify-center py-24 px-6">
                    <div className="rounded-2xl border-2 border-dashed border-muted-foreground/40 bg-gradient-to-br from-muted/30 via-muted/20 to-background p-16 text-center shadow-lg max-w-2xl">
                        <div className="mb-6">
                            <svg
                                className="mx-auto h-16 w-16 text-muted-foreground/60"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">
                            No Blog Posts Yet
                        </h3>
                        <p className="text-base text-muted-foreground max-w-md mx-auto">
                            I&apos;m currently working on creating content. Check back soon for exciting articles and insights!
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

