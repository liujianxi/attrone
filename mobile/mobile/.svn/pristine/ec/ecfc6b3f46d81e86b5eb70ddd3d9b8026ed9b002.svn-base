<template>
    <div id="long-p-f">
        <div id="orderHead">
            <s-header type="0" title="选择申请人" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main">
            <dl>
                <dd v-for="(item,index) in personList" :key="index">
                    <div class="fr">
                        <i :class="['lt-bar',item.insureFlagType==1?'status0':'']"></i>
                        <span :class="[item.insureFlagType==1?'greycolor':'']">{{item.name}}</span>
                        <span :class="['sp',item.insureFlagType==1?'greycolor':'']">性别：{{item.sex | sexFilter}}</span>
                        <span :class="item.insureFlagType==1?'greycolor':''">年龄：{{item.age | numberCountFilter}}</span>
                        <div class="r">
                            <i class="edit-black" @click="updPerson(item)"></i>
                            <i class="del-black" @click="delPerson(item)"></i>
                        </div>
                    </div>
                    <div :class="['sr',item.insureFlagType==1?'greycolor':'']" @click="choicePerson(item)">
                        <!-- <span v-if="item.score != -1 && item.score != -2">自评得分：{{item.score}}</span> -->
                        <span>长护险资质：{{item.insureDesc}}</span>
                        <button class="req" v-if="item.insureFlagType==0">申&nbsp;&nbsp;请</button>
                        <button class="req" v-if="item.insureFlagType==2">去补全</button>
                    </div>
                </dd>
            </dl>
            <div v-if="personList.length==0" class="bg-girl">
                <i></i>
                <p>添加家庭成员&nbsp;关爱亲人健康</p>
            </div>
        </div>
        <button class="btn_fix_bot" @click="addPerson()">＋添加家庭成员</button>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js';

export default {
    components: { SHeader },
    data() {
        return {
            personList: [],	//家庭成员列表
        }
    },
    created() {
        //      dplus.track(["_trackEvent", "长护险申请人列表页", "浏览", "", 0, ""]);
    },
    activated() {
        this.load();
    },
    methods: {
        choicePerson(item) {
            var self = this;
            if (item.insureFlagType == 1) {//不可申请
                return false;
            } else if (item.insureFlagType == 0) {//可申请
                eventBus.$emit('surePeople', { person: item });
                this.$router.push({ path: '/longprotectapply' });
            } else {//去补全
                self.updPerson(item)
            }
        },
        updPerson(item) {
            this.addPerson(item);
        },
        addPerson(item) {
            var self = this;
            if (item) {
                self.$router.push({ path: '/addmember', query: { kinsid: item.kinsId } });
            } else {
                self.$router.push({ path: '/addmember' });
            }
        },
        delPerson(item) {
            var self = this;
            MessageBox.confirm('确认删除家庭成员?', '提示').then(action => {
                if (action == 'confirm') {
                    //发送请求
                    http.post('/json/DelKinsfolk', { kinsId: item.kinsId })
                        .then(function(res) {
                            if (res.errorCode == 0) {
                                Toast({ message: '删除成功!' });
                                self.load();
                            } else {
                                Toast({ message: '删除失败!' + res.msg });
                            }
                        });
                }
            });
        },
        load() {
            var self = this;
            //发送请求
            http.post('/json/ListKinsfolk')
                .then(function(res) {
                    if (res.errorCode == 0) {
                        self.personList = res.body.kinsfolkList;
                    } else {
                        Toast({ message: res.msg });
                    }
                }, function() {
                    //  				Toast({message: res.msg});
                });
        },
        orderGoback() {
            this.$router.push({ path: '/longprotectapply' });
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";

.main {
    font-size: px2rem(32px);
    text-align: left;
}

.bg-girl {
    margin-top: 35%;
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
        font-size: px2rem(30px);
        margin-top: px2rem(42px);
        color: #ccc;
    }
}

dd {
    background-color: #fff;
    margin-top: px2rem(20px);

    .fr,
    .sr {
        padding: 0 px2rem(30px);
    }
    .fr {
        position: relative;
        height: px2rem(118px);
        line-height: px2rem(118px);
        color: #666;
        border-bottom: 1px solid #ebebeb;

        .sp {
            margin-right: px2rem(65px);
        }
    }
    .sr {
        height: px2rem(106px);
        line-height: px2rem(106px);
        color: #2bd6bd;
    }
}

.r {
    float: right;

    .edit-black {
        margin-right: px2rem(65px);
    }
}

.req {
    float: right;
    margin-top: px2rem(22px); // width:px2rem(120px);
    padding: 0 px2rem(45px);
    height: px2rem(60px);
    line-height: px2rem(60px);
    border: 1px solid #2bd6bd;
    color: #2bd6bd;
    font-size: px2rem(32px);
    background-color: #fff;
}

.lt-bar {
    display: block;
    position: absolute;
    width: px2rem(75px);
    height: px2rem(75px);
    left: 0;
    top: 0;
}

.lt-bar.status0 {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/Badge0.png') no-repeat;
    background-size: 100% auto;
}
dl dd .greycolor {
    color: #ccc;
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