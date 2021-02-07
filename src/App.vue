<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"
             @goToPage="(pageName, pageParams) => goToPage(pageName, pageParams)"/>
</template>

<script>
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import NotFoundPages from '@/pages/NotFoundPages'

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
  }
}
</script>
