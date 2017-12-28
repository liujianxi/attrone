<template>
    <div id="about">
        <s-header :type="preway=='wechat'?'3':'0'" title="关于我们"></s-header>
        <div class="main">
            <!--<i></i>-->
            <div class="bts-w">
                <p class="p1">广州易简医信息科技有限公司</p>
                <p class="p2">kefu@1-1dr.com</p>

                <!--<div class="btdiv">关于我们</div>-->
                <div class="btdiv">去评分</div>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'

export default {
    components: { SHeader },
    data() {
        return {
            preway: '',
        }
    },
    activated() {
        this.preway = this.$route.query.preway;
    }
}
</script>
<style scoped lang="scss">
@import '../assets/css/global.scss';

#about {
    display: flex;
    flex-direction: column;
}

.main {
    background: url('https://s.1-1dr.com/static/mobile/img/login-bg.png') no-repeat left top;
    background-size: 100% auto;
    font-size: px2rem(32px);
    padding-bottom: 0;
    flex: 1;
}

i {
    display: block;
    width: px2rem(250px);
    height: px2rem(198px);
    background-size: 100% auto;
    background-position: center px2rem(165px);
    padding: 22.9% 0 9.2% 0;
    margin: 0 auto;
}

.p1 {
    margin-top: px2rem(390px);
    margin-bottom: px2rem(34px);
    color: #999;
}

.p2 {
    color: #999;
    margin-bottom: px2rem(10px);
}

.btdiv {
    font-size: px2rem(32px);
    height: px2rem(96px);
    line-height: px2rem(96px);
    color: #666;
    border-top: 1px solid #E9E9E9;
}

.btdiv:last-child {
    border-bottom: 1px solid #E9E9E9;
}

.bts-w {
    position: absolute;
    width: 100%;
    bottom: px2rem(120px);
}
</style>