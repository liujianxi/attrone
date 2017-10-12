<template>
    <div class="rich-text">
        <div class="text-container">
            <div class="text-title">
                <input type="text" placeholder="此处输入标题(5-30字)" v-model="mainTitle">
                <p>{{mainTitle.length}}/30</p>
            </div>
            <div class="text-toolbar">
                <div class="toolbar-container">
                    <span title="粗体" @click="getIcon('ct')" class="ct">
                        <svg viewBox="0 0 11 15" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M2 12.025V8h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H2zM2 2h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H2V2zm8.192 1.9c0-2.146-1.744-3.89-3.888-3.89 0 0-3.97-.01-5.137-.01C0 0 0 1.167 0 1.167v11.666C0 14 1.167 14 1.167 14l5.572.01c2.33 0 4.23-1.86 4.23-4.148 0-1.388-.7-2.618-1.77-3.372.614-.688.99-1.596.99-2.59z" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                    <span title="斜体" @click="getIcon('xt')" class="xt">
                        <svg viewBox="0 0 10 14" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M8.75 0h-5.5c-.412 0-.75.336-.75.75 0 .417.336.75.75.75H5l-2 11H1.25c-.412 0-.75.336-.75.75 0 .417.336.75.75.75h5.5c.412 0 .75-.336.75-.75 0-.417-.335-.75-.75-.75H5l2-11h1.75c.412 0 .75-.336.75-.75C9.5.333 9.165 0 8.75 0" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                    <span title="标题" @click="getIcon('bt')" class="bt">
                        <svg viewBox="0 0 10 14" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M0 1.007C0 .45.444 0 1 0c.552 0 1 .45 1 1.007v11.986C2 13.55 1.556 14 1 14c-.552 0-1-.45-1-1.007V1.007zm8 0C8 .45 8.444 0 9 0c.552 0 1 .45 1 1.007v11.986C10 13.55 9.556 14 9 14c-.552 0-1-.45-1-1.007V1.007zM2 6h6v2H2V6z" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                    <span title="引用块" @click="getIcon('yinyong')" class="yinyong">
                        <svg viewBox="0 0 14 11" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M12.975 5.21c-.503-.454-1.096-.668-1.78-.643l-.25.03h-.19c-.315.013-.49-.078-.526-.274-.04-.206.1-.566.43-1.08.34-.527.94-1.126 1.79-1.797.35-.276.5-.568.45-.877-.04-.2-.13-.35-.29-.46-.16-.11-.34-.14-.55-.11-.516.09-1.17.512-1.97 1.27-.947.89-1.647 1.89-2.1 3.006-.45 1.12-.59 2.168-.42 3.148.08.463.25.91.504 1.336.257.43.56.78.916 1.046.748.58 1.558.79 2.433.64.912-.166 1.602-.61 2.07-1.34.19-.3.322-.64.4-1.02.074-.38.08-.748.02-1.098-.13-.74-.45-1.34-.95-1.79zm-7.51 0c-.503-.454-1.096-.668-1.782-.643l-.248.03h-.19c-.316.013-.492-.078-.526-.274-.04-.206.1-.566.43-1.08.34-.527.94-1.126 1.79-1.797.35-.276.5-.568.45-.877-.03-.2-.13-.35-.28-.46C4.95 0 4.77-.03 4.56 0c-.514.09-1.17.516-1.97 1.273C1.65 2.17.95 3.17.492 4.29.04 5.41-.1 6.458.07 7.438c.083.462.252.91.507 1.335.256.43.56.78.916 1.046.748.58 1.558.79 2.433.63.914-.16 1.604-.61 2.07-1.34.19-.3.323-.64.4-1.02.076-.38.082-.75.02-1.1-.13-.74-.447-1.337-.95-1.79z" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                    <span title="代码块" @click="getIcon('code')" class="code">
                        <svg viewBox="0 0 16 14" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M15.718 6.56l-1.03-.954-2.476-2.29c-.356-.36-.978-.36-1.337 0-.367.372-.367.976.008 1.353l2.804 2.564-2.813 2.576c-.366.37-.365.976 0 1.346.18.18.417.28.67.28.252 0 .49-.1.66-.275l1.32-1.22 2.2-2.03c.368-.37.368-.974-.006-1.35zM8.256.99c.097-.548.612-.915 1.16-.818.544.096.907.616.81 1.165L8.144 13.142c-.096.548-.612.915-1.16.818-.543-.095-.906-.616-.81-1.164L8.257.992zM5.123 3.316c-.355-.36-.986-.355-1.33-.006l-.686.634-2.833 2.62c-.367.37-.367.975.007 1.352L1.697 9.22l2.093 1.936c.18.18.415.28.67.28.25 0 .487-.1.666-.28.366-.37.367-.973-.006-1.35l-2.81-2.57L5.124 4.66c.367-.37.367-.973 0-1.344z" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                    <span title="有序列表" @click="getIcon('ul')" class="ul">
                        <svg viewBox="0 0 14 14" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M4 1.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01c-.55 0-.995-.444-.995-1zM.884 2.893h.803V0H.403l-.16.804h.642v2.09zm.898 3.83c.362-.362.468-.57.468-.878 0-.488-.482-.945-1.125-.945S0 5.33 0 5.974h.707c0-.225.13-.43.418-.43.26 0 .4.165.396.367 0 .14-.09.26-.46.57L0 7.37v.48h2.25v-.73h-.86l.392-.396zM4 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01c-.55 0-.995-.444-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01c-.55 0-.995-.444-.995-1zm-1.76.624c0 .14-.024.27-.075.388-.05.12-.123.222-.217.31-.093.086-.205.154-.336.204-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08-.142-.053-.265-.126-.367-.217-.103-.09-.185-.197-.246-.318-.062-.12-.095-.248-.1-.38v-.055h.765v.054c0 .1.033.183.1.25.066.068.155.102.267.102.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.12-.04-.21-.117-.27-.078-.06-.185-.09-.32-.09h-.14v-.52h.144c.117 0 .205-.03.264-.09.058-.06.087-.14.087-.23 0-.087-.03-.157-.087-.21-.06-.05-.136-.08-.233-.08-.107 0-.185.03-.236.08-.05.053-.076.12-.076.2v.053H.09v-.055c.018-.267.116-.48.295-.643.18-.16.437-.24.776-.24.14 0 .27.02.39.062s.23.1.31.174c.09.074.16.16.21.26.05.1.08.208.08.32 0 .258-.116.46-.35.605v.005c.074.03.138.068.194.12.056.05.103.106.14.167.04.06.067.126.087.196.02.07.03.14.03.207z" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                    <span title="无序列表" @click="getIcon('ol')" class="ol">
                        <svg viewBox="0 0 14 13" class="svgIcon" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;">
                            <title></title>
                            <g>
                                <path d="M4 1c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 2 4 1.556 4 1zM1 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 7 4 6.556 4 6zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 12 4 11.556 4 11z" fill-rule="evenodd"></path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="text-content">
                <div class="content-container" contenteditable="true" placeholder="请输入正文" @click="getText()">
                    dsafasfsfaf
                </div>
            </div>
        </div>
        <input type="hidden" v-model="titleContent">
    </div>
