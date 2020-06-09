<template>
  <div>
    <navbar-tab></navbar-tab>

    <!--用户设置-->
    <div style="text-align: right">
      <van-icon name="setting-o" size="25" style="margin: 8px"></van-icon>
    </div>

    <!--未登录时的显示-->
    <van-row gutter="20" style="margin: 0 15px 15px 15px" v-show="!isUserLogin">
      <van-col span="6">
        <van-image
                round
                width="80"
                height="80"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="15">
        <van-button color="red" size="small">登录半次元</van-button>
        <br>
        <span>登录半次元，解锁全部功能</span>
      </van-col>
    </van-row>

    <!--登录后的显示-->
    <van-row gutter="20" style="margin: 0 15px 15px 15px" v-show="isUserLogin">
      <van-col span="6">
        <van-image
                round
                width="80"
                height="80"
                :src="myUser.userAvatar"
        />
      </van-col>
      <van-col span="18">
        <!--用户名称-->
        <span style="font-size: 18px;font-weight: bolder">{{myUser.userName}}</span>
        <br>
        <span>{{myUser["userInfo"]}}</span>
        <br>
        <!--用户个人标签-->
        <el-tag v-for="(item,index) in userTags" style="margin: 10px 2px">{{item.utagName}}</el-tag>
      </van-col>
    </van-row>

    <div style="background-color: saddlebrown !important;">
      <van-grid :column-num="3" >
        <van-grid-item>
          <b style="font-size: 25px">{{myUser.userAttention}}</b>
          <span class="op-5">关注</span>
        </van-grid-item>
        <van-grid-item>
          <b style="font-size: 25px">{{myUser.userFans}}</b>
          <span class="op-5">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <b style="font-size: 25px">{{myUser.userGivelike}}</b>
          <span class="op-5">获赞</span>
        </van-grid-item>
      </van-grid>
    </div>



    <h3 style="margin: 20px;">个人中心</h3>
    <van-grid :gutter="0" :column-num="3" class="fs-12">
      <van-grid-item  @click="gotoUserMessage()">
        <van-icon name="bullhorn-o" size="25" class="mb-5" />
        <span>我的消息</span>
      </van-grid-item>
      <van-grid-item  @click="gotoUserMessage()">
        <van-icon name="envelop-o" size="25" class="mb-5"/>
        <span>我的私信</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="flower-o" size="25" class="mb-5"/>
        <span>我的勾搭</span>
      </van-grid-item>
    </van-grid>
    <van-grid :gutter="0" :column-num="3" class="fs-12">
      <van-grid-item  @click="gotoUserLike()">
        <van-icon name="like-o" size="25" class="mb-5" />
        <span>我的喜欢</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="circle" size="25" class="mb-5"/>
        <span>我的圈子</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="underway-o" size="25" class="mb-5"/>
        <span>历史浏览</span>
      </van-grid-item>
    </van-grid>

    <h3 style="margin: 20px;">创作中心</h3>
    <van-grid :gutter="0" :column-num="3" class="fs-12">
      <van-grid-item>
        <van-icon name="flag-o" size="25" class="mb-5" />
        <span>热门活动</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="idcard" size="25" class="mb-5"/>
        <span>我的合集</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="records" size="25" class="mb-5"/>
        <span>草稿箱</span>
      </van-grid-item>
    </van-grid>
    <van-grid :gutter="0" :column-num="3" class="fs-12">
      <van-grid-item>
        <van-icon name="bar-chart-o" size="25" class="mb-5" />
        <span>我的统计</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="gold-coin-o" size="25" class="mb-5"/>
        <span>赏金任务计划</span>
      </van-grid-item>
      <van-grid-item>

      </van-grid-item>
    </van-grid>

    <h3 style="margin: 20px;">玩一玩</h3>
    <van-grid :gutter="0" :column-num="3" class="fs-12">
      <van-grid-item>
        <van-icon name="apps-o" size="25" class="mb-5" />
        <span>测一测</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="notes-o" size="25" class="mb-5"/>
        <span>次元星计划</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="bullhorn-o" size="25" class="mb-5"/>
        <span>本命生贺应援</span>
      </van-grid-item>
    </van-grid>
    <br><br><br>

  </div>
</template>

<script>
  import NavbarTab from '../../components/main-page-component/navbar-tab'

  export default {
    name: "",
    components: {
      NavbarTab,
    },
    data(){
      return{
        myUser:{}, //当前登录的用户的对象
        isUserLogin:false, //用户是否登录了
        userTags: [], //用户的个人标签3个
      }
    },
    created() {


      setTimeout(() => {
        // var uid = this.$route.params.uid;
        var uid = this.$store.state.user.uid;
        //获取当前的用户
        axios.get("/api/selectUserByUid?uid=" + uid)
            .then(res => {
              console.log(res.data)
              this.myUser = res.data
              this.isUserLogin = true
            })

        //获取用户的个人标签
        axios.get("/api/getUserTagByUid?uid=" + this.$store.state.user.uid)
            .then(res => {
              console.log("这里是用户全部的个人标签")
              console.log(res.data)
              this.userTags = res.data
            })

      }, 1000)
    },
    methods:{
      gotoUserMessage(){
        this.$router.replace("/recommend-page")
      },
      gotoUserLike(){
        this.$router.replace("/user-like")
      }
    }
  }
</script>

<style scoped>
  .fs-12{
    font-size: 12px;
  }
  .mb-5{
    margin-bottom: 5px;
  }
  .cp{
    cursor: pointer;
  }
  .op-5{
    opacity: 0.5;
  }


</style>