import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { lerSalvas, salvar, semente } from '../utils/armazenamento'

// "Setup store": é quase o useTasks de antes, dentro de defineStore
export const useTarefasStore = defineStore('tarefas', () => {
  // ----- state -----
  const tarefas = ref([])
  const carregando = ref(false)
  const erro = ref('')

  // ----- getters -----
  const total = computed(() => tarefas.value.length)
  const pendentes = computed(() => tarefas.value.filter((t) => !t.concluida))
  const concluidas = computed(() => tarefas.value.filter((t) => t.concluida))
  const totalPendentes = computed(() => pendentes.value.length)
  const totalConcluidas = computed(() => concluidas.value.length)

  // ----- actions -----
  async function carregar() {
    carregando.value = true
    erro.value = ''
    try {
      await new Promise((resolve) => setTimeout(resolve, 400)) // simula uma API
      tarefas.value = lerSalvas() ?? semente()
    } catch (e) {
      erro.value = e.message
    } finally {
      carregando.value = false
    }
  }

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

  // ----- persistência: salva sempre que a lista muda -----
  watch(tarefas, (lista) => salvar(lista), { deep: true })

  return {
    tarefas, carregando, erro,
    total, pendentes, concluidas, totalPendentes, totalConcluidas,
    carregar, adicionar, alternar
  }
})
