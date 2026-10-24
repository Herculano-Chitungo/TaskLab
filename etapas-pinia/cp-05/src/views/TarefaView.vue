<script setup>
import { computed, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useTarefasStore } from '../stores/tarefas'
import BasePanel from '../components/BasePanel.vue'

// props: true na rota entrega o :id, sempre como TEXTO
const props = defineProps({ id: { type: String, required: true } })

const store = useTarefasStore()
const router = useRouter()

const tarefa = computed(() => store.porId(Number(props.id)))

// Rascunho: o que a pessoa digita só vai para a store ao salvar
const rascunno = ref('')
watch(
  () => tarefa.value?.titulo,
  (titulo) => {
    rascunho.value = titulo ?? ''
  },
  { immediate: true }
)

const alterado = computed(
  () => rascunho.value.trim() !== '' && rascunho.value.trim() !== tarefa.value?.titulo
)

// Exercício 5: Guarda de navegação antes de sair da tela com edições pendentes
onBeforeRouteLeave(() => {
  if (alterado.value) return window.confirm('Descartar as alterações?')
})

function salvar() {
  store.editar({ id: tarefa.value.id, titulo: rascunho.value })
}
function cancelar() {
  rascunho.value = tarefa.value.titulo
}
function remover() {
  store.remover(tarefa.value.id)
  router.push({ name: 'lista' })
}
</script>

<template>
  <BasePanel v-if="tarefa" :titulo="`Tarefa ${tarefa.id}`">
    <form @submit.prevent="salvar" novalidate>
      <label for="titulo-edicao">Título</label>
      <input id="titulo-edicao" v-model="rascunho" />
      <button type="submit" :disabled="!alterado">Salvar</button>
      <button type="button" @click="cancelar">Cancelar</button>
    </form>

    <p>Situação: {{ tarefa.concluida ? 'concluída' : 'pendente' }}</p>
    <button type="button" @click="store.alternar(tarefa.id)">Alternar situação</button>
    <button type="button" @click="remover">Remover</button>

    <p><RouterLink :to="{ name: 'lista' }">Voltar para a lista</RouterLink></p>
  </BasePanel>

  <BasePanel v-else titulo="Tarefa não encontrada">
    <p>Essa tarefa não existe (ou foi removida).</p>
    <RouterLink :to="{ name: 'lista' }">Voltar para a lista</RouterLink>
  </BasePanel>
</template>