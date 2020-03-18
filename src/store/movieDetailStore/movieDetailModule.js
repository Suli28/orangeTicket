import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export const movieDetailModule = {
  namespaced: true,
  state,
  mutations,
  actions
};