export const state = {

  params: {
    //开始截取位置
    start: 0,

    //数据数量
    count: 10,

    //城市
    city: ''
  },

  //是否初始化数据
  isInit: true,

  //控制返回当前路由不请求数据
  isInitial: true,

  //是否存在可加载数据
  isHas: true,

  movieBoxData: {
    movieBox: null,
    movieBoxHeight: 0,
    timers: []
  },

  HotMovieData: {
    data: {
      subjects: []
    }
  },
  NewMovieData: {
    data: {
      subjects: []
    }
  }
};