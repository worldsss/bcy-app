<template>
  <div>

    <!--<water-fall-imgs v-for="(item,index) in WaterImgs"
                     :img-links="imgLinks"
                     :img-count="item.pr_img_count">

      <img width="40"
           height="40"
           style="border-radius: 50%"
           :src="item.user_avatar"
           slot="img-avatar"
           class="user-name"
           @click="gotoUserMain(item)"
      />

      <strong slot="img-name"
              class="user-name"
              @click="gotoUserMain(item)">
        {{item.user_name}}
      </strong>

      <span slot="img-text">
        {{item.pr_info}}
      </span>
      <el-button slot="img-tags"
                 type="info"
                 size="mini"
                 :plain="true"
                 :autofocus="false" v-for="(item2,index) in item.pr_tags"
                 @click="gotoContent(item2)">
        {{item2.tags_name}}
      </el-button>

      <el-image v-for="(item1,index1) in item.pro_imgs"
                :slot="index1"
                :src="item1.img"
                alt=""
                fit="cover"
                @click="hrefContent(item.prid)"
                class="imgs-width"/>

      <span slot="img-collect"
            v-on="isLoadUserCollect(item.prid)">

        <el-link @click="clickUserCollect(item)"
                 :underline="false"
                 type="info">
          <i :class="item.pr_go==0?'el-icon-star-off':'el-icon-star-on givelike-icon'"></i>
          {{item.pr_go==1?'已收藏':'收藏'}}
        </el-link>
      </span>

      <span slot="img-go">
&lt;!&ndash;        {{item.pr_go}}&ndash;&gt;
        {{item.pr_click}}
      </span>

      <span slot="img-comment"
            @click="hrefContent(item.prid)">
        {{item.pr_comment_count}}
      </span>

      <span slot="img-click">
        <el-link @click="clickUserGivelike(item)"
                 :underline="false"
                 type="info">
          <i class="el-icon-magic-stick" :class="item.pr_is_givelike==1?'givelike-icon':''"></i>
          {{item.pr_givelike}}
        </el-link>
      </span>
    </water-fall-imgs>-->
    <water-fall-imgs v-for="(item,index) in WaterImgs" :img-count="item.prImgCount">
      <!--      :img-links="imgLinks"                :img-count="item.prImgCount" v-show="judgeWaterImgIsShow(item)">-->

      <!--用户头像-->
      <img width="40"
           height="40"
           style="border-radius: 50%"
           :src="item.userAvatar"
           slot="img-avatar"
           class="user-name"
           @click="gotoUserMain(item)"
      />
      <!--用户名-->
      <strong slot="img-name"
              class="user-name"
              @click="gotoUserMain(item)">
        {{item.userName}}
      </strong>

      <!--简介-->
      <span slot="img-text"
            class=""
            style="cursor: pointer"
            v-html="item.prInfo" @click="hrefContent(item.prid)">
      </span>
      <!--标签-->
      <el-button slot="img-tags"
                 type="info"
                 size="mini"
                 :plain="true"
                 style="margin: 5px 5px"
                 :autofocus="false"
                 v-for="(item2,index) in item.prTags"
                 @click="gotoContent(item2)">
        {{item2.tagsName}}
      </el-button>
      <!--图片-->
      <el-image v-for="(item1,index1) in item.proImgs"
                :slot="index1"
                :src="item1.img"
                alt=""
                fit="cover"
                @click="hrefContent(item.prid)"
                class="imgs-width"/>

      <!--收藏-->
      <span slot="img-collect"
            v-on="isLoadUserCollect(item.prid)">

        <el-link @click="clickUserCollect(item)"
                 :underline="false"
                 type="info">
          <i :class="item.prGo==0?'el-icon-star-off':'el-icon-star-on givelike-icon'"></i>
          {{item.prGo==1?'已收藏':'收藏'}}
        </el-link>
      </span>
      <!--访问-->
      <span slot="img-go">
        {{item.prClick}}
      </span>
      <!--评论-->
      <span slot="img-comment"
            @click="hrefContent(item.prid)">
        {{item.prCommentCount}}
      </span>
      <!--点赞-->
      <span slot="img-click">
        <el-link @click="clickUserGivelike(item)"
                 :underline="false"
                 type="info">
          <i class="el-icon-magic-stick" :class="item.prIsGivelike==1?'givelike-icon':''"></i>
          {{item.prGivelike}}
        </el-link>
      </span>
    </water-fall-imgs>

  </div>
