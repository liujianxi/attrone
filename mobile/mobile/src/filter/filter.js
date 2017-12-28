
export function medicareFilter(type){
	var medicareArr = ['广州市职工医保','城镇医保','公费医疗','新农合医保','其他类型'];
	return medicareArr[type - 1];
}

export function howLong(date){
	//将'2017-03-29'格式化成可识别的'2017/03/29'字符串
	date = date.replace(/-/g,'/');
	//当前时间
	var now = new Date();	
	//指定时间
	var that = new Date(date);	
	//获取真实月份
	var month = zeroFill(that.getMonth() + 1);
	//获取天数
	var day = zeroFill(that.getDate());
	//换算时查
	var ms = Math.floor ((now - that) / 1000 / 60 / 60);
	
	if(ms > 24 && ms < 48){
		return '昨天 ' + that.toLocaleTimeString();
	}else if(ms > 48){
		return month + '-' + day;
	}else{
		return ms + ' 小时前';					
	}
}

export function physicalStateFilter(state){
	var physicalStateStr = ['自理','半失能','失能'];
	return physicalStateStr[state - 1];
}

export function zeroFill(date){
	//如果月份是个位数，则返回的字符串前缀加0
	return (parseInt(date) < 10)?('0'+date):date;
}

export function howFar(distance){
	var realNum = parseFloat(distance) / 1000;
	if(realNum < 0.1){
		return '<0.1km'
	}else if(realNum > 30||distance==undefined){
		return '>30km'
	}else{
		return realNum + 'km'
	}
}

export function sexFilter(sexNumer){
	var sexStr = ['未设置','男','女'];
	return sexStr[sexNumer];
}
export function numberCountFilter(num,n=3){
	num=String(num);
	if(num.length>3){
		let arr=num.split('');
		return arr[0]+arr[1]+arr[2];
	}else{
		return num;
	}
}