<template>
	<div class='ratePage'>
		<div class="rate-head">
			<div class="rateh-left">
				<p class='rhl-score'>{{seller.score}}</p>
				<p class='rhl-title'>综合评分</p>
				<p class='rhl-rank'>高于周边商家{{seller.rankRate}}</p>
			</div>
			<div class="rateh-right">
				<ul>
					<li class='rhr-item'>
						<span class='rhr-i-l'>服务态度</span>
						<span class='rhr-i-m'></span>
						<span class='rhr-i-r'>{{seller.serviceScore}}</span>
					</li>
					<li class='rhr-item'>
						<span class='rhr-i-l'>食物评分</span>
						<span class='rhr-i-m'></span>
						<span class='rhr-i-r'>{{seller.foodScore}}</span>
					</li>
					<li class='rhr-item'>
						<span class='rhr-i-l'>送达时间</span>
						<span class='rhr-i-time'>{{seller.deliveryTime}}分钟</span>
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<rateSort :rates='rate' :rateDescpt='descpt' v-on:rateSelect='rateSelect'></rateSort>
		<div class="rateinfo-wrap">
			<ul>
				<li v-for='rate in rate' class='rateinfo' v-show='isShow(rate.rateType,rate.text)'>
					<div class="rateItem-head">
						<img class="rateItem-head" :src="rate.avatar">
					</div>
					<div class="rateItem-cont">
						<div class='rateic-user'>{{rate.username}}</div>
						<div class='rateic-time'><span></span><span>{{rate.deliveryTime}}分钟送达</span></div>
						<div class='rateic-text'>{{rate.text}}</div>
						<div><span v-for='item in rate.recommend' class='rateic-commd'>{{item}}</span></div>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>
<script>

	import axios from 'axios';
	import split from '../split/split';
	import rateSort from '../rateSort/rateSort';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data(){
			return {
				rate: [
				    {
				      "username": "3******c",
				      "rateTime": 1469281964000,
				      "deliveryTime": 30,
				      "score": 5,
				      "rateType": 0,
				      "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": [
				        "南瓜粥",
				        "皮蛋瘦肉粥",
				        "扁豆焖面",
				        "娃娃菜炖豆腐",
				        "牛肉馅饼"
				      ]
				    },
				    {
				      "username": "2******3",
				      "rateTime": 1469271264000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "deliveryTime": "",
				      "text": "服务态度不错",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": [
				        "扁豆焖面"
				      ]
				    },
				    {
				      "username": "3******b",
				      "rateTime": 1469261964000,
				      "score": 3,
				      "rateType": 1,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "1******c",
				      "rateTime": 1469261864000,
				      "deliveryTime": 20,
				      "score": 5,
				      "rateType": 0,
				      "text": "良心店铺",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "2******d",
				      "rateTime": 1469251264000,
				      "deliveryTime": 10,
				      "score": 4,
				      "rateType": 0,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "9******0",
				      "rateTime": 1469241964000,
				      "deliveryTime": 70,
				      "score": 1,
				      "rateType": 1,
				      "text": "送货速度蜗牛一样",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "d******c",
				      "rateTime": 1469231964000,
				      "deliveryTime": 30,
				      "score": 5,
				      "rateType": 0,
				      "text": "很喜欢的粥店",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "2******3",
				      "rateTime": 1469221264000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "量给的还可以",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "3******8",
				      "rateTime": 1469211964000,
				      "deliveryTime": "",
				      "score": 3,
				      "rateType": 1,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "a******a",
				      "rateTime": 1469201964000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "孩子喜欢吃这家",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": [
				        "南瓜粥"
				      ]
				    },
				    {
				      "username": "3******3",
				      "rateTime": 1469191264000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "粥挺好吃的",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "t******b",
				      "rateTime": 1469181964000,
				      "deliveryTime": "",
				      "score": 3,
				      "rateType": 1,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "f******c",
				      "rateTime": 1469171964000,
				      "deliveryTime": 15,
				      "score": 5,
				      "rateType": 0,
				      "text": "送货速度很快",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "k******3",
				      "rateTime": 1469161264000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "u******b",
				      "rateTime": 1469151964000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "下雨天给快递小哥点个赞",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "s******c",
				      "rateTime": 1469141964000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "好",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "z******3",
				      "rateTime": 1469131264000,
				      "deliveryTime": "",
				      "score": 5,
				      "rateType": 0,
				      "text": "吃了还想再吃",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "n******b",
				      "rateTime": 1469121964000,
				      "deliveryTime": "",
				      "score": 3,
				      "rateType": 1,
				      "text": "发票开的不对",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "m******c",
				      "rateTime": 1469111964000,
				      "deliveryTime": 30,
				      "score": 5,
				      "rateType": 0,
				      "text": "好吃",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "l******3",
				      "rateTime": 1469101264000,
				      "deliveryTime": 40,
				      "score": 5,
				      "rateType": 0,
				      "text": "还不错吧",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "3******o",
				      "rateTime": 1469091964000,
				      "deliveryTime": "",
				      "score": 2,
				      "rateType": 1,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "3******p",
				      "rateTime": 1469081964000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "很喜欢的粥",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "o******k",
				      "rateTime": 1469071264000,
				      "deliveryTime": "",
				      "score": 5,
				      "rateType": 0,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    },
				    {
				      "username": "k******b",
				      "rateTime": 1469061964000,
				      "deliveryTime": "",
				      "score": 4,
				      "rateType": 0,
				      "text": "",
				      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
				      "recommend": []
				    }
				  ],
				descpt: {
					all: '全部',
					well: '满意',
					bad: '不满意'
				},
				selectType: 0
			}
		},
		// created(){
		// 	axios.get('../../data.json').then( (res)=>{
		// 		this.rate = res.data.ratings;
		// 	} );
		// },
		methods: {
			rateSelect(type){
				this.selectType = type;
			},
			isShow(type,text){
				if( !text ){
					return false;
				}else if( this.selectType===2 ){
					return true
				}else{
					return this.selectType===type;
				}
			}
		},
		components: {
			'split': split,
			'rateSort': rateSort
		}
	};
