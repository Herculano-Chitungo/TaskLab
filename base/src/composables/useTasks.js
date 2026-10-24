// PONTO DE PARTIDA. Este é o useTasks do Sábado 2. No bloco 1 o estado das tarefas sai daqui e vai
// para uma store; a partir da etapa cp-01 este arquivo deixa de existir. Guarde esta versão para
// comparar. Repare que o estado nasce DENTRO da função: cada chamada cria uma lista nova, e esse é
// o problema que a store resolve.

import { ref, computed } from 'vue'

export function useTasks() {
  const tarefas = ref([
    { id: 1, titulo: 'Estudar props e eventos', concluida: true },
    { id: 2, titulo: 'Montar a store do TaskLab', concluida: false }
  ])
  const pendentes = computed(() => tarefas.value.filter((t) => !t.concluida))

  function adicionar(titulo) {
    const limpo = titulo.trim()
    if (!limpo) return
    const id = Math.max(0, ...tarefas.value.map((t) => t.id)) + 1
    tarefas.value.push({ id, titulo: limpo, concluida: false })
  }

  function alternar(id) {
    const t = tarefas.value.find((t) => t.id === id)
    if (t) t.concluida = !t.concluida
  }

  return { tarefas, pendentes, adicionar, alternar }
}
