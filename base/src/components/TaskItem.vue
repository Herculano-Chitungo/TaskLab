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

  <!--
    BLOCO 5: aqui entra o link Detalhes, um RouterLink para a tela de cada tarefa. Ele só pode
    existir depois que o Router for instalado, no bloco 4.
  -->
  </li>
</template>
