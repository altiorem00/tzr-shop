<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title" @click.prevent="$emit('goToPage', 'product', {id: product.id})"/>
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} р </span>
    <colors-list :colors="productColors" :currentColor.sync="currentColor"/>

<!--    <ul class="colors colors&#45;&#45;black">-->
<!--      <li class="colors__item" v-for="color in product.colors" :key="color">-->
<!--        <label class="colors__label">-->
<!--          <input-->
<!--            class="colors__radio sr-only"-->
<!--            type="radio"-->
<!--            :value="color"-->
<!--            v-model="currentColor"-->
<!--          />-->
<!--          <span class="colors__value" :style="{ backgroundColor: color }">-->
<!--            </span>-->
<!--        </label>-->
<!--      </li>-->
<!--    </ul>-->
  </li>

</template>

<script>
import colors from '@/data/colors'
import ColorsList from '@/components/ColorsList'

export default {
  data () {
    return {
      currentColor: ''
    }
  },
  props: ['product'],
  components: { ColorsList },
  computed: {
    productColors () {
      const thisColors = []
      this.product.colors.forEach((el) => {
        const color = colors.find(clr => clr.id === el)
        thisColors.push(color)
      })
      return thisColors
    }
  }
}
</script>
