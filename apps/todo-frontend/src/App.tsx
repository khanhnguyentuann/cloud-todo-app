import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import GlobalLayout from "@/layouts/GlobalLayout"
import MyDay from "@/pages/MyDay"
import Important from "@/pages/Important"
import Tasks from "@/pages/Tasks"
import Planned from "@/pages/Planned"
import NotFound from "@/pages/NotFound"

export default function App() {
  useEffect(() => {
    fetch("http://localhost:3000/api/hello")
      .then((response) => response.json())
      .then((data) => console.log("Backend Response:", data))
      .catch((error) => console.error("Error connecting to backend:", error))
  }, [])

  return (
    <Router basename="/cloud-todo-app">
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<Navigate to="/my-day" replace />} />
          <Route path="my-day" element={<MyDay />} />
          <Route path="important" element={<Important />} />
          <Route path="planned" element={<Planned />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        {/* 404 Not Found route - outside of GlobalLayout to avoid auth check */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
