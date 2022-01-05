import { createRouter, createWebHistory } from 'vue-router'
/**
 * import * from '*'  这种模式 打包会把组件打包到一个文件中 
 */
// import Home from '@/view/home.vue'
import About from '@/view/about.vue'

const routes = [
  { path: '/', component: ()=>import (/* webpackChunkName: "Home" */ '@/view/home.vue' )},
  { path: '/about', component: About },
]

// 暂时保持简单
export const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router