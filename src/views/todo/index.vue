<template>
  <el-row class="content">
    <el-col :xs="{ span: 20, offset: 2 }" :sm="{ span: 8, offset: 8 }">
      <span>Welcome: <strong>{{ user.username }}</strong>. Your todo is:</span>
      <el-input placeholder="Input Todo" v-model="content" @keyup.enter.native="create"></el-input>
      <el-tabs v-model="active">
        <el-tab-pane label="Todo List" name="todo">
          <el-col :xs="24">
            <template v-if="!done(false)"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="list" v-if="item.status === false" :key="index">
                  <span class="item">{{ index + 1 }}. {{ item.content }}</span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(index)">Finish</el-button>
                    <el-button size="small" plain type="danger" @click="remove(index)">Remove</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else>No todo items</div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Finish List" name="finish">
          <template v-if="!done(true)">
            <template v-for="(item, index) in list">
              <div class="list" v-if="item.status == true" :key="index">
                <span class="item finished">{{ index + 1 }}. {{ item.content }}</span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(index)">Return</el-button>
                  <el-button size="small" plain type="danger" @click="remove(index)">Remove</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>No finish items</div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      active: 'todo',
      content: '',
      user: {
        _id: 0,
        username: 'admin'
      },
      list: []
    }
  },
  computed: {
    done(bool) {
      return bool => {
        for (const i in this.list) {
          if (this.list[i].status === bool) {
            return false
          }
        }
        return true
      }
    }
  },
  created() {
    this.$axios.get('/user/info').then(response => {
      this.user = response.data.data
      this.$axios.get('/todo/get/' + this.user._id).then(response => {
        this.list = response.data.data
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  },
  methods: {
    create() {
      this.$axios.post('/todo/create', {
        uid: this.user._id,
        content: this.content
      }).then(response => {
        const { message, data } = response.data
        this.list.push(data)
        this.$message.success(message)
      }, error => {
        console.log(error)
      })
    },
    update(index) {
      this.$axios.put('/todo/update/' + this.list[index]._id).then(response => {
        console.log(response)
        this.$set(this.list[index], 'status', !this.list[index].status)
        this.$message.success(response.data.message)
      }, error => {
        console.log(error)
      })
    },
    remove(index) {
      this.$axios.delete('/todo/remove/' + this.list[index]._id).then(response => {
        this.list.splice(index, 1)
        this.$message.success(response.data.message)
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-input
    margin 20px auto
  .list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .item
      font-size 20px
      &.finished
        text-decoration line-through
        color #ddd
  .pull-right
    float right
</style>
