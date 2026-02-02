import { getCollection } from "astro:content";
import type { Blog } from "@lib/types";
import type { Locale } from "@lib/translations";

export async function getPosts(homepage: boolean, lang: Locale) {
    let data = (
        await getCollection("blog", ({ id }) => {
            // Filter by locale based on path
            const itemLang = id.startsWith("es/") ? "es" : "en";
            return itemLang === lang;
        })
    ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    if (homepage) {
        data.slice(0, 2);
    }

    return data;
}

export function filterPostsByTag(projects: Blog[], tag: string) {
    return projects.filter((project) => project.data.tags.includes(tag));
}

export async function getPostsTags(lang: Locale) {
    const data = await getPosts(false, lang);
    const tags = Array.from(
        new Set(data.flatMap((item) => item.data.tags)),
    ).map((tag) => ({ tag }));

    return tags;
}
