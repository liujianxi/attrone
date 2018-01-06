var entrance = entrance || {};
(function (_self) {
	_self.bind = function () {
		_self.initData();
	};
	_self.initData = function () {
		_self.initHos().then((res)=>{
			_self.initTemplate('init');
		});
		//搜索
		$('#entrance-search').off('click').on('click',function(){
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			_self.initTemplate('search');
		})
	};
	//init财务管理列表
	_self.initHos=function(){
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		let data = {
			startDate:$('input[name="daterange-start"]').val(),
			endDate:$('input[name="daterange-end"]').val(),
			orgId:$('.org_hos option:selected').attr('id')||0,
			branchId:$('.org_branch  option:selected').attr('id')||0,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderPayType',
			params:data,
		}).then((res)=>{//org_hos--
			let org_data=res.body.rightJson.orgList;
			$('.org_hos').empty();
			if(org_data.length>1){
				$('.org_hos').append(`<option id="0">所有机构</option>`);
			}
			org_data.forEach((item,index)=>{
				let optionNode='';
				optionNode=`
					<option id="${item.id}">${item.orgName}</option>
				`;
				$('.org_hos').append(optionNode);
			});
			dtd.resolve();
			return dtd.promise();
		})
		return dtd.promise();
	};
	//更新表格
	_self.initTemplate = function (str) {
		let httpUtilObj = new HttpUtil();
		let orgId=$('.org_hos option:selected').attr('id')||0;
		let data = {
			startDate:$('input[name="daterange-start"]').val(),
			endDate:$('input[name="daterange-end"]').val(),
			orgId:orgId,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderPayType',
			params: data
		}).then((res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			_self.refreshTemmlate(res.body);
			_self.refreshBind(res.body);
			$("#orderPayTypeListContent").attr({
				'startDate':$('input[name="daterange-start"]').val(),
				'endDate':$('input[name="daterange-end"]').val(),
			});
		})
	};
	_self.refreshTemmlate=function(data){
		var getListHtml = template('orderPayTypeListTemplate', data);
		$("#orderPayTypeListContent").empty().html(getListHtml);
	}
	//点击详情事件
	_self.refreshBind = function (data) {
		$('.orderPayDetail').off('click').on('click',function(){
			let data = {
				startDate:$("#orderPayTypeListContent").attr('startDate'),
				endDate:$("#orderPayTypeListContent").attr('endDate'),
    			orgId:$(this).attr('orgId'),
			};
			let title=$(this).attr('title');
			let entrance_link=$(this).attr('link');
			top.tm.addTab(title,entrance_link,data);
		})
	};
	_self.bind();
})(entrance)
