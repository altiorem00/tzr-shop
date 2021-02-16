<template>

  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId" :colored.sync="filterColor"
                     :countProducts.sync="countProducts"/>
      <section class="catalog">
        <ProductList :products="products"/>
        <VPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>
<script>
import products from '@/data/products'
import ProductList from '@/components/product/ProductList'
import VPagination from '@/components/common/VPagination'
import ProductFilter from '@/components/product/ProductFilter'
import axios from 'axios'

export default {
  components: {
    ProductList,
    VPagination,
    ProductFilter
  },
  data () {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      page: 1,
      productsPerPage: 3,
      productsData: null
    }
  },
  computed: {
    filteredProducts () {
      let filteredProducts = products

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter(product => product.colors.includes(this.filterColor))
      }

      return filteredProducts
    },
    products () {
      const offset = (this.page - 1) * this.productsPerPage
      return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
    countProducts () {
      return this.filteredProducts.length
    }
  },
  methods: {
    loadProducts () {
      function currentProductsData (data) {
        this.productsData = data
      }

      axios.get('https://vue-study.skillbox.cc/api/products')
        .then(function (response) {
          console.log()
          // console.log(item.productsData)
          currentProductsData(response.data)
          // this.productsData = response.data
        })
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>
