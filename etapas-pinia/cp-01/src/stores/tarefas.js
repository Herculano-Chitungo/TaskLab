import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// "Setup store": é quase o useTasks de antes, dentro de defineStore
export const useTarefasStore = defineStore('tarefas', () => {
  // ----- state -----
  const tarefas = ref([
    { id: 1, titulo: 'Estudar props e eventos', concluida: true },
    { id: 2, titulo: 'Montar a store do TaskLab', concluida: false }
  ])

  // ----- getters -----
  const total = computed(() => tarefas.value.length)
  const pendentes = computed(() => tarefas.value.filter((t) => !t.concluida))
  const concluidas = computed(() => tarefas.value.filter((t) => t.concluida))
  const totalPendentes = computed(() => pendentes.value.length)
  const totalConcluidas = computed(() => concluidas.value.length)
  
  // Exercício 2: Percentual concluído
  const percentualConcluido = computed(() => 
    total.value === 0 ? 0 : Math.round((totalConcluidas.value / total.value) * 100)
  )

  function adicionar(titulo) {
    const limpo = titulo.trim()
    if (!limpo) return
    const id = Math.max(0, ...tarefas.value.map((t) => t.id)) + 1
    tarefas.value.push({ id, titulo: limpo, concluida: false })
  }

  function alternar(id) {
    const tarefa = tarefas.value.find((t) => t.id === id)
    if (tarefa) tarefa.concluida = !tarefa.concluida
  }

  return {
    tarefas,
    total, 
    pendentes, 
    concluidas, 
    totalPendentes, 
    totalConcluidas, 
    percentualConcluido,
    adicionar, 
    alternar 
  }
})