</template>

<script>
  import WaterFallImgs from '../waterfall-component/WaterFall-cute-imgs'

  export default {
    name: "",
    components: {
      WaterFallImgs
    },
    props: {
      WaterImgs: {
        type: Array,
        default() {
          return []
        }
      },
      imgLinks: '',

    },
    data() {
      return {
        userCollect: {
          uid: 0,
          prid: 0,
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
        }
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
        this.userVisitByPrid.uid = this.$store.state.user.uid
        this.userVisitByPrid.prid = index
        axios.post("/api/insertUserVisitByPridAndUid", this.userVisitByPrid)
            .then(res => {
              console.log("访问量增加")
            })

        // alert(index)

        //打开新的页面显示内容
        /*let routeData = this.$router.resolve({path: '/content/' + index});
        window.open(routeData.href, '_blank');*/
        this.$router.replace("/img-content-page/" + index)

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

      }
    },
    created() {
      var _this = this

      //判断当前作品是否收藏
      /* function tagsUpload(j, i, length) {
         _this.userCollect.prid = j
         _this.userCollect.uid = _this.$store.state.user.uid;
         if (_this.$store.state.user.uid != "" && _this.$store.state.user.uid != null) {
           axios.post("/api/judgeUserCollect", _this.userCollect)
               .then(res => {
                 console.log("这里执行了"+i+"次")
                 if (res.data == 1) {
                   console.log("收藏了"+i+"次")
                   _this.WaterImgs[i].prGo = 1
                 } else {
                   _this.WaterImgs[i].prGo = 0
                 }
                 if (++i < length) {
                   tagsUpload(--j, i, length);
                   // tagsUpload(++_this.WaterImgs[i].prid, i, length);
                 } else {
                 }
               })
         }
       }

       setTimeout(function () {
         tagsUpload(_this.WaterImgs[0].prid, 0, _this.WaterImgs.length);
         // tagsUpload(_this.WaterImgs[0].prid, 0, 50);
       },100)*/


      /*

            function nowUserIsProContentFans(j,i,length){
              _this.judgeUserIsFans.uid = _this.$store.state.user.uid;
              _this.judgeUserIsFans.prid = j
              //判断当前用户是否是作品用户的粉丝
              axios.post("/api/judgeUserIsMyUserFansByPridAndUid",_this.judgeUserIsFans)
                  .then(res =>{
                    // alert("发送了吗")
                    if (res.data == 1){
                      alert("是我的粉丝吗？")
                      _this.waterFansShow = true;
                    }else {
                      _this.waterFansShow = false;
                    }
                  })
            }

            setTimeout(()=>{
              nowUserIsProContentFans(_this.WaterImgs[0].prid, 0, _this.WaterImgs.length);

            /!*  _this.judgeUserIsFans.uid = _this.$store.state.user.uid;
              // _this.judgeUserIsFans.prid = index.prid
              _this.judgeUserIsFans.prid = this..prid
              //判断当前用户是否是作品用户的粉丝
              axios.post("/api/judgeUserIsMyUserFansByPridAndUid",_this.judgeUserIsFans)
                  .then(res =>{
                    // alert("发送了吗")
                    if (res.data == 1){
                      alert("是我的粉丝吗？")
                      _this.waterFansShow = true;
                    }else {
                      _this.waterFansShow = false;
                    }
                  })*!/


            },500)

      */


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

</style>