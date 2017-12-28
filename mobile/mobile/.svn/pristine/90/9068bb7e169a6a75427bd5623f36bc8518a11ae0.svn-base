<template>
    <div id="long-p-r">
        <div id="orderHead">
            <s-header type="0" title="长护险申请" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()" v-if="preway!='wechat'">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main">
            <div class="tit">申请人信息</div>
            <div class="be-ser" @click="goAddPerson()">
                <span class="sp notEmpty" v-if="isEmpty(person)">申请人：{{person.name}}</span>
                <span class="sp" v-if="isEmpty(person)">选择申请人</span>

                <span class="sp notEmpty" v-if="!isEmpty(person)">姓名：{{person.name}}</span>
                <span class="sp notEmpty namepad" v-if="!isEmpty(person)">年龄：{{person.age}}</span>
                <span class="notEmpty namepad" v-if="!isEmpty(person)">性别：{{person.sex | sexFilter}}</span>

                <span class="ri">
                    <i class="r-more-green"></i>
                </span>
            </div>
            <div class="be-ser">
                <span class="sp notEmpty">医保卡号：</span>
                <input type="tel" placeholder="请输入医保卡号" v-model='healthCareNO' @focus="inputHealth()">
                <span class="ri">
                    <i class="edit-blue"></i>
                </span>

            </div>
            <div class="tit tit2">联系信息</div>
            <div class="choose-addr" @click="goAddrList">
                <div class="color-line1"></div>
                <div class="def-t" v-if="addr==''">
                    <p>请选择联系人地址</p>
                    <i class="r-more-black"></i>
                </div>
                <div class="sel-a" v-else>
                    <div v-if="isEmpty(addr)" style="color:#ccc">
                        <p class="tips">请选择联系信息</p>
                    </div>
                    <div v-if="addr">
                        <p>{{addr.contacts}}</p>
                        <p>{{addr.phone}}</p>
                        <p class="addr-detail">{{addr.addressInfo}}</p>
                    </div>
                    <i class="r-more-black"></i>
                </div>
                <div class="color-line2"></div>
            </div>
            <div class="tit">申请提交后，我们会派护士上门评估申请人的情况，请填写真实的联系信息。</div>
        </div>
        <button :class="['btn_fix_bot',!valid ?'disable':'']" @click="addInsure()">提交</button>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'
import { isEmpty } from '../util/common.js'

export default {
    components: { SHeader },
    data() {
        return {
            person: {

            },  //家庭成员
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
        }
    },
    created() {
        //      dplus.track(["_trackEvent", "长护险申请页", "浏览", "", 0, ""]);
    },
    activated() {
        var self = this;
        this.preway = this.$route.query.preway;
        eventBus.$on('sureAddr', (data) => {
            self.addr = data.addr;
        });
        eventBus.$on('surePeople', (data) => {
            console.log(data.person);
            self.person = data.person;
            self.kinsId = data.person.kinsId;
            self.initPerson = true;
        });
        eventBus.$on('sureAddPeople', (data) => {       //没有person，直接跳转到添加人，添加完成返回的情况
            self.person = data.person
        })
        window.current_page = 'longprotectreq';
        var personObj = this.$route.query.person;
        var addrObj = this.$route.query.addr;
        if (!isEmpty(personObj)) {
            self.person = personObj;
            self.healthCareNO = personObj.healthCareNO;
        }

        if (!isEmpty(addrObj)) {
            this.addr = addrObj;
        }
        if (!this.initPerson) {
            self.getDefaultPerson();//获取新的family数据
        }
        if (isEmpty(self.addr)) {
            this.getDefaultAddr();
        }
    },
    computed: {
        valid: function() {
            if (!isEmpty(this.person) && !isEmpty(this.addr) && this.healthCareNO) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        inputHealth() {//输入医保卡
            dplus.track(["_trackEvent", '长护险申请页输入医保卡', "点击", "", 0, ""]);
        },
        isEmpty(obj) {
            return isEmpty(obj);
        },
        goAddrList() {
            dplus.track(["_trackEvent", '长护险申请页添加联系信息', "点击", "", 0, ""]);
            this.$router.push({ path: '/addrList' });
        },
        goAddPerson() {
            dplus.track(["_trackEvent", '长护险申请页添加申请人', "点击", "", 0, ""]);
            if (this.noPeople) {
                //未添加过联系人则跳转到新增页面
                this.$router.push({ path: './addmember' });
            } else {
                //已添加过联系人则跳转到
                this.$router.push({ path: '/longprotectfamily' });
            }
        },
        goNext() {
            var self = this;
            if (self.score == -1) {
                //从未进行自评，则直接跳到自评页
                self.$router.push({ path: './test', query: { insureNO: self.insureNO, idcard: self.person.idCardNo } });
            } else if (self.score == -2) {
                //无需再自评，直接到申请详情页
                self.$router.push({ path: './lpdetail', query: { insureNO: self.insureNO } });
            } else {
                //显示自评分数，提示是否需要重新评测
                MessageBox.confirm('', {
                    message: '上次评估分数：' + self.score + '\n上次评估时间：' + self.lastAssessTime,
                    title: '提示',
                    confirmButtonText: '重新评估',
                    cancelButtonText: '直接提交'
                }).then(action => {
                    if (action == 'confirm') {
                        //确定则重新评测
                        self.$router.push({ path: './test', query: { insureNO: self.insureNO, idcard: self.person.idCardNo } });
                    }
                }).catch(err => {
                    if (err == 'cancel') {
                        //取消则跳转到订单列表页
                        self.$router.push({ path: './lpdetail', query: { insureNO: self.insureNO } });
                    }
                });
            }
        },
        addInsure() {
            var self = this;
            if (self.idCardNo == undefined || self.idCardNo == '') {
                Toast({ message: '请完善申请人信息!' });
                return false;
            }
            dplus.track(["_trackEvent", '长护险申请页提交按钮', "点击", "", 0, ""]);
            if (self.valid) {
                var params = {
                    kinsId: self.kinsId,
                    addrId: self.addr.addrId,
                    healthCareNO: self.healthCareNO
                };

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
            }
        },
        //获取默认家庭成员
        getDefaultPerson() {
            var self = this,
                personList = [];
            //console.info('getDefaultPerson come in!');
            //发送请求
            http.post('/json/ListKinsfolk').then(function(res) {
                personList = res.body.kinsfolkList;
                if (personList.length > 0) {
                    self.noPeople = false;
                    for (let i = 0; i < personList.length; i++) {
                        if (personList[i].insureFlag) {
                            self.person = personList[i];
                            self.healthCareNO = personList[i].healthCareNO;
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
            http.post('/json/ListUserAddress').then(function(res) {
                if (res.errorCode == 0) {
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

.main {
    text-align: left;
}

.tit {
    padding: px2rem(26px) 0 px2rem(25px) px2rem(30px);
    font-size: px2rem(26px);
    color: #999;
}

.tit.tit2 {
    padding: px2rem(50px) 0 px2rem(25px) px2rem(30px);
}

.be-ser,
.score {
    height: px2rem(118px);
    line-height: px2rem(118px);
    font-size: px2rem(30px);
    color: #CCCCCC;
    padding: 0 px2rem(30px);
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
}

.be-ser {
    position: relative;
    input {
        width: 60%;
        font-size: px2rem(30px);
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
    font-size: px2rem(30px);

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
        min-height: px2rem(140px);
        padding: px2rem(20px) px2rem(30px);
        display: -webkit-box;
        -webkit-box-align: center;

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
</style>