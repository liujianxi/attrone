<template>
    <div id="hospital-list">
        <s-header type="1" title="医院" @rightCall="clickSerIcon()">
        </s-header>
        <div :class="['ser-input', serInputIsShow ? 'show' : '']">
            <input class="orgInput" type="text" v-model="keyword" @input="loadData()" placeholder="您需要哪家医院的服务？">
        </div>
        <dl>
            <dd v-for="(item,index) in list" @click="goback(item.orgVO)" :key="index">
                <div>
                    <span class="name">{{ item.orgVO.orgName }}</span>
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
import eventBus from '../service/eventbus.js';
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
            serInputIsShow: false
        }
    },
    methods: {
        //回退
        goback(org) {
            http.post('/json/GetOrgAndBranch', {
                orgId: org.orgId,
            }).then((res) => {
                if (res.errorCode != 8) {
                    window.nearestOrg = org;
                    eventBus.$emit('choiceOrg', { org: org, theUrl: this.$route.name });
                    this.$router.go(-1);
                }
            })

        },
        //下拉加载
        loadBottom() {
            setTimeout(function () {
                this.allLoaded = true;
                this.$refs.loadmore.onBottomLoaded();
            }.bind(this), 2000);
        },
        clickSerIcon() {
            this.serInputIsShow = !this.serInputIsShow;
        },
        //加载数据
        loadData() {
            var self = this;
            //发送请求
            http.post('/json/GetOrgList', {
                keyword: self.keyword,
                lat: window.position.lat,
                lng: window.position.lng,
                adcode: window.position.adcode,
                pageNo: self.pageNo
            }).then(function (res) {
                self.list = res.body.orgList;
            });
        }
    },
    activated() {
        this.keyword = '';
        this.loadData();
        document.querySelector('.orgInput').focus();
    },
    created() {
//      dplus.track(["_trackEvent", '医院选择页面', "浏览", "", 0, ""]);
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
</style>