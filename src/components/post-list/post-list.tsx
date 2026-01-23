import moment from "moment";
import type { Post } from "../../../models/post.model";
import { NavLink } from "react-router";

interface PostListProps {
  list: Post[];
  category: string;
  slug: string;
}

export function PostList({ list, category, slug }: PostListProps) {
  return (
    <>
      <div className="h-48">
        <div className="flex justify-between items-center font-normal text-sm border-b border-gray-400 p-1 mb-1 text-gray-500">
          <span>제목</span>
          <span>작성일</span>
        </div>
        {list.map((item: Post) => {
          return (
            <NavLink to={`/${item.slug}?ct=${category}`}>
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
    </>
  );
}
