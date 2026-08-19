import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

//最新消息
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

//首頁輪播圖
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

//永續服務輪播圖
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

//關於我們官方認證
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

//團隊介紹合作夥伴
const partnersCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/partners",
  }),
  schema: z.object({
    name: z.string(),                  // 夥伴名稱
    logo: z.string(),                  // Logo 圖片路徑
    url: z.string().url().optional(),  // 超連結 (選填)
    category: z.enum(['enterprise', 'association']), // 分類標籤
    weight: z.number().default(0),     // 排序順序
    draft: z.boolean().default(false), // 啟用狀態 (false 代表啟用顯示)
  }),
});

export const collections = {
  news,
  carousel,
  service,
  about,
  partners: partnersCollection, 
};