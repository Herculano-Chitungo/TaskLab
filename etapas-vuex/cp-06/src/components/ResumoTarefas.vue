<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const total = computed(() => store.getters.total)
const pendentes = computed(() => store.getters.totalPendentes)
const concluidas = computed(() => store.getters.totalConcluidas)
</script>

<template>
  <dl class="resumo">
    <div><dt>Total</dt><dd>{{ total }}</dd></div>
    <div><dt>Pendentes</dt><dd>{{ pendentes }}</dd></div>
    <div><dt>Concluídas</dt><dd>{{ concluidas }}</dd></div>
  </dl>
</template>
