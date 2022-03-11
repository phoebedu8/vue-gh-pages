<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">後台</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">後台產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/orders">後台訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupon">優惠卷</router-link>
            </li>
            <a href="#" class="link-warning" @click.prevent="signout">登出</a>
          </ul>
        </div>
      </div>
    </nav>
    <router-view v-if="checkSuccess"></router-view>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: 'Dashboard',
  data () {
    return {
      checkSuccess: false
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`

        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch((err) => {
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入。')
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      alert('token 已清除')
      this.$router.push('/login')
    }
  }
}
</script>
