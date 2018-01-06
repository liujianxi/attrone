var bed = bed || {};
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
		//搜索
		$('#extra-search').off('click').on('click',function(){
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			_self.paginationInit = false;
			_self.initTemplate();
		})
		$('.org_hos').on('change',_self.initBranch);
	};
	//init财务管理列表
	_self.initHos=function(){
		let dtd = $.Deferred();
		let httpUtilObj = new HttpUtil();
		let data={
			'status':-1,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetExtraList',
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
		data={
			pageSize:_self.pageSize,
			pageNo:num,
			status:$('.extra-status option:selected').val()||'-1',
			orgId:$('.org_hos option:selected').attr('id')||0,
			branchId:$('.org_branch  option:selected').attr('id')||0,
			extraNO:$('.extra-input').val(),
		};
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetExtraList',
			params: data
		}).then((res)=>{
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			_self.refreshTemmlate(res.body);
			if(res.body.filePath){
				$('.downTemp').attr('href',res.body.filePath);
			}
			if (!_self.paginationInit) {
				_self.initPaginations(num, res.body.count);
			}
		})
	};
	_self.refreshTemmlate=function(data){
		var getListHtml = template('extraListTemplate', data);
		$("#extraListContent").empty().html(getListHtml);
		_self.refreshBind(data.count);
	}
	_self.refreshBind = function (count) {
		//当前的门禁卡数
		$('.extra-filter i').html(count);
		let import_flag=true;
		$('.extra-import').off('click').on('click',function(){//批量导入
			if(!import_flag){
				return false;
			}
			import_flag=false;
			$('#importUpload').click();
			setTimeout(function(){
				import_flag=true;
			},1000);
		});
		$('input[name=importUpload]').off('change').on('change',function(){//批量导入
			var fileName=$('input[name=importUpload]').val();
			console.log(fileName);
			if(fileName==''){
				return false;
			}
			var id = "form"+new Date().getTime();
			var form = $('<form id="'+id+'" name="'+id+'" action="#"  method="post" enctype="multipart/form-data" style="display:none;"></form>');
		    $('input[name=importUpload]').clone().appendTo(form);
		    $('body').append(form);
		    var formData = new FormData(form[0]);
		    $.ajax({
		        type: "post",
		        data: formData,
		        url: '/fileuploadexcel?type=excel',
		        contentType: false,
		        processData: false,
		        dataType:'json',
		    }).done(function (data) {
		    	$('input[name=importUpload]').val('');
		    	_self.refrenshImport(data);
		    }).fail(function (data) {
		        console.log(data);
		    }).always(function(){
		      	form.remove();
		    });
		})
		//添加门禁卡
		$('.extra-add').off('click').on('click',function(){
			top.importOnceJS('js-script-extramanage', "js/app/rp/extramanage.js");
			let data={
				str:'add',
			}
			top.extraManageAdd(data).then((res)=>{
				$('#order-mask-bg').css('display','block');
				$('#order-mask').css('display','block');
				_self.initTemplate();
			})
		})
		//编辑门禁卡
		$('.del-extra').off('click').on('click',function(){
//			let data={
//				str:'edit',
//				branchId:$(this).attr('branchId'),
//				orgId:$(this).attr('orgId'),
//				extraNO:$(this).attr('extraNO'),
//				serialNumber:$(this).attr('serialNumber'),
//				status:$(this).attr('status'),
//				id:$(this).attr('id'),
//			}
//			top.importOnceJS('js-script-extramanage', "js/app/rp/extramanage.js");
//			top.extraManageAdd(data).then((res)=>{
//				$('#order-mask-bg').css('display','block');
//				$('#order-mask').css('display','block');
//				_self.initTemplate();
//			})
			let data={
				extraId:$(this).attr('id'),
			}
			bootbox.confirm({
				title: "提示",
				message: '<p style="text-align:center;">是否删除此卡？</p><p style="text-align:center;color:red;">删除后将无法租借，需在【门禁卡管理】中重新添加或导入</p>',
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
						httpUtilObj.ajax({
							url: '/adminjson/SAASDeleteExtra',
							params: data
						}).then((res)=>{
							Toast.success('删除成功！');
							$('#order-mask-bg').css('display','block');
							$('#order-mask').css('display','block');
							_self.initTemplate();
						})
					}
				}
			});
		});
		$('.extra-input').off('keydown').on('keydown',(res)=>{
			if((event.keyCode || event.which)==13) {
				event.preventDefault();//阻止浏览器默认行为
				$('#extra-search').click();
			}
		})
	};
	_self.refrenshImport=function(data){//批量导入成功后
		$('body').find('.btn-import').css('display','none');
		let tis=`
			<p>成功导入门禁卡<i style="color:red">${data.succeedNumber}</i>张，失败 <i style="color:red">${data.errorNumber}</i> 张：</p>
			<textarea style="width:100%;height:100px;">${data.extranStr}</textarea>
			<p>失败原因：<i style="color:red">${data.extranStatus}</i></p>
		`;
		bootbox.confirm({
			title: "门禁卡导入",
			message: tis,
			buttons: {
				confirm: {
					label: '关闭',
					//					className: 'btn-success'
				},
				cancel: {
					label: '取消',
					className: 'btn-import'
				}
			},
			callback: function (isConfirm) {
				_self.paginationInit = false;
				_self.initTemplate(1);
			}
		});
	}
	_self.bind();
})(bed)
