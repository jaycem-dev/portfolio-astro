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
            title: "Blog",
            seeMore: "See more",
            readMore: "Read more",
        },
        nav: {
            home: "Home",
            projects: "Projects",
            blog: "Blog",
        },
        common: {
            all: "All",
        },
        routes: {
            projects: "projects",
            blog: "blog",
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
            title: "Blog",
            seeMore: "Ver más",
            readMore: "Leer más",
        },
        nav: {
            home: "Inicio",
            projects: "Proyectos",
            blog: "Blog",
        },
        common: {
            all: "Todos",
        },
        routes: {
            projects: "proyectos",
            blog: "blog",
        },
    },
} as const;

export function getTranslations(lang: Locale) {
    return translations[lang];
}
