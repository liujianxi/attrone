/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var roomModule = {
	orgList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	selctChange: {}, //监听下拉框事件
	roomId: 0,
	orgId: 0,
	branchId: 0,
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	},
	refer : ''
};

$(document).ready(function() {
	//	$("#goToBranchBtn").click(function(){
	//		goBranch('88498');
	//	});

	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		//获取机构列表数据
		GET_ORG_LISG_URL: 'SAASGetCompanyOrgList',
		GET_ROOM_LISG_URL: 'SAASGetRoomList',
		GET_BRANCH_LISG_URL: 'SAASGetBranchList',
		//获取机构
		GET_ORG: 'SAASGetOrg',
		//删除机构
		DEL_ORG_URL: 'SAASDeleteOrg',
		//保存或新增机构
		SAVE_ORG_URL: 'SAASSaveOrUpdateOrg',
		SAVE_CO_URL: 'SAASSaveOrUpdateCompanyOrg',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_HGLIST: 'SAASGetHGList',
		SAVE_ROOM_URL: 'SAASSaveOrUpdateRoom',
		GET_ROOM_URL: 'SAASGetRoom',
		GET_BED_LIST_URL: 'SAASGetBedList',
		SAVE_BED_URL: 'SAASSaveOrUpdateBed',
		DELETE_BED_URL: 'SAASDeleteBed',
		DEL_BED_URL: 'SAASDeleteRoom'
	};

	roomModule.loadRoomList = loadRoomList;
	var addRoomModal = new ModalPanel("#addRoom_panel");
	var bedListModal = new ModalPanel("#showBedList_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	//默认载入数据
	loadRoomList(true, 1);
	roomModule.delRoom = function(id) {
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
					var param = {
						roomId: id
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DEL_BED_URL,
						params: param
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
							loadRoomList(false, 1);
						}
					});
				}
			}
		});
	}
	roomModule.saveBedItem = function() {
		var param = {
			orgId: roomModule.orgId,
			branchId: roomModule.branchId,
			roomId: roomModule.roomId,
			bedNo: $("#addBed_bedNo").val()
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_BED_URL,
			params: param
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
				loadBedList(roomModule.roomId);
				loadRoomList(false);
				$("#addBed_bedNo").val('');
			}
		});
	}

	roomModule.delBed = function(id) {
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
					var param = {
						bedId: id
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DELETE_BED_URL,
						params: param
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
						}
						loadBedList(roomModule.roomId);
						loadRoomList(false);
					});
				}
			}
		});
	}

	roomModule.showEditRoom = function(id, orgId, branchId, desc) {
		roomModule.roomId = id;
		roomModule.branchId = branchId;
		roomModule.orgId = orgId;
		roomModule.desc = desc;
		bedListModal.show();
		$("#descHFour").html(desc);
		loadBedList(id);
	}

	function loadBedList(id) {
		var param = {
			roomId: id
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_BED_LIST_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var bedListHtml = template('bedListTemplate', result.body);
				$("#bedListContent").empty().append(bedListHtml);
			}
		});
	}

	function getRoomListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		roomModule.searchParam = {
			orgId: roomModule.orgId,
			branchId: roomModule.branchId,
			roomNo: $("#findRoomNo").val(),
			pageNo: pageNo, //请求页
			pageSize: roomModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ROOM_LISG_URL,
			params: roomModule.searchParam
		});
	}
	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget() {
		var initParam = httpUtilObj.getTabParams();
		if(initParam){
			roomModule.branchId = initParam.branchId;
			roomModule.orgId = initParam.orgId;
			roomModule.refer = initParam.refer;
		}
	}

	roomModule.saveRoom = function() {
		var param = {
			orgId: roomModule.orgId,
			branchId: roomModule.branchId,
			roomNo: $("#addRoom_roomNo").val()
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_ROOM_URL,
			params: param
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
				loadRoomList(true, 1);
				addRoomModal.hide();
			}
		});
	}

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
		//		if(!roomModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': roomModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!roomModule.paginationParam.isInit) {
					roomModule.paginationParam.isInit = true;
				} else {
					loadRoomList(false, page_index + 1);
				}
				//当前页数
				roomModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadRoomList(isAll, pageNo) {
		//请求数据
		getRoomListData(pageNo).then(function(data) {
			//刷新列表
			refreshRoomList(data.body);
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
	function refreshRoomList(data) {
		var roomListHtml = template('roomListTemplate', data);
		$("#roomListContent").empty().html(roomListHtml);
	}

	//显示新增机构面板按钮
	$("#showAddRoomBtn").click(function() {
		addRoomModal.show();
		$("#addRoom_roomNo").val('');
		initSearchWidget();
	});

});