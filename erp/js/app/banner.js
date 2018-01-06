/**
 * banner管理模块
 */
//banner管理模块的数据对象
var bannerModule = {
	bannerList : [],	//banner数据列表
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1 //当前页，默认为1
	}
};

//banner编辑面板-数据对象
var bannerEditModule = {
}

$(document).ready(function(){
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取banner列表数据
		GET_BANNER_LISG_URL : 'SAASGetBannerList',
		//获取banner
		GET_BANNER : 'SAASGetBannerById',
		//删除banner
		DEL_BANNER_URL : 'SAASDeleteBanner',
		//保存或新增banner
		SAVE_BANNER_URL : 'SAASSaveOrUpdateBanner',
		//获取banner信息
		GET_BANNER_MAX_URL : 'SAASGetBannerSortMax',
		BANNER_TYPE : [
			{ name:'全部',id:0},
			{ name:'微信h5',id:1},
			{ name:'用户app',id:2}
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
	bannerModule.loadBannerList = loadBannerList;
	bannerModule.showEditBanner = showEditBanner;
	bannerModule.delBanner = delBanner;
	bannerModule.ajaxFileUpload = ajaxFileUpload;
	//保存编辑banner
	bannerEditModule.editBannerItem = editBannerItem;
	bannerEditModule.closePanel = closePanel;
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//默认载入数据
	loadBannerList(true,1);
	
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
	$("#addBanner_startDate").val(d1);
	$("#addBanner_endDate").val(d2);
	$('#date_range1').daterangepicker({
		"autoApply": true,
		"locale": CONSTANT.locale,
		"startDate": d1,
		"endDate": d2
	}, function(start, end, label) {
		$("#addBanner_startDate").val(start.format('YYYY-MM-DD'));
		$("#addBanner_endDate").val(end.format('YYYY-MM-DD'));
	});
	
	$('#date_range2').daterangepicker({
		"autoApply": true,
		"locale": CONSTANT.locale
	}, function(start, end, label) {
		$("#showBanner_startDate").val(start.format('YYYY-MM-DD'));
		$("#showBanner_endDate").val(end.format('YYYY-MM-DD'));
	});
	
	
	/**
	 * banner编辑
	 */
	function editBannerItem(){
		//收集数据
		var param = {
			id : $("#showBanner_id").val(),	//banner-名称
			name : $("#showBanner_name").val(),	//banner-名称
			bannerType : $("input[name='showBanner_type']:checked").val(),	//banner-类型(默认选中医院)
			startDate : $("#showBanner_startDate").val(),	//banner-等级
			endDate : $("#showBanner_endDate").val(),	//banner-所在省
			desc : $("#showBanner_desc").val(),	//banner-所在区县
			url : $("#showBanner_url").val(),	//banner-地址
			imgId : $("#banner_imgId_edit").val(),	//banner-区域详细地址
			sort : $("#updateBanner_sort").val()		//banner-排序值
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_BANNER_URL, 
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
				loadBannerList(true,1);
				closePanel();
			}
		});
	}
	
	/**
	 * 查看机构数据
	 * @param {Object} id
	 */
	function showEditBanner(id){
		showBannerModal.show();
		loadBannerInfo(id);
	}
	
	function closePanel(){
		addBannerModal.hide();
		showBannerModal.hide();
	}
	//新增--Upload上传图片
	$('input[name=addImgUpload]').off('click').on('click',function(){
		uploadImg($('input[name=addImgUpload]'),'show').then((data)=>{
			$('#banner_imgUrl_add').attr({
	    		'src':data.imgUrl,
	    		'imgid':data.imageId,
	    	})
		})
	})
	//edit--bannerUpload上传图片
	$('input[name=editImgUpload]').off('click').on('click',function(){
		uploadImg($('input[name=editImgUpload]'),'show').then((data)=>{
			$('#banner_imgUrl_edit').attr({
	    		'src':data.imgUrl,
	    		'imgid':data.imageId,
	    	})
		})
	})
	/**
	 * banner数据回显
	 * @param {Object} id
	 */
	function loadBannerInfo(id){
		$("input[name=showBanner_type]").removeAttr("checked");
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_BANNER, 
			params : {id : id}
		}).then(function(result){
			var data = result.body.banner;
			if(result.errorCode == 0){
				$("#showBanner_id").val(data.id);
				$("#showBanner_name").val(data.name);
				$("#showBanner_type_"+data.bannerType).prop('checked','checked');
				$("#date_range2").val(data.startDate + " 至 " + data.endDate);
				$("#showBanner_startDate").val(data.startDate);
				$("#showBanner_endDate").val(data.endDate);
				$("#banner_imgUrl_edit").attr("src", data.imgUrl);
				$("#banner_imgId_edit").val(data.imgId);
				$("#showBanner_url").val(data.url);
				$("#showBanner_desc").val(data.desc);
				$("#updateBanner_sort").val(data.sort);
				sort_num($("#updateBanner_sort").val(), $("#sort_num_update"),$('input[name=showBanner_type]:checked').val());
			}
		});
	}
	function delBanner(id){
		bootbox.confirm({
			title: "系统提示",
			message: "删除后将不可恢复，请确认？",
			buttons: {
				confirm: {
					label: '确定',
					className: 'btn-success'
				},
				cancel: {
					label: '取消',
					className: 'btn-danger'
				}
			},
			callback: function(isConfirm) {
				if(isConfirm) {
					//发送请求
					httpUtilObj.ajax({
						url : CONSTANT.URL_PREFIX + "SAASDelBanner", 
						params : {id : id}
					}).then(function(result){
						loadBannerList(true,1);
					});
				}
			}
		});
	}
	
	/**
	 * 字符串过滤器
	 */
	template.helper('bannerFilter',function(id,dataSource){
//		console.info("id:"+id+",code:CONSTANT."+dataSource+"["+id+"].name");
		if(!isNaN(id) && (id>=0)){
			return eval("CONSTANT."+dataSource+"["+id+"].name");
		}else{
			return '未知';
		}
	});
	
	var addBannerModal = new ModalPanel("#addBanner_panel");
	var showBannerModal = new ModalPanel("#showBanner_panel");
	
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
            'items_per_page'      : bannerModule.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(bannerModule.paginationParam.pageNo != page_index){
            		//重新赋值当前页数
            		bannerModule.paginationParam.pageNo = page_index;
            		//重新载入数据
            		loadBannerList(false);
            	}
            },
            'current_page'        : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	/**
	 * banner数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadBannerList(isAll){
		
		//收集查询控件的参数值
		bannerModule.searchParam = {
			type : $("#bannerType").val(),
			pageNo : bannerModule.paginationParam.pageNo,	//请求页
			pageSize : bannerModule.paginationParam.pageSize	//每页记录数
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_BANNER_LISG_URL,
			params : bannerModule.searchParam
		}).then(function(data){
			//刷新列表
			refreshBannerList(data.body);
			
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * 刷新banner列表
	 * @param {Object} data
	 */
	function refreshBannerList(data){
		var bannerListHtml = template('bannerListTemplate',data);
		$("#bannerListContent").empty().html(bannerListHtml);
	}
	
	
	//显示新增banner面板按钮
	$("#showAddBannerBtn").click(function(){
		addBannerModal.show();	
		$("#file1").val('');
//		panelLoadData('addBanner_panel');
//		initBannerLevel('addBanner_panel');
		sort_num($("#addBanner_sort").val(), $("#sort_num_add"), $('input[name=addBanner_type]:checked').val());
		
	});
	
	//执行新增banner
	$("#addBannerBtn").click(function(){
		//收集数据
		var param = {
			name : $("#addBanner_name").val(),
			bannerType : $("input[name='addBanner_type']:checked").val(),
			desc : $("#addBanner_desc").val(),
			url : $("#addBanner_url").val(),
			imgId	 : $("#banner_imgUrl_add").attr('imgid'),
			startDate : $("#addBanner_startDate").val(),
			endDate : $("#addBanner_endDate").val(),
			sort : $("#addBanner_sort").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_BANNER_URL, 
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
				addBannerModal.hide();
				loadBannerList(true,1);
			}
		});
	});
	
	//redio 类型
	$('input[name=addBanner_type]').on("click", function () {
		sort_num($("#addBanner_sort").val(), $("#sort_num_add"), $('input[name=addBanner_type]:checked').val());
	});
	
	//redio 类型
	$('input[name=showBanner_type]').on("click", function () {
		sort_num($("#updateBanner_sort").val(), $("#sort_num_update"),$('input[name=showBanner_type]:checked').val());
	});
	
	function sort_num(sort,sortNum,type) {
		var param = {};
		param["type"] = type;
		param["sort"] = sort;
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_BANNER_MAX_URL, 
			params : param
		}).then(function(result){
			if(result.errorCode == 0){
				sortNum.html(result.body.sort);
			}
		});
	}
});
