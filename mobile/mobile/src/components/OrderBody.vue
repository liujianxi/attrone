<template>
<div class="sr">
    <img :src="img">
    <div>
        <p>服务地点：{{addr}}</p>
        <p>当前服务：{{service}}</p>
        <p>被服务人：{{people}}</p>
        <p>服务人员：{{waiter}}</p>                        
    </div>
</div>
</template>
<script>
export default{
    props: {
        img: {
            type: String,
            default: "https://s.1-1dr.com/static/mobile/img/orderimg.png"
        },
        addr: {
            type: String,
            default: ''
        },
        service: {
            type: String,
            default: ''
        },
        people: {
            type: String,
            default: ''
        },
        waiter: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.sr{
    display:-webkit-box;
    -webkit-box-align: center;
    font-size: px2rem(28px);
    color:#333;
    padding: px2rem(10px) px2rem(50px);

    img{
        display:block;
        width: px2rem(147px);
        height: px2rem(159px);
        margin-right: px2rem(34px)            
    }
    div{
        -webkit-box-flex:1;
        p{
            margin-bottom: px2rem(5px);
        }
        p:last-child{
            margin-bottom:0;
        }
    }         
}
</style>