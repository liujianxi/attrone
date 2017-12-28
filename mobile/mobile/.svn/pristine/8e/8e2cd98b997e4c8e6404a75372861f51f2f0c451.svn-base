<template>
    <div id="bankCard">
        <s-header type=0 title="我的银行卡"></s-header>
        <div class="main">
            <div class="nobank" v-if="!bankName">
                <div class="nobank-pic">
                    <p></p>
                </div>
                <p>还未绑定银行卡</p>
            </div>
            <div class="card-main" v-if="bankName">
                <div class="card-pic">
                    <div class="card-content">
                        <div class="card-top">
                            <p>{{bankName}}</p>
                            <i>{{bankTypeStr}}</i>
                        </div>
                        <div class="card-num">
                            <p>
                                <span>
                                    <i>****</i>
                                </span>
                                <span>
                                    <i>****</i>
                                </span>
                                <span>
                                    <i>****</i>
                                </span>
                                <span>
                                    <i>{{cardNOStr}}</i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-card" v-if="!bankName" @click="editCard('add')">
                <p>添加银行卡</p>
            </div>
            <div class="add-card" v-if="bankName" @click="editCard('change')">
                <p>修改银行卡</p>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'

export default {
    components: { SHeader },
    data() {
        return {
            bankName: '',
            bankTypeStr: '',
            cardNO: '',
            cardholderName: '',
            cardNOStr: '',
            bankBranch:'',
        }
    },
    created() {

    },
    activated() {
        this.initBank();
    },
    methods: {
        initBank() {
            let self = this;
            http.post('/json/ListUserBank').then((res) => {
                if (res.body.bankList.length) {
                    let item = res.body.bankList[0];
                    self.bankName = item.bankName||'';
                    self.bankTypeStr = item.bankTypeStr||'';
                    self.cardNO = item.cardNO||'';
                    self.cardholderName = item.cardholderName||'';
                    self.cardNOStr = item.cardNOStr||'';
                    self.bankBranch=item.bankBranch||'';
                }

            })
        },
        editCard(str) {
            let self = this;
            if (str == 'add') {
                let data = {
                    type: 'add',
                }
                this.$router.push({ path: '/editCard', query: { str: data } });
            } else {
                let data = {
                    type: 'change',
                    name: self.cardholderName,
                    cardNO: self.cardNO,
                    bankBranch:self.bankBranch,
                }
                this.$router.push({ path: '/editCard', query: { str: data } });
            }
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
//106 84
#bankCard {
    background: #fff;
    font-family: PingFangSC-Regular;
}

.main {
    .nobank {

        .nobank-pic {
            padding: pxrem(104px) pxrem(134px) 0 pxrem(135px);
            p {
                width: pxrem(106px);
                height: pxrem(84px);
                background-image: url('https://s.1-1dr.com/static/mobile/img/wechat/nobank-2.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                -webkit-background–size: cover;
                -moz-background–size: cover;
                -o-background–size: cover;
            }
        }
        >p {
            margin-top: pxrem(40px);
            font-size: pxrem(18px);
            color: #929292;
        }
    }
    .add-card {
        margin-top: pxrem(126px);
        padding: 0 pxrem(38px);
        p {
            font-size: pxrem(18px);
            color: #2BD6BD;
            border: pxrem(1px) solid #2BD6BD;
            border-radius: pxrem(3px);
            padding: pxrem(10px) 0;
        }
    }
    .card-main {
        .card-pic {
            padding: pxrem(82px) pxrem(38px) 0 pxrem(38px);
            .card-content {
                font-size: pxrem(18px);
                color: #fff;
                height: pxrem(165px);
                background-image: linear-gradient(135deg, #14CBC9 0%, #18D9BC 51%, #3ADDB0 100%);
                box-shadow: 0 pxrem(3px) pxrem(10px) 0 rgba(80, 227, 194, 0.80);
                border-radius: pxrem(12px);
                .card-top {
                    padding: pxrem(32px) pxrem(27px) 0 pxrem(27px);
                    position: relative;
                    p {
                        text-align: left;
                    }
                    i {
                        font-style: normal;
                        position: absolute;
                        right: pxrem(27px);
                        top: pxrem(32px);
                    }
                }
                .card-num {
                    margin-top: pxrem(42px);
                    padding: 0 pxrem(27px);
                    p {
                        text-align: left;
                        display: flex;
                        display: -webkit-flex;
                        span {
                            display: block;
                            flex: 1;
                            i {
                                font-size: pxrem(18px);
                                line-height: pxrem(18px);
                                font-style: normal;
                                position: relative;
                                top: pxrem(4px);
                                letter-spacing: pxrem(0.5px);
                            }
                        }
                        span:nth-child(2),
                        span:nth-child(3) {
                            text-align: center;
                        }
                        span:nth-child(4) {
                            text-align: right;
                        }
                        span:nth-child(3) {
                            i {
                                left: pxrem(4px);
                            }
                        }
                        span:nth-child(4) {
                            i {
                                top: 0;
                                left: pxrem(4px);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>