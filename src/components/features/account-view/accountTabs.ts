import { User, Crown, BarChart3, Shield, CreditCard } from "lucide-react"

export const accountTabs = (t: (key: string) => string) => [
    { id: "profile", label: t("profile"), icon: User },
    { id: "subscription", label: t("subscription"), icon: Crown },
    { id: "usage", label: t("usage"), icon: BarChart3 },
    { id: "privacy", label: t("privacy"), icon: Shield },
    { id: "billing", label: t("billing"), icon: CreditCard },
]