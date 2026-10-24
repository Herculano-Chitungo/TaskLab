<script setup>
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

// BLOCO 1, passo 3: esta importação e a linha que chama useTasks() mais abaixo serão trocadas pela
// store: useStore no Vuex ou useTarefasStore no Pinia.
import { useTasks } from './composables/useTasks'

const { tarefas, pendentes, adicionar, alternar } = useTasks()
</script>

<template>
  <h1>TaskLab</h1>
  <p>{{ pendentes.length }} pendentes</p>

  <!--
    O formulário só emite um evento. Ele não conhece a store, e isso continua assim o dia inteiro:
    no bloco 1 só muda quem recebe o evento.
  -->
  <TaskForm @adicionar="adicionar" />
  <ul>
    <TaskItem v-for="t in tarefas" :key="t.id" :tarefa="t" @alternar="alternar" />
  </ul>
</template>
