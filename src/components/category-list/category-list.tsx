import { NavLink } from "react-router";
import categories from "../../content/categories.json";
import type { Post } from "../../../models/post.model";

interface CategoryProps {
  category: string;
}

export function CategoryList({ category }: CategoryProps) {
  const postTotal = categories.postTotal;
  const categoryList: Record<string, Post[]> = categories.categoryList;

  const getLinkToFirstContent = (categoryName: string): string => {
    categoryList[categoryName].sort(
      (a: Post, b: Post) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
    );
    return `/${categoryList[categoryName][0]?.slug}?ct=${categoryList[categoryName][0]?.category}`;
  };

  return (
    <div className="w-48">
      <ul className="text-gray-500 font-light text-sm">
        <NavLink to="/?ct=all">
          <div className={`p-1 ${category === "all" && "font-bold"}`}>
            전체보기({postTotal})
          </div>
        </NavLink>
        {Object.keys(categoryList).map((categoryName) => (
          <NavLink to={getLinkToFirstContent(categoryName)}>
            <div className={`p-1 ${category === categoryName && "font-bold"}`}>
              {categoryName}({categoryList[categoryName].length})
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
