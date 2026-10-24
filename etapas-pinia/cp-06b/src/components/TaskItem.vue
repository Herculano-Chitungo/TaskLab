<script setup>
defineProps({ tarefa: { type: Object, required: true } })
defineEmits(['alternar'])
</script>

<template>
  <li class="item">
    <input
      type="checkbox"
      :id="`t-${tarefa.id}`"
      :checked="tarefa.concluida"
      @change="$emit('alternar', tarefa.id)"
    />
    <label :for="`t-${tarefa.id}`" :class="{ feita: tarefa.concluida }">{{ tarefa.titulo }}</label>
    <RouterLink :to="{ name: 'tarefa', params: { id: tarefa.id } }">Detalhes</RouterLink>
  </li>
</template>
