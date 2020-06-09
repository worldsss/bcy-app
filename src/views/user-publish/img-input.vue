<template>
  <div>

    <div v-show="!isInputTag">
      <!--顶部标签栏-->
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
      <div id="info" onClick="show();" type="0"></div>
      <!--上传图片-->
      <van-uploader v-model="fileList"
                    :after-read="afterRead"
                    preview-size="100" :multiple="true"/>

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
      <br><br><br><br><br>
      <!--权限设置-->
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
                <van-radio name="1"/>
              </template>
            </van-cell>
            <van-cell title="登录后可见" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2"/>
              </template>
            </van-cell>
            <van-cell title="仅粉丝可见" clickable @click="radio = '3'">
              <template #right-icon>
                <van-radio name="3"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <br>
        <!--保存权限-->
        <van-radio-group>
          <span style="opacity: 0.5;padding: 0px 16px">保存权限</span>
          <van-cell-group>
            <van-cell title="允许作品被复制" clickable>
              <template #right-icon>
                <van-switch v-model="allowCopy" size="24px"/>
              </template>
            </van-cell>
            <van-cell title="添加水印" clickable>
              <template #right-icon>
                <van-switch v-model="allowWatermark" size="24px"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <br>
        <!--转载权限-->
        <van-radio-group>
          <span style="opacity: 0.5;padding: 0px 16px">转载权限</span>
          <van-cell-group>
            <van-cell title="署名-非商业性使用" clickable>
              <template #right-icon>
                <span>默认</span>
              </template>
            </van-cell>
            <van-cell title="禁止非授权转载" clickable>
              <template #right-icon>
                <van-switch v-model="allowTransshipment" size="24px"/>
              </template>
            </van-cell>
            <van-cell title="禁止修改" clickable>
              <template #right-icon>
                <van-switch v-model="allowAmend" size="24px"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

      </van-popup>
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

    <!--这里是添加标签的页面，在点击下一步之前是隐藏的状态-->
    <!--顶部标签栏-->
    <div v-if="isInputTag">
      <van-nav-bar
              title="编辑标签"
              @click-left="onClickLeft"
              @click-right="onClickRight"
      >
        <template #left>
          <van-icon name="arrow-left"/>
        </template>
        <template #right>
          <van-button size="small" color="#f4b" @click="submitImg()">发布</van-button>
