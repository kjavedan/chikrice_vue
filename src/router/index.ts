import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

// Layouts
import { AuthLayout, MainLayout } from '@/layout'

// Views
const HomeView = () => import('@/views/Home/HomeView.vue')
const LoginView = () => import('@/views/Login/LoginView.vue')
const BmrCalcularotView = () => import('@/views/BmrCalculator/BmrCalculatorView.vue')
const MealPlanResultsView = () => import('@/views/MealPlanResults/MealPlanResultsView.vue')
const MealPlanGeneratorView = () => import('@/views/MealPlanGenerator/MealPlanGeneratorView.vue')
const WorkoutPlanGeneratorView = () =>
  import('@/views/WorkoutPlanGenerator/WorkoutPlanGeneratorView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
      onlyGuestAllowed: false
    }
  },
  {
    path: '/bmr-calculator',
    name: 'bmrCalculator',
    component: BmrCalcularotView,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
      onlyGuestAllowed: false
    }
  },
  {
    path: '/meal-plan-results',
    name: 'mealPlanResults',
    component: MealPlanResultsView,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
      onlyGuestAllowed: false
    }
  },
  {
    path: '/meal-plan-generator',
    name: 'mealPlanGenerator',
    component: MealPlanGeneratorView,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
      onlyGuestAllowed: false
    }
  },
  {
    path: '/workout-plan-generator',
    name: 'workoutPlanGenerator',
    component: WorkoutPlanGeneratorView,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
      onlyGuestAllowed: false
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: WorkoutPlanGeneratorView,
    meta: {
      layout: MainLayout,
      requiresAuth: false,
      onlyGuestAllowed: false
    }
  },

  {
    path: '/login',
    component: LoginView,
    meta: {
      layout: AuthLayout,
      requiresAuth: false,
      onlyGuestAllowed: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const isAuthenticated = false

// @ts-expect-error from is unused
router.beforeEach((to, from, next) => {
  const { requiresAuth, onlyGuestAllowed } = to.meta

  if (!isAuthenticated && requiresAuth) next('/login')
  else if (isAuthenticated && onlyGuestAllowed) next('/guide')
  else next()
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
