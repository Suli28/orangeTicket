<template>
  <div class="buy-movie-tick">
    <van-nav-bar title="座位选择" left-arrow @click-left="back" />
    <!-- <div class="bg" :style="{backgroundImage: 'url(' + data.images.large + ')'}"> -->
    <label class="city">
      选择城市：
      <input v-model="location" class="cityIpt"/>
    </label>
    <label class="cinema">
      选择影院：
      
      <input v-model="keyword" class="cinemaIpt" placeholder="请输入附近影院"/>
    </label>
    <baidu-map>
      <bm-view class="map"></bm-view>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
    </baidu-map>

    
    <!-- </div> -->
    <div class="seat-box">
      <div class="tick-box">
        <ul class="tick clearfix" :style="{width: width + 'px'}">
          <li ref="userchair" v-for="(item, index) in userChairData" :key="index">
            <span class="c c1"></span>
            <i class="r r1"></i>
            {{item.row}}排{{item.col}}座
            <span class="c c2"></span>
            <i class="r r2"></i>
          </li>
        </ul>
      </div>

      <!-- 银屏 -->
      <div class="screen">
        <div class="screen-arc"></div>
        <div class="screen-arc1"></div>
      </div>

      <!-- 座位 -->
      <div class="chair-box">
        <div
          class="chair"
          :class="index == 0 ? 'chair1' : index == 6 ? 'chair3' : 'chair2'"
          v-for="(item, index) in chairDatas"
          :key="index"
        >
          <span
            v-for="(value, key) in item"
            :key="key"
            :class="{s3: index > 0 && index < 6 && key == 2, s8: index > 0 && index < 6 && key == 7, buying: value.type == 'buying', selected: value.type == 'selected'}"
            @click="selectChair(value)"
          ></span>
        </div>
      </div>

      <!-- 座位标志 -->
      <div class="chair-flag clearfix">
        <div>
          <div class="c-box clearfix">
            <i class="c-bg fl c-bg1"></i>
            <span class="fl buyed">已售</span>
          </div>
        </div>

        <div>
          <div class="c-box clearfix m-box">
            <i class="c-bg fl c-bg2"></i>
            <span class="fl buyed">已选</span>
          </div>
        </div>

        <div>
          <div class="c-box clearfix fr">
            <i class="c-bg fl c-bg3"></i>
            <span class="fl buyed">可选</span>
          </div>
        </div>
      </div>

      <!-- 购票 -->
      <div class="buy-tick">
        <span class="fl total">合计：￥00.00</span>
        <span class="fr pay">确认支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers(
  "buyMovieTickModule"
);

export default {
  name: "buyMovieTick",

  computed: {
    ...mapState(["data", "chairDatas", "userChairData", "width"])
  },
  data() {
    return {
      location: "广州",
      keyword: "请输入附近影院"
    };
  },
  methods: {
    ...mapMutations(["resetData"]),

    //选择座位
    selectChair(item) {
      //不能选择已经购买的
      if (item.type == "selected") {
        return;
      }

      //没有选择的, 高亮显示座位
      if (item.type == "") {
        item.type = "buying";

        //提交mutations
        this.$store.commit("buyMovieTickModule/changeChairData", item);

        //提交actions
        this.$store
          .dispatch("buyMovieTickModule/addUserChairData", item)
          .then(() => {
            let firstLi = this.$refs.userchair[0];
            let width = firstLi.offsetWidth;
            let marginRight = parseFloat(getComputedStyle(firstLi).marginRight);
            this.$store.commit(
              "buyMovieTickModule/modifyUlWidth",
              (width + marginRight) * this.userChairData.length
            );
          });
      } else if (item.type == "buying") {
        //已选，取消选择

        item.type = "";
        this.$store.commit("buyMovieTickModule/changeChairData", item);

        this.$store
          .dispatch("buyMovieTickModule/deleteUserChairData", item)
          .then(() => {
            let firstLi = this.$refs.userchair[0];

            if (!firstLi) {
              this.$store.commit("buyMovieTickModule/modifyUlWidth", 0);
              return;
            }

            let width = firstLi.offsetWidth;
            let marginRight = parseFloat(getComputedStyle(firstLi).marginRight);
            this.$store.commit(
              "buyMovieTickModule/modifyUlWidth",
              (width + marginRight) * this.userChairData.length
            );
          });
      }
    },

    //返回上一级
    back() {
      this.$router.go(-1);
    }
  },

  created() {
    //重置state的data
    this.resetData();

    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    //截取查询参数
    let queryId = this.$route.query.id;

    //请求
    this.axios({
      method: "GET",
      header: {
        "content-type": "json"
      },
      url: "https://douban.uieee.com/v2/movie/subject/" + queryId
    })
      .then(result => {
        console.log(result);
        this.$store.commit("buyMovieTickModule/getData", result.data);

        this.$toast.clear();
      })
      .catch(err => {
        this.$toast.clear();
      });
  }
};
</script>

