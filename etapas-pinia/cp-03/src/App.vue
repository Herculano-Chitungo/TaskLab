<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTarefasStore } from './stores/tarefas'
import TaskForm from './components/TaskForm.vue'
import ListaTarefas from './components/ListaTarefas.vue'
import ResumoTarefas from './components/ResumoTarefas.vue'

const store = useTarefasStore()
const { carregando, erro } = storeToRefs(store)

onMounted(() => store.carregar())
</script>

<template>
  <h1>TaskLab</h1>
  <p v-if="carregando" role="status">Carregando tarefas…</p>
  <div v-else-if="erro" role="alert">
    <p>{{ erro }}</p>
    <button type="button" @click="store.carregar()">Tentar de novo</button>
    <button type="button" @click="store.limparConcluidas">Limpar concluídas</button>
  </div>
  <template v-else>
    <ResumoTarefas />
    <TaskForm @adicionar="store.adicionar" />
    <ListaTarefas />
  </template>
</template>
