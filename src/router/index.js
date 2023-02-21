import { createRouter, createWebHashHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import AddTask from '../views/AddTask.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/add-task',
    name: 'add-task',
    component: AddTask
  },
  {
    path: '/update-task/:id',
    name: 'update-task',
    component: AddTask
  },
  {
    path: '/duplicate-task/:id',
    name: 'duplicate-task',
    component: AddTask
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
