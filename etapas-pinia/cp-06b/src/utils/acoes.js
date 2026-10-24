import { ROTULOS, validarFiltroIA } from './filtros'

// A lista PERMITIDA de ações que a IA pode pedir. Tudo que não está aqui é descartado,
// e cada ação é reconstruída campo a campo: nada que a IA inventar passa adiante.
export function validarAcoes(lista, tarefas, maximo = 3) {
  if (!Array.isArray(lista)) return []
  const ids = new Set(tarefas.map((t) => t.id))
  const saida = []
  for (const item of lista) {
    if (saida.length === maximo) break
    if (!item || typeof item !== 'object') continue

    if (item.acao === 'adicionar') {
      const titulo = typeof item.titulo === 'string' ? item.titulo.trim().slice(0, 80) : ''
      if (titulo) saida.push({ acao: 'adicionar', titulo })
    } else if (item.acao === 'alternar') {
      if (Number.isInteger(item.id) && ids.has(item.id)) saida.push({ acao: 'alternar', id: item.id })
    } else if (item.acao === 'editar') {
      const titulo = typeof item.titulo === 'string' ? item.titulo.trim().slice(0, 80) : ''
      if (Number.isInteger(item.id) && ids.has(item.id) && titulo) {
        saida.push({ acao: 'editar', id: item.id, titulo })
      }
    } else if (item.acao === 'filtrar') {
      saida.push({ acao: 'filtrar', ...validarFiltroIA(item) })
    }
    // Qualquer outra ação (como "remover") é ignorada de propósito.
  }
  return saida
}

// Texto que a pessoa lê antes de aprovar: nada acontece sem esse "ok".
export function descrever(acao, tarefas) {
  if (acao.acao === 'adicionar') return `Adicionar a tarefa "${acao.titulo}"`
  if (acao.acao === 'alternar') {
    const tarefa = tarefas.find((t) => t.id === acao.id)
    const hoje = tarefa?.concluida ? 'concluída' : 'pendente'
    return `Alternar a situação de "${tarefa?.titulo ?? ''}" (hoje: ${hoje})`
  }
  if (acao.acao === 'editar') {
    const tarefa = tarefas.find((t) => t.id === acao.id)
    return `Renomear "${tarefa?.titulo ?? ''}" para "${acao.titulo}"`
  }
  const quem = ROTULOS[acao.filtro].toLowerCase()
  return acao.busca ? `Mostrar ${quem} com "${acao.busca}"` : `Mostrar ${quem}`
}