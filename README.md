# 📌 Cloud To-Do App

🚀 **Cloud To-Do App** is a personal task management application (to-do list) built with **React + TypeScript + Vite**, using **Tailwind CSS** for modern UI, supporting multi-language (i18n) and component-based architecture for easy scalability.

✅ **Currently integrated with AWS Lambda & DynamoDB (via API Gateway)** to perform CRUD operations on tasks.  
🌐 **Deployed on GitHub Pages** with fully configured client-side routing.

---

## 🌟 Demo

🔗 **Live Demo**: [https://khanhnguyentuann.github.io/cloud-todo-app/](https://khanhnguyentuann.github.io/cloud-todo-app/)

---

## ✨ Features

- ✅ Fetch and add tasks (via AWS Lambda + DynamoDB)
- ✅ Assign due dates & reminders
- ✅ Sort & filter tasks
- ✅ Sidebar to display task details
- ✅ Multi-language support (English, Japanese, Vietnamese)
- ✅ Responsive UI for desktop & mobile
- ✅ Dark/Light mode toggle
- ✅ Custom 404 page with animations
- ✅ Client-side routing works on GitHub Pages
- ✅ Clean component architecture for maintainability

---

## 🚀 Getting Started

### Development

```bash
# Clone the project
git clone https://github.com/khanhnguyentuann/cloud-todo-app.git
cd cloud-todo-app

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Then edit .env to include your API endpoint
# VITE_API_ENDPOINT=https://your-lambda-api.execute-api.ap-northeast-1.amazonaws.com/prod

# Start development server
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

### Deploy to GitHub Pages

```bash
# Build and deploy
npm run build

# Push dist folder to gh-pages branch (or use GitHub Actions)
```

**Note**: Project is pre-configured for GitHub Pages with:
- Base path: `/cloud-todo-app/`
- Client-side routing support
- Custom 404 page handling

---

## 🗂 Project Structure

```
src/
├── App.tsx                    # Main app component with routing
├── main.tsx                   # Entry point
├── components/
│   ├── common/               # Shared components (Button, Input, etc.)
│   └── features/             # Feature-specific components
├── pages/                    # Page components (MyDay, Tasks, NotFound, etc.)
├── layouts/                  # Layout components
├── hooks/                    # Custom hooks (useAuth, useMobile, etc.)
├── lib/                      # Libraries (axios, i18n)
├── store/                    # Global state management
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
└── assets/                   # Static assets

public/
├── 404.html                  # GitHub Pages SPA routing support
├── _redirects                # Netlify redirects (fallback)
└── favicon.ico

config files:
├── vite.config.ts            # Vite configuration with base path
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── eslint.config.js          # ESLint configuration
```

---

## 🔧 Tech Stack

### Frontend
- ⚛️ **React 18** with **TypeScript**
- ⚡ **Vite** (dev server & build tool)
- 🎨 **Tailwind CSS** (utility-first CSS)
- 🎭 **Framer Motion** (animations)
- 🌐 **React Router** (client-side routing)
- 🔍 **React i18next** (internationalization)

### Backend
- ☁️ **AWS Lambda** (serverless functions)
- 🗄️ **DynamoDB** (NoSQL database)
- 🌐 **API Gateway** (REST API)

### Development Tools
- 🔍 **ESLint** + **TypeScript ESLint** (code linting)
- 🎯 **Vite TypeScript paths** (import aliases)
- 📱 **Responsive design** (mobile-first)

### Deployment
- 🚀 **GitHub Pages** (static hosting)
- 🔄 **GitHub Actions** (CI/CD - optional)

---

## 🌐 Routing & GitHub Pages

Project is specially configured to work on GitHub Pages:

### Client-side Routing Support
- **404.html**: Handles redirect for GitHub Pages SPA routing
- **index.html**: Contains script to process URLs from GitHub Pages redirect
- **basename**: `/cloud-todo-app/` in React Router
- **base**: `/cloud-todo-app/` in Vite config

### Available Routes
- `/` → redirects to `/my-day`
- `/my-day` → My Day page
- `/important` → Important tasks
- `/planned` → Planned tasks  
- `/tasks` → All tasks
- `/*` → Custom 404 page (NotFound component)

---

## 🎨 Detailed Features

### Multi-language Support
- **English** (en)
- **Japanese** (ja) 
- **Vietnamese** (vi)
- Dynamic language switching
- Persistent language preference

### Task Management
- Create, read, update, delete tasks
- Due date assignment
- Priority levels (important)
- Task categories (My Day, Planned, etc.)
- Search and filter functionality

### UI/UX
- Dark/Light theme toggle
- Responsive design (mobile-first)
- Smooth animations with Framer Motion
- Loading states and error handling
- Toast notifications

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow ESLint rules
- Write reusable components
- Add proper error handling
- Test on both desktop and mobile

---

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
```

---

## 🐛 Known Issues & Solutions

### GitHub Pages Routing
- ✅ **Fixed**: Client-side routing works correctly with 404.html redirect
- ✅ **Fixed**: Custom 404 page displays instead of GitHub default 404

### Mobile Responsiveness  
- ✅ **Implemented**: Responsive design for all screen sizes
- ✅ **Implemented**: Touch-friendly UI elements

---

## 📜 License

MIT © 2025 by [khanhnguyentuann](https://github.com/khanhnguyentuann)

---

## 📞 Contact

- **GitHub**: [@khanhnguyentuann](https://github.com/khanhnguyentuann)
- **Email**: [your-email@example.com]

---

⭐ **If this project is helpful, please give it a star!** ⭐
