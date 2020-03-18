export const actions = {

  //获取新片榜数据
  getNewMovieData(context, result) {
    //提交mutations
    context.commit('getNewMovieData', result);
  },
  //获取本周口碑榜数据
  getGoodMovieData(context, result) {
    //提交mutations
    context.commit('getGoodMovieData', result);
  }

}