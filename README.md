# 📌 Cloud To-Do App

🚀 **Cloud To-Do App** is a personal task management application (to-do list) built with **React + TypeScript + Vite**, using **Tailwind CSS** for a modern UI, supporting multi-language (i18n) and component-based architecture for easy scalability.  
Currently, it uses an internal mock API and is ready to integrate with serverless backends (like AWS Lambda, DynamoDB) in the future.

---

## ✨ Features

- ✅ Add, edit, delete tasks
- ✅ Assign due dates & reminders
- ✅ Sort & filter tasks
- ✅ Sidebar to display task details
- ✅ Multi-language support (LanguageContext + dynamic translation)
- ✅ Responsive UI for both desktop & mobile
- ✅ Clean separation of components & types for maintainability

---

## 🚀 Getting Started

```bash
# Clone the project
git clone https://github.com/yourusername/cloud-todo-app.git
cd cloud-todo-app-main/cloud-todo-app-main

# Install dependencies
npm install

# Start local dev server
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173)

---

## 🗂 Project Structure

```
src/
├── App.tsx               # Main entry component
├── main.tsx              # Mounts React to DOM
├── components/           # Main components (Header, Sidebar, TaskList, ...)
│   └── ui/               # Smaller UI components (button, input, select, ...)
├── hooks/                # Custom hooks (UseLanguage, UseMobile)
├── lib/                  
│   └── api/Todo.ts       # Mock API for tasks
├── pages/                # Entry page
├── types/                # Centralized TypeScript types
├── utils/                # Metadata & translations
└── index.css             # Tailwind entry point
```

---

## 🔧 Tech Stack & Config

- ⚛ **React 18 + TypeScript**
- ⚡ **Vite** (super fast dev server)
- 🎨 **Tailwind CSS** (utility-first)
- 🔍 **ESLint + Prettier** (for clean code)
- 🌐 Multi-language via Context + translation
- 📁 Type-safe structure via `src/types/`

---

## 🤝 Contributing

- Fork the repo, create a new branch (`feature/your-feature`), and open a PR
- Or open an Issue if you find bugs or want to discuss improvements.

---

## 📜 License

MIT © 2025 by [khanhtuannguyen]
