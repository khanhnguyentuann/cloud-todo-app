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
import { LoadingScreen } from "@/components/common/LoadingScreen"
import { useAuth } from "@/hooks/useAuth"
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
        return <LoadingScreen message={t("loadingMessage")} />
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
        <div className="h-screen flex flex-col bg-theme-background dark:bg-theme-background">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSettingsClick={() => setSettingsOpen(true)}
                onAccountClick={() => setAccountMenuOpen(true)}
                onHelpClick={() => setHelpOpen(true)}
                onNotificationClick={handleNotificationClick}
                unreadNotificationCount={unreadNotificationCount}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    isMobile={isMobile}
                />
                <div className="relative flex flex-1">
                    <main className="flex-1 overflow-y-auto bg-theme-background dark:bg-theme-background">
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
