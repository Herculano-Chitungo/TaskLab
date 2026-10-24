<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTarefasStore } from '../stores/tarefas'
import TaskItem from './TaskItem.vue'
import { useFiltrosUrl } from '../composables/useFiltrosUrl'
import { aplicarFiltro } from '../utils/filtros'

const store = useTarefasStore()
const { tarefas } = storeToRefs(store)
const { busca, filtro } = useFiltrosUrl()

const visiveis = computed(() => aplicarFiltro(tarefas.value, busca.value, filtro.value))
</script>

<template>
  <p v-if="tarefas.length === 0">Nenhuma tarefa ainda. Adicione a primeira acima.</p>
  <p v-else-if="visiveis.length === 0">Nenhuma tarefa corresponde ao filtro.</p>
  <ul v-else>
    <TaskItem v-for="t in visiveis" :key="t.id" :tarefa="t" @alternar="store.alternar" />
  </ul>
</template>
