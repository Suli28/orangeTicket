import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export const buyMovieTickModule = {

  namespaced: true,
  state,
  mutations,
  actions
};