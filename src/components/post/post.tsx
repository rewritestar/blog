import Markdown from "react-markdown";
import moment from "moment";

import { Meta } from "./meta";
import type { Post } from "../../../models/post.model";

interface PostProps {
  post: Post;
}

export function Post({ post }: PostProps) {
  const meta: Post | undefined = {
    title: post.title,
    category: post.category,
    createdDate: moment(post.createdDate)
      .format("YYYY. MM. DD. HH:mm")
      .toString(),
    slug: post.slug,
  };
  const markdown: string | undefined = post.content;

  return (
    <div className="flex flex-col w-3xl p-8">
      <Meta metaData={meta} />
      <div className="prose mt-8 pb-16">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
