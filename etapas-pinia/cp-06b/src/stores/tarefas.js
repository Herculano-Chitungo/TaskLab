import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { lerSalvas, salvar, semente } from '../utils/armazenamento'
import { pedirPassos } from '../services/ia'

// "Setup store": é quase o useTasks de antes, dentro de defineStore
export const useTarefasStore = defineStore('tarefas', () => {
  // ----- state -----
  const tarefas = ref([])
  const carregando = ref(false)
  const erro = ref('')
  const sugestoes = ref([])
  const iaCarregando = ref(false)
  const iaErro = ref('')
  let controlador = null // a chamada de IA mais recente

  // ----- getters -----
  const total = computed(() => tarefas.value.length)
  const pendentes = computed(() => tarefas.value.filter((t) => !t.concluida))
  const concluidas = computed(() => tarefas.value.filter((t) => t.concluida))
  const totalPendentes = computed(() => pendentes.value.length)
  const totalConcluidas = computed(() => concluidas.value.length)
  
  // Exercício 2: Percentual concluído[cite: 7, 8]
  const percentualConcluido = computed(() => 
    total.value === 0 ? 0 : Math.round((totalConcluidas.value / total.value) * 100)
  )

  const porId = (id) => tarefas.value.find((t) => t.id === id)

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
    const tarefa = porId(id)
    if (tarefa) tarefa.concluida = !tarefa.concluida
  }

  function editar({ id, titulo }) {
    const limpo = titulo.trim()
    const tarefa = porId(id)
    if (tarefa && limpo) tarefa.titulo = limpo
  }

  function remover(id) {
    tarefas.value = tarefas.value.filter((t) => t.id !== id)
  }

  // Exercício 3: Limpar todas as tarefas concluídas[cite: 7, 8]
  function limparConcluidas() {
    tarefas.value = tarefas.value.filter((t) => !t.concluida)
  }

  // ----- IA como action: estado de carregando e erro vivem na store -----
  async function sugerirPassos(titulo) {
    controlador?.abort() // só a última chamada vale
    const meu = new AbortController()
    controlador = meu
    iaCarregando.value = true
    iaErro.value = ''
    sugestoes.value = []
    try {
      const passos = await pedirPassos(titulo, meu.signal) // já vem validado
      sugestoes.value = passos
      if (passos.length === 0) iaErro.value = 'Nenhuma sugestão válida.'
    } catch (e) {
      if (e.name !== 'AbortError') iaErro.value = 'Não foi possível sugerir passos agora.'
    } finally {
      if (controlador === meu) iaCarregando.value = false
    }
  }

  function limparSugestoes() {
    controlador?.abort()
    controlador = null
    sugestoes.value = []
    iaErro.value = ''
    iaCarregando.value = false
  }

  function aceitarSugestao(passo) {
    adicionar(passo) // a IA propõe; a action de sempre adiciona
    sugestoes.value = sugestoes.value.filter((p) => p !== passo)
  }

  // Exercício 6: Adicionar todas as sugestões de uma vez[cite: 7, 9]
  function aceitarTodas() {
    const lista = [...sugestoes.value]
    lista.forEach((passo) => adicionar(passo))
    sugestoes.value = []
  }

  // ----- persistência: salva sempre que a lista muda -----
  watch(tarefas, (lista) => salvar(lista), { deep: true })

  return {
    tarefas, carregando, erro, sugestoes, iaCarregando, iaErro,
    total, pendentes, concluidas, totalPendentes, totalConcluidas, percentualConcluido, porId,
    carregar, adicionar, alternar, editar, remover, limparConcluidas,
    sugerirPassos, limparSugestoes, aceitarSugestao, aceitarTodas
  }
})