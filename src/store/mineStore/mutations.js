export const mutations = {
  changeUserInfo(state, userInfo) {
    state.userInfo.loginText = userInfo.loginText;
    state.userInfo.username = userInfo.username;
  }
};