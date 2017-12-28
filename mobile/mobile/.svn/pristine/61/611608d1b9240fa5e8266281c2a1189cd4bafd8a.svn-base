<template>
    <div id="add-people" class="page">
        <div id="orderHead">
            <s-header type="0" :title="top_title" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main">
            <div class="b1">
                <div class="pic-w">
                    <ul>
                        <li @click="img.idCardLink_front?getBigImg('idCardLink_front','idPic_front'):uploadIDCard()">
                            <i v-show="!img.idCardLink_front"></i>
                            <span v-show="!img.idCardLink_front">上传身份证正面照</span>
                            <img class="idCard" v-show="!!img.idCardLink_front" :src="img.idCardLink_front"></img>
                        </li>
                        <li @click="img.idCardLink_back?getBigImg('idCardLink_back','idPic_back'):uploadImg('idCardLink_back','idPic_back')">
                            <i v-show="!img.idCardLink_back"></i>
                            <span v-show="!img.idCardLink_back">上传身份证反面照</span>
                            <img class="idCard" v-show="!!img.idCardLink_back" :src="img.idCardLink_back"></img>
                        </li>
                    </ul>
                </div>
                <dl class="dl1">
                    <dd>
                        <span>姓名：　　</span>
                        <input class="input-name" type="text" placeholder="输入姓名" v-model="person.name"">
                    </dd>
                    <dd>
                        <span>身份证号：</span>
                        <!-- @blur="idcheck('id') -->
                        <input class="input-sf" type="text" placeholder="输入身份证" v-model="person.idCardNo"">
                        <i class="del-input" v-show="!!person.idCardNo && person.idCardNo.length>0" @click="clearIdCardInput()"></i>
                    </dd>
                </dl>
            </div>
            <div class="other-tit">填写长护险资质申请资料
                <span @click="info_check=!info_check">
                    <i :class="['r-more-green',info_check?'':'up']"></i>
                </span>
            </div>
            <section :class="['longprotect-info',info_check?'up':'']">
                <div class="b1">
                    <div class="pic-w">
                        <ul>
                            <li @click="img.img_person?getBigImg('img_person','idPic_person'):uploadImg('img_person','idPic_person')">
                                <i v-show="!img.img_person"></i>
                                <span v-show="!img.img_person">上传参保人照片</span>
                                <img class="idCard" v-show="!!img.img_person" :src="img.img_person"></img>
                            </li>
                            <li @click="img.img_medical?getBigImg('img_medical','idPic_medical'):uploadImg('img_medical','idPic_medical')">
                                <i v-show="!img.img_medical"></i>
                                <span v-show="!img.img_medical">上传医保卡信息面</span>
                                <img class="idCard" v-show="!!img.img_medical" :src="img.img_medical"></img>
                            </li>
                        </ul>
                    </div>
                </div>
                <dl class="dl2">
                    <dd @click="showWorkPanel = true">
                        <span>人员类别：</span>
                        <span class="span-sex" v-if="workType==''">请选择人员类别</span>
                        <span class="span-sex black" v-else>{{workType}}</span>
                        <i class="dd-chose">选择</i>
                    </dd>
                    <dd @click="showMedicarePanel = true">
                        <span>医保类型：</span>
                        <span class="span-sex" v-if="!person.medicareType">请选择医保类型</span>
                        <span class="span-sex black" v-else>{{person.medicareType | medicareFilter}}</span>
                        <i class="dd-chose">选择</i>
                    </dd>
                    <dd>
                        <span>医保卡号：</span>
                        <input type="text" placeholder="请输入医保卡号" v-model="person.healthCareNO"">
                    </dd>
                    <dd class="test-item">
                        <span>自评得分</span>
                        <span v-if="score >= 0&&score!=''">
                            <label>{{score}}</label>分</span>
                        <div class="tianchong"></div>
                        <div class="ability">
                            <span class="green-span" @click="goTest()">生活能力测评</span>
                            <i class="r-more-green"></i>
                        </div>
                    </dd>
                </dl>
            </section>
            <div class="other-tit">其他信息（选填）</div>
            <dl class="dl2">
                <dd>
                    <span>就诊卡号：</span>
                    <input type="tel" placeholder="请输入就诊卡号" v-model="person.medicalNO">
                </dd>
                <dd>
                    <div class="height" @click="clickHeight()">
                        <span>身高</span>
                        <span class="bnum">{{person.height}}</span>
                        <span>CM</span>
                    </div>
                    <div class="tianchong"></div>
                    <div class="weight" @click="clickWeight()">
                        <span>体重</span>
                        <span class="bnum">{{person.weight}}</span>
                        <span>KG</span>
                    </div>
                </dd>
                <dd>
                    <span>语言</span>
                    <div class="tianchong"></div>
                    <div class="language">
                        <button type="button" :class="['gbtn', languageList[0]?'select':'']" @click="swichLanguage(0)">普通话</button>
                        <button type="button" :class="['gbtn', languageList[1]?'select':'']" @click="swichLanguage(1)">粤语</button>
                        <button type="button" :class="['gbtn', languageList[2]?'select':'']" @click="swichLanguage(2)">客家</button>
                        <button type="button" :class="['gbtn', languageList[3]?'select':'']" @click="swichLanguage(3)">潮汕</button>
                    </div>
                </dd>
            </dl>
            <div class="taw">
                <div class="ta-editor">
                    <!--<i class="r-edit"></i>-->
                    <textarea placeholder="补充说明" v-model="extraInfo"></textarea>
                </div>
            </div>
            <input type="hidden" v-model="username">
            <input type="hidden" v-model="theidCardNo">
        </div>
        <mt-popup v-model="showMedicarePanel" :closeOnClickModal="true" position="bottom">
            <div class="pp-content">
                <ul>
                    <li @click="setMedicare(1)">广州市职工医保
                        <span class="chx-i">长护险</span>
                    </li>
                    <li @click="setMedicare(2)">城镇医保</li>
                    <li @click="setMedicare(3)">公费医疗</li>
                    <li @click="setMedicare(4)">新农合医保</li>
                    <li @click="setMedicare(5)">其他类型</li>
                </ul>
            </div>
        </mt-popup>
        <mt-popup v-model="showWorkPanel" :closeOnClickModal="true" position="bottom">
            <div class="pp-content">
                <ul>
                    <li v-for="(item,index) in workSlots" @click="getWork(item.values)" :key="index">{{item.values}}</li>
                </ul>
            </div>
        </mt-popup>
        <!-- 提交按钮 -->
        <button class="btn_fix_bot" @click="submit" v-if="btn_flag">确定</button>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { wxChooseImage, wxUploadImage, isEmpty, isEmptyStr } from '../util/common.js'
