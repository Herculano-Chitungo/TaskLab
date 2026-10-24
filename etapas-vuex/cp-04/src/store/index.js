import { createStore } from 'vuex'
import { lerSalvas, salvar, semente } from '../utils/armazenamento'

// Plugin: observa as mutations e salva a lista quando ela muda
const persistir = (store) => {
  const QUE_SALVAM = ['ADICIONAR', 'ALTERNAR']
  store.subscribe((mutacao, state) => {
    if (QUE_SALVAM.includes(mutacao.type)) salvar(state.tarefas)
  })
}

export default createStore({
  strict: import.meta.env.DEV, // mutar o state fora de uma mutation dá erro no console

  state: () => ({
    tarefas: [],
    carregando: false,
    erro: ''
  }),

  getters: {
    total: (state) => state.tarefas.length,
    pendentes: (state) => state.tarefas.filter((t) => !t.concluida),
    concluidas: (state) => state.tarefas.filter((t) => t.concluida),
    totalPendentes: (_state, getters) => getters.pendentes.length,
    totalConcluidas: (_state, getters) => getters.concluidas.length
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
    DEFINIR_CARREGANDO(state, valor) {
      state.carregando = valor
    },
    DEFINIR_ERRO(state, mensagem) {
      state.erro = mensagem
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
    }
  },

  plugins: [persistir]
})
