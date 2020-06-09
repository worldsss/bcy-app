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

    <!--底部评论区-->
    <van-tabbar>
      <van-tabbar-item>
<!--        <span>自定义</span>-->
        <van-image
                round
                width="40px"
                height="40px"
                style="margin: 5px;"
                :src="nowUser.userAvatar"/>
      </van-tabbar-item>
      <van-tabbar-item style="width: 200px">
        <el-input placeholder="来不及解释了，快评论" style="margin-top: 0px;width: 200px"></el-input>

      </van-tabbar-item>
      <van-tabbar-item icon="chat-o">
        245
      </van-tabbar-item>
      <van-tabbar-item icon="like-o">
        578
      </van-tabbar-item>
    </van-tabbar>
    <!--底部评论区-->
    <!--<div  v-show="!proContentLoading" style="position: sticky;top: 620px;z-index: 999999999;background-color: white;width: 100%">
      <van-row gutter="20">
        <van-col :span="3">
          <van-image
                  round
                  width="40px"
                  height="40px"
                  style="margin: 5px;"
                  :src="nowUser.userAvatar"/>
        </van-col>
        <van-col :span="15">
          <el-input placeholder="来不及解释了，快评论" style="margin-top: 5px;"></el-input>
        </van-col>
        <van-col :span="6">
          <div class="van-tab__pane" style="text-align: center;margin-top:5px;">
            <div class="van-col van-col&#45;&#45;10">
              <van-icon name="like-o"/>
              <span>754</span>
            </div>
            <div class="van-col van-col&#45;&#45;10">
              <van-icon name="chat-o"/>
              <span>224</span>
            </div>
          </div>


        </van-col>
      </van-row>
    </div>
