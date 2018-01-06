//结束订单--附加服务
	function extraService_orderDetail_no(id,str){
		let extraService_Html = '<div id="extraService" class="r_panel end-order">' +
		'   <div class="panel-header">' +
		'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'       <h4 class="modal-title">确定附加服务次数</h4>' +
		'   </div>' +
		'	<div class="panel-center"><p class="panel-infos">已支付的附加服务不允许调减</p>' +
		'	<div class="panel-content">' +
		'		<div class="content-text">' +
				'			<div class="hospital-time"><span>预估出院时间：</span><div class="li-right"><input class="charged-time" name="daterange-order-details" type="text" placeholder="请选择时间" /></div></div>'+
		'			<ul class="service-item">' +
//		'				<li><span>　化疗服务　：</span><div class="li-right"><i>-</i><i><input type="number" value=3 /></i><i>+</i></div></li>'+
//		'				<li><span>　小手术服务：</span><div class="li-right"><i>-</i><i><input type="number" value=5 /></i><i>+</i></div></li>'+
//		'				<li><span>　陪人床天数：</span><div class="li-right"><i>-</i><i><input type="number" value=2 /></i><i>+</i></div></li>'+
		'			</ul>'+
//		'			<p class="totalfee">　订单总费用：<i><em></em>元</i></p>'+
		'			<input type="hidden" id="daterange-order">'+
		'  		</div>' +
		'   </div>' +
		'	</div>' +
		'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>' +
		'	</div>' +
		'</div>';
		let extraService_panel = new RPModalPanel('extraService', extraService_Html);
		extraService_panel.show();
		let extraService_data='';
		if(str=='endOrder'){//结束订单
			$('#extraService .hospital-time').css('display','block');
			$('#extraService .modal-title').html('确定附加服务次数');
			$('#extraService .footer-sure').html('下一步');
		}else{//调整附加服务
			$('#extraService .hospital-time').css('display','none');
			$('#extraService .modal-title').html('调整附加服务次数');
			$('#extraService .footer-sure').html('确定');
		}
		//根据时间进行优惠选择
		$.fn.datetimepicker.dates['zh'] = {  
            days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
            daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
            daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
            months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
            monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
            meridiem:    ["上午", "下午"],  
            //suffix:      ["st", "nd", "rd", "th"],  
            today:       "今天"  
        }; 
		$('input[name="daterange-order-details"]').datetimepicker({
			format: 'yyyy-mm-dd hh:ii',
			minView:'hour',
			maxView:'day',
			startView:0,
			language:  'zh',
			autoclose:1,
			minuteStep:1,
		}).on('changeDate', function(ev){
//		    changeCheapItem(ev.date.getHours(),'extraService');//根据时间获得优惠金额
		});
		let httpUtilObj = new HttpUtil();
		let data={
			orderId:id,
		}
		console.log(data);
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderPriceInvert',
			params: data
		}).then((res)=>{
			extraService_data=res.body;
			$('input[name="daterange-order-details"]').val(extraService_data.dischargedTime);
			let service_data=res.body.commonPriceVOList;
			let ulNode=$('#extraService .service-item');
			ulNode.empty();
			if(service_data.length){
				service_data.forEach(function(item,index){
					let liNode=$('<li priceid="'+item.price.priceId+'"><span>'+item.price.serviceItem+'</span><div class="li-right"><i><input type="number" value="'+item.number+'" /></i><i numbermin="'+item.payNumber+'">-</i><i>+</i></div><p>'+item.priceFeeStr+'</p></li>');
					ulNode.append(liNode);
				});
			}
			extraService_init(service_data.payNumber,id,str);
		})
	}
	function theDay(status){
		let str=new Date();
		let dtd = $.Deferred();
		let t_year=str.getFullYear();
		let t_month=str.getMonth()+1>9?str.getMonth()+1:'0'+(str.getMonth()+1);
		let t_day=str.getDate()>9?str.getDate():'0'+str.getDate();
		let t_getHours=str.getHours()>9?str.getHours():'0'+str.getHours();
		let t_getMinutes=str.getMinutes()>9?str.getMinutes():'0'+str.getMinutes();
		if(status=='date'){
			if(parseFloat(t_getMinutes)-parseFloat(30)>0){
				let datetime=t_year+'-'+t_month+'-'+t_day+' '+(parseInt(t_getHours)+1)+':00';
				dtd.resolve(datetime);
				return dtd.promise();
			}else{
				let datehour=t_year+'-'+t_month+'-'+t_day+' '+t_getHours+':00';
				dtd.resolve(datehour);
				return dtd.promise();
			}
		}else{
			let hours=0;
			if(parseFloat(t_getMinutes)-parseFloat(30)>0){
				hours=parseInt(t_getHours)+1;
			}else{
				hours=parseInt(t_getHours);
			}
			dtd.resolve(hours);
			return dtd.promise();
		}
	}
	function extraService_init(count,id,str){
		$('#extraService .service-item li .li-right i:nth-child(2)').on('click',function(){
			let num=$(this).closest('li').find('i:nth-child(1) input').val();
			let min_number=$(this).attr('numbermin')
			if(num<=min_number||num<=count){
				return false;
			}
			num--;
			$(this).closest('li').find('i:nth-child(1) input').val(num);
		});
		$('#extraService .service-item li .li-right i:nth-child(3)').on('click',function(){
			let num=$(this).closest('li').find('i:nth-child(1) input').val();
			num++;
			$(this).closest('li').find('i:nth-child(1) input').val(num);
		})
		$('#extraService .footer-sure').on('click',function(){
			var liNode=$('#extraService .service-item li');
			let service_arr=[],data;
			let charge_time=$('#extraService .charged-time').val();
//			for(var i = 0; i<liNode.length; i++){
//				
//			}
			liNode.each(function(i,v){
				let arr={
						key:$(v).attr('priceid'),
						value:$(v).find('.li-right i:nth-child(1) input').val(),
				}
				service_arr.push(arr);
			});
			let t_hgRebateType=$('.cheap-select li.selected').attr('hgRebateType');
			if(str=='endOrder'){//结束订单
				data={
					orderId:id,
					priceMap:service_arr,
					dischargedTime:charge_time,
				}
				let httpUtilObj = new HttpUtil();
				httpUtilObj.ajax({
					url: '/adminjson/SAASAddOrderPriceItemReviseNew',
					params: data
				}).then((res)=>{
					if(res.errorCode==0){
						extraService_endOrder(id,charge_time);//结束订单----下一步
					}
				})
			}else{//调整
				data={
					orderId:id,
					priceMap:service_arr,
				}
				adjustOrder(data);
			}
			
		})
	}
	function adjustOrder(data){
		httpUtilObj.ajax({
			url: '/adminjson/SAASAddOrderPriceItemReviseNew',
			params: data
		}).then((res)=>{
			Toast.success("操作成功");
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
		},(res)=>{
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
		})
	}
	function checkTypeBox(data){
		bootbox.confirm({
			title: "结束订单",
			message: '一旦结束订单，将会停止计费，是否结束？',
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
					endOrderDetail(data);
				}
			}
		});
	}
