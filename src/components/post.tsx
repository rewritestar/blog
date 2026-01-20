import { useNavigate, useParams, useSearchParams } from "react-router";
import Markdown from "react-markdown";
import moment from "moment";

import type { Post } from "../../models/post.model";
import posts from "../content/posts.json";
import { Meta } from "./meta";
import { useEffect } from "react";

export function Post() {
  let meta: Post | undefined;
  let markdown: string | undefined;
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      const firstPost = posts[0];
      navigate(`/${firstPost.slug}?ct=${searchParams.get("ct") || "all"}`);
    }
  }, [slug, searchParams, navigate]);

  const selectedPost = posts.find((item: Post) => item.slug === slug);
  if (selectedPost) {
    meta = {
      title: selectedPost.title,
      category: selectedPost.category,
      createdDate: moment(selectedPost.createdDate)
        .format("YYYY. MM. DD. hh:mm")
        .toString(),
      slug: selectedPost.slug,
    };
    markdown = selectedPost.content;
  }

  return (
    <div className="flex flex-col w-3xl p-8">
      {meta && markdown ? (
        <>        
          <Meta metaData={meta} />
          <div className="mt-8 prose">
            <Markdown>{markdown}</Markdown>
          </div>
        </>
      ) : (
        <span>게시글이 없습니다.</span>
      )}
    </div>
  );
}
