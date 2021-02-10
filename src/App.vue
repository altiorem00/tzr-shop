<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"/>
</template>

<script>
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import NotFoundPages from '@/pages/NotFoundPages'
import eventBus from '@/eventBus'

const routes = {
  main: 'MainPage',
  product: 'ProductPage'
}

export default {
  data () {
    return {
      currentPage: 'main',
      currentPageParams: {}
    }
  },
  components: {
    MainPage,
    ProductPage,
    NotFoundPages
  },
  methods: {
    goToPage (pageName, pageParams) {
      this.currentPage = pageName
      this.currentPageParams = pageParams || {}
    }
  },
  computed: {
    currentPageComponent () {
      return routes[this.currentPage] || 'NotFoundPage'
    }
  },
  created () {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams))
  }
}
</script>
