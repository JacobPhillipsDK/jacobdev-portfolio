import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";


const PROJECTS_PATH = path.join(process.cwd(), "projectContent");

function slugify(filename: string) {
  // remove extension
  const name = filename.replace(/\.[mM][dD]x?$/, "");
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")                // spaces -> -
    .replace(/[^a-z0-9\-]+/g, "-")      // non-alnum -> -
    .replace(/-+/g, "-")               // collapse dashes
    .replace(/^-+|-+$/g, "");         // trim dashes
}

export function getProjectFilenames(): string[] {
  return fs
    .readdirSync(PROJECTS_PATH)
    .filter((f) => /\.[mM][dD]x?$/.test(f));
}

export function getProjectSlugs(): string[] {
  return getProjectFilenames().map((f) => slugify(f));
}

export interface ProjectFrontMatter {
  title?: string;
  description?: string;
  tags?: Array<string | { label: string }>;
  thumbnail?: string;
  [key: string]: unknown;
}

export function getAllProjectsMeta(): Array<{ slug: string; frontMatter: ProjectFrontMatter }> {
  return getProjectFilenames().map((filename) => {
    const slug = slugify(filename);
    const raw = fs.readFileSync(path.join(PROJECTS_PATH, filename), "utf8");
    const { data } = matter(raw);
    return { slug, frontMatter: data as ProjectFrontMatter };
  });
}

function findFilenameForSlug(slug: string): string | null {
  const files = getProjectFilenames();
  for (const f of files) {
    if (slugify(f) === slug) return f;
  }
  return null;
}

export async function getProjectBySlug(slug: string) {
  const filename = findFilenameForSlug(slug);
  if (!filename) {
    throw new Error(`Project not found for slug: ${slug}`);
  }
  const fullPath = path.join(PROJECTS_PATH, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [
          rehypePrettyCode,
          {
            keepBackground: false,
            theme: { dark: "github-dark", light: "github-light" },
          },
        ],
      ],
    },
  });
  return { mdxSource, frontMatter: data as ProjectFrontMatter };
}
