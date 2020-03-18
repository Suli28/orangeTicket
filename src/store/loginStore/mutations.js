export const mutations = {

  //点击登录
  login(state, pass) {
    state.isLoading = pass;
  },

  //验证用户名、验证密码
  validUP(state, o) {
    state[o.key].errorMessage = o.isValid ? '' : o.errorMessage;
  },

  //查看密码
  checkPassword(state, key) {
    // console.log('key ==> ', key);

    // console.log(state[key].value);

    let isOpen = state[key].type === 'password';

    state[key].type = isOpen ? 'text' : 'password';

    state[key].icon = isOpen ? 'eye-o' : 'closed-eye';
  },

  //passForm
  passForm(state) {
    state.isValid = (state.user.errorMessage == '' && state.user.value != '') && (state.pwd1.errorMessage == '' && state.pwd1.value != '');
  }

};