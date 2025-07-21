import { Mail, Phone } from "lucide-react"
import type { TFunction } from "i18next"
import type { FAQProps, ContactSupportProps } from "@/types"
interface FAQComponentProps {
    t: TFunction
}

export function FAQ({ t }: FAQComponentProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("faqTitle")}</h3>
            <FAQItem question={t("faqQuestion1")} answer={t("faqAnswer1")} />
            <FAQItem question={t("faqQuestion2")} answer={t("faqAnswer2")} />
            <FAQItem question={t("faqQuestion3")} answer={t("faqAnswer3")} />
            <div className="border-t border-amber-300 dark:border-gray-600 pt-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{t("supportTitle")}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t("supportDescription")}</p>
                <ContactSupport icon={Mail} contact={t("supportEmail")} />
                <ContactSupport icon={Phone} contact={t("supportPhone")} />
            </div>
        </div>
    )
}

function FAQItem({ question, answer }: FAQProps) {
    return (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-gray-600">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{question}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{answer}</p>
        </div>
    )
}

function ContactSupport({ icon: Icon, contact }: ContactSupportProps) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-orange-500 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">{contact}</span>
        </div>
    )
}