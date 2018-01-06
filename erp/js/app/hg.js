/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var hgModule = {
	id: 0,
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
	actionType: '',
	oldnumber: []
};
var hgDataModel = {
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
		//获取机构
		GET_ORG: 'SAASGetOrg',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_HG_LISG_URL: 'SAASGetHGList',
		GET_PRICE_LIST_URL: 'SAASGetPriceList',
		DELETE_PRICE_URL: 'SAASDeletePrice',
		SAVE_UPDATE_PRICE_URL: 'SAASSaveOrUpdatePrice',
		SAVE_UPDATE_HG_URL: 'SAASSaveOrUpdateHGInfo',
		GET_PRICE_URL: 'SAASGetPrice',
		GET_BRANCH_LIST_URL: 'SAASGetBranchList',
		GET_HG_URL: 'SAASGetHGInfo',
		HG_TYPE_MAP: [{ 'name': '请选择员工类型', 'id': '' },
			{ 'name': '护工', 'id': '1' }/*, { 'name': '督导', 'id': '2' },
			{ 'name': '副主任', 'id': '3' }, { 'name': '主任', 'id': '4' },
			{ 'name': '质检', 'id': '5' }, { 'name': '质检主任', 'id': '6' },
			{ 'name': '运营', 'id': '7' }, { 'name': '客服', 'id': '8' },
			{ 'name': '健康经理', 'id': '9' }*/
		],
		SEX_MAP: [{ 'name': '男', 'id': '1' }, { 'name': '女', 'id': '2' }],
		DELETE_HG_URL : 'SAASDelHGInfo'
	}
	//line-height: 30px;
   // height: 30px;
	$("label").addClass('text-right').addClass('m-bot15').css('line-height', '30px').css('height', '30px');
	hgModule.selctChange = selctChange;
	hgModule.loadHGList = loadHGList;
	var orgPriceDealModal = new ModalPanel("#orgPriceDeal_panel");
	var hgInfoModal = new ModalPanel("#showHGInfo_panel");
	var addPriceItemModal = new ModalPanel("#addPriceItem_panel");
	var showPriceItemModal = new ModalPanel("#showPriceItem_panel");
	var addHGBranchRoomItemModal = new ModalPanel("#addHGBranchRoomItem_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	var addHBPanel = new ModalPanel("#addHBRelation_panel");
	var isInit = 0;
	var branchData=[];
	
	hgModule.addHBRelation = function() {
		loadBranchList4Select();
		addHBPanel.show();
	}
	hgModule.ajaxFileUpload = function(prefix, type, fileId) {
		$.ajaxFileUpload({
			url: '/imageupload?type=' + type, //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: fileId, //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			success: function(data, status) {
				if(data.errCode == 0) {
					$("#" + prefix + type + "_img").attr("src", data.imgUrl);
					$("#" + prefix + type).val(data.imageId);
					if(type == 'idcardpic' || type == 'idcardpic2') {
						getIdcardInfo(type);
					}
				} else {
					alert("上传失败");
				}
			},
			error: function(data, status, e) {
				alert(e);
			}
		})
		return false;
	}

	function getIdcardInfo(type) {
		var side = 0;
		var param = {
			imgId: ''
		};
		if(type == 'idcardpic') {
			side = 1;
			param.imgId = $("#showHGInfo_idcardpic").val();
		} else {
			side = 2;
			param.imgId = $("#showHGInfo_idcardpic2").val();
		}
		console.info(side);
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'IDCardRecognize',
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var data = result.body;
				if(side != data.side) {
					$.toast({
						heading: '系统消息',
						text: '身份证图片错误,请重新上传！',
						position: 'top-right',
						icon: 'error',
						loaderBg: '#9EC600',
						stack: false
					});
					$("#showHGInfo_" + type).val('');
					return;
				}
				if(type == 'idcardpic') {
					$("#showHGInfo_idcard").val(data.idcard);
					console.info(data.birthday);
					$("#showHGInfo_birthday").val(data.birthday);
					$("#showHGInfo_fullName").val(data.fullName);
					$("#showHGInfo_nation").val(data.nation);
					var provincePrefix = data.nativeplace.substring(0, 2);
					$("#showHGInfo_proSelct option").each(function(i, e) {
						if($(e).html().indexOf(provincePrefix) >= 0) {
							$(e).prop("selected", true);
						}
					});
					$("input[name=showHGInfo_sex][value='" + data.sex + "']").prop("checked", true);
				} else {
					$("#showHGInfo_idcardExpiredDate").val(data.idcardExpiredDate);
				}
			}
		});
	}

	hgModule.buildBranchList = function() {
		addHGBranchRoomItemModal.show();
		var param = {
			orgId: $("#search_org").val() //banner-名称
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_BRANCH_LIST_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var branchListHtml = template('branchListTemplate', result.body);
				$("#showHGInfo_branchList").empty().html(branchListHtml);
				if(result.body.branchList.length == 0) {
					$("#saveHGBranchAndRoomBTN").prop('disabled', true);
				} else {
					$("#saveHGBranchAndRoomBTN").prop('disabled', false);
				}
			}
		});
	}

	function content2Edit() {
		//		$("#branchListSelectContent").prop('disabled', false);
		$("button[data-id='branchListSelectContent']").prop('disabled', false);
		$("#showHGInfo_adcode").prop('disabled', false);
		$("#showHGInfo_province").prop('disabled', false);
		$("input[name=showHGInfo_sex]").prop("disabled", false);
		$("#showHGInfo_nativeplace").prop('disabled', false);
		$("#showHGInfo_proSelct").prop('disabled', false);
		$("#showHGInfo_hgType").prop('disabled', "disabled");
		$("input[name=showHGInfo_language]").prop('disabled', false);
		$("#showHGInfo_workType").prop('disabled', false);
		$("#showHGInfo_city").prop('disabled', false);
		$("#showHGInfo_county").prop('disabled', false);
		$("#showHGInfo_address").prop('disabled', false);
		$("#showHGInfo_building").prop('disabled', false);
		$("#showHGInfo_careerStartTime").prop('disabled', false);
		$("#showHGInfo_emergencyContact").prop('disabled', false);
		$("#showHGInfo_emergencyContactPhone").prop('disabled', false);
		$("#showHGInfo_fullName").prop('disabled', false);
		$("#showHGInfo_healthCertificate").prop('disabled', false);

		$("#showHGInfo_hgno").prop('disabled', false);
		$("#showHGInfo_idcard").prop('disabled', false);
		$("#showHGInfo_idcardExpiredDate").prop('disabled', false);
		$("#showHGInfo_idcardpic").prop('disabled', false);
		$("#showHGInfo_idcardpic2").prop('disabled', false);
		$("#showHGInfo_idcardpic3").prop('disabled', false);
		$("#showHGInfo_joinTime").prop('disabled', false);
		$("#showHGInfo_nation").prop('disabled', false);
		$("#showHGInfo_nation").prop('disabled', false);
		$("#showHGInfo_nursingCertificate").prop('disabled', false);
		$("#showHGInfo_phone").prop('disabled', false);
		$("#showHGInfo_pic").prop('disabled', false); // pic img src
		$("#showHGInfo_picFile").prop('disabled', false); // pic img src
		$("#showHGInfo_idcardpicFile").prop('disabled', false); // pic img src
		$("#showHGInfo_idcardpic2File").prop('disabled', false); // pic img src
		$("#showHGInfo_idcardpic3File").prop('disabled', false); // pic img src
		$("#showHGInfo_healthCertificateFile").prop('disabled', false); // pic img src
		$("#showHGInfo_nursingCertificateFile").prop('disabled', false); // pic img src
	}

	function content2Show() {
		//		$("#branchListSelectContent").prop('disabled', true);
		$("button[data-id='branchListSelectContent']").prop('disabled', true);
		$("#showHGInfo_adcode").prop('disabled', true);
		$("#showHGInfo_province").prop('disabled', true);
		$("#showHGInfo_city").prop('disabled', true);
		$("#showHGInfo_county").prop('disabled', true);
		$("#showHGInfo_address").prop('disabled', true);
		$("#showHGInfo_building").prop('disabled', true);
		$("input[name=showHGInfo_sex]").prop("disabled", true);
		$("#showHGInfo_nativeplace").prop('disabled', true);
		$("#showHGInfo_proSelct").prop('disabled', true);
		$("#showHGInfo_hgType").prop('disabled', true);
		$("input[name=showHGInfo_language]").prop('disabled', true);
		$("#showHGInfo_workType").prop('disabled', true);

		$("#showHGInfo_careerStartTime").prop('disabled', true);
		$("#showHGInfo_emergencyContact").prop('disabled', true);
		$("#showHGInfo_emergencyContactPhone").prop('disabled', true);
		$("#showHGInfo_fullName").prop('disabled', true);
		$("#showHGInfo_healthCertificate").prop('disabled', true);

		$("#showHGInfo_hgno").prop('disabled', true);
		$("#showHGInfo_idcard").prop('disabled', true);
		$("#showHGInfo_idcardExpiredDate").prop('disabled', true);
		$("#showHGInfo_idcardpic").prop('disabled', true);
		$("#showHGInfo_idcardpic2").prop('disabled', true);
		$("#showHGInfo_idcardpic3").prop('disabled', true);
		$("#showHGInfo_joinTime").prop('disabled', true);
		$("#showHGInfo_nation").prop('disabled', true);
		$("#showHGInfo_nation").prop('disabled', true);
		$("#showHGInfo_nursingCertificate").prop('disabled', true);
		$("#showHGInfo_phone").prop('disabled', true);
		$("#showHGInfo_pic").prop('disabled', true); // pic img src
		$("#showHGInfo_picFile").prop('disabled', true); // pic img src
		$("#showHGInfo_idcardpicFile").prop('disabled', true); // pic img src
		$("#showHGInfo_idcardpic2File").prop('disabled', true); // pic img src
		$("#showHGInfo_idcardpic3File").prop('disabled', true); // pic img src
		$("#showHGInfo_healthCertificateFile").prop('disabled', true); // pic img src
		$("#showHGInfo_nursingCertificateFile").prop('disabled', true); // pic img src
	}

	//这个类里面关于添加修改的方法都是废除的，已经不使用的
	hgModule.saveHGItem = function() {
		var languageArray = new Array();
		$("input[name='showHGInfo_language']:checked").each(function(i, e) {
			languageArray.push($(e).val());
		});
		var param = {
			id: hgModule.id,
			adcode: $("#showHGInfo_adcode").val(),
			branchIds: $("#branchListSelectContent").val(),
			orgId: $("#search_org").val(), //banner-名称
			phone: $("#showHGInfo_phone").val(),
			province: $("#showHGInfo_province").val(),
			city: $("#showHGInfo_city").val(),
			county: $("#showHGInfo_county").val(),
			fullName: $("#showHGInfo_fullName").val(),
			hgno: $("#showHGInfo_hgno").val(),
			sex:$("input[name=showHGInfo_sex]:checked").val(),
			pic: $("#showHGInfo_pic").val(),
			nativeplace: $("#showHGInfo_proSelct").val(),
			address: $("#showHGInfo_address").val(),
			building: $("#showHGInfo_building").val(),
			language: languageArray,
			nation: $("#showHGInfo_nation").val(),
			idcard: $("#showHGInfo_idcard").val(),
			idcardpic: $("#showHGInfo_idcardpic").val(),
			idcardpic2: $("#showHGInfo_idcardpic2").val(),
			idcardpic3: $("#showHGInfo_idcardpic3").val(),
			idcardExpiredDate: $("#showHGInfo_idcardExpiredDate").val(),
			healthCertificate: $("#showHGInfo_healthCertificate").val(),
			nursingCertificate: $("#showHGInfo_nursingCertificate").val(),
			hgType: $("#showHGInfo_hgType").val(),
			joinTime: $("#showHGInfo_joinTime").val(),
			workType: $("#showHGInfo_workType").val(),
			careerStartTime: $("#showHGInfo_careerStartTime").val(),
			emergencyContact: $("#showHGInfo_emergencyContact").val(),
			emergencyContactPhone: $("#showHGInfo_emergencyContactPhone").val(),
		};
		//发送请求
//		alert("sssss");
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_HG_URL,
			params: param
		}).then(function(result) {
//			alert("sss");
			console.log(result);
			if(result.errorCode == 0) {
				console.log(result);
				console.log(result.id);
				$.toast({
					heading: '系统消息',
					text: '操作成功！1',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				if(result.id > 0){
//					alert(result.id);
					result.loadHGList(1,'saveHGItem1');
				}
				else
					result.loadHGList(1,'saveHGItem1');
				hgInfoModal.hide();
			}
		});
	}

	hgModule.changeRoleDiv = function() {
		var selected = $("#showHGInfo_hgType option:selected").val();
		if(selected > 1) {
			$("#showHGInfo_workTypeSel").addClass('hidden');
		} else {
			$("#showHGInfo_workTypeSel").removeClass('hidden');
		}
		if(selected > 4) {
			$("#showHGInfo_workTypeBranchRoomSel").addClass('hidden');
		} else {
			$("#showHGInfo_workTypeBranchRoomSel").removeClass('hidden');
		}
	}

	/**
	 * 初始化地址文本框
	 */
	function initMap(panel_id) {
		var widgetPrefix = panel_id.substring(0, panel_id.indexOf('panel'));
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
				$("#" + widgetPrefix + "address").val(e.poi.district + e.poi.address);
				$("#" + widgetPrefix + "lng").val(e.poi.location.lng);
				$("#" + widgetPrefix + "lat").val(e.poi.location.lat);
				$("#" + widgetPrefix + "adcode").val(adcode);
				$("#" + widgetPrefix + "provinceID").val(adcode.substring(0, 2) + "0000");
				$("#" + widgetPrefix + "cityID").val(adcode.substring(0, 4) + "00");
				$("#" + widgetPrefix + "district").val(adcode);
			});
		});
	}

	hgModule.editHGItem = function() {
		$("#cancelBtn").addClass('hidden');
		$("#editHGBtn").addClass('hidden');
		$("#saveHGBtn").removeClass('hidden');
		$("#cancelHGBtn").removeClass('hidden');
		content2Edit();
		$("button[data-id='branchListSelectContent']").removeClass('disabled');
	}

	hgModule.cancelHGEdit = function() {
		$("#cancelBtn").addClass('hidden');
		$("#saveHGBtn").addClass('hidden');
		$("#editHGBtn").removeClass('hidden');
		$("#cancelHGBtn").addClass('hidden');
		content2Show();
		$("button[data-id='branchListSelectContent']").addClass('disabled');
	}
	$('body').off('click','.hg-del').on('click','.hg-del',function(){
		let page=$(this).attr('pageno');
		let id=$(this).attr('delid');
		gModule.delHGItem(id,page);
	})
	hgModule.delHGItem = function(id,page) {
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
						id: id,
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DELETE_HG_URL,
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
						loadHGList(page,'delHGItem');
					});
				}
			}
		});
	}

	hgModule.showEditHG = function(actionType, id, name) {
		$("#showHGInfo_hgType option").removeAttr("selected");
		$("input[name=showHGInfo_sex][value=2]").prop("checked", false);
		$("input[name=showHGInfo_sex][value=1]").prop("checked", true);
		$("#showHGInfo_workType option").removeAttr("selected");
		$("#showHGInfo_proSelct option").removeAttr("selected");
		$("input[name='showHGInfo_language']").removeAttr("checked");
		hgModule.actionType = actionType;
		if(actionType == 'add') {
			$("#descHFour").html("新增护工");
			hgModule.id = 0;
			hgModule.changeRoleDiv();
			content2Edit();
			$("#showHGInfo_picFile").val('');
			$("#showHGInfo_idcardpicFile").val('');
			$("#showHGInfo_idcardpic2File").val('');
			$("#showHGInfo_idcardpic3File").val('');
			$("#showHGInfo_healthCertificateFile").val('');
			$("#showHGInfo_nursingCertificateFile").val('');
			$("#saveHGBtn").removeClass('hidden');
			$("#cancelBtn").removeClass('hidden');
			$("#editHGBtn").addClass('hidden');
			$("#cancelHGBtn").addClass('hidden');
			hgModule.oldnumber = [];
			$("#branchListSelectContent").empty();
			$("#showHGInfo_adcode").val('');
			$("#showHGInfo_province").val('');
			$("#showHGInfo_city").val('');
			$("#showHGInfo_county").val('');
			$("#showHGInfo_address").val('');
			$("#showHGInfo_building").val('');
			$("#showHGInfo_careerStartTime").val('');
			$("#showHGInfo_emergencyContact").val('');
			$("#showHGInfo_emergencyContactPhone").val('');
			$("#showHGInfo_fullName").val('');
			$("#showHGInfo_healthCertificate").val('');

			$("#showHGInfo_hgno").val('');
			$("#showHGInfo_idcard").val('');
			$("#showHGInfo_idcardExpiredDate").val('');
			$("#showHGInfo_idcardpic").val('');
			$("#showHGInfo_idcardpic2").val('');
			$("#showHGInfo_idcardpic3").val('');
			$("#showHGInfo_joinTime").val('');
			$("#showHGInfo_nation").val('');
			$("#showHGInfo_nation").val('');
			$("#showHGInfo_nursingCertificate").val('');
			$("#showHGInfo_phone").val('');
			$("#showHGInfo_pic").val(''); // pic img src
			$("#showHGInfo_pic_img").attr('src', '');
		}
		if(actionType == 'edit') {
			hgModule.id = id;
			content2Show();
			$("#saveHGBtn").addClass('hidden');
			$("#cancelBtn").addClass('hidden');
			$("#editHGBtn").removeClass('hidden');
			$("#cancelHGBtn").addClass('hidden');
			// 加载护工信息
			var param = {
				id: id
			};
			$("#descHFour").html(name);
			//发送请求
			httpUtilObj.ajax({
				url: CONSTANT.URL_PREFIX + CONSTANT.GET_HG_URL,
				params: param
			}).then(function(result) {
				if(result.errorCode == 0) {
					var data = result.body;
					$("#showHGInfo_adcode").val(data.adcode);
					$("#showHGInfo_province").val(data.province);
					$("#showHGInfo_city").val(data.city);
					$("#showHGInfo_county").val(data.district);
					$("#showHGInfo_address").val(data.address);
					$("#showHGInfo_building").val(data.building);
					hgModule.oldnumber = data.branchIds;
					$("#showHGInfo_careerStartTime").val(data.careerStartTime);
					$("#showHGInfo_emergencyContact").val(data.emergencyContact);
					$("#showHGInfo_emergencyContactPhone").val(data.emergencyContactPhone);
					$("#showHGInfo_fullName").val(data.fullName);
					$("#showHGInfo_healthCertificate").val(data.healthCertificate);

					$("#showHGInfo_hgno").val(data.hgno);
					$("#showHGInfo_idcard").val(data.idcard);
					$("#showHGInfo_idcardExpiredDate").val(data.idcardExpiredDate);
					$("#showHGInfo_idcardpic").val(data.idcardpic);
					$("#showHGInfo_idcardpic2").val(data.idcardpic2);
					$("#showHGInfo_idcardpic3").val(data.idcardpic3);
					$("#showHGInfo_joinTime").val(data.joinTime);
					$("#showHGInfo_nation").val(data.nation);
					$("#showHGInfo_nation").val(data.nation);
					$("#showHGInfo_nursingCertificate").val(data.nursingCertificate);
					$("#showHGInfo_phone").val(data.phone);
					$("#showHGInfo_pic").val(data.pic); // pic img src
					$("#showHGInfo_pic_img").attr('src', data.picUrl);
					$("#showHGInfo_hgType option[value='" + data.hgType + "']").prop("selected", true);
					$("input[name=showHGInfo_sex][value='" + data.sex + "']").prop("checked", true);
					$("#showHGInfo_workType option[value='" + data.workType + "']").prop("selected", true);

					var provincePrefix = data.nativeplace.substring(0, 2);
					$("#showHGInfo_proSelct option").each(function(i, e) {
						if($(e).html().indexOf(provincePrefix) >= 0) {
							$(e).prop("selected", true);
						}
					});

					$("input[name='showHGInfo_language']").each(function(i, e) {
						$(data.language).each(function(ii, ee) {
							if(ee == $(e).val()) {
								$(e).prop("checked", true);
							}
						});
					});
				}
			});
		}
		loadBranchList4Select();
		hgInfoModal.show();
		initMap('showHGInfo_panel');
	}

	template.helper('hgFilter', function(id, dataSource) {
		if(!isNaN(id) && (id >= 0)) {
			return eval("CONSTANT." + dataSource + "[" + (id - 1) + "].name");
		} else {
			return '未知';
		}
	});

	hgModule.typeSelChange = function(prefix) {
		var detailTypeHtml = template('hgTypeSelTemplate', { list: CONSTANT.HG_TYPE_MAP });
		$("#" + prefix + "hgTypeSel").empty().append(detailTypeHtml);
	}
	hgModule.typeSelChange('');
	function getHGListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		hgModule.searchParam = {
			hgType : 10001,
			orgId: $(".org_hos").val()||0,
			branchId: $(".org_branch").val()||0,
			searchGHType: $("#search_hg_type").val(),
			key: $("#findHgName").val(),
			pageNo: pageNo, //请求页
			pageSize: hgModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_HG_LISG_URL,
			params: hgModule.searchParam
		});
	}
	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget() {
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function(result) {
			hgModule.provinceList = result;
			initSelct('pro', result);
			initSelct('showHGInfo_pro', result);
		});
	}

	//初始化时间控件
	$("#showHGInfo_careerStartTime").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

	//初始化时间控件
	$("#showHGInfo_joinTime").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

	/**
	 * 初始化下拉框
	 * @param {Object} type
	 * @param {Object} data
	 */
	function initSelct(type, data) {
		//通过模板转换HTML
		var selctHtml = template('selctTemplate', { list: data });
		//下拉框类型-名称映射表		
		var proCityDistMap = {
			'pro': '省份',
			'city': '城市',
			'distrct': '区/县',
			'showHG_pro': '省份'
		}
		//默认选项的HTML
		var defaultOption = '<option value="">请选择' + proCityDistMap[type] + '</option>';
		//根据类型，加载对应下拉框
		if(type != 'showHG_pro')
			$("#" + type + "Selct").empty().append(defaultOption + selctHtml);
		$("#" + type + "Selct").empty().append(selctHtml);
	}

	/**
	 * 私有方法：根据城市或者省会的code，获取JSON对象
	 * @param {Object} name
	 * @param {Object} list
	 */
	function getCityJSON(code, list) {
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			if(item.id == code) {
				return item;
			}
		}
	}

	/**
	 * 省市区下拉框监听
	 * @param {Object} type
	 * @param {Object} e
	 */
	function selctChange(type, e) {
		//选中的省份/城市编码
		var code = $(e).val();
		//		console.info('type:'+type+',code:'+code);
		//根据类型处理子级下拉框的加载
		if(type == 'pro' && code != '') {
			console.info(hgModule.provinceList);
			var cityList = getCityJSON(code, hgModule.provinceList).city;
			hgModule.cityList = cityList;
			initSelct('city', cityList);
			initSelct('distrct', []); //清空区县下拉框
		} else if(type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, hgModule.cityList);
			initSelct('distrct', selectedCity.area);
		}
		buildOrgList();
	}

	//获取所有省-市-县级联数据
	function getCityJsonAll() {
		var dtd = $.Deferred();
		var promise = dtd.promise();
		$.getJSON(CONSTANT.GET_CITY_JSON, function(result) {
			dtd.resolve(result);
		}, function(result) {
			dtd.reject(result);
		});
		return promise;
	}
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage, count) {
//				console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count <= hgModule.paginationParam.pageSize) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		//		if(!hgModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': hgModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!hgModule.paginationParam.isInit) {
					hgModule.paginationParam.isInit = true;
				} else {
					loadHGList(page_index + 1,'page');
				}
				//当前页数
				hgModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadHGList(pageNo,str) {
		console.log(str);
		//请求数据
		getHGListData(pageNo).then(function(data) {
			//刷新列表
			//初始化分页控件
			if (!hgModule.paginationParam.isInit) {
				initPagination(pageNo, data.body.count);
			}
			if(str=='init'){//init org
				hgType(data.body.rightJson.isAll);//护工类型
				initHos(data.body.rightJson);//机构类别
			}
			refreshBranchList(data.body);
		});
	}
	//机构数据加载
	let branchList='';
	function initHos(data){//加载hos-branch
		let org_data=data.orgList;
		branchList=data.branchMap;
		$('.org_hos').empty();
		if(org_data.length>1){
			$('.org_hos').append(`<option value="0">所有项目点</option>`);
		}
		org_data.forEach((item,index)=>{
			let optionNode='';
			optionNode=`
				<option value="${item.id}">${item.orgName}</option>
			`;
			$('.org_hos').append(optionNode);
		});
		let data_branch=branchList[$('.org_hos option:selected').val()];
		if($('.org_hos option:selected').val()!=0&&data_branch!=undefined&&data_branch.length&&!isEmpty(branchList)){//直接开始选择医院时
			initBranch('init');
		}else{
			loadHGList(1);
		}
	}
	$('.org_hos').on('change',initBranch);
	function initBranch(str){
		let data=branchList[$('.org_hos option:selected').val()];
		$('.org_branch').empty();
		if(data==undefined||!data.length||isEmpty(branchList)){
			$('.org_branch').addClass('org_hide');
			return false;
		}
		$('.org_branch').removeClass('org_hide');
		if(data.length>1){
			$('.org_branch').append(`<option value="0">所有科室</option>`);
		}
		data.forEach((item,index)=>{
			let optionNode='';
			optionNode=`
				<option value="${item.id}">${item.branchName}</option>
			`;
			$('.org_branch').append(optionNode);
		});
		if(str=='init'){
			loadHGList(1);
		}
	}
	function isEmpty(obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	}
	function hgType(str){//护工类型
		//search_hg_type
		let arr=[];
		$("#search_hg_type").empty();
		if(str==1){//1--机构 2--居家
			arr=[{
				name:'请选择护工类型',
				value:-1,
			},,{
				name:'机构多陪',
				value:1,
			},{
				name:'机构专陪',
				value:2,
			},];
		}else if(str==2){//居家
			arr=[{
				name:'居家护工',
				value:0,
			}];
		}else{
			arr=[{
				name:'请选择护工类型',
				value:-1,
			},{
				name:'居家护工',
				value:0,
			},{
				name:'机构多陪',
				value:1,
			},{
				name:'机构专陪',
				value:2,
			},];
		}
		$('#search_hg_type').empty();
		arr.forEach((item,index)=>{
			let optionNode=`
				<option value="${item.value}">${item.name}</option>
			`;
			$("#search_hg_type").append(optionNode);
		});
	}
	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshBranchList(data) {
		var hgListHtml = template('hgListTemplate', data);
		$("#branchListContent").empty().html(hgListHtml);
	}
	loadHGList(1,'init');
	$('#searchBut').off('click').on('click',function(){
		hgModule.paginationParam.isInit=false;
		loadHGList(1,'click');
	})
	$('.js-btn-showAddHGPanel').on('click', function(){
		top.importOnceJS('js-script-hg',"js/app/rp/hg.js");
		top.G_Fun_showAddHGPanel().then(function(data){
			loadHGList(1,'showAddHGPanel');
		});
	})
	
	$('body').off('click', ".hg-showInfo").on('click', ".hg-showInfo", function(){
		let page=$(this).attr('pageno');
		let id=$(this).attr('hgid');
		top.importOnceJS('js-script-hg',"js/app/rp/hg.js");
		top.G_Fun_showHGInfoPanel(id).then(function(data){
			loadHGList(page,'showHgInfo');
		});
	})
});