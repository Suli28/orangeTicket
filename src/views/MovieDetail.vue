<template>
  <div class="movie-detail">

    <!-- <div class="m-bg" :style="{'background-image': 'linear-gradient(to bottom, rgba(245,245,245, 0), rgba(245,245,245, .85) 50%, rgba(245,245,245, 1) 60%),url(' + movieDetailData.images.large + ')'}"></div> -->
    
     <!-- <img class="bofang" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576482072194&di=a9bf49071cf7283ef0d34b24f479f1c5&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F21%2F78%2F5905bf68c0ece_610.jpg" alt="" @click.stop="videoDetail"> -->
   
<!-- ({name:'videoDetail',params:{id:movieDetailData.id}})" -->
     <video
        id="myVideo"
        class="video-js" controls :src="videoURL"
        >
        <!-- <source
            
            type="video/mp4" ref='videoPlay'
        > -->
        </video>
    <div class="">
      <van-nav-bar
        
     
        left-arrow
        @click-left.stop="back"
      />
    </div>

    <div class="movie-detail-info">
      <div class="movie-detail-box">
        <div class="movie-detail-t">
          <div class="movie-detail-img fl">
            <div class="m-img">
              <img class="auto-img" :src="movieDetailData.images.small" alt="">
            </div>
          </div>
          <div class="movie-detail-msg fl">
            <div class="clearfix">
              <span class="fl m-title">{{movieDetailData.title}}</span>
              <span @click="likeMovie(movieDetailData)" class="fr collection" :class="{active: likeActive}">
                <van-icon name="like-o" />
              </span>
            </div>
            <div class="m-type">{{movieDetailData.genresInfo}}</div>
            <div class="clearfix m-info">
              <div class="fl"><span><van-icon name="comment-circle-o" /></span> {{movieDetailData.comments}}</div>
              <div class="fl"><span><van-icon name="underway-o" /></span> {{movieDetailData.durations[0]}}</div>
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
              <div class="yes-star" :style="{width: movieDetailData.width + 'px'}">
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
              <div class="fl star-score">{{movieDetailData.rating.average}}</div>

            </div>
          </div>
        </div>
        <div class="movie-detail-b">
          <div class="mb-title">电影概括</div>
          <p class="m-text" :style="{display}">{{movieDetailData.summary}}</p>
        </div>

        <!-- 箭头 -->
        <div class="arrow" @click="changeDisplay">
          <van-icon name="arrow-down" />
        </div>

      </div>


      <div class="tab-box">
        <van-tabs v-model="tagActive" animated color="#FF9E01">
          <van-tab title="影人信息">
            <div class="yanyuan">
              <div class="yanyuan-box clearfix">

                <div ref="yanyuan" class="yanyuan-item" v-for="(item, index) in movieDetailData.casts" :key="index">
                  <div class="name-img">
                    <img class="auto-img" :src="item.avatars.small" alt="">
                  </div>
                  <div class="name one-text">{{item.name}}</div>
                </div>

              </div>
            </div>
          </van-tab>
          <van-tab title="电影剧照">
            <div class="yanyuan">
              <div class="yanyuan-box clearfix">

                <div class="yanyuan-item" v-for="(item, index) in movieDetailData.photos" :key="index">
                  <div class="name-img">
                    <img class="auto-img" :src="item.cover" alt="">
                  </div>
                  
                </div>

              </div>
            </div>
          </van-tab>
          <van-tab title="热门评论">
            <div class="comment-box clearfix">
              <div class="comment-item" v-for="(item, index) in movieDetailData.popular_reviews" :key="index">
              <div class="comment-title">
                <div class="comment-name"><div class="comment-touxiang"><img :src="item.author.avatar" alt=""></div>{{item.author.name}}：</div>
              </div>
              <div class="comment-content">{{item.summary}}</div>
             
              </div>

              

            </div>
          </van-tab>
        </van-tabs>
      </div>

    </div>
  
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapMutations} = createNamespacedHelpers('movieDetailModule')

  export default {
    name: 'movieDetail',

    data() {
      return {
        tagActive: 0,
        videoURL:'',
      };
      
      
    },

    computed: {
      ...mapState(['movieDetailData', 'display', 'likeActive']),
      
    },
    
    

    methods: {

      ...mapMutations(['changeDisplay', 'resetState']),
      getvideoURL(){
        //this.videoURL="http://vt1.doubanio.com/202001141548/bf57d05ea645371d9135208185eee6ed/view/movie/M/302570660.mp4"

        console.log('getvideoURL ==> ',this.movieDetailData.trailer_urls[0])
        
        this.videoURL=this.movieDetailData.trailer_urls[0]

        
        // this.$nextTick(()=>{
        //   this.$refs.videoPlay.load()
        // })
      },
      // initVideo(){
      //   let myPlayer=this.$video(myVideo,{
      //     controls:true,
      //   });
      //   this.$refs.video.src = res.data.video_url
      // },
      
      
     

      // 返回上一步
      back() {
        this.$router.go(-1);
      },
      // videoDetail(){
      //   this.$router.push({path:'/videoDetail'})
      // },
      //收藏电影
      likeMovie(item) {

        // console.log('item ==> ', item);

         //获取用户登录状态
         let userStatus = localStorage.getItem('user');

         if (userStatus){
           userStatus = JSON.parse(userStatus);

           if (!userStatus.isLogin) {
            //  console.log('请先登录');
             return this.$router.push({name: 'login'});
           }

            //获取用户收藏的电影
            let likeMovieData = localStorage.getItem('likeMovieData');
            likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {};

            //记录当前用户收藏的电影
            let currentLikeMovieData = likeMovieData[userStatus.username];

            if (!currentLikeMovieData) {
              likeMovieData[userStatus.username] = [];
            }

            //收藏电影之前，根据电影的id判断是否已经收藏过该电影
            for (let i = 0; i < likeMovieData[userStatus.username].length; i++) {
              if (likeMovieData[userStatus.username][i].id == item.id) {
                //提示用户
                this.$toast('你已经收藏过该电影');
                return;
              }
            }

            this.$store.commit('movieDetailModule/changelikeActive', true);


            //将电影推进likeMovieData[userStatus.username]
            likeMovieData[userStatus.username].unshift(item);

            // console.log('likeMovieData ==> ', likeMovieData);

            localStorage.setItem('likeMovieData', JSON.stringify(likeMovieData));

            this.$toast.success('收藏成功');

         } else {
          //  console.log('请先登录');
           this.$router.push({name: 'login'});
         }

      },
    //   videoDetail(){
    //     this.$router.push({path:'/videoDetail'});
    //     this.$router.push({path:'/videoDetail'})
      
    // },
      
    },

    created() {

      //开启加载提示
      this.$toast.loading({
        duration: 0,
        message: '加载中...'
      });

      //重置state
      this.resetState();

      //截取路由参数
      let id = this.$route.params.id;

      // console.log('id ==> ', id);

      this.axios({
        method: 'GET',
        url: 'https://douban.uieee.com/v2/movie/subject/' + id
      }).then(result => {
        
       
// this.$nextTick(()=>{
        //   this.$refs.videoPlay.load()
        // })
        //将电影类型合并
        result.data.genresInfo = result.data.genres.join(' / ');
        // console.log(result.data.genresInfo);

        //超过1000, 不足10000，以k显示，超过10000以w显示，不足1000，直接显示
        let comments = result.data.comments_count;

        result.data.comments = comments >= 10000 ? (comments / 10000).toFixed(1) + 'w' : comments >= 1000 ? (comments / 1000).toFixed(1) + 'k' : comments;

        //  console.log('result ==> ', result);

        //获取星星的宽度
        let notstarWidth = this.$refs.notstar.clientWidth;
        // console.log('notstarWidth ==> ', notstarWidth);
        
        result.data.width = result.data.rating.average / result.data.rating.max * notstarWidth;

        //获取演员的图片盒子宽度
        result.data.w = 0;
         
        this.$store
        .dispatch('movieDetailModule/getMovieDetailData', result.data)
        .then(() => {
          this.$toast.clear();
          let yanyuanBoxWidth= this.$refs.yanyuan[0].clientWidth;
          // console.log('yanyuanBoxWidth ==> ', yanyuanBoxWidth);
          this.$store.commit('movieDetailModule/changeW', yanyuanBoxWidth);

          //根据用户登录状态，判断该电影是否被该用户收藏
          let userStatus = localStorage.getItem('user');
          let isActive = userStatus && JSON.parse(userStatus).isLogin;

          //如果用户登录
          if (isActive) {
            let username = JSON.parse(userStatus).username;

            //所有用户收藏的电影
            let likeMovieData = localStorage.getItem('likeMovieData');

            likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {};

            //获取当前用户收藏的电影
            let currentLikeMovieData = likeMovieData[username];

            currentLikeMovieData = currentLikeMovieData ? currentLikeMovieData : []

            for (let i = 0; i < currentLikeMovieData.length; i++) {
              if (this.movieDetailData.id == currentLikeMovieData[i].id) {
                this.$store.commit('movieDetailModule/changelikeActive', true);
                return;
              }
            }

            this.$store.commit('movieDetailModule/changelikeActive', false);

          } else {
             this.$store.commit('movieDetailModule/changelikeActive', false);
          }
          
        })
        // 页面渲染
        this.$nextTick(() => {
           this.getvideoURL()
        })

      }).catch(err => {
        // console.log('err ==> ', err);
        this.$toast.clear();
      })

    }
    
  }
