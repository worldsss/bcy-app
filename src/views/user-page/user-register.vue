<template>
  <div>

    <van-nav-bar  left-text="返回" left-arrow>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <h2 style="margin: 20px">注册半次元</h2>

    <van-form @submit="onSubmit">
      <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" block round>提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {Toast} from "vant";

  export default {
    name: "",
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      onClickLeft() {
        Toast('返回');
        this.$router.replace("/recommend-page")
      },
      //图片简介和图片选择好了，准备添加标签
      onClickRight() {

      },
      onSubmit(values) {
        console.log('submit', values);
      },
    },
  }
</script>

<style scoped>

</style>