<template>
  <div>


    <van-nav-bar
            title="标题"
            left-text="取消"
            right-text="下一步"
            @click-left="onClickLeft"
            @click-right="onClickRight"
    />
    <!--填写图片简介-->
    <div id="in4"
         class="prInfo-input-class"
         contenteditable="true"
         ref="hello"
         @keyup="get()"
         v-model="texts"
         @click.once="cleanText()"
         style="background-color: white;margin-top: 10px;float: right">
      {{texts}}
    </div>
    <br>
    <van-uploader v-model="fileList"
                  :after-read="afterRead" multiple/>

    <!--上传图片的按钮-->
  <!--  <el-upload
            class="upload-file"
            list-type="picture-card"
            :action="doUpload"
            :before-upload="beforeUpload"
            ref="newupload"
            multiple
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-change="change"
            :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>-->
    <br><br><br><br><br>
<!--    <van-cell is-link @click="showPopup">展示弹出层</van-cell>-->


    <br><br><br><br><br>
    <van-popup
            v-model="isImgSetting"
            closeable
            position="bottom"
            :style="{ height: '70%' }">
      <br><br>
      <!--权限设置-->
      <van-radio-group v-model="radio">
        <span style="opacity: 0.5;padding: 0px 16px">可见权限</span>
        <van-cell-group>
          <van-cell title="所有人可见" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="登录后可见" clickable @click="radio = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell title="仅粉丝可见" clickable @click="radio = '3'">
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <br>
      <!--保存权限-->
      <van-radio-group >
        <span style="opacity: 0.5;padding: 0px 16px">保存权限</span>
        <van-cell-group>
          <van-cell title="允许作品被复制" clickable>
            <template #right-icon>
              <van-switch v-model="allowCopy" size="24px" />
            </template>
          </van-cell>
          <van-cell title="添加水印" clickable>
            <template #right-icon>
              <van-switch v-model="allowWatermark" size="24px" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <br>
      <!--转载权限-->
      <van-radio-group >
        <span style="opacity: 0.5;padding: 0px 16px">转载权限</span>
        <van-cell-group>
          <van-cell title="署名-非商业性使用" clickable>
            <template #right-icon>
              <span>默认</span>
            </template>
          </van-cell>
          <van-cell title="禁止非授权转载" clickable>
            <template #right-icon>
              <van-switch v-model="allowTransshipment" size="24px" />
            </template>
          </van-cell>
          <van-cell title="禁止修改" clickable>
            <template #right-icon>
              <van-switch v-model="allowAmend" size="24px" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

    </van-popup>
    <br><br><br><br><br>
    <br><br><br><br><br>

    <van-row gutter="0" type="left">
      <van-col span="3" style="text-align: center">
        <van-icon name="photo-o" size="25"></van-icon>
      </van-col>
      <van-col span="3" style="text-align: center">
        <van-icon name="debit-pay" size="25"/>
      </van-col>
      <van-col span="3" style="text-align: center">
        <van-icon name="debit-pay" size="25"/>
      </van-col>
      <van-col span="3" style="text-align: center">
        <van-icon name="user-circle-o" size="25"/>
      </van-col>
      <van-col span="3" style="text-align: center">
      </van-col>
      <van-col span="3" style="text-align: center">
      </van-col>
      <van-col span="3" style="text-align: center">
      </van-col>
      <van-col span="3" style="text-align: center">
        <van-icon name="ellipsis" size="25" @click="showPopup"/>
      </van-col>
    </van-row>


  </div>
</template>

