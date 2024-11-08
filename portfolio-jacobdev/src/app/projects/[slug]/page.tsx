import type {Metadata} from 'next';
import {MDXContent} from '@content-collections/mdx/react';
import {notFound} from 'next/navigation';
import {project} from '@/app/source';
import {Container} from '@/components/ui/container';
import Header from './header';
import Image from 'next/image';
import {createMetadata} from '@/lib/metadata';
import {metadata as meta} from '@/app/config';
import {Heading, headingTypes, MDXLink} from '@/lib/mdx/default-components';
import {cn} from '@/lib/utils';
import {HTMLAttributes} from 'react';



export async function generateStaticParams({
                                               params
                                           }: {
    params: { slug: string };
}) {
    const {slug} = params;
    // @ts-ignore
    return project.generateParams([slug]);
}

export function generateMetadata({params}: { params: { slug: string } }) {
    const {slug} = params;
    const page = project.getPage([slug]);
    if (!page) notFound();

    return createMetadata({
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            type: 'article',
            images: [
                {
                    alt: `Banner image for ${page.data.title}`,
                    width: 1200,
                    height: 630,
                    url: page.data.thumbnail ?? '/placeholder.png',
                    type: 'image/png'
                }
            ],
            authors: meta.author.name
        },
        twitter: {
            images: [
                {
                    alt: `Banner image for ${page.data.title}`,
                    width: 1200,
                    height: 630,
                    url: page.data.thumbnail ?? '/placeholder.png',
                }
            ]
        }
    }) satisfies Metadata;
}

export default async function ProjectPage({
                                              params
                                          }: {
    params: { slug: string };
}) {
    const {slug} = params;
    const page = project.getPage([slug]);
    if (!page) notFound();

    const {
        data: {toc, body, structuredData}
    } = page;

    return (
        <Container className="space-y-4">
            <div className="pt-24"></div>
            <Header metadata={page.data}/>
            <div className="px-[20px]">
                <div className="prose min-w-full dark:prose-invert content-center">
                    <MDXContent
                        code={body}
                        components={{
                            a: MDXLink,
                            ...Object.fromEntries(
                                headingTypes.map((type) => [
                                    type,
                                    (props: HTMLAttributes<HTMLHeadingElement>) => (
                                        <Heading as={type} {...props} />
                                    )
                                ])
                            ),
                            pre: ({className, style: _style, ...props}) => (
                                <pre
                                    className={cn(
                                        'max-h-[500px] overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-sm',
                                        className
                                    )}
                                    {...props}
                                >
                    {props.children}
                  </pre>
                            )
                        }}
                    />

                    <div className="flex justify-center items-center my-12">
                        <Image
                            src={page.data.thumbnail ?? '/placeholder.png'}
                            width={900}
                            height={400}
                            alt={`Banner image for ${page.data.title}`}
                            className="w-full h-auto rounded-lg object-cover cursor-pointer"
                        />
                    </div>


                </div>
            </div>
        </Container>
    );
}