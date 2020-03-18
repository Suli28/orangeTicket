<template>
  <div class="like-movie">
    <div class>
      <van-nav-bar class="title" title="想看" left-text="" left-arrow @click-left="back" />
    </div>
    <div class="movie-detail">
      <div class="movie-detail-info" v-for="(item, index) in currentLikeMovieData" :key="index" :id="item.id" @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})">
        <div class="movie-detail-box">
          <div class="movie-detail-t">
            <div class="movie-detail-img fl">
              <div class="m-img">
                <img
                  class="auto-img"
                  :src="item.images.small"
                  alt
                />
              </div>
            </div>
            <div class="movie-detail-msg fl">
              <div class="clearfix">
                <span class="fl m-title">{{item.title}}</span>
                <span class="fr collection" @click.stop="deleteLikeMovie(item.id)">
                  <van-icon name="delete" />
                </span>
              </div>
              <div class="m-type">{{item.genresInfo}}</div>
              <div class="clearfix m-info">
                <div class="fl">
                  <span>
                    <van-icon name="comment-circle-o" />
                  </span> {{item.comments}}
                </div>
                <div class="fl">
                  <span>
                    <van-icon name="underway-o" />
                  </span> {{item.durations[0]}}
                </div>
              </div>
              <div class="star-box clearfix">
                <!-- 灰星 -->
                <div ref="notstar" class="not-star fl">
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
                <div class="yes-star" :style="{width: item.width + 'px'}">
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

                <!-- 评分 -->
                <div class="fl star-score">{{item.rating.average}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'

const {mapState} = createNamespacedHelpers('likeMovieModule');

export default {
  name: "likeMovie",

  computed: {
    ...mapState(['currentLikeMovieData'])
  },

  methods: {

    //返回上一级
    back() {
      this.$router.go(-1);
    },

    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },

    //删除我的收藏电影
    deleteLikeMovie(id) {
      // console.log('id ==> ', id);
      for (let i = 0; i < this.currentLikeMovieData.length; i++) {
        if (id == this.currentLikeMovieData[i].id) {
          this.$store.dispatch('likeMovieModule/deleteLikeMovie', i)
            .then(() => {
              // console.log('修改本地存储数据')
              let userStatus = JSON.parse(localStorage.getItem("user"));

              //获取所有用户电影数据
              let likeMovieData = JSON.parse(localStorage.getItem('likeMovieData'));

              likeMovieData[userStatus.username] = this.currentLikeMovieData;

              localStorage.setItem('likeMovieData', JSON.stringify(likeMovieData));

            })
          break;
        }
      }
    }

  },

  created() {
    //验证登录
    let userStatus = localStorage.getItem("user");

    if (userStatus) {
      let userInfo = JSON.parse(userStatus);

      //如果登录
      if (userInfo.isLogin) {
        // console.log("查看我的收藏电影");

        //开启加载提示
        this.$toast.loading({
          duration: 0,
          message: '加载中...'
        });

        //获取所有用户收藏的电影数据
        let likeMovieData = localStorage.getItem('likeMovieData');

        likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {};

        //获取当前用户收藏的电影数据
        let currentLikeMovieData = likeMovieData[userInfo.username];

        currentLikeMovieData = currentLikeMovieData ? currentLikeMovieData : [];

        //生成页面数据
        this.$store.commit('likeMovieModule/getCurrentLikeMovieData', currentLikeMovieData);

        this.$toast.clear();


      } else {
        //如果未登录
        this.$router.push({name: 'login'});
      }
    } else {
      //未登录
      this.$router.push({name: 'login'});
    }
  }
};
</script>

<style lang="less" scoped>
.like-movie {
  position: relative;
  .title{
    background: #FDC03D;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    height: 50px;
    width: 100%;
    border-radius: 15px;
    line-height: 50px;

    
  }
  .van-nav-bar__title{
    color: white;
  }
  .van-nav-bar .van-icon{
     color: white;
  }
  .movie-detail{
    height: 617px;
    margin-top: 50px;
    position: absolute;
   top: 0;
    left: 0;
    width: 100%;
    overflow-y:scroll;

  }
  .movie-detail-info {
    padding: 10px 10px 0;
    position: relative;
    z-index: 1;
    margin-top: 45px;
    overflow: hidden;
  }
  .movie-detail-box {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    .movie-detail-t {
      height: 120px;
    }

    .movie-detail-img {
      width: 100px;
      height: 120px;
      // background-color: #ddd;
    }

    .movie-detail-msg {
      width: calc(~"100% - 110px");
      height: 120px;
      // background-color: #aaa;
      margin-left: 10px;
    }
    .m-img {
      margin-top: -30px;
      overflow: hidden;
      border-radius: 5px;
    }
  }

  .m-title {
    font-size: 16px;
    color: #222;
  }
  .m-type {
    color: #666;
    font-size: 12px;
    margin-top: 10px;
  }

  .m-info {
    font-size: 10px;
    margin-top: 10px;
    color: #555;
    height: 16px;
    > div {
      margin-right: 10px;
      > span {
        position: relative;
        top: 1.5px;
      }
    }
  }

  .star-box {
    margin-top: 10px;
    position: relative;
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

  .not-star {
    width: 90px;
    height: 18px;
    margin-right: 20px;
  }

  .yes-star {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    overflow: hidden;
    height: 18px;
    color: #ff9e01;
  }

  .star-score {
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(45deg, rgb(241, 191, 82), #ff9e01);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .collection {
    font-size: 16px;
  }

  .collection.active {
    color: #ff9e01;
  }
}
</style>