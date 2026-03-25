import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import SkillsPage from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'
import TestimonialsPage from './pages/TestimonialsPage'
import MessagesPage from './pages/MessagesPage'
import SettingsPage from './pages/SettingsPage'

const AdminApp = () => (
  <Routes>
    <Route index element={<DashboardPage />} />
    <Route path="projects" element={<ProjectsPage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="skills" element={<SkillsPage />} />
    <Route path="experience" element={<ExperiencePage />} />
    <Route path="testimonials" element={<TestimonialsPage />} />
    <Route path="messages" element={<MessagesPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
)

export default AdminApp
