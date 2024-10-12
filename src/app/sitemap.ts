import { MetadataRoute } from "next";
import { getNovels } from "@/lib/data/novel.data";
import { NovelType } from "@/types/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: novels } = await getNovels();
  const novelSitemap = novels.map((novel: NovelType) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/truyen/${novel.novelSlug}`,
      lastModified: new Date(novel.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    };
  });

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tim-truyen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/huong-dan`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...novelSitemap,
  ];
}