import { uploadWxImg, recognizeIDCard } from '../service/api.js'
import { Toast, Indicator, Popup } from 'mint-ui';
import eventBus from '../service/eventbus.js';
import http from '../service/api.js'

export default {
    components: {SHeader, Popup },
    data() {
        return {
            btn_flag:true,//android手机键盘出现时不显示提交按钮
            info_check: false,
            workType: '',//人员类别--工作，退休
            workSlots: [{
                values: '在职',
            }, {
                values: '退休',
            }],
            idislaw: false,
            showWorkPanel: false,//是否展示在职选择面板
            showMedicarePanel: false,  //是否展示医保类型选择面板
            fullName: '',	//完整姓名
            idcard: '',	//身份证号码
            age: '',	//年龄
            languageList: [false, false, false, false],	//语言
            languageString: '',
            //当前家庭成员信息
            person: {
                kinsId: '',   //记录id
                name: '',
                age: 0,
                idCardNo: '',
                medicareType: '',//医保类型
                medicalNO: '',
                extraInfo: '',
                height: '0.0',     //默认取0.0
                weight: '0.0',     //默认取0.0
                healthCareNO: '',
                score: -1
            },
            extraInfo: '',
            score: '',
            //医保类型选项数据
            img: {//http://s.1-1dr.com/f/headimg/12/16/314113124221321216.jpg
                idPic_front: '',	//身份证正面图片ID
                idPic_back: '',	//身份证反面图片ID
                idCardLink_front: '',  //身份证正面链接
                idCardLink_back: '',  //身份证反面链接
                idPic_person: '',	//参保人图片ID
                idPic_medical: '',	//医保卡图片ID
                img_person: '',  //参保人图片链接
                img_medical: '',  //医保卡图片链接
            },
            shouldInit: true,  //标明是否应该执行activated进行赋值。比如跳到自评获取分数，返回回来就不用做任何操作,
            preway: '',
            img_flag: false,//去过显示大图img
        }
    },
    computed: {
        username: function() {
            var self = this;
            let pattern = /^[\u4E00-\u9FA5]+$/;
            var textstr = [];
            var arry = [];
            if (self.person.name) {
                arry = self.person.name.split('');
            }
            for (var i = 0; i < 4; i++) {
                textstr.push(arry[i]);
            }
            self.person.name = textstr.join('');
        },
        theidCardNo: function() {
            let arry = [];
            let textstr = [];
            let self = this;
            if (self.person.idCardNo) {
                arry = self.person.idCardNo.split('');
                for (var i = 0; i < 18; i++) {
                    textstr.push(arry[i]);
                }
                self.person.idCardNo = textstr.join('');
            }

        },
        valid: function(needTip) {         //校验提交参数
            return !!this.person.name && !!this.person.medicareType;
        },
        top_title: function() {
            return this.preway == 'family' ? (this.$route.query.kinsid ? '编辑家庭成员' : '添加家庭成员') : (this.$route.query.kinsid ? '编辑参保人' : '添加参保人');
        },
    },
    created() {
        let self = this;             //eventBus只需要初始化一次
        eventBus.$on('sureHw', (data) => {          //获取身高体重回传
            this.person.height = parseFloat(data.newH);
            this.person.weight = parseFloat(data.newW);
        });
        eventBus.$on('sureScore', (data) => {       //获取分数回传
            this.score = data.score;
        });
        //      dplus.track(["_trackEvent", "添加申请人页", "浏览", "", 0, ""]);
    },
    activated() {
        let self = this;
        document.querySelector('body').scrollTop = 0;		//还原滚动条位置
        if (this.$route.query.goback) {
            this.preway = this.$route.query.goback;
            if (this.preway == 'family' && this.shouldInit) {
                self.info_check = true;
            }
        }
        if (self.$route.query.score) {//有分数，从adl评分出过来
            self.score = self.$route.query.score;
        } else {
            self.score = '';
        }
        eventBus.$on('showImg', (res) => {       //图片回传
            console.log(res);
            let data = res.imginfos;
            for (let key in data) {
                self.img[key] = data[key];
            }
            if (data.type == 'idCardLink_front') {
                self.person = data['person'];
            }
            console.log(self.img);
            console.log(self.person);
        });
        if (!this.shouldInit) {//此页面的中间操作时不进行清空
            this.shouldInit = true;
            return;
        }
        this.initData();
        // this.idCardLink = '';//身份证图片初始化
        //只传递kinsid，在addPeople里面再次请求接口拿详情---清空
        var kinSid = this.$route.query.kinsid;
        if (!!kinSid) {
            http.post('/json/GetKinsfolk', {
                kinsId: kinSid
            }).then((dt) => {
                // self.idCardLink = dt.body.idcardpic;
                self.score = dt.body.score;
                self.person['language'] = dt.body['language'];
                self.extraInfo = dt.body['extraInfo'];
                self.setLanguageList();
                for (var key in self.person) {
                    self.person[key] = dt.body[key];
                }
                let data = dt.body;
                self.person['height'] = data['height'] || '0.0';
                self.person['weight'] = data['weight'] || '0.0';
                //图片id
                self.img['idPic_front'] = data['idcardpicId'];
                self.img['idPic_back'] = data['idPic2Id'];
                self.img['idPic_person'] = data['kinsfolkImgId'];
                self.img['idPic_medical'] = data['healthCareImgId'];
                //图片链接
                self.img['idCardLink_front'] = data['idcardpic'];
                self.img['idCardLink_back'] = data['idPic2Url'];
                self.img['img_person'] = data['kinsfolkImgUrl'];
                self.img['img_medical'] = data['healthCareImgUrl'];
                self.workType = data.staffType == '1' ? '在职' : self.workType = data.staffType == '2' ? '退休' : '';//1-在职 2-退休
                // self.img.idCardLink_front = 'http://s.1-1dr.com/f/headimg/12/16/314113124221321216.jpg';
            });
        }

    },
    methods: {
        initData() {
            this.person.name = '';
            this.person.idCardNo = '';
            this.person.kinsId = '';
            this.person.medicareType = '';
            this.person.medicalNO = '';
            this.extraInfo = '';
            this.person.height = '0.0';
            this.person.weight = '0.0';
            this.person.healthCareNO = '';
            this.score = -1;
            this.workType = '';//人员类别
            this.languageList[0] = false;
            this.languageList[1] = false;
            this.languageList[2] = false;
            this.languageList[3] = false;
            this.extraInfo = '';//备注信息
            for (let item in this.img) {
                this.img[item] = '';
            }
        },
        getBigImg(str, id) {
            let self = this;
            self.shouldInit = false;
            self.$router.push({ path: '/showimg', query: { pic: self.img[str], picType: str, imgId: self.img[id], imgIdType: id, person: self.person, } });
        },
        getWork(str) {
            let self = this;
            self.showWorkPanel = false;
            self.workType = str;
        },
        idcheck(str) {
            let pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
            if (!pattern.test(this.person.idCardNo)) {
                this.idislaw = false;
            } else {
                this.idislaw = true;
            }
        },
        clearIdCardInput() {
            this.person.idCardNo = "";
        },
        goTest() {
            var self = this;
            dplus.track(["_trackEvent", '添加申请人自评入口', "点击", "", 0, ""]);
            this.idcheck();
            if (!self.idislaw) {
                Toast({ message: '身份证不合法！' });
            } else {
                this.shouldInit = false;
                this.$router.push({ path: './test', query: { idcard: this.person.idCardNo, comeFrom: 'addmember', kinsid: self.$route.query.kinsid } });
            }
        },
        //点击切换医疗
        setMedicare(type) {
            this.person.medicareType = type;
            this.showMedicarePanel = false;
        },
        //切换语言
        swichLanguage(type) {        //直接赋值数组检测不到
            var newVal = !this.languageList[type];
            this.languageList.splice(type, 1, newVal);
        },
        //回显选中的语言
        setLanguageList() {
            var self = this,
                languageStr = self.person.language;
            if (!!languageStr) {
                var tmp = languageStr.split(',');
                tmp.forEach((item, index) => {
                    this.languageList[item - 1] = true;
                })
            } else {
                this.languageList[0] = false;
                this.languageList[1] = false;
                this.languageList[2] = false;
                this.languageList[3] = false;
            }
        },
        isEmpty(obj) {
            for (let name in obj) {
                return false;
            }
            return true;
        },
        //提交
        submit() {
            var self = this;//!!this.person.name && !!this.person.idCardNo && !!this.person.medicareType;
            dplus.track(["_trackEvent", '添加申请人确定按钮', "点击", "", 0, ""]);
            self.idcheck();
            if (self.img.idPic_front == '') {
                Toast({ message: '请上传身份证正面照' });
                return;
            }
            if (self.img.idPic_back == '') {
                Toast({ message: '请上传身份证反面照' });
                return;
            }
            if (!self.person.name || !self.idislaw) {
                if (!self.person.name) {
                    Toast({ message: '请输入姓名' });
                    return;
                } else if (!self.idislaw) {
                    Toast({ message: '请输入正确的身份证号' });
                    return;
                }
            }
            if (self.preway != 'family') {//从家属过来非必填
                if (self.img.idPic_person == '') {
                    Toast({ message: '请上传参保人照片' });
                    return;
                }
                if (self.img.idPic_medical == '') {
                    Toast({ message: '请上传医保卡信息面' });
                    return;
                }
                if (!self.person.medicareType || !self.workType || !self.person.healthCareNO) {
                    if (!self.workType) {
                        Toast({ message: '请选择人员类别' });
                        return;
                    } else if (!self.person.medicareType) {
                        Toast({ message: '请选择医保类型' });
                        return;
                    } else {
                        Toast({ message: '请填写医保卡号' });
                        return;
                    }
                }
            }
            var languageArr = [];
            var languageString = '';
            for (var i = 0; i < self.languageList.length; i++) {
                if (self.languageList[i]) {
                    languageArr.push(i + 1);
                }
            }
            languageString = languageArr.join(',');
            var params = {
                healthCareNO: self.person.healthCareNO,//医保卡号
                kinsId: self.person.kinsId,
                name: self.person.name,
                medicareType: self.person.medicareType,
                idCardNo: self.person.idCardNo,
                height: self.person.height,
                weight: self.person.weight,
                idPic: self.img.idPic_front,
                idPic2: self.img.idPic_back,
                languageList: languageString,
                medicalNO: self.person.medicalNO,
                extraInfo: self.extraInfo,
                kinsfolkImg: self.img.idPic_person,
                healthCareImg: self.img.idPic_medical,
                staffType: self.workType == '在职' ? 1 : 2,//1-在职 2-退休
                kinsType: self.preway == 'family' ? 0 : 1,//0-亲属 1-参保人
            }
            console.log(params);
            if (!!this.$route.query.kinsid) {          //路径上存在kinsid标识是编辑
                //更新
                http.post('/json/UpdateKinsfolk', params).then(function(res) {
                    if (res.errorCode != 1004) {
                        Toast({ message: '修改成功！' });
                        if (self.$route.query.score) {
                            self.$router.go(-4);
                        } else {
                            self.$router.go(-1);
                        }
                    }

                });

            } else {
                //新增
                http.post('/json/AddKinsfolk', params)
                    .then(function(res) {
                        Toast({ message: '添加成功' });
                        eventBus.$emit('sureAddPeople', { person: res.body });
                        if (self.$route.query.score) {
                            self.$router.go(-4);
                        } else {
                            self.$router.go(-1);
                        }
                    });
            }

        },
        uploadImg(str, id) {
            let self = this;
            try {
                wxChooseImage(window.wx).then(function(res) {
                    var mediaId = res.localIds[0];
                    self.img[str] = mediaId;
                    // console.info('Common.wxChooseImage back!mediaId:' + mediaId);
                    // self.showIdCardImg(mediaId);//不需要
                    Indicator.open({
                        text: '正在上传...',
                        spinnerType: 'fading-circle'
                    });
                    return wxUploadImage(window.wx, mediaId);
                }).then(function(res) {
                    // console.info('Common.wxUploadImage back!' + JSON.stringify(res));
                    var serverId = res.serverId;
                    // console.info('Common.wxUploadImage back!' + JSON.stringify(res));
                    return http.post('/json/GetImageToWx', { mediaId: serverId, type: 'headImg' });
                }).then(function(res) {
                    // console.info('GetImageToWx come in!' + JSON.stringify(res));
                    Indicator.close();
                    if (res.errorCode == 0) {
                        self.img[id] = res.body.imgId;
                        Toast({ message: '图片上传' + res.msg });
                    }
                }).catch(function(res) {
                    Indicator.close();
                    // Toast({ message: res.msg });
                });
            } catch (e) {
                // console.error(e.message);
            }
        },
        uploadIDCard() {
            var self = this;
            dplus.track(["_trackEvent", '添加申请人上传身份证', "点击", "", 0, ""]);
            wxChooseImage(window.wx).then(function(res) {
                //    				 console.info('Common.wxChooseImage back!');
                var mediaId = res.localIds[0];
                self.img.idCardLink_front = mediaId;
                console.log(mediaId);
                //    				 console.info('Common.wxChooseImage back!'+JSON.stringify(res));
                Indicator.open({
                    text: '正在上传身份证...',
                    spinnerType: 'fading-circle'
                });
                return wxUploadImage(window.wx, mediaId);
            }).then(function(res) {
                //    				 console.info('Common.wxUploadImage back!');
                var serverId = res.serverId;
                //    				 console.info('Common.wxUploadImage back!'+JSON.stringify(res));
                //将微信照片id上传给后端
                return http.post('/json/GetImageToWx', { mediaId: serverId, type: 'idcard' })
                // uploadWxImg(self,serverId,'idcard');
            }).then(function(res) {
                //    				 console.info('/json/GetImageToWx back!');
                Indicator.close();
                Indicator.open({
                    text: '正在识别身份证...',
                    spinnerType: 'fading-circle'
                });
                self.img.idPic_front = res.body.imgId;
                var params = {
                    imgId: res.body.imgId,
                    imgUrl: res.body.imgUrl,
                    side: 1
                };
                return http.post('/json/IDCardRecognize', params)
                // return recognizeIDCard(self,imgId);
            }).then(function(res) {
                Indicator.close();
                self.person.sex = res.body.sex;
                self.person.name = res.body.fullName;
                self.person.idCardNo = res.body.idcard;
                self.person.age = res.body.age;
            }).catch(function(res) {
                Indicator.close();
                //  				Toast({message: '身份证上传失败！'+res.msg});
            });
        },
        clickHeight() {
            this.shouldInit = false;
            this.$router.push({ path: '/heiwei', query: { nowh: this.person.height, noww: this.person.weight } });
        },
        clickWeight() {
            this.shouldInit = false;
            this.$router.push({ path: '/heiwei', query: { nowh: this.person.height, noww: this.person.weight } });
        },
        orderGoback() {
            if (this.preway == 'family') {//从makeorder和健康管理处进来
                if (this.$route.query.score) {//测评之后
                    this.$router.go(-4);
                } else {
                    this.$router.go(-1);
                }
            } else {
                this.$router.push({ path: '/longprotectfamily' });
            }

        },
        isAndroid(){
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
            return isAndroid;
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";
i,
em {
    font-style: normal;
}

.main {
    background: #fff;
}

.pic-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 1);
    .img-more {
        color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: pxrem(20px);
        z-index: 101;
    }
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-height: 100%;
    }
}

