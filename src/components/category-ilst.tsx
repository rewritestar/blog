import { useEffect, useState } from "react";
import { CategoryPage } from "./category-page";
import { useSearchParams } from "react-router";
import type { Post } from "../../models/post.model";

export function CategoryList() {
  const [totalList, setTotalList] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("ct");

  useEffect(() => {
    fetch("/src/content/posts.json")
      .then((response) => response.text())
      .then((text) => {
        let list = JSON.parse(text);
        if (category && category !== "all") {
          list = list.filter((item: Post) => item.category === category);
        }
        setTotalList(list);
      });
  }, [category]);

  return (
    <div className="p-4">
      <CategoryPage totalList={totalList} />
    </div>
  );
}
