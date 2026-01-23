import { useParams, useSearchParams } from "react-router";

import { CategoryList } from "./category-list/category-list";
import { PostListPage } from "./post-list/post-list-page";
import { Post } from "./post/post";
import posts from "../content/posts.json";
import type { Post as PostType } from "../../models/post.model";

export function Page() {
  const [searchParams] = useSearchParams();
  let category = searchParams.get("ct");
  let { slug } = useParams();

  if (!slug) {
    slug = posts[0].slug;
  }
  if (!category) {
    category = "all";
  }
  let post = posts.find((item: PostType) => item.slug === slug);

  return (
    <div className="flex">
      <CategoryList category={category} />
      <div>
        <PostListPage list={posts} category={category} slug={slug} />
        {post ? <Post post={post} /> : <span>게시글이 없습니다.</span>}
        <PostListPage list={posts} category={category} slug={slug} />
      </div>
    </div>
  );
}
