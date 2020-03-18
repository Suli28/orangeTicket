import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'
export const cinemaModule ={
    namespaced:true,
    state,
    mutations,
    actions
}