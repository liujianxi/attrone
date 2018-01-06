var extraCard = extraCard || {};
(function (_self) {
	_self.bind = function () {
		_self.initData();
	};
	_self.initData = function () {
		//获取时间
		commonFunc.getMinHourDate();
		_self.initHos().then((res)=>{
			_self.initTemplate('init');
		});
		//搜索
		$('#prc-search').off('click').on('click',function(){
			_self.initTemplate('search');
		})
		$('.org_hos').on('change',_self.initBranch);
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
			orderType:1,
			startTime:$('input[name="daterange-start"]').val(),
			endTime:$('input[name="daterange-end"]').val(),
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderItemPRC',
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
		$('#org-branch').empty();
		$('.selectpicker').selectpicker('refresh');
		if(_self.isEmpty(_self.branchList)||_self.branchList[$('.org_hos option:selected').attr('id')]==undefined){
			$('.org_branch').addClass('org_hide');
			dtd.resolve();
			return dtd.promise();
		}
		$('.org_branch').removeClass('org_hide');
		let data=_self.branchList[$('.org_hos option:selected').attr('id')];
		data.forEach((item,index)=>{
			let optionNode=`
				<option value="${item.id}">${item.branchName}</option>
			`;
			$('#org-branch').append(optionNode);
		});
		$('.selectpicker').selectpicker('refresh');
		$('#org-branch').closest('div.form-group').find('>div').css({'width':'250px'});
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
		let isSelf=$('#prc-search').attr('isself')==0?false:true;
		let data = {
			orderType:1,
			startTime:$('input[name="daterange-start"]').val(),
			endTime:$('input[name="daterange-end"]').val(),
			isSelf:isSelf,
		}
		data['orgId']=$('.org_hos option:selected').attr('id')||0;
		data['branchIds']=$('.selectpicker').selectpicker('val')||[];
		httpUtilObj.ajax({
			url: '/adminjson/SAASTJOrderItemPRC',
			params: data
		}).then((res)=>{
			$('#prcListContent').attr({
				startTime:$('input[name="daterange-start"]').val(),
				endTime:$('input[name="daterange-end"]').val(),
			});
			$('.export').attr({
				orgId:$('.org_hos option:selected').attr('id')||0,
				branchIds:$('.selectpicker').selectpicker('val')||[],
				isSelf:$('#prc-search').attr('isself'),
				startTime:$('input[name="daterange-start"]').val(),
				endTime:$('input[name="daterange-end"]').val(),
			})
			_self.refreshTemplate(res.body);
		})
	};
	_self.refreshTemplate=function(data){
		var getListHtml = template('prcTemplate', data);
		$("#prcListContent").empty().html(getListHtml);
		_self.refreshBind();
	}
	//更新后的bind事件
	_self.refreshBind = function () {
		$('body').off('click', '.prc-fee').on('click', '.prc-fee', function () {
			let startTime = $('#prcListContent').attr('startTime');
			let endTime = $('#prcListContent').attr('endTime');
			let title = $(this).attr('title');
			let order_link = $(this).attr('link');
			let isSelf = $(this).attr('isSelf');
			let orgId = $(this).attr('orgId');
			let branchId = $(this).attr('branchId');
			let data = {
				isSelf: isSelf,
				endTime: endTime,
				startTime: startTime,
				orgId:orgId,
				branchId:branchId,
			};
			top.tm.addTab(title, order_link, data);
		});
		//固定表头的方法--传入固定的table
		commonFunc.staticTable($('.dynamic-table'));
		//导出报表
		let output_flag=true;
		$('.export').off('click').on('click', function () {
			let self=$(this);
			if(!output_flag){
				return false;
			}
			output_flag=false;
			let branch_arr=[];
			if(self.attr('branchIds')&&self.attr('branchIds').split(',').length){
				self.attr('branchIds').split(',').forEach((item)=>{
					branch_arr.push(item);
				})
			}
			let httpUtilObj = new HttpUtil();
			let data={
				endTime: self.attr('endTime'),
				startTime: self.attr('startTime'),
				isSelf: self.attr('isSelf')==0?false:true,
				orgId: self.attr('orgId'),
				branchIds: branch_arr,
			};
			httpUtilObj.ajax({
				url: '/adminjson/SAASGetFormOrderItemPRC',
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
	};
	_self.bind();
})(extraCard)
