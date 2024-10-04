import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/Auth'
import AppRoutes from './routes/Routes'

function App() {

  return (
    <>
      <AuthProvider>
        {/* <BrowserRouter>
        <AppRoutes/>
        </BrowserRouter> */}
        <RouterProvider router={AppRoutes}/>
      </AuthProvider>
    </>
  )
}

export default App
