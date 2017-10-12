<template>
    <div class="rich-text">
        <div class="container">
            <div class="edit-text">
                <div class="ta-editor">
                    <textarea placeholder="请输入标题"></textarea>
                </div>
                <div id="editor">
                    <p>欢迎使用
                        <b>wangEditor</b> 富文本编辑器
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TaEditor from './TaEditor.vue'
export default {
    components: { TaEditor, },
    name: 'richtext',
    data() {
        return {
        }
    },
    mounted() {
        var E = require('wangeditor')  // 使用 npm 安装
        // 创建编辑器
        var editor = new E('#editor');
        editor.customConfig.uploadImgServer = '/images'  // 上传图片到服务器
        editor.create();
    },
    activated() {

    },
    methods: {
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "../assets/global.scss";
.edit-text {
    width: 600px;
    margin: 0 auto;
    .ta-editor {
        margin: 16px 0;
        background-color: #f7f7f7;
        textarea {
            display: block;
            border: none;
            outline: none;
            resize: none;
            width: 100%;
            background-color: transparent;
            line-height: 1.4;
            min-height: 44px;
            height: 44px;
            font-size: 32px;
            box-sizing: border-box;
            font-family: inherit;
            overflow: hidden;
            font-weight: 700;
        }
    }
}

textarea::-webkit-input-placeholder {
    color: #acafb3;
}
</style>
