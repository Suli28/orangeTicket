export const mutations = {
    getCinemaShow(state, cinema_info) {
      state.cinemaShowData.data = cinema_info
      console.log(state.cinemaShowData.data)
    },
    resetState(state) {
        state.cinemaShowData = {
          data:[]
        };
    
        
      },
}