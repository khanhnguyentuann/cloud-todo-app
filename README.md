# 📌 Cloud To-Do App

🚀 **Cloud To-Do App** is a personal task management application (to-do list) built with **React + TypeScript + Vite**, using **Tailwind CSS** for a modern UI, supporting multi-language (i18n) and component-based architecture for easy scalability.  
✅ **Currently integrated with AWS Lambda & DynamoDB (via API Gateway)** to perform CRUD operations on tasks.  

---

## ✨ Features

- ✅ Fetchs, Add tasks (now via AWS Lambda + DynamoDB)
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
git clone https://github.com/khanhnguyentuann/cloud-todo-app.git

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Then edit .env to include your API endpoint
# VITE_API_ENDPOINT=https://your-lambda-api.execute-api.ap-northeast-1.amazonaws.com/prod

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
├── hooks/                # Custom hooks (UseAuth, UseMobile)
├── plugins/              # axios setup & i18n
├── store/                # Global state (tasks, common)
├── types/                # Centralized TypeScript types
├── utils/                # Helpers (className, date localization)
└── assets/styles/        # Tailwind entry
```

---

## 🔧 Tech Stack & Config

- ⚛ **React 18 + TypeScript**
- ⚡ **Vite** (super fast dev server)
- 🎨 **Tailwind CSS** (utility-first)
- 🔍 **ESLint + Prettier** (for clean code)
- ☁️ **AWS Lambda + API Gateway + DynamoDB** (for serverless backend)
- 🌐 Multi-language via Context + translation
- 📁 Type-safe structure via \`src/types/\`

---

## 🤝 Contributing

- Fork the repo, create a new branch (\`feature/your-feature\`), and open a PR
- Or open an Issue if you find bugs or want to discuss improvements.

---

## 📜 License

MIT © 2025 by [khanhtuannguyen]