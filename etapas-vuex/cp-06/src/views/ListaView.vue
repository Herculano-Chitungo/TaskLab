<script setup>
import { useStore } from 'vuex'
import BasePanel from '../components/BasePanel.vue'
import TaskForm from '../components/TaskForm.vue'
import BuscaPorIA from '../components/BuscaPorIA.vue'
import FiltrosTarefas from '../components/FiltrosTarefas.vue'
import ListaTarefas from '../components/ListaTarefas.vue'

const store = useStore()
</script>

<template>
  <BasePanel titulo="Tarefas">
    <TaskForm @adicionar="store.dispatch('adicionar', $event)" />
    <BuscaPorIA />
    <FiltrosTarefas />
    <ListaTarefas />
  </BasePanel>
</template>