<!--          <van-button size="small" color="#f4b" @click="newSubmitForm()">发布</van-button>-->
        </template>
      </van-nav-bar>
      <!--添加标签-->
      <div style="margin: 0px 10px">
        <!--添加标签-->
        <el-tag :key="index"
                v-for="(tag,index) in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                style="float: left;cursor: pointer;margin: 0px 5px">
          {{tag.tagsName}}
        </el-tag>
        <!--添加标签的输入框-->
        <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="tagsInputFadeOut"
        >
        </el-input>
        <!--点击显示输入框的按钮-->
        <el-button v-else class="button-new-tag"
                   style="float: left"
                   size="small"
                   @click="showInput">
          添加标签+
        </el-button>
        <br><br>
        <p style="opacity: 0.5;text-align: left">
          推荐标签（合适的标签能带来更多赞，COS、插画、绘画作品请打上‘COS’、‘插画’、‘绘画’标签哦)
        </p>
        <el-tag
                v-for="(tags,index) in modelTags"
                :disable-transitions="false"
                @click="addTags(tags)" style="margin: 5px;cursor: pointer">
          {{tags.tagsName}}
        </el-tag>
      </div>

    </div>

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

        isInputTag: false, //现在是否到了添加标签的状态

        proImgs: { //所有要上传的图片
          proImgsList: [], //所有需要上传的图片
          proImgStrings: [],
        },
        allUploadImgName: [], //所有的上传图片的名称

        isImgSetting: false, //是否展示作品权限展示
        radio: '1', //选择可见权限
        allowCopy: true, //是否允许复制
        allowWatermark: false, //是否允许添加水印
        allowTransshipment: false, //是否允许转载
        allowAmend: false, //是否允许修改
        updateImgByPrid: { //修改图片作品的首图
          prImg: '',
          prid: 0,
        },
        modelTags: [], //推荐的标签
        dynamicTags: [], //当前选择的所有标签
        inputVisible: false,
        inputValue: '', //添加标签的输入框
        moretags: false, //用来判断当前标签是否重复
        addTag: { //添加标签时的对象
          tid: 0,
          tagsName: '',
        },
        allTagsList: [], //所有的作品的标签关系对象,列表版
        allTags: { //所有的作品的标签关系对象
          aid: 0,
          tid: 0,
          allTagsList: [], //所有标签的对象
        },
        proTags: { //最新的上传到服务器的数组对象
          proTagsList: [],
          proTagsInteger: [], //所有的tid
        },
        imgName:[], //上传图片的名称
      };
    },
    created() {
      //请求推荐的标签名称
      axios.get("/api/showTags")
          .then(res => {
            // alert("获取成功")
            console.log(res.data)
            this.modelTags = res.data
          })




    },
    methods: {
      //把console.log打印到页面上
      show() {
        var infoConsole = document.getElementById('info');
        if (infoConsole) {
          if (console) {
            var _console = {
              log: console.log
            }
            console.log = function (attr) {
              _console.log(attr);
              var str = JSON.stringify(attr, null, 4);
              var node = document.createElement("H1");
              var textnode = document.createTextNode(str);

              node.appendChild(textnode);
              infoConsole.appendChild(node);
            }
          }
        }
        var type = infoConsole.getAttribute("type");
        if (type === "0") {
          infoConsole.style.cssText = "width:100vw;height:40vh;";
          infoConsole.setAttribute("type", "1");
        } else {
          infoConsole.removeAttribute('style');
          infoConsole.setAttribute("type", "0");
        }
      },
      //返回到推荐页面
      onClickLeft() {
        Toast('返回');
        this.$router.replace("/recommend-page")
      },
      //取消某个标签的添加
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      //展示添加标签输入框
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //取消输入框显示
      tagsInputFadeOut() {
        this.inputVisible = false;
      },
      //插入一个标签
      handleInputConfirm() {
        let inputValue = this.inputValue;

        this.addTag.tagsName = inputValue

        var tags = {tagsName: '', tid: 0}
        tags.tagsName = this.inputValue

        //插入进入一个标签
        axios.get("/api/insertTags?tagsName=" + tags.tagsName)
            .then(res => {
              if (res.data == 1) {
                // alert("添加标签成功")
                //获取刚刚插入的tid
                axios.get("/api/selectTagsNewestTid")
                    .then(res => {
                      tags.tid = res.data
                    })

              } else {
                axios.get("/api/getTagsByTagsName?tagsName=" + tags.tagsName)
                    .then(res => {
                      console.log("这里是用户添加的标签在数据库中的值")
                      console.log(res.data)
                      tags.tid = res.data.tid

                    })


              }
            })

        //添加到待上传阵列中
        this.dynamicTags.push(tags);

        //所有作品的标签在这里
        this.allTagsList.push(tags)

        this.inputValue = '';
      },
      addTags(index) {
        console.log(index.tags_name)
        if (this.dynamicTags == "") {
          // alert("第一次点击")
          this.dynamicTags.push(index)

          //所有作品的标签添加
          this.allTagsList.push(index)

          console.log(this.dynamicTags)
        } else {
          for (var i = 0; i < this.dynamicTags.length; i++) {
            // if (this.dynamicTags[i].tags_name == index.tags_name) {
            if (this.dynamicTags[i].tagsName == index.tagsName) {
              this.moretags = false
              alert("不能添加相同的标签")
            } else {
              this.moretags = true

            }
          }
          if (this.moretags) {
            this.dynamicTags.push(index)

            this.allTagsList.push(index)

            console.log(this.dynamicTags)
          }
        }

      },
      //图片简介和图片选择好了，准备添加标签
      onClickRight() {
        //让标签的页面展示出来
        this.isInputTag = true;
        console.log(this.isInputTag)
      },
      //真正的最后选择完标签后的上传图片作品事件
      submitImg() {
        Toast('按钮');
        alert("图片简介和图片选择好了，准备添加标签")
        //确定上传

        //先判断用户是否登录
        if (this.$store.state.user.uid == null || this.$store.state.user.uid == "") {
          alert("请登录后再发布图片作品")
        } else {
          //判断是否添加了图片
          // if (this.img == "" || this.img == null) {
          if (this.fileList == "" || this.fileList == null) {
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
            // this.$refs.newupload.submit();

            //把标签和当前作品的关系上传到dynamicTags表中
            let _this = this

            //把查看的状态登录可见或所有人可见
            this.proContent.uid = this.$store.state.user.uid;
            //允许登录访问或者所有人可见的权限
            this.proContent.prPermission = this.radio;


            //禁止转载
            if (this.allowTransshipment == true) {
              this.proContent.prReprint = 1;
            }
            //禁止修改
            if (this.allowAmend == true) {
              this.proContent.prReprint = 2;
            }
            //即禁止转载又禁止修改
            if (this.allowTransshipment == true && this.allowAmend == true) {
              this.proContent.prReprint = 3;
            }
            //允许保存图片
            if (this.allowCopy == true) {
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
                          this.updateImgByPrid.prImg = "http://192.168.0.101:8090/static/img/" + this.allUploadImgName[0]
                          this.updateImgByPrid.prid = prid
                          axios.post("/api/updateProImgByPrid", _this.updateImgByPrid)
                              .then(res => {
                                alert("首图修改成功")
                                // console.log("首图修改成功")
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
      //把填写的简介赋值到要上传的对象中
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
        alert(file)
        alert(file.length)
        // alert("图片全部加载完毕，准备上传")
        //把文件中的所有文件的名称赋值到allUpload中
        for (var i = 0; i < file.length; i++) {
          this.allUploadImgName[i] = file[i].file.name
          // alert("不会是这里出问题了吧")
        }

       /* console.log("这里是所有文件的名称");
        console.log(this.allUploadImgName)
        alert(this.allUploadImgName)
*/
      /*  console.log(file)
        if (file.length == 1) {
          alert("开始上传图片")
          //上传不添加水印的图片
          this.$axioss.post("/api/uploads", fd)
              .then(res => {
                if (res.data == 1) {
                  alert("上传成功！")
                }

              })
        }*/
        //把所有的图片循环插入到后台中
        for (var i = 0; i < file.length; i++) {
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
            // alert("开始上传图片")
            console.log(file)
            //上传不添加水印的图片
            this.$axioss.post("/api/uploads", fd)
                .then(res => {
                  if (res.data == 1) {
                    // alert("上传成功！")
                  }

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
        this.imgName.push("http://192.168.0.101:8090/static/img/" + file.name)
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
      gotoSetting() {
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
  #info {
    position: fixed;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: rgba(10, 10, 10, .8);
    overflow: scroll;
    font-size: 10px;
    z-index: 999;
    -webkit-tap-highlight-color: transparent;
  }

  #info h1 {
    color: green;
    word-wrap: break-word;
    white-space: pre;
  }

  #info h1:nth-child(odd) {
    background-color: rgba(0, 0, 0, .4);
  }
</style>