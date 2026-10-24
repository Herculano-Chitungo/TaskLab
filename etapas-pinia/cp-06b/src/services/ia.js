// Camada de serviço da IA: só fala com o proxy local e valida o que volta.
import { sanitizar } from '../utils/sanitizar'
import { validarAcoes } from '../utils/acoes'

async function post(url, corpo, signal) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
    signal
  })
  if (!resp.ok) throw new Error('A IA não respondeu.')
  return resp.json()
}

export async function pedirPassos(tarefa, signal) {
  const dados = await post('/api/quebrar', { tarefa }, signal)
  return sanitizar(dados.passos)
}

// Envia só id, título e situação das tarefas (nada além disso) para a IA saber a que se refere.
export async function pedirAcoes(texto, tarefas, signal) {
  const resumo = tarefas
    .slice(0, 30)
    .map(({ id, titulo, concluida }) => ({ id, titulo, concluida }))
  const dados = await post('/api/agir', { texto, tarefas: resumo }, signal)
  return validarAcoes(dados.acoes, tarefas)
}
