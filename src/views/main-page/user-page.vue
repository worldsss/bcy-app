<template>
  <div>
    <navbar-tab></navbar-tab>

    <van-row gutter="20" style="margin: 15px">
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


    <h3 style="margin: 20px;">个人中心</h3>
    <van-grid :gutter="10" :column-num="3" class="fs-12">
      <van-grid-item  @click="gotoUserMessage()">
        <van-icon name="bullhorn-o" size="25" class="mb-5" />
        <span>我的消息</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="envelop-o" size="25" class="mb-5"/>
        <span>我的私信</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="flower-o" size="25" class="mb-5"/>
        <span>我的勾搭</span>
      </van-grid-item>
    </van-grid>
    <van-grid :gutter="10" :column-num="3" class="fs-12">
      <van-grid-item>
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
    <van-grid :gutter="10" :column-num="3" class="fs-12">
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
    <van-grid :gutter="10" :column-num="3" class="fs-12">
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
    <van-grid :gutter="10" :column-num="3" class="fs-12">
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
    methods:{
      gotoUserMessage(){
        this.$router.replace("/recommend-page")
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


</style>