function endOrderDetail(data){
	let httpUtilObj = new HttpUtil();
	httpUtilObj.ajax({
		url: '/adminjson/SAASUpdateOrFinishOrderHgRebateFee',
		params: data
	}).then((res)=>{
		Toast.success("操作成功");
		$('#rp-wrapper').empty();
		$('#transparent-mask').hide();
		$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
	},(res)=>{
		$('#rp-wrapper').empty();
		$('#transparent-mask').hide();
	})
}
//结束订单--下一步
function extraService_endOrder(id,time){
		let extraService_endOrder_Html = '<div id="extraService-endOrder" class="r_panel end-order">' +
		'   <div class="panel-header">' +
		'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'       <h4 class="modal-title">确定附加服务次数</h4>' +
		'   </div>' +
		'	<div class="panel-center"><p class="panel-infos">已支付的附加服务不允许调减</p>' +
		'	<div class="panel-content">' +
		'		<div class="content-text">' +
		'			<div class="hospital-time"><span>预估出院时间：</span><div class="li-right"><input disabled=disabled class="charged-time" name="daterange-order-details" type="text" placeholder="请选择时间" /></div></div>'+
		'			<ul class="service-item">' +
		'			</ul>'+
		'  		</div>' +
		'   </div>'+
		'	<div class="extra-cheap"><p class="panel-infos">优惠选择</p>'+
		'	<div class="panel-content">'+
		'		<p><span class="order-basic">基础服务费用：<i></i>元</span><span class="order-extra">附加服务费用：<i></i>元</span><span class="order-totalfee">总费用：<i></i>元</span></p>'+
		'		<ul class="cheap-select">'+
		'			<li hgRebateType="0" class="selected"><em></em><span>无优惠</span></li>'+
		'			<li hgRebateType="1" class="extra_staff"><em></em><span>职工优惠</span><i>优惠<strong>100.00</strong>元</i></li>'+
		'			<li hgRebateType="2" class="extra_relation"><em></em><span>职工家属优惠</span><i>优惠<strong>80.00</strong>元</i></li>'+
		'			<li hgRebateType="3" class="extra_auto"><em></em><span>自定义优惠</span><p><input type="text" placeholder="请输入金额"/></p></li>'+
		'		</ul>'+
		'		<div class="extra_auto_text"><textarea placeholder="请输入优惠理由"></textarea></div>'+
		'	</div></div>'+
		'	</div>' +
		'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>' +
		'	</div>' +
		'</div>';
		let extraService_endOrder_panel = new RPModalPanel('extraService-endOrder', extraService_endOrder_Html);
		extraService_endOrder_panel.show();
		$('#extraService-endOrder .charged-time').val(time);//选择好的出院时间
		let httpUtilObj = new HttpUtil();
		let data={
			orderId:id,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderPriceInvert',
			params: data
		}).then((res)=>{
			let extraService_data=res.body;
			let service_data=res.body.commonPriceVOList;
			let ulNode=$('#extraService-endOrder .service-item');
			changeCheapItem(new Date(time).getHours(),extraService_data);//获得上午还是下午 根据时间获得优惠金额
			if(extraService_data.hasRebate){
				$('#extraService-endOrder .extra_auto').css('display','block');
			}else{
				$('#extraService-endOrder .extra_auto').css('display','none');
			}
			ulNode.empty();
			if(service_data.length){
				service_data.forEach(function(item,index){
					let liNode=$('<li priceid="'+item.price.priceId+'"><span>'+item.price.serviceItem+'</span><div class="li-right"><i><input disabled=disabled type="number" value="'+item.number+'" /></i><i>-</i><i>+</i></div><p>'+item.priceFeeStr+'</p></li>');
					ulNode.append(liNode);
				});
			}
			$('.panel-content>p .order-basic i').html(extraService_data.basicFee||'0.00');
			$('.panel-content>p .order-extra i').html(extraService_data.extraFee||'0.00');
			$('.panel-content>p .order-totalfee i').html(extraService_data.fee||'0.00');
		})
		//优惠方式的选择
		$('.cheap-select li').off('click').on('click',function(){
			for(let i=0;i<$('.cheap-select li').length;i++){
				$('.cheap-select li').eq(i).removeClass('selected');
			}
			$(this).addClass('selected');
			if($(this).attr('hgrebatetype')==3){
				$('#extraService-endOrder .extra_auto p').css('display','block');
				$('#extraService-endOrder .extra_auto p').find('input').focus();
				$('#extraService-endOrder .extra_auto_text').css('display','block');
			}else{
				$('#extraService-endOrder .extra_auto p').css('display','none');
				$('#extraService-endOrder .extra_auto_text').css('display','none');
			}
		})
		$('#extraService-endOrder .footer-sure').on('click',function(){
			var liNode=$('#extraService .service-item li');
			let service_arr=[],data;
			let charge_time=$('#extraService .charged-time').val();
			liNode.each(function(i,v){
				let arr={
						key:$(v).attr('priceid'),
						value:$(v).find('.li-right i:nth-child(1) input').val(),
				}
				service_arr.push(arr);
			});
			let t_hgRebateType=$('.cheap-select li.selected').attr('hgRebateType');
			data={
				orderId:id,
				priceMap:service_arr,
				dischargedTime:charge_time,
			}
			if(t_hgRebateType!=3){
				data['hgRebateType']=t_hgRebateType;
			}else{
				if(!$('#extraService-endOrder li.extra_auto p input').val()){
					Toast.error('请输入优惠金额');
					return false;
				}
				if(!$('#extraService-endOrder .extra_auto_text textarea').val()){
					Toast.error('请输入优惠理由');
					return false;
				}
				data['rebateDesc']=$('#extraService-endOrder .extra_auto_text textarea').val();
				data['hgRebateFee']=$('#extraService-endOrder li.extra_auto p input').val();
			}
			checkTypeBox(data);//二次确认框
		})
}
//收银页面   isEvaluation---待评价时调整附加项--》收款页面
function getInCash_orderDetail(id,str,type,month,isEvaluation){//str---finish--prepay
		let getInCash_Html = '<div id="getInCash" class="r_panel">' +
		'   <div class="panel-header">' +
		'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'       <h4 class="modal-title">收银页面</h4>' +
		'   </div>' +
		'	<div class="panel-center">' +
		'		<section class="orderInfos">' +
		'			<p>订单信息</p>' +
		'			<div>' +
		'				<ul>' +
		'					<li><span>　　订单编号：</span><i>'+id+'</i></li>' +
		'					<li class="getInCash-kinsName"><span>　　被服务人：</span><i></i></li>' +
		'					<li class="bytype getInCash-orgNO"><span>　　　住院号：</span><i></i></li>' +
		'					<li class="bytype getInCash-admissionDate"><span>　　入院日期：</span><i></i></li>' +
		'					<li class="bytype getInCash-start-time"><span>服务开始时间：</span><i></i></li>' +
		'					<li class="bytype getInCash-end-time"><span>服务结束时间：</span><i></i></li>' +
		'					<li class="bytype getInCash-org"><span>　　　　科室：</span><i></i></li>' +
		'					<li class="bytype getInCash-addr"><span>　　　　地址：</span><i></i></li>' +
		'					<li class="bytype getInCash-balance"><span>　预收款余额：</span><i></i>元</li>' +
		'				</ul>' +
		'			</div>' +
		'		</section>' +
		'		<section class="payInfos">' +
		'			<p>服务信息</p>' +
		'			<div class="paydetail willService">' +
		'				<ul>' +
		'					<li class="willService-prepay"><span>　　预付款：</span><i></i>元</li>' +
		'					<li class="gates"><span>门禁卡押金：</span><i></i>元</li>' +
		'					<li class="allcounts"><span>待支付费用：</span><em><i class="willpaymoney" id="willpaymoneyId"></i>元</em></li>' +
		'				</ul>' +
		'			</div>' +
		'			<div class="paydetail onService">' +
		'				<ul class="onService-title">' +
		'					<li><span><i><input type="checkbox" /></i><em>全选</em></span><span>时间段</span><span>费用合计</span><span>已支付</span><span>未支付</span></li>' +
		'				</ul>' +
		'				<ul class="onService-detail">' +
		'					<li><span><i><input type="checkbox" /></i></span><span>201708</span><span>300.00</span><span>0.00</span><span>300.00</span></li>' +
		'					<li><span><i><input type="checkbox" /></i></span><span>201708</span><span>300.00</span><span>0.00</span><span>300.00</span></li>' +
		'					<li><span><i><input type="checkbox" /></i></span><span>201708</span><span>300.00</span><span>0.00</span><span>300.00</span></li>' +
		'				</ul>' +
		'			</div>' +
		'			<div class="paydetail afterService">' +
		'				<div class="payfee-detail">' +
		'					<ul>' +
		'						<li><span>服务项</span><span>单价</span><span>起始时间</span><span>费用合计</span></li>' +
		'					</ul>' +
		'					<ul class="serviceDetail">' +
//		'						<li><span>15元多陪</span><span>15元/天</span><span>15/4-17/4（3天）</span><span><i>45.00</i>元</span><span><i>45.00</i>元</span><span><i>45.00</i>元</span></li>' +
//		'						<li><span>15元多陪</span><span>15元/天</span><span>15/4-17/4（3天）</span><span><i>45.00</i>元</span><span><i>45.00</i>元</span><span><i>45.00</i>元</span></li>' +
//		'						<li><span>15元多陪</span><span>15元/天</span><span>15/4-17/4（3天）</span><span><i>45.00</i>元</span><span><i>45.00</i>元</span><span><i>45.00</i>元</span></li>' +
		'					</ul>' +
		'				</div>' +
		'			</div>' +
		'		</section>' +
		'		<section class="paytype">' +
		'			<p>支付方式</p>' +
		'			<div class="afterService-order">' +
		'				<ul class="payfee">' +
		'					<li class="allcounts"><span>服务费用：</span><em><i></i>元</em></li>' +
//		'					<li class="afterService-prepay"><span>　　预付款：</span><i></i>元</li>' +
		'					<li class="afterService-paid"><span>　　已支付：</span><i></i><span>元</span></li>' +
		'					<li class="prepay-left"><span>　预付款抵扣：</span><i></i><span>元</span></li>' +
		'					<li class="payfee-hgRebateFee"><span>优惠金额：</span><em><i></i>元</em></li>' +
		'					<li class="allcounts-left"><span>待退款金额：</span><em><i></i>元</em></li>' +
		'					<li class="payfee-needpay"><span>还需支付：</span><em><i class="willpaymoney" id = "willpaymoneyFee"></i>元</em></li>' +
		'				</ul>' +
		'				<p class="pay-record"></p>'+
		'				<p class="payback-type form-inline">退款方式：<select class="form-control"></select></p>'+
		'				<p class="return-money extra-gate0">温馨提示：退款金额将会退回至会员的钱包账户里（登录账号：<span></span>），请提示会员关注公众号进行提现。</p>' +
		'				<p class="return-money extra-gate extra-gate1">　　　　　若选择线上退还，请提醒用户查看短信提通知。</p>' +
		'				<p class="return-money extra-gate extra-gate2">温馨提示：若选择线上退还，请提醒用户查看短信提通知。</p>' +
		'			</div>' +
		'			<div class="payments">' +
		'				<ul>' +
		'					<li class="selected">现金支付</li>' +
		'					<li>POS机收款</li>' +
		'				</ul>' +
		'				<div class="payCash show">' +
		'					<div class="payCash-left"><img src="images/paycash.png"/></div>' +
		'					<div class="payCash-right">' +
		'						<ul>' +
		'							<li><span>收到：</span><i><input class="getmoney" type="number" placeholder="请输入金额"/>元</i></li>' +
		'							<li class="return-changes"><span>找零：</span><i>-<em>0.00</em>元</i></li>' +
		'						</ul>' +
		'					</div>' +
		'				</div>' +
		'				<div class="payCards">' +
		'					<div class="payCash-left"><img src="images/bankcard.png"/></div>' +
		'					<div class="payCash-right">' +
		'						<ul>' +
		'							<li class="selected" typeid="41"><i><img src="images/alipay.png" /></i><span>支付宝</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="42"><i><img src="images/unionpay.png" /></i><span>银联储蓄卡</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="44"><i><img src="images/creditcard.png" /></i><span>银联信用卡</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="43"><i><img src="images/qq.png" /></i><span>QQ钱包</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="40"><i><img src="images/wechat.png" /></i><span>微信</span><em><img src="images/branch-ok.png" /></em></li>' +
		'						</ul>' +
		'					</div>' +
		'				</div>' +
		'			</div>' +
		'		</section>' +
		'	</div>' +
		'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>' +
		'	</div>' +
		'</div>';
		let getInCash_panel = new RPModalPanel('getInCash', getInCash_Html);
		getInCash_panel.show();
		let dtd = $.Deferred();
		$('#getInCash .afterService-order .extra-gate').css('display','none');
		let need_pay=0;
		let click_flag=true;
		if(str=='finish'||str=='continue'){//待结算--中间支付
			$('#getInCash .afterService-order>p').css('display','block');
			$('#getInCash .getInCash-balance').addClass('show');
			$('#getInCash .needpay').css('display','block');
			$('#getInCash .footer-sure').html('确定');
			$('#getInCash .afterService-order').addClass('show');
			$('#getInCash .panel-center .payInfos .willService').removeClass('show');
			$('#getInCash .panel-center .payInfos .onService').removeClass('show');
			$('#getInCash .panel-center .payInfos .afterService').addClass('show');
			initGetInCash(id,'SAASSettlPayDetail',month).then((res)=>{
				let serviceList=res.body.serviceList;
				let extraList=res.body.extraList;
				let cashDetail=res.body;
				let orderDetail=res.body.order[0];
				//总服务项
				if(type==1){//机构
					$('#getInCash .getInCash-start-time').removeClass('show');
					$('#getInCash .getInCash-addr').removeClass('show');
					$('#getInCash .getInCash-org').addClass('show');
					$('#getInCash .getInCash-orgNO').addClass('show');
					$('#getInCash .getInCash-admissionDate').addClass('show');
					$('#getInCash .getInCash-orgNO i').html(orderDetail.orgNO);
					$('#getInCash .getInCash-org i').html(orderDetail.branch);
					$('#getInCash .getInCash-admissionDate i').html(cashDetail.admissionDate);
					//退款时支付来源
					let pay_node=`（订单支付记录：线上支付<i>${cashDetail.notCashFeeStr}</i>元 现金支付<i>${cashDetail.cashFeeStr}</i>元）`;
					$('.pay-record').append(pay_node);
					let type_data=[{/////退款方式
							name:'现金退款',
							value:'72'
						},{
							name:'线上退款',
							value:'53'
						},];
					type_data.forEach((item)=>{
						let option=`<option value="${item.value}">${item.name}</option>`;
						$('.payback-type select').append(option);
					})
					if(cashDetail.cashFee==0){//现金支付为0，退账户
						$('.payback-type select').find('option:nth-child(2)').prop('selected','selected');
					}
					$('.extra-gate0').css('display','none');
					//退款方式的选择
					$('.payback-type select').on('change',function(){
						if(cashDetail.cashFee!=0){//有两种退款方式
							if($('.payback-type select option:selected').val()=='72'){//现金退款时显示温馨提示
								$('.extra-gate0').css('display','none');
							}else{
								$('.extra-gate0').css('display','block');
							}
						}
					})
				}else{
					if(str!='continue'){//待结算时露出
						$('#getInCash .panel-center .orderInfos>div .getInCash-end-time').addClass('show');
					}
					$('#getInCash .getInCash-org').removeClass('show');
					$('#getInCash .getInCash-orgNO').removeClass('show');
					$('#getInCash .getInCash-admissionDate').removeClass('show');
					$('#getInCash .getInCash-start-time').addClass('show');
					$('#getInCash .getInCash-addr').addClass('show');
					$('#getInCash .getInCash-start-time i').html(orderDetail.orderStartTime);
					$('#getInCash .getInCash-end-time i').html(orderDetail.orderEndTime);
					$('#getInCash .getInCash-addr i').html(orderDetail.locationMinute);
				}
				//phone
				$('#getInCash .afterService-order>p span').html(orderDetail.contactPhone);
				//kinsname
				$('#getInCash .getInCash-kinsName i').html(orderDetail.kinsName);
				$('#getInCash .afterService-prepay i').html(orderDetail.prepayAmount);
				$('#getInCash .prepay-left i').html(cashDetail.preRealFee);
				$('#getInCash .getInCash-balance i').html(cashDetail.balancePreRealFee);
				$('#getInCash .afterService-paid i').html(cashDetail.realPay);
				$('#getInCash .allcounts i').html(cashDetail.totalFee);
				$('#getInCash .payfee-hgRebateFee i').html(cashDetail.hgRebateFee);
				//服务项
				let ulNode=$('#getInCash .serviceDetail');
				ulNode.empty();
				serviceList.forEach(function(item,index){
					let liNode=$('<li><span>'+item.service+'</span><span>'+item.PriceDesc+'</span><span class="startEndDate"></span><span><em>'+item.totalCostStr+'</em>元</span></li>');
					ulNode.append(liNode);
					let dateNode=liNode.find('.startEndDate');
					dateNode.empty();
					item.startEndDateDays.forEach(function(obj,i){
						let timeNode=$('<i>'+obj+'</i>');
						dateNode.append(timeNode);
					})
				});
				extraList.forEach(function(item,index){
					let liNode='';
					if(item.serviceDays==undefined){
						liNode=$('<li><span>'+item.service+'</span><span>'+item.PriceDesc+'</span><span>0次</span><span><em>'+item.totalCostStr+'</em>元</span></li>');
					}else{
						liNode=$('<li><span>'+item.service+'</span><span>'+item.PriceDesc+'</span><span>'+item.serviceDays+'次</span><span><em>'+item.totalCostStr+'</em>元</span></li>');
					}
					ulNode.append(liNode);
				});
				$('#getInCash .payfee-needpay i').html(cashDetail.needPay);
				need_pay=cashDetail.needPay
				$('#getInCash .needpay em').html(cashDetail.needPay);
				//门禁卡押金显示否
				if(cashDetail.extraType==1){//0-不显示---1显示
					if(parseFloat(cashDetail.needPay)<=0){
						$('#getInCash .afterService-order .extra-gate1').css('display','block');
						$('#getInCash .afterService-order .extra-gate2').css('display','none');
						$('#getInCash .afterService-order .extra-gate1 span').html(cashDetail.extraNOFeeStr);
					}else{
						$('#getInCash .afterService-order .extra-gate1').css('display','none');
						$('#getInCash .afterService-order .extra-gate2').css('display','block');
						$('#getInCash .afterService-order .extra-gate2 span').html(cashDetail.extraNOFeeStr);
					}
				}else{
					$('#getInCash .afterService-order .extra-gate').css('display','none');
				}
				if(parseFloat(cashDetail.needPay)<=0){//退款
					$('#getInCash .afterService-order>p.pay-record').css('display','block');
					$('#getInCash .afterService-order>p.payback-type').css('display','block');
					$('#getInCash .payments').css('display','none').removeClass('show');
					$('#getInCash .allcounts-left').addClass('show');
					$('#getInCash .payfee-needpay').removeClass('show');
					$('#getInCash .allcounts-left i').html('<span style="color : red; font-weight:bold; font-size: x-large;">' + (cashDetail.returnPay||'0.00') + '</span>');
					$('#getInCash .paytype').addClass('show');
				}else{//支付
					$('#getInCash .afterService-order>p.pay-record').css('display','none');
					$('#getInCash .afterService-order>p.payback-type').css('display','none');
					$('#getInCash .payments').css('display','block').addClass('show');
					$('#getInCash .allcounts-left i').html(cashDetail.needPay);
					$('#getInCash .payfee-needpay').addClass('show');
					$('#getInCash .allcounts-left').removeClass('show');
					$('#getInCash .paytype').addClass('show');
				}
				$('#getInCash .footer-sure').off('click').on('click',function(){//点击结算时需先弄出打印的数据---结算---打印
					if($('#getInCash .payments').hasClass('show')){//支付
						if(isEvaluation){//待评价时调整附加项--》收款页面
							sendPay(orderDetail.userId,isEvaluation,month);
						}else{
							sendPay(orderDetail.userId,'PAY_ORDERSETTLE',month);
						}
					}else{//退款信息
						getInCashBox($('#getInCash .allcounts-left i').html(),id);
					}
				})
			});
		}else if(str=='prepay'){//支付预交金
			$('#getInCash .needpay').css('display','none');
			$('#getInCash .paytype').addClass('show');
			$('#getInCash .panel-center .payInfos .willService').addClass('show');
			$('#getInCash .panel-center .payInfos .onService').removeClass('show');
			$('#getInCash .panel-center .payInfos .afterService').removeClass('show');
			initGetInCash(id,'SAASPrePayAmountDetail').then((res)=>{
				let orderDetail=res.body.order[0];
				if(type==1){//机构
					$('#getInCash .getInCash-start-time').removeClass('show');
					$('#getInCash .getInCash-addr').removeClass('show');
					$('#getInCash .getInCash-org').addClass('show');
					$('#getInCash .getInCash-orgNO').addClass('show');
					$('#getInCash .getInCash-admissionDate').addClass('show');
					$('#getInCash .getInCash-org i').html(orderDetail.branch);
					$('#getInCash .getInCash-orgNO i').html(orderDetail.orgNO);
					$('#getInCash .getInCash-admissionDate i').html(res.body.admissionDate);
				}else{//居家
					$('#getInCash .getInCash-org').removeClass('show');
					$('#getInCash .getInCash-orgNO').removeClass('show');
					$('#getInCash .getInCash-admissionDate').removeClass('show');
					$('#getInCash .getInCash-start-time').addClass('show');
					$('#getInCash .getInCash-addr').addClass('show');
					$('#getInCash .getInCash-start-time i').html(orderDetail.serviceTime);
					$('#getInCash .getInCash-addr i').html(orderDetail.locationMinute);
				}
				$('#getInCash .willService-prepay i').html(orderDetail.prepayAmount);
				need_pay=res.body.needPay;
				$('#getInCash .allcounts i').html(res.body.needPay);
				$('#getInCash .getInCash-kinsName i').html(orderDetail.kinsName);
				$('#getInCash .gates i').html(res.body.entranceFee);
				//支付
				$('#getInCash .footer-sure').off('click').on('click',function(){
					sendPay(orderDetail.userId,'PAY_PREAMOUNT','',orderDetail.prepayAmount);
				})
			})
		}else{
			$('#getInCash .footer-sure').html('确定收款');
			$('#getInCash .panel-center .orderInfos>div .getInCash-end-time').removeClass('show');
			$('#getInCash .panel-center .payInfos .willService').removeClass('show');
			$('#getInCash .panel-center .payInfos .onService').removeClass('show');
			$('#getInCash .panel-center .payInfos .afterService').removeClass('show');
		}
		$('#getInCash .payCash .getmoney').keyup(function(){
			let inputValue=$('#getInCash .payCash .getmoney').val();
			let curr_money=need_pay;
			curr_money=curr_money.replace(',','');
			if(parseFloat(inputValue)>parseFloat(curr_money)){
				let num=parseFloat(inputValue)-parseFloat(curr_money);
				num = num.toFixed(2);
				$('#getInCash .payCash .return-changes em').html(num);
			}else{
				$('#getInCash .payCash .return-changes em').html('0.00');
			}
		});
		$('#getInCash .panel-center .paytype .payments .payCards .payCash-right ul li').off('click').on('click',function(){
			for(let i=0;i<$('#getInCash .panel-center .paytype .payments .payCards .payCash-right ul li').length;i++){
				$('#getInCash .panel-center .paytype .payments .payCards .payCash-right ul li').eq(i).removeClass('selected');
			};
			$(this).addClass('selected');
		});
		$('#getInCash .panel-center .paytype .payments>ul li').off('click').on('click',function(){
			for(let i=0;i<$('#getInCash .panel-center .paytype .payments>ul li').length;i++){
				$('#getInCash .panel-center .paytype .payments>ul li').eq(i).removeClass('selected');
			};
			$(this).addClass('selected');
			if($('#getInCash .panel-center .paytype .payments>ul li').eq(0).hasClass('selected')){
				$('#getInCash .panel-center .paytype .payments .payCards').removeClass('show');
				$('#getInCash .panel-center .paytype .payments .payCash').addClass('show');
			}else{
				$('#getInCash .panel-center .paytype .payments .payCards').addClass('show');
				$('#getInCash .panel-center .paytype .payments .payCash').removeClass('show');
			}
		});
		function getInCashBox(data,id){//退还款项二次确认框
			let mess=$('.payback-type select option:selected').val()=='53'?'是否确认将'+data+'元退还至客户账户余额？':'是否确认退还现金'+data+'元';
			bootbox.confirm({
				title: "退还款项",
				message: mess,
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
						firstGetPrintData(id).then((print_data)=>{//结算时先弄出打印数据
							getIncashReturn(id,print_data);
						})
					}
				}
			});
		}
		function getIncashReturn(id,print_data){//结算按钮----退款
			if(!click_flag){
				return false;
			}
			click_flag=false;
			let httpUtilObj = new HttpUtil();
			let params={
				orderId:id,
				refundPayType:$('.payback-type select option:selected').val(),
			}
			httpUtilObj.ajax({
				url: '/adminjson/SAASConfirmOrderFinish',
				params: params
			}).then((res)=>{
				$('#checkTypeBox-endorder').remove();
				$('#checkTypeBox-endorder-mask').remove();
				$('#rp-wrapper').empty();
				$('#transparent-mask').hide();
				Toast.success("操作成功！");
				let prepay_data={
					id:id,
					print_data:print_data,
					str:'',
				}
				setTimeout(function(){
					click_flag=true;
				},500);
				dtd.resolve(prepay_data);
				return dtd.promise();
			},(res)=>{
				setTimeout(function(){
					click_flag=true;
				},500);
			})
		}
		function sendPay(userId,op,month,prepay){
			if(!click_flag){
				return false;
			}
			click_flag=false;
			if($('#getInCash .payments ul li').eq(0).hasClass('selected')){
				var money ="";
				if("PAY_PREAMOUNT" == op){//预交金
					money = $("#willpaymoneyId").html();
				} else if("PAY_ORDERSETTLE" == op||op=="PAY_SETTLELATERCLOSE"){
					money = $("#willpaymoneyFee").html();
				} 
				var tis = "确认已收取现金<strong style='color:red;font-weight:x-large;font-size: x-large;'>" + money + "</strong>元？";
				bootbox.confirm({
					title: "系统提示",
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
						if (isConfirm) {//先获取打印的数据
							if("PAY_PREAMOUNT" == op){//预交金
								//现金支付
								let httpUtilObj = new HttpUtil();
								//先获取打印的数据
								let data = {
									userId:userId,
									orderId: id,
									operation:op,
									payType:5,//现金
								};
								if(month==undefined){
									data['isAll']=1;
								}else{
									data['months']=month;
								}
								httpUtilObj.ajax({
									url: '/adminjson/DoPay',
									params: data
								}).then((res)=>{
									Toast.success("操作成功");
									$('#rp-wrapper').empty();
									$('#transparent-mask').hide();
									setTimeout(function(){
										click_flag=true;
									},500);
									let prepay_data={};
									if(parseFloat(prepay)==0){//没有预交金不拉出打印界面
										prepay_data={	
											id:id,
											str:'noprepay',
										}
										dtd.resolve(prepay_data);
									}else{
										prepay_data={
											id:id,
											str:'',
										}
										dtd.resolve(prepay_data);
									}
									return dtd.promise();
								},(res)=>{
									setTimeout(function(){
										click_flag=true;
									},500);
								});
							}else{//结算时收款
								firstGetPrintData(id).then((print_data)=>{
									//现金支付
									let httpUtilObj = new HttpUtil();
									//先获取打印的数据
									let data = {
										userId:userId,
										orderId: id,
										operation:op,
										payType:5,//现金
									};
									if(month==undefined){
										data['isAll']=1;
									}else{
										data['months']=month;
									}
									httpUtilObj.ajax({
										url: '/adminjson/DoPay',
										params: data
									}).then((res)=>{
										Toast.success("操作成功");
										$('#rp-wrapper').empty();
										$('#transparent-mask').hide();
										setTimeout(function(){
											click_flag=true;
										},500);
										let prepay_data={};
										if(parseFloat(prepay)==0){//没有预交金不拉出打印界面
											prepay_data={	
												id:id,
												str:'noprepay',
											}
											dtd.resolve(prepay_data);
										}else{
											prepay_data={
												id:id,
												str:'',
												print_data:print_data,
											}
											dtd.resolve(prepay_data);
										}
										return dtd.promise();
									},(res)=>{
										setTimeout(function(){
											click_flag=true;
										},500);
									});
								})
							}
						}else{
							click_flag=true;
						}
					}
				});
				
			}else{//POS机支付
				if("PAY_PREAMOUNT" == op){//预交金
					let type=$('#getInCash .payCards .payCash-right ul li.selected').attr('typeid');
					let httpUtilObj = new HttpUtil();
					let data = {
						userId:userId,
						orderId: id,
						operation: op,
						payType:type,//现金
					}
					if(month==undefined){
						data['isAll']=1;
					}else{
						data['months']=month;
					}
					httpUtilObj.ajax({
						url: '/adminjson/DoPay',
						params: data
					}).then((res)=>{
						Toast.success("操作成功");
						$('#rp-wrapper').empty();
						$('#transparent-mask').hide();
						setTimeout(function(){
							click_flag=true;
						},500);
						if(parseFloat(prepay)==0){//预交金为0不拉出打印界面
							let prepay={
								id:id,
								str:'noprepay',
							};
							dtd.resolve(prepay);
						}else{
							let prepay={
								id:id,
								str:'',
							};
							dtd.resolve(prepay);
						}
						return dtd.promise();
					},(res)=>{
						setTimeout(function(){
							click_flag=true;
						},500);
					});
				}else{//结算时收款
					firstGetPrintData(id).then((print_data)=>{
						let type=$('#getInCash .payCards .payCash-right ul li.selected').attr('typeid');
						let httpUtilObj = new HttpUtil();
						let data = {
							userId:userId,
							orderId: id,
							operation: op,
							payType:type,//现金
						}
						if(month==undefined){
							data['isAll']=1;
						}else{
							data['months']=month;
						}
						httpUtilObj.ajax({
							url: '/adminjson/DoPay',
							params: data
						}).then((res)=>{
							Toast.success("操作成功");
							$('#rp-wrapper').empty();
							$('#transparent-mask').hide();
							setTimeout(function(){
								click_flag=true;
							},500);
							if(parseFloat(prepay)==0){//预交金为0不拉出打印界面
								let prepay={
									id:id,
									str:'noprepay',
								};
								dtd.resolve(prepay);
							}else{
								let prepay={
									id:id,
									str:'',
									print_data:print_data,
								};
								dtd.resolve(prepay);
							}
							return dtd.promise();
						},(res)=>{
							setTimeout(function(){
								click_flag=true;
							},500);
						});
					})
				}
			}
		}
		return dtd.promise();
	}
