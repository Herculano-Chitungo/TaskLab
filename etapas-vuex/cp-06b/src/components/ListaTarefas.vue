<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TaskItem from './TaskItem.vue'
import { useFiltrosUrl } from '../composables/useFiltrosUrl'
import { aplicarFiltro } from '../utils/filtros'

const store = useStore()
const { busca, filtro } = useFiltrosUrl()

const visiveis = computed(() => aplicarFiltro(store.state.tarefas, busca.value, filtro.value))
</script>

<template>
  <p v-if="store.state.tarefas.length === 0">Nenhuma tarefa ainda. Adicione a primeira acima.</p>
  <p v-else-if="visiveis.length === 0">Nenhuma tarefa corresponde ao filtro.</p>
  <ul v-else>
    <TaskItem
      v-for="t in visiveis"
      :key="t.id"
      :tarefa="t"
      @alternar="store.dispatch('alternar', $event)"
    />
  </ul>
</template>
