<!--
  O BasePanel já existe desde o Sábado 2. Ele só passa a ser usado no bloco 4, nas telas (views).
-->

<script setup>
defineProps({ titulo: { type: String, default: '' } })
</script>

<template>
  <section class="painel">
    <h2 v-if="titulo">{{ titulo }}</h2>
    <slot />
  </section>
</template>
