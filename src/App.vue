<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created() {

    //从后台获取当前用户的状态
    axios.get("/api/getSessionUserInfo")
        .then(res => {
          console.log("这里是session中的对象" + res.data)
          console.log(res.data)
          //把当前已经登录的用户的信息再存入vuex中
          if (res.data != null && res.data != '') {
            // this.isUserShow = true
            console.log("这里是用户的信息")
            //vue不推荐直接把值赋值给state中的属性，而是使用方法的方式赋值，这样才是响应式的
            this.$store.commit('addUserName', res.data)

            //改变当前用户登录信息的状态
            this.$store.commit('changeCookie',1)
          } else {
            // this.isUserShow = false
          }
        })

    setTimeout(()=>{
      if (this.$store.state.userIsCookie == 0){
        //从后台的cookie中获取用户信息
        axios.get("/api/getCookieUserInfo")
            .then(res =>{
              console.log("这里是cookie中的信息")
              console.log(this.$store.state.userIsCookie)
              //把当前已经登录的用户的信息再存入vuex中
              if (res.data != null && res.data != '') {
                // this.isUserShow = true
                console.log("这里是用户的信息")
                //vue不推荐直接把值赋值给state中的属性，而是使用方法的方式赋值，这样才是响应式的
                this.$store.commit('addUserName', res.data)
                // this.isCookie = 1

                //改变当前用户登录信息的状态
                this.$store.commit('changeCookie',1)
                console.log("这里的cookie的状态时");
                console.log(this.$store.state.userIsCookie)
              } else {
                // this.isUserShow = false
              }

            })
      }

    },1000)



  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
