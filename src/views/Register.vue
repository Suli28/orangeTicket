<template>
  <div class="register">
    <div class="app-logo">
      <div class="logo"></div>

      <div class="regist">
        <van-cell-group class="form">
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
          <van-field
            v-model="pwd2.value"
            :type="pwd2.type"
            label="确认密码"
            placeholder="请输入确认密码"
            :right-icon="pwd2.icon"
            :error-message="pwd2.errorMessage"
            @click-right-icon="checkPassword('pwd2')"
            @input="validEqual(pwd1.value, pwd2.value)"
          />
        </van-cell-group>
        <div class="register-form">
          <!-- <router-link to="/login"> -->
            <van-button
              class="register-btn"
              :loading="isLoading"
              type="info"
              block
              loading-text="注册中..."
              text="注册"
              @click="register"
              :disabled="!isValid" color="#FEC636"
            />
          <!-- </router-link> -->
        </div>
        <div class="login">
          <router-link class="login-text" to="/login">已有账号？登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {validForm} from '../tool/validForm'

  import {createNamespacedHelpers} from 'vuex'

  //基于registerModule的命名空间导入mapState、mapMutations 辅助函数

  const {mapState, mapMutations} = createNamespacedHelpers('registerModule');

  export default {
    name: 'register',

    //计算属性
    computed: {
      ...mapState(['pwd1', 'pwd2', 'isLoading', 'isValid', 'user'])
    },

    //方法
    methods: {
      ...mapMutations(['checkPassword']),

      register() {

        let self = this;

        //注册
        this.$store.commit('registerModule/register', true);

        let randomTime = Math.random() * 5 * 1000;

        setTimeout(function () {

           //获取所有用户信息
          let users = localStorage.getItem('users');

          users = users ? JSON.parse(users) : [];

          // console.log('users ==> ', users);

          //判断当前用户是否存在
          for (let i = 0; i < users.length; i++) {
            if (users[i].username == self.user.value) {
              self.$toast({
                duration: 2000,
                message: '该用户已存在'
              })
              self.$store.commit('registerModule/register', false);
              return;
            }
          }

          self.$toast({
            duration: 2000,
            message: '注册成功'
          })

          self.$store.commit('registerModule/register', false);

          let time = new Date().getTime();

          //记录用户信息
          let userInformation = {
            //用户名
            username: self.user.value,

            //密码
            pwd: self.pwd1.value,

            //注册时间
            time
          };

          //将当前用户信息推进users
          users.push(userInformation);

          //写入本地存储，模拟数据库
          localStorage.setItem('users', JSON.stringify(users));


          //跳转到登录页面
          self.$router.push({name: 'login'});

        }, randomTime)


      },

      //输入验证表单

      //验证用户名
      validUsername(value) {
        // console.log('value ==> ', value);

        let isValid = validForm.validUsername(value);

        this.$store.commit('registerModule/validUsername', isValid)

      },

      //验证密码
      validPwd(value) {
        let isValid = validForm.validPwd(value);

        this.$store.commit('registerModule/validPwd', isValid);
      },

      //验证两值相等
      validEqual(v1, v2) {
        let isValid = validForm.validEqual(v1, v2);

        this.$store.commit('registerModule/validEqual', isValid);

        this.$store.commit('registerModule/passForm');
      },

      //验证用户名或者密码
      validUP(value, fnName, o) {
        let isValid = validForm[fnName](value);

        // console.log('isValid ==> ', isValid);

        o.isValid = isValid;

        this.$store.commit('registerModule/validUP', o);

        this.$store.commit('registerModule/passForm');
      }

    }

  }
</script>

<style lang="less" scoped>
.register {
  .app-logo {
    width: 375px;
    height: 667px;
    position: relative;
    background: url("../assets/images/bg1.jpg");
    background-size: cover;
    .logo {
      position: absolute;
      top: -12rem;
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
      box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
    }
  }
  .regist{
    position: absolute;
    top: 6rem;
    left: 0;
    right: 0;
  }
  .form{
    background:rgba(255,255,255,0.3);
  }

  .register-form {
    padding: 10px;
  }
  .register-btn {
    
    margin-top: 50px;
  }
  .login {
    margin-top: 20px;
    text-align: center;
  }
  .login-text {
    color: #666;
  }
}
</style>
