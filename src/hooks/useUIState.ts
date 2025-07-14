import { useState, useLayoutEffect } from 'react'
import { useMobile } from '@/hooks/useMobile'
import type { Task, ViewMode } from '@/types'

export interface UseUIStateReturn {
    // Task input state
    inputValue: string
    setInputValue: (value: string) => void
    dueDate: string
    setDueDate: (value: string) => void
    reminder: string
    setReminder: (value: string) => void
    repeat: string
    setRepeat: (value: string) => void

    // Task detail sidebar
    taskDetailSidebarOpen: boolean
    setTaskDetailSidebarOpen: (open: boolean) => void
    selectedTask: Task | null
    setSelectedTask: (task: Task | null) => void

    // Main sidebar
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void

    // Panel states
    settingsOpen: boolean
    setSettingsOpen: (open: boolean) => void
    accountMenuOpen: boolean
    setAccountMenuOpen: (open: boolean) => void
    helpOpen: boolean
    setHelpOpen: (open: boolean) => void
    notificationOpen: boolean
    setNotificationOpen: (open: boolean) => void
    accountViewOpen: boolean
    setAccountViewOpen: (open: boolean) => void

    // View preferences
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
    sortBy: string
    setSortBy: (sort: string) => void

    // Actions
    handleTaskSelect: (task: Task) => void
    handleNotificationClick: () => void
    clearTaskInput: () => void
}

export function useUIState(): UseUIStateReturn {
    // Task input state
    const [inputValue, setInputValue] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [reminder, setReminder] = useState("")
    const [repeat, setRepeat] = useState("")

    // Task detail sidebar
    const [taskDetailSidebarOpen, setTaskDetailSidebarOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    // Main sidebar
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // Panel states
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [accountViewOpen, setAccountViewOpen] = useState(false)

    // View preferences
    const [viewMode, setViewMode] = useState<ViewMode>("list")
    const [sortBy, setSortBy] = useState("Creation date")

    const isMobile = useMobile()

    // Handle mobile responsiveness
    useLayoutEffect(() => {
        setSidebarOpen(!isMobile)
        setTaskDetailSidebarOpen(false)
    }, [isMobile])

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task)
        setTaskDetailSidebarOpen(true)
    }

    const handleNotificationClick = () => {
        setNotificationOpen(!notificationOpen)
        setAccountMenuOpen(false)
        setSettingsOpen(false)
        setHelpOpen(false)
    }

    const clearTaskInput = () => {
        setInputValue("")
        setDueDate("")
        setReminder("")
        setRepeat("")
    }

    return {
        // Task input state
        inputValue,
        setInputValue,
        dueDate,
        setDueDate,
        reminder,
        setReminder,
        repeat,
        setRepeat,

        // Task detail sidebar
        taskDetailSidebarOpen,
        setTaskDetailSidebarOpen,
        selectedTask,
        setSelectedTask,

        // Main sidebar
        sidebarOpen,
        setSidebarOpen,

        // Panel states
        settingsOpen,
        setSettingsOpen,
        accountMenuOpen,
        setAccountMenuOpen,
        helpOpen,
        setHelpOpen,
        notificationOpen,
        setNotificationOpen,
        accountViewOpen,
        setAccountViewOpen,

        // View preferences
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,

        // Actions
        handleTaskSelect,
        handleNotificationClick,
        clearTaskInput
    }
}
