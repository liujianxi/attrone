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
	    		<img src="http://s.1-1dr.com/static/mobile/img/apply-pic2.png"/>
	    	</div>
	    	<div class="footer">
	    		<div class="footer-content">
	    			<h2>申请资格</h2>
	    			<p>男女不限，身体健康，有爱心、责任心、细心</p>
					<p>有良好的沟通能力，有较高服务意识，有耐心和爱心</p>
					<p>听从公司管理，主动参与护理专业培训，积极学习通过公司考核</p>
					<p>具备老人、病患照护技能更佳</p>
					<p>具体事项请致电020-38026917-6045咨询</p>
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
        		this.$router.push({path:'/careapply3'});
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
	    		padding: pxrem(65px) pxrem(50px) pxrem(43px) pxrem(20px);
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
	    	/*.footer-next{
	    		width:100%;
	    		height: pxrem(100px);
	    		position: relative;
	    		img{
	    			position: absolute;
	    			left:50%;
	    			top:50%;
	    			transform: translate(-50%,-50%);
	    		}
	    	}*/
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