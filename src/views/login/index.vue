<template>
  <el-row id="container">
    <el-col :xs="24" :sm="{ span: 6, offset: 9 }">
      <span>Welcome</span>
      <el-row>
        <el-input placeholder="username" v-model="username"></el-input>
        <el-input type="password" placeholder="password" v-model="password" @keyup.enter.native="login"></el-input>
        <el-button type="primary" @click="login">Login</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$axios.post('/user/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        const { status, message, data } = response.data
        if (status === 200) {
          sessionStorage.setItem('token', data)
          this.$message.success(message)
          this.$router.push('/todo')
        } else {
          sessionStorage.setItem('token', null)
          this.$message.error(message)
        }
      }).catch(error => {
        sessionStorage.setItem('token', null)
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #container
    padding 16px
    span
      font-size 28px
    .el-input
      margin 12px 0
    .el-button
      width 100%
      margin-top 12px
</style>
