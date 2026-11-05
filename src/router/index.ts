import { createRouter, createWebHistory } from 'vue-router'
import { BRAND } from '@/config/funnel'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description?: string
  }
}

const DEFAULT_DESCRIPTION =
  'Custodia marítima, terrestre y vigilancia empresarial con protocolo propio. Contratos desde 6 meses para embarcaciones, transporte de carga, hoteles y empresas en Ecuador.'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'funnel',
      component: () => import('@/views/FunnelView.vue'),
      meta: { title: `${BRAND.name} | Seguridad con protocolo, no guardias de decoración` },
    },
    {
      path: '/ver-video',
      name: 'video',
      component: () => import('@/views/VideoView.vue'),
      meta: { title: `Mira el video | ${BRAND.name}` },
    },
    {
      path: '/agendar',
      name: 'booking',
      component: () => import('@/views/BookingView.vue'),
      meta: { title: `Agenda tu reunión comercial | ${BRAND.name}` },
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: () => import('@/views/BookedView.vue'),
      meta: { title: `Reunión confirmada | ${BRAND.name}` },
    },
    {
      path: '/sin-espacio',
      name: 'no-fit',
      component: () => import('@/views/NoFitView.vue'),
      meta: { title: `Gracias por tu interés | ${BRAND.name}` },
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue'),
      meta: { title: `Política de privacidad | ${BRAND.name}` },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach((to, from) => {
  // La primera carga ya la cuenta el snippet de index.html
  if (from.matched.length) window.fbq?.('track', 'PageView')
  document.title = to.meta.title ?? BRAND.name
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', to.meta.description ?? DEFAULT_DESCRIPTION)
})

export default router
