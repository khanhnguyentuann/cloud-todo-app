import { Button } from "@/components/ui/button"
import type { AccountMenuProps } from "@/types"
import { User } from "lucide-react"
import type { FC } from "react"
import { useLanguage } from "@/hooks/UseLanguage"

export const AccountMenu: FC<AccountMenuProps> = ({ isOpen, onClose, onViewAccount }) => {
    const { t } = useLanguage()
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div
                className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-amber-300 dark:border-gray-600 p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-right mb-4">
                    <Button variant="ghost" size="sm" className="text-orange-500 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-gray-600">
                        {t.signOut}
                    </Button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">Khanh Nguyễn</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">khanhnguyentuann@gmail.com...</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-gray-600" onClick={() => {
                        onViewAccount()
                        onClose()
                    }}>
                        {t.viewAccount}
                    </Button>
                </div>
            </div>
        </div>
    )
}