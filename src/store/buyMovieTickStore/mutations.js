export const mutations = {

  getData(state, data) {
    state.data = data;
    
  },

  resetData(state) {
    state.data = {
      images: {}
    }
  },

  //改变座位状态
  changeChairData(state, data) {
    state.chairDatas[data.row - 1][data.col - 1].type = data.type;
  },

  //添加用户选择座位数据
  addUserChairData(state, data) {
    state.userChairData.push(data);
  },

  //删除用户选择的座位
  deleteUserChairData(state, data) {
    
    for (let i = 0; i < state.userChairData.length; i++) {
      if (state.userChairData[i].row == data.row && state.userChairData[i].col == data.col) {
        state.userChairData.splice(i, 1);
        break;
      }
    }
  },

  //修改显示票据ul的宽度
  modifyUlWidth(state, width) {
    state.width = width;
  }

};