import { createStore } from 'vuex'
import { lerSalvas, salvar, semente } from '../utils/armazenamento'
import { pedirPassos } from '../services/ia'

let controlador = null // a chamada de IA mais recente

// Plugin: observa as mutations e salva a lista quando ela muda
const persistir = (store) => {
  const QUE_SALVAM = ['ADICIONAR', 'ALTERNAR', 'EDITAR', 'REMOVER']
  store.subscribe((mutacao, state) => {
    if (QUE_SALVAM.includes(mutacao.type)) salvar(state.tarefas)
  })
}

export default createStore({
  strict: import.meta.env.DEV, // mutar o state fora de uma mutation dá erro no console

  state: () => ({
    tarefas: [],
    carregando: false,
    erro: '',
    sugestoes: [],
    iaCarregando: false,
    iaErro: ''
  }),

  getters: {
    total: (state) => state.tarefas.length,
    pendentes: (state) => state.tarefas.filter((t) => !t.concluida),
    concluidas: (state) => state.tarefas.filter((t) => t.concluida),
    totalPendentes: (_state, getters) => getters.pendentes.length,
    totalConcluidas: (_state, getters) => getters.concluidas.length,
    porId: (state) => (id) => state.tarefas.find((t) => t.id === id)
  },

  mutations: {
    DEFINIR_TAREFAS(state, tarefas) {
      state.tarefas = tarefas
    },
    ADICIONAR(state, titulo) {
      const id = Math.max(0, ...state.tarefas.map((t) => t.id)) + 1
      state.tarefas.push({ id, titulo, concluida: false })
    },
    ALTERNAR(state, id) {
      const tarefa = state.tarefas.find((t) => t.id === id)
      if (tarefa) tarefa.concluida = !tarefa.concluida
    },
    EDITAR(state, { id, titulo }) {
      const tarefa = state.tarefas.find((t) => t.id === id)
      if (tarefa) tarefa.titulo = titulo
    },
    REMOVER(state, id) {
      state.tarefas = state.tarefas.filter((t) => t.id !== id)
    },
    DEFINIR_CARREGANDO(state, valor) {
      state.carregando = valor
    },
    DEFINIR_ERRO(state, mensagem) {
      state.erro = mensagem
    },
    DEFINIR_SUGESTOES(state, lista) {
      state.sugestoes = lista
    },
    DEFINIR_IA_CARREGANDO(state, valor) {
      state.iaCarregando = valor
    },
    DEFINIR_IA_ERRO(state, mensagem) {
      state.iaErro = mensagem
    }
  },

  actions: {
    async carregar({ commit }) {
      commit('DEFINIR_CARREGANDO', true)
      commit('DEFINIR_ERRO', '')
      try {
        await new Promise((resolve) => setTimeout(resolve, 400)) // simula uma API
        commit('DEFINIR_TAREFAS', lerSalvas() ?? semente())
      } catch (e) {
        commit('DEFINIR_ERRO', e.message)
      } finally {
        commit('DEFINIR_CARREGANDO', false)
      }
    },

    adicionar({ commit }, titulo) {
      const limpo = titulo.trim()
      if (limpo) commit('ADICIONAR', limpo)
    },

    alternar({ commit }, id) {
      commit('ALTERNAR', id)
    },

    editar({ commit }, { id, titulo }) {
      const limpo = titulo.trim()
      if (limpo) commit('EDITAR', { id, titulo: limpo })
    },

    remover({ commit }, id) {
      commit('REMOVER', id)
    },

    // ----- IA como action: estado de carregando e erro vivem na store -----
    async sugerirPassos({ commit }, titulo) {
      controlador?.abort() // só a última chamada vale
      const meu = new AbortController()
      controlador = meu
      commit('DEFINIR_IA_CARREGANDO', true)
      commit('DEFINIR_IA_ERRO', '')
      commit('DEFINIR_SUGESTOES', [])
      try {
        const passos = await pedirPassos(titulo, meu.signal) // já vem validado
        commit('DEFINIR_SUGESTOES', passos)
        if (passos.length === 0) commit('DEFINIR_IA_ERRO', 'Nenhuma sugestão válida.')
      } catch (e) {
        if (e.name !== 'AbortError') commit('DEFINIR_IA_ERRO', 'Não foi possível sugerir passos agora.')
      } finally {
        if (controlador === meu) commit('DEFINIR_IA_CARREGANDO', false)
      }
    },

    limparSugestoes({ commit }) {
      controlador?.abort()
      controlador = null
      commit('DEFINIR_SUGESTOES', [])
      commit('DEFINIR_IA_ERRO', '')
      commit('DEFINIR_IA_CARREGANDO', false)
    },

    aceitarSugestao({ state, commit, dispatch }, passo) {
      dispatch('adicionar', passo) // a IA propõe; a action de sempre adiciona
      commit('DEFINIR_SUGESTOES', state.sugestoes.filter((p) => p !== passo))
    }
  },

  plugins: [persistir]
})
