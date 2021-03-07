<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>
      <h1 class="content__title">
        Заказ оформлен <span>№ {{ this.$route.params.id }}</span>
      </h1>
    </div>
    <section class="cart" v-if="orderInfo">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа.
            Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
          </p>
          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>
        <cart-orders :ordersData="cartOrdersData"/>
      </form>
    </section>
    <h2 v-else> заказ не найден </h2>
  </main>
</template>
<script>
import numberFormat from '@/helpers/numberFormat'
import CartOrders from '@/components/cart/CartOrders'

export default {
  data () {
    return {
      orderProducts: null
    }
  },
  components: { CartOrders },
  computed: {
    orderInfo () {
      return this.$store.state.orderInfo
    },
    cartOrdersData () {
      return {
        items: this.orderInfo.basket.items,
        count: this.orderInfo.basket.items.length,
        totalPrice: this.orderInfo.totalPrice
      }
    }
  },
  filters: { numberFormat },
  watch: {
    '$route.params.id': {
      handler () {
        if (this.orderInfo !== null && this.orderInfo.id === this.$route.params.id) {
          return
        }
        this.$store.dispatch('loadOrderInfo', this.$route.params.id).catch(() => this.$router.replace({ name: 'notFound' })) //eslint-disable-line
      },
      immediate: true
    }
  }
}
</script>
