<script setup>
import { onUnmounted, ref } from 'vue'
import { useFiltrosUrl } from '../composables/useFiltrosUrl'
import { pedirFiltro } from '../services/ia'

const { aplicar } = useFiltrosUrl()
const texto = ref('')
const carregando = ref(false)
const erro = ref('')
let controlador = null

async function interpretar() {
  if (!texto.value) {
    erro.value = 'Escreva o que você quer ver.'
    return
  }
  controlador?.abort() // só o último pedido vale
  const meu = new AbortController()
  controlador = meu
  carregando.value = true
  erro.value = ''
  try {
    const { busca, filtro } = await pedirFiltro(texto.value, meu.signal)
    // A IA só preenche a URL; quem filtra continua sendo a lista.
    aplicar({ busca, filtro }, { empurrar: true })
  } catch (e) {
    if (e.name !== 'AbortError') erro.value = 'Não consegui interpretar o pedido.'
  } finally {
    if (controlador === meu) carregando.value = false
  }
}

onUnmounted(() => controlador?.abort())
</script>

<template>
  <form @submit.prevent="interpretar" novalidate>
    <label for="pedido-ia">Pedir em português</label>
    <input id="pedido-ia" v-model.trim="texto" placeholder="Ex.: só as pendentes sobre router" />
    <button type="submit">Filtrar com IA</button>
  </form>
  <p v-if="carregando" role="status">Interpretando…</p>
  <p v-else-if="erro" role="alert">{{ erro }}</p>
</template>
