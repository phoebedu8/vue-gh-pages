<template>
  <div class="container">
    <h2>購物車</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <!--插入背景圖方式-->
            <div :style="{ backgroundImage: `url(${item.imageUrl})`}" style="
                                    height: 100px;
                                    background-size: cover;
                                    background-position: center;
                                    "></div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="item.price === item.origin_price">
              {{  item.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" :disabled="isLoadingItem === item.id"
                @click="openProductModal(item.id)">
                查看更多
              </button>
              <button type="button" class="btn btn-danger" @click="addToCart(item.id)"
                :disabled="isLoadingItem === item.id">
                <!-- 讀取圖示 -->
                <span class="spinner-grow spinner-grow-sm" v-show="isLoadingItem === item.id"></span>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {}, // 購物車列表
      products: [], // 產品列表
      productId: '',
      isLoadingItem: '' // 製作局部讀取效果
    }
  },
  methods: {
    // 取得所有產品列表
    getProducts () {
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
        })
    },
    // 新增購物車按鈕事件
    addToCart (id, qty = 1) { // 加入購物車必須帶入兩個參數
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res)
          this.isLoadingItem = ''
          // get-cart
          emitter.emit('get-cart')
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
