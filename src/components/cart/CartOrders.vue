<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in ordersData.items" :key="item.product.id">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.product.price | numberFormat }} x {{ item.quantity }}</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ ordersData.count }}</b> товар на сумму
        <b>{{ ordersData.totalPrice | numberFormat }}</b></p>
    </div>
    <slot/>
  </div>
</template>
<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['ordersData'],
  filters: { numberFormat }
}
</script>
