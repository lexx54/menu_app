import Visualizer from './pages/Visualizer'
import Dashboard from './pages/Dashboard'
import Creator from './pages/Creator'

const routes: any[] = [
  {
    path: '/',
    element: Creator,
  },
  {
    path: '/creation',
    element: Dashboard,
  },
  {
    path: '/visualizer',
    element: Visualizer,
  }
]

export default routes