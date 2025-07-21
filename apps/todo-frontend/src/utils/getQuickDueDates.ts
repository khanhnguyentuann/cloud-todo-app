import { formatShortDay } from "@/utils/formatDate"

export function getQuickDueDateOptions(today: Date, t: (key: string) => string) {
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const nextMonday = new Date(today)
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7))

    return [
        { label: t("today"), value: today, day: formatShortDay(today) },
        { label: t("tomorrow"), value: tomorrow, day: formatShortDay(tomorrow) },
        { label: t("nextWeek"), value: nextMonday, day: formatShortDay(nextMonday) },
    ]
}
