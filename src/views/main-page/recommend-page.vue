<template>
  <div>



    <!--用户未登录时显示-->
    <van-overlay :show="isUserNoLogin" @click="isUserNoLogin = false">
      <div class="wrapper" @click.stop>
        <div class="block"/>
        <br>
        <!-- 图标位置 -->
        <van-popup
                v-model="isUserNoLogin"
                closeable
                close-icon-position="top-left"
                position="bottom"
                :style="{ height: '80%' }" closed="nerverShowLogin()">
          <br><br><br>
          <h2 style="margin: 20px">登录半次元</h2>
          <br>
          <van-form @submit="onSubmit">
            <van-field
                    v-model="user.userName"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="user.userPassword"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />

            <van-cell title="自动登录">
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <template #right-icon>
                <!--是否进行登录-->
                <van-switch v-model="isAutoLogin" size="16px"/>
              </template>
            </van-cell>
            <br>

            <div style="margin: 16px;">
              <van-button color="linear-gradient(to right, #fa4b23, #fa4b8b)" block round>
                登录
              </van-button>
            </div>
            <div style="text-align: center">
              <el-link>账号注册</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>密码登录</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>随便看看></el-link>
            </div>

            <van-grid :border="false" :column-num="3">
              <van-grid-item>
                <van-image
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591597594698&di=60f3a1cc77699b1a3f3975fcdf6e99cd&imgtype=0&src=http%3A%2F%2Fsimg.53shop.com%2F2020%2F5%2F9%2F172972.jpg"/>
                <span>qq</span>
              </van-grid-item>
              <van-grid-item>
                <van-image
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591597835437&di=64dda5323f30c1266bfedcada5f64917&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F91%2F37%2F6056f16914c145a.jpg"/>
                <span>微信</span>
              </van-grid-item>
              <van-grid-item>
                <van-image
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591597860987&di=a183b2cb86f197429a1f2c101c287af2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc4aae24f100d72524ae9d193c63345eb8661d88e1644c-ru4VMZ_fw658"/>
                <span>微博</span>
              </van-grid-item>
            </van-grid>


          </van-form>
        </van-popup>


      </div>
    </van-overlay>

    <!--底部的标签栏-->
    <navbar-tab></navbar-tab>

    <!--下拉刷新-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--顶部的标签栏-->
      <van-tabs v-model="active" swipeable sticky v-if="!isUserNoLogin" ref="waterFallImg">
        <van-tab title="发现" name="1" >
          <div  style="height: 100%">
            <!--按照时间顺序排序的所有作品-->
            <water-fall-all-content v-for="(item,index) in waterFallAllContent01"
                                    :water-all-content="item">

            </water-fall-all-content>
          </div>

        </van-tab>
        <!--cos标签内容作品的展示-->
        <van-tab title="cos" name="2">
          <van-swipe class="my-swipe" style="width: 100%;height: 150px" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in carouselImg" :key="index">
              <img v-lazy="image" height="150"/>
            </van-swipe-item>
          </van-swipe>

          <van-row>
            <van-col :span="12">
              <h3>全站cos榜单</h3>
            </van-col>
            <van-col :span="12" style="text-align: right">
              <p style="padding: 0px 10px">
                <el-link type="primary">查看全部</el-link>
              </p>
            </van-col>
          </van-row>

          <!--cos榜单的展示-->
          <el-row>
            <page-ranking :rankinto="ranksinto01"></page-ranking>
          </el-row>

          <!--cos榜单的展示-->
          <water-fall-imgs v-for="(item,index) in allWaterFallImgsPage01"
                           :water-imgs="item">

          </water-fall-imgs>

        </van-tab>
        <van-tab title="动画" name="3">
          哈哈哈哈哈
        </van-tab>
        <van-tab title="精选" name="4"></van-tab>
        <van-tab title="游戏"></van-tab>
        <van-tab title="绘画"></van-tab>
        <van-tab title="写作"></van-tab>
        <van-tab title="新番"></van-tab>
        <van-tab title="手工"></van-tab>
        <van-tab title="情感"></van-tab>
      </van-tabs>
    </van-pull-refresh>


  </div>
</template>

