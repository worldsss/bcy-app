<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 10px;margin-bottom: 10px">
            <el-header style="padding-top: 10px">
                <el-col :span="3">
                    <!--                   头像插槽-->
                    <slot name="img-avatar"></slot>
                    <!--                    <el-avatar :size="40" :src="circleUrl"></el-avatar>-->
                </el-col>
                <el-col :span="10">
                    <p style="margin-top: 10px">
                        <!-- 姓名插槽-->
                        <slot name="img-name"></slot>
                    </p>
                </el-col>

            </el-header>
            <!-- 简介插槽-->
            <p class="pc-text-p">
                <slot name="img-text"></slot>
            </p>

            <!--图片插槽-->
            <!--<div class="pc-img-div">
                <slot name="img"></slot>
            </div>-->

            <!--图片插槽-->
            <slot name="img">
<!--                <slot name="img"></slot>-->
            </slot>

            <!--标题插槽-->
            <!--<div class="pc-text-title">
                <h3 style="margin-bottom: 0px">
                    <slot name="img-title"></slot>
                </h3>
            </div>-->

            <!--标题插槽,发现不能点击跳转到内容页面-->
            <div class="pc-text-title">
                <slot name="img-title">
<!--                    <slot name="img-title"></slot>-->
                </slot>
            </div>



            <!--            内容插槽-->
            <div class="index-text pc-text-content">
                <slot name="img-content"></slot>
            </div>

            <div style="padding: 14px 14px 0px 14px;margin: 10px auto">


                <!-- 标签插槽-->
                <slot name="img-tags">

                </slot>
                <br>
              <!--  <ul class="img-ul">
                    <li class="img-li">
                        <slot name="img-collect" icon="el-icon-star-off"
                              :underline="false" type="info">
                        </slot>
                    </li>
                    <li class="img-li">
                        <el-link icon="el-icon-position" :underline="false" type="info">
                            <slot name="img-go"></slot>
                        </el-link>
                    </li>
                    <li class="img-li">
                        <el-link icon="el-icon-chat-line-round" :underline="false" type="info">
                            <slot name="img-comment"></slot>
                        </el-link>
                    </li>
                    <li class="img-li">

                      <slot name="img-click"></slot>
                    </li>
                </ul>-->

              <!--用户点赞，访问，评论，收藏的显示-->
              <el-row :gutter="10" style="width: 90%;margin: 5px auto;text-align: center">
                <el-col :span="6">

                  <slot name="img-collect" icon="el-icon-star-off"
                        @click="userCollect()"
                        :underline="false" type="info">
                  </slot>
                </el-col>
                <el-col :span="6">
                  <el-link icon="el-icon-position" :underline="false" type="info">
                    <slot name="img-go"></slot>
                  </el-link>
                </el-col>
                <el-col :span="6">
                  <el-link icon="el-icon-chat-line-round" :underline="false" type="info">
                    <slot name="img-comment"></slot>
                  </el-link>
                </el-col>
                <el-col :span="6">
                  <slot name="img-click"></slot>
                </el-col>
              </el-row>



            </div>
        </el-card>

    </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style>
    .index-text img {
        display: none !important;
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

    /* .cute-text-img {
         !* width: 90%;
          height: 100%;
          border-radius: 10px;*!
         width: 100%;
         position: relative;
         bottom: 25%;
         border-radius: 10px;
     }
 */

    .lunbo-big {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .lunbo-small {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 500px;
        margin: 0;
    }
</style>
<style scoped>

    .pc-text-p {
        text-align: left;
        width: 90%;
        margin: 5px auto;
        overflow: hidden;
    }

    .pc-img-div {
        width: 90%;
        height: 200px;
        margin: 5px auto;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
    }
    .pc-img-ss{
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }

    .pc-text-title {
        width: 90%;
        margin: 0 auto;
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