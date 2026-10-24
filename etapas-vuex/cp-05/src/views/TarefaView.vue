<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import BasePanel from '../components/BasePanel.vue'

// props: true na rota entrega o :id, sempre como TEXTO
const props = defineProps({ id: { type: String, required: true } })

const store = useStore()
const router = useRouter()

const tarefa = computed(() => store.getters.porId(Number(props.id)))

// Rascunho: o que a pessoa digita só vai para a store ao salvar
const rascunho = ref('')
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

function salvar() {
  store.dispatch('editar', { id: tarefa.value.id, titulo: rascunho.value })
}
function cancelar() {
  rascunho.value = tarefa.value.titulo
}
function remover() {
  store.dispatch('remover', tarefa.value.id)
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
    <button type="button" @click="store.dispatch('alternar', tarefa.id)">Alternar situação</button>
    <button type="button" @click="remover">Remover</button>

    <p><RouterLink :to="{ name: 'lista' }">Voltar para a lista</RouterLink></p>
  </BasePanel>

  <BasePanel v-else titulo="Tarefa não encontrada">
    <p>Essa tarefa não existe (ou foi removida).</p>
    <RouterLink :to="{ name: 'lista' }">Voltar para a lista</RouterLink>
  </BasePanel>
</template>
