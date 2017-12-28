<template>
<div id="careApply">
	<div id="orderHead">
	    <!--<s-header 
	        type="0"
	        title="护理申请"
	        :hasBack='true'
	    ></s-header>-->
	    <section class="content">
	    	<div class="content-detail">
	    		<img src="http://s.1-1dr.com/static/mobile/img/apply-icon3.png"/>
	    	</div>
	    	<div class="footer">
	    		<div class="footer-content">
	    			<h2>流程</h2>
	    			<p>1.通过电话申请自照护工资格</p>
					<p>2.通过初审</p>
					<p>3.与护理易签订合约，准备参与培训</p>
					<p>4.参与专业技能培训（可线上培训）</p>
					<p>5.通过技能鉴定考核</p>
	    		</div>
	    		<div class="footer-apply">
	    			<ul>
	    				<li @click="applyList()">查看我的申请</li>
	    				<li @click="goApply()">我要申请</li>
	    			</ul>
	    		</div>
	    	</div>
	    </section>
	</div>
</div>
</template>
<script>
    import SHeader from './SHeader.vue';
    export default{
        components: {SHeader},
        data(){
            return {
            }
        },
        activated(){
	    },
        methods: {
        	goApply(){
        		this.$router.push({path:'/applypage'});
//      		this.$router.push({path : '/applysucc'});
        	},
        	applyList(){
        		this.$router.push({path : '/applylist'});
        	}
        }
    }
</script>
<style scoped lang="scss">
    @import "../assets/css/global.scss";
	@import '../assets/css/little.scss';
    #orderHead{
    	height:100%;
    	font-family:'.PingFangSC-Regular';
    	display: flex;
    	flex-direction: column;
    	.header-w{
    		height: px2rem(80px);
    	}
    }
    .content{
    	height:100%;
    	display: flex;
    	display: -webkit-flex;
    	-webkit-flex-direction: column;/* Safari 6.1+ */
    	flex-direction: column;
    	.content-detail{
	    	width:100%;
	    	position: relative;
	    	flex:1;
	    	img{
	    		width:pxrem(48px);
	    		height:pxrem(84px);
	    		position: absolute;
	    		left:50%;
	    		top:50%;
	    		transform: translate(-50%,-50%);
	    	}
	    }
	    .footer{
	    	background: #2bd6bd;
	    	width:100%;
	    	height:pxrem(334px);
	    	position: relative;
	    	color:#ffffff;
	    	.footer-content{
	    		padding: pxrem(65px) pxrem(50px) pxrem(43px) pxrem(20px);
	    		text-align:left;
	    		h2{
	    			margin:0;
	    			padding: 0;
	    			font-size:pxrem(24px);
					font-weight: normal;
	    		}
	    		p{
	    			font-size:pxrem(12px);
	    		}
	    	}
	    	.footer-apply{
	    		width:100%;
	    		height:pxrem(115px);
	    		font-size: pxrem(14px);
	    		position: absolute;
	    		left:0;
	    		bottom: 0;
	    		ul{
	    			padding: pxrem(50px) 0 pxrem(30px) 0;
	    			overflow: hidden;
	    			li{
	    				height:pxrem(20px);
	    				width:49%;
	    				float:left;
	    				padding: pxrem(4px) 0;
	    			}
	    			li:nth-child(1){
	    				border-right:1px solid #fff;
	    			}
	    		}
	    	}
	    }
    }
    
</style>