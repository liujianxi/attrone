var service = service || {};
(function (_self) {
	_self.pageSize = 10;
	_self.paginationInit = false;
	//初始化分页控件
	_self.initPaginations = function (nowPage, count) {
		//如果记录条目为0则隐藏分页控件
		if (count <= _self.pageSize) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		$("#pagination").pagination(count, {
			'items_per_page': _self.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function (page_index) {
				console.log("callback:" + page_index + "::" + nowPage);
				if (_self.paginationInit) {
					_self.initTemplate(page_index + 1);
				} else {
					_self.paginationInit = true;
				}

			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	};
	_self.bind = function () {
		_self.initData();
	};
	_self.initData = function () {
		_self.initHos().then((res)=>{
			_self.initTemplate(1,'init');
		});
		$('.org_hos').on('change',_self.initBranch);
		//搜索
		$('#service-search').off('click').on('click',function(){
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			_self.paginationInit = false;
			_self.initTemplate();
		})
	};
	_self.initHos=function(){
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrgAndBranch',
		}).then((res)=>{//org_hos--
			let org_data=res.body.orgList;
			_self.branchList=res.body.branchMap;
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
			_self.initBranch().then((res)=>{
				dtd.resolve();
				return dtd.promise();
			})
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
		if(data.length>1){
			$('.org_branch').append(`<option id="0">所有科室</option>`);
		}
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
	_self.initTemplate = function (num=1,str) {
		let httpUtilObj = new HttpUtil();
		let data={};
		if(str=='init'){
			data['status']=-1;
		}else{
			data={
				orgId:$('.org_hos option:selected').attr('id')||0,
				branchId:$('.org_branch  option:selected').attr('id')||0,
				pageSize:_self.pageSize,
				pageNo:num,
				startTime:$('input[name="daterange-start"]').val()||'',
				endTime:$('input[name="daterange-end"]').val()||'',
				status:$('.service-status option:selected').val()||'-1',
			};
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderPraiseAudit',
			params: data
		}).then((res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			_self.refreshTemmlate(res.body);
			if (!_self.paginationInit) {
				_self.initPaginations(num, res.body.count);
			}
		})
	};
	_self.refreshTemmlate=function(data){
		var getListHtml = template('serviceListTemplate', data);
		$("#serviceListContent").empty().html(getListHtml);
		_self.refrenshBind();
	}
	_self.refrenshBind=function(){
		$('.entrance-click').off('click').on('click',function(){
			let orderId=$(this).attr('orderid');
			let pageNo=$(this).attr('pageno');
			let flag=true;//通过
			if($(this).hasClass('service-pass')){
				flag=true;
			}else{
				flag=false;//未通过
			}
			let tis=flag?'通过的评论将展示给护工，督导以及相关人员查看，是否通过该评论？':'不通过的评论将在前端屏蔽，无法查看，是否确定不通过该评论？'
			bootbox.confirm({
				title: flag?"通过":'不通过',
				message: tis,
				buttons: {
					confirm: {
						label: '确定',
						//					className: 'btn-success'
					},
					cancel: {
						label: '取消',
						//					className: 'btn-danger'
					}
				},
				callback: function (isConfirm) {
					if (isConfirm) {
						let httpUtilObj = new HttpUtil();
						let params ={
							orderId:orderId,
							auditStatus:flag?1:2,
						};
						httpUtilObj.ajax({
							url: '/adminjson/SAASUpdateOrderPraiseAudit',
							params: params
						}).then((res)=>{
							Toast.success("操作成功！");
							_self.initTemplate(pageNo);
						});
					}
				}
			});
		})
	}
	_self.bind();
})(service)
