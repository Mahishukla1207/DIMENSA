import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import LabsPage from './pages/LabsPage'
import LabDetailPage from './pages/LabDetailPage'
import LabViewerPage from './pages/LabViewerPage'
import VRLabPage from './pages/VRLabPage'

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/labs/2d/:subjectId" element={<LabDetailPage />} />
          <Route path="/labs/vr/:labId" element={<VRLabPage />} />
        </Route>
        <Route path="/labs/2d/:subjectId/:experimentId" element={<LabViewerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
