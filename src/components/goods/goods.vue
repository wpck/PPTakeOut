<template>
	<div class='wrap'>
		<div class="goods-left">
			<ul>
				<li v-for='(item,index) in goods' class='goods-title' @click='test( index,$event )' :class= '{"current":currentIndex===index}'>
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goods-right" @scroll='getScrollY()'>
			<!-- <div class="goods-right-menu">{{goods[currentIndex].name}}</div> -->
			<div class="goods-item goods-item-hook" v-for='item in goods'>
				<div class="item-title">{{item.name}}</div>
				<div v-for="list in item.foods" class='item-detail' @click='showFood(list,$event)'>
					<div class='item-detail-wrap'>
						<div class="foodList-img">
							<img class="foodList-img" :src="list.image" alt="">
						</div>
						<div class='foodList-cont'>
							<p>{{list.name}}</p>
							<span class='sellCount'>月售{{list.sellCount}}份</span><span class='rating'>好评率{{list.rating}}%</span>
							<p class='price'><span class='price-logo'>￥</span>{{list.price}} <span class="oldPrice" v-if="list.oldPrice">￥{{list.oldPrice}}</span></p>
						</div>
					</div>
					<goodNum :food='list' v-on:numAdd='dropP'></goodNum>
				</div>
			</div>
		</div>
		<shopcart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice' :foodSel='getSelected' ref='shopcart'></shopcart>
		<food ref='food' :food='foodshow'></food>
	</div>
