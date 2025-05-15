import { Navigate, Route, Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'

const App = () => {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path="/"
        // replace={true} để loại bỏ route "/" ra khỏi history của browser
        element={
          <Navigate to="/boards/67b97c200139f4216924fe00" replace={true} />
        }
      />

      {/* Board Details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* 404 Not Found Page */}
      {/* Route "*" là khi người dùng nhập trên URL không match với bất kì Route nào ta đã khai báo */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
