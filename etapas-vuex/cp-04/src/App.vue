<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const carregando = computed(() => store.state.carregando)
const erro = computed(() => store.state.erro)
const pendentes = computed(() => store.getters.totalPendentes)

onMounted(() => store.dispatch('carregar'))
</script>

<template>
  <header class="topo">
    <h1>TaskLab</h1>
    <nav aria-label="Principal">
      <RouterLink :to="{ name: 'lista' }">Lista</RouterLink>
      <RouterLink :to="{ name: 'resumo' }">Resumo ({{ pendentes }} pendentes)</RouterLink>
    </nav>
  </header>

  <main>
    <p v-if="carregando" role="status">Carregando tarefas…</p>
    <div v-else-if="erro" role="alert">
      <p>{{ erro }}</p>
      <button type="button" @click="store.dispatch('carregar')">Tentar de novo</button>
    </div>
    <RouterView v-else />
  </main>
</template>
