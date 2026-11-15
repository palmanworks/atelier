// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 1. ギャラリーのスキーマ
const gallery = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/gallery" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(), // ← z.string() ではなく image() 関数を使用
      date: z.date(),
      order: z.number().optional(),
    }),
});

// 2. ワーク（途中経過・スワッチ）のスキーマ
const works = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      date: z.date(),
      yarn: z.string().optional(),
      gauge: z.string().optional(),
    }),
});

// （既存の gallery, works の定義に加えて articles を追加）
const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // 記事の要約（一覧やOGP用）
    pubDate: z.date(), // 公開日
    image: z.string().optional(), // アイキャッチ画像
    tag: z.string().optional(), // カテゴリタグ（例: #構造設計）
  }),
});

export const collections = { gallery, works, articles };
