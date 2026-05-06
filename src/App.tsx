import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './engine/GameContext'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AdminRoute } from './components/layout/AdminRoute'
import { Login } from './pages/Login'
import { AuthCallback } from './pages/AuthCallback'
import { GameRoot } from './pages/GameRoot'
import { Admin } from './pages/Admin'
import { Verify } from './pages/Verify'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GameProvider>
                <GameRoot />
              </GameProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
