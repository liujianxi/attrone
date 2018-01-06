var commonFunc=commonFunc||{};
(function(_self){
	//固定表头
	_self.staticTable=function(tableNode){//要固定的tableNode
		let offTop=tableNode.offset().top;//80.5
		let cloneBox=$('<div class="static-table"></div>');
		$('.static-table').remove();
		let count=0;
		let parentNode=tableNode.closest('div');
		$(window).off('scroll').on('scroll',function(){
			let windowTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(windowTop>=offTop){
				count++;
				if(count==1){
					let cloneThead=tableNode.clone();
					cloneBox.appendTo(parentNode);
					cloneBox.append(cloneThead);
					cloneThead.find('tbody').empty();
					cloneBox.css({
						'position':'fixed',
						'top':0,
						'left':0,
						'width':'100%',
						'padding':'0 15px',
						'background':'white',
					});
					if(cloneThead.find('.pop-infos').length){
						$('.pop-infos').popover({
							'trigger':'hover',
						});
					}
				}
			}else{
				count=0;
				cloneBox.empty();
			}
		})
	};
	//获取时间---小时数
	_self.getMinHourDate=function(){
		$.fn.datetimepicker.dates['zh'] = {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
			daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
			meridiem: ["上午", "下午"],
			//suffix:      ["st", "nd", "rd", "th"],  
			today: "今天"
		};
		$('input[name="daterange-start"]').val(currentOneDay('month'));
		$('input[name="daterange-end"]').val(currentOneDay('current'));
		$('input[name="daterange-start"]').datetimepicker({
			format: 'yyyy-mm-dd hh:ii',
			minView: 'day',
			language: 'zh',
			autoclose: 1,
//			endDate : new Date(),
		}).on('hide',function(){
			let curr=new Date($('input[name="daterange-start"]').val()).getTime();
			let next=new Date($('input[name="daterange-end"]').val()).getTime();
			if(curr>next){
				Toast.error('开始时间不得超过结束时间');
				$('input[name="daterange-start"]').val($('input[name="daterange-end"]').val());
			}
		})
		$('input[name="daterange-end"]').datetimepicker({
			format: 'yyyy-mm-dd hh:ii',
			minView: 'day',
			language: 'zh',
			autoclose: 1,
//			endDate : new Date(),
		}).on('hide',function(){
			let curr=new Date($('input[name="daterange-start"]').val()).getTime();
			let next=new Date($('input[name="daterange-end"]').val()).getTime();
			if(curr>next){
				Toast.error('结束时间不得小于开始时间');
				$('input[name="daterange-end"]').val($('input[name="daterange-start"]').val());
			}
		})
		//popover
		$('.pop-infos').popover({
			'trigger':'hover',
		});
		function currentOneDay(key) {
			let str = new Date();
			let t_year = str.getFullYear();
			let t_month = str.getMonth() + 1 > 9 ? str.getMonth() + 1 : '0' + (str.getMonth() + 1);
			let t_day = str.getDate() > 9 ? str.getDate() : '0' + str.getDate();
			let t_hour=str.getHours()>9?str.getHours():'0'+str.getHours();
			if (key == 'current') {
				return t_year + '-' + t_month + '-' + (t_day+1)+' '+'00:00';
			} else {
				return t_year + '-' + t_month + '-' + t_day+' '+'00:00';
			}
		};
	};
	//导出报表
	_self.exportlxs=function(name,url){
		bootbox.confirm({
			title: "导出",
			message: "<p>信息已导出至报表中心</p><p>文件名为："+name+"</p><p>您可以在报表中心进行下载</p>",
			buttons: {
				confirm: {
					label: '<span xlsUrl="'+url+'">直接下载</span>',
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
})(commonFunc)