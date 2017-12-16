<template>
	<div class="header">
		<div class="con-wrap">
			<div class="head-img">
				<img class="head-img" :src='seller.pic_url' alt="">
			</div>
			<div class="head-discript">
				<div class="disc-title">
					<!-- <span class='disc-brand'></span> --><span class='disc-name'>{{seller.name}}</span>
				</div>
				<div class="delivery">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="disc-support">
					<!-- <span class="supports-img"></span> --><span v-if='seller.supports'>{{seller.supports[0].description}}</span>
				</div>
				<div class="float-page">
					<span v-if='seller.supports' @click="ShowDetail">{{seller.supports.length}}个</span>
				</div>
			</div>
		</div>
		<div class="notice-wrap">
			<!-- <span class="notice-img"></span> --><span class='notice'>{{seller.bulletin}}</span>
		</div>

		<div class="detail-page" v-show="showDetail">
			<div class="detail-head">
				<p class="detail-h-name">{{seller.name}}</p>
				<div class="detail-h-rates"></div>
			</div>
			<div class="item">
				<div class="item-title">
					<div class="title-line"></div>
					<div class="title-text">优惠信息</div>
					<div class="title-line"></div>
				</div>
				<div class="item-cont">
					<ul>
						<li v-for="item in seller.supports" class='item-cont-list'>{{item.description}}</li>
					</ul>
				</div>
			</div>
			<div class="item">
				<div class="item-title">
					<div class="title-line"></div>
					<div class="title-text">商家公告</div>
					<div class="title-line"></div>
				</div>
				<div class="item-cont">
					<p class="item-cont-list">{{seller.bulletin}}</p>
				</div>
			</div>
			<div class="detail-close" @click="HideDetail">X</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				showDetail: false
			}
		},
		methods: {
			ShowDetail() {
				this.showDetail = true;
			},
			HideDetail() {
				this.showDetail = false;
			}
		}
	};
</script>

<style>
	/*header组件样式*/
	.header{
		position: relative;
		color: #fff;
		background: rgba(7, 17, 27, 0.5);
	}
	.con-wrap{
		padding: 0.48rem 0.24rem 0.36rem 0.48rem;
		font-size: 0;
		display: flex;
	}
	.head-img{
		flex: 0 0 1.28rem;
		width: 1.28rem;
		height: 1.28rem;
		background: #000;
		border-radius: 0.04rem;
		margin: 0;
	}
	.head-discript{
		vertical-align: top;
		display: inline-block;
		padding: 0.04rem 0;
		margin-left: 0.32rem;
		position: relative;
	}
	.disc-title{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.disc-brand{
		display: inline-block;
		vertical-align: top;
		border-width: 0px;
		width: 0.6rem;
		height: 0.32rem;
		background: #000;
		margin: 0;
	}
	.disc-name{
		display: inline-block;
		vertical-align: top;
		margin-left: 0.12rem;
		font-size: 0.32rem;
		font-weight: bold;
		line-height: 0.32rem;
	}
	.delivery{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.24rem;
		font-weight: 2rem;
		margin: 0.16rem 0 0.2rem;
	}
	.disc-support{
		font-size: 0.2rem;
		line-height: 0.24rem;
		vertical-align: middle;
	}
	.supports-img{
		display: inline-block;
		vertical-align: top;
		margin-right: 0.08rem;
		width: 0.24rem;
		height: 0.24rem;
		background: #000;
	}
	.notice-wrap{
		position: relative;
		background: rgba(7,17,27,0.2);
		padding: 0 0.44rem 0 0.24rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.notice{
		line-height: 0.56rem;
		font-size: 10px;
		margin: 0 0.08rem;
		vertical-align: top;
	}
	.notice-img{
		display: inline-block;
		width: 0.44rem;
		height: 0.24rem;
		background: #000;
		margin-top: 0.16rem;
		vertical-align: top;
	}
	.float-page{
		position: absolute;
		bottom: 0;
		right: 0.24rem;
		border-radius: 0.14rem;
		padding: 0.14rem;
		background: rgba(0,0,0,0.2);
		font-size: 0.2rem;
		font-weight: 2rem;
		line-height: 0.24rem;
	}

	/*弹出层样式*/
	.detail-page{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 60;
		width: 100%;
		overflow: auto;
		background: rgba(7,17,27,0.8);
		padding: 0 0.72rem 0.64rem 0.72rem;
		box-sizing: border-box;
	}
	.detail-head{
		text-align: center;
		padding-top: 1.28rem;
	}
	.detail-h-name{
		font-size: 0.32rem;
		font-weight: 7rem;
		margin-bottom: 0.32rem;
	}
	.detail-h-rates{
		height: 0.48rem;
		width: 50%;
		background: #aaa;
		margin: 0 auto 0.56rem;
	}
	.item{

	}
	.item-title{
		display: flex;
	}
	.title-line{
		flex: 1;
		height: 0.01rem;
		background: rgba(255,255,255,0.2);
		margin-top: 0.12rem;
	}
	.title-text{
		padding: 0 0.24rem;
	}
	.item-cont{
		padding: 0.48rem 0.24rem 0.32rem;
	}
	.item-cont-list{
		font-size: 0.24rem;
		line-height: 0.48rem
	}
	.detail-close{
		width: 0.64rem;
		height: 0.64rem;
		bottom: 0.64rem;
		margin: 0 auto;
		font-size: 0.64rem;
	}
</style>