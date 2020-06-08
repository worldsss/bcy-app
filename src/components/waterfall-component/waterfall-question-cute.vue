<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="2">
          <slot name="question-avatar"></slot>
        </el-col>
        <el-col :span="leftSpan">

          <!--回答的名字和日期-->
          <div style="margin-bottom: 5px;">
             <span style="font-weight: bolder;font-size: 18px">
                <slot name="question-name"></slot>
            </span>
            <slot name="question-date"></slot>
          </div>


          <h3 style="margin: 0px 0px 0px 0px">
            <!-- 这里是问题，你平常吃饭吗？之类的-->
            <slot name="question-text"></slot>
          </h3>

          <p style="margin-top: 5px">
            <el-link href="#" :underline="false">
              <el-row :gutter="10">
               <el-col :span="20">
                 <!--  这里是回答名称-->
                 <slot name="question-nameLink"></slot>
                 <slot name="question-content">
                   <slot name="question-answer-userName"></slot>
                   <!--这里是回答的内容-->
                   <slot name="question-answer-content"></slot>
                 </slot>
               </el-col>
                <!--当前问答的回答的首图-->
               <el-col :span="2" v-if="leftSpan!=18">
                 <slot name="question-firstImg"></slot>
               </el-col>
              </el-row>
             <!-- &lt;!&ndash;  这里是回答名称&ndash;&gt;
              <slot name="question-nameLink"></slot>
              <slot name="question-content">
                <slot name="question-answer-userName"></slot>
                &lt;!&ndash;这里是回答的内容&ndash;&gt;
                <slot name="question-answer-content"></slot>
              </slot>-->

            </el-link>
          </p>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-link  :underline="false" type="info">
<!--                <slot name="question-collect"></slot>-->
                <slot name="question-collect" icon="el-icon-star-off"
                      :underline="false" type="info">
                </slot>
              </el-link>
            </el-col>
            <el-col :span="6">
              <el-link icon="el-icon-position" :underline="false" type="info">
                <slot name="question-go"></slot>
              </el-link>
            </el-col>
            <el-col :span="6">
              <el-link icon="el-icon-chat-line-round" :underline="false" type="info">
                <slot name="question-comment"></slot>
              </el-link>
            </el-col>
            <el-col :span="6">
              <el-link icon="el-icon-view" :underline="false" type="info">
                <slot name="question-click"></slot>
              </el-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="rightSpan" v-if="leftSpan==18">
          <slot name="question-firstImg"></slot>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      leftSpan:{
        type:Number,
        default:18
      },
      rightSpan:{
        type:Number,
        default:2
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>