function firstGetPrintData(id){//先获取print的数据再进行结算操作
	let dtd = $.Deferred(); 
	let httpUtilObj = new HttpUtil();
	//先获取打印的数据
	let data={
		orderId:id,
		printType:1,
		width:'80',
	};
	httpUtilObj.ajax({
		url: '/adminjson/SAASPrint',
		params: data
	}).then((res)=>{
		dtd.resolve(res);
		return dtd.promise();
	})
	return dtd.promise();
}
function initGetInCash(id,str,month){
	let dtd = $.Deferred(); 
	let httpUtilObj = new HttpUtil();
	let params={
		orderId:id,
	}
	if(month==undefined||month==''){
		params['isAll']=1;
	}else{
		params['settIds']=month;
	}
	httpUtilObj.ajax({
		url: '/adminjson/'+str,
		params: params
	}).then((res)=>{
		dtd.resolve(res);
		return dtd.promise();
	});
	return dtd.promise();
}
//档案资料
function orderPicLook(data){
	let orderPicLook_Html = '<div id="orderPicLook" class="r_panel">' +
	'   <div class="panel-header">' +
	'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'       <h4 class="modal-title">图片管理</h4>' +
	'   </div>' +
	'	<div class="panel-center"><p class="panel-infos">住院手环以及入院通知书</p>' +
	'		<div class="panel-infopic panel-hospic">' +
	'			<ul>'+
	'				<li picid="pic1" class="hos_pic1"><p>住院手环/入院通知单</p><img imgid="" src /></li>'+
	'				<li picid="pic2" class="hos_pic2"><p>住院手环/入院通知单</p><img imgid="" src /></li>'+
	'			</ul>'+
	'  		</div>' +
	'		<p class="panel-infos">知情同意书</p>' +
	'		<div class="panel-infopic panel-signpic">' +
	'			<ul>'+
	'				<li class="hos_pic1"><p>知情同意书</p><img imgid="" src /></li>'+
	'			</ul>'+
	'  		</div>' +
	'	</div>' +
	'	<div class="panel-footer">' +
	' 		<div class="footer-content nosure"><span class="pic_close rp_close">关闭</span></div>' +
	'	</div>' +
	'</div>';
	let orderPicLook_panel = new RPModalPanel('orderPicLook', orderPicLook_Html);
	orderPicLook_panel.show();
	var dtd = $.Deferred();
//	$('body').append("<div id='transparent-mask-orderPicLook'></div>");
//	$('#transparent-mask-orderPicLook').show();
	if(data.pic1!=''){
		$('#orderPicLook .panel-hospic .hos_pic1').addClass('haspic');
		$('#orderPicLook .panel-hospic .hos_pic1').find('img').attr('src',data.pic1);
	}else{
		$('#orderPicLook .panel-hospic .hos_pic1').removeClass('haspic');
	}
	if(data.pic2!=''){
		$('#orderPicLook .panel-hospic .hos_pic2').addClass('haspic');
		$('#orderPicLook .panel-hospic .hos_pic2').find('img').attr('src',data.pic2);
	}else{
		$('#orderPicLook .panel-hospic .hos_pic2').removeClass('haspic');
	}
	if(data.signPic!=''){
		$('#orderPicLook .panel-signpic .hos_pic1').addClass('haspic');
		$('#orderPicLook .panel-signpic .hos_pic1').find('img').attr('src',data.signPic);
	}else{
		$('#orderPicLook .panel-signpic .hos_pic1').removeClass('haspic');
	}
	$('#orderPicLook .panel-hospic ul li').off('click').on('click',function(){
		var self=$(this);
		orderManage_iframe_getphoto('newset').then((res)=>{
			self.addClass('haspic');
			self.find('img').attr('src',res.imgUrl);
			self.find('img').attr('imgid',res.imageId);
			let httpUtilObj = new HttpUtil();
			let params={
				key:self.attr('picid'),
				value:res.imageId,
				orderId:data.orderId,
			}
			httpUtilObj.ajax({
				url: '/adminjson/SAASUpdateOrderByField',
				params: params
			}).then((res)=>{
				Toast.success("操作成功");
			})
		})
	});
	$('#orderPicLook .pic_close').off('click').on('click',function(){
		$('#orderPicLook').hide();
//		$('#transparent-mask-orderPicLook').remove();
		dtd.resolve();
		return dtd.promise();
	});
	return dtd.promise();
}

