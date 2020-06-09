<template>
  <div>

    <page-tags v-for="(item,index) in rankinto"
               v-if="index!=0" v-show="index>=4" :rankbackcolor="changeBack(index)">
      <div class="img-rank-div imgs-a" slot="img">

        <img :src="item.prImg"
             class="image-small"
             @click="hrefContent(item.prid)"
             :style="judgeImgWidth(item)" >
      </div>

      <el-avatar slot="avatar"
                 :size="30"
                 :src="item.userAvatar"
                 style="float: left">

      </el-avatar>
      <span slot="name">
                {{item.userName}}
            </span>
      <span slot="img-counts">
<!--                {{item.prGivelike}}-->
      {{index+1}}
      </span>
      <span slot="img-giveup">
                {{item.prGivelike}}
            </span>
    </page-tags>
  </div>
</template>

<script>
  import PageTags from "../main-page-component/Page-Tags"

  export default {
    name: "",
    components: {
      PageTags
    },
    props: {
      rankinto: {
        type: Array,
        default() {
          return [
            {img: '23.jpg', avator: '3.jpg', name: '用户1', counts: 1, giveup: 1200, back: 'background-color:#fa5757'},
            {img: '16.jpg', avator: '3.jpg', name: '用户2', counts: 2, giveup: 100, back: 'background-color:#ffa008'},
            {img: '33.jpg', avator: '3.jpg', name: '用户3', counts: 3, giveup: 2543, back: 'background-color:#fa5757'},
          ]
        }
      },
      rankbackcolor: {
        type: String,
        default: 'background-color:#a1a1a6'
      }
    },
    data() {
      return {
        ranks: [
          {img: '2.jpg', avator: '3.jpg', name: '用户1'},
          {img: '2.jpg', avator: '3.jpg', name: '用户2'},
          {img: '2.jpg', avator: '3.jpg', name: '用户3'},
        ]
      }
    },
    computed: {
      changeBack() {
        return function changecolor(index) {
          switch (index) {
              // case 1:return 'background-color:#fa5757';break;
            case 1:
              return 'background-color:#ffa008';
              break;
            case 2:
              return 'background-color:#f8d53c';
              break;
          }
        }
      },
      judgeImgWidth() {
        return function (item) {
          // 创建对象
          var img = new Image();

          // 改变图片的src
          img.src = item.prImg;

          // 判断是否有缓存
          if (img.complete) {
          } else {
            // 加载完成执行
            img.onload = function () {
              // 打印
              console.log('width:' + img.width + ',height:' + img.height)
            };
          }

          // if(img.width<660){
          //用来判断当前的图片是否是横向
          if (img.height > img.width) {
            // if(img.width / img.height ==2){
            console.log('width:' + img.width + ',height:' + img.height)
            return 'width:100%;'
          } else {
            return ''
          }

        }

      }
    },
    methods: {
      hrefContent(index) {
        axios.get("http://localhost:8090/updateProContentPrClickByPrid?prid=" + index)
            .then(res => {
              console.log("访问量成功加了没有" + res.data)
              console.log(res.data)
            })


        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/content/' + index});
        window.open(routeData.href, '_blank');

      },
    }
  }
</script>

<style scoped>

  .img-rank-div {
    width: 100%;
    /*height: 250px;*/
    height: 180px;
    overflow: hidden;
    border-radius: 10px;
  }


  .image-small {
    /*width: 100%;*/
    height: 180px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    /*right: 50%;*/
  }

  .imgs-a {
    width: 100%;
    display: block;
    /*height: 250px;*/
    height: 180px;
  }


  .imgs-a:hover + .img-shade {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .img-shade {
    opacity: 0;
    width: 100%;
    height: 30px;
    position: absolute;
    top: 5px;
    text-align: right;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 10px 10px 10px 1px black inset;
  }


</style>