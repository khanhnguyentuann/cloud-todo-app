import type { User } from "@/types"

export type ProfileData = {
    name: string
    email: string
    phone: string
    timezone: string
}

export type Preferences = {
    emailNotifications: boolean
    pushNotifications: boolean
    weeklyDigest: boolean
    taskReminders: boolean
}

export type AccountViewProps = {
    isOpen: boolean
    onClose: () => void
    user: User | null
}