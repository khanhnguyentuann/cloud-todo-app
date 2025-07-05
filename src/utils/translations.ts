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

  // Help
  help: string;
  helpCenter: string;
  gettingStarted: string;
  features: string;
  shortcuts: string;
  faq: string;
  contactSupport: string;
  searchHelp: string;

  // Help Content
  gettingStartedTitle: string;
  gettingStartedContent: string;
  addingTasksTitle: string;
  addingTasksContent: string;
  organizingTasksTitle: string;
  organizingTasksContent: string;
  settingRemindersTitle: string;
  settingRemindersContent: string;

  featuresTitle: string;
  myDayFeature: string;
  myDayDescription: string;
  importantFeature: string;
  importantDescription: string;
  plannedFeature: string;
  plannedDescription: string;

  shortcutsTitle: string;
  shortcutNewTask: string;
  shortcutSearch: string;
  shortcutToggleView: string;
  shortcutSettings: string;

  faqTitle: string;
  faqQuestion1: string;
  faqAnswer1: string;
  faqQuestion2: string;
  faqAnswer2: string;
  faqQuestion3: string;
  faqAnswer3: string;

  supportTitle: string;
  supportDescription: string;
  supportEmail: string;
  supportPhone: string;
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

    // Help
    help: "Help",
    helpCenter: "Help Center",
    gettingStarted: "Getting Started",
    features: "Features",
    shortcuts: "Shortcuts",
    faq: "FAQ",
    contactSupport: "Contact Support",
    searchHelp: "Search help...",

    // Help Content
    gettingStartedTitle: "Welcome to To Do!",
    gettingStartedContent:
      "Get started by creating your first task. Click on 'Add a task' to begin organizing your day.",
    addingTasksTitle: "Adding Tasks",
    addingTasksContent:
      "Simply type in the task input field and press Enter or click 'Add'. You can also set due dates, reminders, and repeat schedules.",
    organizingTasksTitle: "Organizing Tasks",
    organizingTasksContent:
      "Use the sidebar to organize tasks into different lists like My Day, Important, and Planned. Switch between grid and list views for better organization.",
    settingRemindersTitle: "Setting Reminders",
    settingRemindersContent:
      "Click the bell icon when adding a task to set reminders. Choose from quick options or pick a custom date and time.",

    featuresTitle: "Key Features",
    myDayFeature: "My Day",
    myDayDescription: "Focus on today's tasks and priorities",
    importantFeature: "Important",
    importantDescription: "Mark and track your most important tasks",
    plannedFeature: "Planned",
    plannedDescription: "View all tasks with due dates and schedules",

    shortcutsTitle: "Keyboard Shortcuts",
    shortcutNewTask: "Enter - Add new task",
    shortcutSearch: "Ctrl+F - Search tasks",
    shortcutToggleView: "Ctrl+G - Toggle grid/list view",
    shortcutSettings: "Ctrl+, - Open settings",

    faqTitle: "Frequently Asked Questions",
    faqQuestion1: "How do I mark a task as important?",
    faqAnswer1:
      "Click the star icon next to any task to mark it as important. Important tasks will appear in the Important list.",
    faqQuestion2: "Can I set recurring tasks?",
    faqAnswer2:
      "Yes! When adding a task, click the repeat icon to set up daily, weekly, monthly, or custom recurring schedules.",
    faqQuestion3: "How do I change the app language?",
    faqAnswer3:
      "Go to Settings > Language and time zone > Change your language to select from available languages.",

    supportTitle: "Need More Help?",
    supportDescription:
      "If you can't find what you're looking for, our support team is here to help.",
    supportEmail: "support@todo.com",
    supportPhone: "+1 (555) 123-4567",
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

    // Help
    help: "ヘルプ",
    helpCenter: "ヘルプセンター",
    gettingStarted: "はじめに",
    features: "機能",
    shortcuts: "ショートカット",
    faq: "よくある質問",
    contactSupport: "サポートに連絡",
    searchHelp: "ヘルプを検索...",

    // Help Content
    gettingStartedTitle: "To Doへようこそ！",
    gettingStartedContent:
      "最初のタスクを作成して始めましょう。「タスクを追加」をクリックして、一日の整理を始めてください。",
    addingTasksTitle: "タスクの追加",
    addingTasksContent:
      "タスク入力フィールドに入力してEnterを押すか、「追加」をクリックしてください。期限、リマインダー、繰り返しスケジュールも設定できます。",
    organizingTasksTitle: "タスクの整理",
    organizingTasksContent:
      "サイドバーを使用して、今日の予定、重要、予定済みなどの異なるリストにタスクを整理してください。グリッドとリスト表示を切り替えて、より良い整理ができます。",
    settingRemindersTitle: "リマインダーの設定",
    settingRemindersContent:
      "タスクを追加する際にベルアイコンをクリックしてリマインダーを設定してください。クイックオプションから選択するか、カスタム日時を選択できます。",

    featuresTitle: "主な機能",
    myDayFeature: "今日の予定",
    myDayDescription: "今日のタスクと優先事項に集中",
    importantFeature: "重要",
    importantDescription: "最も重要なタスクをマークして追跡",
    plannedFeature: "予定済み",
    plannedDescription: "期限とスケジュールがあるすべてのタスクを表示",

    shortcutsTitle: "キーボードショートカット",
    shortcutNewTask: "Enter - 新しいタスクを追加",
    shortcutSearch: "Ctrl+F - タスクを検索",
    shortcutToggleView: "Ctrl+G - グリッド/リスト表示を切り替え",
    shortcutSettings: "Ctrl+, - 設定を開く",

    faqTitle: "よくある質問",
    faqQuestion1: "タスクを重要としてマークするにはどうすればよいですか？",
    faqAnswer1:
      "任意のタスクの横にある星アイコンをクリックして重要としてマークしてください。重要なタスクは重要リストに表示されます。",
    faqQuestion2: "繰り返しタスクを設定できますか？",
    faqAnswer2:
      "はい！タスクを追加する際に、繰り返しアイコンをクリックして毎日、毎週、毎月、またはカスタム繰り返しスケジュールを設定できます。",
    faqQuestion3: "アプリの言語を変更するにはどうすればよいですか？",
    faqAnswer3:
      "設定 > 言語とタイムゾーン > 言語を変更に移動して、利用可能な言語から選択してください。",

    supportTitle: "さらにサポートが必要ですか？",
    supportDescription:
      "お探しのものが見つからない場合は、サポートチームがお手伝いします。",
    supportEmail: "support@todo.com",
    supportPhone: "+1 (555) 123-4567",
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

    // Help
    help: "Trợ giúp",
    helpCenter: "Trung tâm Trợ giúp",
    gettingStarted: "Bắt đầu",
    features: "Tính năng",
    shortcuts: "Phím tắt",
    faq: "Câu hỏi thường gặp",
    contactSupport: "Liên hệ Hỗ trợ",
    searchHelp: "Tìm kiếm trợ giúp...",

    // Help Content
    gettingStartedTitle: "Chào mừng đến với To Do!",
    gettingStartedContent:
      "Bắt đầu bằng cách tạo nhiệm vụ đầu tiên của bạn. Nhấp vào 'Thêm nhiệm vụ' để bắt đầu sắp xếp ngày của bạn.",
    addingTasksTitle: "Thêm Nhiệm vụ",
    addingTasksContent:
      "Chỉ cần nhập vào trường nhập nhiệm vụ và nhấn Enter hoặc nhấp 'Thêm'. Bạn cũng có thể đặt hạn chót, nhắc nhở và lịch lặp lại.",
    organizingTasksTitle: "Sắp xếp Nhiệm vụ",
    organizingTasksContent:
      "Sử dụng thanh bên để sắp xếp nhiệm vụ vào các danh sách khác nhau như Ngày của tôi, Quan trọng và Đã lên kế hoạch. Chuyển đổi giữa chế độ xem lưới và danh sách để tổ chức tốt hơn.",
    settingRemindersTitle: "Đặt Nhắc nhở",
    settingRemindersContent:
      "Nhấp vào biểu tượng chuông khi thêm nhiệm vụ để đặt nhắc nhở. Chọn từ các tùy chọn nhanh hoặc chọn ngày và giờ tùy chỉnh.",

    featuresTitle: "Tính năng Chính",
    myDayFeature: "Ngày của tôi",
    myDayDescription: "Tập trung vào các nhiệm vụ và ưu tiên của hôm nay",
    importantFeature: "Quan trọng",
    importantDescription: "Đánh dấu và theo dõi các nhiệm vụ quan trọng nhất",
    plannedFeature: "Đã lên kế hoạch",
    plannedDescription: "Xem tất cả nhiệm vụ có hạn chót và lịch trình",

    shortcutsTitle: "Phím tắt",
    shortcutNewTask: "Enter - Thêm nhiệm vụ mới",
    shortcutSearch: "Ctrl+F - Tìm kiếm nhiệm vụ",
    shortcutToggleView: "Ctrl+G - Chuyển đổi chế độ xem lưới/danh sách",
    shortcutSettings: "Ctrl+, - Mở cài đặt",

    faqTitle: "Câu hỏi Thường gặp",
    faqQuestion1: "Làm thế nào để đánh dấu nhiệm vụ là quan trọng?",
    faqAnswer1:
      "Nhấp vào biểu tượng ngôi sao bên cạnh bất kỳ nhiệm vụ nào để đánh dấu là quan trọng. Các nhiệm vụ quan trọng sẽ xuất hiện trong danh sách Quan trọng.",
    faqQuestion2: "Tôi có thể đặt nhiệm vụ lặp lại không?",
    faqAnswer2:
      "Có! Khi thêm nhiệm vụ, nhấp vào biểu tượng lặp lại để thiết lập lịch lặp lại hàng ngày, hàng tuần, hàng tháng hoặc tùy chỉnh.",
    faqQuestion3: "Làm thế nào để thay đổi ngôn ngữ ứng dụng?",
    faqAnswer3:
      "Đi đến Cài đặt > Ngôn ngữ và múi giờ > Thay đổi ngôn ngữ để chọn từ các ngôn ngữ có sẵn.",

    supportTitle: "Cần Thêm Trợ giúp?",
    supportDescription:
      "Nếu bạn không thể tìm thấy những gì bạn đang tìm kiếm, đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp đỡ.",
    supportEmail: "support@todo.com",
    supportPhone: "+1 (555) 123-4567",
  },
};
