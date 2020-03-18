<template>
  <div class="movie">
    
    <van-tabs v-model="activeName" :border="false" color="#FF9E01" title-active-color="#FF9E01">
      <van-tab title="正在热映" name="a">
        <div ref="moviebox" class="movie-box" @scroll="lazyLoad">
          <div
            class="movie-item clearfix"
            v-for="(item, index) in HotMovieData.data.subjects"
            :key="index"
            ref="movieitem"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="fl movie-img">
              <img class="auto-img" :src="item.images.medium" alt />
            </div>
            <div class="fl movie-info">
              <div class="one-text">
                <span>{{item.title}}</span>
              </div>
              <div>{{item.genresInfo}}</div>
              <div class="one-text">{{item.avatarsInfo}}</div>
            </div>
            <div class="fl buy-info">
              <div class="movie-score">
                {{item.rating.average}}
                <span>分</span>
              </div>

              <div class="buy-btn" @click.stop="buy">
                <van-button round size="mini" type="info" color="#FF9E01">购票</van-button>
              </div>
            </div>
          </div>

          <p class="tip-text" v-if="!isHas">没有更多数据可加载了</p>
        </div>
      </van-tab>
      <van-tab title="即将上映" name="b">
        <div ref="moviebox" class="movie-box" @scroll="lazyLoad">
          <div
            class="movie-item clearfix"
            v-for="(item, index) in NewMovieData.data.subjects"
            :key="index"
            ref="movieitem"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="fl movie-img">
              <img class="auto-img" :src="item.images.medium" alt />
            </div>
            <div class="fl movie-info">
              <div class="one-text">
                <span>{{item.title}}</span>
              </div>
              <div>{{item.genresInfo}}</div>
              <div class="one-text">{{item.avatarsInfo}}</div>
            </div>
            <div class="fl buy-info">
              <div class="movie-score">
                {{item.rating.average}}
                <span>分</span>
              </div>

              <div class="buy-btn" @click.stop="buy">
                <van-button round size="mini" type="info" color="#FF9E01">购票</van-button>
              </div>
            </div>
          </div>

          <p class="tip-text" v-if="!isHas">没有更多数据可加载了</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import $ from "jquery";

import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("movieModule");

