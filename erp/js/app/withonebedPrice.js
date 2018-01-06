var bed = bed || {};
(function (_self) {
	_self.bind = function () {
		_self.initData();
	};
	_self.initData = function () {
		_self.initHos().then((res)=>{
			_self.initTemplate('hosInit');
		});
		//搜索
		$('#bed-search').off('click').on('click',function(){
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			_self.initTemplate('search');
		})
		$('.org_hos').on('change',_self.initBranch);
	};
	//init财务管理列表
	_self.initHos=function(){
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		let data = {
			status:$('.service-status option:selected').val(),
			beginTime:$('input[name="daterange-start"]').val(),
			endTime:$('input[name="daterange-end"]').val(),
			orgId:0,
			branchId:0,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetWithonebedPriceList',
			params:data
		}).then((res)=>{//org_hos--
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			let orgBranchData=res.body.rightJson;
			let org_data=orgBranchData.orgList;
			_self.branchList=orgBranchData.branchMap;
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
		},(res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
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
	_self.initTemplate = function (str) {
		let httpUtilObj = new HttpUtil();
		let data = {
			status:$('.service-status option:selected').val(),
			beginTime:$('input[name="daterange-start"]').val(),
			endTime:$('input[name="daterange-end"]').val(),
			orgId:$('.org_hos option:selected').attr('id')||0,
			branchId:$('.org_branch  option:selected').attr('id')||0,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetWithonebedPriceList',
			params: data
		}).then((res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			_self.refreshTemplate(res.body);
		},(res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
		})
	};
	_self.refreshTemplate=function(data){
		var getListHtml = template('bedListTemplate', data);
		$("#bedListContent").empty().html(getListHtml);
		_self.refreshBind(data.count);
	}
	_self.refreshBind = function (count) {
		$('.bed-info i').html(count);
		$('.popover-rel').popover({
			'trigger':'hover',
		});
		$('.bed-detail').off('click').on('click',function(){
			let data = {
    			time:$(this).attr('time'),
    			orgId:$(this).attr('orgId'),
    			branchId:$(this).attr('branchId'),
    			status:$(this).attr('status'),
			};
			let title=$(this).attr('title');
			let entrance_link=$(this).attr('link');
			top.tm.addTab(title,entrance_link,data);
		});
		//审核
		$('.bed-comment').off('click').on('click',function(){
			let time=$(this).attr('time');
			let comment_params = {
    			time:time,
    			orgId:$(this).attr('orgId'),
    			branchId:$(this).attr('branchId'),
			};
			let tis='是否确定<i>'+time+'</i>日陪人床租借数量无误？<p style="color:red;">ps：数量不对请到明细表进行修正。</p>'
			bootbox.confirm({
				title: "系统提示",
				message: tis,
				buttons: {
					confirm: {
						label: '核实无误',
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
						let params =comment_params;
						httpUtilObj.ajax({
							url: '/adminjson/SAASUpdateWithonebedPrice',
							params: params
						}).then((res)=>{
							Toast.success('审核成功！');
							_self.initTemplate('init');
						});
					}
				}
			});
		});
		//备注
		$('.bed-remark').off('click').on('click',function(){
			let time=$(this).attr('time');
			let title=$(this).attr('title');
			let remark=$(this).attr('remark');
			let comment_params = {
    			time:time,
    			orgId:$(this).attr('orgId'),
    			branchId:$(this).attr('branchId'),
			};
			let tis='<textarea class="text-remark" style="width:100%;height:100px;">'+remark+'</textarea>'
			bootbox.confirm({
				title: title,
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
						let params =comment_params;
						let text_remark=$('.text-remark').val();
						if(!text_remark){
							Toast.error('请填写备注！');
							return false;
						}
						params['auditRemark']=text_remark;
						httpUtilObj.ajax({
							url: '/adminjson/SAASUpdateWithonebedPrice',
							params: params
						}).then((res)=>{
							Toast.success('操作成功！');
							_self.initTemplate('init');
						});
					}
				}
			});
		});
	};
	_self.bind();
})(bed)
