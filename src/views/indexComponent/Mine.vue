<template>
  <div class="mine">
    <div class="mine-bg">
      <!-- <div class="bg-flower"></div>
      <span class="fr logout" @click="login">{{userInfo.loginText}}</span> -->
    </div>
    <div class="mine-box">
      <div class="mine-boxing">
        <div class="user-boxing">
          <div class="user-logo">
           
          </div>
          <div class="username-line"><span>您好,</span><span class="username">{{userInfo.username}}</span></div>
        </div>
        <!-- <div class="user-box">
          <div></div>
          头像
          <div class="user-avatar"></div>
        </div> -->

        <div class="item">
          <van-grid :column-num="column">
            <van-grid-item icon="coupon-o" text="电影票" />
            <van-grid-item @click="viewLikeMovie" icon="like-o" text="想看" />
          </van-grid>
        </div>

        <div>
          <router-link to="/login"><van-cell title="重新登陆" icon="contact">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
          </van-cell></router-link>
          <van-cell title="设置" icon="setting-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("mineModule");

export default {
  name: "mine",

  data() {
    return {
      column: 2
    };
  },

  computed: {
    ...mapState(["userInfo"])
  },

  methods: {
    //退出或者登录
    login() {
      let userStatus = localStorage.getItem("user");

      if (userStatus) {
        let userInfo = JSON.parse(userStatus);

        if (userInfo.isLogin) {
          // console.log("清空登录状态");

          localStorage.removeItem("user");

          this.$store.commit("mineModule/changeUserInfo", {
            loginText: "登录",
            username: ""
          });
        } else {
          this.$router.push({ name: "login" });
        }
      } else {
        this.$router.push({ name: "login" });
      }
    },

    //查看我的收藏电影
    viewLikeMovie() {
      //验证是否登录
      let userStatus = localStorage.getItem("user");

      if (userStatus) {
        let userInfo = JSON.parse(userStatus);

        //如果登录
        if (userInfo.isLogin) {
          // console.log("查看我的收藏电影");

          this.$router.push({ name: "likeMovie" });
        } else {
          //如果未登录
          this.$toast("请先登录");
        }
      } else {
        //未登录
        this.$toast("请先登录");
      }
    }
  },

  created() {
    // console.log("mine created");

    //获取用户信息
    let userStatus = localStorage.getItem("user");

    if (userStatus) {
      let user = JSON.parse(userStatus);

      if (user.isLogin) {
        this.$store.commit("mineModule/changeUserInfo", {
          loginText: "退出",
          username: user.username
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  .logout {
    color: #fff;
    font-size: 14px;
    margin-right: 20px;
    margin-top: 20px;
  }
  .item {
    color: #666;
    margin-top: 3.5rem;
  }
  .mine-bg {
    height: 200px;
    
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;

    width: 375px;
      height: 200px;
      // background: #FFE300;
      background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576161155217&di=fa4a6d1bfe227d01403546b0f322c961&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2Ff11f3a292df5e0fe9cd83b76506034a85fdf7280.jpg")
        no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      border-radius: 15px;
      position: relative;
      box-shadow: 8px 7px 1px 1px rgba(0, 0, 0, 0.1);
    // .bg-flower {
    //   width: 375px;
    //   height: 200px;
    //   // background: #FFE300;
    //   background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576161155217&di=fa4a6d1bfe227d01403546b0f322c961&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2Ff11f3a292df5e0fe9cd83b76506034a85fdf7280.jpg")
    //     no-repeat;
    //   background-size: 100% 100%;
    //   background-position: center center;
    //   border-radius: 15px;
    //   position: relative;
    //   box-shadow: 8px 7px 1px 1px rgba(0, 0, 0, 0.1);
      
    // }
  }
  .auto-img{
    width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576161338143&di=55dfc0526023ddc48ef62c3cffc1aac7&imgtype=0&src=http%3A%2F%2Fwww.xiaozhuren.com%2Fimages%2F20090724sun-star3%2F1248407114734680169.jpg")
    no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: absolute;
  top: 150px;
  left: 38%;
  }
  .mine-box {
    background-color: #fff;
    .mine-boxing {
      border-top: 5px solid #fff;
      position: relative;
    }
    .user-boxing {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 80px;
      background-color: #fff;
      z-index: 2;
      .user-logo {
         width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576161338143&di=55dfc0526023ddc48ef62c3cffc1aac7&imgtype=0&src=http%3A%2F%2Fwww.xiaozhuren.com%2Fimages%2F20090724sun-star3%2F1248407114734680169.jpg")
    no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: absolute;
  // top: 150px;
  left: 38%;
      }
    }
    .user-box {
      height: 80px;
      background-color: #ccc;
      position: relative;
      z-index: 1;
      .user-avatar {
        position: absolute;
        left: 40px;
        top: -40px;
        width: 80px;
        height: 80px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0px 0px 0px 5px #fff;
      }
    }
  }
  .username-line {
    margin-left: 150px;
    font-size: 18px;
    color: #ff9700;
    // padding: 10px 0;
    margin-top: 3rem;
  }
}
</style>