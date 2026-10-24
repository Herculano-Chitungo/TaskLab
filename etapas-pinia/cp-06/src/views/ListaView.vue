<script setup>
import { useTarefasStore } from '../stores/tarefas'
import BasePanel from '../components/BasePanel.vue'
import TaskForm from '../components/TaskForm.vue'
import BuscaPorIA from '../components/BuscaPorIA.vue'
import FiltrosTarefas from '../components/FiltrosTarefas.vue'
import ListaTarefas from '../components/ListaTarefas.vue'

const store = useTarefasStore()
</script>

<template>
  <BasePanel titulo="Tarefas">
    <TaskForm @adicionar="store.adicionar" />
    <BuscaPorIA />
    <FiltrosTarefas />
    <ListaTarefas />
  </BasePanel>
</template>
