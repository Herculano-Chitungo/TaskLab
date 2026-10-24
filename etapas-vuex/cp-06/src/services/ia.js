// Camada de serviço da IA: só fala com o proxy local e valida o que volta.
import { sanitizar } from '../utils/sanitizar'
import { validarFiltroIA } from '../utils/filtros'

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

export async function pedirFiltro(texto, signal) {
  const dados = await post('/api/filtrar', { texto }, signal)
  return validarFiltroIA(dados)
}
