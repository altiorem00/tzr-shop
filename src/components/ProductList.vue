<template>
  <ul class="catalog__list">
    <productItem v-for="product in products" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
import productItem from './productItem'

export default {
  props: ['products'],
  components: { productItem }
}
</script>
