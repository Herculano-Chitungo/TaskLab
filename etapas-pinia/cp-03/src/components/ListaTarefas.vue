<script setup>
import { storeToRefs } from 'pinia'
import { useTarefasStore } from '../stores/tarefas'
import TaskItem from './TaskItem.vue'

const store = useTarefasStore()
const { tarefas } = storeToRefs(store)
</script>

<template>
  <p v-if="tarefas.length === 0">Nenhuma tarefa ainda. Adicione a primeira acima.</p>
  <ul v-else>
    <TaskItem v-for="t in tarefas" :key="t.id" :tarefa="t" @alternar="store.alternar" />
  </ul>
</template>
