import { useEffect, useState } from "react";
import type { CategoryContent } from "../../models/category.model";
import { NavLink, useSearchParams } from "react-router";
import type { Post } from "../../models/post.model";

export function Category() {
  const [postTotal, setPostTotal] = useState(0);
  const [categoryList, setCategoryList] = useState<Record<string, Post[]>>({});
  const [searchParams] = useSearchParams();
  const category = searchParams.get("ct");

  useEffect(() => {
    fetch("/src/content/categories.json")
      .then((response) => response.text())
      .then((text) => {
        const categories: CategoryContent = JSON.parse(text);
        setCategoryList(categories.categoryList);
        setPostTotal(categories.totalPost);
      });
  }, []);

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