-->


    <!--用户作品内容-->
    <div v-loading="proContentLoading" style="">
      <div style="width: 100%;margin: 0 auto;">
        <!--图片作品的介绍区域-->
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
              <van-button color="#fa4b8b"
                          style="border-radius: 5px"
                          size="small"
                          :class="nowUser.userIsFans==1?'bcy-buttons-visited':''"
                          @click="insertUserFans()">
                {{nowUser.userIsFans==1?'已关注':'关注'}}
              </van-button>


            </van-col>
          </van-row>

          <br>
          <!--图片作品的标签-->
          <el-tag v-for="(item,index) in proContent.prTags"
                  @click="gotoContent(item)"
                  style="cursor: pointer;margin: 5px 5px">
            <i class="el-icon-s-management" style="font-size: 14px;" v-show="item.tagsHot>=5"></i>
            {{item.tagsName}}
          </el-tag>
          <div>
            <p style="width: 90%;margin: 10px 0;" v-html="proContent.prInfo">
            </p>
          </div>
        </div>

        <!--图片作品的图片-->
        <div v-for="(item,index) in proContent.proImgs"
             class="demo-image__preview"
             style="text-align: center" @contextmenu.prevent="" v-show="proContent.prIsSave==0">
          <el-image :src="item.img"
                    :preview-src-list="imgList">
          </el-image>
        </div>
        <!--图片作品的图片-->
        <div v-for="(item,index) in proContent.proImgs"
             class="demo-image__preview"
             style="text-align: center" v-show="proContent.prIsSave==1">
          <el-image :src="item.img"
                    :preview-src-list="imgList">
          </el-image>
        </div>

      </div>
      <!--用户作品的权限-->
      <div style="text-align: center">
        <el-popover
                placement="top-start"
                width="200"
                trigger="hover">
          <p>署名+原地址</p>
          <p>非商业性使用</p>
          <p v-show="proContent.prReprint==1">禁止未授权转载</p>
          <p v-show="proContent.prReprint==2">禁止修改</p>
          <div v-show="proContent.prReprint==3">
            <p>禁止未授权转载</p>
            <p>禁止修改</p>
          </div>
          <el-link slot="reference"
                   class="my-opacity"
                   style="font-size: 16px">著作权归作者本人所有
          </el-link>
        </el-popover>
      </div>


      <!--作品的评论-->
      <el-row :gutter="10" v-for="(item,index) in proComments">
        <el-col :span="2">
          <!--评论用户头像-->
          <el-avatar :src="item.userAvatar"
                     :size="50"
                     style="margin-top: 10px">
          </el-avatar>
        </el-col>
        <el-col :span="22" id="reply">
          <div style="margin: 10px 0px">
            <!--评论用户姓名-->
            <el-link style="font-size: 14px">{{item.userName}}</el-link>
            <!--用户标签-->
            <el-tag type="success"
                    v-for="(item1,index) in item.userTags">
              {{item1.utagName}}
            </el-tag>
            <br><br>
            <!--评论内容-->
            <span>{{item.content}}</span>
            <br><br>
            <span class="comment-time my-opacity">
                  {{item.time}}
                </span>
            <el-link style="float: right" @click="addProComment(item)">
              <i class="el-icon-magic-stick"></i>
              点赞
              {{item.givelike}}
            </el-link>
            <br>
            <!--当前评论的回复-->
            <div style="background-color: #f0f1f2" v-for="(item1,index) in item.userParent">
              <el-row :gutter="10">
                <el-col :span="2">
                  <el-avatar :src="item1.userAvatar" :size="50"
                             style="margin-top: 10px;margin-left: 10px"></el-avatar>
                </el-col>
                <el-col :span="19">
                  <p style="margin: 0px 0px">
                    <el-link style="font-size: 14px">{{item1.userName}}</el-link>
                    <!--                                                <el-tag type="success">标签二</el-tag>-->
                    <br><br>
                    <span v-html="item1.content"></span>
                    <br><br>
                    <span class="my-opacity"
                          style="font-size: 10px">{{item1.time}}</span>
                    <el-link style="text-align: right;float: right" @click="addProComment(item1)">点赞
                      {{item1.givelike}}
                    </el-link>
                  </p>
                  <div style="background-color: #f0f1f2" id="replys">
                    <el-collapse accordion>
                      <el-collapse-item name="1">
                        <template slot="title">

                          <p style="float: right;text-align: center">回复</p>
                        </template>
                        <div style="text-align: center">
                          <el-input
                                  type="textarea"
                                  :rows="3"
                                  placeholder="请输入内容"
                                  v-model="textareaReply"
                                  style="width: 90%;margin: 10px 0px; text-align: center">
                          </el-input>

                        </div>
                        <div style="height: 50px;width: 90%;margin: 0 auto">
                          <el-button style="float: right;display: block" @click="gotoReplyUser(item)">
                            回复
                          </el-button>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>

                </el-col>
              </el-row>

            </div>
            <el-collapse accordion>
              <el-collapse-item name="1">
                <template slot="title">

                  <p style="float: right;text-align: center">回复</p>
                </template>
                <div style="text-align: center">
                  <el-input
                          type="textarea"
                          :rows="3"
                          placeholder="请输入内容"
                          v-model="textareaReply"
                          style="width: 90%;margin: 10px 0px; text-align: center">
                  </el-input>

                </div>
                <div style="height: 50px;width: 90%;margin: 0 auto">
                  <!--                      <el-button style="float: right;display: block" @click="gotoReply(item)">-->
                  <!--                      <el-button style="float: right;display: block" @click="gotoReplyUser(item)">-->
                  <el-button style="float: right;display: block" @click="gotoReply(item)">
                    回复
                  </el-button>
                </div>

              </el-collapse-item>
            </el-collapse>


          </div>

        </el-col>

      </el-row>



    </div>


  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        proContent: {}, //图片作品的所有内容
        nowUser: {}, //当前作品的用户信息

        userFansByPridAndUid: { //根据作品获取对应的用户信息，顺便判断一下当前登录用户是否是作品用户的粉丝
          prid: 0,
          uid: 0,
        },
        proContentByPridAndUid: { //登录后根据用户查找的对象
          prid: 0,
          uid: 0,
        },
        imgList: [], //图片作品的大图预览
        userComment: '', //用户评论
        proContentLoading: true, //页面未加载完成的加载动画
        userFans: { //当前用户关注作品用户
          uid: 0,
          fid: 0,
        },
        proComments: [], //当前作品的所有评论内容
        userComment: '', //用户的评论信息
        nowUserCommentInfo: { //当前用户评论信息
          userAvatar: '',
          userName: '',
          content: "",
          time: '',
          userTags: [],

        },
      }
    },
    created() {


      setTimeout(() => {

        var prid = this.$route.params.prid

        console.log("当前的uid是");
        console.log(this.$store.state.user.uid)


        if (this.$store.state.user.uid != "" && this.$store.state.user.uid != null) {
          console.log(this.$store.state.user)
          //登录状态
          //查询当前作品的内容
          this.proContentByPridAndUid.uid = this.$store.state.user.uid
          this.proContentByPridAndUid.prid = this.$route.params.prid
          axios.post("/api/selectIndexTagByPridAndUid", this.proContentByPridAndUid)
              .then(res => {
                console.log("这里是内容的对象")
                this.proContent = res.data
                console.log(this.proContent)
                this.proContentLoading = false
                //开启图片的大图预览
                for (var i = 0; i < this.proContent.proImgs.length; i++) {
                  this.imgList.push(this.proContent.proImgs[i].img)
                }

              })
        } else {
          //未登录状态
          //查询当前作品的内容
          axios.get("/api/selectTagById?prid=" + prid)
              .then(res => {
                console.log("这里是内容的对象")
                this.proContent = res.data
                console.log(this.ProContent)
                this.proContentLoading = false

                //开启图片的大图预览
                for (var i = 0; i < this.proContent.proImgs.length; i++) {
                  this.imgList.push(this.proContent.proImgs[i].img)
                }

              })
        }


        //据作品获取对应的用户信息，顺便判断一下当前登录用户是否是作品用户的粉丝
        var IntegerPrid = parseInt(prid)
        this.userFansByPridAndUid.prid = IntegerPrid;
        this.userFansByPridAndUid.uid = this.$store.state.user.uid
        axios.post("/api/getUserForPridAndUid", this.userFansByPridAndUid)
            .then(res => {
              if (res.data != null) {
                this.nowUser = res.data
                console.log("这里的作品的用户是")
                console.log(this.nowUser)
              }
            })


        //获取全部的用户评论信息，根据评论热度
        axios.get("/api/getProComIndexByPridOrderByGivelike?prid=" + prid)
            .then(res => {
              console.log("这里是所有的评论内容")
              console.log(res.data)
              this.proComments = res.data

            })



      }, 1000)



    },
    methods: {
      //插入一个用户粉丝
      insertUserFans() {
        if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
          this.userFans.uid = this.$store.state.user.uid;
          this.userFans.fid = this.nowUser.uid

          //添加一个用户
          axios.post("/api/insertUserFans", this.userFans)
              .then(res => {
                console.log("这里是用户的信息s")
                console.log(res.data)
                // this.nowUser = res.data
                if (res.data == 1) {
                  this.nowUser.userIsFans = 1
                  this.$message({
                    type: 'success',
                    message: '感谢您的关注！',
                    offset: 100
                  })
                } else {
                  alert("已经关注过了哦")
                }

              })

        } else {
          alert("请先登录！")
        }


      },
      //插入一条评论
      insertProComment() {
        if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
          var uid = parseInt(this.$store.state.user.uid)
          this.proComment.uid = uid;
          console.log("插入评论回复的uid是"+uid)
          this.proComment.content = this.userComment
          console.log(this.proComment.content)
          axios.post("/api/insertProComment", this.proComment)
              .then(res => {
                if (res.data == 1) {
                  // alert("添加评论内容成功!")

                  //添加评论-作品表的关系
                  axios.get("/api/insertProComs?prid=" + this.$route.params.prid)
                      .then(res => {

                        //修改作品表中的评论个数
                        axios.get("/api/updateProContetnCommentCount?prid=" + this.$route.params.prid)
                            .then(res => {
                              // this.$router.go(0)

                              this.nowUserCommentInfo.userAvatar = this.$store.state.user.userAvatar
                              this.nowUserCommentInfo.userName = this.$store.state.user.userName
                              this.nowUserCommentInfo.userTags = this.$store.state.user.userTags
                              this.nowUserCommentInfo.content = this.userComment
                              var nowTime = new Date() + ""
                              this.nowUserCommentInfo.time = nowTime
                              this.proComments.unshift(this.nowUserCommentInfo)
                              this.$message({
                                type: "success",
                                message: "评论成功！",
                                offset: 100
                              })


                            })


                        // this.$router.go(0)
                      })


                }

              })

        } else {
          alert("请先登录再完成评论功能")

        }

      },
    }
  }
</script>

<style scoped>
  .user-info-hiddle {
    width: 200px;
    margin-top: 3px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.6;
    font-size: 14px;

  }

  .bcy-buttons-visited {
    background-color: #e5e5e5 !important;
    color: #a1a1a6 !important;
    /*border-bottom: 1px solid #a1a1a6;*/
    border: 0px;
  }

  .bcy-buttons {
    background-color: #ff6fa2 !important;
    color: white !important;
  }

</style>