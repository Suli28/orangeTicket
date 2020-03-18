<template>
  <div class="register">
    <div class="app-logo">
      <div class="logo"></div>
    </div>
    <div class="regist">
      <van-cell-group>
        <van-field
          v-model="user.value"
          type="text"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="user.errorMessage"
          @input="validUP(user.value, 'validUsername', {key: 'user', errorMessage: '用户名支持4-8个(字母数字_)组合，必须字母开头'})"
        />
        <van-field
          v-model="pwd1.value"
          :type="pwd1.type"
          label="密码"
          placeholder="请输入密码"
          :right-icon="pwd1.icon"
          :error-message="pwd1.errorMessage"
          @click-right-icon="checkPassword('pwd1')"
          @input="validUP(pwd1.value, 'validPwd', {key: 'pwd1', errorMessage: '密码支持6-16个(字母数字_)组合，必须含有大小写字母'})"
        />

      </van-cell-group>
      <div class="register-form">
       <van-button class="register-btn" :loading="isLoading" type="info" block loading-text="登录中..." 
        text="登录" @click="login" :disabled="!isValid" color="#FEC636"/>
      </div>
      <div class="login"><router-link class="login-text" to="/register">没有账号？注册</router-link></div>
    </div>
  </div>
</template>

<script>

import {validForm} from '../tool/validForm'

  import {createNamespacedHelpers} from 'vuex'

  //基于loginModule的命名空间导入mapState、mapMutations 辅助函数

  const {mapState, mapMutations} = createNamespacedHelpers('loginModule');

  export default {
    name: 'login',

    computed: {
      ...mapState(['isLoading', 'user', 'pwd1', 'isValid'])
    },

    methods: {

      ...mapMutations(['checkPassword']),

      //登录
      login() {
        // console.log('a');
        this.$store.commit('loginModule/login', true);

        let randomTime = Math.random() * 5 * 1000;

        setTimeout(() => {
          //获取所有用户
          let users = localStorage.getItem('users');

          users = users ? JSON.parse(users) : [];

          if (users.length === 0) {
            this.$toast({
              duration: 2000,
              message: '该用户不存在'
            })
            this.$store.commit('loginModule/login', false);
            return;
          }

          //查找用户
          for (let i = 0; i < users.length; i++) {
            if (users[i].username == this.user.value) {
              //如果该用户存在
              //匹配密码
              if (users[i].pwd == this.pwd1.value) {
                this.$toast({
                  duration: 2000,
                  message: '登录成功'
                })
                this.$store.commit('loginModule/login', false);

                //跳转到首页
                //记录用户登录状态
                let user = {
                  isLogin: true,
                  username: this.user.value
                };
                
                localStorage.setItem('user', JSON.stringify(user));

                return this.$router.push({name: 'home'});
              } else {
                this.$toast({
                  duration: 2000,
                  message: '用户名或者密码不正确'
                })
                this.$store.commit('loginModule/login', false);
                return;
              }
            }
          }

          //用户不存在
          this.$toast({
            duration: 2000,
            message: '该用户不存在'
          })
          this.$store.commit('loginModule/login', false);

        }, randomTime)
        
      },

      //验证用户名或者密码
      validUP(value, fnName, o) {
        let isValid = validForm[fnName](value);

        // console.log('isValid ==> ', isValid);

        o.isValid = isValid;

        this.$store.commit('loginModule/validUP', o);

        this.$store.commit('loginModule/passForm');
      }

    }
  }
</script>

<style lang="less" scoped>
  .register{
    .app-logo{
      width: 375px;
      height: 667px;
      position: relative;
      background: url("../assets/images/bg1.jpg");
      background-position: center center;
      background-size: cover;
      .logo{
        position: absolute;
        top: -11rem;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        // transform: translate(-50%, -50%);
      background:url('../assets/images/touxiang.png') no-repeat;
      background-size: cover;
      background-position: center center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: 0 0 0 5px rgba(255, 255, 255, .3);
      }
    }
    .regist{
    position: absolute;
    top: 7rem;
    left: 0;
    right: 0;
    }

    .register-form{
      padding: 10px;
    }
    .register-btn{
      margin-top: 50px;
    }
    .login{
      margin-top: 20px;
      text-align: center;
    }
    .login-text{
      color: #666;
    }
  }
</style>