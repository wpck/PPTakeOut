<template>
	<div class='shopcart'>
		<div class="shopcart-wrap" @click='toggleCart'>
			<div class="cont-left">
				<div class="imgwrap">
					<div class="img"></div>
					<transition name='drop' v-on:before-enter='beforeEnter' v-on:enter='enter'>
						<span class="img-num" v-show='finalNum>0'>{{finalNum}}</span>
					</transition>
				</div>
				<div class="shopcart-price" v-if='finalPrice>0'>￥{{finalPrice}}元</div>
				<div class="shopcart-descript">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="cont-right" :class='goPay' @click.stop.prevent='Pay'>
				{{payDescript}}
			</div>
		</div>

			<!-- <div class="countBall-wrap">
				<transition-group name='drop'>
					<div class='count-ball' v-for='ball in balls' v-show='ball.show'>ball
					</div>
				</transition-group>
			</div> -->
		<transition name='fold'>
			<div class="shopgoods" v-show='showCart'>
				<div class="shopgoods-title">
					<div class='sg-left'>购物车</div>
					<div class='sg-delete' @click='emptyFood'>清空</div>
				</div>
				<div class="shopgoods-cont">
					<ul>
						<li v-for='food in foodSel' class='sg-item'>
							<span class='sgi-name'>{{food.name}}</span>
							<span class='sgi-price'>￥{{food.price*food.count}}</span>
							<goodNum :food='food'></goodNum>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div class="sp-mask" v-show='showCart' @click='hideCart'></div>
		</transition>
	</div>
</template>

<script type="text/javascript">
	import goodNum from '../goodNum/goodNum';
	export default{
		props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			foodSel: {
				type: Array,
				default(){
					return {
						price: 10,
						count: 1
					}
				}
			}
		},
		data(){
			return {
				balls: [],
				showCart: false
			}
		},
		computed: {
			payDescript(){
				if( this.finalPrice===0 ){
					return `￥${this.minPrice}元起送`;
				}else if( this.finalPrice<this.minPrice ){
					let dis = this.minPrice-this.finalPrice;
					return `还差￥${dis}元起送`;
				}else{
					return `去结算`;
				}
			},
			goPay(){
				if( this.finalPrice >= this.minPrice ){
					return 'goPay';
				}else{
					return ;
				}
			},
			//计算foodSel总数量
			finalNum(){
				let count = 0;
				this.foodSel.forEach( (food)=>{
					count += food.count;
				} );
				return count;
			},
			//计算选中食物总价
			finalPrice(){
				let finalP = 0;
				this.foodSel.forEach( (food)=>{
					finalP += food.count * food.price;
				} );
				return finalP;
			},
		},
		methods: {
			drop(target){
				this.balls.push(target);
			},
			beforeEnter(el){
				// let count = this.balls.length;
				// for(let i=0;i<count;i++){
				// 	let iball = this.balls[i];
				// 	let rect = el.getBoundingClientRect();
				// 	let x = rect.left - 0.64;
				// 	let y = - ( window.innerHeight/50 - rect.top - 0.44);
				// 	el.style.opacity = 0;
				// 	el.style.transform = `translate3d($(x)rem,$(y)rem,0)`;
				// }
			},
			enter(el){
				// el.style.opacity = 1;
				// el.style.transform = 'translate3d(0,0,0)';
			},
			toggleCart(){
				if( this.finalNum ){
					this.showCart = !this.showCart;
				}else{
					return;
				}
			},
			emptyFood(){
				this.foodSel.forEach( (item)=>{
					item.count = 0;
				} )
				this.showCart = false;
			},
			hideCart(){
				this.showCart = false;
			},
			Pay(){
				if( this.finalPrice<this.minPrice ){
					return;
				}
				window.alert( `支付${this.finalPrice}元` );
			}
		},
		components: {
			'goodNum': goodNum
		}
	}
</script>

<style type="text/css">
	.shopcart{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 0.96rem;
		color: rgb(255,255,255);
		z-index: 200;
	}
	.shopcart-wrap{
		background: #141d27;
	}
	.cont-left{
		display: flex;
		align-items: center;
		font-size: 0.24rem;
		padding-left: 0.36rem;
	}
	.imgwrap{
		position: relative;
		flex: 0 0 1.16rem;
	}
	.img{
		width: 0.88rem;
		height: 0.88rem;
		background: #fff;
		border-radius: 50%;
		border: 0.12rem solid #141d27;
		position: relative;
		bottom: 0.16rem;
	}
	.img-num{
		position: absolute;
		top: 0;
		right: 0.2rem;
		display: inline-block;
		bottom: 2rem;
		width: 0.3rem;
		height: 0.3rem;
		text-align: center;
		color: #fff;
		background: rgb(0,160,220);
		font-size: 0.12rem;
		line-height: 0.3rem;
		border-radius: 50%;
	}
	.cont-right{
		position: absolute;
		right: 0;
		top: 0;
		width: 2.1rem;
		height: 0.96rem;
		background: rgba(0, 0, 0, 0.2);
		font-size: 0.24rem;
		line-height: 0.96rem;
		font-weight: 700;
		text-align: center;
	}
	.goPay{
        background: #00b43c;
        color: #fff;
	}
	.shopcart-price{
		font-size: 0.28rem;
		color: rgb(0,160,220);
	}
	.shopcart-descript{
		font-size: 0.2rem;    
		color: rgb(147,153,159);
		margin-left: 0.1rem;
	}
	/*.count-ball{
		position: fixed;
		bottom: 0.44rem;
		left: 0.64rem;
		width: 0.3rem;
		height: 0.3rem;
		text-align: center;
		color: #fff;
		background: red;
		font-size: 0.12rem;
		line-height: 0.3rem;
		border-radius: 50%;
	}*/
	/*.drop-enter-active{
		transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}*/
	/*.drop-enter{
		opacity: 0;
		transform: translate3d(3rem,-3rem,0);
	}*/

	/*购物车列表*/
	.shopgoods{
		max-height: 6.11rem;
		overflow: auto;
		position: absolute;
		left: 0;
		bottom: 0.96rem;
		width: 100%;
		background: #fff;
		z-index: -1;
	}
	.shopgoods-title{
		display: flex;
		justify-content: space-between;
		height:0.8rem;
		background: #f3f5f7;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
		line-height: 0.8rem;
	}
	.sg-left{
		font-size: 0.28rem;
		margin-left: 0.36rem;
		color: rgb(7,17,27);
		font-weight: 200;
	}
	.sg-delete{
		font-size: 0.24rem;
		color: rgb(0,16,220);
		margin-right: 0.36rem;
	}
	.sg-item{
		position: relative;
		box-sizing: border-box;
		height: 0.96rem;
		padding: 0.24rem 0.36rem;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	.sgi-name{
		color: rgb(7,17,27);
		font-size: 0.28rem;
		line-height: 0.48rem;
	}
	.sgi-price{
		position: absolute;
		right: 1.8rem;
		font-size: 0.28rem;
		color: rgb(240,20,20);
		font-weight: 700;
		line-height: 0.38rem;
	}
	.fold-enter-active,.fold-leave-active{
		transition: all 0.3s linear;
	}
	/*.fold-transition{
		transition: all 0.3s linear;
		transform: translate3d(0,-100%,0);

	}*/
	.fold-enter,.fold-leave-to{
		transform: translateY(100%);
	}
	.sp-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(7, 17, 27, 0.6);
		z-index: -100;
	}
</style>