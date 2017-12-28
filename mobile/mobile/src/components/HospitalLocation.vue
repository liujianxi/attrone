<template>
    <div id="hospital-list">
        <s-header type="101" title="医院" @rightCall="clickSerIcon()">
        </s-header>
        <div :class="['ser-input', serInputIsShow ? 'show' : '']">
            <input class="orgInput" type="text" v-model="keyword" @input="loadData()" placeholder="您需要哪家医院的服务？">
        </div>
        <dl>
            <dd v-for="(item,index) in list" @click="loadBranch(item.orgVO)" :key="index">
                <div :class="['orgname',item.orgVO.isLocation?'select':'']">
                    <span class="name">{{ item.orgVO.orgName }}<i v-if="item.orgVO.isLocation">当前定位</i></span>
                    <span class="class right">{{ item.orgVO.orgLevelStr }}</span>
                </div>
                <div class="huli">
                    {{item.orgVO.worker==undefined?0:item.orgVO.worker}}位护理员&nbsp;/&nbsp;被服务人数{{item.orgVO.servicedNumber}}
                </div>
                <div class="thd-row">
                    <div class="zhuanpei" v-if="item.orgVO.tagList!=undefined" v-for="(tagItem,index) in item.orgVO.tagList" :style="'background:'+tagItem.colorStr+';'" :key="index">{{tagItem.tagName}}</div>
                    <div class="zhuanpei" v-if="item.orgVO.tagList==undefined" :style="'background:#FFC362'">无标签</div>
                    <div class="dis right">{{ item.distance | howFar }}</div>
                </div>
            </dd>
        </dl>
        </mt-loadmore>
        <div class="bg-girl" v-if="!list.length">
            <i></i>
            <p>找不到医院，请输入医院名全称</p>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue';
import http from '../service/api.js';
import { Toast, MessageBox,Indicator} from 'mint-ui'
import eventBus from '../service/eventbus.js';
import { wxChooseImage, wxUploadImage, isEmpty, isEmptyStr ,wxUploadQrcode} from '../util/common.js'
import {wxGetPosition, amapGetPosition,} from "../util/common.js";
export default {
    components: { SHeader },
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            allLoaded: false,	//是否已加载完毕
            lat: '',
            lng: '',
            adcode: '',
            keyword: '',
            list: [],
            serInputIsShow: false,
            isOrgId:'',//当前定位的orgid
        }
    },
    methods: {
        getPosition: function() {
            var self = this;
            return new Promise(function(resolve, reject) {
            wxGetPosition(window.wx)
                .then(function(res) {
                    //微信定位获取经纬度
                    console.log(res);
                    window.position.lat = res.lat; //经度
                    window.position.lng = res.lng; //纬度
                    return amapGetPosition(window.amap, [res.lng, res.lat]);
                })
                .then(function(res) {
                    //高德地图根据经纬度获取adcode
                    window.position.adcode = res.adcode; //区域编号
                    window.position.citycode = res.citycode; //城市编码
                    resolve();
                })
                .catch(function() {
                    console.info('getPosition catch come in!');
                    reject();
                });
            });
        },
        //加载科室信息
        loadBranch(org) {
            let self = this;
            //发送请求
            http.post('/json/GetOrgAndBranch', {
                adcode: window.position.adcode,
                lat: window.position.lat,
                lng: window.position.lng,
                orgId: org.orgId
            }).then(function(res) {
                if(res.errorCode==0){
                    self.takeOrder(org); //下单----扫描二维码
                }
            });
        },
        //下单----扫描二维码
        takeOrder(org) {
            let isHis=org.isHis;
            let self=this;
            if(org.isHis){//已经跟his对接过
                self.$router.push({ path: '/hisinput',query:{orgData:JSON.stringify(org)}});
                //ZY020000361897----ZY010000364059--0000364059
                // self.checkOrg(org.orgId,'ZY020000361890');//进行住院号匹配
            }else{//没有对接his
                self.$router.push({ path: '/hospitalphoto',query:{orgData:JSON.stringify(org),preway:'hoslocation'}});
            }
        },
        clickSerIcon() {
            this.serInputIsShow = !this.serInputIsShow;
        },
        //加载数据
        loadData(str,orgId) {
            var self = this;
            //发送请求
            let params={
                keyword: self.keyword,
                lat: window.position.lat,
                lng: window.position.lng,
                adcode: window.position.adcode,
                pageNo: self.pageNo
            }
            if(str=='init'){
                params['orgId']=orgId;
            }
            http.post('/json/GetOrgList',params).then(function (res) {
                self.list = res.body.orgList;
            });
        }
    },
    activated() {
        let self=this;
        self.keyword = '';
        document.querySelector('.orgInput').focus();
    },
    created() {
        let self=this;
        Indicator.open();
        if(window.nearestOrg!=undefined){
            self.isOrgId=window.nearestOrg.orgId;
        }
        //获取地理位置后加载首页数据
        if(window.nearestOrg.orgId==''||window.nearestOrg.orgName==''){
            self.getPosition().then(function() {
                self.loadData('init',self.isOrgId);
            }).catch(function() {
                self.loadData('init',self.isOrgId);
            });
        }else{
            self.loadData('init',self.isOrgId);
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/hospitalList.scss";
.bg-girl {
  padding-top: px2rem(100px);
  text-align: center;
  i {
    display: inline-block;
    width: px2rem(322px);
    height: px2rem(322px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/family.png') no-repeat;
    background-size: 100% auto;
  }
  p {
    font-family: 'SimHei';
    font-size: px2rem(32px);
    margin-top: px2rem(42px);
    color: #ccc;
  }
}
.orgname.select{
    .name{
        color:#2bd6bd;
        position:relative;
        padding-right:px2rem(150px); 
    }
    i{
        line-height: 1;
        font-size:px2rem(24px);
        display: block;
        padding:px2rem(4px) px2rem(10px);
        font-style: normal;
        position:absolute;
        right:0;
        top:50%;
        transform: translateY(-50%);
        border:px2rem(2px) solid #FCAB53;
        color: #FCAB53;
        border-radius: px2rem(20px);
    }
}
</style>