<style lang="less" scoped>
.buy-movie-tick {
  .van-nav-bar .van-icon{
    color: #FF9E01;
  }
  .city{
    width: calc(100% / 2);
    float: left;

    .cityIpt{
      width: calc(100% - ( 100% / 2) )
    }
  }
  .cinema{
    width: calc(100% / 2);
    float: right;

    .cinemaIpt{
      width: calc(100% - ( 100% / 2) )
    }
  }

  .map {
  width: 100%;
  height: 400px;
}

  // .bg {
  //   height: 200px;
  //   background-position: center center;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   .van-nav-bar {
  //     background-color: transparent;
  //   }
  //   .van-nav-bar__text,
  //   .van-nav-bar__title,
  //   .van-nav-bar .van-icon {
  //     color: #fff;
  //   }
  //   [class*="van-hairline"]::after {
  //     border: none;
  //   }
  // }
  .seat-box {
    position: fixed;
    top: 180px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 30px;
  }
  .tick-box {
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 10px;
    .tick {
      height: 36px;
      > li {
        float: left;
        width: 80px;
        height: 32px;
        border: 1px solid #ff9800;
        position: relative;
        text-align: center;
        font-size: 16px;
        line-height: 32px;
        background-color: #ffbb42;
        color: #fff;
        margin-right: 10px;
      }
      .r {
        position: absolute;
        width: 10px;
        height: 10px;
        border: 1px solid #ff9800;

        top: 0;
        bottom: 0;
        margin: auto 0;
        border-radius: 50%;
        background-color: #fff;
        z-index: 1;
      }
      .r1 {
        left: -7px;
      }
      .c1 {
        left: -8px;
      }
      .r2 {
        right: -7px;
      }
      .c2 {
        right: -8px;
      }
      .c {
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: #fff;
        width: 7px;
        z-index: 2;
      }
    }
  }
  .screen {
    width: 300px;
    height: 60px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .screen-arc {
      width: 500px;
      height: 200px;
      border-radius: 50%;
      border: 3px solid #ffae00;
      position: absolute;
      top: 15px;
      left: -100px;
    }

    .screen-arc1 {
      width: 500px;
      height: 200px;
      border-radius: 50%;
      border: 3px solid rgba(255, 243, 199, 0.6);
      position: absolute;
      top: 18px;
      left: -100px;
    }
  }
  .buy-tick {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 54px;
    width: calc(~"100% - 20px");
    background-color: #fff;
    box-shadow: 0px 0px 5px 1px #ccc;
    padding: 0 10px;
    .total {
      line-height: 54px;
      font-size: 16px;
    }
    .pay {
      width: 80px;
      height: 34px;
      background-image: linear-gradient(to bottom, #fed73e, #ffbe46);
      color: #fff;
      font-size: 13px;
      text-align: center;
      line-height: 34px;
      border-radius: 10px;
      border-bottom: 2px solid #ff9a00;
      letter-spacing: 2px;
      margin-top: 10px;
    }
  }
  .chair-box {
    padding: 0 10px;
  }
  .chair {
    margin: 0 auto;
    height: 24px;
    margin-bottom: 8px;
    &.chair1 {
      width: 96px;
    }
    &.chair2 {
      width: 352px;
      > span {
        &.s3,
        &.s8 {
          margin-left: 36px;
        }
      }
    }
    &.chair3 {
      width: 160px;
    }
    > span {
      float: left;
      width: 24px;
      height: 24px;
      margin: 0 4px;
      background: url("../assets/images/chair2.png") no-repeat center center;
      background-size: 24px 24px;
      &.selected {
        background-image: url("../assets/images/chair1.png");
      }
      &.buying {
        background-image: url("../assets/images/chair3.png");
      }
    }
  }
  .chair-flag {
    margin: 20px 80px 0;
    .c-box {
      width: 50px;
    }
    .m-box {
      margin: 0 auto;
    }
    > div {
      float: left;
      width: calc(~"100% / 3");
      height: 30px;
      .c-bg {
        width: 12px;
        height: 8px;
        margin-top: 12px;
        &.c-bg1 {
          background-color: #e7e6e5;
        }
        &.c-bg2 {
          background-color: #ffbc32;
        }
        &.c-bg3 {
          background-color: #686258;
        }
      }
      .buyed {
        line-height: 30px;
        font-size: 10px;
        margin-left: 5px;
      }
    }
  }
}
</style>