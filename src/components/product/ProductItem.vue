<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} р </span>
    <colors-list :colors="productColors" :currentColor.sync="currentColor"/>
  </li>

</template>

<script>
import colors from '@/data/colors'
import ColorsList from '@/components/common/ColorsList'
import goToPage from '@/helpers/goToPage'
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
  },
  computed: {
    productColors () {
      const thisColors = []
      this.product.colors.forEach((el) => {
        const color = colors.find(clr => clr.id === el)
        thisColors.push(color)
      })
      return thisColors
    }
  },
  methods: {
    goToPage
  }
}
</script>
