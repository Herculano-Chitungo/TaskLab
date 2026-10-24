import { createRouter, createWebHistory } from 'vue-router'
import ListaView from '../views/ListaView.vue'
import ResumoView from '../views/ResumoView.vue'
import TarefaView from '../views/TarefaView.vue'
import NaoEncontradaView from '../views/NaoEncontradaView.vue'

const routes = [
  { path: '/', name: 'lista', component: ListaView },
  { path: '/resumo', name: 'resumo', component: ResumoView },
  { path: '/tarefa/:id', name: 'tarefa', component: TarefaView },
  { path: '/:pathMatch(.*)*', name: 'nao-encontrada', component: NaoEncontradaView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})