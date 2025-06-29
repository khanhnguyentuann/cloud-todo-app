import { type FC } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { X, ArrowRight } from "lucide-react"
import type { SettingsPanelProps } from "@/types"

export const SettingsPanel: FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl mx-4 max-h-[80vh] flex flex-col border border-amber-300">
                <div className="flex items-center justify-between p-4 border-b border-amber-300">
                    <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Language and time zone</h3>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-orange-500 hover:bg-orange-50"
                        >
                            Change your language
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">Dark Mode</h3>
                            <Switch defaultChecked />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Password</h3>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-orange-500 hover:bg-orange-50"
                        >
                            Change your password
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
