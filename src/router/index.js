import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import rates from '@/components/rates/rates'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/goods',
      component: goods
    }, {
    	path: '/seller',
    	component: seller
    }, {
    	path: '/rates',
    	component: rates
    }
  ]
})
