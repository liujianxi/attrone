<template>
	<div id="index">
		<div class="main">
			<!-- ---------------------------- 轮播图Start ------------------------------ -->
			<div class="swipe-w" id="home-banner" v-if="banner_flag">
				<mt-swipe :auto="4000">
					<!-- 如果获取banner数据则展示 -->
					<mt-swipe-item v-if="bannerList.length > 0" v-for="item in bannerList" :key="item.imgUrl">
						<!--<a :href="item.url">-->
						<a @click="goLink(item.url)">
							<img :src="item.imgUrl" />
						</a>
					</mt-swipe-item>
					<!-- 如果服务器无数据则装载指定图片 -->
					<!--<mt-swipe-item v-if='bannerList.length == 0' v-for="banner in staticImgList" :key="banner">
						<a href="javascript:void(0)">
							<img :src="banner" />
						</a>
						</mt-swipe-item>-->
				</mt-swipe>
			</div>
			<!------------------------------ 轮播图End -------------------------------->

			<!------------------------------ 长护险Start -------------------------------->
			<div class="content chx-content">
				<div class="content-head">
					<div class="content-img img-zfbtzq"></div>
				</div>
				<div class="c-body">
					<div class="lb" @click="goReqLongProtect()">
						<div>
							<span class="span-t">长护险申请</span>
							<i></i>
							<span class="tan"></span>
						</div>
					</div>
					<div class="rb" @click="goMyLongProtect()">
						<span class="span-t">查看我的申请</span>
						<i></i>
					</div>
				</div>
			</div>
			<!------------------------------ 长护险End -------------------------------->
			<!------------------------------ 住院护理Start ------------------------------>
			<div class="content zyhl-content">
				<div class="content-head">
					<div class="content-img img-zyhl"></div>
				</div>
				<ul class="table-view grid-view content-table zyhl-item">
					<li class="img-yyhls" @click="goMakeOrder()">
						<div class="bg-circle"></div>
						<div class="zyhl-w">
							<div class="zyhl-tit">预约护理员</div>
							<div class="zyhl-font">
								<p>住院护理，自主下单</p>
								<p>立享贴心服务</p>
							</div>
						</div>
					</li>
					<li class="img-ckfjyy" @click="goHospitalList()">
						<div class="bg-circle"></div>
						<div class="zyhl-w">
							<div class="zyhl-tit">查看附近的医院</div>
							<div class="zyhl-font">
								<p>一步定位，附近服务</p>
								<p>覆盖医院</p>
							</div>
						</div>
					</li>
				</ul>

				<div class="content-bottom">
					<a href="javascript:void(0);" @click="goHospitalList()">
						<img class="local" src="https://s.1-1dr.com/static/mobile/img/wechat/location.png" />
						<span class="font" v-if="nearestOrg!=''&&nearestOrg!=null&&nearestOrg.orgName!=undefined&&nearestOrg.orgName!=''">{{nearestOrg.orgName}}</span>
						<span class="font" v-else>附近暂无医院</span>
					</a>
				</div>
			</div>
			<!------------------------------ 住院护理End -------------------------------->
			<!------------------------------ 居家服务Start -------------------------------->
			<div class="content jjfw-content" v-if="entryList.length > 0">
				<div class="content-head">
					<div class="content-img img-jjfw"></div>
				</div>
				<div>
					<ul class="jjfw-item">
						<li v-for="(entry,index) in entryList" :key="index">
							<a @click="newGo(entry.url,entry.iconDesc)">
								<img :src="entry.iconUrl" />
								<div>{{entry.iconDesc}}</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<!------------------------------ 居家服务End -------------------------------->
			<!------------------------------ 健康资讯Start -------------------------------->
			<div class="content last-content" v-if="newsList.length > 0">
				<div class="content-head">
					<div class="content-img img-jkzx"></div>
				</div>
				<div class="jkzx-box">
					<ul class="jkzx-item">
						<li v-for="(news,index) in newsList" :key="index">
							<div class="news-container">
								<a class="container-href" :href="checkUrl(news.url)?news.url:news.url+'-wechat'">
									<img class="news-img" :src="news.imgUrl" />
									<div class="news-title font-ellipsis">{{news.title}}</div>
									<div class="news-descript">{{news.sketch}}</div>
									<div class="news-time">{{news.createTime}}</div>
								</a>
							</div>
						</li>
						<li class="tc"></li>
					</ul>
				</div>

			</div>
			<!------------------------------ 健康资讯End -------------------------------->
			<div id="container"></div>
		</div>
	</div>
</template>

