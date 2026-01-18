import moment from "moment";
import type { Post } from "../../models/post.model";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

interface CategoryPageProps {
  totalList: Post[];
}

const limit = 5;

export function CategoryPage({ totalList }: CategoryPageProps) {
  const { slug } = useParams();
  const postIdx = totalList.findIndex((item) => item.slug === slug);
  const [pageIdx, setPageIdx] = useState(Math.floor(postIdx / limit));
  const list = totalList.slice(pageIdx * limit, pageIdx * limit + limit);

  useEffect(() => {
    // 새로고침시 pageIdx 초기값
    setPageIdx(Math.floor(postIdx / limit));
  }, [postIdx]);

  const movePage = (pageIdx: number) => {
    setPageIdx(pageIdx);
  };

  return (
    <>
      {list.map((item: Post) => {
        return (
          <NavLink to={`/${item.category}/${item.slug}`}>
            <div className="flex justify-between items-center font-light border-b border-gray-200 p-1">
              <span className={item.slug === slug ? "font-normal" : ""}>
                {item.title}
              </span>
              <span className="text-sm text-gray-400">
                {moment(item.createdDate).format("YYYY. MM. DD.")}
              </span>
            </div>
          </NavLink>
        );
      })}
      <Pagination
        postTotal={totalList.length}
        limit={limit}
        currentPageIdx={pageIdx}
        movePage={movePage}
      />
    </>
  );
}
