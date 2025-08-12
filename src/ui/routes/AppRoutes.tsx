import { Route, Routes } from 'react-router-dom'
import Welcome from '@/ui/pages/Welcome.tsx'
import Settings from '@/ui/pages/Settings.tsx'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  )
}
