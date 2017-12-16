<template>
	<div class="rate-sort">
		<div class="ratesort-wrap">
			<div class="sort-item sort-all" @click='rateSelect(2)'>
				<span>{{rateDescpt.all}}</span><span>{{rates.length}}</span>
			</div>
			<div class="sort-item sort-well" @click='rateSelect(0)'>
				<span>{{rateDescpt.well}}</span><span>{{wellRate.length}}</span>
			</div>
			<div class="sort-item sort-bad" @click='rateSelect(1)'>
				<span>{{rateDescpt.bad}}</span><span>{{badRate.length}}</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	
	export default{
		props: {
			rates: {
				type: Array
			},
			rateDescpt: {
				type: Object
			}
		},
		data(){
			return {
				selectRate: 2
			}
		},
		computed: {
			wellRate(){
				let wellrate = [];
				this.rates.forEach( (item)=>{
					if( item.rateType === 0 ){
						wellrate.push(item);
					}
				} );
				return wellrate;
			},
			badRate(){
				let badrate = [];
				this.rates.forEach( (item)=>{
					if( item.rateType === 1 ){
						badrate.push(item);
					}
				} );
				return badrate;
			}
		},
		methods: {
			rateSelect( type ){
				this.selectRate = type;
				this.$emit( 'rateSelect',type );
			}
		}
	}
</script>

<style type="text/css">
	.ratesort-wrap{
		padding: 0.36rem;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	.sort-item{
		display: inline-block;
		padding: 0.16rem 0.24rem;
		font-size: 0.24rem;
		color: rgb(77,85,93);
		line-height: 0.32rem;
	}
	.sort-item>span:nth-of-type(2){
		font-size: 0.16rem;
		margin-left: 0.1rem;
	}
	.sort-all{
		color: white;
		background: rgb(0,160,220);
	}
	.sort-well{
		background: rgba(0,160,220,0.2);
	}
	.sort-bad{
		background: rgba(77,85,93,0.2);
	}
</style>