import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Post } from "../../models/post.model";
import { CategoryPage } from "./category-page";

export function CategoryList() {
  const [totalList, setTotalList] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetch("/src/content/posts.json")
      .then((response) => response.text())
      .then((text) => {
        let list = JSON.parse(text);
        if (category) {
          list = list.filter((item: Post) => {
            if (item.category === category) {
              return item;
            }
          });
        }
        setTotalList(list);
      });
  }, [category]);

  return (
    <>
      <CategoryPage totalList={totalList} />
    </>
  );
}
