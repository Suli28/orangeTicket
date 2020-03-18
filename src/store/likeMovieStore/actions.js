export const actions = {
  //删除我的收藏电影
  deleteLikeMovie(context, index) {
    context.commit('deleteLikeMovie', index);
  }
};