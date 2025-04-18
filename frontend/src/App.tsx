import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App