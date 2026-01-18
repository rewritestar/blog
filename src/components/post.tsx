import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import moment from "moment";

import type { Post } from "../../models/post.model";
import { Meta } from "./meta";

export function Post() {
  const [meta, setMeta] = useState<Post | undefined>();
  const [markDown, setMarkDown] = useState<string | undefined>("");
  const { slug } = useParams();
  useEffect(() => {
    fetch(`/src/content/posts.json`)
      .then((response) => response.text())
      .then((text) => {
        const postList = JSON.parse(text);
        let selectedPost: Post = postList[0];
        if (slug) {
          selectedPost = postList.find((item: Post) => item.slug === slug);
        }

        if (selectedPost) {
          setMeta({
            title: selectedPost.title,
            category: selectedPost.category,
            createdDate: moment(selectedPost.createdDate)
              .format("YYYY. MM. DD. hh:mm")
              .toString(),
            slug: selectedPost.slug,
          });
          setMarkDown(selectedPost.content);
        }
      });
  }, [slug]);

  return (
    <div className="flex flex-col w-3xl p-8">
      {meta && markDown ? (
        <>
          <Meta metaData={meta} />
          <div className="mt-8">
            <Markdown>{markDown}</Markdown>
          </div>
        </>
      ) : (
        <span>게시글이 없습니다.</span>
      )}
    </div>
  );
}
