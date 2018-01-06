function financeCheck(id){
	let financeCheck_Html = '<div id="financeCheck" class="r_panel">' +
	'   <div class="panel-header">' +
	'       <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'       <h4 class="modal-title">提现处理</h4>' +
	'   </div>' +
	'	<div class="panel-center">' +
	'		<p>提现结果：</p>' +
	'		<ul class="resultInfo">' +
	'			<li class=""><input type="radio" name="finance" value="1" /><span>成功</span></li>' +
	'			<li class=""><input type="radio" name="finance" value="3" /><span>打款失败，通知用户</span></li>' +
	'			<li class=""><input type="radio" name="finance" value="2" /><span>确认失败，打回会员账户</span></li>' +
	'		</ul>' +
	'		<div class="failInfo">' +
	'			<p>失败原因：</p>' +
	'			<ul class="fail-ul">' +
	'				<li class=""><input type="radio" /><span>银行卡信息不正确</span></li>' +
	'				<li class=""><input type="radio" /><i>其他</i><textarea></textarea></li>' +
	'			</ul>' +
	'		</div>' +
	'	</div>' +
	'	<div class="panel-footer">' +
		' 		<div class="footer-content"><span class="rp_close">取消</span><span class="footer-sure">确定</span></div>' +
	'	</div>' +
	'</div>';
	let financeCheck_panel = new RPModalPanel('financeCheck', financeCheck_Html);
	financeCheck_panel.show();
	var dtd = $.Deferred();
	$('#financeCheck .panel-center ul.resultInfo li').eq(0).find('input').prop('checked',true);
	$('body').off('click','#financeCheck .panel-center ul.resultInfo li').on('click','#financeCheck .panel-center ul.resultInfo li',function(){
		for(let i=0;i<$('#financeCheck .panel-center ul.resultInfo li').length;i++){
			$('#financeCheck .panel-center ul.resultInfo li').eq(i).find('input').prop('checked',false);
		}
		$(this).find('input').prop('checked','checked');
		ifshow();
	})
	$('body').off('click','#financeCheck .panel-center ul.resultInfo li input').on('click','#financeCheck .panel-center ul.resultInfo li input',function(){
		for(let i=0;i<$('#financeCheck .panel-center ul.resultInfo li').length;i++){
			$('#financeCheck .panel-center ul.resultInfo li').eq(i).find('input').prop('checked',false);
		}
		$(this).prop('checked','checked');
		ifshow();
	})
	$('body').off('click','#financeCheck .panel-center ul.fail-ul li input').on('click','#financeCheck .panel-center ul.fail-ul li input',function(){
		for(let i=0;i<$('#financeCheck .panel-center ul.resultInfo li').length;i++){
			$('#financeCheck .panel-center ul.resultInfo li').eq(i).find('input').prop('checked',false);
		}
		$(this).prop('checked','checked');
	})
	$('body').off('click','#financeCheck .panel-center ul.fail-ul li').on('click','#financeCheck .panel-center ul.fail-ul li',function(){
		for(let i=0;i<$('#financeCheck .panel-center ul.fail-ul li').length;i++){
			$('#financeCheck .panel-center ul.fail-ul li').eq(i).find('input').prop('checked',false);
		}
		$(this).find('input').prop('checked','checked');
	})
	
	function ifshow(){
		if($('#financeCheck .panel-center ul.resultInfo li').eq(2).find('input').prop('checked')){
			$('#financeCheck .failInfo').addClass('show');
			$('#financeCheck .panel-center ul.fail-ul li').eq(0).find('input').prop('checked',true)
		}else{
			$('#financeCheck .failInfo').removeClass('show');
		}
	}
	$('#financeCheck .footer-sure').off('click').on('click',function(){
		let httpUtilObj = new HttpUtil();
		let data={
			financeId:id,
		}
		data['withdrawStatus']=$('#financeCheck .panel-center ul.resultInfo li input[name=finance]:checked').val();
		if(data['withdrawStatus']==2){
			if($('#financeCheck .panel-center ul.fail-ul li').eq(0).find('input').prop('checked')){
				data['failureRemark']=$('#financeCheck .panel-center ul.fail-ul li').eq(0).find('span').html();
			}else{
				if($('#financeCheck .panel-center ul.fail-ul li').eq(1).find('textarea').val()==''){
					data['failureRemark']=$('#financeCheck .panel-center ul.fail-ul li').eq(1).find('i').html();
				}else{
					data['failureRemark']=$('#financeCheck .panel-center ul.fail-ul li').eq(1).find('textarea').val();
				}
			}
			
		}
		console.log(data);
		httpUtilObj.ajax({
			url: '/adminjson/SAASSaveOrUpdateFinanceRecord',
			params: data
		}).then((res)=>{
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			Toast.success("操作成功！");
			dtd.resolve(id);
			return dtd.promise();
		})
	})
	return dtd.promise();
}