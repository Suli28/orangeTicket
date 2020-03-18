import Vue from 'vue'
import Vuex from 'vuex'

import {registerModule} from './registerStore/registerModule'
import {loginModule} from './loginStore/loginModule'
import {indexModule} from './indexStore/indexModule'
import {movieModule} from './movieStore/movieModule'
import {homeModule} from './homeStore/homeModule'
import {movieDetailModule} from './movieDetailStore/movieDetailModule'
import {mineModule} from './mineStore/mineModule'
import {likeMovieModule} from './likeMovieStore/likeMovieModule'
import {buyMovieTickModule} from './buyMovieTickStore/buyMovieTickModule'
import {cinemaModule} from './cinemaStore/cinemaModule'
import {cinemaShowModule} from './cinemaShowStore/cinemaShowModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    //注册模块
    registerModule,

    //登录模块
    loginModule,

    indexModule,

    movieModule,

    homeModule,

    movieDetailModule,

    mineModule,

    likeMovieModule,

    buyMovieTickModule,

    cinemaModule,

    cinemaShowModule
  }
})
