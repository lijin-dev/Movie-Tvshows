import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './Components/Home'
import Moviedetails from './Components/Moviedetails'
import Trailer from './Components/Trailer'
import Tvseries from './Components/Tvseries'
import Tvdetails from './Components/Tvdetails'
import Tvtrailer from './Components/Tvtrailer'
import Topimdb from './Components/Topimdb'
import Latest from './Components/Latest'
import Drama from './Components/Drama'
import Comedy from './Components/Comedy'
import Document from './Components/Document'
import Thriller from './Components/Thriller'
import Crime from './Components/Crime'
import Horror from './Components/Horror'
import Unitedstate from './Components/Unitedstates'
import Unitedkingdom from './Components/Unitedkingdom'
import Canada from './Components/Canada'
import France from './Components/France'
import Japan from './Components/Japan'
import Germany from './Components/Germany'

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
  },
  {
    path:'/drama',
    element:<Drama/>
  },
  {
    path:'/comedy',
    element:<Comedy/>
  },
  {
    path:"/documentary",
    element:<Document/>
  },
  {
    path:"/thriller",
    element:<Thriller/>
  },
  {
    path:"/crime",
    element:<Crime/>
  },
  {
    path:"/horror",
    element:<Horror/>
  },
  {
    path:"/unitedstate",
    element:<Unitedstate/>
  },
  {
    path:"/unitedkingdom",
    element:<Unitedkingdom/>
  },
  {
    path:"/canada",
    element:<Canada/>
  },
  {
    path:"/france",
    element:<France/>
  },
  {
    path:"/japan",
    element:<Japan/>
  },
  {
    path:"/germany",
    element:<Germany/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={root}/>
  </StrictMode>,
)
