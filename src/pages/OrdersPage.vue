<template>

  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <base-form-text title="ФИО" placeholder="Введите ваше полное имя" :error="formError.name"
                            v-model="formData.name" type="text"/>

            <base-form-text title="Адрес доставки" placeholder="Введите ваш адрес" :error="formError.address"
                            v-model="formData.address" type="text"/>

            <base-form-text title="Телефон" placeholder="Введите ваш телефон" :error="formError.phone"
                            v-model="formData.phone" type="tel"/>

            <base-form-text title="Email" placeholder="Введите ваш Email" :error="formError.email"
                            v-model="formData.email" type="email"/>

            <base-form-textarea title="ФИО" placeholder="Комментарий к заказу" :error="formError.comment"
                                v-model="formData.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <cart-orders :ordersData="cartOrdersData">
          <button class="cart__button button button--primery" type="submit" style="height: 80px; padding: 0px 20px">
            <span v-if="!orderLoading">Оформить заказ</span>
            <preloader v-else/>
          </button>
        </cart-orders>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>

</template>
<script>
import BaseFormText from '@/components/form/BaseFormText'
import BaseFormTextarea from '@/components/form/BaseFormTextarea'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { mapGetters } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import Preloader from '@/components/common/Preloader'
import CartOrders from '@/components/cart/CartOrders'

export default {
  data () {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false
    }
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
    Preloader,
    CartOrders
  },
  filters: { numberFormat },
  methods: {
    order () {
      this.formError = {}
      this.formErrorMessage = ''
      this.orderLoading = true
      axios
        .post(API_BASE_URL + 'api/orders', {
          ...this.formData
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(response => {
          this.$store.commit('resetCart')
          this.$store.commit('updateOrderInfo', response.data)
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id }
          })
          this.orderLoading = false
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {}
          this.formErrorMessage = error.response.data.error.message
          this.orderLoading = false
        })
    }
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartTotalAmount']),
    cartOrdersData () {
      return {
        items: this.cartDetailProducts,
        count: this.cartTotalAmount,
        totalPrice: this.cartTotalPrice
      }
    }
  }
}
</script>
