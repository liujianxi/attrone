<template>
    <div id="addr-edit" class="page">
        <s-header type="0" title="新增联系信息"></s-header>
        <div class="main">
            <dl class="inputdl" :style="inputDlStyle">
                <dd class="contact">
                    <i></i>
                    <input type="text" placeholder="联系人" v-model="addr.contacts" />
                </dd>
                <dd class="phone">
                    <i></i>
                    <input type="tel" placeholder="联系电话" v-model="addr.phone" />
                </dd>
                <dd class="pos" @click="goAddrsSearch()">
                    <i></i>
                    <input type="text" placeholder="您的位置" v-model="addr.building" />
                    <i class="r-more-black"></i>
                </dd>
                <dd class="addr detail-addr">
                    <i></i>
                    <input type="text" placeholder="详细地址" v-model="addr.addrDetail" />
                </dd>
            </dl>
            <button :class="['btn_fix_bot',!valid ?'disable':'']" @click="addUserAddr()">确定</button>
            <input type="hidden" v-model="username">
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'
import { isApp, isEmpty } from '../util/common.js'

export default {
    components: { SHeader },
    data() {
        return {
            addr: {
                addrId: undefined,
                addrDetail: undefined,
                contacts: undefined,
                phone: undefined,
                adCode: undefined,
                building: undefined,
                street: undefined
            },
            shouldInit: true    //shouldInit用于控制是否执行activated逻辑，如果是进入addrsearch，activated就不执行，如果直接退出，新增或更新完成退出，activated都需要可执行
        }
    },
    computed: {
        username: function() {
            var self = this;
            let pattern = /^[\u4E00-\u9FA5]+$/;
            var textstr = [];
            var arry = [];
            if (self.addr.contacts) {
                arry = self.addr.contacts.split('');
            }
            for (var i = 0; i < 4; i++) {
                textstr.push(arry[i]);
            }
            self.addr.contacts = textstr.join('');
        },
        inputDlStyle: function() {
            return {
                //微信上有header，top：80px; app上没有header设置为0
                'top': isApp(window) ? '0' : '1.06666667rem'
            }
        },
        valid: function() {
            return this.addr.contacts && this.addr.phone && this.addr.building && this.addr.adCode && this.addr.addrDetail;
        }
    },
    created() {
        eventBus.$on('sureSearchAddr', (data) => {
            this.addr.lat = !!data.pos && !!data.pos.location && !!data.pos.location.lat;
            this.addr.lng = !!data.pos && !!data.pos.location && !!data.pos.location.lng;
            this.addr.adCode = data.pos.adcode;
            this.addr.building = data.pos.name;
        });
    },
    activated() {
        var self = this;
        if (!self.shouldInit) {
            self.shouldInit = true;      //还原标志位
            return;
        }

        this.addr.addrId = self.$route.query.addrid;
        if (!!this.addr.addrId) {      //编辑回显
            http.post('/json/GetUserAddress', {
                addrId: self.addr.addrId
            }).then((data) => {
                for (var key in self.addr) {
                    self.addr[key] = data.body[key];
                }
            })

        } else {            //新增,清空所有数据
            for (var key in self.addr) {
                self.addr[key] = undefined;
            }
        }

    },
    methods: {
        //添加用户地址
        addUserAddr() {
            var self = this;
            if (!self.valid)
                return;

            var params = {
                gpsType: 2,    //导航类别1-百度 2-高德
                defaultUse: '',    //设置默认地址 1-设置
                contacts: self.addr.contacts,   //联系人
                phone: self.addr.phone,   //联系电话
                adCode: self.addr.adCode,   //城市编码
                building: self.addr.building,   //小区
                lat: self.addr.lat,   //纬度
                lng: self.addr.lng,   //经度
                addrDetail: self.addr.addrDetail,   //详细地址  
            };

            if (!!self.$route.query.addrid) {         //更新地址
                params.addrId = self.addr.addrId;

                http.post('/json/UpdateUserAddress', params)
                    .then((res) => {
                        Toast({ message: '修改成功!' });
                        eventBus.$emit('sureUpdateAddr', { addr: params });
                        self.$router.go(-1);
                    });

            } else {                                //新增地址
                delete params.addrId;

                http.post('/json/AddUserAddress', params)
                    .then(function(res) {
                        Toast({ message: '添加成功!' });
                        var tmp = params;
                        tmp.addrId = res.body.addrId;
                        eventBus.$emit('sureAddAddr', { addr: tmp });
                        self.$router.go(-1);
                    });
            }

        },
        //跳转到地址搜索页面
        goAddrsSearch() {
            this.shouldInit = false;
            this.$router.push({ path: 'addrSearch' });
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.disable {
    background: #ccc;
}

.main {
    margin-top: px2rem(400px) !important;
}

.inputdl {
    position: fixed;
    width: 100%;
    top: 0;
    text-align: left;
    background-color: #fff;

    dd {
        height: px2rem(100px);
        line-height: px2rem(100px);
        border-bottom: 1px solid #ebebeb;
        padding: 0 px2rem(30px);
    }
    dd:last-child {
        border: none;
    }
}

.contact {
    i {
        display: inline-block;
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/mko_row4.png') no-repeat;
        background-size: 100% auto;
        width: px2rem(24px);
        height: px2rem(24px);
        margin-right: 20px;
    }
    input {
        width: 85%;
    }
}

.phone {
    i {
        display: inline-block;
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/mko_row3.png') no-repeat;
        background-size: 100% auto;
        width: px2rem(24px);
        height: px2rem(24px);
        margin-right: 20px;
    }
    input {
        width: 85%;
    }
}

.pos {
    input {
        width: 80%;
    }

    i:first-child {
        margin-right: 20px;
        display: inline-block;
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/mko_row1.png') no-repeat;
        background-size: 100% auto;
        width: px2rem(23px);
        height: px2rem(27px);
    }

    i.r-more-black {
        display: inline-block;
        width: px2rem(14px);
        height: px2rem(26px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/more.png') no-repeat;
        background-size: 100% auto;
        float: right;
        margin-top: px2rem(37px);
    }
}

.addr {
    i {
        margin-right: 20px;
        display: inline-block;
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/addr.png') no-repeat;
        background-size: 100% auto;
        width: px2rem(18px);
        height: px2rem(21px);
    }
    input {
        width: 90%;
    }
}

input {
    font-size: px2rem(32px);
}

.addrgrayi {
    display: inline-block;
    width: px2rem(23px);
    height: px2rem(27px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/addrgray.png') no-repeat;
    background-size: 100% auto;
}
</style>