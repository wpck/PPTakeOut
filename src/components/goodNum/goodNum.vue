<template>
	<div class='goodNum'>
		<transition name='count'>
			<span class="goodNum-decrease" @click.stop.prevent='decrsNum' v-show='food.count>0'>-</span>
		</transition>
		<span class="goodNum-num" v-show='food.count>0'>
			{{food.count}}
		</span>
		<span class="goodNum-increase" @click.stop.prevent='addNum'>+</span>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';

	export default{
		props: {
			food: {
				type: Object
			}
		},
		data(){
			return {
				goodNum: 0,
			}
		},
		methods: {
			addNum(){
				if( !this.food.count ){
					Vue.set( this.food,'count',1 );
				}else{
					this.food.count++;
				};
				this.$emit("numAdd",event.target);
			},
			decrsNum(){
				if(this.food.count){
					this.food.count--;
				}else{
					return ;
				}
			}
		}
	}
</script>
<style type="text/css">
	.goodNum{
		position: absolute;
		right: 0.36rem;
		bottom: 0.36rem;
		font-size: 0;
	}
	.goodNum-decrease,.goodNum-increase{
		display: inline-block;
		height: 0.36rem;
		width: 0.36rem;
		color: #fff;
		border-radius: 50%;
		background: rgb(0,160,220);
		line-height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		font-weight: 700;
	}
	.goodNum-num{
		display: inline-block;
		height: 0.36rem;
		line-height: 0.36rem;
		width: 0.48rem;
		text-align: center;
		font-size: 0.2rem;
		color: rgb(147,153,159);
		vertical-align: top;
	}
	/*vue版本升级，以下状态可以不用写
	.goodNum-decrease{
		transition: all 0.4s linear;
	}
	.count-transform{
		opacity: 1;
		transition: all 0.4s linear;
		transform: translate3d(0,0,0);
	}*/
	.count-enter-active,.count-leave-active{
		transition: all 0.3s linear;
	}
	.count-enter,.count-leave-to{
		opacity: 0;
		transform: translate3d(0.48rem,0,0);
	}
</style>