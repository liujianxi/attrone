/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var orgModule = {
	orgList : [],	//机构数据列表
	provinceList : [],	//搜索省份
	cityList : [],	//搜索城市
	selctChange : {},	//监听下拉框事件
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1 //当前页，默认为1
	},
	orgId : 0
};

//机构编辑面板-数据对象
var orgEditModule = {
	state : 'show',	//面板状态(show-查看;edit-编辑)
}


$(document).ready(function(){
//	$("#goToBranchBtn").click(function(){
//		goBranch('88498');
//	});
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取机构列表数据
		GET_ORG_LISG_URL : 'SAASGetOrgList',
		//获取机构
		GET_ORG : 'SAASGetOrg',
		//删除机构
		DEL_ORG_URL : 'SAASDeleteOrg',
		//保存或新增机构
		SAVE_ORG_URL : 'SAASSaveOrUpdateOrg',
		//省市县级联数据
		GET_CITY_JSON : '../js/app/common/city.json',
		ORG_TYPE : [
			{ name:'其他',id:0},
			{ name:'医院',id:1},
			{ name:'养老院',id:2}
		],
		//机构-详细类型
		ORG_DETAILED_TYPE : [
			{ name:'综合医院',id:8},
			{ name:'妇幼医院',id:1},
			{ name:'肿瘤医院',id:2},
			{ name:'整形美容',id:3},
			{ name:'耳鼻喉科医院',id:4},
			{ name:'眼科医院',id:5},
			{ name:'皮肤病医院',id:6},
			{ name:'中医院',id:7},
			{ name:'专科医院',id:9},
			{ name:'未知',id:0}],
		//机构-级别
		ORG_LEVEL_LIST : [
			{ name:'未知',type:'未知',id:0},
			{ name:'一级丙等',type:'一级',id:1},
			{ name:'一级乙等',type:'一级',id:2},
			{ name:'一级甲等',type:'一级',id:3},
			{ name:'二级丙等',type:'二级',id:4},
			{ name:'二级乙等',type:'二级',id:5},
			{ name:'二级甲等',type:'二级',id:6},
			{ name:'三级丙等',type:'三级',id:7},
			{ name:'三级乙等',type:'三级',id:8},
			{ name:'三级甲等',type:'三级',id:9},
			{ name:'未知',type:'未知',id:0}],
		//机构-经营方式
		OPERATE_MODE_LIST : [
			{ name:'国营',id:1},
			{ name:'合伙制',id:2},
			{ name:'股份制',id:3},
			{ name:'中外合资合作',id:4},
			{ name:'私人',id:5},
			{ name:'集体',id:6},
			{ name:'未知',id:0}]
	};
	
	//将下拉框监听事件绑定到公共对象
	orgModule.selctChange = selctChange;
	//将加载数据的方法绑定到公共对象
	orgModule.loadOrgList = loadOrgList;
	//删除机构数据
	orgModule.delOrgItem = delOrgItem;
	//显示编辑机构面板
	orgModule.showEditOrg = showEditOrg;
	//打开branch页面
	orgModule.goBranch = goBranch;
	 
	//面板状态转换
	orgEditModule.changePanel = changePanel;
	//保存编辑机构
	orgEditModule.editOrgItem = editOrgItem;
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	//默认载入数据
	loadOrgList(true);
	
	/**
	 * 
	 * @param {Object} org_id
	 */
	function goBranch(orgId,orgName){
		parent.tm.addTab('科室', '././templates/branch.html',{orgId:orgId,orgName:orgName});
	}
	
	
	
	/**
	 * 机构编辑
	 */
	function editOrgItem(){
		//收集数据
		var param = {
			id : orgModule.orgId,
			orgName : $("#showOrg_name").val(),	//机构-名称
			orgType : $("input[name='showOrg_type']:checked").val(),	//机构-类型(默认选中医院)
			orgLevel : $("#showOrg_level").val(),	//机构-等级
			province : $("#showOrg_provinceID").val(),	//机构-所在省
			city	 : $("#showOrg_cityID").val(),	//机构-所在城市
			district : $("#showOrg_district").val(),	//机构-所在区县
			building : $("#showOrg_building").val(),	//机构-地址
			address : $("#showOrg_address").val(),	//机构-区域详细地址
			lng : $("#showOrg_lng").val(),	//机构-经度	
			lat : $("#showOrg_lat").val(),	//机构-纬度
			gpsType : "2",	//机构-地图类型(默认是高德地图)
			adcode : $("#showOrg_adcode").val(),	//机构-区域邮政编号
			offcialWebSite : $("#showOrg_offcialWebSite").val(),	//机构-官网地址
			telephone : $("#showOrg_telephone").val(),	//机构-联系方式
			operateMode : $("#showOrg_operateMode").val(), //机构-经营方式
			detailedType : $("#showOrg_detailedType").val()	//机构-详细类型
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_ORG_URL, 
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
				loadOrgList(true);
				showOrgModal.hide();
			}
		});
	}
	
	/**
	 * 机构编辑 - 转换面板状态
	 * @param {Object} state
	 */
	function changePanel(){
		//当前状态是显示(转换成编辑)
		if(orgEditModule.state == 'show'){
			orgEditModule.state = 'edit';
			//修改面板标题
			$("#showOrg_panel .panel-header h4").html('机构编辑');
			//将所有控件的移除禁用属性				
			$("#showOrg_name").removeAttr('disabled');
			$("#showOrg_building").removeAttr('disabled');
			var radios = $("#showOrg_panel :radio");
			$.each($("#showOrg_panel :radio"), function(index,widget) {
				$(widget).removeAttr('disabled');		
			});
			$("#showOrg_detailedType").removeAttr('disabled');
			$("#showOrg_level").removeAttr('disabled');
			$("#showOrg_operateMode").removeAttr('disabled');
			$("#showOrg_address").removeAttr('disabled');
			$("#showOrg_telephone").removeAttr('disabled');
			$("#showOrg_offcialWebSite").removeAttr('disabled');
			
			//按钮状态转换
			$("#panelChangeBtn").html('取消').removeClass('btn-success').addClass('btn-default');
			$("#editOrgBtn").removeClass('hidden');
		}else{
			orgEditModule.state = 'show';
			//修改面板标题
			$("#showOrg_panel .panel-header h4").html('机构查看');
			//将所有控件的添加禁用属性				
			$("#showOrg_name").attr('disabled','disabled');
			$("#showOrg_building").attr('disabled','disabled');
			var radios = $("#showOrg_panel :radio");
			$.each($("#showOrg_panel :radio"), function(index,widget) {
				$(widget).attr('disabled','disabled');	
			});
			$("#showOrg_detailedType").attr('disabled','disabled');
			$("#showOrg_level").attr('disabled','disabled');
			$("#showOrg_operateMode").attr('disabled','disabled');
			$("#showOrg_address").attr('disabled','disabled');
			$("#showOrg_telephone").attr('disabled','disabled');
			$("#showOrg_offcialWebSite").attr('disabled','disabled');
			
			//按钮状态转换
			$("#panelChangeBtn").html('编辑').removeAttr('disabled').removeClass('btn-default').addClass('btn-success');
			$("#editOrgBtn").addClass('hidden');
		}
	}
	
	/**
	 * 机构编辑 - 面板初始化
	 * @param {Object} id
	 */
	function showPanelInit(id){
		//选中的机构数据回显
		loadOrgInfo(id);
		//面板机构数据加载
		panelLoadData('showOrg_panel');
		//每次查看都改变面板状态为查看
		orgEditModule.state = 'edit';
		changePanel();
	}
	
	/**
	 * 机构面板数据载入，根据面板id填充数据
	 * @param {Object} panel_id
	 */
	function panelLoadData(panel_id){
		//加载地图控件
		initMap(panel_id);
		initDetailType(panel_id);
		initOrgLevel(panel_id);
		initOperateMode(panel_id);
	}
	
	/**
	 * 机构数据回显
	 * @param {Object} id
	 */
	function loadOrgInfo(id){
		$("input[name='showOrg_type']").removeAttr('checked');
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_ORG, 
			params : {orgId : id}
		}).then(function(result){
			var orgData = result.body.org;
			if(result.errorCode == 0){
				$("#showOrg_name").val(orgData.orgName);
				$("#showOrg_building").val(orgData.building);
				$("#showOrg_type_"+orgData.orgType).prop('checked','checked').attr('checked','checked');
				$("#showOrg_detailedType option[value='"+orgData.detailedType+"']").attr("selected", true);
				$("#showOrg_level option[value='"+orgData.orgLevel+"']").attr("selected", true);
				$("#showOrg_operateMode option[value='"+orgData.operateMode+"']").attr("selected", true);
				$("#showOrg_address").val(orgData.address);
				$("#showOrg_telephone").val(orgData.telephone);
				$("#showOrg_offcialWebSite").val(orgData.officialWebsite);
				$("#showOrg_lng").val(orgData.lng);
				$("#showOrg_lat").val(orgData.lat);
				$("#showOrg_adcode").val(orgData.countyId);
				$("#showOrg_provinceID").val(orgData.provinceId);
				$("#showOrg_cityID").val(orgData.cityId);
				$("#showOrg_district").val(orgData.district);
			}
		});
	}
	
	/**
	 * 字符串过滤器
	 */
	template.helper('orgFilter',function(id,dataSource){
//		console.info("id:"+id+",code:CONSTANT."+dataSource+"["+id+"].name");
		if(!isNaN(id) && (id>=0)){
			return eval("CONSTANT."+dataSource+"["+id+"].name");
		}else{
			return '未知';
		}
	});
	var showOrgModal = new ModalPanel("#showOrg_panel");
	/**
	 * 查看机构数据
	 * @param {Object} id
	 */
	function showEditOrg(id){
		orgModule.orgId = id;
		showOrgModal.show();
		showPanelInit(id);//初始化面板
	}
	
	/**
	 * 删除机构
	 */
	function delOrgItem(id){
		bootbox.confirm({
			title : "系统提示",
			message : "删除后将不可恢复，请确认？",
			buttons : {
		        cancel: {
		            label: '取消',
		            className: 'btn-danger'
		        },
				confirm: {
		            label: '确定',
		            className: 'btn-success'
		        }
			},
			callback : function(isConfirm){
				if(isConfirm){
					//发送请求
					httpUtilObj.ajax({
						url : CONSTANT.URL_PREFIX + CONSTANT.DEL_ORG_URL, 
						params : {id:id}
					}).then(function(result){
//						console.info('请求成功'+JSON.stringify(result));
						if(result.errorCode == 0){
							$.toast({
							    heading: '系统消息',
							    text: '操作成功！',
							    position: 'top-right',
							    icon: 'success',
							    loaderBg: '#9EC600',
							    stack: false
							});
							loadOrgList(false);
						}
					});
				}
			}
		});
	}
	
	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget(){
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function(result){
			orgModule.provinceList = result;
			initSelct('pro',result);
		});
	}
	
	/**
	 * 初始化下拉框
	 * @param {Object} type
	 * @param {Object} data
	 */
	function initSelct(type,data){
		//通过模板转换HTML
		var selctHtml = template('selctTemplate',{list:data});
		//下拉框类型-名称映射表		
		var proCityDistMap = {
			'pro' : '省份',
			'city': '城市',
			'distrct' : '区/县'
		}
		//默认选项的HTML
		var defaultOption = '<option value="">请选择' + proCityDistMap[type] + '</option>';
		//根据类型，加载对应下拉框
		$("#"+type+"Selct").empty().append(defaultOption + selctHtml);	
	}

	/**
	 * 私有方法：根据城市或者省会的code，获取JSON对象
	 * @param {Object} name
	 * @param {Object} list
	 */
	function getCityJSON(code,list){
		for(var i=0;i<list.length;i++){
			var item = list[i];
			if(item.id == code){
				return item;
			}
		}
	}
	
	/**
	 * 省市区下拉框监听
	 * @param {Object} type
	 * @param {Object} e
	 */
	function selctChange(type,e){
		//选中的省份/城市编码
		var code = $(e).val();
//		console.info('type:'+type+',code:'+code);
		//根据类型处理子级下拉框的加载
		if(type == 'pro' && code != ''){
			var cityList = getCityJSON(code,orgModule.provinceList).city;
			orgModule.cityList = cityList;
			initSelct('city',cityList);
			initSelct('distrct',[]);	//清空区县下拉框
		}else if(type == 'city' && code != ''){
			var selectedCity = getCityJSON(code,orgModule.cityList);
			initSelct('distrct',selectedCity.area);
		}
	}
	
	//获取所有省-市-县级联数据
	function getCityJsonAll(){
		var dtd = $.Deferred();
		var promise = dtd.promise();
		$.getJSON(CONSTANT.GET_CITY_JSON,function(result){
			dtd.resolve(result);
		},function(result){
			dtd.reject(result);
		});
		return promise;
	}
	
	
