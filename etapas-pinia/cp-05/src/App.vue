<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTarefasStore } from './stores/tarefas'

const store = useTarefasStore()
// storeToRefs mantém a reatividade ao desestruturar state e getters
const { carregando, erro, totalPendentes } = storeToRefs(store)

onMounted(() => store.carregar())
</script>

<template>
  <header class="topo">
    <h1>TaskLab</h1>
    <nav aria-label="Principal">
      <RouterLink :to="{ name: 'lista' }">Lista</RouterLink>
      <RouterLink :to="{ name: 'resumo' }">Resumo ({{ totalPendentes }} pendentes)</RouterLink>
    </nav>
  </header>

  <main>
    <p v-if="carregando" role="status">Carregando tarefas…</p>
    <div v-else-if="erro" role="alert">
      <p>{{ erro }}</p>
      <button type="button" @click="store.carregar()">Tentar de novo</button>
    </div>
    <RouterView v-else />
  </main>
</template>
