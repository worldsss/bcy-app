import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { //当前登录的用户信息
      uid: 0,
      userName: '',
      userPassword: '',
      userAvatar: '',
      userInfo: '',
      userSex: '',
      userArea: '',
      userAttention: 0,
      userFans: 0,
      userGivelike: 0,
    },
    admin: { //管理员登录后保存权限
      isAdmin:0,
    },
    userOnlineChatRoom:{ //网络聊天室中的信息
      userLetterSend:[], //当前用户发送
      userLetterReply:[], //其他用户发送
    },
    userIsCookie:0, //当前页面是否用cookie

  },
  mutations: {
    //把传递过来的user赋值给vuex中的
    addUserName(state, Newuser) {
      state.user = Newuser
    }
    ,
    changeUser(state, userName, uid, userAvatar) {
      /*state.user.uid = uid
      state.user.user_name = userName
      state.user.user_avatar = userAvatar*/
    },
    //退出登录状态
    outUser(state, voiduser) {
      state.user = voiduser
    },
    changeCookie(state,isCookie){
      state.userIsCookie = isCookie
    }


  }
  ,
  actions: {}
  ,
  modules: {}
})
