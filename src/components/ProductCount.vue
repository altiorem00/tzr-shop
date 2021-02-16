<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="deleteElem">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentAmount" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="currentAmount++">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

</template>
<script>
export default {
  props: ['productAmount'],
  computed: {
    currentAmount: {
      get () {
        return this.productAmount
      },
      set (v) {
        this.$emit('update:productAmount', v)
      }
    }
  },
  methods: {
    deleteElem () {
      if (this.currentAmount > 1) {
        this.currentAmount--
      }
    }
  }
}
</script>
