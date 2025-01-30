import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "projectContent",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    thumbnail: z.string().optional(),
    showDemo: z.boolean().optional(),
    showGithub: z.boolean().optional(),
    tags: z
      .array(z.object({ label: z.string() }))
      .optional(),
  }),
});

export default defineConfig({
  collections: [projects],
});