<script>
//引入模块
import { Toast, Swipe, SwipeItem } from "mint-ui";
import { APP_CONSTANT } from "../util/const.js";
import {
  wxGetPosition,
  checkLogin,
  amapGetPosition,
  getCurrentUrl,
} from "../util/common.js";
import eventBus from "../service/eventbus.js";
import http from "../service/api.js";
//定义Vue对象
export default {
  name: "index",
  data() {
    return {
      entryList: [], //服务入口
      bannerList: [], //轮播图
      newsList: [], //健康资讯
      nearestOrg: null, //附件医院
      staticImgList: APP_CONSTANT.BANNER_LIST,
      t1: "",
      t2: "",
      banner_flag:true,
    };
  },
  created() {
    var self = this;
    window.current_page = self.$options.name;
    //获取地理位置后加载首页数据
    self.getPosition().then(function() {
        self.loadHome();
      }).catch(function() {
        self.loadHome();
      });
    //		dplus.track(["_trackEvent", "首页", "浏览", "", 0, ""]);
  },
  activated() {
    var testurl = window.location.href;
    this.reloadNearestOrg();
    eventBus.$on(
      "choiceOrg",
      function(data) {
        this.nearestOrg = data.org;
        window.nearestOrg = data.org;
      }.bind(this)
    );
    this.t1 = new Date().getTime();
  },
  methods: {
    checkUrl(str) {
      //检测是否为newslist系列的健康资讯
      if (str.indexOf("/newsList") == -1) {
        return true;
      } else {
        return false;
      }
    },
    goLink(str) {//正确域名的url跳转
      let params = /[https|http]+/;
      if (params.test(str)) {
        window.location = str;
      }
    },
    loadHome: function() {
      var self = this;
      //拼接参数，发送请求
      http
        .post("/json/GetSettings", {
          lat: window.position.lat,
          lng: window.position.lng,
          adcode: window.position.adcode,
          cityCode: window.position.citycode
        })
        .then(function(res) {
          self.bannerList = res.body.bannerList;
          self.$databanner_flag=res.body.bannerList.length?true:false;
          self.entryList = res.body.indexItems;
          self.newsList = res.body.infoList;
          self.nearestOrg = res.body.nearestOrg;
          window.nearestOrg = self.nearestOrg;
        });
    },
    newGo: function(str, type) {
      // Toast({ message: '敬请期待', duration: 1000 });
      // return false;
      var self = this;
      var st = str.substring(str.indexOf("st="), str.indexOf("&"));
      st = st.split("=")[1];
      str = str.replace("#", "");
      http
        .post("/json/GetPrice", {
          adcode: window.position.adcode,
          st: st
        })
        .then(function(res) {
          res.body.familyPriceList.forEach(function(item, index) {
            item.select = false;
          });
          eventBus.$emit("service", { theUrl: "index" });
          self.homeList = res.body.familyPriceList;
          dplus.track(["_trackEvent", type, "点击", "", 0, ""]);
          self.$router.push({ path: str });
        });
    },
    reloadNearestOrg: function() {
      if (this.$route.params.orgId) {
        this.nearestOrg = {
          orgId: this.$route.params.orgId,
          orgName: this.$route.params.orgName
        };
        window.nearestOrg = this.nearestOrg;
      }
    },
    getPosition: function() {
      var self = this;
      return new Promise(function(resolve, reject) {
        wxGetPosition(window.wx)
          .then(function(res) {
            //微信定位获取经纬度
            console.log(res);
            window.position.lat = res.lat; //经度
            window.position.lng = res.lng; //纬度
            return amapGetPosition(window.amap, [res.lng, res.lat]);
          })
          .then(function(res) {
            //高德地图根据经纬度获取adcode
            window.position.adcode = res.adcode; //区域编号
            window.position.citycode = res.citycode; //城市编码
            resolve();
          })
          .catch(function() {
            console.info('getPosition catch come in!');
            reject();
          });
      });
    },
    goMakeOrder: function() {
      var self = this;
      // Toast({ message: '敬请期待', duration: 1000 });
      //跳转到居家预约页面
      dplus.track(["_trackEvent", "预约护理员", "点击", "", 0, ""]);
      this.$router.push({ path: "/hoslocation" });
      // self.$router.push({ path: '/hospitalphoto' });
    },
    goHospitalList: function() {
      var self = this;
      // Toast({ message: '敬请期待', duration: 1000 });
      dplus.track(["_trackEvent", "附近医院", "点击", "", 0, ""]);
      this.$router.push({ path: "/hospitallist" });
    },
    goReqLongProtect: function() {
      dplus.track(["_trackEvent", "长护险申请页", "点击", "", 0, ""]);
      this.$router.push({ path: "./longprotectintro" });
    },
    goMyLongProtect: function() {
      dplus.track(["_trackEvent", "长护险申请列表", "点击", "", 0, ""]);
      this.$router.push({ path: "./mylongprotect" });
    },
    getHealth: function() {
      this.$router.push({ path: "./newsList01" });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/index.scss";
#home-banner img {
  display: block;
}
</style>