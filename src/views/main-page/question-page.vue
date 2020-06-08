<template>
  <div>
    <!--底部导航栏-->
    <navbar-tab></navbar-tab>

    <!--搜索栏-->
    <form action="/">
      <van-search
              v-model="value"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
      />
    </form>

    <water-fall-all-question
            v-for="(item,index) in allWaterFallQuestion"
            :question-cute="item">
    </water-fall-all-question>



  </div>
</template>

<script>
  import NavbarTab from '../../components/main-page-component/navbar-tab'
  import WaterFallAllQuestion from '../../components/waterfall-all-component/waterfall-all-question'

  export default {
    name: "",
    components:{
      NavbarTab,
      WaterFallAllQuestion,

    },
    data() {
      return {
        value: '', //搜索栏的关键词
        allWaterFallQuestion:[], //所有的回答
      };
    },
    methods: {
      onSearch(val) {
        Toast(val);
      },
      onCancel() {
        Toast('取消');
      },
    },
    created() {
      this.$axioss.get("/api/selectQuIndexPaging")
          .then(res => {
            console.log(res.data)
            if (res.data != '') {

              // this.questionCute = res.data.list
              this.allWaterFallQuestion.push(res.data.list)

              var quAnswerCount = 10;

              var resLength = res.data.list.length
              // for (var i=0;i<=this.questionCute.length;i++){
              for (var i = 0; i <= resLength; i++) {
                //当里面的子值为空时
                //当值不为空时再开始判断是否有东西
                if (this.questionCute[i] != null) {

                  // console.log(this.questionCute[i].quText)
                  console.log(this.questionCute[i].quAnswerId)

                  //判断当前页面中，是否都为回答
                  if (this.questionCute[i].quAnswerId == null) {

                    quAnswerCount++;
                  }

                }


                if (i == resLength) {
                  /*//当前页面都为回答时，进行翻页
                  if (quAnswerCount == resLength) {
                    axios.get("api/selectQuIndexPaging?pageSize=10" + "&pageNumber=2")
                        .then(res => {
                          console.log("这里是第二页的数据")
                          console.log(res.data)
                          // this.questionCute = res.data.list
                          this.allWaterFallQuestion.push(res.data.list)
                        })
                  }*/
                }
              }

            }


          })

    }
  }
</script>

<style scoped>

</style>