//充值
function orderAddmoney(id){
	let orderAddmoney_Html = '<div id="orderAddmoney" class="r_panel">' +
		'   <div class="panel-header">' +
		'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'       <h4 class="modal-title">收银页面</h4>' +
		'   </div>' +
		'	<div class="panel-center">' +
		'		<section class="orderInfos">' +
		'			<p>订单信息</p>' +
		'			<div class="payments">' +
		'				<dl>' +
		'					<dd><span>充值金额：</span><input class="addMoney_input" type="number" placeholder="请输入充值金额(元)"/></dd>' +
		'				</dl>' +
		'			</div>' +
		'		</section>' +
		'		<section class="paytype">' +
		'			<p>支付方式</p>' +
		'			<div class="payments">' +
		'				<ul>' +
		'					<li typeid="5" class="selected">现金支付</li>' +
		'					<li>POS机收款</li>' +
		'				</ul>' +
		'				<div class="payCash show">' +
		'					<div class="payCash-left"><img src="images/paycash.png"/></div>' +
		'					<div class="payCash-right">' +
		'						<ul>' +
		'							<li><span>收到：</span><i><input class="getmoney" type="number" placeholder="请输入金额"/>元</i></li>' +
		'							<li class="return-changes"><span>找零：</span><i>-<em>0.00</em>元</i></li>' +
		'						</ul>' +
		'					</div>' +
		'				</div>' +
		'				<div class="payCards">' +
		'					<div class="payCash-left"><img src="images/bankcard.png"/></div>' +
		'					<div class="payCash-right">' +
		'						<ul>' +
		'							<li class="selected" typeid="41"><i><img src="images/alipay.png" /></i><span>支付宝</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="42"><i><img src="images/unionpay.png" /></i><span>银联储蓄卡</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="44"><i><img src="images/creditcard.png" /></i><span>银联信用卡</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="43"><i><img src="images/qq.png" /></i><span>QQ钱包</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="40"><i><img src="images/wechat.png" /></i><span>微信</span><em><img src="images/branch-ok.png" /></em></li>' +
		'						</ul>' +
		'					</div>' +
		'				</div>' +
		'			</div>' +
		'		</section>' +
		'	</div>' +
		'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>' +
		'	</div>' +
		'</div>';
	let orderAddmoney_panel = new RPModalPanel('orderAddmoney', orderAddmoney_Html);
	orderAddmoney_panel.show();
	var dtd = $.Deferred();
	$('#orderAddmoney .panel-center .paytype .payments .payCards .payCash-right ul li').off('click').on('click',function(){
		for(let i=0;i<$('#orderAddmoney .panel-center .paytype .payments .payCards .payCash-right ul li').length;i++){
			$('#orderAddmoney .panel-center .paytype .payments .payCards .payCash-right ul li').eq(i).removeClass('selected');
		};
		$(this).addClass('selected');
	});
	$('#orderAddmoney .panel-center .paytype .payments>ul li').off('click').on('click',function(){
		for(let i=0;i<$('#orderAddmoney .panel-center .paytype .payments>ul li').length;i++){
			$('#orderAddmoney .panel-center .paytype .payments>ul li').eq(i).removeClass('selected');
		};
		$(this).addClass('selected');
		if($('#orderAddmoney .panel-center .paytype .payments>ul li').eq(0).hasClass('selected')){
			$('#orderAddmoney .panel-center .paytype .payments .payCards').removeClass('show');
			$('#orderAddmoney .panel-center .paytype .payments .payCash').addClass('show');
		}else{
			$('#orderAddmoney .panel-center .paytype .payments .payCards').addClass('show');
			$('#orderAddmoney .panel-center .paytype .payments .payCash').removeClass('show');
		}
	});
	$('#orderAddmoney .payCash .getmoney').keyup(function(){
		let inputValue=$('#orderAddmoney .payCash .getmoney').val();
		let curr_money=$('.addMoney_input').val();
		curr_money=curr_money.replace(',','');
		if(parseFloat(inputValue)>parseFloat(curr_money)){
			let num=parseFloat(inputValue)-parseFloat(curr_money);
			num = num.toFixed(2);
			$('#orderAddmoney .payCash .return-changes em').html(num);
		}else{
			$('#orderAddmoney .payCash .return-changes em').html('0.00');
		}
	});
	let click_flag=true;
	$('#orderAddmoney .footer-sure').off('click').on('click',function(){
		if(!$('.addMoney_input').val()){
			Toast.error('请输入充值金额');
			return false;
		}
		let httpUtilObj = new HttpUtil();
		let data={
			prepayFee:$('.addMoney_input').val(),
			orderId:id,
		}
		if($('#orderAddmoney .payments>ul li:nth-child(1)').hasClass('selected')){
			data['payType']=$('#orderAddmoney .panel-center .paytype .payments>ul li:nth-child(1)').attr('typeid');
		}else{
			data['payType']=$('#orderAddmoney .payCash-right ul>li.selected').attr('typeid');
		}
		console.log(data);
		if(!click_flag){
			return false;
		}
		click_flag=false;
		httpUtilObj.ajax({
			url: '/adminjson/SAASRechargePrepayFee',
			params: data
		}).then((res)=>{
			Toast.success('充值成功！');
			setTimeout(function(){
				click_flag=true;
			},500);
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			dtd.resolve();
			return dtd.promise();
		},(res)=>{
			setTimeout(function(){
				click_flag=true;
			},500);
		})
		
	});
	return dtd.promise();
}

