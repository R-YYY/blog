import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from "@/views/Homepage";
import Person from "@/views/Person";
import Follow from "@/views/Follow";
import Login from "@/views/Login";
import OtherInfo from "@/views/OtherInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'',
    redirect: {name: 'login'}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: Homepage,
  },
  {
    path: '/follow',
    name:'follow',
    component: Follow
  },
  {
    path:'/person',
    name:'person',
    component: Person
  },
  {
    path:'/other/:id',
    name:'other',
    component: OtherInfo
  }
]

const router = new VueRouter({
  routes
})

export default router
