<template>
  <div>
    <el-col :span="8">
      <el-card :body-style="{ padding: '5px' }" class="card-class">
        <!-- 插槽图片-->
<!--        <a href="#" class="imgs-a">-->
          <slot name="img"></slot>
<!--        </a>-->
        <!--插槽阴影-->
        <div class="img-shade">
            <span class="imgs-giveup">
                <i class="el-icon-lollipop"></i>
                <slot name="img-giveup"></slot>
            </span>
        </div>
        <div class="imgs-button" :style="rankbackcolor">
            <span class="imgs-span">
                <slot name="img-counts"></slot>
            </span>
        </div>
        <div class="img-avator-div">
          <!-- 插槽头像-->
          <slot name="avatar"></slot>
          <p class="img-p">
            <!-- 插槽用户名-->
            <slot name="name"></slot>
          </p>
        </div>

      </el-card>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      rankbackcolor: {
        type: String,
        default: ' background-color:#a1a1a6'
      }
    }
  }
</script>

<style scoped>
  .img-avator-div {
    position: absolute;
    left: 10px;
    bottom: 0px;
    display: inline
  }

  .img-p {
    font-size: 14px;
    color: white;
    float: right;
    margin: 7px 10px 0px 5px;
    padding-bottom: 10px;
  }

  .card-class {
    position: relative;

  }

  .imgs-a {
    width: 100%;
    display: block;
    height: 250px;
  }

  .imgs-button {
    border: 1px solid;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: center;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
  }

  .imgs-span {
    display: block;
    margin-top: 3px;
    color: white;
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

  .imgs-giveup {
    margin-right: 15px;
    color: white;
  }


</style>