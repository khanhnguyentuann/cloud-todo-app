export type Language = "en" | "ja" | "vi";

export interface Translations {
    // Header
    appName: string;
    search: string;
    cancel: string;

    // Sidebar
    menu: string;
    myDay: string;
    important: string;
    planned: string;
    assignedToMe: string;
    flaggedEmail: string;
    tasks: string;
    newList: string;

    // Content Header
    today: string;
    grid: string;
    list: string;
    sort: string;

    // Task Input
    addTask: string;
    add: string;
    addDueDate: string;
    remindMe: string;
    repeat: string;

    // Sort Menu
    sortBy: string;
    dueDate: string;
    alphabetical: string;
    creationDate: string;

    // Due Date Menu
    due: string;
    tomorrow: string;
    nextWeek: string;
    pickDate: string;
    save: string;

    // Reminder Menu
    reminder: string;
    laterToday: string;
    pickDateTime: string;

    // Repeat Menu
    daily: string;
    weekdays: string;
    weekly: string;
    monthly: string;
    yearly: string;
    custom: string;
    weeks: string;
    months: string;
    years: string;

    // Settings
    settings: string;
    languageAndTimeZone: string;
    changeLanguage: string;
    darkMode: string;
    password: string;
    changePassword: string;

    // Account
    signOut: string;
    viewAccount: string;

    // Task Details
    taskDetails: string;
    removeFromImportant: string;
    markAsImportant: string;
    addReminder: string;
    addRepeat: string;
    created: string;
    deleteTask: string;

    // Days
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;

    // Months
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        // Header
        appName: "To Do",
        search: "Search",
        cancel: "Cancel",

        // Sidebar
        menu: "Menu",
        myDay: "My Day",
        important: "Important",
        planned: "Planned",
        assignedToMe: "Assigned to me",
        flaggedEmail: "Flagged email",
        tasks: "Tasks",
        newList: "New list",

        // Content Header
        today: "Today",
        grid: "Grid",
        list: "List",
        sort: "Sort",

        // Task Input
        addTask: "Add a task",
        add: "Add",
        addDueDate: "Add due date",
        remindMe: "Remind me",
        repeat: "Repeat",

        // Sort Menu
        sortBy: "Sort by",
        dueDate: "Due date",
        alphabetical: "Alphabetical",
        creationDate: "Creation date",

        // Due Date Menu
        due: "Due",
        tomorrow: "Tomorrow",
        nextWeek: "Next week",
        pickDate: "Pick a date",
        save: "Save",

        // Reminder Menu
        reminder: "Reminder",
        laterToday: "Later today",
        pickDateTime: "Pick a date & time",

        // Repeat Menu
        daily: "Daily",
        weekdays: "Weekdays",
        weekly: "Weekly",
        monthly: "Monthly",
        yearly: "Yearly",
        custom: "Custom",
        weeks: "weeks",
        months: "months",
        years: "years",

        // Settings
        settings: "Settings",
        languageAndTimeZone: "Language and time zone",
        changeLanguage: "Change your language",
        darkMode: "Dark Mode",
        password: "Password",
        changePassword: "Change your password",

        // Account
        signOut: "Sign out",
        viewAccount: "View account",

        // Task Details
        taskDetails: "Task Details",
        removeFromImportant: "Remove from Important",
        markAsImportant: "Mark as Important",
        addReminder: "Add reminder",
        addRepeat: "Add repeat",
        created: "Created",
        deleteTask: "Delete task",

        // Days
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",

