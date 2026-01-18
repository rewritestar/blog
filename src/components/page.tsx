import { Category } from "./category";
import { CategoryList } from "./category-ilst";
import { Post } from "./post";

export function Page() {
  return (
    <div className="flex">
      <Category />
      <div>
        <CategoryList />
        <Post />
      </div>
    </div>
  );
}
