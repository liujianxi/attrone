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
		_self.initData();
		$('#order-search').off('click').on('click', function () {
			_self.initData();
		})
	};
	//init财务管理列表
	_self.initData = function (pageNo) {
		let httpUtilObj = new HttpUtil();
		let data = {
			startDate: $('input[name="daterange-start"]').val(),
			endDate: $('input[name="daterange-end"]').val(),
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderPay',
			params: data
		}).then((res) => {
			_self.refreshTemplate(res.body.orderPayArray);
		})
	};
	//更新表格
	_self.refreshTemplate = function (data) {
		if (!data.length) {
			return false;
		}
		let tableNode = $('#orderPayListContent');
		tableNode.empty();
		let startDate = $('input[name="daterange-start"]').val();
		let endDate = $('input[name="daterange-end"]').val();
		data.forEach(function (item, index) {
			if (index == 0) {
				let fourLine = `
					<tr class="one_line">
						<td class=highlight>${item.date}</td>
						<td class="highlight"><a class="one_open" href="javascript:void(0);" title="展开">展开</a></td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="0" busiType="0" href="javascript:void(0);">${item.totalPrice}</a></td>
						<td><a paytype="1" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['1_0']}</a></td>
						<td><a paytype="2" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['2_0']}</a></td>
						<td><a paytype="3" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['3_0']}</a></td>
						<td><a paytype="41" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['41_0']}</a></td>
						<td><a paytype="40" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['40_0']}</a></td>
						<td><a paytype="44" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['44_0']}</a></td>
						<td><a paytype="42" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['42_0']}</a></td>
						<td><a paytype="43" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['43_0']}</a></td>
						<td><a paytype="5" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['5_0']}</a></td>
						<td><a paytype="32" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['32_0']}</a></td>
						<td><a paytype="31" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['31_0']}</a></td>
						<td><a paytype="30" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['30_0']}</a></td>
						<td><a paytype="33" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['33_0']}</a></td>
					</tr>
					<tr class="four_line">
						<td rowspan="4" class="highlight totalprice"><span>${item.date}</span></td>
						<td class="highlight"><a class="one_close" href="javascript:void(0);" title="收起">收起</a></td>
						<td class="highlight"><a endDate="${endDate}" startDate="${startDate}" class="order_pay_link" paytype="0" busiType="0" href="javascript:void(0);">${item.totalPrice}</a></td>
						<td><a paytype="1" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['1_0']}</a></td>
						<td><a paytype="2" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['2_0']}</a></td>
						<td><a paytype="3" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['3_0']}</a></td>
						<td><a paytype="41" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['41_0']}</a></td>
						<td><a paytype="40" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['40_0']}</a></td>
						<td><a paytype="44" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['44_0']}</a></td>
						<td><a paytype="42" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['42_0']}</a></td>
						<td><a paytype="43" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['43_0']}</a></td>
						<td><a paytype="5" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['5_0']}</a></td>
						<td><a paytype="32" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['32_0']}</a></td>
						<td><a paytype="31" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['31_0']}</a></td>
						<td><a paytype="30" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['30_0']}</a></td>
						<td><a paytype="33" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['33_0']}</a></td>
					</tr>
					<tr class="four_line">
						<td class="highblack">支付金额</td>
						<td class=highlight><a endDate="${endDate}" startDate="${startDate}" paytype="0" class="order_pay_link" busiType="1" href="javascript:void(0);">${item.totalPayPrice}</a></td>
						<td><a paytype="1" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['1_1']}</a></td>
						<td><a paytype="2" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['2_1']}</a></td>
						<td><a paytype="3" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['3_1']}</a></td>
						<td><a paytype="41" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['41_1']}</a></td>
						<td><a paytype="40" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['40_1']}</a></td>
						<td><a paytype="44" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['44_1']}</a></td>
						<td><a paytype="42" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['42_1']}</a></td>
						<td><a paytype="43" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['43_1']}</a></td>
						<td><a paytype="5" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="1" href="javascript:void(0);">${item['5_1']}</a></td>
						<td><a paytype="32" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['32_1']}</a></td>
						<td><a paytype="31" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['31_1']}</a></td>
						<td><a paytype="30" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['30_1']}</a></td>
						<td><a paytype="33" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['33_1']}</a></td>
					</tr>
					<tr class="four_line">
						<td class="highblack">退款金额</td>
						<td class=highlight><a endDate="${endDate}" startDate="${startDate}" paytype="0" class="order_pay_link" busiType="2" href="javascript:void(0);">${item.totalRefundPrice}</a></td>
						<td><a paytype="1" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['1_2']}</a></td>
						<td><a paytype="2" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['2_2']}</a></td>
						<td><a paytype="3" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['3_2']}</a></td>
						<td><a paytype="41" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['41_2']}</a></td>
						<td><a paytype="40" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['40_2']}</a></td>
						<td><a paytype="44" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['44_2']}</a></td>
						<td><a paytype="42" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['42_2']}</a></td>
						<td><a paytype="43" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['43_2']}</a></td>
						<td><a paytype="5" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="2" href="javascript:void(0);">${item['5_2']}</a></td>
						<td><a paytype="32" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['32_2']}</a></td>
						<td><a paytype="31" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['31_2']}</a></td>
						<td><a paytype="30" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['30_2']}</a></td>
						<td><a paytype="33" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['33_2']}</a></td>
					</tr>
					<tr class="four_line">
						<td class="highblack">提现金额</td>
						<td class=highlight><a endDate="${endDate}" startDate="${startDate}" paytype="0" class="order_pay_link" busiType="3" href="javascript:void(0);">${item.totalWithdrawPrice}</a></td>
						<td><a paytype="1" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['1_3']}</a></td>
						<td><a paytype="2" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['2_3']}</a></td>
						<td><a paytype="3" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['3_3']}</a></td>
						<td><a paytype="41" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['41_3']}</a></td>
						<td><a paytype="40" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['40_3']}</a></td>
						<td><a paytype="44" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['44_3']}</a></td>
						<td><a paytype="42" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['42_3']}</a></td>
						<td><a paytype="43" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['43_3']}</a></td>
						<td><a paytype="5" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="3" href="javascript:void(0);">${item['5_3']}</a></td>
						<td><a paytype="32" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['32_3']}</a></td>
						<td><a paytype="31" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['31_3']}</a></td>
						<td><a paytype="30" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['30_3']}</a></td>
						<td><a paytype="33" endDate="${endDate}" startDate="${startDate}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['33_3']}</a></td>
					</tr>
					`;
				tableNode.append(fourLine);
			} else {
				let trNode = `
					<tr>
						<td class="highblack">${item.date}</td>
						<td class="highblack">小计</td>
						<td class=highlight><a endDate="${item.date}" startDate="${item.date}" paytype="0" class="order_pay_link" busiType="0" href="javascript:void(0);">${item.totalPrice}</a></td>
						<td><a paytype="1" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['1_0']}</a></td>
						<td><a paytype="2" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['2_0']}</a></td>
						<td><a paytype="3" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['3_0']}</a></td>
						<td><a paytype="41" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['41_0']}</a></td>
						<td><a paytype="40" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['40_0']}</a></td>
						<td><a paytype="44" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['44_0']}</a></td>
						<td><a paytype="42" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['42_0']}</a></td>
						<td><a paytype="43" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['43_0']}</a></td>
						<td><a paytype="5" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['5_0']}</a></td>
						<td><a paytype="32" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['32_0']}</a></td>
						<td><a paytype="31" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['31_0']}</a></td>
						<td><a paytype="30" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['30_0']}</a></td>
						<td><a paytype="33" endDate="${item.date}" startDate="${item.date}" class="order_pay_link" busiType="0" href="javascript:void(0);">${item['33_0']}</a></td>
					</tr>
				`;
				tableNode.append(trNode);
			}
		});
		_self.refreshBind();
	};
	//更新后的bind事件
	_self.refreshBind = function () {
		//默认展开
		$('#orderPayListContent .four_line').css('display', 'table-row');
		$('#orderPayListContent .one_line').css('display', 'none');
		//展开
		$('#orderPayListContent').off('click', '.one_open').on('click', '.one_open', function () {
			$('#orderPayListContent .four_line').css('display', 'table-row');
			$('#orderPayListContent .one_line').css('display', 'none');
		});
		//收起
		$('#orderPayListContent').off('click', '.one_close').on('click', '.one_close', function () {
			$('#orderPayListContent .four_line').css('display', 'none');
			$('#orderPayListContent .one_line').css('display', 'table-row');
		});
		$('#orderPayListContent').off('click', '.order_pay_link').on('click', '.order_pay_link', function () {
			let startDate = $(this).attr('startDate');
			let endDate = $(this).attr('endDate');
			let title = "资金流水明细" + startDate + '-' + endDate;
			let data = {
				endDate: endDate,
				startDate: startDate,
				payType: $(this).attr('paytype'),
				busiType: $(this).attr('busitype'),
			};
			let order_link = "templates/funds_detail.html";
			top.tm.addTab(title, order_link, data);
		});
		//固定表头的方法--传入固定的table
		commonFunc.staticTable($('.dynamic-table'));
	};
	_self.bind();
})(order_pay)