<script>
  import WaterFallAllContent from '../../components/waterfall-all-component/waterfall-all-content'
  import WaterFallImgs from '../../components/waterfall-all-component/WaterFall-All-Imgs'
  import NavbarTab from '../../components/main-page-component/navbar-tab'
  import PageRanking from '../../components/main-page-component/Page-Rankings'

  import {Toast} from 'vant';

  export default {
    name: "",
    components: {
      WaterFallAllContent,
      WaterFallImgs,
      NavbarTab,
      PageRanking,
    },
    data() {
      return {
        waterFallAllContent01: [], //所有的内容
        isLoading:false, //页面下拉刷新加载动画
        active: '1', //上面的标签栏，滑动切换
        isUserNoLogin: false, //用户是否登录
        username: '', //用户名称
        password: '', //用户密码
        isAutoLogin: true, //是否下次自动登录
        user: { //用户登录信息
          uid: 0,
          userName: '',
          userPassword: '',
        },
        carouselImg: [ //活动的轮播图
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],
        ranksinto01:[], //cos周榜
        allWaterFallImgsPage01:[], //cos的所有图片作品

        pageSize: 10, //页面几页
        pageNumber: 1, //当前页数,
        pageNumberText: 1,//当前文字页数
        pageNumberImg: 1,//当前图片页数
        textCute: [], //文字内容
        allWaterFallImgs: [], //图片瀑布流的样式
        allWaterFallData: [],
        allWaterFallText: [], //文字瀑布流
        isScrollDown: false,
        hotTags: [], //推荐的热门圈子

        loadNextPageText: 0, //加载下一页文字
        loadNextPageImg: 0, //加载下一页图片
        waterImgLodding: true, //页面加载显示

        waterFallAllContent02: [], //第二页的所有作品展示

        pageNumberContent01: 1, //奇数页的作品展示页数
        pageNumberContent02: 2, //偶数页的作品展示页数

        waterContentLoading01:true, //奇数页加载显示
        waterContentLoading02:true, //奇数页加载显示
      }
    },
    created() {

      setTimeout(() => {

        //用户没有登录时展示登录半次元信息
        if (this.$store.state.user.uid == null || this.$store.state.user.uid == "") {
          //当前用户没有登录
          this.isUserNoLogin = true;
        } else {
          //当前用户已经登录了
          this.isUserNoLogin = false;

        }

      }, 1500)


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

      //cos周榜
      axios.get("/api/selectProContentOrderByPrGivelikeLimitSevenAndTagCosOnWeek")
          .then(res => {
            console.log(res.data)
            this.ranksinto01 = res.data
            var objes = this.ranksinto01[0];
            this.rankbigs = objes
            console.log("这里是第一个值")
            console.log(res.data[0])

          })

      //奇数页的展示
      axios.get("/api/getProIndexByTid?tid=11")
          .then(res => {
            console.log(res.data)
            this.allWaterFallImgsPage01.push(res.data.list)

          })


      //滚动条到底部后进行加载下一页
      var _this = this
      window.onscroll = function () {
        // console.log("这里是地址栏的内容")
        // console.log(_this.$route.path)
        if (_this.$route.path == "/recommend-page") {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

          //当滚动条滚动到最低部时
          if (scrollTop + windowHeight == scrollHeight) {

            //发送翻页的axios的请求发送
            this.isScrollDown = true
            //写后台加载数据的函数
            console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
            console.log("发送啊")
            console.log("这里为什么会有这里的功能来着？？")
          }
          var waterImgHeight = _this.$refs.waterFallImg.$el.offsetHeight;
          // console.log("这里是滚动条高度"+scrollTop)
          // console.log("这里是图片区域高度"+waterImgHeight)
          //当文字的高度超过顶部的高度时，开始加载下一页
          if (scrollTop > (waterImgHeight - 2000)) {
            console.log("加载啊啊啊啊啊啊啊啊啊啊")
            _this.loadNextPageImg++;
          } else {
            _this.loadNextPageImg = 0;
          }

          //奇数页的图片加载
          if (_this.loadNextPageImg == 1) {
            _this.pageNumberContent01 += 1;
            //未登录版
            if (_this.$store.state.user.uid == "" && _this.$store.state.user.uid == null) {

              //所有作品的展示,未登录版
              axios.get("/api/listAllContentPaging?pageSize=10&pageNumber=" + _this.pageNumberContent01)
                  .then(res => {
                    if (res.data != null) {
                      console.log("这里是全部的内容分页版的下一页");
                      console.log(res.data)
                      _this.waterFallAllContent01.push(res.data.list)
                    }
                  })
            } else {
              //未录版
              //所有作品的展示,登录版
              axios.get("/api/listAllContentPagingOnLogin?uid=" + _this.$store.state.user.uid + "&pageSize=10&pageNumber=" + _this.pageNumberContent01)
                  .then(res => {
                    if (res.data != null) {
                      console.log("奇数页的作品展示下一页");
                      console.log(res.data)
                      _this.waterFallAllContent01.push(res.data.list)
                    }
                  })


            }

          }

        } else {
          console.log("不是当前的页面")
        }

      }



    },
    methods: {
      onCancel() {
        Toast('取消');
      },

      //用户登录
      onSubmit(values) {
        console.log('submit', values);
        this.isUserNoLogin = false

        //没有选中自动登录时
        if (this.isAutoLogin == false) {
          //用户登录
          axios.post("/api/userLogin", this.user)
              .then(res => {
                console.log(res.data)
                if (res.data != '') {
                  this.$message({
                    message: '登录成功!',
                    type: 'success',
                    offset: 100
                  });
                  // this.user.uid = res.data

                  this.user = res.data
                  this.$store.commit('addUserName', this.user)

                  //试了半天，发现组件对vuex的判断比我发出请求到接受到session再赋值给vuex要快的多，没办法使用前端自己的session
                  sessionStorage.setItem("userName", this.user.userName)
                  sessionStorage.setItem("uid", this.user.uid)
                  sessionStorage.setItem("useAvatar", this.user.userAvatar)

                  this.$router.replace("/")
                } else {
                  alert("登录失败，请重新输入用户名或密码!")
                }


              })
        } else {
          //用户登录
          axios.post("/api/userAutoLogin", this.user)
              .then(res => {
                console.log(res.data)
                if (res.data != '') {
                  this.$message({
                    message: '登录成功!',
                    type: 'success',
                    offset: 100
                  });

                  this.user = res.data
                  this.$store.commit('addUserName', this.user)

                  //试了半天，发现组件对vuex的判断比我发出请求到接受到session再赋值给vuex要快的多，没办法使用前端自己的session
                  sessionStorage.setItem("userName", this.user.userName)
                  sessionStorage.setItem("uid", this.user.uid)
                  sessionStorage.setItem("useAvatar", this.user.userAvatar)

                  this.$router.replace("/")
                } else {
                  alert("cookie的登录失败，请重新输入用户名或密码!")
                }


              })
        }
      },
      //退出一次后再也不展示
      nerverShowLogin() {
        this.isUserNoLogin = false
      },
      //刷新完成加载消息提示
      onRefresh() {
        setTimeout(() => {
          Toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 1000);
      },

    },

  }
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>