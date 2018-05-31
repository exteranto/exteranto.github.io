import Index from '@/components/Index'
import Docs from '@/components/Docs'
import FourOhFour from '@/components/FourOhFour'

import Configuration from '@/components/concepts/Configuration'
import EventsListeners from '@/components/concepts/EventsListeners'
import ServiceProviders from '@/components/concepts/ServiceProviders'
import Aspects from '@/components/concepts/Aspects'
import PackingManifests from '@/components/concepts/PackingManifests'

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
    path: '/concepts/configuration',
    component: Configuration,
    name: 'concepts-configuration'
  },
  {
    path: '/concepts/events-listeners',
    component: EventsListeners,
    name: 'concepts-events-listeners'
  },
  {
    path: '/concepts/service-providers',
    component: ServiceProviders,
    name: 'concepts-service-providers'
  },
  {
    path: '/concepts/aspects',
    component: Aspects,
    name: 'concepts-aspects'
  },
  {
    path: '/concepts/packing-manifests',
    component: PackingManifests,
    name: 'concepts-packing-manifests'
  },
  {
    path: '/*',
    component: FourOhFour
  }
]
