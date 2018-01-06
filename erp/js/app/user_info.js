$(document).ready(function () {

	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		GET_USER_INFO_ALL: 'SAASGetUserInfoAll',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		keyword: ''
	};

	$.fn.datepicker.defaultslanguage = 'cn';
	$.fn.editable.defaults.inputclass = 'form-control';
	$.fn.editable.defaults.send = 'always';
	$.fn.editable.defaults.ajaxOptions = {
		type: "POST",
		dataType: 'json'
	};
	$.fn.editable.defaults.success = processResponse;
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	$('#order-mask-bg').css('display','none');
	$('#order-mask').css('display','none');
	//用于消除loading
	var displayFun = function (value, sourceData) {
		if (sourceData == undefined)
			return;
		var elem = $.grep(sourceData, function (o) {
			return o.value == value;
		});
		if (elem.length) {
			$(this).text(elem[0].text);
		} else {
			$(this).empty();
		}
	};
	function initUserInfoEdit(data) {
		$.fn.editable.defaults.url = '/adminjson/SAASUpdateUserByField';
		//		$.fn.editable.defaults.type = 'text';
		//		console.log("=======edit data:" + JSON.stringify(data));
		//用户名

		$('#name').editable({
			emptytext: '点此编辑姓名',
			value: data.name,
			pk: data.id,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			validate: function (value) {
				if ($.trim(value) == '') {
					return '请填写用户名';
				}
			}
		});
		$('#name').html(G_stringModule.getStr(data.name, '未填写'));

		$('#phone').editable({
			emptytext: '手机号',
			value: data.phone,
			pk: data.id,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			validate: function (value) {
				if (!G_checkInputModule.checkPhone(value)) {
					return '请填写正确的手机号';
				}
			}
		});
		$('#phone').html(G_stringModule.getStr(data.phone, '未填写'));

		$('#sex').editable({
			prepend: "男",
			pk: data.id,
			source: [
			{
				value: 2,
				text: '女'
			}
			],
			params: function (params) {
				params['value'] = params['value']==''?'1':'2';
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			display: displayFun
		});
		$('#sex').html(G_stringModule.getStr(data.sex,'请选择'));
		//生日
		$.fn.datepicker.dates['zh'] = {  
            days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
            daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
            daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
            months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
            monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
            meridiem:    ["上午", "下午"],  
            //suffix:      ["st", "nd", "rd", "th"],  
            today:       "今天"  
       };
		$('#birthday').editable({
			pk: data.id,
			emptytext: '',
			value: data.birthday,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			datepicker: {
				language: 'zh',
			}
		});
		$('#birthday').html(G_stringModule.getStr(data.birthday, '未填写'));
		
		$('#qqNo').editable({
			emptytext: '',
			value: data.qqNo,
			pk: data.id,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			validate: function (value) { }
		});
		$('#qqNo').html(G_stringModule.getStr(data.qqNo, '未填写'));

		$('#wxNo').editable({
			emptytext: '',
			value: data.wxNo,
			pk: data.id,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			validate: function (value) { }
		});
		$('#wxNo').html(G_stringModule.getStr(data.wxNo, '未填写'));

		$('#email').editable({
			emptytext: '',
			value: data.email,
			pk: data.id,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			validate: function (value) { }
		});
		$('#email').html(G_stringModule.getStr(data.email, '未填写'));

		$('#remark').editable({
			emptytext: '未填写',
			value: data.remark,
			pk: data.id,
			params: function (params) {
				params['userId'] = params.pk;
				return JSON.stringify(params);
			},
			validate: function (value) {
				$('#remark').html(G_stringModule.getStr(value, '未填写'));
			}
		});
		$('#remark').html(G_stringModule.getStr(data.remark, '未填写'));
	}

	function initKinsfolkInfoEdit(data) {
		if (data && data.kinsfolkList) {
			for (var i = 0; i < data.kinsfolkList.length; i++) {

				var item = data.kinsfolkList[i];
				var kinsfolkId = item.kinsfolkId;

				var postUrl = '/adminjson/SAASUpdateKinsfolkByField';
				var tabId = 'kinsfolk_tab_' + kinsfolkId;
				//用户名
				$('#' + tabId + " .js-kinsfolkName").editable('destroy').editable({
					emptytext: '请填写亲属名',
					url: postUrl,
					pk: kinsfolkId,
					value: item.fullName,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					validate: function (value) {
						if ($.trim(value) == '') {
							return '请填写亲属名';
						}
					}
				}).html(G_stringModule.getStr(item.fullName, '未填写'));

				$('#' + tabId + " .js-medicalNO").editable('destroy').editable({
					url: postUrl,
					value: item.medicalNO,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.medicalNO, '未填写'));

				$('#' + tabId + " .js-kinsfolkSex").editable('destroy').editable({
					value: item.sex,
					url: postUrl,
					prepend: "请选择性别",
					pk: kinsfolkId,
					source: [{
						value: 1,
						text: '男'
					},
					{
						value: 2,
						text: '女'
					}
					],
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					display: displayFun
				});
				$.fn.datepicker.dates['zh'] = {  
		            days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
		            daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
		            daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
		            months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
		            monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
		            meridiem:    ["上午", "下午"],  
		            //suffix:      ["st", "nd", "rd", "th"],  
		            today:       "今天"  
		       	};
				//生日
				$('#' + tabId + " .js-kinsfolkBirth").editable('destroy').editable({
					pk: kinsfolkId,
					url: postUrl,
					emptytext: '未填写',
					value: item.birthday,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					datepicker: {
						language: 'zh',
					},
				}).html(G_stringModule.getStr(item.birthday, '未填写'));

				$('#' + tabId + " .js-kinsfolkRelation").editable('destroy').editable({
					url: postUrl,
					emptytext: '未填写',
					value: item.relation,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.relation, '未填写'));

				$('#' + tabId + " .js-kinsfolkContacts").editable('destroy').editable({
					url: postUrl,
					value: item.contacts,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.contacts, '未填写'));
				$('#' + tabId + " .js-kinsfolkContactsRelation").editable('destroy').editable({
					url: postUrl,
					value: item.contactsRelation,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.contactsRelation, '未填写'));

				$('#' + tabId + " .js-kinsfolkContactsPhone").editable('destroy').editable({
					url: postUrl,
					value: item.contactsPhone,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					validate: function (value) {
						if (!G_checkInputModule.checkPhone(value)) {
							return "请填写正确的手机号!";
						}
					}
				}).html(G_stringModule.getStr(item.contactsPhone, '未填写'));

				$('#' + tabId + " .js-kinsfolkContacts2").editable('destroy').editable({
					url: postUrl,
					value: item.contacts2,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.contacts2, '未填写'));

				$('#' + tabId + " .js-kinsfolkContacts2Relation").editable('destroy').editable({
					url: postUrl,
					value: item.contacts2Relation,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.contacts2Relation, '未填写'));

				$('#' + tabId + " .js-kinsfolkContacts2Phone").editable('destroy').editable({
					url: postUrl,
					value: item.contacts2Phone,
					pk: kinsfolkId,
					placement:'bottom',
					pk:'1',
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					validate: function (value) {
						if (!G_checkInputModule.checkPhone(value)) {
							return "请填写正确的手机号!";
						}
					}
				}).html(G_stringModule.getStr(item.contacts2Phone, '未填写'));

				$('#' + tabId + " .js-kinsfolkHeight").editable('destroy').editable({
					url: postUrl,
					value: item.height,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					validate: function (value) { }
				}).html(G_stringModule.getStr(item.height, '未填写'));
				$('#' + tabId + " .js-kinsfolkWeight").editable('destroy').editable({
					url: postUrl,
					value: item.weight,
					pk: kinsfolkId,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					validate: function (value) { }
				}).html(G_stringModule.getStr(item.weight, '未填写'));

				$('#' + tabId + " .js-kinsfolkRemark").editable('destroy').editable({
					inputclass: 'form-control input-medium',
					emptytext: '未填写',
					url: postUrl,
					pk: kinsfolkId,
					value: item.remark,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.remark, '未填写'));
				
				$('#' + tabId + " .js-healthCareNO").editable('destroy').editable({
					emptytext: '未填写',
					url: postUrl,
					pk: kinsfolkId,
					value: item.healthCareNO,
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					}
				}).html(G_stringModule.getStr(item.healthCareNO, '未填写'));
				
				$('#' + tabId + " .js-medicareType").editable('destroy').editable({
					value: item.medicareType,
					url: postUrl,
					prepend: "请选择医保类型",
					pk: kinsfolkId,
					//医保类型 1-广州市职工医保 2-城镇医保 3-工费医疗 4-新农合医保 5-其它类型
					source: [{
						value: 1,
						text: '广州市职工医保'
					},
					{
						value: 2,
						text: '城镇医保'
					},
					{
						value: 3,
						text: '公费医疗'
					},
					{
						value: 4,
						text: '新农合医保'
					},
					{
						value: 5,
						text: '其它类型'
					}
					],
					params: function (params) {
						params['kinsfolkId'] = params.pk;
						return JSON.stringify(params);
					},
					display: displayFun
				});
				var ltsStatusDom = $("#" + tabId + ' .js-kinsfolkLongTermInsursanceStatus');
				if (item.insureFlag) {
					ltsStatusDom.html("可申请").click(function () {
						console.log(user_addrList);
						let kinsId=$(this).attr('kinsfolkid');
						if(user_addrList.length){
							LongTermInsursance_canApply(kinsId);
						}else{
							Toast.error("请先添加地址！");	
						}
					});
				} else {
					$("#" + tabId + ' .js-kinsfolkLongTermInsursanceStatusTD').html(item.insureDesc);
				}
			}
		}
	}
	var insursance_canApply_modal_html = '<div class="modal fade" id="js-modal-select_insursance_canApply" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
	'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
	'		<div class="modal-content">'+
	'			<div class="modal-header">'+
	'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
	'        		<h4 class="modal-title" >请选择地址</h4>'+
	'      		</div>'+
	'      		<div class="modal-body">'+
	'      			<div id="js-insure-addr"><table class="table table-striped"></table>'+
	'      			</div>'+
	'      		</div>'+
	'      		<div class="modal-footer">'+
	'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
	'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>'+
	'      		</div>'+
	'    	</div>'+
	'  	</div>'+
	'</div>'; 
	//可申请时的确定地址
	let curr_kinsfolk_tab='';
	function LongTermInsursance_canApply(kinsId){
		if(!$('#js-modal-select_insursance_canApply').length){
			$("body").append(insursance_canApply_modal_html);
		}
		$('#js-modal-select_insursance_canApply').modal('show');
		//user_addrList
		let tableNode=$('body').find('#js-modal-select_insursance_canApply #js-insure-addr table');
		tableNode.empty();
		let thNode=$('<thead><tr><th>#</th><th style="white-space:nowrap; ">省份</th><th style="white-space:nowrap; ">城市</th><th style="white-space:nowrap; ">区</th><th style="white-space:nowrap; ">地址</th><th style="white-space:nowrap; ">门号</th></tr></thead>');
		tableNode.append(thNode);
		tableNode.append($('<tbody></tbody>'));
		for(let i=0;i<user_addrList.length;i++){
			if(user_addrList[i].province==undefined){
				user_addrList[i].province='';
			}
			if(user_addrList[i].city==undefined){
				user_addrList[i].city='';
			}
			if(user_addrList[i].district==undefined){
				user_addrList[i].district='';
			}
			if(user_addrList[i].addrDetail==undefined){
				user_addrList[i].addrDetail='';
			}
			if(user_addrList[i].building==undefined){
				user_addrList[i].building='';
			}
			let listNode=$('<tr style="cursor:pointer;" userid="'+user_addrList[i].userId+'" addrid="'+user_addrList[i].addrId+'"><td style="white-space:nowrap; "><input type="radio" name="insursance_canApply" value="1"></td><td style="white-space:nowrap; ">'+user_addrList[i].province+'</td><td style="white-space:nowrap; ">'+user_addrList[i].city+'</td><td style="white-space:nowrap; ">'+user_addrList[i].district+'</td><td style="white-space:nowrap; ">'+user_addrList[i].building+'</td><td>'+user_addrList[i].addrDetail+'</td></tr>');
			tableNode.find('tbody').append(listNode);
		}
		
		tableNode.find('tbody tr:nth-child(1) input').prop('checked','checked');
		tableNode.find('tbody tr').off('click').on('click',function(){
			$(this).find('input[type=radio]').prop('checked','checked');
		});
		$('#js-modal-select_insursance_canApply .js-btn-ok').off('click').on('click',function(){
			let a_userId,a_addrId;
			for(let i=0;i<$('#js-modal-select_insursance_canApply table tbody tr').length;i++){
				if($('#js-modal-select_insursance_canApply table tbody tr').eq(i).find('input[type=radio]').prop('checked')){
					a_userId=$('#js-modal-select_insursance_canApply table tbody tr').eq(i).attr('userid');
					a_addrId=$('#js-modal-select_insursance_canApply table tbody tr').eq(i).attr('addrid');
				}
			}
			let kinsfolk_tab=$('.js-kinsfolk-nav-item.active').eq(0).find('a').attr('href');
			let httpUtilObj = new HttpUtil();
			let data = {
				kinsId: kinsId,
				userId:a_userId,
				addrId:a_addrId,
			}
			curr_kinsfolk_tab=$('.js-kinsfolk-nav-item.active').eq(0).find('a').attr('href');
			console.log(data);
			httpUtilObj.ajax({
				url: '/adminjson/SAASAddInsure',
				params: data
			}).then((res)=>{
				showUserInfo();
				$('#js-modal-select_insursance_canApply').modal('hide');
				Toast.success("申请成功！");
			},(res)=>{
				$('#js-modal-select_insursance_canApply').modal('hide');
			});
		})
	}
	function update_insursance_canApply_status(kinsfolk_tab){
		console.log(kinsfolk_tab);
		for(let i=0;i<$('.js-kinsfolk-info-container').length;i++){
			$('.js-kinsfolk-info-container').eq(i).removeClass('active');
		}
		$(kinsfolk_tab).addClass('active');
	}
	//初始化用户资料
	function initUserInfoTable(data) {
		$('.js-data-pk-userid').editable('destroy');
		if (data) {
			//			$("#q_keyword").val(data.phone);
			$("#js-userId").html(data.userInfo.id);
			var accountTxt = G_stringModule.getStr(data.userInfo.totalAccount, '0') + "(含赠送" + G_stringModule.getStr(data.userInfo.present, '0') + ")";
			$("#js-account").html(accountTxt);
			$("#js-diffno").html(data.userInfo.diffno);
			// $('#js-account').html(data.totalAccount + "(含赠送" + data.present+")");
			
			//绑定余额属性
			$(".js-attr-balance").attr("balance", G_stringModule.getStr(data.userInfo.account, '未开通'));
			$(".js-recharge-btn").attr("userId", data.userInfo.id);
			$(".js-recharge-btn").attr("account", data.userInfo.account);
			//给需要触发点击弹框的element 绑定userId值
			$(".js-attr-userid").attr("userId", data.id);
			//			$(".js-data-pk-userid").removeAttr("data-pk");
			//			$(".js-data-pk-userid").attr("data-pk", data.id);
			//			console.info($(".js-data-pk-userid").attr("data-pk"));
			$("#createTime").html(data.userInfo.createTime);

			$("#address").html(G_stringModule.getStr(data.userInfo.address, '未填写'));
			$("#remark").html(G_stringModule.getStr(data.userInfo.remark, '未填写'));

			$("#account").html(data.userInfo.account);
			$("#present").html(data.userInfo.present);
			$("#integral").html(G_stringModule.getStr(data.userInfo.integral, '0'));
			$("#totalIntegral").html(G_stringModule.getStr(data.userInfo.totalIntegral, '0'));

			$("#levelName").html(data.userInfo.memberLevelName);
			$(".js-userInfo-contain").show();
			$(".js-userInfo-contain").removeClass("hide");
			
			
			$("#js-account-record").attr("userId", data.userInfo.id);
			
			initUserInfoEdit(data.userInfo);
//			持卡人姓名：<span id="cardholderName"></span><span style="margin-left:20px;"></span>
//			银行卡号：<span id="cardNO"></span><span style="margin-left:20px;"></span>
//			银行名称：<span id="bankName"></span><span style="margin-left:20px;"></span>
//			银行卡类型：<span id="bankTypeStr"></span><span style="margin-left:20px;"></span>
//			银行支行：<span id="bankBranch"></span><span style="margin-left:20px;"></span>
			
			$("#cardNO").html(G_stringModule.getStr(data.bankInfo.cardNO, "未绑定"));
//			if(data.bankInfo.cardNO == undefined){
//				
//			} else{ 
				$("#cardholderName").html(G_stringModule.getStr(data.bankInfo.cardholderName, "未绑定"));
				$("#bankName").html(G_stringModule.getStr(data.bankInfo.bankName, "未绑定"));
				$("#bankTypeStr").html(G_stringModule.getStr(data.bankInfo.bankTypeStr, "未绑定"));
				$("#bankBranch").html(G_stringModule.getStr(data.bankInfo.bankBranch, "未绑定"));
//			}
		} else {
			$(".js-userInfo-contain").hide();

		}
	}
	var user_addrList=[];
	window.loadUserInfoAll = function (keyword) {
		$("#q_keyword").val(keyword);
		$('#order-mask-bg').css('display','block');
		$('#order-mask').css('display','block');
		doHttp({ keyword: keyword }, '/adminjson/SAASGetUserInfoAll').then(function (data) {
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			if (data.body.userInfo == undefined) {
				$(".js-userInfo-contain").addClass('hidden');
				$(".js-userInfo-contain").hide();
				Toast.error("未查询到用户信息!");
				$(".js-orderInfo-contain").addClass('hidden');
				top.importOnceJS('js-script-adduser', "js/app/rp/adduser.js");
				top.G_Fun_showAddUserPanel(keyword);
			} else {
				$(".js-userInfo-contain").removeClass('hidden');
				$(".js-orderInfo-contain").removeClass('hidden');
				$(".js-userInfo-contain").show();
				initUserInfoAll(data);
				user_addrList=data.body.addressList;
			}
		});
	}

	function processResponse(response, newValue) {
		if (response) {
			var errcode = response.errorCode;
			var msg = response.msg;
			if (errcode == 0) {
				Toast.success("操作成功!");
			} else {
				return msg;
			}
		}
	}

	function initUserAddr(data) {
		var html2 = template('userAddrListtmpl', data);
		$("#address").html(html2);
		$('#address .js-del-addr').click(function () {
			var addrid = $(this).attr('addrid');
			var userId = $(this).siblings('a').attr('userid');
			G_Util.bootboxConfirm('确定删除该地址信息?', function (isConfirm) {
				if (isConfirm) {
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + 'SAASDelUserAddress',
						params: {
							userId: userId,
							addrId: addrid
						}
					}).then(function (data) {
						if (data.errorCode == 0) {
							Toast.success("操作成功!");
							showUserInfo();
						}
					});
				}
			});
		});
	}

	//初始化亲属列表tab
	function initKinsfolkTabNav(data) {
		var html2 = template('kinsfolkNameNavtmpl', data);
		$("#kinsfolk-name-nav").empty().html(html2);
		if(curr_kinsfolk_tab)
		update_insursance_canApply_status(curr_kinsfolk_tab);
	}

	function initTabEvent() {
		//添加体重变更记录tab回调
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			// 获取已激活的标签页的名称
			// var activeTab = $(e.target).text();
			var activeHref = $(e.target).attr('href');
			// 获取前一个激活的标签页的名称
			var previousTab = $(e.relatedTarget).text();
		});
	}

	//初始化亲属详细情况
	function initKinsfolkDetail(data) {
		var html2 = template('kinsfolkDetailtmpl', data);
		$("#kinsfolk-detail-content").html(html2);
		initTabEvent();
	}

	function initOrderList(data) {
		list = data.orderList;
		if (list == undefined || list.length == 0) {
			$(".js-orderInfo-contain").addClass('hidden');
		} else {
			$(".js-orderInfo-contain").removeClass('hidden');
		}
		var html2 = template('userOrderListtmpl', data);
		$("#orderListContent").html(html2);
	}

	function initUserInfoAll(data) {
		//初始化用户信息
		initUserInfoTable(data.body);

		//初始化用户地址信息
		initUserAddr(data.body);

		//初始化亲属列表tab
		initKinsfolkTabNav(data.body);

		//初始化亲属详情页面
		initKinsfolkDetail(data.body);
		// 初始化亲属信息编辑
		initKinsfolkInfoEdit(data.body);

		//初始化订单列表
		initOrderList(data.body);

	};

	window.showUserInfo = function () {
		var initParam = httpUtilObj.getTabParams();
		var keyword = initParam.key;
		var keywordInput = $("#q_keyword").val();
		var notInput = keywordInput == undefined || keywordInput == '';
		var notDefined = keyword == undefined || keyword == '';
		if (notInput && notDefined) {
			return;
		}
		if (notInput) {
			$("#q_keyword").val(keyword);
			keywordInput = keyword;
		}
		loadUserInfoAll(keywordInput);
	}

	$('#q_keyword').keydown(function (e) {
		if (e.keyCode == 13) {
			var keyword = $("#q_keyword").val();
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			showUserInfo();
			e.stopPropagation();
			return false;
		}
	});

	$("#searchBut").click(function () {
		$('#order-mask-bg').css('display','block');
		$('#order-mask').css('display','block');
		showUserInfo();
	});
	showUserInfo();
	
	

	$(".js-account-record").click(function () {
		parent.tm.addTab('账户记录', '././templates/useraccount.html', {
			userId: $(this).attr('userid')
		});
	});
	$(".js-integral-record").click(function () {
		parent.tm.addTab('积分记录', '././templates/userintegralrecord.html', {
			userId: $(this).attr('userid')
		});
	});

	$('body').on('click', '.js-addUserAddr', function () {
		top.importOnceJS('js-script-useraddress', "js/app/rp/useraddress.js");
		top.setId('userId', $(this).attr('userId'));
		top.G_Fun_showAddUserAddressPanel();
	})

	$('body').on('click', '.js-addkinsfolk', function () {
		top.importOnceJS('js-script-kinsfolk', "js/app/rp/kinsfolk.js");
		top.setId('userId', $(this).attr('userId'));
		top.G_Fun_showAddKinsfolkPanel();
		this.blur();
	});

	$('body').on('click', '.js-delete-kinsfolk', function () {
		var item = $(this);
		G_Util.bootboxConfirm("确认删除该亲属信息?", function (isConfirm) {
			if (isConfirm) {
				httpUtilObj.ajax({
					url: CONSTANT.URL_PREFIX + 'SAASDelKinsfolk',
					params: {
						userId: item.attr('userId'),
						kinsfolkId: item.attr('kinsfolkId')
					}
				}).then(function (data) {
					if (data.errorCode == 0) {
						Toast.success("操作成功!");
						showUserInfo();
					}
				});
			}
		});
	});

	$('body').on('click', '.js-btn-uploadpic', function () {
		var uploadInputId = $(this).attr("uploadfor");
		$(this).siblings('input[name=js-upload-kinsfolkpic]').click();
		//		$('#' + uploadInputId).click();
	});
	//图片上传逻辑
	$('body').off('click','input[name=js-upload-kinsfolkpic]').on('click','input[name=js-upload-kinsfolkpic]',function(){//批量导入
		top.importOnceJS('js-script-hg',"js/app/fun.js");
		var inputEl = $(this);
		uploadImg($('input[name=js-upload-kinsfolkpic]'),'show').then((data)=>{
			inputEl.attr("imgId", data.imageId);
			inputEl.siblings('.js-td-kinsfolkimg').children('img').attr('src', data.imgUrl);
			if (inputEl.attr('name') == 'js-upload-kinsfolkpic') {
				// 更新亲属个人照片
				var params = {
					name: 'pic',
					value: inputEl.attr('imgid'),
					kinsfolkId: inputEl.attr('kinsfolkId')
				};
				doHttp(params, '/adminjson/SAASUpdateKinsfolkByField').then(Toast.success('操作成功!'));
			}
		})
	})

	$('body').on('click', '.js-recharge-btn', function () {
		top.importOnceJS('js-script-rechargesettings', "js/app/rp/rechargesetting.js");
		let templateProto =
			'<script id="rechargeSettingTemplate" type="text/html">' +
			'{{each rechargeSettingList as item i}}' +
			'<p> <input class="text-center" type="radio" id="rcs_opt{{item.id}}" rcid="{{item.id}}" name="rcs_opt" > <label for="rcs_opt{{item.id}}">{{item.name}}</label> </p> ' +
			'{{/each}}</script>';
		top.importOnceTemplate('rechargeSettingTemplate', templateProto);
		let userId = $(this).attr('userId');
		let account = $(this).attr('account');
		top.G_Fun_showUserRechargePanel(userId,account).then((res)=>{
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			showUserInfo();
		})
	});

});