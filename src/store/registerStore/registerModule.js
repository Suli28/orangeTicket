import {state} from './state'

import {mutations} from './mutations'

export const registerModule = {
  //命名空间
  namespaced: true,
  
  state,
  mutations
}