import { useEffect, useState } from "react";
import type { CategoryContent } from "../../models/category.model";
import { NavLink } from "react-router";
import type { Post } from "../../models/post.model";

export function Category() {
  const [postTotal, setPostTotal] = useState(0);
  const [category, setCategory] = useState<Record<string, Post[]>>({});

  useEffect(() => {
    fetch("/src/content/categories.json")
      .then((response) => response.text())
      .then((text) => {
        const categories: CategoryContent = JSON.parse(text);
        setCategory(categories.categoryList);
        setPostTotal(categories.totalPost);
      });
  }, []);

  const getLinkToFirstContent = (categoryName: string): string => {
    return `/${category[categoryName][0]?.slug}`;
  };

  return (
    <div className="w-48">
      <ul className="text-gray-500 font-light text-sm">
        <NavLink to="/">
          <div className="p-1">전체보기({postTotal})</div>
        </NavLink>
        {Object.keys(category).map((categoryName) => (
          <NavLink to={getLinkToFirstContent(categoryName)}>
            <div className="p-1">{categoryName}</div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
