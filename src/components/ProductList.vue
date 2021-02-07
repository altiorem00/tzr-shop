<template>
  <ul class="catalog__list">
    <productItem v-for="product in products" :key="product.id" :product="product"
                 @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"/>
  </ul>
</template>

<script>
import productItem from './productItem'

export default {
  props: ['products'],
  components: { productItem }
}
</script>
