export const mutations = {

  changeHotMovieData(state, result) {

    if (state.isInit) {
      state.isInit = false;
    }

    if (state.isInitial) {
      state.isInitial = false;
    }

    if (result.data.subjects.length < 10) {
      state.isHas = false;
    }

    //将每次请求的数据推进state.movieData.data.subjects数组中
    state.HotMovieData.data.subjects.push(...result.data.subjects);

    //每次请求完成后，修改请求数据的开始截取位置
    state.params.start += state.params.count;

    // console.log('state.movieData ==> ', state.movieData);
    // console.log('state.params ==> ', state.params);
  },
  changeNewMovieData(state, result) {

    if (state.isInit) {
      state.isInit = false;
    }

    if (state.isInitial) {
      state.isInitial = false;
    }

    if (result.data.subjects.length < 10) {
      state.isHas = false;
    }

    //将每次请求的数据推进state.movieData.data.subjects数组中
    state.NewMovieData.data.subjects.push(...result.data.subjects);

    //每次请求完成后，修改请求数据的开始截取位置
    state.params.start += state.params.count;

    console.log('state.movieData ==> ', state.HotMovieData);
    console.log('state.params ==> ', state.params);
  },

  changeMovieBox(state, o) {
    state.movieBoxData.movieBox = o.movieBox;
    state.movieBoxData.movieBoxHeight = o.movieBoxHeight;
  },

  // 修改定位城市
  changeLocationCity(state, city) {
    state.params.city = city;

    console.log('state.params.city ==> ', state.params.city);
  }

};