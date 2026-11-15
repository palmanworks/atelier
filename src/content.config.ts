// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const gallery = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    image: z.string(), // ← z.string() に変更
    date: z.date(),
    order: z.number().optional(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    image: z.string(), // ← z.string() に変更
    date: z.date(),
    yarn: z.string().optional(),
    gauge: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string(), // ← z.string() に変更
    tag: z.string().optional(),
  }),
});

export const collections = { gallery, works, articles };
