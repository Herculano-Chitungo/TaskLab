<script setup>
import { onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTarefasStore } from '../stores/tarefas'

const props = defineProps({ titulo: { type: String, required: true } })

const store = useTarefasStore()
const { sugestoes, iaCarregando, iaErro } = storeToRefs(store)

// Se a tarefa (ou o título) mudar, as sugestões antigas deixam de valer
watch(() => props.titulo, () => store.limparSugestoes())
// Ao sair da tela, cancela a chamada pendente e limpa as sugestões
onUnmounted(() => store.limparSugestoes())
</script>

<template>
  <section aria-labelledby="titulo-passos">
    <h3 id="titulo-passos">Passos com IA</h3>
    <button type="button" @click="store.sugerirPassos(titulo)">Quebrar em passos</button>

    <p v-if="iaCarregando" role="status">Pensando…</p>
    <p v-else-if="iaErro" role="alert">{{ iaErro }}</p>
    <div v-else-if="sugestoes.length">
      <ul>
        <!-- interpolação escapa HTML: nunca v-html com texto da IA -->
        <li v-for="passo in sugestoes" :key="passo" class="item">
          <span>{{ passo }}</span>
          <button type="button" @click="store.aceitarSugestao(passo)">Adicionar</button>
        </li>
      </ul>
      <!-- Exercício 6: Botão para aceitar todas as sugestões de uma vez[cite: 7, 9] -->
      <button type="button" @click="store.aceitarTodas">
        Adicionar todos
      </button>
    </div>
  </section>
</template>