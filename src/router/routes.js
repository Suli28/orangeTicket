import routesComponent from './routesComponent'

export default [

  {
    //注册
    path: '/register',
    name: 'register',
    component: routesComponent.registerComponent
  },

  {
    //登录
    path: '/login',
    name: 'login',
    component: routesComponent.loginComponent
  },

  {
    //index
    path: '/index',
    name: 'index',
    component: routesComponent.indexComponent,
    children: [
      {
        path: '/home',
        name: 'home',
        component: routesComponent.homeComponent
      },
      {
        path: '/buy',
        name: 'buy',
        component: routesComponent.buyComponent,
        children: [
          {
            path: '/movie',
            name: 'movie',
            component: routesComponent.movieComponent
          },
          {
            path: '/cinema',
            name: 'cinema',
            component: routesComponent.cinemaComponent
          }
        ]
      },
      {
        path: '/find',
        name: 'find',
        component: routesComponent.findComponent
      },
      {
        path: '/video',
        name: 'video',
        component: routesComponent.videoComponent
      },
      {
        path: '/mine',
        name: 'mine',
        component: routesComponent.mineComponent
      }
    ]
  },
  {
    path: '/movieDetail/:id',
    name: 'movieDetail',
    component: routesComponent.movieDetailComponent
  },
  {
    path:'/buyMovieTick',
    name:'buyMovieTick',
    component:routesComponent.buyMovieTickComponent
  },
  {
    path: '/likeMovie',
    name: 'likeMovie',
    component: routesComponent.likeMovieComponent
  },
  {
    path:'/cinemaShow',
    name:'cinemaShow',
    component:routesComponent.cinemaShowComponent
  },

  {
    path: '*',
    redirect: {name: 'register'}
  }

]