</template>
<script>
	import axios from 'axios';
	import shopcart from '../shopcart/shopcart';
	import goodNum from '../goodNum/goodNum';
	import food from '../food/food';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [
				    {
				      "name": "热销榜",
				      "type": -1,
				      "foods": [
				        {
				          "name": "皮蛋瘦肉粥",
				          "price": 10,
				          "oldPrice": 24,
				          "description": "咸粥",
				          "sellCount": 229,
				          "rating": 100,
				          "info": "一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "很喜欢的粥",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 1,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "扁豆焖面",
				          "price": 14,
				          "oldPrice": 20,
				          "description": "",
				          "sellCount": 188,
				          "rating": 96,
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 1,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "info": "",
				          "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "葱花饼",
				          "price": 10,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 124,
				          "rating": 85,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 1,
				              "text": "没啥味道",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 1,
				              "text": "很一般啊",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "牛肉馅饼",
				          "price": 14,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 114,
				          "rating": 91,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 1,
				              "text": "难吃不推荐",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "招牌猪肉白菜锅贴/10个",
				          "price": 17,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 101,
				          "rating": 78,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 1,
				              "text": "不脆,不好吃",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "南瓜粥",
				          "price": 9,
				          "oldPrice": "",
				          "description": "甜粥",
				          "sellCount": 91,
				          "rating": 100,
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "红豆薏米美肤粥",
				          "price": 12,
				          "oldPrice": "",
				          "description": "甜粥",
				          "sellCount": 86,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "八宝酱菜",
				          "price": 4,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 84,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "红枣山药糙米粥",
				          "price": 10,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 81,
				          "rating": 91,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "糊塌子",
				          "price": 10,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 80,
				          "rating": 93,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "单人精彩套餐",
				      "type": 2,
				      "foods": [
				        {
				          "name": "红枣山药粥套餐",
				          "price": 29,
				          "oldPrice": 36,
				          "description": "红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注",
				          "sellCount": 17,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "冰爽饮品限时特惠",
				      "type": 1,
				      "foods": [
				        {
				          "name": "VC无限橙果汁",
				          "price": 8,
				          "oldPrice": 10,
				          "description": "",
				          "sellCount": 15,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "还可以",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "精选热菜",
				      "type": -1,
				      "foods": [
				        {
				          "name": "娃娃菜炖豆腐",
				          "price": 17,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 43,
				          "rating": 92,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "菜量还可以,味道还可以",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "手撕包菜",
				          "price": 16,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 29,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "香酥黄金鱼/3条",
				          "price": 11,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 15,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "爽口凉菜",
				      "type": -1,
				      "foods": [
				        {
				          "name": "八宝酱菜",
				          "price": 4,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 84,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "拍黄瓜",
				          "price": 9,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 28,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "精选套餐",
				      "type": -1,
				      "foods": [
				        {
				          "name": "红豆薏米粥套餐",
				          "price": 37,
				          "oldPrice": "",
				          "description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
				          "sellCount": 3,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "皮蛋瘦肉粥套餐",
				          "price": 31,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 12,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "果拼果汁",
				      "type": -1,
				      "foods": [
				        {
				          "name": "蜜瓜圣女萝莉杯",
				          "price": 6,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 1,
				          "rating": "",
				          "info": "",
				          "ratings": [],
				          "icon": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "加多宝",
				          "price": 6,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 7,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "VC无限橙果汁",
				          "price": 8,
				          "oldPrice": 10,
				          "description": "",
				          "sellCount": 15,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "还可以",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "小吃主食",
				      "type": -1,
				      "foods": [
				        {
				          "name": "扁豆焖面",
				          "price": 14,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 188,
				          "rating": 96,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 1,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "葱花饼",
				          "price": 10,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 124,
				          "rating": 85,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 1,
				              "text": "没啥味道",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 1,
				              "text": "很一般啊",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "牛肉馅饼",
				          "price": 14,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 114,
				          "rating": 91,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 1,
				              "text": "难吃不推荐",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "招牌猪肉白菜锅贴/10个",
				          "price": 17,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 101,
				          "rating": 78,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 1,
				              "text": "不脆,不好吃",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "糊塌子",
				          "price": 10,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 80,
				          "rating": 93,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
				    },
				    {
				      "name": "特色粥品",
				      "type": -1,
				      "foods": [
				        {
				          "name": "皮蛋瘦肉粥",
				          "price": 10,
				          "oldPrice": "",
				          "description": "咸粥",
				          "sellCount": 229,
				          "rating": 100,
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "很喜欢的粥",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 1,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "南瓜粥",
				          "price": 9,
				          "oldPrice": "",
				          "description": "甜粥",
				          "sellCount": 91,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "红豆薏米美肤粥",
				          "price": 12,
				          "oldPrice": "",
				          "description": "甜粥",
				          "sellCount": 86,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "红枣山药糙米粥",
				          "price": 10,
				          "oldPrice": "",
				          "description": "",
				          "sellCount": 81,
				          "rating": 91,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "鲜蔬菌菇粥",
				          "price": 11,
				          "oldPrice": "",
				          "description": "咸粥",
				          "sellCount": 56,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": ""
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
				        },
				        {
				          "name": "田园蔬菜粥",
				          "price": 10,
				          "oldPrice": "",
				          "description": "咸粥",
				          "sellCount": 33,
				          "rating": 100,
				          "info": "",
				          "ratings": [
				            {
				              "username": "3******c",
				              "rateTime": 1469281964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "2******3",
				              "rateTime": 1469271264000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            },
				            {
				              "username": "3******b",
				              "rateTime": 1469261964000,
				              "rateType": 0,
				              "text": "",
				              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
				            }
				          ],
				          "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
				          "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
				        }
				      ]
    }
  ],
				icurrentIndex: 0,
				heightList: [],
				scrollY: 0,
				foodshow: []
			}
		},
		created() {
			// axios.get('../../data.json').then( (res)=>{
			// 	//获取数据
			// 	this.goods = res.data.goods;
				this.$nextTick( ()=>{
					//获取每个区间的高度
					this.getItemHeight();
					//监听滚动事件
					this.getScrollY();
					// //绝对定位变固定定位
					// this.fixedChange();
				} );
			// } )
		},
		computed: {
			currentIndex: function(){
				for( let i=0;i<this.heightList.length;i++ ){
					let heightprev = this.heightList[i];
					let heightnext = this.heightList[i+1];
					if( this.scrollY >=heightprev && this.scrollY <=heightnext || !heightnext ){
						return i;
					}
				}
				return 0;
			},
			//计算获取选中的食物
			getSelected(){
				let foodSel = [];
				this.goods.forEach( (good)=>{
					good.foods.forEach( (food)=>{
						if( food.count ){
							foodSel.push(food);
						};
					} );
				} );
				return foodSel;
			}
		},
		methods: {
			test(index,ev) {
				this.currentIndex = index;
				this.$el.getElementsByClassName('goods-right')[0].scrollTop = this.heightList[index];
			},
			//获取列表高度
			getItemHeight() {
				var foodList = 
					this.$el.getElementsByClassName("goods-item-hook");
				let height = 0;
				this.heightList.push( height );
				for( let i=0;i<foodList.length;i++ ){
					height += foodList[i].clientHeight;
					this.heightList.push( height );
				}
			}
			,//监听滚动
			 getScrollY(){
				this.scrollY = Math.abs( Math.round( this.$el.getElementsByClassName('goods-right')[0].scrollTop ) );
			},
			// fixedChange(){
			// 	let ele = this.$el.getElementsByClassName('goods-right-menu')[0];
			// 	let itop = ele.offsetTop;
			// 	let ileft = ele.offsetLeft;
			// 	console.log( itop,ileft )
			// }
			//子组件上的绑定v-on:numAdd事件,定义dropP方法
			dropP(target){
				this.$refs.shopcart.drop(target);
			},
			showFood(food,ev){
				this.foodshow = food;
				this.$refs.food.show();
			}
		},
		components: {
			'shopcart': shopcart,
			'goodNum': goodNum,
			'food': food
		}
	};
</script>
<style>
	.wrap{
		display: flex;
		position: absolute;
		top: 3.49rem;
		bottom: 1rem;
		overflow: hidden;
		width: 100%;
	}
	.goods-left{
		flex: 0 0 1.6rem;
		box-sizing: border-box;
		background: #f3f5f7;
	}
	.goods-title{
		display: flex;
		align-items: center;
		width: 	1.12rem;
		height: 1.06rem;
		font-size: 0.24rem;
		line-height: 0.28rem;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
		padding: 0 0.24rem;
	}
	.goods-right{
		flex: 1;
		overflow: scroll;
		position: relative;
	}
	.goods-right-menu{
		position: absolute;
		top: 0;
		left: 0;
	}
	.goods-right-menu,.item-title{
		font-size: 0.24rem;
		line-height: 0.52rem;
		color: rgb(147,153,159);
		background: #f3f5f7;
		border-left: 0.02rem solid #d9dde1;
		padding-left: 0.28rem;
	}
	.item-detail-wrap{
		display: flex;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
		padding-bottom: 0.36rem;
	}
	.item-detail{
		position: relative;
		padding: 0.36rem 0.36rem 0 0.36rem;
	}
	.foodList-img{
		flex: 0 0 1.28rem;
		width: 1.28rem;
		height: 1.28rem;
		background: #000;
	}
	.foodList-cont{
		flex: 1;
		margin-left: 0.2rem;
		margin-top: 0.04rem;
		font-size: 0.28rem;
		line-height: 0.28rem;
		color: rgb(7,17,27);
	}
	.sellCount,.rating{
		display: inline-block;
		margin-top: 0.16rem;
		font-size: 0.2rem;
		color: rgb(147,153,159);
	}
	.rating{
		margin-left: 0.24rem;
	}
	.price{
		color: red;
		font-size: 0.28rem;
		line-height: 0.48rem;
		font-weight: 700;
		vertical-align: bottom;
	}
	.price-logo{
		font-size: 0.2rem;
		font-weight: normal;
		vertical-align: bottom;
	}
	.oldPrice{
		font-size: 0.2rem;
		font-weight: normal;
		text-decoration: line-through;
		color: rgb(147,153,159);
	}
	.current{
		background: #fff;
	}
</style>