import { createStore } from 'vuex'

export default createStore({
  strict: import.meta.env.DEV, // mutar o state fora de uma mutation dá erro no console

  state: () => ({
    tarefas: [
      { id: 1, titulo: 'Estudar props e eventos', concluida: true },
      { id: 2, titulo: 'Montar a store do TaskLab', concluida: false }
    ]
  }),

  getters: {
    total: (state) => state.tarefas.length,
    pendentes: (state) => state.tarefas.filter((t) => !t.concluida),
    concluidas: (state) => state.tarefas.filter((t) => t.concluida),
    totalPendentes: (_state, getters) => getters.pendentes.length,
    totalConcluidas: (_state, getters) => getters.concluidas.length
  },

  mutations: {
    ADICIONAR(state, titulo) {
      const id = Math.max(0, ...state.tarefas.map((t) => t.id)) + 1
      state.tarefas.push({ id, titulo, concluida: false })
    },
    ALTERNAR(state, id) {
      const tarefa = state.tarefas.find((t) => t.id === id)
      if (tarefa) tarefa.concluida = !tarefa.concluida
    }
  },

  actions: {
    adicionar({ commit }, titulo) {
      const limpo = titulo.trim()
      if (limpo) commit('ADICIONAR', limpo)
    },

    alternar({ commit }, id) {
      commit('ALTERNAR', id)
    }
  }
})
