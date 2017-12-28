<template>
    <div id="long-p-r">
        <div id="orderHead">
            <s-header type="0" title="长护险申请" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()" v-if="preway!='wechat'">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main">
            <div class="tit tit-person">参保人信息</div>
            <div class="be-ser" @click="goAddPerson()">
                <span class="sp notEmpty">参保人：</span>
                <span class="sp notEmpty" v-if="!isEmpty(person)">{{person.name}}</span>
                <span class="sp notEmpty namepad" v-if="!isEmpty(person)">年龄：{{person.age}}</span>
                <span class="notEmpty namepad" v-if="!isEmpty(person)">性别：{{person.sex | sexFilter}}</span>

                <span class="ri">
                    <em v-if="isEmpty(person)">请选择</em>
                    <i class="r-more-green"></i>
                </span>
            </div>
            <div class="tit tit2">
                <em>联系信息</em>
                <i>(申请提交后，将指派护士上门评估，请填写真实的联系信息)</i>
            </div>
            <div class="choose-addr" @click="goAddrList">
                <div class="color-line1"></div>
                <div class="sel-a">
                    <div v-if="isEmpty(addr)">
                        <p class="tips">请选择联系信息</p>
                    </div>
                    <div v-else>
                        <p>{{addr.contacts}}
                            <span>{{addr.phone}}</span>
                        </p>
                        <p class="addr-detail">{{addr.addressInfo}}</p>
                    </div>
                    <i class="r-more-green"></i>
                </div>
                <div class="color-line2"></div>
            </div>
            <section>
                <div class="tit">代理人信息（没有可不填）</div>
                <div class="info">
                    <span>姓名：</span>
                    <input v-model="agentPerson.name" type="text" placeholder="请填写代理人真实姓名">
                </div>
                <div class="info">
                    <span>关系：</span>
                    <input v-model="agentPerson.relation" type="text" placeholder="请填写代理人与参保人关系">
                </div>
                <div class="info tel">
                    <span>电话：</span>
                    <input v-model="agentPerson.phone" type="number" placeholder="请填写代理人电话">
                </div>
            </section>
            <section>
                <div class="tit">代理人指替参保人办理长护险申请的人</div>
                <div class="be-ser post-type" @click="clickPost()">
                    <span class="sp notEmpty">长护险通过的告知书领取方式：</span>
                    <!-- <span class="sp notEmpty real-type" v-if="real_type!=''">{{real_type}}</span> -->
                    <span class="ri">
                        <em v-if="real_type!=''">{{real_type}}</em>
                        <em v-if="real_type==''">请选择</em>
                        <i class="r-more-green"></i>
                    </span>
                </div>
            </section>
        </div>
        <button class="btn_fix_bot" @click="addInsure()">提交申请</button>
        <!-- 邮寄选择选择 -->
        <mt-popup v-model="showPostPanel" :closeOnClickModal="true" position="bottom">
            <div class="pp-content">
                <ul>
                    <li v-for="(item,index) in postSlots" :key="index" @click="getPost(item.values)">{{item.values}}</li>
                </ul>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { Toast, MessageBox, Popup,} from 'mint-ui'
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'
import { isEmpty } from '../util/common.js'
var tmpPostVal;
export default {
    components: { Popup, SHeader },
    data() {
        return {
            agentPerson: {},//代理人
            person: {},  //家庭成员
            addr: {},    //联系地址
            contactName: '', //联系人(暂时不用)
            contactPhone: '',    //联系手机号(暂时不用)
            insureNO: '',  //订单编号
            score: -1, //最后评测分数
            lastAssessTime: '', //最后自评时间
            healthCareNO: '',  //医保卡号
            noPeople: false,    //未添加联系人
            kinsId: '',
            initPerson: false,
            preway: '',          //前一路径
            idCardNo: '',//身份证
            postSlots: [{
                values: '邮寄',
            }, {
                values: '自行领取',
            }],
            showPostPanel: false,   //显示领取方式
            real_type: '',//领取方式 1-邮寄 2-自行领取
        }
    },
    created() {
        //      dplus.track(["_trackEvent", "长护险申请页", "浏览", "", 0, ""]);
    },
    activated() {
        var self = this;
        self.preway = self.$route.query.preway;
        eventBus.$on('sureAddr', (data) => {
            self.addr = data.addr;
            self.initPerson = true;
        });
        eventBus.$on('surePeople', (data) => {
            console.log(data.person);
            self.person = data.person;
            self.kinsId = data.person.kinsId;
            self.initPerson = true;
        });
        eventBus.$on('sureAddPeople', (data) => {       //没有person，直接跳转到添加人，添加完成返回的情况
            self.person = data.person;
            self.kinsId = data.person.kinsId;
            self.initPerson = true;
        })
        window.current_page = 'longprotectapply';
        var personObj = this.$route.query.person;
        var addrObj = this.$route.query.addr;
        if (!isEmpty(personObj)) {
            self.person = personObj;
        }
        if (!isEmpty(addrObj)) {
            self.addr = addrObj;
        }
        if (!self.initPerson) {//不是选择地址---参保人--初始化--调用查询参保人接口
            self.initData();
            self.getDefaultPerson();//获取新的family数据
        }
        if (isEmpty(self.addr)) {
            self.getDefaultAddr();
        }
    },
    methods: {
        initData() {
            let self = this;
            //领取方式
            self.real_type = '';
            self.person = '';
            self.idCardNo = '';
            self.kinsId = '';
            //代理人
            for (let i in self.agentPerson) {
                if (i != 'phone') {
                    self.agentPerson[i] = '';
                }
            }
        },
        clickPost() {
            this.showPostPanel = true;
        },
        getPost(str) {
            this.showPostPanel = false;
            this.real_type = str;
        },
        inputHealth() {//输入医保卡
            dplus.track(["_trackEvent", '长护险申请页输入医保卡', "点击", "", 0, ""]);
        },
        isEmpty(obj) {
            return isEmpty(obj);
        },
        goAddrList() {
            let self = this;
            dplus.track(["_trackEvent", '长护险申请页添加联系信息', "点击", "", 0, ""]);
            if (isEmpty(self.addr)) {
                self.$router.push({ path: '/addredit' });
            } else {
                self.$router.push({ path: '/addrList' });
            }
        },
        goAddPerson() {
            dplus.track(["_trackEvent", '长护险申请页添加申请人', "点击", "", 0, ""]);
            if (this.noPeople&&isEmpty(this.person)) {
                //未添加过联系人则跳转到新增页面
                this.$router.push({ path: './addmember', query: { goback: 'longprotect' } });
            } else {
                //已添加过联系人则跳转到
                this.$router.push({ path: '/longprotectfamily' });
            }
        },
        goNext() {
            var self = this;
            self.initPerson=false;
            if (self.score == -1) {
                //从未进行自评，则直接跳到自评页
                self.$router.push({ path: './test', query: { insureNO: self.insureNO, idcard: self.person.idCardNo,test:'test' } });
            } else if (self.score == -2) {
                //无需再自评，直接到申请详情页
                self.$router.push({ path: './lpdetail', query: { insureNO: self.insureNO } });
            } else {
                //显示自评分数，提示是否需要重新评测
                MessageBox.confirm('', {
                    message: '<p style="text-align:left;">上次评估分数：' + self.score + '分</p><p style="text-align:left;">上次评估时间：' + self.lastAssessTime + '</p>',
                    title: '提示',
                    confirmButtonText: '重新评估',
                    cancelButtonText: '直接提交'
                }).then(action => {
                    if (action == 'confirm') {
                        //确定则重新评测
                        self.$router.push({ path: './test', query: { insureNO: self.insureNO, idcard: self.person.idCardNo,test:'test' } });
                    }
                }).catch(err => {
                    if (err == 'cancel') {
                        self.real_type='';
                        self.person = '';
                        self.idCardNo = '';
                        self.kinsId = '';
                        //取消则跳转到订单列表页
                        self.$router.push({ path: './lpdetail', query: { insureNO: self.insureNO } });
                    }
                });
            }
        },
        addInsure() {
            var self = this;
            console.log(self.person);
            if (isEmpty(self.person)||!self.kinsId) {
                Toast({ message: '请选择申请人!' });
                return false;
            }
            if (isEmpty(self.addr)) {
                Toast({ message: '请选择或添加联系信息!' });
                return false;
            }
            if (!self.real_type) {
                Toast({ message: '请选择告知书领取方式!' });
                return false;
            }
            let phoneReg = /^1[34578]\d{9}$/;//手机号校验正则
            if (self.agentPerson.phone != undefined && self.agentPerson.phone != '' && !phoneReg.test(self.agentPerson.phone)) {
                Toast({ message: '请输入正确的手机号码' });
                return false;
            }
            dplus.track(["_trackEvent", '长护险申请页提交按钮', "点击", "", 0, ""]);
            var params = {
                kinsId: self.kinsId,
                addrId: self.addr.addrId,
                insureGetType: self.real_type == '邮寄' ? 1 : 2,
                agencyName: self.agentPerson.name,
                agencyRelation: self.agentPerson.relation,
                agencyPhone: self.agentPerson.phone,
            };
            console.log(params);
            //发送请求
            http.post('/json/AddInsure', params).then(function(res) {
                if (res.errorCode == 0) {
                    Toast({ message: '申请提交成功!' });
                    //提交申请成功后获取申请单号以及上一次测评数据
                    self.insureNO = res.body.insureNO;
                    self.score = res.body.score;
                    self.lastAssessTime = res.body.lastAssessTime;
                    // console.log('AddInsure success!insureNO:'+self.insureNO);
                    self.goNext();
                }
            });
        },
        //获取默认家庭成员
        getDefaultPerson() {
            var self = this,
                personList = [];
            //发送请求
            http.post('/json/ListKinsfolk').then(function(res) {
                personList = res.body.kinsfolkList;
                if (personList.length > 0) {//有联系人列表
                    self.noPeople = false;
                    for (let i = 0; i < personList.length; i++) {
                        if (personList[i].insureFlag) {
                            self.person = personList[i];
                            self.idCardNo = personList[i].idCardNo;
                            self.kinsId = personList[i].kinsId;
                            return;
                        }
                    }
                } else {
                    // 从未添加联系人
                    self.noPeople = true;
                }
            });
        },
        //获取默认家庭联系地址
        getDefaultAddr() {
            var self = this,
                addrList = [];
            http.post('/json/ListUserAddress').then(res => {
                if (res.errorCode == 0) {
                    self.agentPerson.phone = res.body.userPhone;
                    console.log(self.agentPerson.phone);
                    addrList = res.body.userAddressVO;
                    for (let i = 0; i < addrList.length; i++) {
                        if (addrList[i].defaultUse == 1) {
                            self.addr = addrList[i];
                            return;
                        }
                    }
                }
            });
        },
        orderGoback() {
            this.$router.push({ path: '/longprotectintro' });
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';

.disable {
    background: #ccc;
}

i,
em {
    font-style: normal;
}

.main {
    text-align: left;
}

.tit.tit-person {
    background: #fff;
}

.tit {
    padding: px2rem(26px) 0 px2rem(26px) px2rem(30px);
    font-size: px2rem(32px);
    color: #999;
    background: #f8f8f8;
}

.tit.tit2 {
    position: relative;
    padding: px2rem(20px) 0 px2rem(25px) px2rem(30px);
    i {
        font-size: pxrem(10px);
        color: #2BD6BD;
    }
}

.info {
    padding: 0 pxrem(15px);
    height: pxrem(45px);
    line-height: pxrem(45px);
    background: #fff;
    text-align: left;
    font-size: pxrem(16px);
    color: #1D1D26;
    border-bottom: pxrem(1px) solid rgba(19, 27, 51, 0.05);
    input {
        height: 80%;
        width: 70%;
        font-size: pxrem(16px);
        line-height: pxrem(45px);
    }
}

.info.tel {
    border: 0;
}

.be-ser {
    height: px2rem(90px);
    line-height: px2rem(90px);
    font-size: px2rem(32px);
    color: #CCCCCC;
    padding: 0 px2rem(30px);
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
}

.be-ser.post-type {
    font-size: pxrem(16px);
    position: relative;
    .real-type {
        position: absolute;
        top: 0;
        right: px2rem(50px);
        color: #2BD6BD;
    }
}

.be-ser {
    position: relative;
    input {
        width: 60%;
        font-size: px2rem(32px);
        position: absolute;
        top: 0;
        left: px2rem(180px);
        display: block;
        z-index: 100;
        vertical-align: middle;
    }
    .ri {
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        right: px2rem(30px);
        z-index: 101;
        em {
            color: #2BD6BD;
            font-style: normal;
        }
    }
    .notEmpty {
        color: #333;
    }
    .namepad {
        margin-left: px2rem(30px);
    }
}

.name,
.phone {
    height: px2rem(86px);
    line-height: px2rem(86px);
    padding: 0 px2rem(30px);
    background-color: #fff;

    input {
        width: px2rem(600px);
        height: 100%;
        padding: 0;
        font-size: px2rem(30px)
    }

    i {
        display: inline-block;
        width: px2rem(30px);
        height: px2rem(31px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/mko_edit.png') no-repeat;
        background-size: 100% auto;
        float: right;
        margin-top: px2rem(27.5px);
    }
}

.name {
    border-bottom: 1px solid #ebebeb
}

.choose-addr {
    background-color: #fff;
    font-size: px2rem(32px);

    .def-t {
        color: #ccc;
        padding: 0 px2rem(30px);
        min-height: px2rem(140px);
        line-height: px2rem(140px);
        display: -webkit-box;
        -webkit-box-align: center;

        >p {
            -webkit-box-flex: 1;
        }
    }

    .sel-a {
        color: #333;
        padding: px2rem(60px) px2rem(30px);
        display: -webkit-box;
        -webkit-box-align: center;
        .tips {
            color: #999;
        }
        p {
            span {
                margin-left: pxrem(20px);
            }
        }
        >div {
            -webkit-box-flex: 1;
        }
        p {
            margin-bottom: px2rem(12px);
        }
        p:last-child {
            margin-bottom: 0;
            width: 96%;
        }
    }
}

#orderHead {
    position: relative;
}

.orderBack {
    width: px2rem(80px);
    height: px2rem(80px);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}

.l-more-black {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.pp-content {
    width: px2rem(750px);
    text-align: center;
    font-size: pxrem(16px);
    ul {
        li {
            position: relative;
            height: px2rem(108px);
            line-height: px2rem(108px);
            border-bottom: 1px solid #ebebeb;
        }
    }
}
</style>