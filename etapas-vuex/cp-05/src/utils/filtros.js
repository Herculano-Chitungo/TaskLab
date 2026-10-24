export const FILTROS = ['todas', 'pendentes', 'concluidas']
export const ROTULOS = { todas: 'Todas', pendentes: 'Pendentes', concluidas: 'Concluídas' }

// Qualquer valor fora da lista vira 'todas': a URL e a IA são entradas externas.
export function filtroValido(valor) {
  return FILTROS.includes(valor) ? valor : 'todas'
}

export function aplicarFiltro(tarefas, busca, filtro) {
  const termo = busca.trim().toLowerCase()
  return tarefas.filter((t) => {
    if (filtro === 'pendentes' && t.concluida) return false
    if (filtro === 'concluidas' && !t.concluida) return false
    return !termo || t.titulo.toLowerCase().includes(termo)
  })
}
