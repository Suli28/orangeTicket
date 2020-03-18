export const mutations ={
    changeLatData(state,lat){
        state.latData.lat=lat
        console.log(state.latData.lat)
    },
    changeLngData(state,lng){
        state.lngData.lng=lng
        console.log(state.lngData.lng)
    },
    // changeLatData(state,lat){
    //     state.latData.lat=lat
    //     console.log(state.latData.lat)
    // },
    
}