export default {
  name: "movie",

  data() {
    return {
      activeName: "a"
    };
  },

  computed: {
    ...mapState([
      "HotMovieData",
      "NewMovieData",
      "params",
      "isHas",
      "isInit",
      "isInitial",
      "movieBox",
      "movieBoxData"
    ])
  },

  methods: {
    buy() {
      this.$router.push({ path: "/buyMovieTick" });
    },
    getHotMovie() {
      //console.log(this.params.city)
      let self = this;

      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      //请求数据
      this.axios({
        //请求类型

        method: "GET",

        //请求地址
        url: "https://douban.uieee.com/v2/movie/in_theaters",

        //请求参数
        params: this.params
      })
        .then(result => {
          console.log(result);
          console.log("result.data.subjects ==> ", result.data.subjects);

          result.data.subjects.forEach(v => {
            //合并电影类型
            v.genresInfo = v.genres.join(" / ");

            //合并演员
            v.avatarsInfo = "";
            v.casts.forEach(item => {
              v.avatarsInfo += item.name + " / ";
            });

            v.avatarsInfo = v.avatarsInfo.slice(0, -3);
          });

          if (this.isInit) {
            let movieBox = this.$refs.moviebox;
            let movieBoxHeight = movieBox.clientHeight;
            this.$store.commit("movieModule/changeMovieBox", {
              movieBox,
              movieBoxHeight
            });
          }

          //提交修改movieData数据
          this.$store.commit("movieModule/changeHotMovieData", result);

          //取消加载提示
          this.$toast.clear();
        })
        .catch(err => {
          console.log("err ==> ", err);
          this.$toast.clear();
        });
    },

    getNewMovie() {
      let self = this;

      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      //请求数据
      this.axios({
        //请求类型
        method: "GET",

        //请求地址
        url: "https://douban.uieee.com/v2/movie/coming_soon",

        //请求参数
        params: this.params
      })

        .then(result => {
          console.log("result.data.subjects ==> ", result.data.subjects);

          result.data.subjects.forEach(v => {
            //合并电影类型
            v.genresInfo = v.genres.join(" / ");

            //合并演员
            v.avatarsInfo = "";
            v.casts.forEach(item => {
              v.avatarsInfo += item.name + " / ";
            });

            v.avatarsInfo = v.avatarsInfo.slice(0, -3);
          });

          if (this.isInit) {
            let movieBox = this.$refs.moviebox;
            let movieBoxHeight = movieBox.clientHeight;
            this.$store.commit("movieModule/changeMovieBox", {
              movieBox,
              movieBoxHeight
            });
          }

          //提交修改movieData数据
          this.$store.commit("movieModule/changeNewMovieData", result);

          //取消加载提示
          this.$toast.clear();
        })
        .catch(err => {
          console.log("err ==> ", err);
          this.$toast.clear();
        });
    },

    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },

    //滚动懒加载
    lazyLoad() {
      
      console.log("aaa");
      let self = this;

      if (!self.isHas) {
        console.log("没更多数据可加载");
        return;
      }

      let timer = setTimeout(function() {
        for (let i = 1; i < self.movieBoxData.timers.length; i++) {
          clearTimeout(self.movieBoxData.timers[i]);
        }

        //获取底部导航高度
        let tabbarHeight = document.querySelector(".tab-bar").clientHeight;
        // console.log("tabbarHeight ==> ", tabbarHeight);

        let movieItem = self.$refs.movieitem[self.$refs.movieitem.length - 1];

        //获取元素距离可视区域顶部的距离
        let movieItemStyle = movieItem.getBoundingClientRect();

        let top = movieItemStyle.top;
        // console.log("top ==> ", top);

        let movieItemMarginBottom = parseFloat(
          getComputedStyle(movieItem).marginBottom
        );
        // console.log('movieItemMarginBottom ==> ', movieItemMarginBottom);

        let movieItemHeight = movieItemStyle.height;
        // console.log('movieItemHeight ==> ', movieItemHeight);

        let isPass =
          innerHeight -
            tabbarHeight -
            movieItemMarginBottom -
            movieItemHeight +
            50 >=
          top;

        // console.log('isPass ==> ', isPass);

        if (isPass) {
          console.log("发起数据请求");
          //发起数据请求
          self.getNewMovie();
          self.getHotMovie();
        }

        self.$store.state.movieModule.movieBoxData.timers = [];
      }, 1000);

      self.$store.state.movieModule.movieBoxData.timers.push(timer);
      // self.timers.push(timer);
    }
  },

  created() {
    let self = this;

    //获取用户位置
    $.ajax({
      type: "GET",
      url: "https://apis.map.qq.com/ws/location/v1/ip",
      data: {
        key: "YYTBZ-GFSRX-JSX4Z-7PG44-Y6P2T-IIFD2",
        output: "jsonp"
      },
      dataType: "jsonp",
      success: function(data) {
        console.log("data ==> ", data);
        
        self.$store.commit(
          "movieModule/changeLocationCity",
          data.result.ad_info.city.replace(/市$/, "")
        );

        if (!self.isInitial) {
          return;
        }
        self.getNewMovie();
        self.getHotMovie();
        
      }
    });
  }
};
</script>

<style lang="less" scoped>
.movie {
  position: fixed;
  top: 40px;
  bottom: 50px;
  left: 0;
  right: 0;

  .van-tabs__line {
    background-color: #ff9e01 !important;
  }

  .van-tabs {
    position: static;
  }

  .tip-text {
    color: #aaa;
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    background-color: #fff;
  }
  .movie-box {
    margin-top: 5px;
    background-color: #f5f5f5;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .movie-item {
    margin-bottom: 5px;
    background-color: #fff;
  }
  .movie-img {
    width: 80px;
    height: 120px;
  }
  .movie-info {
    width: calc(~"100% - 140px - 20px");
    padding: 0 10px;
    > div {
      height: 40px;
      &:nth-child(1) {
        font-size: 18px;
        color: #333;
      }
      &:nth-child(2) {
        font-size: 16px;
        color: #659d0e;
      }
      &:nth-child(3) {
        font-size: 14px;
        color: #b0b0b0;
      }
    }
  }
  .buy-info {
    width: 60px;
    height: 120px;
  }
  .movie-score {
    height: 40px;
    font-size: 20px;
    color: #659d0e;
    text-align: center;
    > span {
      font-size: 14px;
    }
  }
  .buy-btn {
    height: 40px;
    margin-top: 40px;
    text-align: center;
  }
}
</style>