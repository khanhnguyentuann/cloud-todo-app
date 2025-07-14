import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/components/features/Header"
import { Sidebar } from "@/components/features/Sidebar"
import { SettingsPanel } from "@/components/features/SettingsPanel"
import { AccountMenu } from "@/components/features/AccountMenu"
import { useDarkMode } from "@/hooks/useDarkMode"
import { useMobile } from "@/hooks/useMobile"
import { TaskDetailSidebar } from "@/components/features/TaskDetailSideBar"
import HelpPanel from "@/components/features/help-panel"
import { NotificationPanel } from "@/components/features/NotificationPanel"
import AccountView from "@/components/features/account-view"
import { LoginScreen } from "@/components/features/LoginScreen"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { loginDemoUser } from "@/store/user"
import { useTaskContext } from "@/context/taskContext"
import { TaskProvider } from "@/context/TaskProvider"

function GlobalLayoutContent() {
    const [unreadNotificationCount] = useState(2)
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const { isAuthenticated, isLoading, signOut, signIn, user } = useAuth()
    const { t } = useTranslation()
    const isMobile = useMobile()

    const {
        // UI State
        sidebarOpen,
        setSidebarOpen,
        settingsOpen,
        setSettingsOpen,
        accountMenuOpen,
        setAccountMenuOpen,
        helpOpen,
        setHelpOpen,
        notificationOpen,
        accountViewOpen,
        setAccountViewOpen,
        taskDetailSidebarOpen,
        setTaskDetailSidebarOpen,
        selectedTask,
        handleNotificationClick
    } = useTaskContext()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                    <p className="mt-4 text-gray-700 dark:text-gray-300 animate-pulse">
                        {t("loadingMessage")}
                    </p>
                </div>
            </div>
        )
    }

    // Handle demo login with proper navigation
    const handleDemoLogin = async () => {
        const user = await loginDemoUser()
        if (user) {
            signIn(user)
        }
        return user
    }

    if (!isAuthenticated) {
        return <LoginScreen onSignIn={handleDemoLogin} />
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="shrink-0">
                <Header
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    onSettingsClick={() => setSettingsOpen(true)}
                    onAccountClick={() => setAccountMenuOpen(true)}
                    onHelpClick={() => setHelpOpen(true)}
                    onNotificationClick={handleNotificationClick}
                    unreadNotificationCount={unreadNotificationCount}
                />
            </div>
            <div className="flex flex-1">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    isMobile={isMobile}
                />
                <div className="relative flex flex-1">
                    <main className="flex-1 overflow-y-auto">
                        <Outlet />
                    </main>
                    <TaskDetailSidebar
                        isOpen={taskDetailSidebarOpen}
                        onClose={() => setTaskDetailSidebarOpen(false)}
                        task={selectedTask}
                        isMobile={isMobile}
                    />
                </div>
            </div>
            <SettingsPanel
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
            <HelpPanel
                isOpen={helpOpen}
                onClose={() => setHelpOpen(false)}
            />
            <NotificationPanel
                isOpen={notificationOpen}
                onClose={handleNotificationClick}
            />
            <AccountMenu
                isOpen={accountMenuOpen}
                onClose={() => setAccountMenuOpen(false)}
                onViewAccount={() => setAccountViewOpen(true)}
                onSignOut={signOut}
                user={user}
            />
            <AccountView
                isOpen={accountViewOpen}
                onClose={() => setAccountViewOpen(false)}
                user={user}
            />
        </div>
    )
}

export default function GlobalLayout() {
    return (
        <TaskProvider>
            <GlobalLayoutContent />
        </TaskProvider>
    )
}