.longprotect-info {
    transition: all 0.1s linear;
    border-bottom: 1px solid #ebebeb;
}

.otherinfo-title {
    border-top: 1px solid #ebebeb;
}

.longprotect-info.up {
    display: none;
}

.pp-content {
    width: px2rem(750px);
    text-align: center;

    ul {
        li {
            position: relative;
            height: px2rem(108px);
            line-height: px2rem(108px);
            border-bottom: 1px solid #ebebeb;
        }
    }
    .chx-i {
        position: absolute;
        color: #ffb502;
        height: px2rem(30px);
        padding: 0 px2rem(30px);
        line-height: px2rem(30px);
        font-size: px2rem(16px);
        margin-left: px2rem(30px);
        top: 50%;
        margin-top: px2rem(-16px);
        border: 1px solid #ffb502;
        border-radius: px2rem(15px);
    }
}

.mint-toast {
    padding: px2rem(10px) !important;

    .mint-toast-text {
        font-size: px2rem(32px);
    }
}

.green-span {
    color: $theme-color;
}

#add-people {
    font-size: px2rem(32px);
    color: #999;
    .shadow {
        color: #ccc;
    }
    button.disabled {
        background: #999;
    }
}

.taw {
    // padding: px2rem(20px) px2rem(30px);
    background-color: #fff;
    textarea {
        display: block;
        width: 100%;
        height: px2rem(300px);
        font-size: px2rem(32px);
    }
}

