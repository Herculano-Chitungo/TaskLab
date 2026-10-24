<script setup>
import { useStore } from 'vuex'
import TaskItem from './TaskItem.vue'

const store = useStore()
</script>

<template>
  <p v-if="store.state.tarefas.length === 0">Nenhuma tarefa ainda. Adicione a primeira acima.</p>
  <ul v-else>
    <TaskItem
      v-for="t in store.state.tarefas"
      :key="t.id"
      :tarefa="t"
      @alternar="store.dispatch('alternar', $event)"
    />
  </ul>
</template>
