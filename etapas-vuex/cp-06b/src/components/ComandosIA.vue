<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useFiltrosUrl } from '../composables/useFiltrosUrl'
import { pedirAcoes } from '../services/ia'
import { descrever } from '../utils/acoes'

const store = useStore()
const { aplicar } = useFiltrosUrl()
const tarefas = computed(() => store.state.tarefas)

const texto = ref('')
const plano = ref([]) // as ações propostas pela IA, já validadas
const carregando = ref(false)
const erro = ref('')
let controlador = null

// Cada ação permitida aponta para o MESMO caminho que a pessoa usaria na tela.
const EXECUTORES = {
  adicionar: (a) => store.dispatch('adicionar', a.titulo),
  alternar: (a) => store.dispatch('alternar', a.id),
  filtrar: (a) => aplicar({ busca: a.busca, filtro: a.filtro }, { empurrar: true })
}

async function pedir() {
  if (!texto.value) {
    erro.value = 'Escreva o que você quer fazer.'
    return
  }
  controlador?.abort() // só o último pedido vale
  const meu = new AbortController()
  controlador = meu
  carregando.value = true
  erro.value = ''
  plano.value = []
  try {
    plano.value = await pedirAcoes(texto.value, tarefas.value, meu.signal)
    if (plano.value.length === 0) erro.value = 'Não encontrei nada que eu possa fazer com esse pedido.'
  } catch (e) {
    if (e.name !== 'AbortError') erro.value = 'Não consegui interpretar o pedido.'
  } finally {
    if (controlador === meu) carregando.value = false
  }
}

function executar(acao) {
  EXECUTORES[acao.acao](acao)
  plano.value = plano.value.filter((a) => a !== acao)
}

function executarTudo() {
  const lista = [...plano.value]
  lista.forEach((acao) => EXECUTORES[acao.acao](acao))
  plano.value = []
}

function descartar() {
  plano.value = []
}

onUnmounted(() => controlador?.abort())
</script>

<template>
  <section aria-labelledby="titulo-comandos">
    <h3 id="titulo-comandos">Assistente de comandos</h3>
    <form @submit.prevent="pedir" novalidate>
      <label for="comando">O que você quer fazer?</label>
      <input
        id="comando"
        v-model.trim="texto"
        placeholder="Ex.: adicione revisar o router e mostre as pendentes"
      />
      <button type="submit">Pedir</button>
    </form>

    <p v-if="carregando" role="status">Pensando…</p>
    <p v-else-if="erro" role="alert">{{ erro }}</p>
    <div v-else-if="plano.length">
      <p>A IA propôs este plano. Nada foi feito ainda:</p>
      <ul>
        <li v-for="(acao, i) in plano" :key="i" class="item">
          <span>{{ descrever(acao, tarefas) }}</span>
          <button type="button" @click="executar(acao)">Fazer</button>
        </li>
      </ul>
      <button type="button" @click="executarTudo">Fazer tudo</button>
      <button type="button" @click="descartar">Descartar</button>
    </div>
  </section>
</template>
