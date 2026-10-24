<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

const store = useStore()
const tarefas = computed(() => store.state.tarefas)
const pendentes = computed(() => store.getters.totalPendentes)
</script>

<template>
  <h1>TaskLab</h1>
  <p>{{ pendentes }} pendentes</p>
  <TaskForm @adicionar="store.dispatch('adicionar', $event)" />
  <ul>
    <TaskItem
      v-for="t in tarefas"
      :key="t.id"
      :tarefa="t"
      @alternar="store.dispatch('alternar', $event)"
    />
  </ul>
</template>
