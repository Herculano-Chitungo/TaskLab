<script setup>
import { useTarefasStore } from './stores/tarefas'
import TaskForm from './components/TaskForm.vue'
import ListaTarefas from './components/ListaTarefas.vue'
import ResumoTarefas from './components/ResumoTarefas.vue'

const store = useTarefasStore()
</script>

<template>
  <h1>TaskLab</h1>
  <ResumoTarefas />
  <TaskForm @adicionar="store.adicionar" />
  <ListaTarefas />
</template>