</script>

<style lang="less" scoped>
  .movie-detail{
    .video-js{
      width: 100%;
      height: 200px;
    }
    .van-nav-bar{
      background: transparent;
     
     
      
      
     
      
    }
    [class*=van-hairline]::after{
      border: none;
    }
    .van-nav-bar .van-icon{
      color: #F7EED9;
    }
    .name-img{
      border-radius: 5px;
      overflow: hidden;
    }
    .name{
      margin: 10px 0;
      text-align: center;
      font-size: 12px;
      color: #222;
    }
    .yanyuan{
      overflow-x: auto;
      overflow-y: hidden;
      margin-top: 10px;
    }
    .yanyuan-box{
      width: 500px;
    }
    .yanyuan-item{
      float: left;
      width: 100px;
      padding: 10px;
    }

    .tab-box{
      margin-top: 20px;
      background-color: #fff;
    }
    .arrow{
      position: absolute;
      width: 20px;
      height: 20px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      font-size: 16px;
      text-align: center;
      line-height: 20px;
      color: #FF9E01;
    }
    .mb-title{
      font-size: 16px;
      color: #222;
      padding: 10px 0;
    }
    .m-text{
      font-size: 10px;
      color: #666;
      line-height: 18px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .m-bg{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 1;
      filter: blur(5px);
      // opacity: .95;

      
    }
    .bofang{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      
      z-index: 3;
      position: absolute;
      top: 2rem;
    left: 4rem;
    }
    
    .movie-detail-info{
     // padding: 10px;
      position: relative;
      z-index: 2;
      margin-top: -137px;
     
      
    }
    .movie-detail-box{
      margin-top: 100px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px 10px 30px;
      position: relative;
      .movie-detail-t{
        height: 120px;
        
      }

      .movie-detail-img{
        width: 100px;
        height: 120px;
        // background-color: #ddd;
      }

      .movie-detail-msg{
        width: calc(~"100% - 110px");
        height: 120px;
        // background-color: #aaa;
        margin-left: 10px;
      }
      .m-img{
        margin-top: -30px;
        overflow: hidden;
        border-radius: 5px;
      }
    }

    .m-title{
      font-size: 16px;
      color: #222;
    }
    .m-type{
      color: #666;
      font-size: 12px;
      margin-top: 10px;
    }

    .m-info{
      font-size: 10px;
      margin-top: 10px;
      color: #555;
      height: 16px;
      >div{
        margin-right: 10px;
        >span{
          position: relative;
          top: 1.5px;
        }
      }
    }

    .star-box{
      margin-top: 10px;
      position: relative;
       span{
        position: absolute;
        width: 18px;
        height: 18px;
        top: 0;
        font-size: 16px;
        &:nth-child(1){
          left: 0;
        }
        &:nth-child(2){
          left: 18px;
        }
        &:nth-child(3){
          left: 36px;
        }
        &:nth-child(4){
          left: 54px;
        }
        &:nth-child(5){
          left: 72px;
        }
      }
    }

    .not-star{
      width: 90px;
      height: 18px;
      margin-right: 20px;
    }

    .yes-star{
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      overflow: hidden;
      height: 18px;
      color: #FF9E01;
    }

    .star-score{
      font-size: 16px;
      font-weight: bold;
      background-image: linear-gradient(45deg,rgb(241, 191, 82), #FF9E01);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .collection{
      font-size: 16px;
    }

    .collection.active{
      color: #FF9E01;
    }
   
  }
  .coment-box{
    width: 100%;
    height: 180px;
  }
  .comment-item{
    // margin-top: 50px;
    border-bottom: 1px solid #666;
  }
  .comment-content{
    width: 100%;
    // height: 100px;
    // background: #666;
    line-height: 50px;
    overflow: hidden;
    font-size: 14px;
    
  }
  .comment-title{
    width: 100%;
    height: 50px;
    // background: red;
    line-height: 50px;
    overflow: hidden; 

    .comment-name{
      float: left;
      font-size: 16px;
      font-weight: 600;
      
    }

    .comment-touxiang{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      float: left;
      margin-right: 10px;
      margin-left: 5px;
      margin-top: 0.15rem;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>