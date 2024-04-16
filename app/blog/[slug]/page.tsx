import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/app/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";

async function getData(slug: string) {
  const query = `*[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  console.log(data);

  return (
    <div className="mt-10">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Inside My Mind´s Insanity
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="title Image"
        className="rounded-lig mt-8 border"
        priority
      />

      <div className="mt-10 prose-blue prose-lg prose-li:marker:bg-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
