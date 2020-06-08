<template>
  <div>
    <van-tabbar v-model="navBar" route>
      <van-tabbar-item icon="home-o" replace to="/recommend-page">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" replace to="/question-page" dot>问答</van-tabbar-item>
      <!--中间的点击添加内容按钮-->
      <van-tabbar-item>
        <van-button color="linear-gradient(to right, #fa4b8b, #fa4b8b)"
                    size="normal"
                    @click="show = true">
          <van-icon name="plus" size="20"></van-icon>
        </van-button>
      </van-tabbar-item>
      <van-tabbar-item icon="search" badge="5">探索</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" badge="20"  replace to="/user-page">我的</van-tabbar-item>
    </van-tabbar>
    <van-action-sheet v-model="show" title="发布内容"  cancel-text="取消">
      <div class="content">
        <van-card
                desc="绘画，cos，手办，表情包"
                title="图片"
                thumb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAdVBMVEUAAAB2yEF2yUB2ykJ4yEWA0FB3yUJ3ykJ4yUJ3yUN2ykJ6yER3y0d9yEZ3yUJ2yEN5y0X///92yD91yEJ2yEJ7zkJ2ykF1yUCz4ZaW1m6t342g2nyl3IOT1WqDzlN9zEuu34+a13SO0mOI0Fp6y0eq3Yma13NU+B35AAAAF3RSTlMAZuNIFAhWQDRRLSIaDE06JwHuX1wfkVo4AEIAAAEGSURBVEjH7dHbjoIwEIBhobQcFVh1mRYUT7vv/4gLzaKBaTuGxMRE/otezZdO2tXS0rvF10GWFkkUsk28CVyTpR5NorwbFTtv1K40Gx7GYuu54mYYelSWXQUJMzOMSbhHhvmVs69vDQsEkUNSwwTBikzDaC7M58LQDKVS0g2ZEUrokk4YG6HqoXJCMRdu567qlc88Tl1jyBHEnQHOCK5peIWu6xQGJLydeni6TeDeAeum7U/Q1ROY2qEEaKrqAv9dxjCxwiN0/bZwrx3ByAp/oE89YDOCuQ1KQB3oG/WiuOMDCm6BDWbDyxZpFgzfj+EBwLYrIgN09BLoU863QOYTjq2Wlj6rP/GqVBQ6EojHAAAAAElFTkSuQmCC"
                @click="gotoImgInput()" />
        <van-card
                desc="小说，漫评，影评"
                title="文字"
                thumb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAARVBMVEUAAAD6rTD6rC/8rzH7rjL2qi/6qy/7rjH6rC/80Yz7yXn6rjT8zoX6tkn6uVD80In7zH77xnD7wWT6sj77xGz6sTv7vluPQmV9AAAACHRSTlMAZt5ZQhvrjU1b8gYAAADpSURBVEjH7dXJEsIgDIBhu6hhLdDl/R/VICrtgQzpjDM98J+4fAbSg7dW69vYQ6l+pCC6sqQgUF0PSvFLHmDXdcOdgGJXEsZLFWGUjIlqEcKliVj9G1eHv2D4cNboNqiBcr8YFectUAUPi/F40MGv3Ik2nbVivlHpBA0wYUjOQhWU+QtO8TgZqIN5NVt6oJ6ZE5XOq2G9EVfKuWrOvZ2fgQlNZA7HceGCt7QAbIjfws3AgXk10fGhFwFYMN90PQWt8HAKBmHPQROAD3P/hz3hHhQc+7J7JkjUFbogHAg3UPBelvj/2Gp9egEBOSF8OsSejgAAAABJRU5ErkJggg=="/>
        <van-card
                desc="如何看待？为何喜欢"
                title="提问"
                thumb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAkFBMVEUAAABJjO5JjO1Jju9LlPRJjO5NkvNIjO5JjO1Ji+5VpPpJjO5JjO1JjO5KjO5JjO5Lje5Lju9qlf9Li+1Jje1Jje1Nj+9JjO1KjO1JjO1KjO5JjO5Ije5LkO5Ij+9PjO9Ji+1KjO9HjO1Ni/BIi+2av/Vim+9Uk+6Ot/NMje6Uu/SJs/N1p/GPuPOArvJ/rvL4Td6/AAAAJHRSTlMAZvJhF+ELwPaWBvnIs5JKRjwHgnRXKufZ2JtbLi0gE+4fgSEbMP8oAAABVElEQVRIx+3TyVLDMAyA4diOs+9p0r1QEE034P3fDnBw2xRZCcOBS/5bD99I7ijW2Nj/F2S+O+N85vpZ8Atm+xwucd8eyIpSM03LYtC4CH4UDRi6loAk173zlENkz8wiAkMR/c4SjJXkotwMObWsD0Q+cS+cgjwwwgzIMmJTstgxQZeGc7ExwBkNp4wZDojT0GOM4TO9fijQd8q+VT/LMRjRcM6+wkYmNHQVrBFYQdvupdMO2hIFUwQ6nIIeU1UW0gJUh/2t23c2ZQKD2xBUzeuNa0AVTjQkRsLhTbv3g75U1rbsudbmfDoeT+dG/5bsuxRzDyEYepxouMKgMLon7USAwdjgZDvPeHKOunIe3y0cxuyabXiiTLLA2i74lXluO456olXXenaVRFOPy7mbsG6pNaiNYPcVw6STX4TIn/Pl9bPqp3VaCbFMV4H6G2xrbOyPfQBb3nOcbPZhjgAAAABJRU5ErkJggg=="/>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        navBar:'' , //底部的导航栏，点击切换
        show: false, //添加内容的显示
      }
    },
    methods:{
      //填写图片作品
      gotoImgInput(){
        this.$router.replace("/img-input")
      },
    },
    created() {
      //页面加载时，获取当前激活的路径作为激活状态
      this.navBar = this.$route.path
      if (this.$route.path == '/') {
        this.navBar = "/recommend-page"
      }
    }
  }
</script>

<style scoped>

</style>