import { getCollection } from "astro:content";
import type { Project } from "@lib/types";
import type { Locale } from "@lib/translations";

export async function getProjects(homepage: boolean, lang: Locale) {
    const data = (
        await getCollection("projects", ({ data, id }) => {
            // Filter by locale based on path
            const itemLang = id.startsWith("es/") ? "es" : "en";
            if (itemLang !== lang) return false;

            // if the featured prop is true, then filter the collection
            if (homepage) {
                return data.featured === true;
            }
            // else just return the full collection
            return true;
        })
    ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    return data;
}

export function filterProjectsByTag(projects: Project[], tag: string) {
    return projects.filter((project) => project.data.tags.includes(tag));
}

export async function getProjectTags(lang: Locale) {
    const data = await getProjects(false, lang);
    const tags = Array.from(
        new Set(data.flatMap((item) => item.data.tags)),
    ).map((tag) => ({ tag }));

    return tags;
}
