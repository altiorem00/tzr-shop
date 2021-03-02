import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProducts: [],
    allProducts: null,
    categoryProducts: null,
    productData: null,
    colorsData: null,

    userAccessKey: null,
    cartProductsData: [],

    orderInfo: null
  },
  mutations: {
    updateOrderInfo (state, orderInfo) {
      this.orderInfo = orderInfo
    },
    resetCart (state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    updateCartProductAmount (state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId)

      if (item) {
        item.amount = amount
      }
    },
    deleteCartProducts (state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
    takeProducts (state, data) {
      state.allProducts = data
    },
    takeCategory (state, data) {
      state.categoryProducts = data
    },
    takeProduct (state, data) {
      state.productData = data
    },
    takeColors (state, data) {
      state.colorsData = data
    },
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductsData (state, data) {
      state.cartProductsData = data
    },
    syncCartProducts (state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
  getters: {
    cartDetailProducts (state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    cartTotalPrice (state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    },
    cartTotalAmount (state) {
      return state.cartProducts.reduce((acc, item) => item.amount + acc, 0)
    }
  },
  actions: {
    loadOrderInfo (context, orderId) {
      return axios
        .get(API_BASE_URL + 'api/order/' + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data)
        })
    },
    loadCart (context) {
      return axios
        .get(API_BASE_URL + 'api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },
    addProductToCart (context, { productId, amount }) {
      return axios.post(API_BASE_URL + 'api/baskets/products', {
        productId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },
    deleteProductToCart (context, productId) {
      context.commit('deleteCartProducts', productId)
      return axios.delete(API_BASE_URL + 'api/baskets/products', {
        params: {
          userAccessKey: context.state.userAccessKey
        },
        data: {
          productId: productId
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    updateCartProductAmount (context, { productId, amount }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount
      })
      if (amount < 1) {
        return
      }
      return axios.put(API_BASE_URL + 'api/baskets/products', {
        productId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    loadCategories (context) {
      return axios.get(API_BASE_URL + 'api/productCategories').then(response => context.commit('takeCategory', response.data.items))
    },
    loadColors (context) {
      return axios.get(API_BASE_URL + 'api/colors').then(response => context.commit('takeColors', response.data.items))
    }
  }
})
