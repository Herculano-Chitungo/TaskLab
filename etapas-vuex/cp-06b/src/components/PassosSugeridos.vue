<script setup>
import { computed, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({ titulo: { type: String, required: true } })

const store = useStore()
const sugestoes = computed(() => store.state.sugestoes)
const carregando = computed(() => store.state.iaCarregando)
const erro = computed(() => store.state.iaErro)

// Se a tarefa (ou o título) mudar, as sugestões antigas deixam de valer
watch(() => props.titulo, () => store.dispatch('limparSugestoes'))
// Ao sair da tela, cancela a chamada pendente e limpa as sugestões
onUnmounted(() => store.dispatch('limparSugestoes'))
</script>

<template>
  <section aria-labelledby="titulo-passos">
    <h3 id="titulo-passos">Passos com IA</h3>
    <button type="button" @click="store.dispatch('sugerirPassos', titulo)">Quebrar em passos</button>

    <p v-if="carregando" role="status">Pensando…</p>
    <p v-else-if="erro" role="alert">{{ erro }}</p>
    <ul v-else-if="sugestoes.length">
      <!-- interpolação escapa HTML: nunca v-html com texto da IA -->
      <li v-for="passo in sugestoes" :key="passo" class="item">
        <span>{{ passo }}</span>
        <button type="button" @click="store.dispatch('aceitarSugestao', passo)">Adicionar</button>
      </li>
    </ul>
  </section>
</template>
