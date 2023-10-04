import Visualizer from './pages/Visualizer'
import Dashboard from './pages/Dashboard'
import Creator from './pages/Creator'

const routes: any[] = [
  {
    path: '/',
    element: Dashboard,
  },
  {
    path: '/creation',
    element: Creator,
  },
  {
    path: '/visualizer',
    element: Visualizer,
  }
]

export default routes