//中间支付--选择月份
function continueOrder_monthDetail(orderId,type){
	let monthOrder_Html = '<div id="monthOrder" class="r_panel">' +
		'   <div class="panel-header">' +
		'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'       <h4 class="modal-title">选择月份</h4>' +
		'   </div>' +
		'	<div class="panel-center">' +
		'		<section class="orderInfos">' +
		'			<ul class="month-list month-title"></ul>' +
		'			<ul class="month-list month-detail"></ul>' +
		'		</section>' +
		'	</div>' +
		'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">下一步</span></div>' +
		'	</div>' +
		'</div>';
		//<ul class="pagination" id="pagination"></ul>
	let monthOrder_panel = new RPModalPanel('monthOrder', monthOrder_Html);
	monthOrder_panel.show();
	let dtd = $.Deferred(); 
	let httpUtilObj = new HttpUtil();
	let data={
		orderId:orderId,
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetOrderItemList',
		params: data
	}).then((res)=>{
		let ulNode_title=$('#monthOrder .month-title');
		let ulNode_detail=$('#monthOrder .month-detail');
		ulNode_title.empty();
		ulNode_detail.empty();
		let listItem=res.body.voList;
		if(listItem.length){
			let firstNode=$('<li><span><em></em></span><span>月份</span><span>总服务费用</span><span>已支付费用</span><span>待支付费用</span></li>');
			ulNode_title.append(firstNode);
			listItem.forEach((item,index)=>{
				let liNode='';
				if(item.needPay>0){
					liNode=$('<li monthselect='+item.settleDate+'><span><em></em></span><span>'+item.settleDate+'</span><span>'+item.confirmCostStr+'</span><span>'+item.paidFeeStr+'</span><span>'+item.needPayStr+'</span></li>');
				}else{
					liNode=$('<li class="paid"><span><em></em></span><span>'+item.settleDate+'</span><span>'+item.confirmCostStr+'</span><span>'+item.paidFeeStr+'</span><span>'+item.needPayStr+'</span></li>');
				}
				ulNode_detail.append(liNode);
			})
		}
	})
	$('#monthOrder').off('click','.month-detail li').on('click','.month-detail li',function(){
		if(!$(this).hasClass('paid')){
			$(this).toggleClass('selected');
			checkSelected($(this).index(),$(this));//监控是否全选
		}
	})
	$('#monthOrder').off('click','.month-title li').on('click','.month-title li',function(){
		$(this).toggleClass('selected');
		if($(this).hasClass('selected')){
			for(let i=0;i<$('#monthOrder .month-detail li').length;i++){
				if(!$('#monthOrder .month-detail li').eq(i).hasClass('paid')){
					$('#monthOrder .month-detail li').eq(i).addClass('selected');
				}
			}
		}else{
			for(let i=0;i<$('#monthOrder .month-detail li').length;i++){
				if(!$('#monthOrder .month-detail li').eq(i).hasClass('paid')){
					$('#monthOrder .month-detail li').eq(i).removeClass('selected');
				}
			}
		}
		
	})
	function checkSelected(num,self){
		let count=0;
		for(let i=0;i<num;i++){
			if(self.hasClass('selected')){
				$('#monthOrder .month-detail li').eq(i).addClass('selected');
			}
		}
		for(let j=0;j<$('#monthOrder .month-detail li').length;j++){
			if($('#monthOrder .month-detail li').eq(j).hasClass('selected')){
				count++;
			}
		}
		if(count==$('#monthOrder .month-detail li').not('li.paid').length){
			$('#monthOrder .month-title li:nth-child(1)').addClass('selected');
		}else{
			$('#monthOrder .month-title li:nth-child(1)').removeClass('selected');
		}
	}
	$('#monthOrder .footer-sure').off('click').on('click',function(){
		let month_arr=[];
		let month_str='';
		for(let i=0;i<$('#monthOrder .month-detail li').length;i++){
			if($('#monthOrder .month-detail li').eq(i).hasClass('selected')){
				month_arr.push($('#monthOrder .month-detail li').eq(i).attr('monthselect'));
			}
		}
		month_str=month_arr.join(',');
		if(!month_str){
			Toast.error('请选择支付月份！');
			return false;
		}
		getInCash_orderDetail(orderId,'continue',type,month_str).then((res)=>{
			dtd.resolve();
			return dtd.promise();
		})
	})
	return dtd.promise();
}
function continueOrder_orderDetail(){
	let continueOrder_Html = '<div id="continueOrder" class="r_panel">' +
		'   <div class="panel-header">' +
		'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'       <h4 class="modal-title">收银页面</h4>' +
		'   </div>' +
		'	<div class="panel-center">' +
		'		<section class="orderInfos">' +
		'			<p>订单信息</p>' +
		'			<div class="payments">' +
		'				<dl>' +
		'					<dd><span>充值金额：</span><input class="addMoney_input" type="number" placeholder="请输入充值金额(元)"/></dd>' +
		'				</dl>' +
		'			</div>' +
		'		<section class="paytype">' +
		'			<p>支付方式</p>' +
		'			<div class="payments">' +
		'				<ul>' +
		'					<li typeid="5" class="selected">现金支付</li>' +
		'					<li>POS机收款</li>' +
		'				</ul>' +
		'				<div class="payCash show">' +
		'					<div class="payCash-left"><img src="images/paycash.png"/></div>' +
		'					<div class="payCash-right">' +
		'						<ul>' +
		'							<li><span>收到：</span><i><input class="getmoney" type="number" placeholder="请输入金额"/>元</i></li>' +
		'							<li class="return-changes"><span>找零：</span><i>-<em>0.00</em>元</i></li>' +
		'						</ul>' +
		'					</div>' +
		'				</div>' +
		'				<div class="payCards">' +
		'					<div class="payCash-left"><img src="images/bankcard.png"/></div>' +
		'					<div class="payCash-right">' +
		'						<ul>' +
		'							<li class="selected" typeid="41"><i><img src="images/alipay.png" /></i><span>支付宝</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="42"><i><img src="images/unionpay.png" /></i><span>银联储蓄卡</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="44"><i><img src="images/creditcard.png" /></i><span>银联信用卡</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="43"><i><img src="images/qq.png" /></i><span>QQ钱包</span><em><img src="images/branch-ok.png" /></em></li>' +
		'							<li typeid="40"><i><img src="images/wechat.png" /></i><span>微信</span><em><img src="images/branch-ok.png" /></em></li>' +
		'						</ul>' +
		'					</div>' +
		'				</div>' +
		'			</div>' +
		'		</section>' +
		'	</div>' +
		'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>' +
		'	</div>' +
		'</div>';
	let continueOrder_panel = new RPModalPanel('continueOrder', continueOrder_Html);
	continueOrder_panel.show();
}

