<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image.file.url" :alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} р </span>
    <colors-list :colors="product.colors" :currentColor.sync="currentColor"/>
  </li>

</template>

<script>
import ColorsList from '@/components/common/ColorsList'
import numberFormat from '@/helpers/numberFormat'

export default {
  data () {
    return {
      currentColor: ''
    }
  },
  props: ['product'],
  components: { ColorsList },
  filters: {
    numberFormat
  }
}
</script>
<style scoped>
img {
  object-fit: contain !important;
}
</style>
