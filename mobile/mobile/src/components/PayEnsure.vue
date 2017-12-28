<template>
<div id="pay-ensure">
    <s-header 
        type="0"
        title="缴纳保证金"
    ></s-header>
    <div class="main">
        <div class="blank"></div>
        <div class="sure-m">
            <span>保证金：</span>
            <span class="m-num">{{ensuremoney}}</span>
            <span>元</span>
        </div>
        <div class="remark">该保证金由机构收取，评估通过后会退还至您的余额</div>
        <div class="pay-tit">支付方式</div>
        <div class="qb pay-it" @click="initPay('qb')" v-if="userpurse">
            <i class="qb-i"></i>
            <span>钱包支付</span>
            <div class="yu-e" v-if="purse!=null">余额{{purse}}元</div>
            <i :class="[moneyselect=='qb'?'select':'','gou']"></i>
        </div>
        <div class="qb pay-it nouse"  v-if="!userpurse">
            <i class="qb-i"></i>
            <span>钱包支付</span>
            <div class="yu-e" v-if="purse!=null">余额不足：{{purse}}元</div>
            <i :class="[moneyselect=='qb'?'select':'','gou']"></i>
        </div>
        <!--<div class="ali pay-it" @click="initPay('ali')">
            <i class="ali-i"></i>
            <span>支付宝支付</span>
            <i :class="[moneyselect=='ali'?'select':'','gou']"></i>
        </div>-->
        <div class="wx pay-it" @click="initPay('wx')">
            <i class="wx-i"></i>
            <span>微信支付</span>
            <i :class="[moneyselect=='wx'?'select':'','gou']"></i>             
        </div>
        <button class="btn_fix_bot" @click="payIt()">支 付</button>
    </div>
</div>
</template>
<script>
import SHeader from './SHeader.vue'
import {DOPAY_URL} from '../service/api.js'
import http from '../service/api.js'
import { Toast,MessageBox,Swipe, SwipeItem } from 'mint-ui';
export default{
    components: {SHeader},
    data(){
    	return{
    		moneyselect:'wx',
    		ensuremoney:'',
    		insureNO:'',
    		purse:'',
    		userpurse:'',
    	}
    },
    activated(){
    	this.ensuremoney = this.$route.query.ensuremoney;
    	this.insureNO=this.$route.query.insureNO;
    	this.getuserdetail();
    },
    methods:{
        initPay(str){
        	this.moneyselect=str;//选择支付方式
        },
        payIt(){
        	var self=this;
        	var op='PAY_INSURE';
    		var cburl ="https://"+window.location.host+"/mobile/index.html#/mylongprotect?1";
			cburl=encodeURIComponent(cburl);
			console.log(cburl)
        	if(self.moneyselect=='wx'){
				var url = DOPAY_URL+"?payType=2&operation=" + op+"&cburl="+cburl+'&insureNO='+self.insureNO; 
				console.log(url)
				window.location.href=url;
        	}{///json/DoPay
        		MessageBox.confirm('确定支付'+self.ensuremoney+'元保证金').then(action => {
                        if(action == 'confirm'){
                            http.post('/json/DoPay',{
			        			payType:'6',
			        			operation:'PAY_INSURE',
			        			insureNO:self.insureNO
			        		}).then(function(res){
			        			Toast({message:'支付成功',duration:1000});
				        		self.$router.push({path:'/mylongprotect'});
				            });
                        }
                    });
        		
        	}
        	
        },
        getuserdetail(){
        	var self=this;
        	http.post('/json/GetInsureDetail',{insureNO : self.insureNO}).then(function(res){
        		self.purse=res.body.purse;
        		self.userpurse=res.body.usePurse;
            });
        }
    }

}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';
@import '../assets/css/payways.scss';


.main{
    text-align:left;
    font-size: px2rem(30px);
}
.blank{
    height: px2rem(20px);
}
.nouse{
	color:#CCCCCC;
}
</style>