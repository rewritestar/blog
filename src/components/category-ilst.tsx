import { CategoryPage } from "./category-page";
import { useSearchParams } from "react-router";
import type { Post } from "../../models/post.model";
import posts from "../content/posts.json";

export function CategoryList() {
  let totalList = posts;
  const [searchParams] = useSearchParams();
  const category = searchParams.get("ct");
  if (category && category !== "all") {
    totalList = posts.filter((item: Post) => item.category === category);
  }

  return (
    <div className="p-4">
      <CategoryPage totalList={totalList} />
    </div>
  );
}
