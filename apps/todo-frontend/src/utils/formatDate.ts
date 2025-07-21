export const formatShortDay = (date: Date) =>
    date.toLocaleDateString(undefined, { weekday: "short" })

export const formatLongDate = (date: Date) =>
    date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