//取消订单--退款
function orderFeeBack(id){
	var dtd = $.Deferred();
	let httpUtilObj = new HttpUtil();
	let data={
		orderId:id,
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetOrderDetailInfo',
		params: data
	}).then(res=>{
		let order_data=res.body;
		let orderFeeBack_Html = `<div id="orderFeeBack" class="r_panel">
			<div class="panel-header">
		       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		       <h4 class="modal-title">订单退款</h4>
	   		</div>
			<div class="panel-center">
				<section>
					<p class="panel-infos">订单信息</p>
					<div class="setcion-content">
						<ul>
							<li><span>订单编号：<i>${id}</i></span><span>预收款余额：<i>${order_data.prePayAmount}</i></span></li>
							<li><span>被服务人：<i>${order_data.kinsName}</i></span><span>住院号：<i>${order_data.orgNO}</i></span></li>
							<li><span>科室：<i>${order_data.branchName}</i></span></li>
						</ul>
					</div>
				</section>
				<section>
					<p class="panel-infos">退款信息</p>
					<div class="setcion-content">
					<p class="order-red form-inline">若选择线上退还，请提醒用户查看短信提通知（用户帐号：${order_data.contactPhone}），请提示会员关注公众号进行提现。</p>
						<p>（订单支付记录：线上支付<i>${order_data.notCashFeeStr}</i>元 现金支付<i>${order_data.cashFeeStr}</i>元）</p>
						<p class="form-inline">
							<label>预付款：<i class="order-red">${order_data.prePayAmount}</i>元</label>
						</p>
						<p class="extra-cash"><span>门禁卡押金：</span><i class="order-red">${order_data.extraFeeStr}</i></p>
						<p class="form-inline">
							<i>退款方式：</i>
							<select class="feeback-type form-control"></select>
						</p>
					</div>
				</section>
			</div>
			<div class="panel-footer">
		 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>
			</div>
		</div>`;
		let orderFeeBack_panel = new RPModalPanel('orderFeeBack', orderFeeBack_Html);
		orderFeeBack_panel.show();
		//cashPayFlag--false:退会员账户
		$('.feeback-type').empty();
		let type_data=[{
			name:'现金退款',
			value:'72'
		},{
			name:'线上退款',
			value:'53'
		},];
		type_data.forEach((item)=>{
			let option=`<option value="${item.value}">${item.name}</option>`;
			$('.feeback-type').append(option);
		})
		if(parseFloat(order_data.notCashFee)!=0&&parseFloat(order_data.cashFee)==0){//单独线上支付
			$('.feeback-type').find('option:nth-child(2)').prop('selected','selected');
		}
		if(!order_data.needRefundPrePay){//预付款为0时不展示
			$('.form-inline').css('display','none');
		}else{
			$('.form-inline').css('display','block');
		}
		if(!order_data.needRefundExtra){//门禁卡为0不展示
			$('.extra-cash').css('display','none');
		}else{
			$('.extra-cash').css('display','block');
		}
		$('#orderFeeBack .footer-sure').off('click').on('click',function(){
			bootbox.confirm({
				title: "系统提示",
				message: '是否确认退款',
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
						//现金支付
						let httpUtilObj = new HttpUtil();
						let data = {
							orderId: id,
							refundPayType:$('.feeback-type option:selected').val(),
						}
						httpUtilObj.ajax({
							url: '/adminjson/SAASRefundOrder',
							params: data
						}).then((res)=>{
							Toast.success("操作成功");
							$('#rp-wrapper').empty();
							$('#transparent-mask').hide();
							dtd.resolve(id);
							return dtd.promise();
						});
					}
				}
			});
		})
	})
	return dtd.promise();
}
//结束订单--12-20-账单调整
function extraService_orderDetail(orderId,str){
	let extraService_orderDetail_Html=`<div id="extraService_orderDetail" class="r_panel">
		<div class="panel-header">
	       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	       <h4 class="modal-title">账单调整</h4>
   		</div>
		<div class="panel-center">
			<section class="payInfos hg-fee">
				<p class="panel-infos">护工费<i class="red"><em class="hgTotalFee"></em>元</i></p>
				<div class="setcion-content afterService">
					<div class="payfee-detail">
						<ul>
							<li><span>服务项</span><span>单价</span><span>起始时间</span><span>费用合计</span></li>
						</ul>
						<ul class="serviceDetail"></ul>
					</div>
				</div>
				<div class="item-box">
					<section class="payInfos hg-adjust-fee hgAdjust">
						<p class="panel-infos item-infos">护工费调整（职工可优惠）<i class="blue">收起调整</i></p>
						<div class="afterService">
							<div class="payfee-detail">
								<ul class="adjustDetail adjustDetail-content"></ul>
							</div>
						</div>
					</section>
					<section class="payInfos hg-adjust-fee hg-extra-fee">
						<p class="panel-infos item-infos">普通附加服务（职工不可优惠）<i class="blue">收起调整</i></p>
						<div class="afterService">
							<div class="payfee-detail">
								<ul class="adjustDetail extraFee"></ul>
							</div>
						</div>
					</section>
				</div>
			</section>
			<section class="payInfos whithone-fee">
				<p class="panel-infos">陪人床<i class="red"><em class="withoneTotalFee"></em>元</i></p>
				<div class="setcion-content afterService">
					<div class="payfee-detail">
						<ul>
							<li><span>服务项</span><span>数量</span></li>
						</ul>
						<ul class="serviceDetail"></ul>
					</div>
				</div>
				<div class="item-box">
					<section class="payInfos hg-adjust-fee whithone-adjust-fee">
						<hr />
						<i class="blue">收起调整</i>
						<div class="afterService">
							<div class="payfee-detail">
								<ul class="adjustDetail whithone-adjust-content"></ul>
							</div>
						</div>
					</section>
				</div>
			</section>
		</div>
		<div class="panel-footer">
	 		<div class="footer-content footer-fee"><i class="hg-prc-totalFee">合计：<em><b>800.00</b>元</em></i><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>
		</div>
	</div>`;
	let extraService_orderDetail_panel = new RPModalPanel('extraService_orderDetail', extraService_orderDetail_Html);
	extraService_orderDetail_panel.show();
	let dtd = $.Deferred();
	//收起调整
	$('.hg-adjust-fee i').off('click').on('click',function(){
		if($(this).closest('section').find('.afterService').hasClass('org_hide')){
			$(this).closest('section').find('.afterService').removeClass('org_hide');
			$(this).html('收起调整');
		}else{
			$(this).html('展开调整');
			$(this).closest('section').find('.afterService').addClass('org_hide');
		}
	})
	let httpUtilObj = new HttpUtil();
	let params={
		orderId:orderId,
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetOrderItemDetail',
		params: params
	}).then((res)=>{
		initExtraService(res.body);
	})
	function initExtraService(data){
		//优惠方式
		$('#extraService_orderDetail .footer-sure').attr('hgRebateType',data.hgRebateType);
		let hg_service_data=data.serviceList;
		let hg_extra_data=data.extraList;
		$('#extraService_orderDetail .hg-fee .serviceDetail').empty();
		//基本服务类型
		if(hg_service_data.length){
			hg_service_data.forEach((item,index)=>{
				let hg_service=$(`<li priceid=${item.priceId}><span>${item.service}</span><span>${item.PriceDesc}</span><span class="startEndDate"></span><span><em>${item.totalCostStr}</em>元</span></li>`);
				$('#extraService_orderDetail .hg-fee .serviceDetail').append(hg_service);
				let dateNode=hg_service.find('.startEndDate');
				dateNode.empty();
				if(item.startEndDateDays.length){
					item.startEndDateDays.forEach(function(obj,i){
						let timeNode=$('<i>'+obj+'</i>');
						dateNode.append(timeNode);
					})
				}
			})	
		}
		//附加类型
		if(hg_extra_data.length){
			hg_extra_data.forEach(function(item,index){
				let liNode='';
				if(item.serviceDays==undefined){
					liNode=$(`<li priceid=${item.priceId} class="hg-extra"><span>${item.service}</span><span>${item.PriceDesc}</span><span class="startEndDate"><i>0次</i></span><span><em>${item.totalCostStr}</em>元</span></li>`);
				}else{
					liNode=$(`<li priceid=${item.priceId} class="hg-extra"><span>${item.service}</span><span>${item.PriceDesc}</span><span class="startEndDate"><i>${item.serviceDays}次</i></span><span><em>${item.totalCostStr}</em>元</span></li>`);
				}
				$('#extraService_orderDetail .hg-fee .serviceDetail').append(liNode);
			});
		}
		//护工费调整
		let  hg_fee_data=data.priceVOAdjustList;
		let hg_fee_ul=$('#extraService_orderDetail .hgAdjust .adjustDetail-content');
		hg_fee_ul.empty();
		if(hg_fee_data.length){
			$('.hgAdjust').removeClass('org_hide');
			hg_fee_data.forEach((item)=>{
				let liNode=$(`<li priceid=${item.price.priceId} class="hg-extra"><div>
				<div class="adjust-service"><span>${item.price.serviceItem}</span></div>
				<div class="adjust-num"><i class="cutnum" priceid="${item.price.priceId}" paynumber="${item.payNumber}">-</i><span><em class="price-num">${item.number}</em><em class="price-fee">${item.priceFeeStr}</em></span><i class="addnum" priceid="${item.price.priceId}">+</i></div>
				</div>`);
				hg_fee_ul.append(liNode);
			})
		}else{
			$('#extraService_orderDetail .hgAdjust').addClass('org_hide');
		}
		//普通附加服务
		let hg_oridinary_fee=data.priceVOOrdinaryList;
		let hg_oridinary_fee_ul=$('#extraService_orderDetail .hg-extra-fee .extraFee');
		hg_oridinary_fee_ul.empty();
		if(hg_oridinary_fee.length){
			$('.hg-extra-fee').removeClass('org_hide');
			hg_oridinary_fee.forEach((item)=>{
				let liNode=$(`<li priceid=${item.price.priceId} class="hg-extra"><div>
				<div class="adjust-service"><span>${item.price.serviceItem}</span></div>
				<div class="adjust-num"><i class="cutnum" priceid="${item.price.priceId}" paynumber="${item.payNumber}">-</i><span><em class="price-num">${item.number}</em><em class="price-fee">${item.priceFeeStr}</em></span><i class="addnum" priceid="${item.price.priceId}">+</i></div>
				</div>`);
				hg_oridinary_fee_ul.append(liNode);
			})
		}else{
			$('#extraService_orderDetail .hg-extra-fee').addClass('org_hide');
		}
		//prc附加服务
		let prc_service_li=$(`<li><span>陪人床</span><span class="prc-number">${data.numberPRC}</span></li>`);
		$('#extraService_orderDetail .whithone-fee .serviceDetail').append(prc_service_li);
		let prc_fee=data.priceVOPrcList;
		let prc_fee_ul=$('#extraService_orderDetail .whithone-adjust-fee .whithone-adjust-content');
		prc_fee_ul.empty();
		if(prc_fee.length){
			$('#extraService_orderDetail .whithone-adjust-fee').removeClass('org_hide');
			prc_fee.forEach((item)=>{
				let liNode=$(`<li priceid=${item.price.priceId}><div>
				<div class="adjust-service"><span>${item.price.serviceItem}</span></div>
				<div class="adjust-num"><i class="cutnum" priceid="${item.price.priceId}" paynumber="${item.payNumber}">-</i><span><em class="price-num">${item.number}</em><em class="price-fee">${item.priceFeeStr}</em></span><i class="addnum" priceid="${item.price.priceId}">+</i></div>
				</div>`);
				prc_fee_ul.append(liNode);
			})
		}else{
			$('#extraService_orderDetail .whithone-adjust-fee').addClass('org_hide');
		}
		//护工费加减
		$('.hg-fee .cutnum').off('click').on('click',function(){
			editServiceDetail($('#extraService_orderDetail .hg-fee .serviceDetail'),$(this),'cut',$(this).closest('.adjust-num').find('.price-num'),'hg',$('#extraService_orderDetail .hg-fee .hgTotalFee'));
		})
		$('.hg-fee .addnum').off('click').on('click',function(){
			editServiceDetail($('#extraService_orderDetail .hg-fee .serviceDetail'),$(this),'add',$(this).closest('.adjust-num').find('.price-num'),'hg',$('#extraService_orderDetail .hg-fee .hgTotalFee'));
		})
		//陪人床加减
		$('.whithone-fee .cutnum').off('click').on('click',function(){
			editServiceDetail($('#extraService_orderDetail .whithone-fee .serviceDetail'),$(this),'cut',$(this).closest('.adjust-num').find('.price-num'),'whithone',$('#extraService_orderDetail .whithone-fee .withoneTotalFee'),$('#extraService_orderDetail .whithone-fee .whithone-adjust-content'));
		})
		$('.whithone-fee .addnum').off('click').on('click',function(){
			editServiceDetail($('#extraService_orderDetail .whithone-fee .serviceDetail'),$(this),'add',$(this).closest('.adjust-num').find('.price-num'),'whithone',$('#extraService_orderDetail .whithone-fee .withoneTotalFee'),$('#extraService_orderDetail .whithone-fee .whithone-adjust-content'));
		})
		//计算单项服务费用
		getItemTotalFee($('#extraService_orderDetail .hg-fee .serviceDetail'),'hg',$('.hg-fee .hgTotalFee'));
		getItemTotalFee($('#extraService_orderDetail .whithone-fee .whithone-adjust-content'),'withone',$('#extraService_orderDetail .whithone-fee .withoneTotalFee'));
	}
	//计算单项服务费用
	function getItemTotalFee(pNode,str,ele){
		let fee=0;
		if(str=='hg'){//计算护工费
			if(pNode.find('li').length){
				for(let i=0;i<pNode.find('li').length;i++){
					let count=pNode.find('li').eq(i).find('span:nth-last-child(1) em').html();
					fee+=parseFloat(count);
				}
			}
		}else{//prc
			if(pNode.find('li').length){
				for(let i=0;i<pNode.find('li').length;i++){
					let price=parseFloat(pNode.find('li').eq(i).find('.price-fee').html());
					let num=parseFloat(pNode.find('li').eq(i).find('.price-num').html());
					fee+=parseFloat(num*price);
				}
			}
		}
		ele.html(fee.toFixed(2));
		getAllTotalFee();
	}
	//计算总服务费
	function getAllTotalFee(){
		let a_price=parseFloat($('#extraService_orderDetail .hgTotalFee').html());
		let b_price=parseFloat($('#extraService_orderDetail .withoneTotalFee').html());
		$('#extraService_orderDetail .hg-prc-totalFee em b').html((a_price+b_price).toFixed(2));
	}
	//对服务项的加减
	function editServiceDetail(ulNode,selfNode,str,numNode,isHg,feeEle,calNode){
		let paynumber=parseFloat(selfNode.attr('paynumber'));
		let num=parseFloat(numNode.html());
		let priceId=selfNode.attr('priceid');
		if(str=='cut'){//减法
			if(isHg=='hg'){//护工费调整
				if(!(num<=paynumber||num<=0)){
					num--;
					numNode.html(num);
				}
				let service_item=selfNode.closest('li').find('.adjust-service span').html();
				let price_item=selfNode.closest('li').find('.adjust-num .price-fee').html();
				let cost_item=(parseFloat(price_item)*num).toFixed(2);
				if(ulNode.length){
					for(let i=0;i<ulNode.length;i++){
						if(ulNode.eq(i).find('li[priceId='+priceId+']').length){//列表已有附加项
							if(num==0){
								ulNode.eq(i).find('li[priceId='+priceId+']').remove();
							}else{
								ulNode.eq(i).find('li[priceid='+priceId+']').find('span:nth-last-child(1) em').html(cost_item);
								ulNode.eq(i).find('li[priceId='+priceId+']').find('.startEndDate i').html(num+'次');
							}
						}
					}
					getItemTotalFee(ulNode,isHg,feeEle);
				}
			}else{//陪人床调整
				let cur_number=parseFloat(ulNode.find('.prc-number').html());
				if(num>paynumber||num>0){
					cur_number--;
					num--;
					numNode.html(num);
					ulNode.find('.prc-number').html(cur_number);
					getItemTotalFee(calNode,isHg,feeEle);
				}
			}
		}else{//加法
			num++;
			numNode.html(num);
			let service_item=selfNode.closest('li').find('.adjust-service span').html();
			let price_item=selfNode.closest('li').find('.adjust-num .price-fee').html();
			let cost_item=(parseFloat(price_item)*num).toFixed(2);
			if(isHg=='hg'){//护工费调整
				if(ulNode.length){
					for(let i=0;i<ulNode.length;i++){
						if(ulNode.eq(i).find('li[priceid='+priceId+']').length){//列表已有附加项
							ulNode.eq(i).find('li[priceid='+priceId+']').find('.startEndDate i').html(num+'次');
							ulNode.eq(i).find('li[priceid='+priceId+']').find('span:nth-last-child(1) em').html(cost_item);
						}else{
							let liNode=$(`<li priceId="${priceId}" class="hg-extra"><span>${service_item}</span><span>${price_item}</span>
								<span class="startEndDate"><i>${num}次</i></span>
								<span><em>${cost_item}</em>元</span>
							</li>`);
							ulNode.append(liNode);
						}
					}
					getItemTotalFee(ulNode,isHg,feeEle);
				}
			}else{//陪人床调整
				let cur_number=parseFloat(ulNode.find('.prc-number').html());
				cur_number++;
				ulNode.find('.prc-number').html(cur_number);
				getItemTotalFee(calNode,isHg,feeEle);
			}
		}
	}
	//点击确定
	$('#extraService_orderDetail .footer-sure').off('click').on('click',function(){
		let hgRebateType=$(this).attr('hgRebateType');
		let hg_arr=[],prc_arr=[];
		//护工费调整项
		if(!$('#extraService_orderDetail .hgAdjust').hasClass('org_hide')){//有对应的服务项
			let hgNode=$('#extraService_orderDetail .hgAdjust .adjustDetail-content li');
			if(hgNode.length){
				hgNode.each(function(i,v){
					let arr={
						key:$(v).attr('priceid'),
						value:parseFloat($(v).find('.price-num').html()),
					}
					hg_arr.push(arr);
				});
			}
		}
		//普通附加服务调整项
		if(!$('#extraService_orderDetail .hg-extra-fee').hasClass('org_hide')){//有对应的服务项
			let normalNode=$('#extraService_orderDetail .hg-extra-fee .extraFee li');
			if(normalNode.length){
				normalNode.each(function(i,v){
					let arr={
						key:$(v).attr('priceid'),
						value:parseFloat($(v).find('.price-num').html()),
					}
					hg_arr.push(arr);
				});
			}
		}
		//prc调整项
		let prcNode=$('#extraService_orderDetail .whithone-adjust-content li');
		if(prcNode.length){
			prcNode.each(function(i,v){
				let arr={
					key:$(v).attr('priceid'),
					value:parseFloat($(v).find('.price-num').html()),
				}
				prc_arr.push(arr);
			});
		}
		//总的数组
		let total_arr=[...hg_arr,...prc_arr];
		let httpUtilObj = new HttpUtil();
		let params={
			orderId:orderId,
			priceMap:total_arr,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASCreateOrUpdateOrderItemPrice',
			params: params
		}).then((res)=>{
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			if(str!=5){//不是待评价
				getDiscount(hgRebateType);//优惠
			}else{//待评价---->收银页面
				getInCash_orderDetail(orderId,'finish',1,"",'PAY_SETTLELATERCLOSE').then((res)=>{
					dtd.resolve();
					return dtd.promise();
				})	
			}
		})
	})
	//获得优惠数据
	function changeCheapItem(str,data){
		if(str<12){
			$('.cheap-select .extra_staff i strong').html(data.hgRebateFeeAM);
			$('.cheap-select .extra_relation i strong').html(data.hgKinsRebateFeeAM);
		}else{
			$('.cheap-select .extra_staff i strong').html(data.hgRebateFeePM);
			$('.cheap-select .extra_relation i strong').html(data.hgKinsRebateFeePM);
		}
	}
	//获得优惠界面
	function getDiscount(type){
		let discount_html=`<div style="padding:50px 0;" class="modal fade" id="js-modal-extraService_orderDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document"  style="width: 600px;height: 450px;margin-top: 200px;margin-bottom: 0px;">
				<div class="modal-content" style="display:flex;display:-webkit-flex;height: 100%;">
					<div class="modal-header" style="top: 0;position: fixed;width:600px;z-index:101;">
		        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		       		<h4 class="modal-title" >选择优惠</h4>
		      		</div>
		      		<div class="modal-body" style="padding: 0 20px 50px 20px;overflow-y:auto;flex:1;-webkit-flex:1;margin-top:75px;">
		      			<div class="getDiscount-content">
      						<ul class="cheap-select">
								<li hgRebateType="0" class="selected"><em></em><span>无优惠</span></li>
								<li hgRebateType="1" class="extra_staff"><em></em><span>职工优惠</span><i>优惠<strong>100.00</strong>元</i></li>
								<li hgRebateType="2" class="extra_relation"><em></em><span>职工家属优惠</span><i>优惠<strong>80.00</strong>元</i></li>
								<li hgRebateType="3" class="extra_auto"><em></em><span>自定义优惠</span><p><input type="text" placeholder="请输入金额"/></p></li>
							</ul>
							<div class="extra_auto_text"><textarea placeholder="请输入优惠理由"></textarea></div>
		      			</div>
		      		</div>
		      		<div class="modal-footer" style="position: fixed;bottom: 0;width: 600px;z-index: 100;background: #fff;left:0;">
		        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button> 
		        		<button type="button" class="btn btn-success js-btn-ok">确定</button> 
		      		</div>
		    	</div>
		  	</div>
		</div>`;
		$("#js-modal-extraService_orderDetail").remove();
		if(!$('#js-modal-grade_barthel-win').length) {
			$("body").append(discount_html);
		}
		$("#js-modal-extraService_orderDetail").modal('show');
		if(type){
			$('.cheap-select li').removeClass('selected');
			$('.cheap-select li[hgRebateType='+type+']').addClass('selected');
		}
		let httpUtilObj = new HttpUtil();
		let params={
			orderId:orderId,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderPriceInvert',
			params: params
		}).then((res)=>{
			changeCheapItem(new Date().getHours(),res.body);//获得上午还是下午 根据时间获得优惠金额
		})
		//优惠方式的选择
		$('.cheap-select li').off('click').on('click',function(){
			$('.cheap-select li').removeClass('selected');
			$(this).addClass('selected');
			if($(this).attr('hgrebatetype')==3){
				$('#js-modal-extraService_orderDetail .extra_auto p').css('display','block');
				$('#js-modal-extraService_orderDetail .extra_auto p').find('input').focus();
				$('#js-modal-extraService_orderDetail .extra_auto_text').css('display','block');
			}else{
				$('#js-modal-extraService_orderDetail .extra_auto p').css('display','none');
				$('#js-modal-extraService_orderDetail .extra_auto_text').css('display','none');
			}
		})
		//确认优惠
		$('#js-modal-extraService_orderDetail .js-btn-ok').on('click',function(){
			let t_hgRebateType=$('.cheap-select li.selected').attr('hgRebateType');
			data={
				orderId:orderId,
			}
			if(t_hgRebateType!=3){
				data['hgRebateType']=t_hgRebateType;
			}else{
				if(!$('.cheap-select li.extra_auto p input').val()){
					Toast.error('请输入优惠金额');
					return false;
				}
				if(!$('.extra_auto_text textarea').val()){
					Toast.error('请输入优惠理由');
					return false;
				}
				data['rebateDesc']=$('.extra_auto_text textarea').val();
				data['hgRebateFee']=$('.cheap-select li.extra_auto p input').val();
			}
			let httpUtilObj = new HttpUtil();
			httpUtilObj.ajax({
				url: '/adminjson/SAASUpdateOrderRebate',
				params: data
			}).then((res)=>{
				if(res.errorCode==0){
					Toast.success('操作成功！');
				}
				$("#js-modal-extraService_orderDetail").modal('hide');
				dtd.resolve();
				return dtd.promise();
			},(res)=>{
				$("#js-modal-extraService_orderDetail").modal('hide');
				dtd.resolve();
				return dtd.promise();
			})
		})
	}
	return dtd.promise();
}
//待结算--待评价--账单明细
function extraService_feeDetail(orderId,str){//str-->stauts-4-5
	let extraService_feeDetail_Html=`<div id="extraService_feeDetail" class="r_panel">
		<div class="panel-header">
	       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	       <h4 class="modal-title">账单明细</h4>
   		</div>
		<div class="panel-center">
			<section class="payInfos hg-fee">
				<p class="panel-infos">护工费<i class="red"><em class="hgTotalFee"></em>元</i></p>
				<div class="setcion-content afterService">
					<div class="payfee-detail">
						<ul>
							<li><span>服务项</span><span>单价</span><span>起始时间</span><span>费用合计</span></li>
						</ul>
						<ul class="serviceDetail"></ul>
					</div>
				</div>
			</section>
			<section class="payInfos hgRebate-fee">
				<p class="panel-infos">优惠<i class="red"><em class="hgRebateFee"></em>元</i></p>
				<div class="setcion-content afterService">
					<p></p>
				</div>
			</section>
			<section class="payInfos whithone-fee">
				<p class="panel-infos">陪人床<i class="red"><em class="withoneTotalFee"></em>元</i></p>
				<div class="setcion-content afterService">
					<div class="payfee-detail">
						<ul>
							<li><span>服务项</span><span>数量</span></li>
						</ul>
						<ul class="serviceDetail"></ul>
					</div>
				</div>
			</section>
		</div>
		<div class="panel-footer">
	 		<div class="footer-content footer-fee"><i class="hg-prc-totalFee">合计：<em><b>800.00</b>元</em></i><span class="rp_close">取消</span><span class="footer-sure">调整</span></div>
		</div>
	</div>`;
	let extraService_feeDetail_panel = new RPModalPanel('extraService_feeDetail', extraService_feeDetail_Html);
	extraService_feeDetail_panel.show();
	let dtd = $.Deferred();
	let httpUtilObj = new HttpUtil();
	let params={
		orderId:orderId,
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetOrderItemDetail',
		params: params
	}).then((res)=>{
		initExtraServiceFeeDetail(res.body);
	})
	function initExtraServiceFeeDetail(data){
		let hg_service_data=data.serviceList;
		let hg_extra_data=data.extraList;
		$('#extraService_feeDetail .hgRebate-fee .afterService p').html(data.hgRebateTypeStr);
		$('#extraService_feeDetail .hgRebate-fee .hgRebateFee').html('-'+data.hgRebateFeeStr);
		$('#extraService_feeDetail .hg-fee .serviceDetail').empty();
		//基本服务类型
		if(hg_service_data.length){
			hg_service_data.forEach((item,index)=>{
				let hg_service=$(`<li priceid=${item.priceId}><span>${item.service}</span><span>${item.PriceDesc}</span><span class="startEndDate"></span><span><em>${item.totalCostStr}</em>元</span></li>`);
				$('#extraService_feeDetail .hg-fee .serviceDetail').append(hg_service);
				let dateNode=hg_service.find('.startEndDate');
				dateNode.empty();
				if(item.startEndDateDays.length){
					item.startEndDateDays.forEach(function(obj,i){
						let timeNode=$('<i>'+obj+'</i>');
						dateNode.append(timeNode);
					})
				}
			})	
		}
		//附加类型
		if(hg_extra_data.length){
			hg_extra_data.forEach(function(item,index){
				let liNode='';
				if(item.serviceDays==undefined){
					liNode=$(`<li priceid=${item.priceId} class="hg-extra"><span>${item.service}</span><span>${item.PriceDesc}</span><span class="startEndDate"><i>0次</i></span><span><em>${item.totalCostStr}</em>元</span></li>`);
				}else{
					liNode=$(`<li priceid=${item.priceId}><span>${item.service}</span><span>${item.PriceDesc}</span><span class="startEndDate"><i>${item.serviceDays}次</i></span><span><em>${item.totalCostStr}</em>元</span></li>`);
				}
				$('#extraService_feeDetail .hg-fee .serviceDetail').append(liNode);
			});
		}
		//prc附加服务
		let prc_service_li=$(`<li><span>陪人床</span><span class="prc-number">${data.numberPRC}</span></li>`);
		$('#extraService_feeDetail .whithone-fee .serviceDetail').append(prc_service_li);
		$('#extraService_feeDetail .hg-fee .hgTotalFee').html(data.serviceTotalFeeStr);
		$('#extraService_feeDetail .whithone-fee .withoneTotalFee').html(data.totalCostPRCStr);
		$('#extraService_feeDetail .hg-prc-totalFee em b').html(data.totalFeeStr);
		$('#extraService_feeDetail .footer-sure').off('click').on('click',function(){
			//调整服务项
			extraService_orderDetail(orderId,str).then((res)=>{
				dtd.resolve();
				return dtd.promise();
			})
		})
	}
	return dtd.promise();
}
