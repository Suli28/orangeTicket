<template>
  <div class="home">
    <div class="header">
      <van-search
        class="search fl"
        
        
        placeholder="搜索相关影片、影人、影评"
        shape="round"/>
      <!-- <van-dropdown-menu class="location fr">
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu> -->
      
    </div>
   
    <div class="banner-box">
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="#FCC01F" class="img-box">
          <van-swipe-item>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579774071977&di=fe5dc6153a051310b9b2f03d6a1dd151&imgtype=0&src=http%3A%2F%2Fappdata.langya.cn%2Fuploadfile%2F2019%2F1127%2F20191127110712112.jpg"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579774085164&di=680d5d7514c414eb313b1bb6575cde1b&imgtype=0&src=http%3A%2F%2Fwww.chachaba.com%2Fnews%2Fuploads%2F191209%2F7945_191209124628_1.jpg"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2761350994,693655971&fm=11&gp=0.jpg"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579774338460&di=14b72db5aad64e486b46da2709d538c9&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2019-12-05%2F199562804.jpg"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579774401274&di=7806b60a5c33eede4ea5ffa0d45acb31&imgtype=0&src=http%3A%2F%2F08imgmini.eastday.com%2Fmobile%2F20200121%2F20200121095807_a5b95965b4feb9a84e52dffaf98b0eed_1_mwpm_03201609.jpg"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579774675876&di=55e1d95e6e13bd05803249725f640322&imgtype=0&src=http%3A%2F%2Fimg.ewang.com%2Fd14f2e3e7bd9cc81aa44.jpg"
              alt
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 电影Top250榜 -->
    <div class="new-movie">
      <div class="new-movie-title">
        <span class="fl">电影Top250榜</span>
        <span class="fr" @click="changeNewMovieData">换一换</span>
      </div>
      <div class="new-movie-content">
        <div class="new-movie-box clearfix">
          <div
            class="new-movie-item"
            v-for="(item, index) in showNewMovieData.data"
            :key="index"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="new-movie-img">
              <img class="auto-img" :src="item.images.small" alt />
            </div>
            <div class="new-movie-name one-text">{{item.title}}</div>
            <div class="star-box">
              <div class="fl clearfix star-box-count">
                <!-- 灰星 -->
                <div ref="noactivestar" class="noactive-star">
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                </div>
                <!-- 黄星 -->
                <div class="active-star" :style="{width: item.width + 'px'}">
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                </div>
              </div>
              <div class="fl star-score">{{item.rating.average}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 本周口碑榜 -->
    <div class="new-movie">
      <div class="new-movie-title">
        <span class="fl">本周口碑榜</span>
        <span class="fr" @click="changeGoodMovieData">换一换</span>
      </div>
      <div class="new-movie-content">
        <div class="new-movie-box clearfix">
          <div
            class="new-movie-item"
            v-for="(item, index) in showGoodMovieData.data"
            :key="index"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="new-movie-img">
              <img class="auto-img" :src="item.images.small" alt />
            </div>
            <div class="new-movie-name one-text">{{item.title}}</div>
            <div class="star-box">
              <div class="fl clearfix star-box-count">
                <!-- 灰星 -->
                <div ref="noactivestar" class="noactive-star">
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                </div>
                <!-- 黄星 -->
                <div class="active-star" :style="{width: item.width + 'px'}">
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                </div>
              </div>
              <div class="fl star-score">{{item.rating.average}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotMovieData from "../buyComponent/Movie";
import $ from "jquery";
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("homeModule");

export default {
  data() {
    return {
      
      // value: "",
      // timer: null,
      // movieList: [],
      // value1: 0,
      // option1: [
      //   { text: "广州", value: 0 },
      //   { text: "上海", value: 1 },
      //   { text: "深圳", value: 2 },
      //   { text: "北京", value: 3 },
      //   { text: "杭州", value: 4 }
      // ]
    };
  },
  name: "home",

  computed: {
    ...mapState([
      "baseUrl",
      "newMovieData",
      "goodMovieData",
      "showNewMovieData",
      "showGoodMovieData",
      "isHasData"
    ])
  },

  methods: {
    

    //换一换数据
    changeNewMovieData() {
      if (this.isHasData) {
        console.log("已更换数据");

        //提交换一换数据
        this.$store.commit("homeModule/toggleNewMovieData");
      }
    },
    changeGoodMovieData() {
      if (this.isHasData) {
        console.log("已更换数据");

        //提交换一换数据
        this.$store.commit("homeModule/toggleGoodMovieData");
      }
    },

    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },

    //电影Top250榜
    viewNewMovieData() {
      //开启加载提示
      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      //初始化电影Top250榜数据
      this.axios({
        method: "GET",
        url: "https://douban.uieee.com/v2/movie/top250"
        // url: this.baseUrl + "/new_movies",
      })
        .then(result => {
          result.data.subjects.forEach(v => {
            v.width = 0;
          });

          console.log("result ==> ", result);

          //提交actions
          this.$store
            .dispatch("homeModule/getNewMovieData", result.data.subjects)
            .then(() => {
              //根据星级平均分设置宽度
              let width = this.$refs.noactivestar[0].clientWidth;
              console.log("width ==> ", width);

              //提交modifyNewMovieData
              this.$store.commit("homeModule/modifyNewMovieData", width);

              console.log("this.showNewMovieData ==> ", this.showNewMovieData);

              this.$toast.clear();
            });
        })
        .catch(err => {
          console.log("err ==> ", err);
        });
    },

    //本周口碑榜
    viewGoodMovieData() {
      //开启加载提示
      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      //初始化新片榜数据
      this.axios({
        method: "GET",
        url:
          this.baseUrl + "/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a"
        // url: this.baseUrl + "/new_movies",
      })
        .then(result => {
          result.data.subjects.forEach(v => {
            v.width = 0;
          });

          console.log("result ==> ", result);

          //提交actions
          this.$store
            .dispatch("homeModule/getGoodMovieData", result.data.subjects)
            .then(() => {
              //根据星级平均分设置宽度
              let width = this.$refs.noactivestar[0].clientWidth;
              console.log("width ==> ", width);

              //提交modifyNewMovieData
              this.$store.commit("homeModule/modifyGoodMovieData", width);

              console.log(
                "this.showGoodMovieData ==> ",
                this.showGoodMovieData
              );

              this.$toast.clear();
            });
        })
        .catch(err => {
          console.log("err ==> ", err);
        });
    }
  },
  created() {
    this.viewNewMovieData();
    this.viewGoodMovieData();
  }

  // //开启加载提示
  // this.$toast.loading({
  //   duration: 0,
  //   message: "加载中..."
  // });

  // //初始化新片榜数据
  // this.axios({
  //   method: "GET",
  //   url: this.baseUrl + "/in_theaters",
  //   // url: this.baseUrl + "/new_movies",

  // })
  //   .then(result => {
  //     result.data.subjects.forEach(v => {
  //       v.width = 0;
  //     });

  //     console.log("result ==> ", result);

  //     //提交actions
  //     this.$store
  //       .dispatch("homeModule/getNewMovieData", result.data.subjects)
  //       .then(() => {
  //         //根据星级平均分设置宽度
  //         let width = this.$refs.noactivestar[0].clientWidth;
  //         console.log("width ==> ", width);

  //         //提交modifyNewMovieData
  //         this.$store.commit("homeModule/modifyNewMovieData", width);

  //         console.log("this.showNewMovieData ==> ", this.showNewMovieData);

  //         this.$toast.clear();
  //       });
  //   })
  //   .catch(err => {
  //     console.log("err ==> ", err);
  //   });
};
</script>

<style lang="less" scoped>
.home {
  .header {
    height: 54px;
    overflow: hidden;

    .search {
      width: 100%;
      padding: 0.214rem 0.32rem;
    }
    .location {
      width: 30%;
      height: 1.5rem;
    }
  }
  .content-box {
    z-index: 3;
    position: fixed;
    width: 100%;
    background: white;
    .content-card {
      width: 100%;

      background: white;

      .title {
        font-size: 20px;
        color: #fcc140;

        display: inline-block;
      }
    }
  }
  .banner-box {
    background-color: #fff;
    padding: 10px;
    margin-top: -4px;

    .banner {
      border-radius: 10px;
      overflow: hidden;

      .img-box {
        width: 375px;
        height: 200px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .star-box-count {
    position: relative;
    width: 90px;
    margin-right: 5px;
    span {
      position: absolute;
      width: 18px;
      height: 18px;
      top: 0;
      font-size: 16px;
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        left: 18px;
      }
      &:nth-child(3) {
        left: 36px;
      }
      &:nth-child(4) {
        left: 54px;
      }
      &:nth-child(5) {
        left: 72px;
      }
    }
  }
  .noactive-star {
    height: 18px;
    position: relative;
    color: #e5e5e5;
  }

  .active-star {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 18px;
    color: #fdc03d;
    overflow: hidden;
  }

  .star-score {
    width: 24px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    color: #fdc03d;
  }

  .new-movie {
    padding: 0 10px 10px;
    margin-top: 10px;
    background-color: #fff;
  }
  .new-movie-title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f2f2f2;
    > span:nth-child(1) {
      color: #070707;
      font-size: 18px;
    }

    > span:nth-child(2) {
      color: #92835a;
      font-size: 14px;
    }
  }

  .new-movie-content {
    overflow-x: auto;
    margin-top: 10px;
    overflow-y: hidden;
  }
  .new-movie-box {
    width: 1040px;
    > .new-movie-item {
      float: left;
      width: 121.25px;
      margin-right: 10px;
    }
    > .new-movie-item:last-child {
      margin-right: 0px;
    }
  }
  .new-movie-img {
    border-radius: 10px;
    overflow: hidden;
    height: 162px;
  }
  .new-movie-name {
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #282828;
  }
}

// 热映榜
.hot-movie {
  padding: 0 10px 10px;
  margin-top: 10px;
  background-color: #fff;
}
.hot-movie-title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f2f2f2;
  > span:nth-child(1) {
    color: #070707;
    font-size: 18px;
  }

  > span:nth-child(2) {
    color: #92835a;
    font-size: 14px;
  }
}

.hot-movie-content {
  overflow-x: auto;
  margin-top: 10px;
  overflow-y: hidden;
}
.hot-movie-box {
  width: 1040px;
  > .hot-movie-item {
    float: left;
    width: 121.25px;
    margin-right: 10px;
  }
  > .hot-movie-item:last-child {
    margin-right: 0px;
  }
}
.hot-movie-img {
  border-radius: 10px;
  overflow: hidden;
  height: 162px;
}
.hot-movie-name {
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  color: #282828;
}
</style>