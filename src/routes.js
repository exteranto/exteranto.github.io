import Index from '@/components/Index'
import Docs from '@/components/Docs'
import FourOhFour from '@/components/FourOhFour'

export default [
  {
    path: '/',
    component: Index,
    name: 'home'
  },
  {
    path: '/docs/:name*',
    component: Docs,
    name: 'docs'
  },
  {
    path: '/*',
    component: FourOhFour
  }
]
