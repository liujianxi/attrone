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
	    		<img src="http://s.1-1dr.com/static/mobile/img/apply-pic1.png"/>
	    	</div>
	    	<div class="footer">
	    		<div class="footer-content">
	    			<h2>照顾家人，也有工资！</h2>
	    			<p>老伴卧病在床，想要全天照顾却又不得不兼职赚钱？“长护险-自照服务”帮你一举两得。无论是已经在照顾家人，还是希望为他人提供护理服务，亦或是想提升专业技能、获得更好地发展平台。“长护险-自照服务”与你一同，陪伴家人，提升自我！</p>
	    		</div>
	    		<div class="footer-apply">
	    			<ul>
	    				<li @click="applyList()">查看我的申请</li>
	    				<li @click="goNext()">下一步</li>
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
        	goNext(){
        		this.$router.push({path:'/careapply2'});
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
	    	.footer-content{
	    		padding: pxrem(65px) pxrem(20px) pxrem(43px) pxrem(20px);
	    		color:#ffffff;
	    		text-align:left;
	    		h2{
	    			margin:0;
	    			padding: 0;
	    			font-size:pxrem(24px);
					font-weight: normal;
					margin-bottom:pxrem(5px);
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
	    		color:#fff;
	    		ul{
	    			padding: pxrem(50px) 0 pxrem(30px) 0;
	    			overflow: hidden;
	    			li{
	    				width:49%;
	    				height:pxrem(20px);
	    				float:left;
	    				padding: pxrem(4px) 0;
	    				img{
	    					height: 100%;
	    				}
	    			}
	    			li:nth-child(1){
	    				border-right:1px solid #fff;
	    			}
	    		}
	    	}
	    }
    }
    
</style>