        // Months
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
    },
    ja: {
        // Header
        appName: "To Do",
        search: "検索",
        cancel: "キャンセル",

        // Sidebar
        menu: "メニュー",
        myDay: "今日の予定",
        important: "重要",
        planned: "予定済み",
        assignedToMe: "自分に割り当て済み",
        flaggedEmail: "フラグ付きメール",
        tasks: "タスク",
        newList: "新しいリスト",

        // Content Header
        today: "今日",
        grid: "グリッド",
        list: "リスト",
        sort: "並び替え",

        // Task Input
        addTask: "タスクを追加",
        add: "追加",
        addDueDate: "期限を追加",
        remindMe: "リマインダー",
        repeat: "繰り返し",

        // Sort Menu
        sortBy: "並び替え",
        dueDate: "期限日",
        alphabetical: "アルファベット順",
        creationDate: "作成日",

        // Due Date Menu
        due: "期限",
        tomorrow: "明日",
        nextWeek: "来週",
        pickDate: "日付を選択",
        save: "保存",

        // Reminder Menu
        reminder: "リマインダー",
        laterToday: "今日の後で",
        pickDateTime: "日時を選択",

        // Repeat Menu
        daily: "毎日",
        weekdays: "平日",
        weekly: "毎週",
        monthly: "毎月",
        yearly: "毎年",
        custom: "カスタム",
        weeks: "週",
        months: "月",
        years: "年",

        // Settings
        settings: "設定",
        languageAndTimeZone: "言語とタイムゾーン",
        changeLanguage: "言語を変更",
        darkMode: "ダークモード",
        password: "パスワード",
        changePassword: "パスワードを変更",

        // Account
        signOut: "サインアウト",
        viewAccount: "アカウントを表示",

        // Task Details
        taskDetails: "タスクの詳細",
        removeFromImportant: "重要から削除",
        markAsImportant: "重要としてマーク",
        addReminder: "リマインダーを追加",
        addRepeat: "繰り返しを追加",
        created: "作成日",
        deleteTask: "タスクを削除",

        // Days
        sunday: "日曜日",
        monday: "月曜日",
        tuesday: "火曜日",
        wednesday: "水曜日",
        thursday: "木曜日",
        friday: "金曜日",
        saturday: "土曜日",

        // Months
        january: "1月",
        february: "2月",
        march: "3月",
        april: "4月",
        may: "5月",
        june: "6月",
        july: "7月",
        august: "8月",
        september: "9月",
        october: "10月",
        november: "11月",
        december: "12月",
    },
    vi: {
        // Header
        appName: "Việc cần làm",
        search: "Tìm kiếm",
        cancel: "Hủy",

        // Sidebar
        menu: "Menu",
        myDay: "Ngày của tôi",
        important: "Quan trọng",
        planned: "Đã lên kế hoạch",
        assignedToMe: "Được giao cho tôi",
        flaggedEmail: "Email được đánh dấu",
        tasks: "Nhiệm vụ",
        newList: "Danh sách mới",

        // Content Header
        today: "Hôm nay",
        grid: "Lưới",
        list: "Danh sách",
        sort: "Sắp xếp",

        // Task Input
        addTask: "Thêm nhiệm vụ",
        add: "Thêm",
        addDueDate: "Thêm hạn chót",
        remindMe: "Nhắc nhở tôi",
        repeat: "Lặp lại",

        // Sort Menu
        sortBy: "Sắp xếp theo",
        dueDate: "Ngày hết hạn",
        alphabetical: "Theo bảng chữ cái",
        creationDate: "Ngày tạo",

        // Due Date Menu
        due: "Hạn chót",
        tomorrow: "Ngày mai",
        nextWeek: "Tuần tới",
        pickDate: "Chọn ngày",
        save: "Lưu",

        // Reminder Menu
        reminder: "Nhắc nhở",
        laterToday: "Muộn hơn hôm nay",
        pickDateTime: "Chọn ngày & giờ",

        // Repeat Menu
        daily: "Hàng ngày",
        weekdays: "Ngày trong tuần",
        weekly: "Hàng tuần",
        monthly: "Hàng tháng",
        yearly: "Hàng năm",
        custom: "Tùy chỉnh",
        weeks: "tuần",
        months: "tháng",
        years: "năm",

        // Settings
        settings: "Cài đặt",
        languageAndTimeZone: "Ngôn ngữ và múi giờ",
        changeLanguage: "Thay đổi ngôn ngữ",
        darkMode: "Chế độ tối",
        password: "Mật khẩu",
        changePassword: "Thay đổi mật khẩu",

        // Account
        signOut: "Đăng xuất",
        viewAccount: "Xem tài khoản",

        // Task Details
        taskDetails: "Chi tiết nhiệm vụ",
        removeFromImportant: "Xóa khỏi Quan trọng",
        markAsImportant: "Đánh dấu là Quan trọng",
        addReminder: "Thêm nhắc nhở",
        addRepeat: "Thêm lặp lại",
        created: "Đã tạo",
        deleteTask: "Xóa nhiệm vụ",

        // Days
        sunday: "Chủ nhật",
        monday: "Thứ hai",
        tuesday: "Thứ ba",
        wednesday: "Thứ tư",
        thursday: "Thứ năm",
        friday: "Thứ sáu",
        saturday: "Thứ bảy",

        // Months
        january: "Tháng 1",
        february: "Tháng 2",
        march: "Tháng 3",
        april: "Tháng 4",
        may: "Tháng 5",
        june: "Tháng 6",
        july: "Tháng 7",
        august: "Tháng 8",
        september: "Tháng 9",
        october: "Tháng 10",
        november: "Tháng 11",
        december: "Tháng 12",
    },
};