input {
    height: 100%;
    font-size: px2rem(32px);
    color: #333;
}

.b1 {
    background-color: #fff;
}

.pic-w {
    ul {
        padding: pxrem(20px) pxrem(15px);
        display: flex;
        display: -webkit-flex;
        li {
            flex: 1;
            -webkit-flex: 1;
            height: pxrem(100px);
            border: pxrem(3px) dashed #2BD6BD;
            border-radius: pxrem(15px);
            i {
                margin-top: pxrem(24px);
                margin-left: pxrem(67px);
                margin-bottom: pxrem(20px);
                display: block;
                width: pxrem(33px);
                height: pxrem(28px);
                background-image: url('https://s.1-1dr.com/static/mobile/img/wechat/camera.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                -webkit-background–size: cover;
                -moz-background–size: cover;
                -o-background–size: cover;
            }
            span {
                font-size: pxrem(16px);
                color: #2BD6BD;
            }
        }
        li:nth-child(1) {
            margin-right: pxrem(10px);
        }
    }
}

dd {
    height: px2rem(100px);
    line-height: px2rem(100px);
    padding: px2rem(5px) px2rem(30px);
    display: -webkit-box;
}

.dl1 {
    text-align: left;
    margin-top: px2rem(42px);
    dd {
        display: -webkit-box;
        border-top: 1px solid #ebebeb;
        -webkit-box-align: center;

        .input-name {
            overflow-x: auto;
            display: block;
            -webkit-box-flex: 1
        }
        .input-sf,
        .input-age {
            overflow-x: auto;
            display: block;
            -webkit-box-flex: 1
        }
    }
}

.dl2 {
    background-color: #fff;
    text-align: left;

    dd {
        border-bottom: 1px solid #ebebeb;
        input {
            height: 98%;
            display: block;
            width: 70%;
            margin-left: pxrem(8px);
        }
        .span-sex {
            font-size: pxrem(16px);
            color: #ccc;
            display: block;
            -webkit-box-flex: 1;
            margin-left: pxrem(8px);
        }
        i {
            font-size: pxrem(16px);
            color: #2BD6BD;
        }
    }
    dd:nth-child(1) {
        border-top: 1px solid #ebebeb;
    }
    dd:nth-last-child(1) {
        border: 0;
    }
    dd.test-item {
        a {
            display: inline-block;
            float: right;
            font-size: px2rem(32px);
            color: $theme-color;
        }

        i.r-more-green {
            display: inline-block;
            width: px2rem(14px);
            height: px2rem(26px);
            background: url('https://s.1-1dr.com/static/mobile/img/wechat/more1.png') no-repeat;
            background-size: 100% auto;
            float: right;
            margin-left: px2rem(20px);
            margin-top: px2rem(35px);
        }

        span label {
            font-size: px2rem(48px);
            color: #ffb502;
        }
    }
}

.other-tit {
    text-align: left;
    font-size: px2rem(32px);
    padding: pxrem(13px) pxrem(16px);
    color: #999;
    background: #F8F8F8;
    position: relative;
    span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: pxrem(16px);
        display: block;
        width: pxrem(40px);
        height: pxrem(40px);
    }
    i {
        display: block;
        margin-top: pxrem(16px);
        margin-left: pxrem(20px);
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        transition: all 0.1s linear;
    }
    i.up {
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
    }
}

