import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    // 建立巢狀路由
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // 為啟用連結加上 active 效果（Bootstrap 樣式）
})

export default router
