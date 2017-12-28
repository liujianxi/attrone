<template>
	<div id="addr-edit" class="page">
		<s-header type="0" title="搜索地址"></s-header>
		<div class="search-w">
			<div class="input-w">
				<i class="ser"></i>
				<input class="addrInput" type="text" placeholder="请搜索您的小区或大厦,街道名称" v-model="keyword" />
				<i v-if="!!keyword" class="clear" @click="clearKeyWord()"></i>
			</div>		
		</div>
		<div class="main">
			<dl class="inputdl">
				<dd class="addr" v-for="pos in positions">
					<div class="addr-contanier" @click="choicePos(pos)">
						<p class="title">{{pos.name}}</p>
						<p class="detail">{{pos.address}}</p>
					</div>
				</dd>
			</dl>
		</div>
		{{tips}}
	</div>
</template>

<script>
	import SHeader from './SHeader.vue'
    import eventBus from '../service/eventbus.js';

	export default {
		components: {
			SHeader
		},
		computed: {
			tips: function() {
				var self = this;
				window.placeSearch.search(this.keyword, function(status, result) {
					self.positions = result.tips;
					return result;
				});
			}
		},
		data() {
			return {
				positions: [],
				keyword: ''
			}
		},
		activated() {
			this.clearKeyWord();
			document.querySelectorAll('.addrInput')[0].focus();
		},
		methods: {
			choicePos(pos) {
				eventBus.$emit('sureSearchAddr', { pos: pos });
				this.$router.go(-1);
			},
			clearKeyWord(){
				this.keyword = '';
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/global.scss";
	.main {
		margin-top: px2rem(88px) !important;
		padding-bottom:0;
	}

	.search-w{
		position:fixed;
		z-index:2;
		top: px2rem(80px);
		width: 100%;
		height:px2rem(88px);
		background-color: #fff;
		border-bottom: 1px solid #ebebeb;

		.input-w{
			display:-webkit-box;
			width: px2rem(690px);
			background-color:#f8f8f8;
			height: px2rem(60px);
			margin: px2rem(14px) auto 0 auto;
			-webkit-box-align:center;			
			-webkit-box-pack:center;
			border-radius: px2rem(5px);
			padding: 0 px2rem(14px);
		}
		input{
			display:block;
			-webkit-box-flex:1;
			font-size:px2rem(28px);
			background-color:transparent;
			margin-left: px2rem(18px);
		}
		.ser{
			display:block;
			width: px2rem(26px);
			height: px2rem(26px);
			background: url('https://s.1-1dr.com/static/mobile/img/wechat/graysearch.png') no-repeat;
			background-size: 100% auto;
		}
		.clear{
			display: block;
			width: 0.48rem;
			height: 0.48rem;
			background: url(/static/img/delete.568370a.png) no-repeat;
			background-size: 100% auto;
		}
	}
	
	.inputdl {
		text-align: left;
		background-color: #fff;
		padding: 0 px2rem(26px);

		dd.addr {
			border-bottom: 1px solid #ebebeb;
			display:block;
			padding: px2rem(15px) 0;
			
			div.addr-contanier{
				width:95%;
				height:auto;
				display:block;
				vertical-align: middle;

				p.title{
					margin-top:px2rem(14px);
					margin-bottom:px2rem(14px);
					font-size:px2rem(30px);
					color: #333;
				}
				p.detail{
					margin-bottom:px2rem(14px);
					font-size:px2rem(24px);
					color:#666;
				}
			}

		}
	}
	
</style>