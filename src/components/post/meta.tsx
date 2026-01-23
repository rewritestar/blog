interface MetaProps {
  metaData?: {
    category: string;
    title: string;
    createdDate: string;
    slug: string;
  };
}

export function Meta({ metaData }: MetaProps) {
  return (
    <div className="flex flex-col  border-b border-gray-200">
      <span className="text-gray-400 font-light mb-2">
        {metaData?.category}
      </span>
      <span className="text-3xl font-[350] mb-4">{metaData?.title}</span>
      <span className="text-gray-400 font-light mb-2">
        {metaData?.createdDate}
      </span>
    </div>
  );
}
