<template>
    <div id="choose-hospital">
        <s-header type="2" title="选择科室" @rightCall="sureCall">
        </s-header>
        <div class="hos-top">
            <span class="has-ch">{{choiceOrg.orgName}}</span>
        </div>
        <div class="branch-list">
            <ul>
                <li v-for="(item,index) in branchList" :class="keyNum==index?'selected':''" :key='index' @click="getBranch(index,item)">
                    <span>{{item.branchName}}</span>
                    <i v-if='keyNum!=index'></i>
                    <i v-else>
                        <img src="https://s.1-1dr.com/static/mobile/img/wechat/branch-done.png">
                    </i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue';
import eventBus from '../service/eventbus.js';
import http from '../service/api.js';
import { Toast, } from 'mint-ui'
import { isEmpty } from '../util/common.js'
export default {
    components: { SHeader },
    data() {
        return {
            keyNum: -1,//选择的科室
            choiceOrg: '',
            position: window.position,
            branchList: [],
            roomList: [],
            bedList: [],
            roomBedMap: {},
            choiceRoom: {},
            choiceBranch: {},
            choiceBed: {},
        }
    },
    activated() {
        //重置选中数据
        this.keyNum = -1;
        this.roomList = [];
        this.roomBedMap = {};
        this.bedList = [];
        this.choiceBranch = {};
        this.choiceOrg=this.$route.query.choiceOrg;
        console.log(this.choiceOrg);
        //重新加载数据
        this.loadBranch();
    },
    methods: {
        getBranch(i, item) {
            this.keyNum = i;
            this.choiceBranch['id'] = item.id;
            this.choiceBranch['branchName'] = item.branchName;
            if(this.$route.query.preway==='qrcode'){//从扫完信息过来，但是没有branchid
                this.choiceBranch['qrcode']='qrcode';
            }
        },
        sureCall() {
            if (isEmpty(this.choiceBranch)) {
                Toast({ message: '请选择科室', duration: 1000 });
                return false;
            }
            eventBus.$emit('choice', {
                choiceBranch: this.choiceBranch,
            });
            this.$router.go(-1);
        },
        clickHos() {
            this.$router.push('/hospitallist');
        },
        //获取病床列表
        getBedList(roomId) {
            var self = this;
            for (let i = 0; i < self.roomBedMap.length; i++) {
                if (self.roomBedMap[i].roomId == roomId) {
                    return self.roomBedMap[i].bedList;
                }
            }
        },
        //加载病房和病床信息
        loadRoomAndBed(id) {
            var self = this;
            //发送请求
            http.post('/json/GetRoomAndBed', { branchId: id }).then(function(res) {
                //预先设置select节点
                res.body.roomBedMap.forEach(function(roomBed, index) {
                    roomBed.select = false;
                    roomBed.bedList.forEach(function(bed, index) {
                        bed.select = false;
                    });
                });

                self.roomBedMap = res.body.roomBedMap;

                //预先设置select节点
                res.body.roomList.forEach(function(room, index) {
                    room.select = false;
                });
                self.roomList = res.body.roomList;
            });
        },
        //加载科室信息
        loadBranch() {
            var self = this;
            //发送请求
            http.post('/json/GetOrgAndBranch', {
                adcode: window.position.adcode,
                lat: window.position.lat,
                lng: window.position.lng,
                orgId: self.choiceOrg.orgId
            }).then(function(res) {
                self.branchList = res.body.orgBranchMap[0].branchList;
            });
        }
    },
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.dls {
    display: -webkit-box;
    -webkit-overflow-scrolling: touch;
}

.dls dl {
    -webkit-box-flex: 1;
}

.dls dl.isNotEmpty {
    background-color: white;
}

.dls dl.isNotEmpty:nth-child(1),
.dls dl.isNotEmpty:nth-child(2) {
    border-right: 1px solid #ebebeb;
}

.hos-top {
    height: px2rem(100px);
    line-height: px2rem(100px);
    font-size: px2rem(30px);
    background-color: #fff; // border-bottom: 1px solid #ebebeb;
    i:first-child {
        display: inline-block;
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/mko_row1.png') no-repeat;
        width: px2rem(23px);
        height: px2rem(27px);
        background-size: 100% auto;
        vertical-align: middle;
    }

    span {
        margin: 0 px2rem(20px);
    }
    .please-ch {
        color: #2bd6bd;
    }
    .has-ch {
        font-size: px2rem(32px);
    }
    .r-more {
        display: inline-block;
        width: px2rem(14px);
        height: px2rem(26px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/more1.png') no-repeat;
        background-size: auto 100%;
        vertical-align: middle;
    }
}

.branch-list {
    background: #fff;
    ul {
        li {
            position: relative;
            text-align: left;
            padding: 0 pxrem(35px);
            font-size: pxrem(16px);
            line-height: pxrem(44px);
            color: #1d1d26;
            border-bottom: 1px solid #F9F9F9;
            i {
                display: block;
                position: absolute;
                top: 50%;
                right: pxrem(35px);
                transform: translateY(-50%);
                width: pxrem(22px);
                height: pxrem(22px);
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        li.selected {
            color: #2bd6bd;
        }
    }
}

.tits {
    height: px2rem(100px);
    line-height: px2rem(100px);
    background-color: #fff;
    display: -webkit-box;

    div {
        -webkit-box-flex: 1;
        text-align: center;
        color: #ccc;
        font-size: px2rem(30px);
    }
    div.select {
        color: #2bd6bd;
    }
}

.dls {
    border-top: 1px solid #ebebeb;
    font-size: px2rem(28px);
    position: absolute;
    top: px2rem(280px);
    right: 0;
    left: 0;
    bottom: 0;

    dl {
        width: 33.33%;
        height: 100%;
        overflow-y: scroll;
        color: #999;

        dd {
            height: px2rem(100px);
            line-height: px2rem(100px);
        }
    }
}

dd.select {
    color: #2bd6bd;
}
</style>