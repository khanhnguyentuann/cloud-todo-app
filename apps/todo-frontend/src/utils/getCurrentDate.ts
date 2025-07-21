import i18n from "@/lib/i18n"

export function getCurrentDate() {
    return new Date().toLocaleDateString(i18n.language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
