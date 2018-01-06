/**
 * Splash管理模块
 */
//Splash管理模块的数据对象
var splashModule = {
	splashList : [],	//Splash数据列表
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1 //当前页，默认为1
	}
};

//Splash编辑面板-数据对象
var splashEditModule = {
}

$(document).ready(function(){
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取Splash列表数据
		GET_SPLASH_LISG_URL : 'SAASGetSplashScreenList',
		//获取Splash
		GET_SPLASH : 'SAASGetSplashScreenById',
		//保存或新增Splash
		SAVE_SPLASH_URL : 'SAASSaveOrUpdateSplashScreen',
		SPLASH_TYPE : [
			{ name:'全部',id:0},
			{ name:'用户app',id:1},
			{ name:'企业app',id:2}
		],
		locale :{
			"format": "YYYY-MM-DD",
			"separator": " 至 ",
			"applyLabel": "确定",
			"cancelLabel": "取消",
			"fromLabel": "开始",
			"toLabel": "结束",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"daysOfWeek": [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			],
			"monthNames": [
				"一月",
				"二月",
				"三月",
				"四月",
				"五月",
				"六月",
				"七月",
				"八月",
				"九月",
				"十月",
				"十一月",
				"十二月"
			],
			"firstDay": 1
		}
	};
	
	//将加载数据的方法绑定到公共对象
	splashModule.loadSplashList = loadSplashList;
	splashModule.showEditSplash = showEditSplash;
	//保存编辑Splash
	splashEditModule.editSplashItem = editSplashItem;
	splashEditModule.closePanel = closePanel;
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//默认载入数据
	loadSplashList(true,1);
	
	
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate();
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
	}
	
	var dt = new Date();
	d2 = dateString(dt);
	dt.setDate(dt.getDate());
	d1 = dateString(dt);
	$("#addSplash_startDate").val(d1);
	$("#addSplash_endDate").val(d2);
	$('#date_range1').daterangepicker({
		"autoApply": true,
		"locale": CONSTANT.locale,
		"startDate": d1,
		"endDate": d2
	}, function(start, end, label) {
		$("#addSplash_startDate").val(start.format('YYYY-MM-DD'));
		$("#addSplash_endDate").val(end.format('YYYY-MM-DD'));
	});
	
	$('#date_range2').daterangepicker({
		"autoApply": true,
		"locale": CONSTANT.locale
	}, function(start, end, label) {
		$("#showSplash_startDate").val(start.format('YYYY-MM-DD'));
		$("#showSplash_endDate").val(end.format('YYYY-MM-DD'));
	});
	
	/**
	 * Splash编辑
	 */
	function editSplashItem(){
		//收集数据
		var param = {
			id : $("#showSplash_id").val(),	//Splash-名称
			name : $("#showSplash_name").val(),	//Splash-名称
			type : $("input[name='showSplash_type']:checked").val(),	//Splash-类型(默认选中医院)
			startDate : $("#showSplash_startDate").val(),	//Splash-等级
			endDate : $("#showSplash_endDate").val(),	//Splash-所在省
			desc : $("#showSplash_desc").val(),	//Splash-所在区县
			url : $("#showSplash_url").val(),	//Splash-地址
			duration : $("#showSplash_duration").val(),	//Splash-地址
			imgUrl : $("#splash_imgId_edit").val(),	//Splash-区域详细地址
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_SPLASH_URL, 
			params : param
		}).then(function(result){
//			console.info('success:'+JSON.stringify(result));
			if(result.errorCode == 0){
				$.toast({
				    heading: '系统消息',
				    text: '操作成功！',
				    position: 'top-right',
				    icon: 'success',
				    loaderBg: '#9EC600',
				    stack: false
				});
				loadSplashList(true,1);
				closePanel();
			}
		});
	}
	
	/**
	 * 查看机构数据
	 * @param {Object} id
	 */
	function showEditSplash(id){
		showSplashModal.show();
		loadSplashInfo(id);
	}
	
	function closePanel(){
		addSplashModal.hide();
		showSplashModal.hide();
	}
	//新增--Upload上传图片
	$('input[name=addImgUpload]').off('click').on('click',function(){
		uploadImg($('input[name=addImgUpload]'),'show').then((data)=>{
			$('#splash_imgUrl_add').attr({
	    		'src':data.imgUrl,
	    		'imgid':data.imageId,
	    	})
		})
	})
	//edit--bannerUpload上传图片
	$('input[name=editImgUpload]').off('click').on('click',function(){
		uploadImg($('input[name=editImgUpload]'),'show').then((data)=>{
			$('#splash_imgUrl_edit').attr({
	    		'src':data.imgUrl,
	    		'imgid':data.imageId,
	    	})
		})
	})
	/**
	 * Splash数据回显
	 * @param {Object} id
	 */
	function loadSplashInfo(id){
		$("input[name=showSplash_type]").removeAttr("checked");
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_SPLASH, 
			params : {id : id}
		}).then(function(result){
			var data = result.body.splash;
			if(result.errorCode == 0){
				$("#showSplash_id").val(data.id);
				$("#showSplash_name").val(data.name);
				$("#showSplash_type_"+data.type).prop('checked','checked');
				$("#date_range2").val(data.startDate + " 至 " + data.endDate);
				$("#showSplash_startDate").val(data.startDate);
				$("#showSplash_endDate").val(data.endDate);
				$("#splash_imgUrl_edit").attr("src", data.imgUrl);
				$("#splash_imgId_edit").val(data.imgId);
				$("#showSplash_url").val(data.url);
				$("#showSplash_desc").val(data.desc);
				$("#showSplash_duration").val(data.duration);
			}
		});
	}
	
	/**
	 * 字符串过滤器
	 */
	template.helper('splashFilter',function(id,dataSource){
//		console.info("id:"+id+",code:CONSTANT."+dataSource+"["+id+"].name");
		if(!isNaN(id) && (id>=0)){
			return eval("CONSTANT."+dataSource+"["+id+"].name");
		}else{
			return '未知';
		}
	});
	var addSplashModal = new ModalPanel("#addSplash_panel");
	var showSplashModal = new ModalPanel("#showSplash_panel");
	
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage,count){
//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count == 0){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		$("#pagination").pagination(count, {
            'items_per_page'      : splashModule.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(splashModule.paginationParam.pageNo != page_index){
            		//重新赋值当前页数
            		splashModule.paginationParam.pageNo = page_index;
            		//重新载入数据
            		loadSplashList(false);
            	}
            },
            'current_page'        : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	/**
	 * Splash数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadSplashList(isAll){
		
		//收集查询控件的参数值
		splashModule.searchParam = {
			type : $("#splashType").val(),
			pageNo : splashModule.paginationParam.pageNo,	//请求页
			pageSize : splashModule.paginationParam.pageSize	//每页记录数
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_SPLASH_LISG_URL,
			params : splashModule.searchParam
		}).then(function(data){
			//刷新列表
			refreshSplashList(data.body);
			
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * 刷新Splash列表
	 * @param {Object} data
	 */
	function refreshSplashList(data){
		var splashListHtml = template('splashListTemplate',data);
		$("#splashListContent").empty().html(splashListHtml);
	}
	
	
	//显示新增Splash面板按钮
	$("#showAddSplashBtn").click(function(){
		$("#file1").val('');
		addSplashModal.show();	
	});
	
	//执行新增Splash
	$("#addSplashBtn").click(function(){
		//收集数据
		var param = {
			name : $("#addSplash_name").val(),
			type : $("input[name='addSplash_type']:checked").val(),
			desc : $("#addSplash_desc").val(),
			url : $("#addSplash_url").val(),
			imgUrl	 : $("#splash_imgUrl_add").attr('imgid'),
			startDate : $("#addSplash_startDate").val(),
			endDate : $("#addSplash_endDate").val(),
			duration : $("#addSplash_duration").val(),
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_SPLASH_URL, 
			params : param
		}).then(function(result){
			if(result.errorCode == 0){
				$.toast({
				    heading: '系统消息',
				    text: '操作成功！',
				    position: 'top-right',
				    icon: 'success',
				    loaderBg: '#9EC600',
				    stack: false
				});
				addSplashModal.hide();
				loadSplashList(true,1);
			}
		});
	});
});
