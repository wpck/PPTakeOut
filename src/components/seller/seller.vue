<template>
	<div class='sellerPage'>
		<div class="seller-item">
			<div class="seller-top">
				<p class='st-name'>{{iseller.name}}</p>
				<p class="sht-num"><span></span><span>({{iseller.ratingCount}})</span><span>月售{{iseller.sellCount}}单</span></p>
			</div>
			<div class="seller-botm">
				<div class="shb-item">
					<p>起送价</p>
					<p>{{iseller.minPrice}}<span>元</span></p>
				</div>
				<div class="shb-item">
					<p>商家配送</p>
					<p>{{seller.deliveryPrice}}<span>元</span></p>
				</div>
				<div class="shb-item">
					<p>平均配送时间</p>
					<p>{{seller.deliveryTime}}<span>分钟</span></p>
				</div>
			</div>
		</div>
		<split></split>
		<div class="seller-item seller-disct">
			<div class="seller-top">
				<p class="st-name">公告与活动</p>
				<p class='st-bulletin'>{{iseller.bulletin}}</p>
			</div>
			<div class="seller-botm">
				<ul>
					<li v-for='item in iseller.supports' class='iseller-descpt'>{{item.description}}</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="seller-item">
			<div class="seller-top">
				<p class="st-name">商家实景</p>
			</div>
		</div>
		<split></split>
		<div class="seller-item seller-info">
			<div class="seller-top">
				<p class="st-name">商家信息</p>
			</div>
			<div class="seller-botm">
				<ul>
					<li v-for='item in iseller.infos' class='iseller-descpt'>{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>

	import axios from 'axios';
	import split from '../split/split';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data(){
			return {
				iseller:  {
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
		// created(){
		// 	axios.get('../../data.json').then( (res)=>{
		// 		this.iseller = res.data.seller;
		// 	} );
		// },
		components: {
			'split': split
		}
	};
</script>

<style type="text/css">
	.seller-item{
		padding: 0.36rem;
	}
	.seller-top{
		padding-bottom: 0.36rem;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	.st-name{
		font-size: 0.28rem;
		color: rgb(7,17,27);
		padding-bottom: 0.16rem;
	}
	.sht-num{
		font-size: 0.1rem;
		color: rgb(77,85,93);
	}
	.seller-botm{
		display: flex;
	}
	.shb-item{
		flex: 1;
		text-align: center;
		padding-top: 0.36rem;
	}
	.shb-item>p:nth-of-type(1){
		font-size: 0.2rem;
		color: rgb(147,153,159);
	}
	.shb-item>p:nth-of-type(2){
		font-size: 0.48rem;
		color: rgba(7,17,27);
		margin-top: 0.08rem;
	}
	.shb-item>p:nth-of-type(2)>span{
		font-size: 0.2rem;
	}
	.seller-disct{
		padding-bottom: 0;
	}
	.st-bulletin{
		font-size: 0.24rem;
		font-weight: 200;
		color: rgb(240,20,20);
		line-height: 0.48rem;
	}
	.iseller-descpt{
		border-top: 0.01rem solid rgba(7,17,27,0.1);
		padding: 0.32rem 0.24rem;
		font-size: 0.24rem;
		color: rgb(7,17,27);
		font-weight: 200;
		line-height: 0.32rem;
	}
	.seller-info{
		padding-bottom: 0;
	}
	.seller-info>.seller-top{
		padding-bottom: 0.24rem;
	}
</style>