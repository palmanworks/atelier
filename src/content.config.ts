// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. ギャラリーのスキーマ
const gallery = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),        // 作品画像のパス
    date: z.date(),           // 制作日・公開日
    order: z.number().optional(), // 並び順を指定したい場合
  }),
});

// 2. ワーク（途中経過・スワッチ）のスキーマ
const works = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),        // 途中経過の写真
    date: z.date(),
    yarn: z.string().optional(),  // 使用した糸の情報
    gauge: z.string().optional(), // ゲージや目数・段数メモ
  }),
});

// （既存の gallery, works の定義に加えて articles を追加）
const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),        // 記事の要約（一覧やOGP用）
    pubDate: z.date(),              // 公開日
    image: z.string().optional(),   // アイキャッチ画像
    tag: z.string().optional(),     // カテゴリタグ（例: #構造設計）
  }),
});

export const collections = { gallery, works, articles };
