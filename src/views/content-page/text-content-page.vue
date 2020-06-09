<template>
  <div>

    <!--作品顶部标签栏-->
    <van-sticky>
      <van-nav-bar title=""
                   left-text="返回"
                   left-arrow @click-left="$router.replace('/recommend-page')">
        <template #right>
          <van-icon name="more-o"></van-icon>
        </template>
      </van-nav-bar>
    </van-sticky>

    <!--文字作品的介绍区域-->
    <div style="padding: 10px">
      <van-row :gutter="5" style="padding: 0px">
        <van-col span="4">
          <van-image
                  round
                  width="50px"
                  height="50px"
                  :src="nowUser.userAvatar"/>
        </van-col>
        <van-col span="15" style="margin-top: 5px;">
          <span>{{nowUser.userName}}</span>
          <br>
          <p class="user-info-hiddle">{{nowUser["userInfo"]}}</p>
        </van-col>
        <van-col span="5" style="margin-top: 10px;">
          <van-button color="#fa4b8b" style="border-radius: 5px" size="small">关注</van-button>
        </van-col>
      </van-row>
    </div>
    <el-card v-html="pcContent.pcInfo"
             class="pc-info"
             v-show="pcContent.pcInfo!='发布文字'"></el-card>

    <div v-html="pcContent.pcContent"
         class="pc-content"
         id="pcContent" @click="showImg()"></div>

   <!-- <van-image-preview v-model="show" :images="images" @change="onChange" :show-indicators="show">
      <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>-->
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        pcContent:{}, //文字作品的内容
        nowUser: {}, //当前作品的用户信息
        show: false,
        index: 0,
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],
        userFansByPcidAndUid: { //根据作品获取对应的用户信息，顺便判断一下当前登录用户是否是作品用户的粉丝
          pcid: 0,
          uid: 0,
        },

      }
    },
    created() {
      var pcid = this.$route.params.pcid
      //查询当前作品的所有标签

      //根据pcid来获取作品内容
      axios.get("/api/selectPcIndexByPcid?pcid=" + pcid)
          .then(res => {
            console.log(res)
            this.pcContent = res.data
            console.log(this.pcContent)

          })


      setTimeout(()=>{

        //据作品获取对应的用户信息，顺便判断一下当前登录用户是否是作品用户的粉丝
        this.userFansByPcidAndUid.pcid = pcid;
        this.userFansByPcidAndUid.uid = this.$store.state.user.uid
        axios.post("/api/getUserForPcidAndUid", this.userFansByPcidAndUid)
            .then(res => {
              if (res.data != null) {
                this.nowUser = res.data
                console.log("这里的作品的用户是")
                console.log(this.nowUser)
              }
            })

      },500)

    },
    methods: {
      onChange(index) {
        this.index = index;
      },
      showImg() { //展示文字内容的图片
        this.show = true
      },

    },
  }
</script>

<style>
  /*内容页面的图片展示*/
  #pcContent img{
    width: 100%;
    height: auto;
    cursor: pointer;
  }
</style>
<style scoped>

  .pc-info {
    background-color: #f5f5fa;
    line-height: 50px;
    font-size: 16px;
    color: #a1a1b1;
    text-indent: 2em;
    border-radius: 5px;
  }
  .pc-content{
    width: 95%;
    margin: 0 auto;
  }
  .pc-content img{
    width: 200px !important;
    height: 100px;
    display: none;

  }

  .content-rigth-userInfo {
    text-align: center;
    margin-bottom: 10px;
    position: sticky; /*粘附功能，随着屏幕滚动吸附到屏幕上*/
    /*top: 50px;*/
    top: 70px;

  }

  /*  .content-rigth-userInfo-fixed{
        position: fixed;
    }*/
  .bcy-buttons-visited {
    background-color: #e5e5e5 !important;
    color: #a1a1a6 !important;
    border-bottom: 1px solid #a1a1a6;
  }

  .givelike-icon {
    color: #ff6fa2;
  }

</style>