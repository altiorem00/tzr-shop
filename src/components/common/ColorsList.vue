<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="computedColor">
        <span class="colors__value" :style="{ backgroundColor: color.code }">
                  </span>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['colors', 'currentColor'],
  computed: {
    computedColor: {
      get () {
        return this.currentColor
      },
      set (v) {
        this.$emit('update:currentColor', v)
      }
    }
  }
}
</script>
