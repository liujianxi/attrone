//门禁卡管理---添加门禁卡操作
function extraManageAdd(data){
	let extraManageAdd_Html=`<div id="extraManageAdd" class="r_panel end-order">
		<div class="panel-header">
			<button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title">添加门禁卡</h4>
		</div>
		<div class="panel-center">
			<ul>
				<li>
					<span>机构：　　　　<i>*</i></span>
					<select class="orgService form-control"></select>
				</li>
				<li>
					<span>科室：　　　　<i>*</i></span>
					<select class="form-control selectpicker" id="branchService" data-live-search="true"></select>
				</li>
				<li>
					<span>门禁卡号：　　<i>*</i></span>
					<input type="number" class="form-control extraNO" placeholder="请输入门禁卡号">
				</li>
				<li>
					<span>门禁卡自编号：</span>
					<input class="form-control serialNumber" placeholder="请输入门禁卡自编号">
				</li>
				<li>
					<span>门禁卡状态：　<i>*</i></span>
					<select class="form-control extra-status">
						<option value="1">已归还</option>
					</select>
				</li>
			</ul>
		</div>
		<div class="panel-footer">
			<div class="footer-content edit-text"><span class="rp_close">取消</span><span class="footer-sure">保存</span></div>
			<div class="footer-content disable-text nosure"><span>编辑</span></div>
		</div>
		`;
	let extraManageAdd_panel = new RPModalPanel('extraManageAdd', extraManageAdd_Html);
	extraManageAdd_panel.show();
	$("#extraManageAdd").find('.selectpicker').selectpicker('refresh');
    let dtd = $.Deferred();
	let httpUtilObj = new HttpUtil();
	let org_data={
		'status':-1,
	};
	let orgData='';
	let branchMap='';
	let	edit_flag=true;//编辑防点击
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetExtraList',
		params:org_data,
	}).then((res)=>{
		orgData=res.body.rightJson.orgList;
		branchMap=res.body.rightJson.branchMap;
		$('.orgService').empty();
		orgData.forEach((item,index)=>{
			let optionNode=`<option value=${item.id}>${item.orgName}</option>`;
			$('.orgService').append(optionNode);
		});
		$('.orgService').on('change',getBranchList);
		if(data.str!='add'){//编辑状态
			//选中branch
			$('.edit-text').css('display','none');
			$('.disable-text').css('display','block');
			$('.orgService').val(data.orgId).attr('disabled',true);
			$('.extraNO').val(data.extraNO).attr('disabled',true);
			$('.serialNumber').val(data.serialNumber).attr('disabled',true);
			$('.extra-status').val(data.status).attr('disabled',true);
			getBranchList('edit');
		}else{
			$('.edit-text').css('display','block');
			$('.disable-text').css('display','none');
			getBranchList();//获得科室
		}
		//点击可编辑按钮
		$('.disable-text').off('click').on('click',function(){
			$('.disable-text').css('display','none');
			$('.edit-text').css('display','block');
			$('.orgService').attr('disabled',false);
			$('.extraNO').attr('disabled',false);
			$('.serialNumber').attr('disabled',false);
			$('.selectpicker').attr('disabled',false);
			$('.selectpicker').closest('li').find('button').css({
			'background':'#fff',
			'cursor':'pointer'
			});
		})
		//点击保存按钮
		$('.footer-sure').off('click').on('click',function(){
			if(data.str=='add'){
				editExtra('add');//添加门禁卡
			}else{
				editExtra('edit');//编辑门禁卡
			}
		})
	})
	function editExtra(str){
		let extra_data={
			orgId:$('.orgService option:selected').val(),
			branchId:$('.selectpicker').selectpicker('val'),
			extraNO:$('.extraNO').val(),
			serialNumber:$('.serialNumber').val(),
			status:$('.extra-status').val(),
			status:$('.extra-status').val(),
		}
		if(str==='edit'){
			extra_data['extraId']=data.id;
		}
		console.log(extra_data);
		if(!$('#branchService option').length){
			Toast.error("无科室");
			return false;
		}
		if(extra_data.extraNO==''){
			Toast.error("请输入门禁卡号！");
			return false;
		}
//		if(extra_data.extraNO.length!=10){
//			Toast.error("请输入10位数的门禁卡号！");
//			return false;
//		}
		if(!edit_flag){
			return false;
		}
		edit_flag=false;
		httpUtilObj.ajax({
			url: '/adminjson/SAASSaveOrUpdateExtra',
			params:extra_data,
		}).then((res)=>{
			if(res.errorCode==0){
				Toast.success("门禁卡添加成功！");
			}else{
				Toast.success(res.msg);
			}
			setTimeout(function(){
				edit_flag=true;
			},500);
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			dtd.resolve(res);
			return dtd.promise();
		},((res)=>{
			setTimeout(function(){
				edit_flag=true;
			},500);
		}))
	}
	function getBranchList(str){
		let orgId=$('.orgService option:selected').val();
		let branchData=branchMap[orgId];
		$('#branchService').empty();
		$("body").find('.selectpicker').selectpicker('refresh');
		if(!isEmpty(branchData)){
			branchData.forEach((item,index)=>{
				let optionNode=`<option value=${item.id}>${item.branchName}</option>`;
				$('#branchService').append(optionNode);
			});
			$("body").find('.selectpicker').selectpicker('refresh');
			console.log(data.branchId);
			if(str==='edit'){
				$('.selectpicker').selectpicker('val',data.branchId).attr('disabled',true);
				$('.selectpicker').closest('li').find('button').css({
				'background':'#eee',
				'cursor':'not-allowed'
				});
			}
		}
	}
	function isEmpty(obj) {
		for (let name in obj) {
			return false;
		}
		return true;
	}
	return dtd.promise();
}
