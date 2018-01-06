/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var orgTagItemModule = {
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	},
	addType : '',
	orgTagItemId : 0,
	id : 0
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
		GET_BRANCH_LISG_URL: 'SAASGetCompanyOrgList',
		GET_COMPANY_PREPAY_LIST : 'SAASGetCompanyPrepayList',
		UPDATE_COMPANY_PREPAY_LIST : 'SAASSaveOrUpdateCompanyPrepay',
		//获取机构
		GET_ORG: 'SAASGetOrg',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_HGLIST: 'SAASGetHGList',
		GET_PRICE_LIST_URL: 'SAASGetOrgTagItemList',
		DELETE_ITEM_URL: 'SAASDeleteOrgTagItem',
		SAVE_UPDATE_ITEM_URL : 'SAASSaveOrUpdateOrgTagItem',
		GET_ITEM_URL : 'SAASGetOrgTagItem'
	}
	orgTagItemModule.loadOrgTagItemList = loadOrgTagItemList;
	var orgTagItemListModal = new ModalPanel("#showOrgTagItemList_panel");
	var addOrgTagItemModal = new ModalPanel("#addOrgTagItem_panel");
	var showOrgTagItemModal = new ModalPanel("#showOrgTagItem_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	
	orgTagItemModule.toEditItem = function() {
		$("#orgTagItem_tagName").prop('disabled', false);
		$("input[name=colorStrRadio2]").prop('disabled', false);
		$("#EditItemBTN").addClass('hidden');
		$("#updateItemBTN").removeClass('hidden');
		$("#cancelEditBtn").removeClass('hidden');
	}
	
	orgTagItemModule.cancelEditItem = function() {
		$("#orgTagItem_tagName").prop('disabled', "disabled");
		$("input[name=colorStrRadio2]").prop('disabled', "disabled");
		$("#EditItemBTN").removeClass('hidden');
		$("#updateItemBTN").addClass('hidden');
		$("#cancelEditBtn").addClass('hidden');
	}
	
	
	
	orgTagItemModule.updateOrgTagItem = function() {
		var param = {
			id : orgTagItemModule.id,
			tagName : $("#orgTagItem_tagName").val(),
			color: $("input[name=colorStrRadio2]:checked").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_ITEM_URL,
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
				showOrgTagItemModal.hide();
				loadOrgTagItemList(true, 1);
			}
		});
	}
	
	orgTagItemModule.editItem = function (id) {
		orgTagItemModule.cancelEditItem();
		orgTagItemModule.id = id;
		var params = {
			id : id
		};
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ITEM_URL,
			params: params
		}).then(function(result) {
			if(result.errorCode == 0) {
				var data = result.body.tag;
				showOrgTagItemModal.show();
				$("#orgTagItem_tagName").val(data.tagName);
				$("input[name=colorStrRadio2][value="+data.color+"]").prop('checked', true);
			}
		});
		
	}
	orgTagItemModule.saveOrgTagItem = function() {
		var param = {
			tagName : $("#addOrgTagItem_tagName").val(),
			color: $("input[name=add_colorStrRadio]:checked").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_ITEM_URL,
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
				addOrgTagItemModal.hide();
				loadOrgTagItemList(true, 1);
			}
		});
	}
	
	
	orgTagItemModule.deleteItem = function(id) {
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
						id: id
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DELETE_ITEM_URL,
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
						loadOrgTagItemList(true, 1);
					});
				}
			}
		});
	}

	orgTagItemModule.addOrgTagItem = function() {
		$("#addOrgTagItem_tagName").val('');
		color: $("input[name=add_colorStrRadio]:checked").removeAttr('checked');
		addOrgTagItemModal.show();
	}


	function getOrgTagItemListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		orgTagItemModule.searchParam = {
			pageNo: pageNo, //请求页
			pageSize: orgTagItemModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_PRICE_LIST_URL,
			params: orgTagItemModule.searchParam
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
		//		if(!orgTagItemModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': orgTagItemModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!orgTagItemModule.paginationParam.isInit) {
					orgTagItemModule.paginationParam.isInit = true;
				} else {
					loadOrgTagItemList(false, page_index + 1);
				}
				//当前页数
				orgTagItemModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadOrgTagItemList(isAll, pageNo) {
		//请求数据
		getOrgTagItemListData(pageNo).then(function(data) {
			//刷新列表
			refreshOrgTagItemList(data.body);
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
	function refreshOrgTagItemList(data) {
		var orgTagItemListHtml = template('orgTagItemListTemplate', data);
		$("#orgTagItemListContent").empty().html(orgTagItemListHtml);
	}
	loadOrgTagItemList(true, 1);
});