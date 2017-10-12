<template>
    <div class="ta-editor">
        <!--<i class="r-edit"></i>-->
        <textarea :placeholder="place"></textarea>
    </div>
</template>
<script>
export default {
    props: {
        place: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped lang="scss">
.ta-editor {
    background-color: #f7f7f7;
    display: -webkit-box;
    -webkit-box-align: top;
    padding: px2rem(35px) px2rem(50px);
}

.r-edit {
    float: none;
    display: block;
    margin-top: px2rem(8px);
    margin-right: px2rem(15px);
}

textarea {
    display: block;
    -webkit-box-flex: 1;
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    background-color: transparent;
    height: px2rem(460px);
    font-size: px2rem(32px);
    box-sizing: border-box;
}
</style>