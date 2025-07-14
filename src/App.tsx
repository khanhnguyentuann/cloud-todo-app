import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import GlobalLayout from "@/layouts/GlobalLayout"
import MyDay from "@/pages/MyDay"
import Important from "@/pages/Important"
import Tasks from "@/pages/Tasks"
import Planned from "./pages/Planned"

export default function App() {
  return (
    <Router basename="/cloud-todo-app">
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<Navigate to="/my-day" replace />} />
          <Route path="my-day" element={<MyDay />} />
          <Route path="important" element={<Important />} />
          <Route path="planned" element={<Planned />} />
          <Route path="tasks" element={<Tasks />} />
          {/* Catch-all route for 404 - redirect to my-day */}
          <Route path="*" element={<Navigate to="/my-day" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}
