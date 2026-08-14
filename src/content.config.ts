import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/news",
  }),

  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    is_ticker: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

const carousel = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/carousel",
  }),

  schema: z.object({
    title: z.string(),
    image: z.string(),
    link: z.string().optional(),
  }),
});

export const collections = {
  news,
  carousel,
};