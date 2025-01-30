"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import React from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Anchor: React.FC<AnchorProps> = ({ href = "#", children, ...rest }) => {
  if (href.startsWith("http")) {
    return (
      <a href={href} {...rest} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // Omit unsupported Link props by casting rest
  const linkProps = rest as Omit<AnchorProps, 'target' | 'rel' | 'download'>;
  return (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  );
};

const components = {
  a: Anchor,
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre className="not-prose" {...props} />
  ),
};

export default function MDXClient({
  mdxSource,
}: {
  mdxSource: MDXRemoteSerializeResult;
}) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
