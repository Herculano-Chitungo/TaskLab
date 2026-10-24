<script setup>
import { useStore } from 'vuex'
import TaskForm from './components/TaskForm.vue'
import ListaTarefas from './components/ListaTarefas.vue'
import ResumoTarefas from './components/ResumoTarefas.vue'

const store = useStore()
</script>

<template>
  <h1>TaskLab</h1>
  <ResumoTarefas />
  <TaskForm @adicionar="store.dispatch('adicionar', $event)" />
  <ListaTarefas />
</template>