<script>
  import {Toast} from 'vant';

  export default {
    name: "",
    data() {
      return {
        fileList: [ //上传图片的预览
          // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          // { url: 'https://cloud-image', isImage: true },
        ],
        texts: '有什么想写的就写在这里吧，盗用会被关小黑屋哦！', //图片简介的内容
        //表单上传值的对象
        proContent: {
          uid: "1",
          cid: "1",
          prImg: "",
          prInfo: "",
          prDate: "啊啊啊啊",
          prGivelike: "0",
          prPermission: 0,
          prReprint: 0,
          prIsSave: 1, //允许保存图片
        },
        doUpload: 'http://l/uploads', //错误的上传地址
        proImgs: { //所有要上传的图片
          proImgsList: [], //所有需要上传的图片
          proImgStrings: [],
        },
        allUploadImgName:[], //所有的上传图片的名称

        isImgSetting:false, //是否展示作品权限展示
        radio:'1', //选择可见权限
        allowCopy:true, //是否允许复制
        allowWatermark:false, //是否允许添加水印
        allowTransshipment:false, //是否允许转载
        allowAmend:false, //是否允许修改
      }
    },
    methods: {
      onClickLeft() {
        Toast('返回');
        this.$router.replace("/recommend-page")
      },
      //图片简介和图片选择好了，准备添加标签
      onClickRight() {
        Toast('按钮');
        alert("图片简介和图片选择好了，准备添加标签")
         //确定上传

          //先判断用户是否登录
          if (this.$store.state.user.uid == null || this.$store.state.user.uid == "") {
            alert("请登录后再发布图片作品")
          } else {
            //判断是否添加了图片
            if (this.img == "" || this.img == null) {
              alert("上传图片后才可以发布哦！")
            } else {

              //显示加载
            /*  this.isLoading = true

              //加载模态框
              this.uploadLoading = true;*/

              //把在可编辑div中的值给要上传的值
              // this.proContent.prInfo = this.texts


              this.proContent.prDate = new Date().toLocaleString() + "";
              //提交上传事件
              this.$refs.newupload.submit();

              //把标签和当前作品的关系上传到dynamicTags表中
              let _this = this

              //把查看的状态登录可见或所有人可见
              this.proContent.uid = this.$store.state.user.uid;
              //允许登录访问或者所有人可见的权限
              this.proContent.prPermission = this.radio;


              //禁止转载
              if (this.allowTransshipment == true){
                this.proContent.prReprint = 1;
              }
              //禁止修改
              if (this.allowAmend == true){
                this.proContent.prReprint = 2;
              }
              //即禁止转载又禁止修改
              if(this.allowTransshipment == true && this.allowAmend == true){
                this.proContent.prReprint = 3;
              }
              //允许保存图片
              if (this.allowCopy == true){
                this.proContent.prIsSave = 1;
              }else {
                this.proContent.prIsSave = 0;
              }

              //如果图片简介默认为空时，填写发布图片
              if (this.proContent.prInfo == "" || this.proContent.prInfo == null) {
                this.proContent.prInfo = "发布图片"
              }




              /*插入图片作品*/
              axios.post("/api/insertProContent", this.proContent)
                  .then(res => {

                    // this.proImgs.proImgStrings = this.imgName
                    this.proImgs.proImgStrings = this.allUploadImgName
                    console.log("这里是所有的上传的图片");


                    /*最新的插入图片，直接把图片list传到后台*/
                    // axios.post("/api/insertImgsList", this.proImgs)
                    this.$axioss.post("/api/insertImgsListByApp", this.proImgs)
                        .then(res => {
                          console.log("插入图片成功")
                          if (res.data != 0) {
                            //获取最新的prid
                            var prid = res.data

                            //修改当前作品的首图信息
                            this.updateImgByPrid.prImg = this.imgName[0]
                            this.updateImgByPrid.prid = prid
                            axios.post("/api/updateProImgByPrid", _this.updateImgByPrid)
                                .then(res => {
                                  // alert("首图修改成功")
                                  console.log("首图修改成功")
                                })

                            //最后一次循环退出时,发送改变当前pro_content中的图片个数的字段，在图片上传完成之后发送
                            axios.get("/api/updateProImgCount")
                                .then(res => {
                                  console.log("这里是1的话图片个数修改成功" + res)

                                })

                            //插入所有内容的最新的图片内容
                            axios.get("/api/insertPrid?prid=" + prid)
                                .then(res => {
                                  if (res.data != null) {

                                    //发送所有作品的标签关系表
                                    this.allTags.allTagsList = this.allTagsList
                                    axios.post("/api/insertAllTagsList", this.allTags)
                                        .then(res => {
                                          if (res.data == 1) {
                                            // alert("插入作品标签关系成功！")
                                            console.log("插入作品标签关系成功")
                                          } else {
                                          }

                                        })


                                  }
                                })
                          }

                        })

                  })
            }
          }
      },
      get() {
        this.proContent.prInfo = (this.$refs.hello).innerHTML
      },
      //清除里面的内容
      cleanText() {
        console.log("只执行一次")
        this.texts = ''
      },
      //vant的上传图片事件
      afterRead(file) {


        //把文件中的所有文件的名称赋值到allUpload中
        for (var i=0;i<file.length;i++){
          this.allUploadImgName[i] = file[i].file.name
        }

        console.log("这里是所有文件的名称");
        console.log(this.allUploadImgName)

        /* // 此时可以自行将文件上传至服务器
         console.log(file);
         // this.proImgs.proImgStrings = this.imgName
         for (var i=0;i<file.length;i++){
           this.allUploadImgName[i] = file[i].file.name
         }

         this.proImgs.proImgStrings = this.allUploadImgName
         console.log("这里是所有的上传的图片");

         //插入图片作品
         axios.post("/api/insertProContent", this.proContent)
         .then(res =>{


           /!*最新的插入图片，直接把图片list传到后台*!/
           axios.post("/api/insertImgsListByApp", this.proImgs)
               .then(res => {
                 if (res.data != 0) {
                   //获取最新的prid
                   console.log("插入图片成功")

                   var prid = res.data
                 }
               })

         })*/
        console.log(file)
        //把所有的图片循环插入到后台中
        for (var i=0;i<file.length;i++){
          let fd = new FormData();
          fd.append('file', file[i].file);//传文件
          //在点击上传之后才会执行的异步操作，上传当前的图片
          //判断当前图片是否要加水印
          if (this.allowWatermark == true) {
            //上传加水印的图片
            this.$axioss.post("/api/uploadImgWatermark", fd).then(res => {

            }).catch(err => {

            })
          } else {
            //上传不添加水印的图片
            this.$axioss.post("/api/uploads", fd)
                .then(res => {

                })

          }
        }
       /*
        let fd = new FormData();
        fd.append('file', file);//传文件
        //在点击上传之后才会执行的异步操作，上传当前的图片
        //判断当前图片是否要加水印
        if (this.allowWatermark == true) {
          //上传加水印的图片
          this.$axioss.post("/api/uploadImgWatermark", fd).then(res => {

          }).catch(err => {

          })
        } else {
          //上传不添加水印的图片
          this.$axioss.post("/api/uploads", fd)
          // this.$axioss.post("http://localhost:8090/uploads", fd)
              .then(res => {

              })

        }*/

      },
      beforeUpload(file) {
        let fd = new FormData();
        fd.append('file', file);//传文件
        //在点击上传之后才会执行的异步操作，上传当前的图片
        //判断当前图片是否要加水印
        if (this.checkList[1] == "添加水印" || this.checkList[0] == "添加水印") {
          //上传加水印的图片
          axios.post("/api/uploadImgWatermark", fd).then(res => {

          }).catch(err => {

          })
        } else {
          //上传不添加水印的图片
          axios.post("/api/uploads", fd)
              .then(res => {

              })

        }

      },
      //当图片发生改变时调用
      change(file) {
        //用于在页面上显示的值
        this.img.push(file.url)

        //用于在数据库中和查询出来的值里显示
        this.imgName.push("http://localhost:8090/static/img/" + file.name)
      },
      //真正的上传事件
      newSubmitForm() {//确定上传

        //先判断用户是否登录
        if (this.$store.state.user.uid == null || this.$store.state.user.uid == "") {
          alert("请登录后再发布图片作品")
        } else {
          //判断是否添加了图片
          if (this.img == "" || this.img == null) {
            alert("上传图片后才可以发布哦！")
          } else {

            //显示加载
            this.isLoading = true

            //加载模态框
            this.uploadLoading = true;

            //把在可编辑div中的值给要上传的值
            // this.proContent.prInfo = this.texts


            this.proContent.prDate = new Date().toLocaleString() + "";
            //提交上传事件
            this.$refs.newupload.submit();

            //把标签和当前作品的关系上传到dynamicTags表中
            let _this = this

            //把查看的状态登录可见或所有人可见
            this.proContent.uid = this.$store.state.user.uid;
            this.proContent.prPermission = this.radio;
            if (this.reprintUpload[2] == "禁止未授权转载") {
              this.proContent.prReprint = 1;
            }
            if (this.reprintUpload[2] == "禁止修改") {
              this.proContent.prReprint = 2;
            }
            if (this.reprintUpload[2] == "禁止未授权转载" && this.reprintUpload[3] == "禁止修改") {
              this.proContent.prReprint = 3;
            }
            if (this.reprintUpload[3] == "禁止未授权转载" && this.reprintUpload[2] == "禁止修改") {
              this.proContent.prReprint = 3;
            }
            if (this.checkList[0] == "允许右键") {
              this.proContent.prIsSave = 1;
            } else {
              this.proContent.prIsSave = 0;
            }
            //如果图片简介默认为空时，填写发布图片
            if (this.proContent.prInfo == "" || this.proContent.prInfo == null) {
              this.proContent.prInfo = "发布图片"
            }

            /*插入图片作品*/
            axios.post("/api/insertProContent", this.proContent)
                .then(res => {

                  this.proImgs.proImgStrings = this.imgName
                  console.log("这里是所有的上传的图片");

                  /*最新的插入图片，直接把图片list传到后台*/
                  axios.post("/api/insertImgsList", this.proImgs)
                      .then(res => {
                        console.log("插入图片成功")
                        if (res.data != 0) {
                          //获取最新的prid
                          var prid = res.data

                          //修改当前作品的首图信息
                          this.updateImgByPrid.prImg = this.imgName[0]
                          this.updateImgByPrid.prid = prid
                          axios.post("/api/updateProImgByPrid", _this.updateImgByPrid)
                              .then(res => {
                                // alert("首图修改成功")
                                console.log("首图修改成功")
                              })

                          //最后一次循环退出时,发送改变当前pro_content中的图片个数的字段，在图片上传完成之后发送
                          axios.get("/api/updateProImgCount")
                              .then(res => {
                                console.log("这里是1的话图片个数修改成功" + res)

                              })

                          //插入所有内容的最新的图片内容
                          axios.get("/api/insertPrid?prid=" + prid)
                              .then(res => {
                                if (res.data != null) {

                                  //发送所有作品的标签关系表
                                  this.allTags.allTagsList = this.allTagsList
                                  axios.post("/api/insertAllTagsList", this.allTags)
                                      .then(res => {
                                        if (res.data == 1) {
                                          // alert("插入作品标签关系成功！")
                                          console.log("插入作品标签关系成功")
                                        } else {
                                        }

                                      })


                                }
                              })
                        }

                      })


                  //添加当前作品的标签
                  this.proTags.proTagsList = this.dynamicTags
                  axios.post("/api/insertProTagsList", this.proTags)
                      .then(res => {
                        if (res.data == 1) {
                          console.log("插入数组标签成功")

                          //当前所有圈子的tags_hot添加1
                          axios.post("/api/addAllTagsHotByTidList", this.proTags)
                              .then(res => {
                                console.log("前圈子的tags_hot添加1")
                              })

                          //作品插入完成之后，修改圈子内作品的最新日期
                          axios.get("/api/updateTagsLatestTime")
                              .then(res => {
                                if (res.data == 1) {
                                  console.log("修改最新圈子日期成功!")

                                }
                              })

                          //修改用户的总作品个数
                          axios.get("/api/updateUserProContentCount?uid=" + this.$store.state.user.uid)
                              .then(res => {
                                if (res.data == 1) {

                                  //取消加载
                                  this.isLoading = false;
                                  //取消模态框显示
                                  this.uploadLoading = true;

                                  this.$message({
                                    type: 'success',
                                    message: '发布成功!',
                                    offset: 100
                                  })

                                  //跳转到主页
                                  this.$router.replace('/')
                                }
                              })

                        }

                      })


                })

          }

        }

      },
      //原本的element组件中的移除方法
      handleRemove(file) {
        console.log(file)
        console.log(file.url)
        for (var i = 0; i < this.img.length; i++) {
          console.log(file.url)
          //当两个问题的url相同时，删除这张图片
          if (file.url == this.img[i]) {
            this.img.splice(i, 1)
          }
          //删除即将要上传到数据库中的对应的图片
          if ("http://localhost:8090/static/img/" + file.name == this.imgName[i]) {
            this.imgName.splice(i, 1)
          }


        }
      },
      //在模态框中查看图片大图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      gotoSetting(){
        this.$router.replace("")
      },
      showPopup() {
        this.isImgSetting = true;
      },

    },
  }
</script>

<style scoped>

  .prInfo-input-class {
    display: block;
    width: 95%;
    min-height: 100px;
    margin: 10px auto;
    border-radius: 10px;
    padding: 10px 15px;
    transition: border 1s;
  }

  .prInfo-input-class-blue {
    display: block;
    width: 95%;
    margin: 10px auto;
    height: 100px;
    border-radius: 10px;
    padding: 10px 15px;
    transition: border 1s;
  }
</style>