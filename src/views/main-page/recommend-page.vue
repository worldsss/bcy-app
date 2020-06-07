<template>
  <div>

<!--    <van-tab></van-tab>-->

    <water-fall-all-content v-for="(item,index) in waterFallAllContent01"
                            :water-all-content="item">

    </water-fall-all-content>
  </div>
</template>

<script>
  import WaterFallAllContent from '../../components/waterfall-all-component/waterfall-all-content'

  export default {
    name: "",
    components:{
      WaterFallAllContent
    },
    data(){
      return{
        waterFallAllContent01:[], //所有的内容
      }
    },
    created() {
      //奇数页所有作品的展示，未登录版
      // axios.get("http://localhost:8090/listAllContentPaging")
      this.$axioss.get("/api/listAllContentPaging")
          .then(res => {
            if (res.data != null) {
              console.log("这里是全部的内容的奇数分页版");
              console.log(res.data)
              this.waterFallAllContent01.push(res.data.list)
              this.waterContentLoading01 = false
            }
          })
    }
  }
</script>

<style scoped>

</style>