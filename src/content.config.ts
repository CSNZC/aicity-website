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
    image: z.string().optional().default('/img/'), // 預設圖路徑
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


const service = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/service",
  }),

  schema: z.object({
    title: z.string(),
    image: z.string(),
    link: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/about",
  }),

  schema: z.object({
    title: z.string(),
    image: z.string(),
    text: z.string(),  }),
});

const serviceb = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/serviceb",
  }),

  schema: z.object({
    title: z.string(),
    image: z.string(),
    text: z.string(),  }),
});

export const collections = {
  news,
  carousel,
  service,
  about,
  serviceb,
};