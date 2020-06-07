<template>
  <div>
    <div v-for="(item,index) in waterAllContent">
      <!--图片作品-->
      <water-fall-imgs v-if="item.proIndex!=null"
                       :img-count="item.proIndex.prImgCount">
        <!--用户头像-->
        <img width="40"
             height="40"
             style="border-radius: 50%"
             :src="item.proIndex.userAvatar"
             slot="img-avatar"
             class="user-name"
             @click="gotoUserMain(item)"
        />
        <!--用户名-->
        <strong slot="img-name"
                class="user-name"
                @click="gotoUserMain(item)">
          {{item.proIndex.userName}}
        </strong>

        <!--简介-->
        <span slot="img-text"
              class=""
              style="cursor: pointer"
              v-html="item.proIndex.prInfo"
              @click="gotoImgContent(item.proIndex.prid)">
      </span>
        <!--标签-->
        <el-button slot="img-tags"
                   type="info"
                   size="mini"
                   :plain="true"
                   style="margin: 5px 5px"
                   :autofocus="false"
                   v-for="(item2,index) in item.proIndex.prTags"
                   @click="gotoContent(item2)">
          {{item2.tagsName}}
        </el-button>
        <!--图片-->
        <el-image v-for="(item1,index1) in item.proIndex.proImgs"
                  :slot="index1"
                  :src="item1.img"
                  alt=""
                  fit="cover"
                  @click="gotoImgContent(item.proIndex.prid)"
                  class="imgs-width"/>

        <!--收藏-->
        <span slot="img-collect"
              v-on="isLoadUserCollect(item.proIndex.prid)">

        <el-link @click="clickUserCollect(item.proIndex)"
                 :underline="false"
                 type="info">
          <i :class="item.proIndex.prGo==0?'el-icon-star-off':'el-icon-star-on givelike-icon'"></i>
          {{item.proIndex.prGo==1?'已收藏':'收藏'}}
        </el-link>
      </span>
        <!--访问-->
        <span slot="img-go">
        {{item.proIndex.prClick}}
      </span>
        <!--评论-->
        <span slot="img-comment"
              @click="gotoImgContent(item.proIndex.prid)">
        {{item.proIndex.prCommentCount}}
      </span>
        <!--点赞-->
        <span slot="img-click">
        <el-link @click="clickUserGivelike(item.proIndex)"
                 :underline="false"
                 type="info">
          <i class="el-icon-magic-stick" :class="item.proIndex.prIsGivelike==1?'givelike-icon':''"></i>
          {{item.proIndex.prGivelike}}
        </el-link>
      </span>
      </water-fall-imgs>


      <!--文字作品-->
      <water-fall-text-cute  v-if="item.pcIndex!=null">
        <img width="40"
             height="40"
             style="border-radius: 50%"
             :src="item.pcIndex.userAvatar"
             slot="img-avatar"
             class="user-name"
             @click="gotoUserMain(item.pcIndex)"
        />
        <strong slot="img-name"
                class="user-name"
                @click="gotoUserMain(item.PcContent)">
          {{item.pcIndex.userName}}
        </strong>
        <span slot="img-text">
                {{item.pcIndex.pcInfo}}
            </span>
        <span slot="img-content" v-html="item.pcIndex.pcContent"></span>
        <h3 slot="img-title"
            v-html="item.pcIndex.pcTitle"
            @click="hrefContent(item.pcIndex.pcid)"
            class="pc-img-title"></h3>
        <div slot="img"
             :class="item.pcIndex.pcFirstImg!=''?'pc-img-div':'pc-img-ss'">
          <img :src="item.pcIndex.pcFirstImg"
               style="width: 100%;margin: 0 auto; height:auto;position: relative;bottom: 0px;cursor: pointer;"
               @click="hrefContent(item.pcIndex.pcid)" alt="">
        </div>

        <el-button slot="img-tags"
                   type="info"
                   size="mini"
                   style="margin: 5px 5px"
                   :plain="true"
                   :autofocus="false" v-for="(item2,index) in item.pcIndex.pcTags"
                   @click="gotoContent(item2)">
          {{item2.tagsName}}
        </el-button>
        <span slot="img-collect">
         <el-link @click="clickUserCollectPcid(item.pcIndex)"
                  :underline="false"
                  type="info">
        <i :class="item.pcIndex.pcGo==0?'el-icon-star-off':'el-icon-star-on givelike-icon'"></i>
        {{item.pcIndex.pcGo==1?'已收藏':'收藏'}}
      </el-link>
      </span>

        <span slot="img-go">
                {{item.pcIndex.pcClick}}
            </span>
        <span slot="img-comment">
                {{item.pcIndex.pcComment}}
            </span>
        <span slot="img-click">
        <el-link @click="clickUserGivelikePcid(item.pcIndex)"
                 :underline="false"
                 type="info">
          <i class="el-icon-magic-stick" :class="item.pcIndex.pcIsGivelike==1?'givelike-icon':''"></i>
          {{item.pcIndex.pcGivelike}}
        </el-link>
      </span>
      </water-fall-text-cute>

    </div>
  </div>