</template>
<script>
export default {
    name: 'richText',
    data() {
        return {
            mainTitle: '',
        }
    },
    computed: {
        titleContent: function () {
            let titleArr = [];
            let titleBrr = [];
            if (!this.mainTitle) {
                return false;
            };
            titleArr = this.mainTitle.split('');
            for (let i = 0; i < 30; i++) {
                titleBrr.push(titleArr[i]);
            }
            this.mainTitle = titleBrr.join('');
        }
    },
    activated() {

    },
    methods: {
        getIcon(str) {
            document.querySelector('.content-container').focus();//聚焦文本框
            let classArr = ['ct', 'xt', 'bt', 'yinyong', 'code', 'ul', 'ol'];
            let spanNode = document.querySelectorAll('.toolbar-container span');
            let strNode = document.querySelector('.toolbar-container ' + '.' + str);
            if (strNode.className == str) {
                for (let i = 0; i < spanNode.length; i++) {
                    spanNode[i].className = classArr[i];
                }
                strNode.className = str + ' is-active';
            } else {
                for (let i = 0; i < spanNode.length; i++) {
                    spanNode[i].className = classArr[i];
                }
            }
        },
        getText() {
            var range = document.querySelector('.content-container');
            console.log(range);
            var str = range.createTextRange();
            console.log(str);
            // range.moveStart('character', 4);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.text-container {
    max-width: 900px;
    margin: 0 auto;
    border: 1px solid #e9e9e9;
    .text-title {
        position: relative;
        p {
            position: absolute;
            right: 20px;
            top: 18.5px;
            line-height: 20px;
            font-size: 14px;
            color: #999;
            letter-spacing: 0;
        }
        input {
            padding-right: 55px;
            width: 100%;
            box-sizing: border-box;
            border: 0;
            border-bottom: 1px solid #e9e9e9;
            font-weight: 700;
            font-size: 20px;
            line-height: 58px;
            height: 58px;
            padding-left: 20px;
            display: block;
        }
    }
    .text-toolbar {
        border-bottom: 1px solid #e9e9e9;
        text-align: left;
        .toolbar-container {
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            span {
                min-width: 46px;
                padding-left: 10px;
                cursor: pointer;
                display: block;
                width: 36px;
                height: 36px;
                position: relative;
                .svgIcon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    fill: #aaa;
                    vertical-align: text-bottom;
                }
            }
            .is-active {
                .svgIcon {
                    fill: black;
                }
            }
        }
    }
    .text-content {
        min-height: 600px;
        .content-container {
            min-height: 600px;
            padding: 20px 10px;
            text-align: left;
            outline: none;
        }
    }
}
</style>
