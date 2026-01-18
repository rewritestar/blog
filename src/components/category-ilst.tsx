import { useEffect, useState } from "react";
import { CategoryPage } from "./category-page";

export function CategoryList() {
  const [totalList, setTotalList] = useState([]);

  useEffect(() => {
    fetch("/src/content/posts.json")
      .then((response) => response.text())
      .then((text) => {
        const list = JSON.parse(text);
        setTotalList(list);
      });
  }, []);

  return (
    <>
      <CategoryPage totalList={totalList} />
    </>
  );
}
