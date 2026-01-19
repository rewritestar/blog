import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Post } from "../models/post.model";
import { CategoryContent } from "./../models/category.model";

const POSTS_DIR = path.resolve("content/posts");
const OUTPUT_DIR = path.resolve("src/content");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(POSTS_DIR);

const posts = [];
const categories: CategoryContent = { categoryList: {}, postTotal: 0 };
let count = 0;

for (const file of files) {
  if (!file.endsWith(".md") || file.includes("README")) continue;

  const fullPath = path.join(POSTS_DIR, file);
  const rawData = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(rawData);

  const postForCategory: Post = {
    title: data.title,
    category: data.category,
    createdDate: data.createdDate,
    slug: data.slug,
  };

  if (postForCategory.category) {
    categories.categoryList[postForCategory.category] ??= [];
    categories.categoryList[postForCategory.category].push(postForCategory);
  }

  const post = { ...postForCategory, content };
  posts.push(post);
  count++;
}
categories.postTotal = count;

// 최신순 정렬
posts.sort(
  (a, b) =>
    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
);

fs.writeFileSync(
  path.join(OUTPUT_DIR, "posts.json"),
  JSON.stringify(posts, null, 2),
);

fs.writeFileSync(
  path.join(OUTPUT_DIR, "categories.json"),
  JSON.stringify(categories, null, 2),
);

console.log("✅ content build complete");
