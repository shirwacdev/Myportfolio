import HomePage from './pages/HomePage'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminApp from './admin/AdminApp'
import LoginPage from './pages/LoginPage'
import RequireAdminAuth from './admin/components/RequireAdminAuth'

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <RequireAdminAuth>
              <AdminApp />
            </RequireAdminAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
