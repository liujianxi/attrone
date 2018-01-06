var service = service || {};
(function (_self) {
	_self.pageSize = 10;
	_self.paginationInit = false;
	//初始化分页控件
	_self.initPaginations = function (nowPage, count) {
		//如果记录条目为0则隐藏分页控件
		_self.count++;
		let pNode=$('.form-box').eq($('.operation-form li span.selected').attr('value')-1).find('.pagination')
		if (count <= _self.pageSize) {
			pNode.hide();
		} else {
			pNode.show();
		}
		pNode.pagination(count, {
			'items_per_page': _self.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function (page_index) {
				if (_self.paginationInit) {
					_self.initTemplate(page_index + 1,'page');
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
		_self.initTime();//获得筛选时间
		_self.initTemplate(1,'init');
		//搜索
		$('.form-search').off('click').on('click',function(){
			$('#order-mask-bg').css('display','block');
			$('#order-mask').css('display','block');
			_self.paginationInit = false;
			_self.initTemplate();
		})
	};
	_self.isEmpty=function(obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	}
	//更新表格
	_self.initTemplate = function (num=1,str) {
		console.log(str);
		let httpUtilObj = new HttpUtil();
		let data={};
		data={
			key : $("#fileName").val(),
			startTime : $("#startTime").val(),
			endTime : $("#endTime").val(),
			type : 10,
			pageNo : num,	//请求页
			pageSize : _self.pageSize	//每页记录数
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetFormRecordList',
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
		template.config("escape", false);//识别html标签
		let d_Html = template('createFormListTemplate', data);
		$("#createFormListContent").empty().html(d_Html);
		_self.refrenshBind();
	}
	_self.refrenshBind=function(){
		$('.with-input').off('click').on('click',function(){
			if($(this).find('input').prop('checked')){
				$(this).find('input').prop('checked',false);
			}else{
				$(this).find('input').prop('checked',true);
			}
		})
		$('.with-input input').off('click').on('click',function(){
			if($(this).prop('checked')){
				$(this).prop('checked',false);
			}else{
				$(this).prop('checked',true);
			}
		});
		$('body').on('click', ".exportDownload",function(){
			var triggerDelay = 100;
	        var removeDelay = 1000;
	        var url_arr=[];
	        if(!$('input[name="filePath"]:checked').length){
	        	Toast.error('请选择需要下载的报表！');
	        	return false;
	        }
			$('input[name="filePath"]:checked').each(function(){
				url_arr.push($(this).val());
			});
			url_arr.forEach(function(item,index){
				_self._returnIFrame(item, index * triggerDelay, removeDelay);
			})
		});
	}
	_self._returnIFrame=function(url, triggerDelay, removeDelay) {
        //动态添加iframe，设置src，然后删除
        setTimeout(function() {
            var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
            frame.attr('src', url);
            $(document.body).after(frame);
            setTimeout(function() {
                frame.remove();
            }, removeDelay);
        }, triggerDelay);
    }
	_self.initTime=function() {//获得筛选时间
		var d1, d2;
		function dateString(dt){
		    var dy = dt.getFullYear();
		    var dm = dt.getMonth()+1;
		    var dd = dt.getDate();
		   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
		}
		var dt = new Date();
		dt.setDate(dt.getDate());
		d2 = dateString(dt);
		dt.setDate(dt.getDate()-30);
		d1 = dateString(dt);
		$("#startTime").val(d1);
		$("#endTime").val(d2);
	    $('input[name="daterange-form"]').daterangepicker({
			"autoApply": true,
			"locale": {
				"format": "YYYY-MM-DD",
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
			$("#startTime").val(start.format('YYYY-MM-DD'));
			$("#endTime").val(end.format('YYYY-MM-DD'));
		});
	}
	_self.bind();
})(service)
