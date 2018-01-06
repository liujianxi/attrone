var order_pay = order_pay || {};
(function (_self) {
	var pageSize = 10;
	var paginationInit = false;

	//初始化分页控件
	_self.initPaginations = function (nowPage, count) {
		//如果记录条目为0则隐藏分页控件
		if (count <= pageSize) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		$("#pagination").pagination(count, {
			'items_per_page': pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function (page_index) {
				console.log("callback:" + page_index + "::" + nowPage);
				if (paginationInit) {
					_self.initData(page_index + 1);
				} else {
					paginationInit = true;
				}

			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	};
	_self.bind = function () {
		//获取时间
		commonFunc.getMinHourDate();
		_self.initHos().then((res)=>{
			_self.initData();
		});
		$('#order-search').off('click').on('click', function () {
			_self.initData();
		});
	};
	//init财务管理列表
	_self.initData = function (pageNo) {
		let httpUtilObj = new HttpUtil();
		let data = {
			startDate: $('input[name="daterange-start"]').val(),
			endDate: $('input[name="daterange-end"]').val(),
			orgId:$('.org_hos').val(),
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderOrgPay',
			params: data
		}).then((res) => {
			$('.export').attr({
				startDate: $('input[name="daterange-start"]').val(),
				endDate: $('input[name="daterange-end"]').val(),
				orgId:$('.org_hos').val(),
			})
			_self.refreshTemplate(res.body.orderPayArray,$('.org_hos').val());
		})
	};
	_self.initHos=function(){
		let dtd = $.Deferred();
		let id=$('.org_company').find('option:selected').attr('id');
		if(id==0){
			$('.org_hos').addClass('org_hide');
			dtd.resolve();
			return dtd.promise();
		}
		let httpUtilObj = new HttpUtil();
		let data = {
			isAll:2,
			orderType:1,
			startDate:$('input[name="daterange-start"]').val(),
			endDate:$('input[name="daterange-end"]').val(),
		}
		data['orgId']=0;
		data['branchId']=0;
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderOrgPay',
			params: data
		}).then((res)=>{//org_hos--
			let org_data=res.body.rightJson.orgList;
			$('.org_hos').empty();
			if(!org_data.length){
				$('.org_hos').addClass('org_hide');
				dtd.resolve();
				return dtd.promise();
			}
			if(org_data.length>1){
				$('.org_hos').append(`<option value="0">请选择</option>`);
			}
			$('.org_hos').removeClass('org_hide');
			org_data.forEach((item,index)=>{
				let optionNode=`
					<option value="${item.id}">${item.orgName}</option>
				`;
				$('.org_hos').append(optionNode);
			});
			dtd.resolve();
			return dtd.promise();
		})
		return dtd.promise();
	};
	//更新表格
	_self.refreshTemplate = function (data,orgId) {
		if (!data.length) {
			return false;
		}
		let tableNode = $('#orderPayListContent');
		tableNode.empty();
		$('#orderPayListContent').attr('orgid',orgId);
		let startDate = $('input[name="daterange-start"]').val();
		let endDate = $('input[name="daterange-end"]').val();
		data.forEach(function (item, index) {
			if (index == 0) {
				let fourLine = `
					<tr>
						<td rowspan="10" class="highlight totalprice"><span>${item.date}</span></td>
						<td class="highblack">合计</td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="200" href="javascript:void(0);">${item['100_200']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="200" href="javascript:void(0);">${item['5_200']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="200" href="javascript:void(0);">${item['101_200']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="200" href="javascript:void(0);">${item['3_200']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="200" href="javascript:void(0);">${item['2_200']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="200" href="javascript:void(0);">${item['1_200']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="200" href="javascript:void(0);">${item['6_200']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="200" href="javascript:void(0);">${item['102_200']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="200" href="javascript:void(0);">${item['32_200']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="200" href="javascript:void(0);">${item['31_200']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="200" href="javascript:void(0);">${item['30_200']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="200" href="javascript:void(0);">${item['33_200']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="200" href="javascript:void(0);">${item['103_200']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="200" href="javascript:void(0);">${item['40_200']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="200" href="javascript:void(0);">${item['41_200']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="200" href="javascript:void(0);">${item['43_200']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="200" href="javascript:void(0);">${item['42_200']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="200" href="javascript:void(0);">${item['44_200']}</a></td>
					</tr>
					<tr>
						<td class="highblack"><a id="order-payAll" class="show" href="javascript:void(0);" title="支付合计">支付合计</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="201" href="javascript:void(0);">${item['100_201']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="201" href="javascript:void(0);">${item['5_201']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="201" href="javascript:void(0);">${item['101_201']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="201" href="javascript:void(0);">${item['3_201']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="201" href="javascript:void(0);">${item['2_201']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="201" href="javascript:void(0);">${item['1_201']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="201" href="javascript:void(0);">${item['6_201']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="201" href="javascript:void(0);">${item['102_201']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="201" href="javascript:void(0);">${item['32_201']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="201" href="javascript:void(0);">${item['31_201']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="201" href="javascript:void(0);">${item['30_201']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="201" href="javascript:void(0);">${item['33_201']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="201" href="javascript:void(0);">${item['103_201']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="201" href="javascript:void(0);">${item['40_201']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="201" href="javascript:void(0);">${item['41_201']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="201" href="javascript:void(0);">${item['43_201']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="201" href="javascript:void(0);">${item['42_201']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="201" href="javascript:void(0);">${item['44_201']}</a></td>
					</tr>
					<tr class="order-payAll-tr">
						<td class="highblack">支付预付款</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="3" href="javascript:void(0);">${item['100_3']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="3" href="javascript:void(0);">${item['5_3']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="3" href="javascript:void(0);">${item['101_3']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="3" href="javascript:void(0);">${item['3_3']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="3" href="javascript:void(0);">${item['2_3']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="3" href="javascript:void(0);">${item['1_3']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="3" href="javascript:void(0);">${item['6_3']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="3" href="javascript:void(0);">${item['102_3']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="3" href="javascript:void(0);">${item['32_3']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="3" href="javascript:void(0);">${item['31_3']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="3" href="javascript:void(0);">${item['30_3']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="3" href="javascript:void(0);">${item['33_3']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="3" href="javascript:void(0);">${item['103_3']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="3" href="javascript:void(0);">${item['40_3']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="3" href="javascript:void(0);">${item['41_3']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="3" href="javascript:void(0);">${item['43_3']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="3" href="javascript:void(0);">${item['42_3']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="3" href="javascript:void(0);">${item['44_3']}</a></td>
					</tr>
					<tr class="order-payAll-tr">
						<td class="highblack">支付门禁卡</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="9" href="javascript:void(0);">${item['100_9']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="9" href="javascript:void(0);">${item['5_9']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="9" href="javascript:void(0);">${item['101_9']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="9" href="javascript:void(0);">${item['3_9']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="9" href="javascript:void(0);">${item['2_9']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="9" href="javascript:void(0);">${item['1_9']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="9" href="javascript:void(0);">${item['6_9']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="9" href="javascript:void(0);">${item['102_9']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="9" href="javascript:void(0);">${item['32_9']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link"  paytype="31" busiType="9" href="javascript:void(0);">${item['31_9']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="9" href="javascript:void(0);">${item['30_9']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="9" href="javascript:void(0);">${item['33_9']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="9" href="javascript:void(0);">${item['103_9']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="9" href="javascript:void(0);">${item['40_9']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="9" href="javascript:void(0);">${item['41_9']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="9" href="javascript:void(0);">${item['43_9']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="9" href="javascript:void(0);">${item['42_9']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="9" href="javascript:void(0);">${item['44_9']}</a></td>
					</tr>
					<tr class="order-payAll-tr">
						<td class="highblack">支付补缴费</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="4" href="javascript:void(0);">${item['100_10']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="4" href="javascript:void(0);">${item['5_10']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="4" href="javascript:void(0);">${item['101_10']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="4" href="javascript:void(0);">${item['3_10']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="4" href="javascript:void(0);">${item['2_10']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="4" href="javascript:void(0);">${item['1_10']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="4" href="javascript:void(0);">${item['6_10']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="4" href="javascript:void(0);">${item['102_10']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="4" href="javascript:void(0);">${item['32_10']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="4" href="javascript:void(0);">${item['31_10']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="4" href="javascript:void(0);">${item['30_10']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="4" href="javascript:void(0);">${item['33_10']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="4" href="javascript:void(0);">${item['103_10']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="4" href="javascript:void(0);">${item['40_10']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="4" href="javascript:void(0);">${item['41_10']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="4" href="javascript:void(0);">${item['43_10']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="4" href="javascript:void(0);">${item['42_10']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="4" href="javascript:void(0);">${item['44_10']}</a></td>
					</tr>
					<tr class="order-payAll-tr">
						<td class="highblack">结算后校正</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="4" href="javascript:void(0);">${item['100_4']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="4" href="javascript:void(0);">${item['5_4']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="4" href="javascript:void(0);">${item['101_4']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="4" href="javascript:void(0);">${item['3_4']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="4" href="javascript:void(0);">${item['2_4']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="4" href="javascript:void(0);">${item['1_4']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="4" href="javascript:void(0);">${item['6_4']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="4" href="javascript:void(0);">${item['102_4']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="4" href="javascript:void(0);">${item['32_4']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="4" href="javascript:void(0);">${item['31_4']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="4" href="javascript:void(0);">${item['30_4']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="4" href="javascript:void(0);">${item['33_4']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="4" href="javascript:void(0);">${item['103_4']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="4" href="javascript:void(0);">${item['40_4']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="4" href="javascript:void(0);">${item['41_4']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="4" href="javascript:void(0);">${item['43_4']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="4" href="javascript:void(0);">${item['42_4']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="4" href="javascript:void(0);">${item['44_4']}</a></td>
					</tr>
					<tr>
						<td class="highblack"><a id="order-returnAll" class="show" href="javascript:void(0);" title="退款合计">退款合计</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="202" href="javascript:void(0);">-${item['100_202']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="202" href="javascript:void(0);">-${item['5_202']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="202" href="javascript:void(0);">-${item['101_202']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="202" href="javascript:void(0);">-${item['3_202']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="202" href="javascript:void(0);">-${item['2_202']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="202" href="javascript:void(0);">-${item['1_202']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="202" href="javascript:void(0);">-${item['6_202']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="202" href="javascript:void(0);">-${item['102_202']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="202" href="javascript:void(0);">-${item['32_202']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="202" href="javascript:void(0);">-${item['31_202']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="202" href="javascript:void(0);">-${item['30_202']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="202" href="javascript:void(0);">-${item['33_202']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="202" href="javascript:void(0);">-${item['103_202']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="202" href="javascript:void(0);">-${item['40_202']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="202" href="javascript:void(0);">-${item['41_202']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="202" href="javascript:void(0);">-${item['43_202']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="202" href="javascript:void(0);">-${item['42_202']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="202" href="javascript:void(0);">-${item['44_202']}</a></td>
					</tr>
					<tr class="order-returnAll-tr">
						<td class="highblack">退款订单</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="51" href="javascript:void(0);">-${item['100_51']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="51" href="javascript:void(0);">-${item['5_51']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="51" href="javascript:void(0);">-${item['101_51']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="51" href="javascript:void(0);">-${item['3_51']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="51" href="javascript:void(0);">-${item['2_51']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="51" href="javascript:void(0);">-${item['1_51']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="51" href="javascript:void(0);">-${item['6_51']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="51" href="javascript:void(0);">-${item['102_51']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="51" href="javascript:void(0);">-${item['32_51']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="51" href="javascript:void(0);">-${item['31_51']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="51" href="javascript:void(0);">-${item['30_51']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link order-baofuAll-td" paytype="33" busiType="51" href="javascript:void(0);">-${item['33_51']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="51" href="javascript:void(0);">-${item['103_51']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="51" href="javascript:void(0);">-${item['40_51']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="51" href="javascript:void(0);">-${item['41_51']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="51" href="javascript:void(0);">-${item['43_51']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="51" href="javascript:void(0);">-${item['42_51']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="51" href="javascript:void(0);">-${item['44_51']}</a></td>
					</tr>
					<tr class="order-returnAll-tr">
						<td class="highblack">退款门禁卡</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="50" href="javascript:void(0);">-${item['100_50']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="50" href="javascript:void(0);">-${item['5_50']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="50" href="javascript:void(0);">-${item['101_50']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="50" href="javascript:void(0);">-${item['3_50']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="50" href="javascript:void(0);">-${item['2_50']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="50" href="javascript:void(0);">-${item['1_50']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="50" href="javascript:void(0);">-${item['6_50']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="50" href="javascript:void(0);">-${item['102_50']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="50" href="javascript:void(0);">-${item['32_50']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="50" href="javascript:void(0);">-${item['31_50']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="50" href="javascript:void(0);">-${item['30_50']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="50" href="javascript:void(0);">-${item['33_50']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="50" href="javascript:void(0);">-${item['103_50']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="50" href="javascript:void(0);">-${item['40_50']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="50" href="javascript:void(0);">-${item['41_50']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="50" href="javascript:void(0);">-${item['43_50']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="50" href="javascript:void(0);">-${item['42_50']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="50" href="javascript:void(0);">-${item['44_50']}</a></td>
					</tr>
					<tr class="order-returnAll-tr">
						<td class="highblack">校正后结算退款</td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="100" busiType="50" href="javascript:void(0);">-${item['100_52']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="5" busiType="50" href="javascript:void(0);">-${item['5_52']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="101" busiType="50" href="javascript:void(0);">-${item['101_52']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="3" busiType="50" href="javascript:void(0);">-${item['3_52']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="2" busiType="50" href="javascript:void(0);">-${item['2_52']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="1" busiType="50" href="javascript:void(0);">-${item['1_52']}</a></td>
						<td class="order-onlineAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="6" busiType="50" href="javascript:void(0);">-${item['6_52']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="102" busiType="50" href="javascript:void(0);">-${item['102_52']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="32" busiType="50" href="javascript:void(0);">-${item['32_52']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="31" busiType="50" href="javascript:void(0);">-${item['31_52']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="30" busiType="50" href="javascript:void(0);">-${item['30_52']}</a></td>
						<td class="order-baofuAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="33" busiType="50" href="javascript:void(0);">-${item['33_52']}</a></td>
						<td><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="103" busiType="50" href="javascript:void(0);">-${item['103_52']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="40" busiType="50" href="javascript:void(0);">-${item['40_52']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="41" busiType="50" href="javascript:void(0);">-${item['41_52']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="43" busiType="50" href="javascript:void(0);">-${item['43_52']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="42" busiType="50" href="javascript:void(0);">-${item['42_52']}</a></td>
						<td class="order-POSAll-td"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="44" busiType="50" href="javascript:void(0);">-${item['44_52']}</a></td>
					</tr>
					`;
				tableNode.append(fourLine);
			}else {
				let trNode = `
					<tr>
						<td class="highblack">${item.date}</td>
						<td class="highblack">小计</td>
						<td><a endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" paytype="100" busiType="200" href="javascript:void(0);">${item['100_200']}</a></td>
						<td><a paytype="5" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['5_200']}</a></td>
						<td><a paytype="101" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['101_200']}</a></td>
						<td class="order-onlineAll-td"><a paytype="3" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['3_200']}</a></td>
						<td class="order-onlineAll-td"><a paytype="2" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['2_200']}</a></td>
						<td class="order-onlineAll-td"><a paytype="1" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);" >${item['1_200']}</a></td>
						<td class="order-onlineAll-td"><a paytype="6" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['6_200']}</a></td>
						<td><a paytype="102" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['102_200']}</a></td>
						<td class="order-baofuAll-td"><a paytype="32" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['32_200']}</a></td>
						<td class="order-baofuAll-td"><a paytype="31" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['31_200']}</a></td>
						<td class="order-baofuAll-td"><a paytype="30" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['30_200']}</a></td>
						<td class="order-baofuAll-td"><a paytype="33" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['33_200']}</a></td>
						<td><a paytype="103" endDate="${item.endDate}" startDate="${item.endDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['103_200']}</a></td>
						<td class="order-POSAll-td"><a paytype="40" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['40_200']}</a></td>
						<td class="order-POSAll-td"><a paytype="41" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['41_200']}</a></td>
						<td class="order-POSAll-td"><a paytype="43" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['43_200']}</a></td>
						<td class="order-POSAll-td"><a paytype="42" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['42_200']}</a></td>
						<td class="order-POSAll-td"><a paytype="44" endDate="${item.endDate}" startDate="${item.startDate}" class="order_pay_link" busiType="200" href="javascript:void(0);">${item['44_200']}</a></td>
					</tr>
				`;
				tableNode.append(trNode);
			}
		});
		_self.refreshBind();
	};
	//更新后的bind事件
	_self.refreshBind = function () {
		//点击thead处总计
//		$('body').off('click','#order-onlineAll,#order-baofuAll,#order-POSAll').on('click','#order-onlineAll,#order-baofuAll,#order-POSAll',function(){
//			clickIfShow($(this).attr('id'),'thead');
//		})
		//点击支付合计-点击退款合计
		$('#orderPayListContent').off('click','#order-returnAll,#order-payAll').on('click','#order-returnAll,#order-payAll',function(){
			clickIfShow($(this).attr('id'),'tbody');
			getCount();//计算合计的rowspan
		})
		//控制是否闭合
		function clickIfShow(ele,str){
			//str--tbody-thead
			if(str=='tbody'){//tbody的展开收起
				let self=$('#'+ele);
				let self_tr=$('.'+ele+'-tr');
				if(self.hasClass('show')){
					self.removeClass('show');
					self_tr.addClass('org_hide');
				}else{
					self.addClass('show');
					self_tr.removeClass('org_hide');
				}
			}else{//thead的展开收起
				let self=$('#'+ele);
				let self_td=$('.'+ele+'-td');
				let self_th=$('.'+ele+'-th');
				if(self.hasClass('show')){
					self.removeClass('show');
					self_td.addClass('org_hide');
					self_th.attr('colspan','1');
				}else{
					self.addClass('show');
					self_td.removeClass('org_hide');
					if(ele=='order-POSAll'){//pos--6
						self_th.attr('colspan','6');
					}else{
						self_th.attr('colspan','5');
					}
				}
			}
		}
		//计算合计的rowspan
		function getCount(){
			let length_a=$('#orderPayListContent #order-payAll.show').length;
			let length_b=$('#orderPayListContent #order-returnAll.show').length;
			if(length_a&&length_b){//都有
				$('#orderPayListContent .totalprice').attr('rowspan','8');
			}else if(length_a){//只有a show
				$('#orderPayListContent .totalprice').attr('rowspan','6');
			}else if(length_b){//只有b show
				$('#orderPayListContent .totalprice').attr('rowspan','5');
			}else{
				$('#orderPayListContent .totalprice').attr('rowspan','3');
			}
		}
		$('#orderPayListContent').off('click', '.order_pay_link').on('click', '.order_pay_link', function () {
			let startDate = $(this).attr('startDate');
			let endDate = $(this).attr('endDate');
			let title = "资金流水明细" + startDate + '-' + endDate;
			let data = {
				endDate: endDate,
				startDate: startDate,
				payType: $(this).attr('paytype'),
				busiType: $(this).attr('busitype'),
				orgId:$('#orderPayListContent').attr('orgid'),
			};
			let order_link = "templates/orderorg_detail.html";
			top.tm.addTab(title, order_link, data);
		});
		//导出报表
		let output_flag=true;
		$('.export').off('click').on('click', function () {
			let self=$(this);
			if(!output_flag){
				return false;
			}
			output_flag=false;
			let httpUtilObj = new HttpUtil();
			let data={
				endDate: self.attr('enddate'),
				startDate: self.attr('startdate'),
				orgId:self.attr('orgid')
			};
			httpUtilObj.ajax({
				url: '/adminjson/SAASGetFormOrderOrgPay',
				params: data,
			}).then((res)=>{
				output_flag=true;
				if(res.errorCode==0){
					commonFunc.exportlxs(res.body.excelName,res.body.downloadFileUrl);//导出报表
				}
			},(res)=>{
				output_flag=true;
			});
		});
		//固定表头的方法--传入固定的table
		commonFunc.staticTable($('.dynamic-table'));
	};
	_self.bind();
})(order_pay)