</script>

<style type="text/css">
	.rate-head{
		display: flex;
		padding: 0.36rem 0.48rem;
	}
	.rateh-left{
		flex: 0 0 2.75rem;
		border-right: 0.01rem solid rgba(7,17,27,0.1);
		text-align: center;
	}
	.rhl-score{
		font-size: 0.48rem;
		color: rgb(255,153,0);
		line-height: 0.56rem;
	}
	.rhl-title{
		margin-top: 0.12rem;
		font-size: 0.24rem;
		color: rgb(7,17,27);
	}
	.rhl-rank{
		font-size: 0.2rem;
		margin-top: 0.16rem;
		color: rgb(147,153,159);
	}
	.rateh-right{
		padding-left: 0.48rem;
		font-size: 0;
	}
	.rhr-item{
		padding: 0.08rem 0;
		font-size: 0.24rem;
		color: rgb(7,17,27);
		line-height: 0.36rem;
	}
	.rhr-i-l{
		margin-right: 0.24rem;
	}
	.rhr-i-r{
		color: rgb(255,153,0);
	}
	.rhr-i-m{
		display: inline-block;
		width: 2rem;
		height: 0.36rem;
		background: rgba(255,153,0,0.4);
		vertical-align: top;
	}
	.rhr-i-time{
		color: rgb(147,153,159);
	}
	.rateinfo{
		padding: 0.36rem;
		display: flex;
	}
	.rateItem-head{
		flex: 0 0 0.56rem;
		width: 0.56rem;
		height: 0.56rem;
		border-right: 50%;
		background: rgba(7,17,27,0.1);
		margin-right: 0.24rem;
	}
	.rateItem-cont{
		color: rgb(7,17,27);
		font-size: 0.2rem;
		line-height: 0.24rem;
	}
	.rateic-time{
		color: rgb(147,153,159);
		margin: 0.08rem 0 0.12rem 0;
	}
	.rateic-text{
		font-size: 0.24rem;
		line-height: 0.36rem;
		margin-bottom: 0.16rem;
	}
	.rateic-commd{
		display: inline-block;
		padding: 0 0.12rem;
		font-size: 0.18rem;
		line-height: 0.32rem;
		color: rgb(147,153,159);
		border: 0.01rem solid rgba(7,17,27,0.1);
		border-radius: 0.02rem;
	}
</style>