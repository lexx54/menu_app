import Creator from './pages/Creator'
import Dashboard from './pages/Dashboard'
import Visualizer from './pages/Visualizer'

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