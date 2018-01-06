var consume_org = consume_org || {};
(function (_self) {
	_self.bind = function () {
		_self.initData();
	};
	_self.initData = function () {
		_self.initHos().then((res)=>{
			_self.initTemplate('init');
		});
		//搜索
		$('#org-search').off('click').on('click',function(){
			_self.initTemplate('search');
		})
		$('.org_company').on('change',_self.initHos);
		$('.org_hos').on('change',_self.initBranch);
	};
	//init财务管理列表
	_self.initCompany = function () {
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		let data = {
			isAll:1,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetCompanyList',
			params: data
		}).then((res) => {//
			let selectNode=$('.org_company');
			selectNode.empty();
			let data=res.body.companyList;
			if(!data.length){
				dtd.resolve();
				return dtd.promise();
			}
			selectNode.append(`<option id="0">所有合作伙伴</option>`);
			data.forEach((item,index)=>{
				let optionNode=`
					<option id="${item.id}">${item.companyName}</option>
				`;
				selectNode.append(optionNode);
			});
			_self.initHos().then((res)=>{
					dtd.resolve();
					return dtd.promise();
			})
		})
		return dtd.promise();
	};
	_self.initHos=function(){
		let dtd = $.Deferred();
		let id=$('.org_company').find('option:selected').attr('id');
		if(id==0){
			$('.org_hos').addClass('org_hide');
			$('.org_branch').addClass('org_hide');
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
			url: '/adminjson/SAASExpenditureStatisticsJG',
			params: data
		}).then((res)=>{//org_hos--
			let org_data=res.body.rightJson.orgList;
			_self.branchList=res.body.rightJson.branchMap;
			$('.org_hos').empty();
			if(!org_data.length){
				$('.org_hos').addClass('org_hide');
				dtd.resolve();
				return dtd.promise();
			}
			if(org_data.length>1){
				$('.org_hos').append(`<option id="0">请选择</option>`);
			}
			$('.org_hos').removeClass('org_hide');
			org_data.forEach((item,index)=>{
				let optionNode=`
					<option id="${item.id}">${item.orgName}</option>
				`;
				$('.org_hos').append(optionNode);
			});
			_self.initBranch().then((res)=>{
				dtd.resolve();
				return dtd.promise();
			})
		})
		return dtd.promise();
	};
	_self.branchList='';
	_self.initBranch=function(){//org_branch
		let dtd = $.Deferred();
		$('.org_branch').empty();
		let data=_self.branchList[$('.org_hos option:selected').attr('id')];
		if(_self.isEmpty(_self.branchList)||_self.branchList[$('.org_hos option:selected').attr('id')]==undefined){
			$('.org_branch').addClass('org_hide');
			dtd.resolve();
			return dtd.promise();
		}
		$('.org_branch').removeClass('org_hide');
		$('.org_branch').append(`<option id="0">请选择</option>`);
		data.forEach((item,index)=>{
			let optionNode=`
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
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		let data = {
			isAll:2,
			orderType:1,
			startDate:$('input[name="daterange-start"]').val(),
			endDate:$('input[name="daterange-end"]').val(),
		}
		data['orgId']=$('.org_hos option:selected').attr('id')||0;
		data['branchId']=$('.org_branch  option:selected').attr('id')||0;
		httpUtilObj.ajax({
			url: '/adminjson/SAASExpenditureStatisticsJG',
			params: data
		}).then((res)=>{
			_self.refreshTemmlate(res.body);
		})
	};
	_self.refreshTemmlate=function(data){
		var getListHtml = template('consumeTemplate', data);
		$("#incomeListContent").empty().html(getListHtml);
		_self.refreshBind();
	}
	//更新后的bind事件
	_self.refreshBind = function () {
		$('body').off('click','.income_open').on('click','.income_open',function(){
			let startDate=$(this).attr('startDate');
    		let endDate=$(this).attr('endDate');
    		let title="收入明细"+startDate+'-'+endDate;
    		let data = {
    			endDate:endDate,
    			startDate:startDate,
    			orderType:1,
    			isAll:2,
    			companyId:$(this).attr('companyId'),
    			orgId:$(this).attr('orgId'),
    			branchId:$(this).attr('branchId'),
			};
    		let order_link="templates/incomeOrg_detail.html";
    		top.tm.addTab(title,order_link,data);
		});
		$('body').off('click','.hgRebateFee_open').on('click','.hgRebateFee_open',function(){
			let startDate=$(this).attr('startDate');
    		let endDate=$(this).attr('endDate');
    		let title="优惠明细"+startDate+'-'+endDate;
    		let data = {
    			orderType:1,
    			endDate:endDate,
    			startDate:startDate,
    			companyId:$(this).attr('companyId'),
    			orgId:$(this).attr('orgId'),
    			branchId:$(this).attr('branchId'),
    			type:$(this).attr('type'),
			};
    		let order_link="templates/income_rebateFee.html";
    		top.tm.addTab(title,order_link,data);
		})
		//固定表头的方法--传入固定的table
		commonFunc.staticTable($('.dynamic-table'));
	};
	_self.bind();
})(consume_org)
