import { createRouter, createWebHistory } from 'vue-router'
import ListaView from '../views/ListaView.vue'
import ResumoView from '../views/ResumoView.vue'
import NaoEncontradaView from '../views/NaoEncontradaView.vue'

const routes = [
  { path: '/', name: 'lista', component: ListaView },
  { path: '/resumo', name: 'resumo', component: ResumoView },
  { path: '/:pathMatch(.*)*', name: 'nao-encontrada', component: NaoEncontradaView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
