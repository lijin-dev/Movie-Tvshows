import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import Moviedetails from './Components/Moviedetails'
import Trailer from './Components/Trailer'
import Tvseries from './Components/Tvseries'
import Tvdetails from './Components/Tvdetails'
import Tvtrailer from './Components/Tvtrailer'
import Topimdb from './Components/Topimdb'
import Latest from './Components/Latest'

const root = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path:'/moviedetails/:id',
    element:<Moviedetails/>
  },
  {
    path:'/movietrailer/:idmt',
    element:<Trailer/>
  },
  {
    path:'/tvseries',
    element:<Tvseries/>
  },
  {
    path:"/tvdetails/:idmo",
    element:<Tvdetails/>
  },
  {
    path:'/tvvideo/:ido',
    element:<Tvtrailer/>
  },
  {
    path:'/topimdb',
    element:<Topimdb/>
  },
  {
    path:'/latest',
    element:<Latest/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={root}/>
  </StrictMode>,
)
