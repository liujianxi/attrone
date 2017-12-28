

//获取元素节点的某个值
			/**
			 * 
			 * @param {Object} 需要获取属性值的元素节点，oBox
			 * @param {Object} 需要获取的属性，“left”
			 */
			function getStyleAttr(obj,attr){
				if(window.getComputedStyle){
					return getComputedStyle(obj,null)[attr];
				}
				return obj.currentStyle[attr];
			}
			

//封装一下动画(startMove)代码,只能修改一个属性
//		function startMove(obj,attr,iTarget,fn){
//			//关闭之前的定时器
//			clearInterval(obj.timer);
//			//再开启新的定时器
//			obj.timer = setInterval(function(){
//				
//				/**
//				 * a.能够实现，left，top，height，width动画 px
//				 * b.还能够实现透明度动画     
//				 */
//			//1.获取当前值
//			var current = 0;
//			if(attr=="opacity"){//透明度
//				current = parseFloat(getStyleAttr(obj,attr))*100;
//				current = Math.round(current);
//				
//			}else{//left,top,height,width
//				current = parseInt(getStyleAttr(obj,attr));
//			}
//			
//			
//			//2.给一个速速
//			var iSpeed = (iTarget-current)/8;
//			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
//			
//			
//			//3.判断是否到达边界，目标值
//			if(current==iTarget){
//				//动画结束
//				clearInterval(obj.timer);
//				//回调
//				if(fn){
//					fn();
//				}
//				return ;//退出函数，后面的代码不会执行
//			}
//			
//			//4.运动
//			if(attr == "opacity"){//透明度
//				obj.style.opacity = (current + iSpeed)/100;
//				obj.style.filter  = "alpha(opacity="+(current+iSpeed)+")";
//				
//			}else{//left,top,height,width
//				obj.style[attr] = current + iSpeed + "px";
//			}
//				
//			},30);
//			
//		}

	/**
	 * 
	 * @param {Object} 需要改变的元素对象
	 * @param {Object} 一个，或者多个属性组成的对象{left:300,top:400,width:100}
	 * @param {Object} 回调函数
	 */
    function startMove(obj,json,fn){
    	//关闭之前的定时器
    	clearInterval(obj.timer);
    	
    	//再开辟新的定时器
    	obj.timer = setInterval(function(){
    		//默认所有的属性都到达了目标值，表示可以停止运动了
    		var bStop = true;
    		
    		//遍历json对象，知道要修改多少个属性
    		for(var attr in json){
    			//attr :属性名称
    			//iTarget:对应这个属性名的值
    			//计算出来目标值
    			var iTarget = json[attr];
    			
    			//1.获取当前值
    			var current = 0;
    			
    			if(attr == "opacity"){//透明度
    				
    				current = parseFloat(getStyleAttr(obj,attr))*100;
    				current = Math.round(current);
    				
    			}else{//left,top,width,heigh
    				current = parseInt(getStyleAttr(obj,attr));
    				
    			}
    			
    			//2.给一个速度
    			var iSpeed = (iTarget - current)/8;
    			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    			
    			//3.判断临界值,判断是否所有属性都到达了目标值，是否有为到达目标值的属性
    			if(current != iTarget){
    				bStop = false;//表示不能停止当前运动，定时器不能关闭
    				
    			}
    			
    			//4.运动
    			if(attr == "opacity"){//透明度
    				obj.style.opacity = (current + iSpeed)/100;
    				obj.style.filter  = "alpha(opacity="+(current + iSpeed)+")";
    			}else{//left,top,width,heigh
    				obj.style[attr] = current + iSpeed + "px";
    			}
    			
    		}
    		
    		//如果所有的属性都到达了目标值，则可以停止运动了，可以关闭定时器了
    		//并且还可以回调
    		if(bStop){
    			clearInterval(obj.timer);
    			//回调
    			if(fn){
    				fn();
    			}
    		}
    		
    	},30);
    	
    }
