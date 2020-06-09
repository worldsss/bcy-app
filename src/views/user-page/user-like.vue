<template>
  <div>
    <van-nav-bar title="我的喜欢"
                 left-text="返回"
                 left-arrow @click-left="$router.replace('/user-page')">
      <template #right>
      </template>
    </van-nav-bar>

    <!--顶部的标签栏-->
    <van-tabs v-model="active" swipeable sticky>
      <van-tab title="赞过的作品" name="1">

      </van-tab>
      <van-tab title="收藏的作品" name="2">
        <!--用户收藏-->
        <user-collect-cute v-for="(item,index) in userCollectContent"
                           :user-collect="item">

        </user-collect-cute>


      </van-tab>
      <van-tab title="关注的问题" name="3"></van-tab>

    </van-tabs>

  </div>
</template>

<script>
  import UserCollectCute from '../../components/user-component/user-collect-cute'


  export default {
    name: "",
    components:{
      UserCollectCute,
    },
    data(){
      return{
        active:'2', //标签栏默认的显示
        userCollectContent: [], //用户收藏的内容
      }
    },
    created() {

      var uid = this.$store.state.user.uid

      //获取当前用户所有的收藏分页版，含有图片和文字版
      axios.get("/api/listUserCollectByUidPaging?uid=" + uid)
          .then(res => {
            console.log("这里是用户分页的图片和文字的信息版")
            console.log(res.data)
            if (res.data !=null){
              this.userCollectContent.push(res.data.list)

              console.log("这里是页面要加载的值");
              console.log(this.userCollectContent)

              /*
              this.userCollectContentFirst = this.userCollectContent[0]
              console.log(this.userCollectContentFirst)*/

            }


          })

    }
  }
</script>

<style scoped>

</style>