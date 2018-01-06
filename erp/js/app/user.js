/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var userModule = {
	id: 0,
	orgList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	orgId: 0,
	branchId: 0,
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	}
};
var userDataModel = {
	provinceList: []
};
$(document).ready(function() {

	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		//获取机构列表数据
		GET_ORG_LISG_URL: 'SAASGetCompanyOrgList',
		GET_BRANCH_LISG_URL: 'SAASGetBranchList',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_USER_LIST_URL: 'SAASGetUserList',
		SAVE_USER_URL : 'SAASSaveOrUpdateUser'
	}

	userModule.loadUserList = loadUserList;
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	function buildOrgList(type) {
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_LISG_URL,
			params: {}
		}).then(function(result) {
			if(result.errorCode == 0) {
				var orgListHtml = template('orgSelctTemplate', result.body);
				if(result.body.orgList.length == 0) {
					$("#search_org").html('<option>请选择项目点</option>');
				}
				$("#search_org").empty().append(orgListHtml);
				if($("#search_org").val() && $("#search_org").val() != '') {
					if(!userModule.paginationParam.isInit) {
						userModule.loadUserList(true, 1);
						userModule.paginationParam.isInit = true;
					}
				}
			}
		});
	}
	buildOrgList();
	
	var addUser_panel = new ModalPanel("#addUser_panel");
	$(".js-btn-addUser").click(function() {
		$("#addUser_phone").val('');
		$("input[name=addUser_sex][value=2]").prop('checked', false);
		$("input[name=addUser_sex][value=1]").prop('checked', true);
		$("#addUser_name").val('');
		$("#addUser_address").val('');
		$("#addUser_remark").val('');
		$("#addUser_adcode").val('');
		$("#addUser_building").val('');
		$("#addUser_lng").val('');
		$("#addUser_lat").val('');
		addUser_panel.show();
	});
	
	function getUserListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		userModule.searchParam = {
			orgId: $("#search_org").val(),
			keyword: $("#findUserName").val(),
			phone: $("#findUserPhone").val(),
			regBeginTime: $("#regBeginTime").val(),
			regEndTime: $("#regEndTime").val(),
			pageNo: pageNo, //请求页
			pageSize: userModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_USER_LIST_URL,
			params: userModule.searchParam
		});
	}
	
	$(".saveUserButton").click(function () {
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_USER_URL,
			params: {
				phone : $("#addUser_phone").val(),
				sex : $("input[name=addUser_sex]:checked").val(),
				name : $("#addUser_name").val(),
				address : $("#addUser_address").val(),
				remark : $("#addUser_remark").val(),
				adcode : $("#addUser_adcode").val(),
				building : $("#addUser_building").val(),
				lng : $("#addUser_lng").val(),
				lat : $("#addUser_lat").val()
			}
		}).then(function(result) {
				if(result.errorCode == 0) {
					$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				addUser_panel.hide();
				loadUserList(true, 1);
			}
		});	
	});
	
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate();
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
	}
	var dt = new Date();
	dt.setDate(dt.getDate()+30);
	d2 = dateString(dt);
	dt.setDate(dt.getDate()-120);
	d1 = dateString(dt);
	$("#regBeginTime").val(d1);
	$("#regEndTime").val(d2);
	$('input[name="daterange"]').daterangepicker({
		"autoApply": true,
		"locale": {
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
		},
		"startDate": d1,
		"endDate": d2
	}, function(start, end, label) {
		$("#regBeginTime").val(start.format('YYYY-MM-DD'));
		$("#regEndTime").val(end.format('YYYY-MM-DD'));
	});


	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage, count) {
		//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count == 0) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		//		if(!userModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': userModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!userModule.paginationParam.isInit) {
					userModule.paginationParam.isInit = true;
				} else {
					loadUserList(false, page_index + 1);
				}
				//当前页数
				userModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadUserList(isAll, pageNo) {
		//请求数据
		getUserListData(pageNo).then(function(data) {
			//刷新列表
			refreshBranchList(data.body);
			//初始化分页控件
			if(isAll) {
				initPagination(0, data.body.count);
			}
		});
	}

	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshBranchList(data) {
		var userListHtml = template('userListTemplate', data);
		$("#userListContent").empty().html(userListHtml);
	}
	loadUserList(true, 1);
	
	$('body').on('click', '.js-addTab-link', function(){
        top.tm.addTab($(this).attr('title'), $(this).attr('link'));
    });	
    /**
	 * 初始化地址文本框
	 */
	function initMap(panel_id){
		var widgetPrefix = panel_id.substring(0,panel_id.indexOf('panel')) ;
		AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
			var autoOptions = {
				city: "全国", //城市，默认全国
				input: widgetPrefix + 'building' //使用联想输入的input的id
			};
			autocomplete = new AMap.Autocomplete(autoOptions);
			var placeSearch = new AMap.PlaceSearch({
				city: '广州'
			});
			AMap.event.addListener(autocomplete, "select", function(e) {
				placeSearch.search(e.poi.name);
				//自动填充详细地址
				var adcode = e.poi.adcode;
				$("#"+widgetPrefix+"address").val(e.poi.district + e.poi.address);
				$("#"+widgetPrefix+"building").val(e.poi.address);
				$("#"+widgetPrefix+"lng").val(e.poi.location.lng);
				$("#"+widgetPrefix+"lat").val(e.poi.location.lat);
				$("#"+widgetPrefix+"adcode").val(adcode);
				$("#"+widgetPrefix+"provinceID").val(adcode.substring(0,2) + "0000");
				$("#"+widgetPrefix+"cityID").val(adcode.substring(0,4) + "00");
				$("#"+widgetPrefix+"district").val(adcode);
			});
		});
	}
	initMap('addUser_panel');
});