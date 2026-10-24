import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filtroValido } from '../utils/filtros'

// A URL é o estado dos filtros: ?busca=router&filtro=pendentes
// Quem quiser ler ou mudar o filtro usa este composable; todos enxergam o mesmo estado.
export function useFiltrosUrl() {
  const route = useRoute()
  const router = useRouter()

  const busca = computed(() => (typeof route.query.busca === 'string' ? route.query.busca : ''))
  const filtro = computed(() => filtroValido(route.query.filtro))

  function aplicar(novos, { empurrar = false } = {}) {
    const query = { ...route.query, ...novos }
    if (!query.busca) delete query.busca
    if (!query.filtro || query.filtro === 'todas') delete query.filtro
    // replace enquanto digita (não enche o histórico); push quando é uma decisão (IA)
    const navegar = empurrar ? router.push : router.replace
    navegar.call(router, { query })
  }

  return { busca, filtro, aplicar }
}
