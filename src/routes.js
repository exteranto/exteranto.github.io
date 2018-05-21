import Index from '@/components/Index'
import ApiCache from '@/components/api/Cache'
import FourOhFour from '@/components/FourOhFour'

export default [
  {
    path: '/',
    component: Index,
    name: 'home'
  },
  {
    path: '/api/cache',
    component: ApiCache,
    name: 'api-cache'
  },
  {
    path: '/*',
    component: FourOhFour
  }
]
