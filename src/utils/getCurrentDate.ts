import i18n from "@/plugins/i18n"

export function getCurrentDate() {
    return new Date().toLocaleDateString(i18n.language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
