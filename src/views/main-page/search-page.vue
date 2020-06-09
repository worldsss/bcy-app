<template>
  <div>
    <navbar-tab/>
    <!--搜索栏-->
    <form action="/">
      <van-search
              v-model="searchValue"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
      />
    </form>

  </div>
</template>

<script>
  import NavbarTab from '../../components/main-page-component/navbar-tab'

  export default {
    name: "",
    components: {
      NavbarTab,
    },
    data(){
      return{
        searchValue: '', //搜索栏的关键词

      }
    },
    created() {

    },
    methods:{
      onSearch(val) {
        Toast(val);
      },
      onCancel() {
        Toast('取消');
      },
    }
  }
</script>

<style scoped>

</style>