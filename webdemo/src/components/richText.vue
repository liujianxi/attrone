<template>
	<div class="rich-text">
		<div class="rich-top">
			<ul>
				<li>
					<span>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-wenzhang"></use>
						</svg>
						写文章
					</span>
				</li>
				<li>
					<span @click="getHtml()">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-fabiao"></use>
						</svg>
						发表
					</span>
				</li>
			</ul>
		</div>
		<div class="container">
			<div class="edit-text">
				<div class="ta-editor">
					<textarea placeholder="请输入标题" v-model="textTitle"></textarea>
				</div>
				<div class="list-item">
					<div class="item-detail">
						<!--<input v-model="inputTag" class="tag-input" type="text" placeholder="请选择标签"  @focus="tagFlag=true"/>-->
						<!--<p>请选择标签</p>-->
						<ul class="tag-list">
							<li :class="item.select=='1'?'selected':''" @click="tagSelect(index)" v-for="(item,index) in tagList" :key='index'>
								{{item.tagname}}
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
import http from '../service/api.js';
import { Notification, Loading } from 'element-ui';
export default {
	name: 'richtext',
	data() {
		return {
			tagList: [],
			selectTag: '',//选中的tag
			editorContent:'',
			textTitle:'',
		}
	},
	mounted() {
		let self=this;
		let E = require('wangeditor')  // 使用 npm 安装
		// 创建编辑器
		let editor = new E('#editor');
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
			'image',  // 插入图片
			'code',  // 插入代码
			'undo',  // 撤销
		]
		//      editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
		//      editor.customConfig.uploadImgServer = '/php/upload/uploadImg.php';  // 上传图片到服务器
		//      editor.customConfig.uploadFileName = 'myFile';
		// 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
		//      editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;
		//获取内容
		editor.customConfig.onchange = (html) => {
          self.editorContent = html;
       	};
       	// 开启粘贴样式的过滤
    	editor.customConfig.pasteFilterStyle = true;
		editor.create();
		document.querySelector('.w-e-text-container').style.height = '600px';
//		document.querySelector('.w-e-text-container').style.minHeight = '300px';
		document.querySelector('.w-e-text-container').style.border = '0';
		document.querySelector('.w-e-text').style.overflow = 'auto';
//		document.querySelector('.w-e-text').style.height = 'auto';
//		document.querySelector('.w-e-text').style.minHeight = '300px';
	},
	activated() {
		this.getData();
		// this.getScroll();
	},
	methods: {
		getHtml(){
			let self=this;
			let data={
				desc:self.editorContent,
				title:self.textTitle,
				tag:self.selectTag,
			};
			if(self.textTitle==''){
				Notification.error({ message: '请输入标题', position: 'top', duration: 2000 });
				return false;
			}
			if(self.selectTag==''){
				Notification.error({ message: '请选择对应的tag', position: 'top', duration: 2000 });
				return false;
			}
			if(self.editorContent==''){
				Notification.error({ message: '请输入内容', position: 'top', duration: 2000 });
				return false;
			}
			http.post('updateText.php',data);
		},
		getScroll(){
			let count=0;
			window.onscroll=function(){
				let e =e || window.event;
				let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
				if(document.querySelector('.w-e-toolbar').className=='w-e-toolbar'){
					document.querySelector('.w-e-toolbar').setAttribute('id','curr-toolbar');
				}
				let editorTop=document.querySelector('#curr-toolbar').offsetTop;
				let toolHeight=document.querySelector('#curr-toolbar').offsetHeight;
				if(scrolltop>editorTop+toolHeight-1){
					count++;
					if(count==1){
						let toolbar = document.querySelector('#curr-toolbar').cloneNode(true);
						toolbar.setAttribute('id','fix-toolbar');
						toolbar.className='w-e-toolbar fix-e-toolbar';
						toolbar.style.position='fixed';
						toolbar.style.top='0';
						toolbar.style.width='660px';
						toolbar.style.zIndex='10001';
						let list=document.querySelector('#editor');
						list.insertBefore(toolbar,list.childNodes[0]);
					}
				}else{
					count=0;
					let toolbar = document.querySelector('#fix-toolbar');
					if(toolbar!=undefined){
						let list=document.querySelector('#editor');
						list.removeChild(toolbar);
					}
				}
			};
		},
		getData() {
			let self = this;
			http.post('getTagList.php')
			.then((res) => {
				self.tagList = res.body.tagList;
			})
		},
		tagSelect(index) {
			let self = this;
			self.selectTag = '';
			if (self.tagList[index]['select'] == '0') {
				self.tagList[index]['select'] = '1';
			} else {
				self.tagList[index]['select'] = '0';
			}
			let arr = [];
			self.tagList.forEach(function(item, index) {
				if (item.select == '1') {
					arr.push(item.tagname);
				}
			})
			self.selectTag = arr.join(',');
		}
	},
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "../assets/global.scss";
#fix-toolbar{
	position: fixed;
	top:0;
}
.list-item {
	margin-bottom: 20px;
	.item-detail {
		p {
			text-align: left;
			font-size: 20px;
		}
		input {
			font-size: 24px;
			width: 100%;
			height: 44px;
			line-height: 44px;
			border: 1px solid #ccc;
			border-radius: 4px;
			outline: none;
		}
		ul {
			border-radius: 4px;
			height: 100px;
			background: #fff;
			z-index: 10002;
			/*box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.18);*/
			border: 1px solid #ddd;
			width: 100%;
			display: flex;
			display: -webkit-flex;
			li {
				height: 28px;
				line-height: 28px;
				cursor: pointer;
				margin: 10px 5px;
				padding: 4px 10px;
				color: #017E66;
				background: rgba(1, 126, 102, 0.08);
				border-radius: 6px;
				margin-right: 15px;
			}
			li.selected {
				color: white;
				background: #017E66;
			}
			li:hover {
				color: white;
				background: #017E66;
			}
		}
	}
}

.rich-top {
	height: 58px;
	border-bottom: 1px solid rgba(0, 0, 0, .08);
	margin-bottom: 20px;
	ul {
		width: 660px;
		display: flex;
		display: -webkit-flex;
		margin: 0 auto;
		li {
			flex: 1;
			-webkit-flex: 1;
			line-height: 58px;
			font-size: 20px;
			font-weight: bold;
			text-align: left;
		}
		li:nth-last-child(1) {
			text-align: right;
			span {
				cursor: pointer;
			}
		}
		li:nth-last-child(1) span:hover {
			color: #009a61;
		}
	}
}

.edit-text {
	width: 660px;
	margin: 0 auto;
	padding-bottom: 30px;
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

#editor {
	min-height: 300px!important;
}

.w-e-text-container {
	height: 100%!important;
}

textarea::-webkit-input-placeholder {
	color: #acafb3;
}
</style>
