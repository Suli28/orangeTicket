export const mutations = {

  //查看密码
  checkPassword(state, key) {
    // console.log('key ==> ', key);

    // console.log(state[key].value);

    let isOpen = state[key].type === 'password';

    state[key].type = isOpen ? 'text' : 'password';

    state[key].icon = isOpen ? 'eye-o' : 'closed-eye';
  },


  //点击注册
  register(state, pass) {
    state.isLoading = pass;
  },

  //验证用户名
  validUsername(state, isValid) {
    state.user.errorMessage = isValid ? '' : '用户名支持4-8个(字母数字_)组合，必须字母开头';
  },

  //验证密码
  validPwd(state, isValid) {
    state.pwd1.errorMessage = isValid ? '' : '密码支持6-16个(字母数字_)组合，必须含有大小写字母';
  },

  //验证用户名、验证密码
  validUP(state, o) {
    state[o.key].errorMessage = o.isValid ? '' : o.errorMessage;
  },

  //验证两值相等
  validEqual(state, isValid) {
    state.pwd2.errorMessage = isValid ? '' : '两次密码不一致';
  },

  //passForm
  passForm(state) {
    state.isValid = (state.user.errorMessage == '' && state.user.value != '') && (state.pwd1.errorMessage == '' && state.pwd1.value != '') && (state.pwd2.errorMessage == '' && state.pwd2.value != '') && (state.pwd1.value == state.pwd2.value);
  }
}