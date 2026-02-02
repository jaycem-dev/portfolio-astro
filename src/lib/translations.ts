export type Locale = "en" | "es";

export const translations = {
    en: {
        hero: {
            name: "Jordan C.",
            title: "I enjoy",
            subtitle: "simplicity.",
            contact: "Contact",
        },
        projects: {
            title: "Featured Projects",
            seeMore: "See more",
        },
        blog: {
            title: "Blog: Latest",
            seeMore: "See more",
        },
        nav: {
            home: "Home",
            projects: "Projects",
            blog: "Blog",
        },
    },
    es: {
        hero: {
            name: "Jordan C.",
            title: "Disfruto la",
            subtitle: "simplicidad.",
            contact: "Contacto",
        },
        projects: {
            title: "Proyectos Destacados",
            seeMore: "Ver más",
        },
        blog: {
            title: "Blog: Últimos",
            seeMore: "Ver más",
        },
        nav: {
            home: "Inicio",
            projects: "Proyectos",
            blog: "Blog",
        },
    },
} as const;

export function getTranslations(lang: Locale) {
    return translations[lang];
}
