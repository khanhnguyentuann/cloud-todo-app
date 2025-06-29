# Cloud Native To-Do App

A modern, cloud-native to-do application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.  
This project demonstrates best practices for building scalable, maintainable, and user-friendly web applications with a focus on cloud-native principles.

## Features

- ✨ Beautiful UI with Tailwind CSS
- ⚡ Fast development with Vite
- ✅ Add, complete, and delete tasks
- 🔒 Simple authentication (login/register)
- ☁️ Ready for cloud deployment (Vercel, Netlify, Azure Static Web Apps, etc.)
- 🧩 Modular component structure

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/your-username/cloud-native-to-do-app.git
cd cloud-native-to-do-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  components/    # React components (TodoApp, UI elements)
  hooks/         # Custom React hooks
  lib/           # Utility functions
  pages/         # Page-level components (if any)
  services/      # API or backend service logic
  store/         # State management (if used)
  types/         # TypeScript types
  utils/         # Additional utilities
  index.css      # Tailwind CSS and global styles
  App.tsx        # Main app component
  main.tsx       # Entry point
```

## Cloud Native Principles

- **Stateless UI**: All state is managed client-side or via APIs.
- **Ready for CI/CD**: Easily deployable to any cloud static hosting.
- **Scalable**: Modular codebase for easy extension and maintenance.

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements.

## License

MIT

---

*Built with ❤️ using React, TypeScript, and Tailwind