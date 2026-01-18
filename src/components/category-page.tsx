import moment from "moment";
import type { Post } from "../../models/post.model";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router";

interface CategoryPageProps {
  totalList: Post[];
}

const limit = 5;

export function CategoryPage({ totalList }: CategoryPageProps) {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const postIdx = slug ? totalList.findIndex((item) => item.slug === slug) : 0;
  const [pageIdx, setPageIdx] = useState(0);
  const list = totalList.slice(pageIdx * limit, pageIdx * limit + limit);

  useEffect(() => {
    setPageIdx(Math.floor(postIdx / limit));
  }, [postIdx]);

  const movePage = (pageIdx: number) => {
    setPageIdx(pageIdx);
  };

  return (
    <>
      <div className="mb-4">
        {list.map((item: Post) => {
          return (
            <NavLink to={`/${item.slug}?ct=${searchParams.get("ct")}`}>
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
      </div>
      <Pagination
        postTotal={totalList.length}
        limit={limit}
        currentPageIdx={pageIdx}
        movePage={movePage}
      />
    </>
  );
}
