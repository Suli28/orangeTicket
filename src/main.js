import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

import BaiduMap from 'vue-baidu-map'
Vue.prototype.$video = Video

import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL='/movie'
axios.defaults.headers.post["Content-type"] = "application/json"

import VueAxios from 'vue-axios'

import { 
  Field,
  CellGroup,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  Tabs,
  Tab,
  Search,
  DropdownMenu, 
  DropdownItem,
  Swipe, 
  SwipeItem,
  NavBar,
  Grid, 
  GridItem,
  Cell, 
 
  
} from 'vant'

import 'lib-flexible/flexible'

Vue.use(VueAxios, axios)

Vue
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Tabs)
  .use(Tab)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(NavBar)
  .use(Grid)
  .use(GridItem)
  .use(Cell)
  

  Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'fHrNQj6DHTjZtfTvfqbsuvTzKc5V9SBl'
  
  })

Vue.config.productionTip = false

//全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log('进入全局前置路由守卫');
  window.onscroll = null;
  next(true);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
