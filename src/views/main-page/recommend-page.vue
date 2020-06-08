<template>
  <div>

<!--    <van-button type="primary" text="显示遮罩层" @click="isUserNoLogin = true" />-->
    <van-overlay :show="isUserNoLogin" @click="isUserNoLogin = false">
      <div class="wrapper" @click.stop>
        <div class="block" />
        <br>
        <!-- 图标位置 -->
        <van-popup
                v-model="isUserNoLogin"
                closeable
                close-icon-position="top-left"
                position="bottom"
                :style="{ height: '80%' }">
          <br><br><br>
          <h2 style="margin: 20px">登录半次元</h2>
          <br>
          <van-form @submit="onSubmit">
            <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <br>
            <div style="text-align: center">
              <el-link>账号注册</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>密码登录</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>随便看看></el-link>
            </div>

            <div style="margin: 16px;">
              <van-button color="linear-gradient(to right, #fa4b23, #fa4b8b)" block round>
                登录
              </van-button>
            </div>

            <van-grid :border="false" :column-num="3">
              <van-grid-item>
                <van-image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591597594698&di=60f3a1cc77699b1a3f3975fcdf6e99cd&imgtype=0&src=http%3A%2F%2Fsimg.53shop.com%2F2020%2F5%2F9%2F172972.jpg" />
                <span>qq</span>
              </van-grid-item>
              <van-grid-item>
                <van-image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591597835437&di=64dda5323f30c1266bfedcada5f64917&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F91%2F37%2F6056f16914c145a.jpg" />
                <span>微信</span>
              </van-grid-item>
              <van-grid-item>
                <van-image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591597860987&di=a183b2cb86f197429a1f2c101c287af2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc4aae24f100d72524ae9d193c63345eb8661d88e1644c-ru4VMZ_fw658" />
                <span>微博</span>
              </van-grid-item>
            </van-grid>


          </van-form>
        </van-popup>


      </div>
    </van-overlay>

    <!--底部的标签栏-->
    <navbar-tab></navbar-tab>

    <!--顶部的标签栏-->
    <van-tabs v-model="active" swipeable sticky v-if="!isUserNoLogin">
      <van-tab title="发现" name="发现">
        <water-fall-all-content v-for="(item,index) in waterFallAllContent01"
                                :water-all-content="item">

        </water-fall-all-content>
       <!-- <van-action-sheet
                v-model="show"
                :actions="actions"
                cancel-text="取消"
                close-on-click-action
                @cancel="onCancel"
        />-->

      </van-tab>
      <van-tab title="动画">
      哈哈哈哈哈
      </van-tab>
      <van-tab title="cos"></van-tab>
      <van-tab title="精选"></van-tab>
      <van-tab title="游戏"></van-tab>
      <van-tab title="绘画"></van-tab>
      <van-tab title="写作"></van-tab>
      <van-tab title="新番"></van-tab>
      <van-tab title="手工"></van-tab>
      <van-tab title="情感"></van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import WaterFallAllContent from '../../components/waterfall-all-component/waterfall-all-content'
  import NavbarTab from '../../components/main-page-component/navbar-tab'

  import { Toast } from 'vant';
  export default {
    name: "",
    components:{
      WaterFallAllContent,
      NavbarTab,
    },
    data(){
      return{
        waterFallAllContent01:[], //所有的内容

        active:'发现', //上面的标签栏，滑动切换
        isUserNoLogin:false, //用户是否登录
        username: '', //用户名称
        password: '', //用户密码


      }
    },
    methods:{
      onCancel() {
        Toast('取消');
      },

      //用户登录
      onSubmit(values) {
        console.log('submit', values);
      },

    },
    created() {

      if (this.$store.state.user.uid == null || this.$store.state.user.uid == ""){
        this.isUserNoLogin = true
      }else {

        this.isUserNoLogin = false

      }



      //奇数页所有作品的展示，未登录版
      // axios.get("http://localhost:8090/listAllContentPaging")
      this.$axioss.get("/api/listAllContentPaging")
          .then(res => {
            if (res.data != null) {
              console.log("这里是全部的内容的奇数分页版");
              console.log(res.data)
              this.waterFallAllContent01.push(res.data.list)
              this.waterContentLoading01 = false
            }
          })
    }
  }
</script>

<style scoped>

</style>