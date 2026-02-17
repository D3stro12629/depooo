import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import ArticleView from '@/views/ArticleView.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import EditArticle from '@/views/EditArticle.vue'
import DetailArticle from '@/views/DetailArticle.vue'
import Profile from '@/views/Profile.vue'
import CategoryView from '@/views/CategoryView.vue'
import Category from '@/views/category.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta : {require : true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
      meta : {require : true}
    },
    {
      path: '/article/create',
      name: 'createArticle',
      component: CreateArticle,
      meta : {require : true}
    },
    {
      path: '/article/edit/:id',
      name: 'editArticle',
      component: EditArticle,
      meta : {require : true}
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: DetailArticle,
      meta : {require : true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta : {require : true}
    },
    // {
    //   path: '/category',
    //   name: 'category',
    //   component: CategoryView,
    //   meta : {require : true}
    // },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta : {require : true}
    },
  ],
})

router.beforeEach((to, from) => {
  let auth = useAuthStore();

  if(!auth.isLoggedIn && to.meta.require){
    return {name : 'login'}
  }

  return true;
})

export default router
