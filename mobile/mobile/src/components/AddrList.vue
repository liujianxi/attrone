<template>
    <div id="addr-list" class="page">
        <s-header type="0" title="地址管理" :hasBack='false'></s-header>
        <div class="orderBack" @click="orderGoback()" v-if="preway!='wechat'">
            <i class="l-more-black"></i>
        </div>
        <div class="main">
            <dl>
                <dd v-for="addr in addrlist" @click="choiceAddr(addr)">
                    <div class="fr">
                        <span>{{addr.contacts}}</span>
                        <span>{{addr.phone}}</span>
                    </div>
                    <div class="sr">
                        <span>{{addr.addressInfo}}</span>
                    </div>
                    <div class="tr">
                        <div class="de-addr" @click="useAddr(addr, $event)">
                            <i :class="['default-addr','gou-left',addr.defaultUse == 1 ? 'select' : '']"></i>
                            <span class="defaultaddr">设为默认</span>
                        </div>
                        <div class="right">
                            <span class="edit-w" @click="editAddr(addr, $event)">
                                <i class="edit-black"></i>
                                <span>编辑</span>
                            </span>
                            <span @click="delAddr(addr, $event)">
                                <i class="del-black"></i>
                                <span>删除</span>
                            </span>
                        </div>
                    </div>
                </dd>
            </dl>
            <div v-if="addrlist.length==0" class="bg-girl">
                <i></i>
                <p>添加服务地址便捷下单</p>
            </div>
        </div>
        <button class="btn_fix_bot" @click="addUserAddr()">＋新增地址</button>
    </div>
</template>
<script>
import SHeader from './SHeader.vue';
import eventBus from '../service/eventbus.js';
import { Toast, MessageBox } from 'mint-ui';
import http from '../service/api.js'

export default {
    components: { SHeader },
    data() {
        return {
            preway: '',
            addrlist: [],    //家庭地址列表
            justshow: '',   //是否只是展示的跳入，如果只展示，不添加点击事件；反之点击的时候回退，并emit出选中的id
        }
    },
    created() {
        eventBus.$on('sureUpdateAddr', (data) => {
            this.load();
        });
        eventBus.$on('sureAddAddr', (data) => {
            this.load();
        })
        //      dplus.track(["_trackEvent", "选择地址列表页", "浏览", "", 0, ""]);
    },
    activated() {
        this.load();
        this.preway = this.$route.query.preway;
        this.justshow = this.$route.query.justshow;
    },
    methods: {
        //添加新地址
        addUserAddr() {
            this.$router.push({ path: '/addredit' });
        },
        //选择地址
        choiceAddr(addr) {
            if (!this.justshow) {
                eventBus.$emit('sureAddr', { addr: addr, theUrl: this.$route.name });
                this.$router.go(-1);
            }
        },
        //设置默认使用地址
        useAddr(addr, e) {
            e.stopPropagation();
            var self = this;
            http.post('/json/SetDefaultAddress', { addrId: addr.addrId }).then(function(res) {
                //成功提示
                Toast({ message: '设置成功！' });
                //重置defaultUser属性值
                for (let i = 0; i < self.addrlist.length; i++) {
                    self.addrlist[i].defaultUse = null;
                }
                addr.defaultUse = 1;
                self.load();
            });
        },
        //编辑联系地址
        editAddr(addr, e) {
            e.stopPropagation();
            console.log(addr.addrId)
            this.$router.push({ path: '/addredit', query: { addrid: addr.addrId } });
        },
        //删除联系地址
        delAddr(addr, e) {
            e.stopPropagation();
            var self = this;
            MessageBox.confirm('是否删除？').then(action => {
                http.post('/json/DelUserAddress', { addrId: addr.addrId }).then(function(res) {
                    Toast({ message: '删除成功！' });
                    self.load();
                });
            });
        },
        //载入列表数据
        load() {
            var self = this;
            //发送请求
            http.post('/json/ListUserAddress')
                .then(function(res) {
                    if (res.errorCode == 0) {
                        res.body.userAddressVO.forEach(function(item, index) {
                            if (!item.defaultUse) {
                                item.defaultUse = null;
                            }
                        });
                        self.addrlist = res.body.userAddressVO;
                    } else {
                        Toast({ message: '查询地址列表失败!' + res.msg });
                    }
                }, function(res) {
                    Toast({ message: '查询地址列表请求失败!' + res.msg });
                });
        },
        orderGoback() {
            if (!this.addrlist.length) {
                eventBus.$emit('sureAddr', { addr: '' });
            }
            this.$router.go(-1);
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';
#addr-list {
    position: relative;
}

.l-more-black {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

dd {
    margin-bottom: px2rem(25px);
    background-color: #fff;
    text-align: left;
}

.fr {
    padding: 0 px2rem(35px);
    font-size: px2rem(32px);
    color: #0f0f0f;
    padding-top: px2rem(32px);

    span:last-child {
        margin-left: px2rem(45px);
    }
}

.sr {
    font-size: px2rem(28px);
    padding: px2rem(25px) px2rem(35px) px2rem(20px) px2rem(35px);
    color: #686866;
}

.tr {
    padding: 0 px2rem(35px);
    height: px2rem(85px);
    line-height: px2rem(85px);
    font-size: px2rem(28px);
    color: #686866;
    border-top: 1px solid #ebebeb;

    .defaultaddr {
        margin-left: px2rem(50px);
    }

    .right {
        float: right;
        i {
            // margin-right: px2rem(8px);
        }
        .deli {
            margin-left: px2rem(30px);
        }
    }
}

.de-addr {
    position: relative;
    display: inline-block;
}

.edit-w {
    margin-right: px2rem(20px);
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

.orderBack {
    width: px2rem(80px);
    height: px2rem(80px);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}
</style>