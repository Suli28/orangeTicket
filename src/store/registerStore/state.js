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

  //确认密码
  pwd2: {
    type: 'password',
    value: '',
    icon: 'closed-eye',
    errorMessage: ''
  },

  //注册加载中
  isLoading: false,

  //控制注册按钮的状态
  isValid: false


}