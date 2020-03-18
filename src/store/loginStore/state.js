export const state = {

  //用户名
  user: {
    value: '',
    errorMessage: ''
  },

  //密码
  pwd1: {
    type: 'password',
    value: '',
    icon: 'closed-eye',
    errorMessage: ''
  },

  //登录加载中
  isLoading: false,

  //控制登录按钮的状态
  isValid: false

};