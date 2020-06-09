<template>
  <div>
    <question-cute v-for="(item,index) in questionCute"
                   v-show="item.quAnswerId==null"
                   :left-span="isQuestionCuteColLeft(item)"
                   :right-span="isQuestionCuteColRight(item)">
      <!--  <img slot="question-avatar"
             width="50"
             height="50"
             :src="item.userAvatar"
             class="click-pointer"
             style="border-radius: 50%"
             @click="gotoUserMain(item)">
        </img>
        <span slot="question-name"
              class="click-text-underline"
              @click="gotoUserMain(item)">
            {{item.userName}}
          </span>-->
      <span slot="question-date">
         {{item.quDate}}

      </span>
      <span slot="question-text"
            class="click-text-underline"
            @click="gotoQuesionContent(item)">
          {{item.quText}}
        </span>
      <span slot="question-nameLink">{{item.question_nameLink}}</span>

      <!--      <span slot="question-content">{{item.quInfo}}</span>-->
      <span slot="question-content" v-if="item.quIndex!=null" style="font-size: 20px">
<!--        <el-link  style="color: #409EFF;font-size: 16px;width: 6%;float: left;text-align: left"-->
        <!--                  slot="question-answer-userName" @click="gotoUserMain(item.quIndex)">{{item.quIndex.userName+':'}}</el-link>-->
        <div style="font-size: 16px;" class="answer-text-content"
             slot="question-answer-content">
          <span style="color: #409EFF;cursor: pointer;" @click="gotoUserMain(item.quIndex)">{{item.quIndex.userName+':'}}</span>
          <!--          <span  @click="gotoAnswerPage(item.quIndex)"> {{// item.quIndex.quInfo}}</span>-->
          <span @click="gotoAnswerPage(item.quIndex)"> {{item.quIndex.quInfo}}</span>

        </div>
        <!--<el-link>
          {{item.quIndex!=null?item.quIndex.userName+':'+item.quIndex.quInfo:''}}
        </el-link>-->
      </span>


      <!--      <span slot="question-collect">{{item.quCollect}}</span>-->
      <span slot="question-collect">
        <el-link @click="clickUserCollect(item)"
                 :underline="false"
                 type="info">
          <i :class="item.quCollect==0?'el-icon-star-off':'el-icon-star-on givelike-icon'"></i>
          {{item.quCollect==1?'已收藏':'收藏'}}
        </el-link>
      </span>

      <span slot="question-go">{{item.quGo}}</span>
      <span slot="question-comment">{{item.quAnswerCount}}</span>
      <span slot="question-click">{{item.quClick}}</span>
      <!--问题的首图-->
      <!--      :src="item.quFirstImg==null?item.quIndex.quFirstImg:item.quFirstImg"-->
      <!--           :src="item.quFirstImg"            v-show="item.quFirstImg != null"-->

      <img slot="question-firstImg"
           width="70"
           height="70"
           shape="square"
           style="margin-top: 60%;border-radius: 5px;cursor: pointer"
           :src="isQuFirstImg(item)"
           v-show="isQuFirstImgExist(item)"
           @click="gotoQuesionContent(item)"/>

    </question-cute>

  </div>
</template>

<script>

  import QuestionCute from '../waterfall-component/waterfall-question-cute'

  export default {
    name: "",
    components: {
      QuestionCute
    },
    props: {
      questionCute: {
        type: Array,
        default: [],
      }
    },
    data() {
      return {
        insertQuUserRelation: {
          uid: 0,
          quid: 0,
        }
      }
    },
    computed: {
      isQuFirstImg() {
        return function (item) {
          //当前作品没有首图的话
          if (item.quFirstImg == null) {
            //当前作品有回答的情况下
            if (item.quIndex != null) {
              //当前作品的回答有首图的话
              if (item.quIndex.quFirstImg != null) {
                return item.quIndex.quFirstImg
              } else {
                return ""
              }
            }

          } else {
            return item.quFirstImg;
          }
        }

      },
      isQuFirstImgExist(){
        return function (item) {
          //当前作品没有首图的话
          if (item.quFirstImg == null){
            if (item.quIndex != null) {
              //当前作品的回答有首图的话
              if (item.quIndex.quFirstImg != null) {
                return true
              } else {
                return false
              }
            }
          }else {
            return true
          }

        }
      },
      //右边的长度
      isQuestionCuteColRight(){
        return function (item) {
          //当前作品没有首图的话
          if (item.quFirstImg == null){
            if (item.quIndex != null) {
              //当前作品的回答有首图的话
              if (item.quIndex.quFirstImg != null) {
                return 2
              } else {
                return 0
              }
            }
          }else {
            return 2
          }

        }
      },
      //左边的长度
      isQuestionCuteColLeft(){
        return function (item) {
          //当前作品没有首图的话
          if (item.quFirstImg == null){
            if (item.quIndex != null) {
              //当前作品的回答有首图的话
              if (item.quIndex.quFirstImg != null) {
                return 22
              } else {
                return 24
              }
            }
          }else {
            //当前问答有首图
            return 17
          }

        }
      }
    },
    methods: {
      gotoUserMain(index) {
        var uid = index.uid
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/user-main/' + uid});
        window.open(routeData.href, '_blank');

      },
      gotoQuesionContent(index) {

        //当前作品的访问量+1
        axios.get("api/updateQuContentQuClickByQuid?quid=" + index.quid)
            .then(res => {
              if (res.data == 1) {
                console.log("访问量增加")
              }
            })

        //插入一个用户访问问题表
        this.insertQuUserRelation.quid = index.quid
        this.insertQuUserRelation.uid = this.$store.state.user.uid
        axios.post("/api/insertQuUserRelation", this.insertQuUserRelation)
            .then(res => {
              if (res.data == 1) {
                console.log("用户浏览当前问题了")
              }
            })


        let routeData = this.$router.resolve({path: '/question-content/' + index.quid});
        window.open(routeData.href, '_blank');
      },
      //用户收藏
      clickUserCollect(index) {
        this.userCollect.prid = index.prid
        this.userCollect.uid = this.$store.state.user.uid;

        //如果当前点赞数没有更新的话
        if (index.prGo == 0) {
          if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
            axios.post("/api/insertUserCollect", this.userCollect)
                .then(res => {
                  // alert(res.data)
                  if (res.data == 1) {
                    index.prGo = 1;
                    this.$message({
                      message: '收藏成功!',
                      type: 'success',
                      offset: 100
                    });
                  } else {
                    alert("请先登录！")
                  }

                })

          } else {
            alert("先登录才能收藏哦！")
          }

        } else {
          //取消收藏，删除用户收藏-作品关系表中的一行
          axios.post("/api/deleteUserCollect", this.userCollect)
              .then(res => {
                if (res.data == 1) {
                  index.prGo = 0;
                  this.$message({
                    message: '已经取消收藏',
                    type: 'success',
                    offset: 100
                  });
                } else {
                  alert("请先登录！")
                }

              })

        }

      },
      //跳转到用户个人主页
      gotoUserMain(index) {
        var uid = index.uid
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/user-main/' + uid});
        window.open(routeData.href, '_blank');

      },
      //跳转到回答页面
      gotoAnswerPage(index) {
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/answer-content/' + index.quid});
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>

<style scoped>

  .answer-text-content {
    width: 100%;
    float: right;
    line-height: 24px;
    overflow: hidden;
    margin-top: 10px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

</style>