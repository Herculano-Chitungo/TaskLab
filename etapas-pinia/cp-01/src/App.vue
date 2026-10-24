<script setup>
import { storeToRefs } from 'pinia'
import { useTarefasStore } from './stores/tarefas'
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

const store = useTarefasStore()
const { tarefas, totalPendentes } = storeToRefs(store)
</script>

<template>
  <h1>TaskLab</h1>
  <p>{{ totalPendentes }} pendentes</p>
  <TaskForm @adicionar="store.adicionar" />
  <ul>
    <TaskItem v-for="t in tarefas" :key="t.id" :tarefa="t" @alternar="store.alternar" />
  </ul>
</template>
