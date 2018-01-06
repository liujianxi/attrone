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
			url: '/adminjson/SAASTjOrgExtra',
			params:data,
		}).then((res)=>{//org_hos--
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			let org_data=res.body.rightJson.orgList;
			_self.branchList=res.body.rightJson.branchMap;
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
	_self.branchList=[];
	_self.initBranch=function(){//org_branch
		let dtd = $.Deferred();
		let data=_self.branchList[$('.org_hos option:selected').attr('id')];
		$('.org_branch').empty();
		if(data==undefined||!data.length||_self.isEmpty(_self.branchList)||$('.org_hos option:selected').attr('id')==0){
			$('.org_branch').addClass('org_hide');
			dtd.resolve();
			return dtd.promise();
		}
		$('.org_branch').removeClass('org_hide');
		$('.org_branch').append(`<option id="0">所有科室</option>`);
		data.forEach((item,index)=>{
			let optionNode='';
			optionNode=`
				<option id="${item.id}">${item.branchName}</option>
			`;
			$('.org_branch').append(optionNode);
		});
		dtd.resolve();
		return dtd.promise();
	};
	_self.isEmpty=function(obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	}
	//更新表格
	_self.initTemplate = function (str) {
		let httpUtilObj = new HttpUtil();
		let data = {
			startDate:$('input[name="daterange-start"]').val(),
			endDate:$('input[name="daterange-end"]').val(),
			orgId:$('.org_hos option:selected').attr('id')||0,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASTjOrgExtra',
			params: data
		}).then((res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			_self.refreshTemmlate(res.body);
			_self.refreshBind(res.body);
		})
	};
	_self.refreshTemmlate=function(data){
		var getListHtml = template('entranceGuardListTemplate', data);
		$("#entranceGuardListContent").empty().html(getListHtml);
	}
	//门禁卡info事件
	_self.refreshBind = function (data) {
		$('.pop-entrance').popover({
			'trigger':'hover',
		});
		$('.validNumber em').html(data.validNumber);
		$('.loseNumber em').html(data.loseNumber);
		$('.pastNumber em').html(data.pastNumber);
		$('.damagedNumber em').html(data.damagedNumber);
		$('.returnedNumber em').html(data.returnNumber);
		$('.addNumber em').html(data.createNumber);
		//跳转部分
		$('.loseNumber a').attr({
			'status':'1',
			'title':'门禁卡挂失明细',
			'link':'templates/entranceLose.html',
			'orgId':$('.org_hos option:selected').attr('id')||0,
			'startDate':$('input[name="daterange-start"]').val(),
			'endDate':$('input[name="daterange-end"]').val(),
		});
		$('.pastNumber a').attr({
			'status':'3',
			'title':'门禁卡过期明细',
			'link':'templates/entrancePast.html',
			'orgId':$('.org_hos option:selected').attr('id')||0,
			'startDate':$('input[name="daterange-start"]').val(),
			'endDate':$('input[name="daterange-end"]').val(),
		});
		$('.damagedNumber a').attr({
			'status':'2',
			'title':'门禁卡作废明细',
			'link':'templates/entranceDamaged.html',
			'orgId':$('.org_hos option:selected').attr('id')||0,
			'startDate':$('input[name="daterange-start"]').val(),
			'endDate':$('input[name="daterange-end"]').val(),
		});
		//归还
		$('.returnedNumber a').attr({
			'status':'5',
			'title':'门禁卡归还明细',
			'link':'templates/entranceReturned.html',
			'orgId':$('.org_hos option:selected').attr('id')||0,
			'startDate':$('input[name="daterange-start"]').val(),
			'endDate':$('input[name="daterange-end"]').val(),
		});
		//租借
		$('.addNumber a').attr({
			'status':'4',
			'title':'门禁卡租借明细',
			'link':'templates/entranceAdd.html',
			'orgId':$('.org_hos option:selected').attr('id')||0,
			'startDate':$('input[name="daterange-start"]').val(),
			'endDate':$('input[name="daterange-end"]').val(),
		});
		$('.entrance-detail').off('click').on('click',function(){
			let data = {
    			startDate:$(this).attr('startDate'),
    			endDate:$(this).attr('endDate'),
    			orgId:$(this).attr('orgId'),
    			extraStatus:$(this).attr('status'),
			};
			let title=$(this).attr('title');
			let entrance_link=$(this).attr('link');
			top.tm.addTab(title,entrance_link,data);
		});
		//固定表头的方法--传入固定的table
		commonFunc.staticTable($('.ServiceLivingListTable'));
	};
	_self.bind();
})(entrance)
