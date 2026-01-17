import type { Post } from "./post.model";

export interface CategoryContent {
  categoryList: Record<string, Post[]>;
  totalPost: number;
}
