export const mutations = {

  //获取我的收藏电影
  getCurrentLikeMovieData(state, data) {
    console.log('data ==> ', data);
    state.currentLikeMovieData = data;
  },

  //删除我的收藏电影
  deleteLikeMovie(state, index) {
    state.currentLikeMovieData.splice(index, 1);
  }

};