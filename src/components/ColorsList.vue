<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="checkbox" name="color" :value="color.value" v-model="currentColor">
        <span class="colors__value" :style="{ backgroundColor: color.value }">
                  </span>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['colors', 'currentColor']
}
</script>
