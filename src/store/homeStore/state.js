export const state = {
  //请求基础路径
  baseUrl: 'https://douban.uieee.com/v2/movie',
  // baseUrl:'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
  

  //所有新片榜数据
  newMovieData: [],

  //所有本周口碑榜数据
  goodMovieData:[],

  // 展示新片榜数据
  showNewMovieData: {
    start: 0,
    end: 8,
    data: []
  },

  //展示本周口碑榜数据
  showGoodMovieData:{
    start: 0,
    end: 8,
    data: []
  },
 

  //是否存在换一换数据
  isHasData: true,

  //是否初始化
  isInit: true
};