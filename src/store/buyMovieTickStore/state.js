export const state = {
  //电影数据
  data: {
    images: {}
  },

  //座位数据
  chairDatas: [
    [
      {row: 1, col: 1, type: ''}, 
      {row: 1, col: 2, type: ''}, 
      {row: 1, col: 3, type: ''}
    ],
    [
      {row: 2, col: 1, type: ''}, 
      {row: 2, col: 2, type: ''}, 
      {row: 2, col: 3, type: ''},
      {row: 2, col: 4, type: ''},
      {row: 2, col: 5, type: ''},
      {row: 2, col: 6, type: ''},
      {row: 2, col: 7, type: ''},
      {row: 2, col: 8, type: ''},
      {row: 2, col: 9, type: ''},
    ],
    [
      {row: 3, col: 1, type: ''}, 
      {row: 3, col: 2, type: ''}, 
      {row: 3, col: 3, type: ''},
      {row: 3, col: 4, type: ''},
      {row: 3, col: 5, type: ''},
      {row: 3, col: 6, type: ''},
      {row: 3, col: 7, type: ''},
      {row: 3, col: 8, type: ''},
      {row: 3, col: 9, type: ''},
    ],
    [
      {row: 4, col: 1, type: ''}, 
      {row: 4, col: 2, type: ''}, 
      {row: 4, col: 3, type: ''},
      {row: 4, col: 4, type: ''},
      {row: 4, col: 5, type: ''},
      {row: 4, col: 6, type: ''},
      {row: 4, col: 7, type: ''},
      {row: 4, col: 8, type: ''},
      {row: 4, col: 9, type: ''},
    ],
    [
      {row: 5, col: 1, type: ''}, 
      {row: 5, col: 2, type: ''}, 
      {row: 5, col: 3, type: ''},
      {row: 5, col: 4, type: ''},
      {row: 5, col: 5, type: ''},
      {row: 5, col: 6, type: ''},
      {row: 5, col: 7, type: ''},
      {row: 5, col: 8, type: ''},
      {row: 5, col: 9, type: ''},
    ],
    [
      {row: 6, col: 1, type: ''}, 
      {row: 6, col: 2, type: ''}, 
      {row: 6, col: 3, type: ''},
      {row: 6, col: 4, type: ''},
      {row: 6, col: 5, type: ''},
      {row: 6, col: 6, type: ''},
      {row: 6, col: 7, type: ''},
      {row: 6, col: 8, type: ''},
      {row: 6, col: 9, type: ''},
    ],
    [
      {row: 7, col: 1, type: ''}, 
      {row: 7, col: 2, type: ''}, 
      {row: 7, col: 3, type: ''},
      {row: 7, col: 4, type: ''},
      {row: 7, col: 5, type: ''}
    ]
  ],

  //用户选择座位数据
  userChairData: [],

  //显示票据ul的宽度
  width: 0
};