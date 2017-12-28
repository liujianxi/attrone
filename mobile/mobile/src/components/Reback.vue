<template>
	<div id="reback">
		<s-header :type="preway=='wechat'?'3':'0'" title="意见反馈"></s-header>
		<div class="main">
			<ta-editor place="请在此处填写您的意见" />
		</div>
		<button class="btn_fix_bot" @click="sendText()">提交</button>
	</div>
</template>
<script>
import SHeader from "./SHeader.vue";
import TaEditor from "./TaEditor.vue";
import http from "../service/api.js";
import { Toast, MessageBox, Popup } from "mint-ui";
export default {
  components: { SHeader, TaEditor },
  data() {
    return {
      preway: ""
    };
  },
  created() {
    //		dplus.track(["_trackEvent", '意见反馈页面', "浏览", "", 0, ""]);
  },
  activated() {
    this.preway = this.$route.query.preway;
  },
  methods: {
    sendText() {
      var self = this;
      this.preway = this.$route.query.preway;
      var textNode = document.querySelector("textarea");
      if (textNode.value != "") {
        http
          .post("/json/AddFeedBack", {
            suggestion: textNode.value
          })
          .then(dt => {
            if (dt.errorCode == 0) {
              Toast({ message: "提交成功" });
              self.$router.go(-1);
            } else {
              Toast({ message: "提交失败" });
              self.$router.go(-1);
            }
          });
      } else {
        Toast({ message: "请输入内容后再提交" });
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#reback {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.main {
  background-color: #fff;
  padding-top: px2rem(38px);

  -webkit-box-flex: 1;
  padding-bottom: 0;
}
</style>