<template>
  <div>
    <el-row :gutter="10"
            style="margin: 10px 0px"
            v-for="(item,index) in userCollect" v-if="index%3==0">

      <el-col :span="8" class="my-like-img-height"
              v-if="(userCollect[index]).pcIndex!=null && userCollect[index]!=null">
        <div class="user-collect-div">
          <img :src="(userCollect[index]).pcIndex.pcFirstImg"
               :style="judgeImgWidth(userCollect[index].pcIndex.pcFirstImg)"
               class="my-rank-img"
               @click="gotoTextContent(userCollect[index].pcIndex.pcid)"/>
        </div>
      </el-col>

      <!--      <el-col :span="8" class="my-like-img-height" v-if="(userCollect[index]).proIndex!=null">-->
      <el-col :span="8" class="my-like-img-height" v-else-if="userCollect[index]!=null">
        <div class="user-collect-div">
          <img :src="(userCollect[index]).proIndex.prImg"
               :style="judgeImgWidth(userCollect[index].proIndex.prImg)"
               class="my-rank-img"
               @click="gotoImgContent(userCollect[index].proIndex.prid)"/>
        </div>
      </el-col>

      <div v-if="(userCollect[index+1])!=null">
        <el-col :span="8" class="my-like-img-height"
                v-if="(userCollect[index+1]).pcIndex!=null && userCollect[index+1]!=null">
          <!--            v-if="(userCollect[index+1]).pcIndex!=null &&index+1 <= userCollect.length">-->
          <!--            v-if="(userCollect[index+1]).pcIndex!=null && (userCollect[index+1])!=null">-->
          <div class="user-collect-div">
            <img :src="(userCollect[index+1]).pcIndex.pcFirstImg"
                 :style="judgeImgWidth(userCollect[index+1].pcIndex.pcFirstImg)"
                 class="my-rank-img"
                 @click="gotoTextContent(userCollect[index+1].pcIndex.pcid)"/>
          </div>
        </el-col>

        <!--      <el-col :span="8" class="my-like-img-height" v-if="(userCollect[index+1]).proIndex!=null">-->
        <!--      <el-col :span="8" class="my-like-img-height" v-else>-->
        <el-col :span="8" class="my-like-img-height"
                v-else-if="userCollect[index+1]!=null">
          <!--            v-if="(userCollect[index+1]).pcIndex==null && index+1 <= userCollect.length">-->
          <div class="user-collect-div" v-if="(userCollect[index+1])!=null">
            <img :src="(userCollect[index+1]).proIndex.prImg"
                 :style="judgeImgWidth((userCollect[index+1]).proIndex.prImg)"
                 class="my-rank-img"
                 @click="gotoImgContent(userCollect[index+1].proIndex.prid)"/>
          </div>
        </el-col>

        <div v-if="(userCollect[index+2])!=null">
          <el-col :span="8" class="my-like-img-height"
                  v-if="(userCollect[index+2]).pcIndex!=null && userCollect[index+2]!=null">
            <div class="user-collect-div" v-if="(userCollect[index+1])!=null">
              <img :src="(userCollect[index+2]).pcIndex.pcFirstImg"
                   :style="judgeImgWidth(userCollect[index+2].pcIndex.pcFirstImg)"
                   class="my-rank-img"
                   @click="gotoTextContent(userCollect[index+2].pcIndex.pcid)"/>
            </div>
          </el-col>

          <!--    <el-col :span="8" class="my-like-img-height" v-else>-->
          <el-col :span="8" class="my-like-img-height"
                  v-else-if="userCollect[index+2]!=null">
            <div class="user-collect-div">
              <img :src="(userCollect[index+2]).proIndex.prImg"
                   :style="judgeImgWidth((userCollect[index+2]).proIndex.prImg)"
                   class="my-rank-img"
                   @click="gotoImgContent(userCollect[index+2].proIndex.prid)"/>
            </div>
          </el-col>
        </div>

      </div>


      <!--

            <el-col :span="8" class="my-like-img-height" v-if="(userCollect[index]).proIndex!=null">
              <div class="user-collect-div">
                <img :src="(userCollect[index]).proIndex.prImg"
                     :style="judgeImgWidth(userCollect[index].proIndex.prImg)"
                     class="my-rank-img"
                     @click="gotoContent(userCollect[index].proIndex.prid)"/>
              </div>
            </el-col>

            <el-col :span="8" class="my-like-img-height" v-if="(userCollect[index+1]).proIndex!=null">
              <div class="user-collect-div">
                <img :src="(userCollect[index+1]).proIndex.prImg"
                     :style="judgeImgWidth((userCollect[index+1]).proIndex.prImg)"
                     class="my-rank-img"
                     @click="gotoContent(userCollect[index+1].proIndex.prid)"/>
              </div>
            </el-col>

            <el-col :span="8" class="my-like-img-height" v-if="(userCollect[index+2]).proIndex!=null">
              <div class="user-collect-div">
                <img :src="(userCollect[index+2]).proIndex.prImg"
                     :style="judgeImgWidth((userCollect[index+2]).proIndex.prImg)"
                     class="my-rank-img"
                     @click="gotoContent(userCollect[index+2].proIndex.prid)"/>
              </div>
            </el-col>

      -->


      <!-- <el-col :span="8" class="my-like-img-height">
         <div class="user-collect-div"  v-if="(userCollect[index]).proIndex!=null">
           <img :src="(userCollect[index]).proIndex.prImg!=null?(userCollect[index]).proIndex.prImg:''"
                :style="judgeImgWidth(userCollect[index].proIndex.prImg)"
                class="my-rank-img"
                @click="gotoImgContent(userCollect[index].proIndex.prid)"/>
         </div>
         <div v-else>
           <img :src="(userCollect[index]).pcIndex.pcFristImg"
                :style="judgeImgWidth(userCollect[index].pcIndex.pcFristImg)"
                class="my-rank-img"
                @click="gotoTextContent()"/>
         </div>
       </el-col>
       <el-col :span="8" class="my-like-img-height">
         <div class="user-collect-div" v-if="(userCollect[index+1]).proIndex!=null">
           <img :src="(userCollect[index+1]).proIndex.prImg"
                :style="judgeImgWidth(userCollect[index+1].proIndex.prImg)"
                class="my-rank-img"
                @click="gotoImgContent(userCollect[index+1].proIndex.prid)"/>
         </div>
         <div v-if="(userCollect[index+1]).pcIndex!=null">
           <img :src="(userCollect[index+1]).pcIndex.pcFristImg"
                :style="judgeImgWidth(userCollect[index+1].pcIndex.pcFristImg)"
                class="my-rank-img"
                @click="gotoTextContent()"/>
         </div>
       </el-col>


       <el-col :span="8" class="my-like-img-height">
         <div class="user-collect-div" v-if="(userCollect[index+2]).proIndex!=null">
           <img :src="(userCollect[index+2]).proIndex.prImg"
                :style="judgeImgWidth(userCollect[index+2].proIndex.prImg)"
                class="my-rank-img"
                @click="gotoImgContent(userCollect[index+2].proIndex.prid)"/>
         </div>
         <div v-if="(userCollect[index+2]).pcIndex!=null">
           <img :src="(userCollect[index+2]).pcIndex.pcFristImg"
                :style="judgeImgWidth(userCollect[index+2].pcIndex.pcFristImg)"
                class="my-rank-img"
                @click="gotoTextContent()"/>
         </div>
       </el-col>
  -->

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      userCollect: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      gotoImgContent(index) {
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/content/' + index});
        window.open(routeData.href, '_blank');
      },
      gotoTextContent(index) {
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/text-content/' + index});
        window.open(routeData.href, '_blank');
      }
    },
    computed: {
      //判断当前图片朝向
      judgeImgWidth() {
        return function (item) {
          // 创建对象
          var img = new Image();

          // 改变图片的src
          img.src = item;

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
            // return 'height:100%;'
          } else {
            return ''
          }

        }
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
    lin-height: 20px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    text-align: left;
  }

  .my-test-left {
    text-align: left;
  }

  .my-opacity {
    opacity: 0.5;
  }

  .my-like-img-height {
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
  }

  .fixedlunbo {
    width: 22%;
    position: fixed;
    top: 20px;

  }

  .fixedMenu {
    width: 100%;
    position: fixed;
    top: 0px;

  }

  .el-dropdown-link {
    cursor: pointer;
    color: #fb678b;
    font-size: 20px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .user-pro-content-div-none {
    display: none;
  }

  .user-pro-content-div-show {
    display: block;
  }

  .tags-link {
    text-decoration: none;
    color: black;
  }

  .tags-link:hover {
    text-decoration: underline;
  }

  /*.collect-imgs {
    width: 100%;
    height: 200px;
  }*/
  .collect-imgs {
    height: 100%;
  }

  .my-rank-img {
    /*width: 100%;*/
    /*height: 100%;*/
    /*border-radius: 5px;*/
    /*width: 90%;*/
    height: 150px;
    /*height: 200px;*/
    /*margin: 5px auto;*/
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }

  .user-collect-div {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    /*position: relative;*/
  }

</style>