.bnum {
    color: #2bd6bd;
    font-size: px2rem(48px);
}

.tianchong {
    -webkit-box-flex: 1
}

.gbtn {
    min-width: px2rem(100px);
    min-height: px2rem(30px);
    line-height: px2rem(30px);
    padding: px2rem(2px) px2rem(15px);
    text-align: center;
    background-color: #fff;
    border: 1px solid #999;
    border-radius: px2rem(20px);
    color: #999;
    font-size: px2rem(24px);
}

.gbtn.select {
    border: 1px solid #2bd6bd;
    background-color: #2bd6bd;
    color: #fff;
    border-color: #2bd6bd;
    border-radius: px2rem(20px);
}

.ability {
    text-align: right;
    button {
        margin-left: px2rem(106px);
    }
    button:first-child {
        margin: 0;
    }
}

.language {
    text-align: right;
    button {
        margin-left: px2rem(25px);
    }
    button:first-child {
        margin: 0;
    }
}

.black {
    color: #333 !important;
}

.btns {
    height: px2rem(100px);
    border-bottom: 1px solid #cccccc;
    line-height: px2rem(100px);
    text-align: center;

    .ctbtn {
        width: px2rem(120px);
        height: px2rem(48px);
        line-height: px2rem(48px);
        font-size: px2rem(28px);
        border: 1px solid #666;
        border-radius: px2rem(6px);
        background-color: #fff;
    }
    .ctbtn:first-child {
        margin-right: 186px;
    }
}

.idCard {
    width: 100%;
    height: 100%;
}

.disabled {
    background-color: #999;
    color: #FFFFFF;
}

.rmore1 {
    float: none;
    margin-top: 0;
}

.del-input {
    display: block;
    width: px2rem(36px);
    height: px2rem(36px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/delete.png') no-repeat;
    background-size: 100% auto;
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

.ta-editor {
    background-color: #f7f7f7;
    display: -webkit-box;
    -webkit-box-align: top;
    padding: px2rem(35px) px2rem(50px);
    textarea {
        display: block;
        -webkit-box-flex: 1;
        border: none;
        outline: none;
        resize: none;
        width: 100%;
        background-color: transparent;
        height: px2rem(460px);
        font-size: px2rem(30px);
        box-sizing: border-box;
    }
}
</style>