var finance=finance||{};
(function(_self){
	var pageSize = 10;
	var paginationInit = false;

	//初始化分页控件
	_self.initPaginations=function(nowPage, count) {
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
	_self.bind=function(){
		var d1, d2;
		function dateString(dt){
		    var dy = dt.getFullYear();
		    var dm = dt.getMonth()+1;
		    var dd = dt.getDate();
		    var dh = dt.getHours();
		   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd+' '+(dh<10?'0'+dh:dh)+':00';
		}
		var dt = new Date();
		dt.setDate(dt.getDate());
		d2 = dateString(dt);
		dt.setDate(dt.getDate()-30);
		d1 = dateString(dt);
		$("#finance-regBeginTime").val(d1);
		$("#finance-regEndTime").val(d2);
        $('input[name="daterange-finance"]').daterangepicker({
			"autoApply": true,
			'timePicker': true,
        	'timePickerIncrement': 60,
        	'timePicker24Hour': true,
			"locale": {
				"format": "YYYY-MM-DD HH:00",
				"separator": " 至 ",
				"applyLabel": "确定",
				"cancelLabel": "取消",
				"fromLabel": "开始",
				"toLabel": "结束",
				"customRangeLabel": "Custom",
				"weekLabel": "W",
				"daysOfWeek": [
					"周日",
					"周一",
					"周二",
					"周三",
					"周四",
					"周五",
					"周六",
				],
				"monthNames": [
					"一月",
					"二月",
					"三月",
					"四月",
					"五月",
					"六月",
					"七月",
					"八月",
					"九月",
					"十月",
					"十一月",
					"十二月"
				],
				"firstDay": 1
			},
			"startDate": d1,
			"endDate": d2
		}, function(start, end, label) {
			console.log(start);
			$("#finance-regBeginTime").val(start.format('YYYY-MM-DD HH:00'));
			$("#finance-regEndTime").val(end.format('YYYY-MM-DD HH:00'));
		});
		_self.initData(1);
		//搜索
		$('#finance-search').off('click').on('click',function(){
			let httpUtilObj = new HttpUtil();
			let data=_self.getKey();
			let pageNo=1;
			httpUtilObj.ajax({
				url: '/adminjson/SAASGetFinanceRecordList',
				params: data
			}).then((res)=>{
				_self.refreshTemplate(res.body);
				paginationInit = false;
				if (!paginationInit) {
					_self.initPaginations(pageNo, res.body.count);
				}
			})
		});
		//导出
		$('#finance-export').off('click').on('click',function(){
			let httpUtilObj = new HttpUtil();
			let data=_self.getKey();
			httpUtilObj.ajax({
				url: '/adminjson/SAASGetFormRecordDownload',
				params: data
			}).then((res)=>{//excelName
				_self.exportlxs(res.body.excelName,res.body.downloadFileUrl);//导出报表
			})
			
		})
	};
	_self.exportlxs=function(name,url){
		bootbox.confirm({
			title: "导出",
			message: "<p>信息已导出至报表中心</p><p>文件名为："+name+"</p><p>是否立即下载？</p>",
			buttons: {
				confirm: {
					label: '<span xlsUrl="'+url+'">确定</span>',
					className: 'btn-xlsUrl btn-success'
				},
				cancel: {
					label: '取消',
					//					className: 'btn-danger'
				}
			},
			callback: function (isConfirm) {
				if (isConfirm) {
					location.href=$('.btn-xlsUrl span').attr('xlsUrl');
				}
			}
		});
	}
	_self.getKey=function(){
		let key=$('#finance-input').val();
		let payType=$('#finance-paytype option:selected').val();
		let status=$('#finance-status option:selected').val();
		let withdrawStatus=$('#finance-result option:selected').val();
		let withdrawStartTime=$('#finance-regBeginTime').val();
		let withdrawEndTime=$('#finance-regEndTime').val();
		let data={
			key:key,
			payType:payType,
			status:status,
			withdrawStatus:withdrawStatus,
			withdrawStartTime:withdrawStartTime,
			withdrawEndTime:withdrawEndTime,
		}
		data['pageSize'] = pageSize;
		data['pageNum'] = 1;
		return data;
	}
	//init财务管理列表
	_self.initData=function(pageNo){
		let httpUtilObj = new HttpUtil();
		let data={
			status:0,//0-待处理，1-已处理,
			pageSize:10,
		}
		data['pageNo'] = pageNo;
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetFinanceRecordList',
			params: data
		}).then((res)=>{
			_self.refreshTemplate(res.body);
			if (!paginationInit) {
				_self.initPaginations(pageNo, res.body.count);
			}
		})
	};
	//更新表格
	_self.refreshTemplate=function(data){
		template.config("escape", false);//识别html标签
		var financeHtml = template('financeTemplate', data);
		$("#financeListContent").empty().html(financeHtml);
		_self.refreshBind();
	};
	//更新后的bind事件
	_self.refreshBind=function(){
		$('#financeListContent .change_noteNO').editable({
			url: '/adminjson/SAASSaveOrUpdateFinanceRecord',
			title:'修改小票单号',
			value:'',
			placement:'right',
			pk:'1',
			params: function (params) {
				params['noteNO']=params['value'];
				params['financeId']=$(this).attr('financeId');
				return JSON.stringify(params);
			},
			validate: function (value) {
				if ($.trim(value) == '') {
					return '请输入正确的小票单号';
				}
			}
		});
		$('#financeListContent .check-finance').off('click').on('click',function(){
			let id=$(this).attr('financeid');
			top.importOnceJS('js-script-finance_rp', "js/app/rp/finance_rp.js");
			top.financeCheck(id).then((res)=>{
				paginationInit = false;
				_self.initData(1);
			})
		})
	}
	//获得日期
	_self.theDay=function(){
		let str=new Date();
		let t_year=str.getFullYear();
		let t_month=str.getMonth()+1>9?str.getMonth()+1:'0'+(str.getMonth()+1);
		let t_day=str.getDate()>9?str.getDate():'0'+str.getDate();
		let t_getHours=str.getHours()>9?str.getHours():'0'+str.getHours();
		return t_year+'-'+t_month+'-'+t_day+' '+t_getHours+':00';
	};
	_self.bind();
})(finance)
