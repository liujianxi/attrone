var order_date = order_date || {};
(function (_self) {
	_self.bind=function(){
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
		$('input[name="daterange-start"]').val(_self.theDay('month'));
		$('input[name="daterange-end"]').val(_self.theDay('current'));
		$('input[name="daterange-start"]').datetimepicker({
			format: 'yyyy-mm-dd',
			minView: 'month',
			language: 'zh',
			autoclose: 1,
			defaultViewDate: {year:2000, month:0, day:1},
			endDate : new Date(),
		}).on('hide',function(){
			let curr=new Date($('input[name="daterange-start"]').val()).getTime();
			let next=new Date($('input[name="daterange-end"]').val()).getTime();
			if(curr>next){
				Toast.error('开始时间不得超过结束时间');
				$('input[name="daterange-start"]').val($('input[name="daterange-end"]').val());
			}
		})
		$('input[name="daterange-end"]').datetimepicker({
			format: 'yyyy-mm-dd',
			minView: 'month',
			language: 'zh',
			autoclose: 1,
			endDate : new Date(),
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
	}
	//获得日期
	_self.theDay = function (key) {
		let str = new Date();
		let t_year = str.getFullYear();
		let t_month = str.getMonth() + 1 > 9 ? str.getMonth() + 1 : '0' + (str.getMonth() + 1);
		let t_day = str.getDate() > 9 ? str.getDate() : '0' + str.getDate();
		if (key == 'current') {
			return t_year + '-' + t_month + '-' + t_day;
		} else {
			return t_year + '-' + t_month + '-01';
		}
	};
	_self.bind();
})(order_date)