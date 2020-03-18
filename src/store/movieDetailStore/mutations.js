export const mutations = {
  getMovieDetailData(state, data) {
    state.movieDetailData = data;

    console.log('state.movieDetailData ==> ', state.movieDetailData);
  },

  //修改宽度
  changeW(state, w) {
    state.movieDetailData.w = w;
  },

  // 修改行数
  changeDisplay(state) {
    state.display = state.display == 'block' ? '-webkit-box' : 'block';
  },

  //重置state
  resetState(state) {
    state.movieDetailData = {
      images: {},
      durations: [],
      rating: {},
      casts: []
    };

    state.likeActive = false;
  },

  changelikeActive(state, isActive) {
    state.likeActive = isActive;
  }
};