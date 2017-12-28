<template>
	<div id="introduction">
		<s-header type="0" title=""></s-header>
		<img class="head-img" src="http://s.1-1dr.com/static/mobile/img/introduction.jpg" />
		<!-- 居家照护长护险 -->
		<div class="show-content" v-if="service == 'jj'">
			<h1>居家照护长护险预约</h1>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;居家照护长期护理保险以长期处于失能状态的参保人群为保障对象，重点解决重度失能人员基本生活照料所需费用，广州是华南五省唯一政府指定试点城市</p>
			<h2>申请流程：</h2>
			<div class="image-package">
				<img src="http://s.1-1dr.com/static/mobile/img/jj_process.png">
			</div>
			<h2>申请资格：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;试点阶段，长期护理保险的参保范围为广州市职工社会医疗保险参保人员。经鉴定评估符合条件的参保人员，可按规定在广州市行政区域内享受相应的长期护理保险待遇。试点阶段，未正常享受职工社会医疗保险待遇的参保人员，不纳入长期护理保险的保障范围。</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;参保人员因年老、疾病、伤残等原因生活完全不能自理，经鉴定评估已达或预期将达六个月以上，且符合规定条件的，可申请长期护理保险待遇，由长期护理保险定点服务机构（以下简称长护定点机构）提供基本生活照料服务。</p>
			<h2>基金来源：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;试点阶段，长期护理保险基金按照每年人均130元的标准筹集，基金来源于职工社会医疗保险统筹基金划拨，个人和单位暂不需缴费。</p>
			<h2>长护险基金支付范围：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;享受长期护理保险待遇的失能人员（以下简称失能参保人员）接受长护定点机构提供的护理服务，发生的床位费、鉴定评估费以及服务项目范围内的基本生活照料费等符合规定的费用纳入长期护理保险基金支付范围。</p>
			<strong>以下情况，不在长护险基金支付范围之内：</strong>
			<ol>
				<li>应当从社会医疗保险、工伤保险、生育保险等其他社会保险或社会福利制度支付的费用；</li>
				<li>应当由第三人依法负担的费用；</li>
				<li>参保人员住院、急诊留观期间或在非长护定点机构发生的费用；</li>
				<li>超出长期护理保险支付范围的费用；</li>
				<li>国家、省、市规定的其他不予支付费用。</li>
			</ol>
			<h2>支付标准：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;居家接受长护定点机构提供服务的（居家护理），其基本生活照料费用按不高于115元/人•天的标准按比例支付。属于长期护理保险基金支付范围和支付标准以内的费用由长期护理保险基金按90%的比例支付，其他费用由参保人员自行负担。</p>
		</div>
		
		<!-- 家庭长护险 -->
		<div class="show-content" v-if="service == 'jt'">
			<p>&nbsp;&nbsp;&nbsp;&nbsp;医疗护理长期护理保险以长期处于失能状态的参保人群为保障对象，重点解决重度失能人员与基本生活密切相关的医疗护理等所需费用，广州是华南五省唯一政府指定试点城市。</p>
			<h1>家庭护士长护险预约</h1>
			<h2>申请流程：</h2>
			<div class="image-package">
				<img src="http://s.1-1dr.com/static/mobile/img/yl_process.png">
			</div>
			<h2>申请资格：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;试点阶段，长期护理保险的参保范围为广州市职工社会医疗保险参保人员。经鉴定评估符合条件的参保人员，可按规定在广州市行政区域内享受相应的长期护理保险待遇。试点阶段，未正常享受职工社会医疗保险待遇的参保人员，不纳入长期护理保险的保障范围。</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;参保人员因年老、疾病、伤残等原因生活完全不能自理，经鉴定评估已达或预期将达六个月以上，且符合规定条件的，可申请长期护理保险待遇，由长期护理保险定点服务机构（以下简称长护定点机构）提供医疗护理服务。</p>
			<h2>基金来源：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;试点阶段，长期护理保险基金按照每年人均130元的标准筹集，基金来源于职工社会医疗保险统筹基金划拨，个人和单位暂不需缴费。</p>
			<h2>长护险基金支付范围：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;享受长期护理保险待遇的失能人员（以下简称失能参保人员）接受长护定点机构提供的护理服务，发生的床位费、鉴定评估费以及服务项目范围内的基本生活照料费等符合规定的费用纳入长期护理保险基金支付范围。</p>
			<strong>以下情况，不在长护险基金支付范围之内：</strong>
			<ol>
				<li>应当从社会医疗保险、工伤保险、生育保险等其他社会保险或社会福利制度支付的费用；</li>
				<li>应当由第三人依法负担的费用；</li>
				<li>参保人员住院、急诊留观期间或在非长护定点机构发生的费用；</li>
				<li>超出长期护理保险支付范围的费用；</li>
				<li>国家、省、市规定的其他不予支付费用。</li>
			</ol>
			<h2>支付标准：</h2>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;经核定的医疗护理费用按项目及支付比例支付，最高支付限额为1000元/人•月。 属于长期护理保险基金支付范围和支付标准以内的费用由长期护理保险基金按居家护理90%的比例支付，其他费用由参保人员自行负担。</p>
		</div>
		<button class="btn_fix_bot" @click="goLongProtect()" v-if="isShowBtn">申&nbsp;&nbsp;请</button>
	</div>

</template>

<script>
	import { isApp } from '../util/common.js'
	import SHeader from './SHeader.vue';
	
	export default {
		components: {SHeader},
		data() {
			return {
				service: 'jj'
			}
		},
		computed : {
			isShowBtn : function(){
				if(isApp(window)){
					return false
				}else{
					return true;
				}
			}
		},
		created() {
			this.service = this.$route.params.service;
		},
		methods: {
			goLongProtect(){
				this.$router.push({path: '/longprotectreq'});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/global.scss";
	
	#introduction {
		text-align: left;
		background-color: white;
	}
	
	body {
		text-align: left;
		margin: 0;
	}
	
	h1 {
		text-align: left;
		font-size: px2rem(48px);
		color: #2BD6BD;
	}
	
	h2 {
		font-size: px2rem(28px);
	}
	
	ol {
		padding: 0;
		margin-left: px2rem(40px);
		margin-bottom: px2rem(20px);
	}
	
	li {
		margin-bottom: px2rem(10px);
		line-height: px2rem(30px);
	}
	
	blockquote {
		margin-left: 0;
		padding: px2rem(20px);
		margin-bottom: px2rem(25px);
		background-color: #f7f7f7;
		border-left: 6px solid #b4b4b4;
		word-break: break-word;
		font-size: px2rem(24px);
		font-weight: 400;
		line-height: px2rem(30px);
	}
	
	blockquote p {
		font-size: px2rem(24px);
		font-weight: 400;
		line-height: 1.7;
	}
	
	.show-content {
		padding-left: px2rem(31px);
		padding-right: px2rem(31px);
		color: #999;
		word-break: break-word;
		font-size: px2rem(24px);
		font-weight: 400;
		line-height: 1.7;
		background-color: white;
		padding-bottom: px2rem(120px);
	}
	
	.image-package {
		padding-bottom: px2rem(25px);
		width: px2rem(700px);
		height: auto;
		width: 100%;
		text-align: center;
	}
	
	.image-package img {
		width: 100%;
		height: 100%;
		max-width: 100%;
		height: auto;
		vertical-align: middle;
		border: 0;
		transition: all .25s ease-in-out;
		box-sizing: border-box;
	}
	
	.head-img {
		width: 100%;
	}
</style>