</template>

<script>
  import WaterFallImgs from '../waterfall-component/WaterFall-cute-imgs'
  import WaterFallTextCute from '../waterfall-component/WaterFall-cute-text'
  // import "mavon-editor/dist/css/index.css"

  export default {
    name: "",
    components: {
      WaterFallImgs,
      WaterFallTextCute,
    },
    props: {
      WaterImgs: {
        type: Array,
        default() {
          return []
        }
      },
      //所有的作品内容
      waterAllContent: {
        tyep: Array,
        default() {
          return [];
        }
      },
      imgLinks: '',

    },
    data() {
      return {
        userCollect: { //用户收藏图片版
          uid: 0,
          prid: 0,
        },
        userCollectPcid: { //用户收藏文字版
          uid: 0,
          pcid: 0,
        },
        isCollect: '收藏',
        proContent: {
          prid: 0,
        },
        isGivelikeOne: 0,
        userGivelike: { //用户点赞表
          uid: 0,
          prid: 0
        },
        isUserClick: false,
        waterImgIsShow: 0, //图片作品的显示
        judgeUserIsFans: { //用来判断当前用户是否是当前作品用户的粉丝
          uid: 0,
          prid: 0,
        },
        waterFansShow: true, //是否是用户粉丝的显示
        userVisitByPrid: { //图片作品的访问量增加
          uid: 0,
          prid: 0,
        },
        userCollect: { //用户收藏表
          uid: 0,
          pcid: 0,
        },
        userGivelike: { //用户点赞表
          uid: 0,
          pcid: 0,
        },
        isUserClick: false,
      }
    },
    computed: {
      judgeWaterImgIsShow() {
        /* return function (index) {
          //当图片显示条件为登录可见时
          if (this.$store.state.user.uid=='' &&  index.prPermission==2){
           return false
          }else
            //当限制条件为仅粉丝可见时
            if (index.prPermission==3){
              return this.waterFansShow
            }else {
              return true
            }


        }
      }*/
        return true
      }
    },
    methods: {
      hrefContent(index) {

        /* //修改当前图片作品的访问量
         axios.get("/api/updateProContentPrClickByPrid?prid="+index)
             .then(res => {
               console.log("访问量成功加了没有"+res.data)
               console.log(res.data)
             })*/


        // alert(index)

        //打开新的页面显示内容
        // let routeData = this.$router.resolve({path: '/content/' + index});
        let routeData = this.$router.resolve({path: '/text-content/' + index});
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
      clickUserCollectPcid(index){
        console.log("点击了没有啊")
        console.log(index)
        this.userCollectPcid.pcid = index.pcid
        this.userCollectPcid.uid = this.$store.state.user.uid;

        //如果当前点赞数没有更新的话
        if (index.pcGo == 0) {
          if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
            axios.post("/api/insertUserCollectByPcid", this.userCollectPcid)
                .then(res => {
                  console.log(res.data)
                  if (res.data == 1) {
                    index.pcGo = 1;
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
          axios.post("/api/deleteUserCollectByUidAndPcid", this.userCollectPcid)
              .then(res => {
                // alert(res.data)
                if (res.data == 1) {
                  index.pcGo = 0;
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
      isLoadUserCollect(index) {

      },
      //点击添加用户点赞-作品关系表
      clickUserGivelike(item) {
        this.userGivelike.prid = item.prid;

        if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
          console.log("根本就没发布过来啊")
          this.userGivelike.uid = this.$store.state.user.uid;
          axios.post("/api/insertGivelike", this.userGivelike)
              .then(res => {
                if (res.data == 1) {

                  this.isUserClick = true
                  //当前用户没有点赞
                  axios.post("/api/addUserGivelikeByUidAndPrid", this.userGivelike)
                      .then(res => {
                        item.prGivelike = res.data
                        item.prIsGivelike = 1
                        this.$message({
                          type: 'success',
                          message: '感谢您的点赞！',
                          offset: 100
                        })

                      })

                } else {
                  //当前用户已经点赞
                  this.isUserClick = false
                  axios.post("/api/deleteUserGivelikeByUidAndPrid", this.userGivelike)
                      .then(res => {
                        item.prGivelike = res.data
                        item.prIsGivelike = 0
                        this.$message({
                          type: 'success',
                          message: '取消点赞成功！',
                          offset: 100
                        })
                      })
                }


              })

        } else {
          alert("登录后才能点赞哦!")
        }
      },
      //文字作品点赞
      clickUserGivelikePcid(item){
        console.log("点击了没有？")
        console.log(item)
        this.userGivelike.pcid = item.pcid;

        if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
          this.userGivelike.uid = this.$store.state.user.uid;
          axios.post("/api/insertGivelikePcid", this.userGivelike)
              .then(res => {
                if (res.data == 1) {
                  this.isUserClick = true
                  //当前用户没有点赞
                  axios.post("/api/addUserGivelikeByUidAndPcid", this.userGivelike)
                      .then(res => {
                        item.pcGivelike = res.data
                        item.pcIsGivelike = 1
                        this.$message({
                          type:"success",
                          message:'感谢你的点赞！',
                          offset:100
                        })

                      })

                } else {
                  //当前用户已经点赞
                  this.isUserClick = false
                  axios.post("/api/deleteUserGivelikeByUidAndPcid", this.userGivelike)
                      .then(res => {
                        item.pcGivelike = res.data
                        item.pcIsGivelike = 0
                        this.$message({
                          type:"success",
                          message:'取消点赞',
                          offset:100
                        })
                      })
                }
              })
        } else {
          alert("登录后才能点赞哦!")
        }
      },
      //跳转到圈子页面
      gotoContent(index) {
        var tid = index.tid
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/circle-page/' + tid});
        window.open(routeData.href, '_blank');


      },
      //跳转到用户个人主页
      gotoUserMain(index) {
        var uid = index.uid
        //打开新的页面显示内容
        let routeData = this.$router.resolve({path: '/user-main/' + uid});
        window.open(routeData.href, '_blank');

      },
      //跳转到图片作品具体页面
      gotoImgContent(index){
        this.userVisitByPrid.uid = this.$store.state.user.uid
        this.userVisitByPrid.prid = index
        axios.post("/api/insertUserVisitByPridAndUid", this.userVisitByPrid)
            .then(res => {
              console.log("访问量增加")
            })

        let routeData = this.$router.resolve({path: '/content/' + index});
        window.open(routeData.href, '_blank');
      },
    },
    hrefContent(index) {


      axios.get("/api/updatePcContentPcClickByPcid?pcid=" + index)
          .then(res => {
            console.log("访问量成功加了没有" + res.data)
            console.log(res.data)
          })


      // let routeData = this.$router.resolve({path: '/content/' + index});
      let routeData = this.$router.resolve({path: '/text-content/' + index});
      window.open(routeData.href, '_blank');

    },

    //跳转到圈子页面
    gotoContent(index) {
      var tid = index.tid
      //打开新的页面显示内容
      let routeData = this.$router.resolve({path: '/circle-page/' + tid});
      window.open(routeData.href, '_blank');
    },
    gotoUserMain(index) {
      var uid = index.uid
      //打开新的页面显示内容
      let routeData = this.$router.resolve({path: '/user-main/' + uid});
      window.open(routeData.href, '_blank');

    },
    //用户收藏
    clickUserCollect(index) {
      console.log("点击了没有啊")
      console.log(index)
      this.userCollect.pcid = index.pcid
      this.userCollect.uid = this.$store.state.user.uid;

      //如果当前点赞数没有更新的话
      if (index.pcGo == 0) {
        if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
          axios.post("/api/insertUserCollectByPcid", this.userCollect)
              .then(res => {
                console.log(res.data)
                if (res.data == 1) {
                  index.pcGo = 1;
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
        axios.post("/api/deleteUserCollectByUidAndPcid", this.userCollect)
            .then(res => {
              // alert(res.data)
              if (res.data == 1) {
                index.pcGo = 0;
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
    //点击添加用户点赞-作品关系表
    clickUserGivelike(item) {
      console.log("点击了没有？")
      console.log(item)
      this.userGivelike.pcid = item.pcid;

      if (this.$store.state.user.uid != '' && this.$store.state.user.uid != null) {
        this.userGivelike.uid = this.$store.state.user.uid;
        axios.post("/api/insertGivelikePcid", this.userGivelike)
            .then(res => {
              if (res.data == 1) {
                this.isUserClick = true
                //当前用户没有点赞
                axios.post("/api/addUserGivelikeByUidAndPcid", this.userGivelike)
                    .then(res => {
                      item.pcGivelike = res.data
                      item.pcIsGivelike = 1

                    })

              } else {
                //当前用户已经点赞
                this.isUserClick = false
                axios.post("/api/deleteUserGivelikeByUidAndPcid", this.userGivelike)
                    .then(res => {
                      item.pcGivelike = res.data
                      item.pcIsGivelike = 0

                    })
              }


            })

      } else {
        alert("登录后才能点赞哦!")
      }
    },

  }
</script>

<style scoped>
  .imgs-width {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer; /*箭头变小手的效果*/
  }

  .user-name {
    cursor: pointer;
  }

  .user-name:hover {
    text-decoration: underline;
  }

  .givelike-icon {
    color: #ff6fa2;
  }

  .pc-text-content {
    text-align: left;
    width: 90%;
    margin: 5px auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .pc-img-title {
    margin-bottom: 0px;
    cursor: pointer;
  }

  .pc-img-title:hover {
    text-decoration: underline;
  }


  .user-name {
    cursor: pointer;
  }

  .user-name:hover {
    text-decoration: underline;
  }

  .givelike-icon {
    color: #ff6fa2;
  }

  .time {
    font-size: 13px;
    color: #999;

  }

  .fixedlunbo {
    width: 22%;
    position: fixed;
    top: 20px;
  }

  .cute-img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  /*.cute-text-img-water {*/
  .cute-text-img {
    /* width: 90%;
     height: 100%;
     border-radius: 10px;*/
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    bottom: 50%;
    border-radius: 10px;

    /*
            width: 100% !important;
            position: relative !important;
            bottom: 50% !important;
            border-radius: 10px !important;*/

  }

  /*.pc-img-div {
    width: 90%;
    height: 200px;
    margin: 5px auto;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }*/
  .pc-img-div {
    width: 90%;
    /*height: 200px;*/
    height: 250px;
    margin: 5px auto;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }

  .pc-img-ss {
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }


</style>