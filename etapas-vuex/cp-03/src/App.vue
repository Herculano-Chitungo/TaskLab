<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TaskForm from './components/TaskForm.vue'
import ListaTarefas from './components/ListaTarefas.vue'
import ResumoTarefas from './components/ResumoTarefas.vue'

const store = useStore()
const carregando = computed(() => store.state.carregando)
const erro = computed(() => store.state.erro)

onMounted(() => store.dispatch('carregar'))
</script>

<template>
  <h1>TaskLab</h1>
  <p v-if="carregando" role="status">Carregando tarefas…</p>
  <div v-else-if="erro" role="alert">
    <p>{{ erro }}</p>
    <button type="button" @click="store.dispatch('carregar')">Tentar de novo</button>
  </div>
  <template v-else>
    <ResumoTarefas />
    <TaskForm @adicionar="store.dispatch('adicionar', $event)" />
    <ListaTarefas />
  </template>
</template>
