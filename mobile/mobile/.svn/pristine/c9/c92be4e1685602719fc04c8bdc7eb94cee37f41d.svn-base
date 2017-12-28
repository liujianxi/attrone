<template>
    <div id="family">
        <s-header :type="preway=='wechat'?'3':'0'" title="家庭成员"></s-header>
        <div class="main">
            <dl v-if="familyList.length!=0">
                <dd v-for="(item,index) in familyList" @key="item" :key='index'>
                    <div class="fr" @click="choosePerson(item)">
                        <span class="sp">{{item.name}}</span>
                        <span class="sp">性别：{{item.sex | sexFilter}}</span>
                        <span class="sp">年龄：{{item.age}}</span>
                    </div>
                    <div class="sr">
                        <div class="sr-l" @click="defaultPerson(item, $event)">
                            <i :class="['default-addr','gou-left', item.defaultUse ? 'select' : '']"></i>
                            <span class="defaultaddr">设为默认</span>
                        </div>
                        <div class="r">
                            <span class="edit-w" @click="updFamily(item, $event)">
                                <i class="edit-black"></i>编辑
                            </span>
                            <span @click="delFamily(item, $event)">
                                <i class="del-black"></i>删除
                            </span>
                        </div>
                    </div>
                </dd>
            </dl>

            <div v-if="familyList.length==0" class="bg-girl">
                <i></i>
                <p>添加家庭成员&nbsp;关爱亲人健康</p>
            </div>
        </div>

        <button class="btn_fix_bot" @click="goAddPerson()">+添加家庭成员</button>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast, MessageBox } from 'mint-ui'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js';

export default {
    components: { SHeader },
    data() {
        return {
            preway: '',
            familyList: [],
            justshow: this.$route.query.justshow,      //区别是否只是显示
            type: '',//判断是否是从home还是hospital过来
        }
    },
    created() {
        //      dplus.track(["_trackEvent", '被服务人列表', "浏览", "", 0, ""]);
    },
    activated() {
        this.preway = this.$route.query.preway;
        this.type = this.$route.query.type;
        this.load();
    },
    // deactivated(){
    //      eventBus.$off('sureFamily');
    // },
    methods: {
        choosePerson(item) {
            console.log('fa');
            let self = this;
            if (!this.justshow) {
                if (self.type == 'home') {
                    eventBus.$emit('sureFamily', { family: item, theUrl: this.$route.name });
                } else {
                    eventBus.$emit('hosFamily', { family: item, theUrl: this.$route.name });
                }
                this.$router.go(-1);
            }
        },
        updFamily(item, e) {
            e.stopPropagation();
            this.goAddPerson(item);
        },
        delFamily(item, e) {
            e.stopPropagation();
            var self = this;
            MessageBox.confirm('是否删除?', '提示').then(action => {
                if (action == 'confirm') {
                    //发送请求
                    http.post('/json/DelKinsfolk', { kinsId: item.kinsId }).then(function(res) {
                        Toast({ message: '删除成功!' });
                        self.load();
                    });
                }
            });
        },
        goAddPerson(item) {
            var params = {};
            let kinsid = '';
            if (item) {
                params = Object.assign(params, item);
                kinsid = item.kinsId;
            }
            this.$router.push({ path: '/addmember', query: { kinsid: kinsid, goback: 'family' } });
        },
        load() {
            var self = this;
            http.post('/json/ListKinsfolk').then(function(res) {
                self.familyList = res.body.kinsfolkList;
                self.familyNum = self.familyList.length;
            }, function(res) {
                Toast({ message: res.msg });
            });
        },
        defaultPerson(item, e) {
            e.stopPropagation();
            let self = this;
            http.post('/json/SetDefaultKinsfolk', { kinsId: item.kinsId }).then(function(res) {
                Toast({ message: '设置成功!' });
                //设置选中样式
                for (let i = 0; i < self.familyList.length; i++) {
                    self.familyList[i].defaultUse = false;
                }
                item.defaultUse = true;
                self.load();
            });
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';

.main {
    text-align: left;
    font-size: px2rem(32px);
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

        span {
            display: block;
            width: 33.3%;
        }
        span:last-child {
            float: right;
            text-align: right;
        }
        span:first-child {
            float: left;
            text-align: left;
        }
        span:nth-child(2) {
            float: left;
            text-align: center;
        } // .sp{
        //     margin-right: px2rem(65px);
        // }        
    }
    .sr {
        height: px2rem(106px);
        line-height: px2rem(106px);
        /*color: #2bd6bd;*/
        .sr-l {
            display: inline-block;
            position: relative;
        }
    }
}

.defaultaddr {
    margin-left: px2rem(50px);
}

.r {
    float: right;
    i {
        margin-right: px2rem(8px);
    }
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

.mint-cell {
    margin-bottom: px2rem(20px);
}


.div-item {
    width: 100%;
    display: -webkit-box;
    height: px2rem(100px);
    line-height: px2rem(100px);
    font-size: px2rem(30px);
    color: #999;
    margin: 0 auto;
}

.cen-span {
    display: block;
    text-align: center;
    -webkit-box-flex: 1;
}

.del {
    margin-right: 10px;
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