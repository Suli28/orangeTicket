export const actions = {

  addUserChairData(context, data) {
    context.commit('addUserChairData', data);
  },

  deleteUserChairData(context, data) {
    context.commit('deleteUserChairData', data);
  }
};