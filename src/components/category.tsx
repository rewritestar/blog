import { NavLink, useSearchParams } from "react-router";
import categories from "../content/categories.json";
import type { Post } from "../../models/post.model";

export function Category() {
  const postTotal = categories.postTotal;
  const categoryList: Record<string, Post[]> = categories.categoryList;
  const [searchParams] = useSearchParams();
  const category = searchParams.get("ct");

  const getLinkToFirstContent = (categoryName: string): string => {
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
              {categoryName}
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
