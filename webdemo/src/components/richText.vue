<template>
    <div class="rich-text">
    	<div class="rich-top">
			<ul>
				<li>
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-wenzhang"></use>
					</svg>
					写文章
				</li>
				<li>
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-fabiao"></use>
					</svg>
					发表
				</li>
			</ul>
    	</div>
        <div class="container">
            <div class="edit-text">
                <div class="ta-editor">
                    <textarea placeholder="请输入标题"></textarea>
                </div>
                <div class="list-item">
                	<div class="item-detail">
                		<!--<input v-model="inputTag" class="tag-input" type="text" placeholder="请选择标签"  @focus="tagFlag=true"/>-->
                		<!--<p>请选择标签</p>-->
                		<ul class="tag-list">
	                    	<li :class="item.select?'selected':''" @click="tagSelect(index)" v-for="(item,index) in tagList" :key='index'>
	                    		{{item.text}}
	                    	</li>
	                    </ul>
                	</div>
                </div>
                <div id="editor"></div>
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
        	tagList:[
	        	{
	        		text:'笔记',
	        		select:false,
	        	},
	        	{
	        		text:'vue.js',
	        		select:false,
	        	}],
        	selectTag:'',
        }
    },
    mounted() {
        var E = require('wangeditor')  // 使用 npm 安装
        // 创建编辑器
        var editor = new E('#editor');
        // 自定义菜单配置
	    editor.customConfig.menus = [
	        'head',  // 标题
		    'bold',  // 粗体
		    'italic',  // 斜体
		    'underline',  // 下划线
		    'strikeThrough',  // 删除线
		    'foreColor',  // 文字颜色
		    'backColor',  // 背景颜色
		    'link',  // 插入链接
		    'list',  // 列表
		    'justify',  // 对齐方式
		    'quote',  // 引用
		    'emoticon',  // 表情
		    'image',  // 插入图片
		    'code',  // 插入代码
		    'undo',  // 撤销
	    ]
//      editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
//      editor.customConfig.uploadImgServer = '/php/upload/uploadImg.php';  // 上传图片到服务器
//      editor.customConfig.uploadFileName = 'myFile';
        // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
//      editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;
        editor.create();
    },
    activated() {
    },
    methods: {
    	tagSelect(index){
    		let self=this;
    		if(self.tagList[index]['select']){
    			self.tagList[index]['select']=false;
    		}else{
    			self.tagList[index]['select']=true;
    		}
    	}
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "../assets/global.scss";
.list-item{
	margin-bottom:20px;
	.item-detail{
		p{
			text-align: left;
			font-size: 20px;
		}
		input{
			font-size: 24px;
			width:100%;
			height:44px;
			line-height:44px;
			border:1px solid #ccc;
			border-radius:4px;
			outline: none;
		}
		ul{
			border-radius: 4px;
			height: 100px;
			background: #fff;
			z-index: 10002;
			/*box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.18);*/
			border: 1px solid #ddd;
			width: 100%;
			display:flex;
			display: -webkit-flex;
			li{
				height: 28px;
				line-height: 28px;
				cursor: pointer;
				margin: 10px 5px;
				padding: 2px 0;
				color: #017E66;
				width:80px;
				background: rgba(1,126,102,0.08);
				border-radius: 6px;
				margin-right: 15px;
			}
			li.selected{
				color: white;
				background: #017E66;
			}
			li:hover{
				color: white;
				background: #017E66;
			}
		}
	}
}
.rich-top{
	height: 58px;
	border-bottom: 1px solid rgba(0, 0, 0, .08);
	margin-bottom: 47px;
	ul{
		width: 660px;
		display: flex;
		display: -webkit-flex;
		margin: 0 auto;
		li{
			flex: 1;
			-webkit-flex:1;
			line-height: 58px;
			font-size: 20px;
			font-weight: bold;
		    text-align: left;
		}
		li:nth-last-child(1){
			text-align: right;
			cursor: pointer;
		}
		li:nth-last-child(1):hover{
			color: #009a61;
		}
	}
}
.edit-text {
    width: 660px;
    margin: 0 auto;
    .ta-editor {
        margin-bottom: 16px;
        background-color: #fff;
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
