import { PostList } from "./post-list";
import { Pagination } from "./pagination";
import type { Post } from "../../../models/post.model";
import { useEffect, useState } from "react";

interface PostListPageProps {
  list: Post[];
  category: string;
  slug: string;
}

const limit = 5;

export function PostListPage({ list, category, slug }: PostListPageProps) {
  if (category && category !== "all") {
    list = list.filter((item: Post) => item.category === category);
  }
  const categoryTotalList = list;
  const postIdx = slug ? list.findIndex((item) => item.slug === slug) : 0;
  const [pageIdx, setPageIdx] = useState(0);
  list = list.slice(pageIdx * limit, pageIdx * limit + limit);

  useEffect(() => {
    setPageIdx(Math.floor(postIdx / limit));
  }, [postIdx]);

  const movePage = (pageIdx: number) => {
    setPageIdx(pageIdx);
  };

  return (
    <div className="h-64 px-4 mb-4 mt-4">
      <PostList list={list} category={category} slug={slug} />
      <Pagination
        postTotal={categoryTotalList.length}
        limit={limit}
        currentPageIdx={pageIdx}
        movePage={movePage}
      />
    </div>
  );
}
