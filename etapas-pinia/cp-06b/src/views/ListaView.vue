<script setup>
import { useTarefasStore } from '../stores/tarefas'
import BasePanel from '../components/BasePanel.vue'
import TaskForm from '../components/TaskForm.vue'
import ComandosIA from '../components/ComandosIA.vue'
import FiltrosTarefas from '../components/FiltrosTarefas.vue'
import ListaTarefas from '../components/ListaTarefas.vue'
import PassosSugeridos from '../components/PassosSugeridos.vue'

const store = useTarefasStore()
</script>

<template>
  <BasePanel titulo="Tarefas">
    <TaskForm @adicionar="store.adicionar" />
    <ComandosIA />
    <FiltrosTarefas />
    
    <!-- Botão para limpar as tarefas concluídas -->
    <div style="margin: 12px 0;">
      <button type="button" @click="store.limparConcluidas">Limpar concluídas</button>
    </div>

    <PassosSugeridos />
    <ListaTarefas />
  </BasePanel>
</template>