//	.click(function(){
//		console.info('pagination li click come in');
//	});
	
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage,count){
		//如果记录条目为0则隐藏分页控件
		if(count == 0){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
		
		$("#pagination").pagination(count, {
            'items_per_page'      : orgModule.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(orgModule.paginationParam.pageNo != page_index){
            		//重新赋值当前页数
            		orgModule.paginationParam.pageNo = page_index;
            		//重新载入数据
            		loadOrgList(false);
            	}
            },
            'current_page'  : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadOrgList(isAll){
		//收集查询控件的参数值
		orgModule.searchParam = {
			orgName : $("#findOrgName").val(),
			provinceId : $("#proSelct").val(),
			cityId : $("#citySelct").val(),
			adcode : $("#distrctSelct").val(),
			pageNo : orgModule.paginationParam.pageNo,	//请求页
			pageSize : orgModule.paginationParam.pageSize	//每页记录数
		}
//		console.info('请求参数:' + JSON.stringify(orgModule.searchParam));
		//请求数据
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_LISG_URL,
			params : orgModule.searchParam
		}).then(function(data){
			//刷新列表
			refreshOrgList(data.body);
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * 机构数据加载的请求处理
	 */
	function getOrgListData(){
		
	}
	
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
				$("#"+widgetPrefix+"address").val(e.poi.address);
				$("#"+widgetPrefix+"lng").val(e.poi.location.lng);
				$("#"+widgetPrefix+"lat").val(e.poi.location.lat);
				$("#"+widgetPrefix+"adcode").val(adcode);
				$("#"+widgetPrefix+"provinceID").val(adcode.substring(0,2) + "0000");
				$("#"+widgetPrefix+"cityID").val(adcode.substring(0,4) + "00");
				$("#"+widgetPrefix+"district").val(adcode);
			});
		});
	}
	
	/**
	 * 初始化详细地址
	 */
	function initDetailType(panel_id){
		var widgetID = panel_id.replace('panel','detailedType');
		var detailTypeHtml = template('selctTemplate',{list:CONSTANT.ORG_DETAILED_TYPE});
		$("#"+widgetID).empty().append(detailTypeHtml);
	}
	
	/**
	 * 初始化机构等级下拉框
	 */
	function initOrgLevel(panel_id){
		var widgetID = panel_id.replace('panel','level');
		var orgLevelHtml = template('selctTemplate',{list:CONSTANT.ORG_LEVEL_LIST});
		$("#"+widgetID).empty().append(orgLevelHtml);
	}
	
	/**
	 * 初始化经营方式下拉框
	 */
	function initOperateMode(panel_id){
		var widgetID = panel_id.replace('panel','operateMode');
		var operateModeHtml = template('selctTemplate',{list:CONSTANT.OPERATE_MODE_LIST});
		$("#"+widgetID).empty().append(operateModeHtml);
	}
	
	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshOrgList(data){
		var orgListHtml = template('orgListTemplate',data);
		$("#orgListContent").empty().html(orgListHtml);
	}
	
	var addOrgModal = new ModalPanel("#addOrg_panel");
	
	//显示新增机构面板按钮
	$("#showAddOrgBtn").click(function(){
		addOrgModal.show();	
		$("#addOrgForm input[type=text]").val('');
		panelLoadData('addOrg_panel');
		initMap('addOrg_panel');
		initDetailType('addOrg_panel');
		initOrgLevel('addOrg_panel');
		initOperateMode('addOrg_panel');
	});
	
	//执行新增机构
	$("#addOrgBtn").click(function(){
		//收集数据
		var param = {
			orgName : $("#addOrg_name").val(),	//机构-名称
			orgType : $("input[name='addOrg_type']:checked").val(),	//机构-类型(默认选中医院)
			orgLevel : $("#addOrg_level").val(),	//机构-等级
			province : $("#addOrg_provinceID").val(),	//机构-所在省
			city	 : $("#addOrg_cityID").val(),	//机构-所在城市
			district : $("#addOrg_district").val(),	//机构-所在区县
			building : $("#addOrg_building").val(),	//机构-地址
			address : $("#addOrg_address").val(),	//机构-区域详细地址
			lng : $("#addOrg_lng").val(),	//机构-经度	
			lat : $("#addOrg_lat").val(),	//机构-纬度
			gpsType : "2",	//机构-地图类型(默认是高德地图)
			adcode : $("#addOrg_adcode").val(),	//机构-区域邮政编号
			offcialWebSite : $("#addOrg_offcialWebSite").val(),	//机构-官网地址
			telephone : $("#addOrg_telephone").val(),	//机构-联系方式
			operateMode : $("#addOrg_operateMode").val(), //机构-经营方式
			detailedType : $("#addOrg_detailedType").val()	//机构-详细类型
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_ORG_URL, 
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
				addOrgModal.hide();
				loadOrgList(true);
			}
		});
	});
});
