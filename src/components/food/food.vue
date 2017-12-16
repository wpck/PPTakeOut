<template>
	<transition name='showfoodpage'>
	<div v-show='isshow' class='foodPage'>
		<div class="foodP-pic">
			<img class="foodP-pic" :src="food.image">
		</div>
		<div class="foodP-back" @click='hide'>＜</div>
		<div class="foodP-cont">
			<div class="foodP-head">
				<div class="FPH-title">{{food.name}}</div>
				<div class="FPH-sellNum"><span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></div>
				<div class="FPH-price">
					<span>￥{{food.price}}</span>
					<span class="FPH-oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="foodP-add" v-if='!food.count' @click='addCart'>
					加入购物车
				</div>
				<goodNum :food='food' v-if='food.count'></goodNum>
			</div>
			<split></split>
			<div class="foodP-discrpt">
				<div class="FPD-head">商品介绍</div>
				<div class="FPD-cont">{{food.info}}</div>
			</div>
			<rateSort :rateDescpt='rateDescpt' :rates='food.ratings'></rateSort>
			<div class="foodRateCon">
				<ul>
					<li v-for='rate in food.ratings'>{{rate.text}}</li>
				</ul>
			</div>
		</div>
	</div>
	</transition>
</template>
<script type="text/javascript">

	import Vue from'vue';
	import split from '../split/split';
	import rateSort from '../rateSort/rateSort';
	import goodNum from '../goodNum/goodNum';

	export default{
		props: {
			food: {
				type: Array
			}
		},
		data(){
			return {
				isshow: false,
				rateDescpt: {
					all: '全部',
					well: '推荐',
					bad: '吐槽'
				}
			}
		},
		computed: {

		},
		methods: {
			show(){
				this.isshow=true;
				console.log(this.food)
			},
			addCart(){
				Vue.set(this.food,'count',1);
			},
			hide(){
				this.isshow = false;
			}
		},
		components: {
			'split': split,
			'rateSort': rateSort,
			'goodNum': goodNum
		}
	}
</script>
<style type="text/css">
	.showfoodpage-enter-active,.showfoodpage-leave-active{
		transition: all 0.3s linear;
		transform: translate3d(0,0,0);
	}
	.showfoodpage-enter,.showfoodpage-leave-to{
		transform: translate3d(100%,0,0);
	}
	.foodPage{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		bottom: 0.96rem;
		background: #fff;
		z-index: 10;
		overflow: auto;
	}
	.foodP-pic{
		width: 100%;
		height: 7.5rem;
		background: #eee;
	}
	.foodP-back{
		position: absolute;
		top: 0.06rem;
		left: 0.06rem;
		font-size: 0.36rem;
		color: #fff;
	}
	.foodP-head{
		padding: 0.36rem;
		position: relative;
	}
	.foodP-add{
		position: absolute;
		right: 0.36rem;
		bottom: 0.36rem;
		background: rgb(0,160,200);
		border-radius: 0.24rem;
		width: 1.48rem;
		padding: 0.12rem 0.24rem;
		color: #fff;
		font-size: 0.2rem;
		line-height: 0.24rem;
		text-align: center;
	}
	.FPH-title{
		font-size: 0.28rem;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.FPH-sellNum{
		margin-top: 0.16rem;
		font-size: 0.2rem;
		color: rgb(147,153,159);
	}
	.FPH-price{
		margin-top: 0.36rem;
		color: rgb(240,20,20);
		font-size: 0.28rem;
		font-weight: 700;
	}
	.FPH-oldPrice{
		font-size: 0.2rem;
		color: rgb(147,153,159);
	}
	.foodP-discrpt{
		padding: 0.36rem;
	}
	.FPD-head{
		font-size: 0.28rem;
		color: rgb(7,17,27);
		margin-bottom: 0.16rem;
	}
	.FPD-cont{
		font-size: 0.24rem;
		line-height: 0.48rem;
		color: rgb(77,85,93);
		font-weight: 200;
	}
</style>