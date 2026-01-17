import { useEffect, useState } from "react";
import type { CategoryContent } from "../../models/category.model";

export function Category() {
  const [totalPost, setTotalPost] = useState(0);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    fetch("/src/content/categories.json")
      .then((response) => response.text())
      .then((text) => {
        const categories: CategoryContent = JSON.parse(text);
        setCategory(Object.keys(categories.categoryList));
        setTotalPost(categories.totalPost);
      });
  }, []);
  return (
    <div className="w-48">
      <ul className="text-gray-500 font-light text-sm">
        <div className="p-1">전체보기({totalPost})</div>
        {category.map((item) => (
          <div className="p-1">{item}</div>
        ))}
      </ul>
    </div>
  );
}
