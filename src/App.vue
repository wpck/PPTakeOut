<template>
  <div id="v-app">
    <v-header v-bind:seller='seller'></v-header>
    <div class="tab">
      <router-link to="goods" class='tab-item'>商品</router-link>
      <router-link to="seller" class='tab-item'>商家</router-link>
      <router-link to="rates" class='tab-item'>评价</router-link>
    </div>
    <router-view v-bind:seller='seller'/>
  </div>
</template>

<script>
  import  header from './components/header/header.vue'
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return{
        seller: {
          "name": "我呀便当（天津第一中心医院店）",
          "description": "由美团快送提供配送服务",
          "deliveryTime": 38,
          "score": 4.8,
          "serviceScore": 4.1,
          "foodScore": 4.3,
          "rankRate": 69.2,
          "minPrice": 20,
          "deliveryPrice": 4,
          "ratingCount": 24,
          "sellCount": 99,
          "bulletin": "我呀便当”设计以年轻、时尚、新潮为主旨，我们的产品生态，健康，中央厨房标准化生产，我们在用心，您吃的才放心！\n因此受到cctv与G20峰会的信任！ 小提示：我呀便当店铺下单单点配餐/饮料 是不外送的哦！另：门店是早10点起送哦！ 喜欢我呀 约我呀！",
          "supports": [
            {
              "type": 0,
              "description": "在线支付满28减5"
            },
            {
              "type": 1,
              "description": "VC无限橙果汁全场8折"
            },
            {
              "type": 2,
              "description": "单人精彩套餐"
            },
            {
              "type": 3,
              "description": "该商家支持发票,请下单写好发票抬头"
            },
            {
              "type": 4,
              "description": "已加入“外卖保”计划,食品安全保障"
            }
          ],
          "pic_url": "http://p1.meituan.net/xianfu/cf6c4fbb0456512fe3fa25795f8e6ced29909.jpeg",
          "pics": [
            "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
            "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
            "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
            "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
          ],
          "infos": [
            "该商家支持发票,请下单写好发票抬头",
            "品类:其他菜系,包子粥店",
            "天津市鞍山西道西大街龙观置业大厦底商B座102单元1340",
            "营业时间:10:00-20:30"
          ]
        }
      }
    },
    // created() {
    //   axios.get('../data.json').then( (res)=>{
    //     if( res.status === 200 ){
    //       this.seller = res.data.seller;
    //     }
    //   } )
    // },
    components: {
      'v-header': header
    }
  }
</script>

<style>
#v-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.tab{
  display: flex;
  height: 0.8rem;
  vertical-align: middle;
  border-bottom: 0.01rem solid rgba(7,17,27,0.1)
}
.tab-item{
  flex: 1;
  text-align: center;
  font-size: 0.28rem;
  line-height: 0.8rem;
}
.router-link-active{
  color: red;
}
</style>
