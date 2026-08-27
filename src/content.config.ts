import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

//首頁輪播圖
const carousel = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/carousel",
  }),
  schema: z.object({
    order: z.number().default(0), 
    title: z.string(),
    image: z.string(),
    link: z.string().optional(),
  }),
});

//最新消息
const news = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/news",
  }),
    schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
    is_ticker: z.boolean().default(false),
    is_service: z.boolean().default(false),
    event_status: z.string().optional(),
    enable_registration: z.boolean().default(false),
    tags: z.array(z.string()),
    summary: z.string().optional(),
  }),
});

//關於我們官方認證
const about = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/content/about",
  }),
  schema: z.object({
    weight: z.number().default(0), 
    title: z.string(),
    text: z.string(),  }),
});

//團隊介紹合作夥伴
const partnersCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,json}',
    base: './src/content/partners',
  }),
  schema: z.discriminatedUnion('category', [
    // 1. 外聘講師
    z.object({
      category: z.literal('lecturer'),
      name: z.string(),
      title: z.string().optional(), // 職稱/頭銜（選填）
      logo: z.string(),
      bio: z.string().default(''),
      weight: z.number().default(0),
      draft: z.boolean().default(false),
    }),

    // 2. 企業夥伴
    z.object({
      category: z.literal('enterprise'),
      name: z.string(),
      logo: z.string(),
      url: z.string().url().optional(),
      weight: z.number().default(0),
      draft: z.boolean().default(false),
    }),

    // 3. 公協會
    z.object({
      category: z.literal('association'),
      name: z.string(),
      logo: z.string(),
      url: z.string().url().optional(),
      weight: z.number().default(0),
      draft: z.boolean().default(false),
    }),
  ]),
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

//課程資訊
const allcourses = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/allcourses",
  }),
  schema: z.object({
    name: z.string(),
    start_date: z.coerce.date(),
    date_time: z.string(),
    deadline: z.coerce.date().optional(),
    location: z.string(),
    price: z.string(),
    info: z.string().optional(),
    url: z.string().optional(),
    category: z.enum(["iPAS", "ISO", "courses"]),
    hide: z.boolean().default(false),
  }),
});

//政府專區
const government = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/government", // 對應你的 Markdown 檔案夾
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tag: z.string().default('最新公告'), // 政府專案通常只需要單一標籤/狀態
    summary: z.string(),
  }),
});

//相關連結
const links = defineCollection({
    loader: glob({
      pattern: "**/*.md",
      base: "./src/content/links", 
    }),
    schema: z.object({
    name: z.string(),
    url: z.string().optional(),
    category: z.enum([
      'government',
      'policy',
      'friendly',
      'guidelines',
      'carbon',
      'ipas'
    ]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  news,
  carousel,
  service,
  about,
  partners: partnersCollection, 
  allcourses,
  government,
  links,
};