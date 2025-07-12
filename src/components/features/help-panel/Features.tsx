import { Calendar, Star } from "lucide-react"
import type { TFunction } from "i18next"
import type { FeatureCardProps } from "@/types"

interface FeaturesProps {
    t: TFunction
}

export function Features({ t }: FeaturesProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("featuresTitle")}</h3>
            <div className="flex flex-col gap-4">
                <FeatureCard icon={Calendar} title={t("myDayFeature")} desc={t("myDayDescription")} />
                <FeatureCard icon={Star} title={t("importantFeature")} desc={t("importantDescription")} />
                <FeatureCard icon={Calendar} title={t("plannedFeature")} desc={t("plannedDescription")} />
            </div>
        </div>
    )
}

function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
            <Icon className="h-5 w-5 text-orange-500 dark:text-blue-400 mt-0.5" />
            <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
            </div>
        </div>
    )
}