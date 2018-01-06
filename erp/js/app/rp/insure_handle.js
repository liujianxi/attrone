var rp_showInsureHandlePanelHtml = '<div id="panel_insure_handle" class="r_panel">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">长护险申请详情</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" >' +
	'              <div class="form-group" style="margin-bottom: 0px">' +
	'                  <p class="rp_subtit">申请编号：<span class="js-span-insureNO"></span>   【<span class="js-span-insureCreateTime"></span>】【<span class="js-panel-status"></span>】</p>' +
	'              </div>' +
	'               <div class="form-group">' +
	'                     <table class=" display table table-bordered table-striped col-sm-12" style="margin-bottom:0;">' +
	'                     		<tr><td colspan=2 align="center">申请人信息</td></tr>' +
	'                     		<tr><td rowspan=3 class="insure-img-box"><img class="kinsfolkImg" src=""></td><td class="js-panel-kinsInfo"></td></tr>' +
	'                     		<tr><td>身份证号：<span class="js-panel-kinsIdCard"></span>　　<i class="btn btn-primary btn-sm idCardFrontImg imgTakeView">身份证正面</i>　<i class="btn btn-primary btn-sm idCardBackImg imgTakeView">身份证反面</i></td></tr>' +
	'                     		<tr><td>医保类型：<span class="js-panel-kinsMedicareType"></span>　　医保卡号：<span class="js-panel-healthNo"><a href="#" id="change_healthNo" class="editable"></a></span>　　<i class="btn btn-primary btn-sm healthCareImg imgTakeView">查看照片</i></td></tr>' +
	'                     </table>' +
	'                     <table class=" display table table-bordered table-striped col-sm-12" style="border-top:0;">' +
	'                     		<tr><td colspan=2 style="border-top:0;">语言：<span class="js-panel-language"><i style="cursor:pointer;"><input style="position:relative;top:2px;" type="checkbox" name="applyType" value="普通话" disabled/>普通话</i><i style="cursor:pointer;">　<input style="position:relative;top:2px;" type="checkbox" name="applyType" value="粤语" disabled/>粤语</i><i style="cursor:pointer;">　<input style="position:relative;top:2px;" type="checkbox" value="客家" name="applyType" disabled/>客家</i><i style="cursor:pointer;">　<input style="position:relative;top:2px;" value="潮汕" type="checkbox" name="applyType" disabled/>潮汕</i></span>　<span class="btn btn-primary btn-sm language-edit language-save">编辑</span></td></tr>' +
	'                     		<tr><td colspan=2>人员类别：<span class="js-panel-staffType"><a href="#" data-name="sex" data-type="select" id="change_staffType" class="editable"></span></td></tr>' +
	'                     		<tr><td>联系人姓名：<span class="js-panel-contactsName"><a href="#" id="change_name" class="editable"></a></span></td><td>联系人电话：<span class="js-panel-contactsPhone"><a href="#" id="change_phone" class="editable"></a></span></td></tr>' +
	'                     		<tr><td colspan=2>地址：<span class="js-panel-addr"></span></td></tr>' +
	'                     		<tr><td colspan=2>用户自评ADL：<span class="js-panel-selfADLScore"></span>　<i insureid="" typeGrade="1" class="btn btn-primary btn-sm check-ADLScore">查看详情</i></td></tr>' +
	'                     		<tr><td colspan=2>代理人姓名：<span class="js-panel-agentName"><a href="#" id="change_agentName" class="editable"></a></span>　　关系：<span class="js-panel-agentRelation"><a href="#" id="change_agentRelation" class="editable"></a></span>　　代理人电话：<span class="js-panel-agentPhone"><a href="#" id="change_agentPhone" class="editable"></a></span></td></tr>' +
	'                     </table>' +
	'                     <table class=" display table table-bordered table-striped col-sm-12" style="border-top:0;">' +
	'                     		<tr><td colspan=2 style="text-align:center;">申请单信息</td></tr>' +
	'                     		<tr><td colspan=2>申请途径：<span class="js-panel-foundWay"></span></td></tr>' +
	'                     		<tr><td><span  class="js-panel-applyType">申请待遇类别：<i><input style="position:relative;top:2px;" type="checkbox" checked name="applyType" disabled/>生活照料</i><i style="cursor:pointer;">　<input style="position:relative;top:2px;" type="checkbox" name="applyType" disabled/>医疗护理</i></span>　<span class="btn btn-primary btn-sm applyType-edit applyType-save">编辑</span></td><td>待遇类型：<span class="js-panel-treatType"><a data-name="treatType" data-type="select" href="#" id="change_treatType" class="editable"></a></span></td></tr>' +
	'                     		<tr><td>评估类别：<span class="js-panel-assessType"><a data-name="assessType" data-type="select" href="#" id="change_assessType" class="editable"></a></span></td><td>长护险通过的告知书领取方式：<span class="js-panel-insureGetType"><a data-name="insureGetType" data-type="select" href="#" id="change_insureGetType" class="editable"></a></span></td></tr>' +
	'                     		<tr><td>委托人电子签名：　<span class="btn btn-primary btn-sm userSignPic imgTakeView">查看签名</span><span style="display:none;" class="btn btn-primary btn-sm userSignPicUploadBtn">点击上传</span></td><td>委托协议书照片：　<input type="file" class="hidden js-upload-file-input entrustPicUpload" multiple="multiple" name="entrustPicUpload"><span class="btn btn-primary btn-sm entrustPic imgTakeView">查看照片</span><span style="display:none;" class="btn btn-primary btn-sm entrustPicUploadBtn">点击上传</span></td></tr>' +
	'                     		<tr><td colspan=2 class="js-panel-insure-detail-list"></td></tr>' +
	'                     </table>' +
	'                     <table class=" display table table-bordered table-striped col-sm-12 manage-table" style="border-top:0;display:none">' +
	'                     		<tr><td colspan=2>健康经理评估情况<span class="js-panel-manageDetail"></span></td></tr>' +
	'                     		<tr><td colspan=2>健康经理ADL评估：<span class="js-panel-dudaoScoreADL"></span>　<i insureid="" typeGrade="1" class="btn btn-primary btn-sm check-dudaoScoreADL">查看详情</i></td></tr>' +
	'                     		<tr><td colspan=2>' +
	'								<label class="col-sm-2 control-label">客户状态:</label>' +
	'                     			<div class="col-sm-10">' +
	'                         			<textarea class="form-control js-panel-userStatusRemark" rows="3" readonly></textarea>' +
	'                     			</div>' +
	'                     		</td></tr>' +
	'                     		<tr><td colspan=2>健康经理安全评估：<span class="js-panel-securityAssess"></span></td></tr>' +
	'                     </table>' +
	'               </div>' +


	'              <div class="form-group js-tr-process-done-title js-tr-status-0-done-title" style="margin-bottom: 0px;display:none" >' +
	'                  <p class="rp_subtit" style="margin:0px;">客服审核   <span class="js-div-status0-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group  js-tr-process-done js-tr-status-0-done" style="display:none">' +
	'              		<table class=" display table table-bordered table-striped col-sm-12"  style="margin-bottom: 0px">' +
	'              				<tr>' +
	'                     			<td>' +
	'                     				　　审核结果：<span class="js-div-status0-statusStr"></span>' +
	'                     			</td>' +
	'                     		</tr>' +
//	'                     		<tr class="js-tr-status0-rejectDesc" style="display:none">' +
//	'                     			<td>' +
//	'                     				　　驳回理由：<span class="js-div-status0-rejectDesc"></span>' +
//	'                     			</td>' +
//	'                     		</tr>' +
	'                     		<tr class="js-tr-status0-isforce" style="display:none">' +
	'                     			<td>' +
	'                     				　　是否强制提交：<div class="col-sm-10 js-div-status0-isforce"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr >' +
	'                     			<td>' +
	'                     				　　客服备注：<span class="js-div-status0-remark"></span>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     </table>' +
	'               </div>' +

	'              <div class="form-group js-tr-process-done-title js-tr-status-1-done-title" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" style="margin:0px;">复审情况   <span class="js-div-status1-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group  js-tr-process-done js-tr-status-1-done" style="display:none">' +
	//	hahaha
	'              		<table class=" display table table-bordered table-striped col-sm-12" style="margin-bottom: 0px;">' +
	'							<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">ADL评分:</label>' +
	' 									<span class="adl_show_number"></span>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">评估结果:</label>' +
	'                     				<span class="col-sm-10 js-div-status1-statusStr"></span>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr class="js-tr-status1-rejectDesc" style="display:none">' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">驳回理由:</label>' +
	'                     				<div class="col-sm-10 js-div-status1-rejectDesc"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr class="js-tr-status1-isforce" style="display:none">' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">是否强制提交:</label>' +
	'                     				<div class="col-sm-10 js-div-status1-isforce"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">评估备注:</label>' +
	'                     				<div class="col-sm-10 js-div-status1-remark"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     </table>' +
	'               </div>' +

	'              <div class="form-group js-tr-process-done-title" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" style="margin:0px;">终审情况   <span class="js-div-status3-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group  js-tr-process-done" style="display:none">' +
	'              		<table class=" display table table-bordered table-striped col-sm-12" style="margin-bottom: 0px;">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">评估结果:</label>' +
	'                     				<span class="col-sm-10 js-div-status3-statusStr"></span>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr class="js-tr-status3-rejectDesc" style="display:none">' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">驳回理由:</label>' +
	'                     				<div class="col-sm-10 js-div-status3-rejectDesc"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr >' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">客服备注:</label>' +
	'                     				<div class="col-sm-10 js-div-status3-remark"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     </table>' +
	'               </div>' +


	'              <div class="form-group js-tr-process-done-title" style="margin-bottom: 0px;display:none" >' +
	'                  <p class="rp_subtit" style="margin:0px;" >指派健康经理   <span class="js-div-status4-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group  js-tr-process-done" style="display:none">' +
	'              		<table class=" display table table-bordered table-striped col-sm-12"  style="margin-bottom: 0px">' +
	'              				<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">评估结果:</label>' +
	'                     				<span class="col-sm-10 js-div-status4-statusStr"></span>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr >' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">客服备注:</label>' +
	'                     				<div class="col-sm-10 js-div-status0-remark"></div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     </table>' +
	'               </div>' +
	'              <div class="form-group" id="js-subtit_assess" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" id="rp_subtit_s" style="margin:0px;">护士评估<i></i></p>' +
	'              </div>' +
	'              <div class="form-group js-tr-process js-tr-status-0"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label"><span class="form-required">*</span>审核结果:</label>' +
	'                     				<div class="col-sm-10">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-kfHandle" value="1"> 通过</label> <span class="js-span-choseNurse" style="display:none;">指派护士：<a href="javascript:void(0);" class="js-select-insureHandleNure" nurseType=10004>选择领班护士</a></span><span class="js-span-choseNurse" style="display:none;position:absolute;top:-2px;">　　预约上门时间：<input name="kfStartTime" /></span></div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-kfHandle" value="2"> 不通过</label></div>' +
	'                     					<textarea class="form-control js-ipt-rejectDesc" style="display:none" rows="3" placeholder="请输入不通过原因"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">客服备注:</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control js-ipt-remark" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +
	'              <div class="form-group js-tr-process js-tr-status-1" style="display:none">' +
	'                   	<table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'									<label class="col-sm-2" style="margin:0;"><span class="form-required">*</span>病情描述：</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control js-ipt-hsCasePresentation" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2" style="margin:0;"><span class="form-required">*</span>ADL评分：</label>' +
	'                     				<div class="col-sm-5 adl_insureNO_html_a" >' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="heavyIll-label" style="margin:0;padding-left:15px;"><input style="position:relative;top:2px;" type=checkbox name="heavyIll"/>中重度智能障碍（勾选后上传诊断书）</label>' +
	'                     				<div class="heavyIll-box" style="display:none;"><ul class="heavy-img ul-img-upload"></ul></div>' +//中重度智能障碍
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="caseDiagnosePic-label" style="margin:0;padding-left:15px;">上传诊断、病历或其他照片（最多9张）：</label>' +
	'                     				<div class="caseDiagnosePic-box"><ul class="heavy-img ul-img-upload"></ul></div>' +//上传诊断
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2" style="margin:0;"><span class="form-required">*</span>评估情况说明：</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control js-ipt-medicalHistory" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2" style="margin:0;">备注：</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control js-ipt-hsRemark" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2 status-result" style="margin:0;"><span class="form-required">*</span>审核结果：</label>' +
	'                     				<div class="col-sm-10 status-result-box">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-hsHandle" value="1"> 通过</label> </div>' +
	'                     					<div class="radio" id="force_submit"><label style="padding-top:0px;"><input type="radio" name="js-radio-hsHandle" value="2"> 不通过</label></div>' +
	'                     					<textarea class="form-control js-ipt-hsRejectDesc" style="display:none" rows="3" placeholder="请输入不通过原因"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     	</table>' +
	'               </div>' +
					//复审中
	'              <div class="form-group js-tr-process-done-title  js-tr-status-5-done-title" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" style="margin:0px;">专家复审   <span class="js-div-status3-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group js-tr-process js-tr-status-5"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					专家复审时间：<span class="js-panel-status-5-time"></span>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					<span class="form-required">*</span>复审护士：<span class=""><a href="javascript:void(0);" type=1 hstype=1 insureorderno="" class="js-select-insureHandleNure-HS" nursetype="10002">指派护士</a></span>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2" style="margin:0;">录入专家复审备注：</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control status-5-remark" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2"><span class="form-required">*</span>录入专家复审结果：</label>' +
	'                     				<div class="col-sm-10">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-status-5" value="1"> 通过</label></div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-status-5" value="2"> 不通过</label></div>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2" style="margin:0;margin-top: 4px;">资质有效期：</label>' +
	'                     				<div class="col-sm-10">' +
	'                     					<input type="hidden" id="status-5-begin" value="">' +
	'                     					<input type="hidden" id="status-5-end" value="">' +
	'                         				<input type="text" class="form-control" style="width: 200px;" name="daterange-order" placeholder="请选择日期">' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +
	//复审通过
	'              <div class="form-group js-tr-process js-tr-status-4"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					专家复审时间：<span class="js-panel-status-4-time"></span>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					<span class="form-required">*</span>复审护士：<span class="status-4-hsName"></span>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2" style="margin:0;">专家复审备注：</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control status-4-remark" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					<span class="form-required">*</span>专家复审结果：<span class="status-4-result"></span>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +
					//关闭订单处
	'              <div class="form-group js-tr-process-done-title  js-tr-status-53-done-title" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" style="margin:0px;">专家复审   <span class="js-div-status3-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group js-tr-process js-tr-status-53"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					<span class="status-53-rejectDesc"></span>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +
					//专家复审
	'              <div class="form-group js-tr-process-done-title  js-tr-status-3-done-title" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" style="margin:0px;">专家复审   <span class="js-div-status3-handler"></span></p>' +
	'              </div>' +
	'              <div class="form-group js-tr-process js-tr-status-3"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-profession" value="1"> 确认参加，录入复审时间</label> <span class="js-span-choseNurse-profession" style="display:none;">　指派护士长：<a href="javascript:void(0);" class="js-select-insureHandleNure" nurseType=10004>选择领班护士</a></span><span class="js-span-choseNurse-profession" style="display:none;position:absolute;top:-2px;">　　预约上门时间：<input name="kfStartTime" /></span></div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-profession" value="2"> 不能参加，将申请单状态重新变为等待提交复审</label></div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-profession" value="3"> 关闭申请单（参保人无法再参加复审）</label></div>' +
	'                     					<textarea class="form-control rejectDesc" style="display:none" rows="3" placeholder="请输入不通过原因"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +//专家复审
	//联系客户 status-4
	'              <div class="form-group js-tr-process-done-title  js-tr-status-4-kh" style="margin-bottom: 0px;display:none">' +
	'                  <p class="rp_subtit" style="margin:0px;">联系客户 </p>' +
	'              </div>' +
	'              <div class="form-group js-tr-process js-tr-status-4-kh"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<div class="col-sm-12">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-status-4" value="1"> 暂不下单</label></div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-status-4" value="2"> 预约下单</label>　<span class="js-span-choseNurse-status-4" style="display:none;"><a href="javascript:void(0);" class="js-btn-showInsureHandleNure-jkjl" nurseType=10008>+指派健康经理</a></span></div>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +
	'               <div class="form-group js-tr-process" style="display:none">' +
	'                   	<table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2 control-label"><span class="form-required">*</span>政府审核结果:</label>' +
	'                     				<div class="col-sm-10">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-govHandle" value="1"> 通过</label></div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-govHandle" value="2"> 不通过</label></div>' +
	'                     					<textarea class="form-control js-ipt-govRejectDesc" style="display:none" rows="3" placeholder="请输入不通过原因"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td colspan=2>' +
	'                     				<label class="col-sm-2 control-label"><span class="form-required">*</span>资质有效期:</label>' +
	'                     				<div class="col-sm-5">' +
	'                     					<input placeholder="请有效期"  class="form-control form_date js-ipt-insureEndDate">' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     	</table>' +
	'               </div>' +

	'              <div class="form-group js-tr-process"  style="display:none">' +
	'                   <table class=" display table table-bordered table-striped col-sm-12">' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">下单意愿:</label>' +
	'                     				<div class="col-sm-10">' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-Manager" value="2"> 有意愿</label> ' +
	'											<span class="js-span-Manager" style="display:none;" id = "js-span-jkjl">' +
	'												指派健康经理：' +
	'												<a href="javascript:void(0);" class="js-select-insureHandleNureManager" nurseType=10003>选择健康经理</a>' +
	'											</span>' +
	'										</div>' +
	'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js-radio-Manager" value="1"> 无意愿</label></div>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                     		<tr>' +
	'                     			<td>' +
	'                     				<label class="col-sm-2 control-label">客服备注:</label>' +
	'                     				<div class="col-sm-10">' +
	'                         				<textarea class="form-control js-ipt-remark-Manager" rows="3"></textarea>' +
	'                     				</div>' +
	'                     			</td>' +
	'                     		</tr>' +
	'                    </table>' +
	'               </div>' +
	'            </form>' +
	'        </div>' +
	'    </div>' +
	'    <div class="panel-footer">' +
	'         <div class="form-group">' +
	'              <div class="col-sm-12" style="text-align:center">' +
	' 					<div class="footer-content nosure"><span class="rp_close" style="display:none;">关闭</span><span style="display:none;" class="footer-sure js-btn-submit">确定</span></div>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';



/***********处理流水列表 begin*******************************/
var insureDetaillist_tpl =
	'<span>处理过程：</span></br>' +
	'{{each detailList as item i}}' +
	'{{item.createTime}} 【{{item.createStaffName}}】 —— {{item.content}}</br>' +
	'{{/each}}'

var getInsureDetailListHtml = function (data) {
	var detailList = data.detailList;
	var result = '<span>处理过程：</span></br>';
	for (var i = 0; i < detailList.length; i++) {
		var content = detailList[i].content;
		result += detailList[i].createTime + " 【" + detailList[i].createStaffName + "】 —— " + content + "<br>";
	}
	return result;
}
/***********处理流水列表 end*********************************/


/***********直接下单开始 start*******************************/

//下单部分获取地址
function getOrderAddress(id, str) {
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	var data = {
		userId: id,
	}
	//获取地址信息
	httpUtilObj.ajax({
		url: '/adminjson/SAASListUserAddress ',
		params: data
	}).then((res) => {
		var node = $(str).find('.addressDetail');
		node.empty();
		if (!res.body.list.length) {
			return false;
		}
		for (let i = 0; i < res.body.list.length; i++) {
			var liNode = $('<li addrId=' + res.body.list[i].addrId + '><div class="addr-input"><input type="radio" name="addr" value="" /></div><div class="address-txt"><span>' + res.body.list[i].contacts + '<em>(' + res.body.list[i].phone + ')</em></span>' + '——' + '<i>' + res.body.list[i].addressInfo + '</i></div></li>');
			node.append(liNode);
		}
		node.find('li:nth-child(1) input[type=radio]').prop('checked', 'checked');
	})
}
//下单获取服务部分
var priceId = '';//全局变量priceId
function getOrderService() {
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	var data = {
		islti: 1
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetInsurePrice',
		params: data
	}).then((res) => {
		var node = $('#insureCreateOrder .panel-sevice-detail ul');
		node.empty();
		if (!res.body.price.length) {
			return false;
		}
		var priceHtml = res.body.price[0].prepayAmount;
		if (parseFloat(priceHtml) < 0) {
			$('.panel-money-detail').hide();
		}
		$('.panel-payment .panel-money span').html(priceHtml);
		for (let i = 0; i < res.body.price.length; i++) {
			var liNode = '';
			if (res.body.price[i].price.isrequired == 1) {
				liNode = $('<li priceId=' + res.body.price[i].price.priceId + '><input type="checkbox" name="" value="" /><span>' + res.body.price[i].price.serviceItem + '</span><i>' + res.body.price[i].price.priceStr + '</i></li>');
			} else {
				priceId = res.body.price[i].price.priceId;
				liNode = $('<li priceId=' + res.body.price[i].price.priceId + '><input type="checkbox" disabled="disabled" name="" value="" checked="checked" /><span>' + res.body.price[i].price.serviceItem + '</span><i>' + res.body.price[i].price.priceStr + '</i></li>');
			}

			node.append(liNode);
		}
	})
}
let order_timeList = '';//订单时选择时间处
let current_timeflag = false;//当前时间在今天还是明天，true-今天
function getOrderTime(str) {
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	var orderType = 2;
	if (str == '#crateOrderHospital') {
		orderType = 1;
	}
	var data = {
		orderType: orderType
	}
	httpUtilObj.ajax({
		url: '/adminjson/GetOrderTime',
		params: data
	}).then((res) => {
		order_timeList = res.body.timeDataList;
		var ulNode = $(str).find('.panel-time>div .timeDetail>ul');
		var dlNode = $(str).find('.panel-time>div .timeDetail>dl');
		var aliasNode = $(str).find('.panel-time>div .timeDetail .date-alias')
		ulNode.empty();
		dlNode.empty();
		aliasNode.empty();
		if (orderType == 2) {//居家
			var timeList = res.body.timeDataList;
			for (let i = 0; i < timeList.length; i++) {
				if (timeList[i].alias != undefined) {
					var m_pNode = $('<p>' + timeList[i].alias + '</p>');
					aliasNode.append(m_pNode);
				}
				var ul_li = $('<li>' + timeList[i].dayStr + '</li>');
				ulNode.append(ul_li);
			}
			for (let j = 0; j < timeList[0].dayTimeData.amList.length; j++) {
				var dl_li_am = '';
				if (timeList[0].dayTimeData.amList[j].status == undefined || !timeList[0].dayTimeData.amList[j].status) {
					dl_li_am = $('<dd timestr=' + timeList[0].dayTimeData.amList[j].time + 'class="out-time">' + timeList[0].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[0].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[0].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
				} else {
					dl_li_am = $('<dd timestr=' + timeList[0].dayTimeData.amList[j].time + '>' + timeList[0].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[0].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[0].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
				}
				dlNode.append(dl_li_am);
			}
			for (let p = 0; p < timeList[0].dayTimeData.pmList.length; p++) {
				var dl_li_pm = $('<dd>' + timeList[0].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[0].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[0].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
				if (timeList[0].dayTimeData.pmList[p].status == undefined || !timeList[0].dayTimeData.pmList[p].status) {
					dl_li_pm = $('<dd timestr=' + timeList[0].dayTimeData.pmList[p].time + ' class="out-time">' + timeList[0].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[0].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[0].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
				} else {
					dl_li_pm = $('<dd timestr=' + timeList[0].dayTimeData.pmList[p].time + '>' + timeList[0].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[0].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[0].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
				}
				dlNode.append(dl_li_pm);
			}
			//获取默认最近时间
			let timeflag = false;
			let home_flag=false;//判定在上午是否取到
			let mlist_dl = '';
			let dl_start_time = '';
			let dl_end_time = '';
			for (let j = 0; j < timeList[0].dayTimeData.amList.length; j++) {
				if (timeList[0].dayTimeData.amList[j].status) {
					timeflag = true;
					current_timeflag = true;
					home_flag=true;
					mlist_dl = timeList[0].dayTimeData.amList[j].time;
					dl_start_time = timeList[0].dayTimeData.amList[j].serviceStartTime;
					dl_end_time = timeList[0].dayTimeData.amList[j].serviceEndTime;
					break;
				}
			}
			if(!home_flag){
				for (let j = 0; j < timeList[0].dayTimeData.pmList.length; j++) {
					if (timeList[0].dayTimeData.pmList[j].status) {
						timeflag = true;
						current_timeflag = true;
						mlist_dl = timeList[0].dayTimeData.pmList[j].time;
						dl_start_time = timeList[0].dayTimeData.pmList[j].serviceStartTime;
						dl_end_time = timeList[0].dayTimeData.pmList[j].serviceEndTime;
						break;
					}
				}
			}
			
			if (timeflag) {//选今天的
				$('.panel-time i').html(timeList[0].dayStr + '&nbsp;&nbsp;' + mlist_dl);
				$('.panel-time i').attr('service_start_time', dl_start_time);
				$('.panel-time i').attr('service_end_time', dl_end_time);
				$('.panel-time i').attr('service_date', timeList[0].dayStr);
				$('.panel-time i').attr('service_time', mlist_dl);
			} else {//选第二天的
				$('.panel-time i').attr('service_start_time', timeList[1].dayTimeData.amList[0].serviceStartTime);
				$('.panel-time i').attr('service_end_time', timeList[1].dayTimeData.amList[0].serviceEndTime);
				$('.panel-time i').html(timeList[1].dayStr + '&nbsp;&nbsp;' + timeList[1].dayTimeData.amList[0].time);
				$('.panel-time i').attr('service_date', timeList[1].dayStr);
				$('.panel-time i').attr('service_time', timeList[1].dayTimeData.amList[0].time);
			}
		} else {//机构时间部分
			var m_timeList = res.body.timeDataList;
			for (let i = 0; i < m_timeList[0].dayTimeData.mList.length; i++) {
				if (m_timeList[i].alias != undefined) {
					var m_pNode = $('<p>' + m_timeList[i].alias + '</p>');
					aliasNode.append(m_pNode);
				}
				var ul_li = $('<li>' + m_timeList[i].dayStr + '</li>');
				ulNode.append(ul_li);
				var dl_dd = '';
				if (m_timeList[0].dayTimeData.mList[i].status == undefined) {
					dl_dd = $('<dd timestr=' + m_timeList[0].dayTimeData.mList[i].timeStr + ' class="out-time">' + m_timeList[0].dayTimeData.mList[i].time + '<input class="serviceStartTime" type="hidden" name="" value="' + m_timeList[0].dayTimeData.mList[i].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + m_timeList[0].dayTimeData.mList[i].serviceEndTime + '" /></dd>');
				} else {
					dl_dd = $('<dd timestr=' + m_timeList[0].dayTimeData.mList[i].timeStr + '>' + m_timeList[0].dayTimeData.mList[i].time + '<input class="serviceStartTime" type="hidden" name="" value="' + m_timeList[0].dayTimeData.mList[i].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + m_timeList[0].dayTimeData.mList[i].serviceEndTime + '" /></dd>');
				}
				dlNode.append(dl_dd);
			}
			//获取默认最近时间
			let timeflag = false;
			let mlist_dl = '';
			let dl_start_time = '';
			let dl_end_time = '';
			for (let j = 0; j < m_timeList[0].dayTimeData.mList.length; j++) {
				if (m_timeList[0].dayTimeData.mList[j].status) {
					timeflag = true;
					current_timeflag = true;
					mlist_dl = m_timeList[0].dayTimeData.mList[j].timeStr;
					dl_start_time = m_timeList[0].dayTimeData.mList[j].serviceStartTime;
					dl_end_time = m_timeList[0].dayTimeData.mList[j].serviceEndTime;
					break;
				}
			}
			if (timeflag) {//选今天的
				$('.panel-time i').html(m_timeList[0].dayStr + '&nbsp;&nbsp;' + mlist_dl);
				$('.panel-time i').attr('service_start_time', dl_start_time);
				$('.panel-time i').attr('service_end_time', dl_end_time);
				$('.panel-time i').attr('service_date', m_timeList[0].dayStr);
				$('.panel-time i').attr('service_time', mlist_dl);
			} else {//选第二天的
				$('.panel-time i').attr('service_start_time', m_timeList[1].dayTimeData.mList[0].serviceStartTime);
				$('.panel-time i').attr('service_end_time', m_timeList[1].dayTimeData.mList[0].serviceEndTime);
				$('.panel-time i').html(m_timeList[1].dayStr + '&nbsp;&nbsp;' + m_timeList[1].dayTimeData.mList[0].timeStr);
				$('.panel-time i').attr('service_date', m_timeList[1].dayStr);
				$('.panel-time i').attr('service_time', m_timeList[1].dayTimeData.mList[0].timeStr);
			}
		}
		for (let m = 0; m < dlNode.find('dd').length; m++) {
			if (!dlNode.find('dd').eq(m).hasClass('out-time')) {
				dlNode.find('dd').eq(m).addClass('selected');
				return false;
			}
		}
	})
}
//直接下单部分modal的生成
function showInsureHandlePanel_CreateOrder(obj) {

	var CreateOrderHtml = '<div id="insureCreateOrder" class="r_panel">' +
		'    <div class="panel-header">' +
		'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'        <h4 class="modal-title">创建长护险订单</h4>' +
		'    </div>' +
		'		 <div class="panel-center"><p class="panel-infos">申请单信息</p>' +
		'	 <div class="panel-content">' +
		'	 	 <div class="panel-users"><span>下单账号：<i>' + obj.phone + '</i></span><span>被服务人：<i>' + obj.kinsName + '</i></span></div>' +
		'        <p>负责健康经理：<span>' + obj.manageName + '</span></p>' +
		'		 <div class="panel-addr"><span>联系地址:</span>' +
		'			 <ul class="addressDetail"></ul><ul><li class="orderAddress" userId=' + obj.userId + '>+新增地址</li></ul>' +
		'		 </div>' +
		'	 </div>' +
		'		 <p class="panel-infos">服务信息</p>' +
		'	 <div class="panel-service">' +
		'	 	 <div class="panel-time">服务开始时间：<span class="order_selectTime">选择时间</span><i></i><div class=order-timebox><div class="time-top"><span>取消</span><span>确定</span></div><div class="timeDetail"><div class="date-alias"></div><ul></ul><dl></dl></div></div></div>' +
		'		 <div class="panel-sevice-detail"><span>选择服务项:</span>' +
		'			 <ul></ul>' +
		'		 </div>' +
		'	 </div>' +
		'		 <p class="panel-infos">支付信息</p>' +
		'	 <div class="panel-payment">' +
		'	 	 <div class="panel-money">预付款：<span></span>元</div>' +
		'		 <div class="panel-money-detail"><span>收款方式:</span>' +
		'			 <ul><li><input type="radio" name="money" value="" /><span>线上收款（线上收款请提示用户在客户端完成付款，付款时效为2小时内）</span></li>' +
		'				 <li><input type="radio" name="money" value="" /><span>线下收款（线下收款请确保已现金收取预付款）</span></li></ul>' +
		'		 </div>' +
		'	 </div></div>' +
		'	 <div class="panel-footer">' +
		' 		 <div class="footer-content"><span class="rp_close">取消</span><span class="orderSubmit">创建</span></div>' +
		'	 </div>' +
		'</div>';
	var order_panel = new RPModalPanel('insureCreateOrder', CreateOrderHtml);
	var dtd = $.Deferred();
	order_panel.show();
	getOrderAddress(obj.userId, '#insureCreateOrder');//地址
	getOrderService('#insureCreateOrder');//服务
	getOrderTime('#insureCreateOrder');//时间
	$('.panel-money-detail ul').find('li:nth-child(1) input[type=radio]').prop('checked', 'checked');
	$('body').off('click', '#insureCreateOrder .orderAddress').on('click', '#insureCreateOrder .orderAddress', function () {
		top.importOnceJS('js-script-useraddress', "js/app/rp/useraddress.js");
		top.setId('userId', $(this).attr('userId'));
		top.G_Fun_showAddUserAddressPanel(obj.userId, '#insureCreateOrder').then((res)=>{
			getOrderAddress(obj.userId, '#insureCreateOrder');
		})
	}).off('click', '#insureCreateOrder .order_selectTime').on('click', '#insureCreateOrder .order_selectTime', function () {
		if ($('#insureCreateOrder .panel-time .order-timebox').hasClass('service_hide')) {
			$('#insureCreateOrder .panel-time .order-timebox').removeClass('service_hide');
		} else {
			$('#insureCreateOrder .panel-time .order-timebox').addClass('service_hide');
			let dlNode = $('#insureCreateOrder .panel-service .panel-time>div .timeDetail dl');
			dlNode.empty();
			let curr_date = $('.panel-time i').attr('service_date');
			let curr_time = $('.panel-time i').attr('service_time');
			let timeList = order_timeList;
			for (let im = 0; im < $('#insureCreateOrder .panel-service .panel-time>div .timeDetail>ul li').length; im++) {
				$('#insureCreateOrder .panel-service .panel-time>div .timeDetail>ul li').eq(im).removeClass('selected');
				if (curr_date == $('#insureCreateOrder .panel-service .panel-time>div .timeDetail>ul li').eq(im).html()) {
					$('#insureCreateOrder .panel-service .panel-time>div .timeDetail>ul li').eq(im).addClass('selected');
				}
			}
			for (let i = 0; i < order_timeList.length; i++) {
				if (curr_date == order_timeList[i].dayStr) {
					for (let j = 0; j < timeList[i].dayTimeData.amList.length; j++) {
						var dl_li_am = '';
						if (timeList[i].dayTimeData.amList[j].status == undefined || !timeList[i].dayTimeData.amList[j].status) {
							dl_li_am = $('<dd timestr=' + timeList[i].dayTimeData.amList[j].time + ' class="out-time">' + timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
						} else {
							dl_li_am = $('<dd timestr=' + timeList[i].dayTimeData.amList[j].time + '>' + timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
						}
						dlNode.append(dl_li_am);
					}
					for (let p = 0; p < timeList[0].dayTimeData.pmList.length; p++) {
						var dl_li_pm = $('<dd>' + timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
						if (timeList[i].dayTimeData.pmList[p].status == undefined || !timeList[i].dayTimeData.pmList[p].status) {
							dl_li_pm = $('<dd timestr=' + timeList[i].dayTimeData.pmList[p].time + ' class="out-time">' + timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
						} else {
							dl_li_pm = $('<dd timestr=' + timeList[i].dayTimeData.pmList[p].time + '>' + timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
						}
						dlNode.append(dl_li_pm);
					}
				}
			}
			for (let m = 0; m < dlNode.find('dd').length; m++) {
				if (curr_time == dlNode.find('dd').eq(m).attr('timestr')) {
					dlNode.find('dd').eq(m).addClass('selected');
					break;
				}
			}
		}
	}).off('click', '#insureCreateOrder .panel-service .panel-time>div .timeDetail ul li').on('click', '#insureCreateOrder .panel-service .panel-time>div .timeDetail ul li', function () {
		var clickliNode = $(this).parent().find('li');
		for (let im = 0; im < clickliNode.length; im++) {
			clickliNode.eq(im).removeClass('selected');
		}
		$(this).addClass('selected');
		let dlNode = $('#insureCreateOrder .panel-service .panel-time>div .timeDetail dl');
		dlNode.empty();
		for (let i = 0; i < order_timeList.length; i++) {
			if ($(this).html() == order_timeList[i].dayStr) {
				for (let j = 0; j < order_timeList[i].dayTimeData.amList.length; j++) {
					var dl_li_am = '';
					if (order_timeList[i].dayTimeData.amList[j].status == undefined || !order_timeList[i].dayTimeData.amList[j].status) {
						dl_li_am = $('<dd timestr=' + order_timeList[i].dayTimeData.amList[j].time+' class="out-time">' + order_timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
						console.log(dl_li_am);
					} else {
						dl_li_am = $('<dd timestr=' + order_timeList[i].dayTimeData.amList[j].time+'>' + order_timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
					}
					dlNode.append(dl_li_am);
				}
				for (let p = 0; p < order_timeList[i].dayTimeData.pmList.length; p++) {
					var dl_li_pm = '';
					if (order_timeList[i].dayTimeData.pmList[p].status == undefined || !order_timeList[i].dayTimeData.amList[p].status) {
						dl_li_pm = $('<dd timestr=' + order_timeList[i].dayTimeData.pmList[p].time+' class="out-time">' + order_timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
					} else {
						dl_li_pm = $('<dd timestr=' + order_timeList[i].dayTimeData.pmList[p].time+'>' + order_timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
					}
					console.log(dl_li_pm);
					dlNode.append(dl_li_pm);
				}
				for (let m = 0; m < dlNode.find('dd').length; m++) {
					if (!dlNode.find('dd').eq(m).hasClass('out-time')) {
						dlNode.find('dd').eq(m).addClass('selected');
						return false;
					}
				}
			}
		}
	}).off('click', '#insureCreateOrder .panel-service .panel-time>div .timeDetail dl dd').on('click', '#insureCreateOrder .panel-service .panel-time>div .timeDetail dl dd', function () {
		if (!$(this).hasClass('out-time')) {
			var clickliNode = $(this).parent().find('dd');
			for (let i = 0; i < clickliNode.length; i++) {
				clickliNode.eq(i).removeClass('selected');
			}
			$(this).addClass('selected');
		}

	}).off('click', '#insureCreateOrder .panel-service .panel-time>div .time-top span:nth-child(1)').on('click', '#insureCreateOrder .panel-service .panel-time>div .time-top span:nth-child(1)', function () {
		$('#insureCreateOrder .panel-time>div').removeClass('service_hide');
	}).off('click', '#insureCreateOrder .panel-service .panel-time>div .time-top span:nth-child(2)').on('click', '#insureCreateOrder .panel-service .panel-time>div .time-top span:nth-child(2)', function () {
		var ul_liNOde = $('#insureCreateOrder .panel-service .panel-time>div .timeDetail ul li');
		var dl_liNOde = $('#insureCreateOrder .panel-service .panel-time>div .timeDetail dl dd');
		var ul_time = '';
		var dl_time = '';
		var dl_start_time = '';
		var dl_end_time = '';
		var flag = false;
		for (let i = 0; i < ul_liNOde.length; i++) {
			if (ul_liNOde.eq(i).hasClass('selected')) {
				ul_time = ul_liNOde[i].innerHTML;
			}
		}
		for (let j = 0; j < dl_liNOde.length; j++) {
			if (dl_liNOde.eq(j).hasClass('selected')) {
				dl_time = dl_liNOde.eq(j).attr('timestr');
				dl_start_time = dl_liNOde.eq(j).find('.serviceStartTime').val();
				dl_end_time = dl_liNOde.eq(j).find('.serviceEndTime').val();
				flag = true;
			}
		}
		$('#insureCreateOrder .panel-time>div').removeClass('service_hide');
		if (flag) {
			$('.panel-time i').empty();
			$('.panel-time i').attr('service_start_time', '');
			$('.panel-time i').attr('service_end_time', '');
			$('.panel-time i').attr('service_date', '');
			$('.panel-time i').attr('service_time', '');
			$('.panel-time i').html(ul_time + '&nbsp;&nbsp;' + dl_time);
			$('.panel-time i').attr('service_start_time', dl_start_time);
			$('.panel-time i').attr('service_end_time', dl_end_time);
			$('.panel-time i').attr('service_date', ul_time);
			$('.panel-time i').attr('service_time', dl_time);
		}
	}).off('click', '#insureCreateOrder .addressDetail li').on('click', '#insureCreateOrder .addressDetail li', function () {
		var address_li = $('#insureCreateOrder .addressDetail li');
		for (let i = 0; i < address_li.length; i++) {
			address_li.eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#insureCreateOrder .panel-sevice-detail ul li').on('click', '#insureCreateOrder .panel-sevice-detail ul li', function (event) {
		if (!$(this).find('input[type=checkbox]').prop('disabled')) {
			if ($(this).find('input[type=checkbox]').prop('checked')) {
				$(this).find('input[type=checkbox]').prop('checked', false);
			} else {
				$(this).find('input[type=checkbox]').prop('checked', true);
			}
		}

	}).off('click', '#insureCreateOrder .panel-sevice-detail ul li input').on('click', '#insureCreateOrder .panel-sevice-detail ul li input', function (event) {
		if (!$(this).prop('disabled')) {
			if ($(this).prop('checked')) {
				$(this).prop('checked', false);
			} else {
				$(this).prop('checked', true);
			}
		}

	}).off('click', '#insureCreateOrder .panel-money-detail ul li').on('click', '#insureCreateOrder .panel-money-detail ul li', function () {
		var money_li = $('#insureCreateOrder .panel-money-detail ul li');
		for (let i = 0; i < money_li.length; i++) {
			money_li.eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#insureCreateOrder .panel-footer .orderSubmit').on('click', '#insureCreateOrder .panel-footer .orderSubmit', function () {
		//insureNO-userId-addrId-priceId-priceitemId-serviceStartTime-serviceEndTime
		let order_addrId, order_serviceStartTime, order_serviceEndTime, paymentWay;
		let order_priceitemId = [];
		var address_li = $('#insureCreateOrder .addressDetail li');
		for (let i = 0; i < address_li.length; i++) {
			if (address_li.eq(i).find('input[type=radio]').prop('checked')) {
				order_addrId = address_li.eq(i).attr('addrid');
			}
		}
		for (let j = 1; j < $('#insureCreateOrder .panel-sevice-detail ul li').length; j++) {
			if ($('#insureCreateOrder .panel-sevice-detail ul li').eq(j).find('input[type=checkbox]').prop('checked')) {
				order_priceitemId.push($('#insureCreateOrder .panel-sevice-detail ul li').eq(j).attr('priceid'));
			}
		}
		if ($('#insureCreateOrder .panel-money-detail ul li').eq(0).find('input[type=radio]').prop('checked')) {
			paymentWay = 1;
		} else {
			paymentWay = 2;
		}
		let timeNode = $('#insureCreateOrder .panel-service .panel-time>i');
		if (!timeNode.html()) {
			Toast.error("请选择服务时间！");
			return false;
		}
		order_serviceStartTime = timeNode.attr('service_start_time');
		order_serviceEndTime = timeNode.attr('service_end_time');
		let params = {
			insureNO: obj.insureNO,
			userId: obj.userId,
			addrId: order_addrId,
			priceId: priceId,
			priceItemId: order_priceitemId,
			serviceStartTime: order_serviceStartTime,
			serviceEndTime: order_serviceEndTime
		};
		console.log(params);
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/SAASCreateInsureOrder ',
			params: params
		}).then((res) => {
			var orderId = res.body.orderId;
			if (paymentWay == 1) {
				Toast.success("创建成功");
				$('#rp-wrapper').empty();
				$('#transparent-mask').hide();
				dtd.resolve(res);
				return dtd.promise();
			} else {
				orderGoDopay(orderId, obj.userId);
			}
		})
	})
	$(document).bind('click', function (e) {
		var src = e.target;
		if (src.className != 'service_hide' && src.className != 'order_selectTime') {
			if (src.closest('.service_hide') == null) {
				$('#insureCreateOrder .panel-time>div').removeClass('service_hide');
			}
		}
	})
	return dtd.promise();
}
function orderGoDopay(str, id) {
	var httpUtilObj = new HttpUtil();
	var data = {
		userId: id,
		orderId: str,
		payType: 5,
		operation: 'PAY_PREAMOUNT',
	}
	httpUtilObj.ajax({
		url: '/adminjson/DoPay',
		params: data
	}).then((res) => {
		$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
		$('#rp-wrapper').empty();
		$('#transparent-mask').hide();
		Toast.success("创建成功");
	}, (res) => {
		if (res.errorCode == 8) {
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
		}
	})
}
/***********直接下单结束 end*******************************/

/***********新建订单开始*******************************/
function orderManage_crateNewSet() {
	let crateNewSetHtml = '<div id="crateNewSet" class="r_panel">' +
		'    <div class="panel-header">' +
		'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'        <h4 class="modal-title">新建订单</h4>' +
		'    </div>' +
		'	 <div class="panel-center"><p class="panel-infos">选择需要创建的订单类型</p>' +
		'		<div class="panel-content">' +
		'		  	<ul><li><input type="radio" name="jigou" value="" /><span>居家订单</span></li></ul>' +
//		'		  	<ul><li><input type="radio" name="jigou" value="" /><span>居家订单</span></li><li><input type="radio" name="jigou" value="" /><span>机构订单</span></li></ul>' +
		'   	</div>' +
		'</div>' +
		'	 <div class="panel-footer">' +
		' 		 <div class="footer-content"><span class="rp_close">取消</span><span>下一步</span></div>' +
		'	 </div>' +
		'</div>';
	let order_panel = new RPModalPanel('crateNewSet', crateNewSetHtml);
	order_panel.show();
	$('#crateNewSet .panel-center ul li').eq(0).find('input[type=radio]').prop('checked', 'checked');
	$('body').on('click', '#crateNewSet .panel-center ul li', function () {
		for (let i = 0; i < $('#crateNewSet .panel-center ul li').length; i++) {
			$('#crateNewSet .panel-center ul li').eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).on('click', '#crateNewSet .panel-footer .footer-content span:nth-last-child(1)', function () {
		let str = '';
		if ($('#crateNewSet .panel-center ul li').eq(0).find('input[type=radio]').prop('checked')) {
			str = 'home';
		} else {
			str = 'hospital';
		}
		orderManage_cratephone(str);
	})
}
function orderManage_cratephone(str) {
	$('#crateOrderPhone .phoneCall').val('');
	let crateOrderPhoneHtml = '<div id="crateOrderPhone" class="r_panel">' +
		'    <div class="panel-header">' +
		'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'        <h4 class="modal-title">创建居家订单</h4>' +
		'    </div>' +
		'	 <div class="panel-center"><p class="panel-infos">下单账号信息</p>' +
		'<div class="panel-content">' +
		'		  <ul><li><span>下单账号 :</span><input class="phoneCall" type="text" placeholder="请先输入下单账号" /></li><li><span class="random_phone">没有手机号码？点击这里生成随机账号 >></span></li></ul>' +
		'    </div></div>' +
		'	 <div class="panel-footer">' +
		' 		 <div class="footer-content"><span class="rp_close">取消</span><span>下一步</span></div>' +
		'	 </div>' +
		'</div>';
	let crateOrderPhone_panel = new RPModalPanel('crateOrderPhone', crateOrderPhoneHtml);
	crateOrderPhone_panel.show();
	if (str != 'home') {
		$('#crateOrderPhone .panel-header .modal-title').html('创建机构订单');
	} else {
		$('#crateOrderPhone .panel-header .modal-title').html('创建居家订单');
	}
	let crateOrderPhone_hasDiffno=getCookie('hasDiffno');
	if(crateOrderPhone_hasDiffno=='true'){
		$('#crateOrderPhone .panel-content ul li .random_phone').css({
			'display':'block',
		});
	}else{
		$('#crateOrderPhone .panel-content ul li .random_phone').css({
			'display':'none',
		});
	}
	$('body').off('click','#crateOrderPhone .panel-content ul li .random_phone').on('click','#crateOrderPhone .panel-content ul li .random_phone',function(){
		bootbox.confirm({
			title: "系统提示",
			message: "是否使用随机账号创建订单？",
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
				let httpUtilObj = new HttpUtil();
				httpUtilObj.ajax({
					url: '/adminjson/SAASCreateDiffnoUser',
				}).then((res)=>{
					if (isConfirm) {
						if (str == 'home') {
							orderManage_homeDetail(str, res.body.userId, res.body.diffno);
						} else {
							orderManage_HospitalDetail(str, res.body.userId, res.body.diffno);
						}
					}
				})
				
			}
		});
		
	})
	$('body').off('click', '#crateOrderPhone .panel-footer .footer-content span:nth-last-child(1)');
	$('body').on('click', '#crateOrderPhone .panel-footer .footer-content span:nth-last-child(1)', crateOrderPhoneSubmit)
	$('#crateOrderPhone .phoneCall').keydown(function (event) {
		if (event.keyCode == 13) {//回车
			crateOrderPhoneSubmit();
		}
	});
	function crateOrderPhoneSubmit() {
		let pattern = /^1[34578]\d{9}$/;//手机号校验正则
		let phoneNum = $('#crateOrderPhone .phoneCall').val();
		if (!pattern.test(phoneNum)) {
			Toast.error("请输入正确的电话号码");
		} else {
			orderCheckPhone(phoneNum, str);
		}
	}
}

function orderCheckPhone(phone, str) {
	let httpUtilObj = new HttpUtil();
	let data = {
		phone: phone
	}
	let userId = '';
	httpUtilObj.ajax({
		url: '/adminjson/SAASCheckUserExist',
		params: data
	}).then((res) => {
		if (res.errorCode == 0) {
			userId = res.body.userId;
			if (userId) {//账号已存在
				if (str == 'home') {
					orderManage_homeDetail(str, userId, phone);
				} else {
					orderManage_HospitalDetail(str, userId, phone);
				}
			} else {//账号不存在需要新建
				Toast.error("未检索到该手机号,请新增用户!");
				top.importOnceJS('js-script-adduser', "js/app/rp/adduser.js");
				top.G_Fun_showAddUserPanel(phone, str);
			}
		}
	})
}
//居家订单界面
function orderManage_homeDetail(str, id, phone) {
	let crateOrderhomeDetailHtml = '<div id="crateOrderHome" class="r_panel">' +
		'    <div class="panel-header">' +
		'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'        <h4 class="modal-title">创建居家订单</h4>' +
		'    </div>' +
		'<div class="panel-center">' +
		'	 <p class="panel-infos">下单账号信息</p>' +
		'	 <div class="panel-content">' +
		'		 <ul><li><span>下单账号 :</span><input class="phoneCall" disabled="disabled" type="text" placeholder="请先输入下单账号" /></li></ul>' +
		'		 <div class="panel-addr"><span>选择被服务人 :</span>' +
		'			 <ul class="order-w servicePerson"></ul><ul><li class="orderAddress serviceBtn" userId=' + id + '>+新增家庭成员</li></ul>' +
		'		 </div>' +
		'		 <div class="panel-addr"><span>联系地址 :</span>' +
		'			 <ul class="order-w addressDetail"></ul><ul><li class="orderAddress addressBtn" userId=' + id + '>+新增地址</li></ul>' +
		'		 </div>' +
		'		 <ul><li class="li_phone"><span>联系电话 :</span><input class="contactPhone" type="text" placeholder="请先输入联系电话" /></li></ul>' +
		'    </div>' +
		'	 <p class="panel-infos">选择需要创建的订单类型</p>' +
		'	 <div class="panel-service">' +
		'	 	 <div class="panel-time">服务开始时间：<span class="orderhome_selectTime">选择时间</span><i service_start_time="" service_end_time="" service_date="" service_time=""></i><div class="order-timebox"><div class="time-top"><span>取消</span><span>确定</span></div><div class="timeDetail"><div class="date-alias"></div><ul></ul><dl></dl></div></div></div>' +
		'	 <div class="securityAssess"><span>安全风险评估：</span><textarea></textarea></div>'+
		'		 <div class="panel-sevice-detail"><span>选择服务类型 :</span>' +
		'			 <ul><li>' +
		'					<select class="serviceType">' +
		'						<option value="101">居家照护</option>' +
		'						<option value="102">家庭护士</option>' +
		'						<option value="103">康复护理</option>' +
		'						<option value="104">中医理疗</option>' +
		'						<option value="105">金牌月嫂</option>' +
		'						<option value="106">就医陪护</option>' +
		'						<option value="107">心理慰藉</option>' +
		'						<option value="108">产后修复</option>' +
		'						<option value="109">育婴幼教</option>' +
		'						<option value="110">临终关怀</option>' +
		'					</select>' +
		'			 </li></ul>' +
		'		 </div>' +
		'		 <div class="panel-sevice-detail service-detail-text"><span>选择服务项 :</span>' +
		'			 <ul></ul>' +
		'		 </div>' +
		'	 </div>' +
		'		 <p class="panel-infos">支付信息</p>' +
		'	 <div class="panel-payment">' +
		'	 	 <div class="panel-money">预付款：<span></span>元</div>' +
		'		 <div class="panel-money-detail"><span>收款方式:</span>' +
		'			 <ul><li><input type="radio" name="money" value="" /><span>线上收款（线上收款请提示用户在客户端完成付款，付款时效为2小时内）</span></li>' +
		'				 <li><input type="radio" name="money" value="" /><span>线下收款（线下收款请确保已现金收取预付款）</span></li></ul>' +
		'		 </div>' +
		'	 </div>' +
		'</div>' +
		'	 <div class="panel-footer">' +
		' 		 <div class="footer-content"><span class="rp_close">取消</span><span class="orderSubmit">创建</span></div>' +
		'	 </div>' +
		'</div>';
	let crateOrderHome_panel = new RPModalPanel('crateOrderHome', crateOrderhomeDetailHtml);
	crateOrderHome_panel.show();
	$('#crateOrderHospital').removeClass('rpshow');
	getOrderTime('#crateOrderHome');//时间
	$('.panel-time i').empty();//选择时间清空
	orderManage_getKinsfolk(id, '#crateOrderHome');
	getOrderAddress(id, '#crateOrderHome');//地址
	let pattern_phone = /^1[34578]\d{9}$/;//手机号校验正则
	if(!pattern_phone.test(phone)){
		$('#crateOrderHome .li_phone').css('display','none');
	}else{
		$('#crateOrderHome .li_phone').css('display','block');
	}
	$('body').off('click', '#crateOrderHome .addressBtn').on('click', '#crateOrderHome .addressBtn', function () {
		top.importOnceJS('js-script-useraddress', "js/app/rp/useraddress.js");
		top.setId('userId', $(this).attr('userId'));
		top.G_Fun_showAddUserAddressPanel(id, '#crateOrderHome').then((res)=>{
			getOrderAddress(id, '#crateOrderHome');//地址
		})
	}).off('click', '#crateOrderHome .orderhome_selectTime').on('click', '#crateOrderHome .orderhome_selectTime', function () {
		if ($('#crateOrderHome .panel-time .order-timebox').hasClass('service_hide')) {
			$('#crateOrderHome .panel-time .order-timebox').removeClass('service_hide');
		} else {
			$('#crateOrderHome .panel-time .order-timebox').addClass('service_hide');
			let dlNode = $('#crateOrderHome .panel-service .panel-time>div .timeDetail dl');
			dlNode.empty();
			let curr_date = $('.panel-time i').attr('service_date');
			let curr_time = $('.panel-time i').attr('service_time');
			let timeList = order_timeList;
			for (let im = 0; im < $('#crateOrderHome .panel-service .panel-time>div .timeDetail>ul li').length; im++) {
				$('#crateOrderHome .panel-service .panel-time>div .timeDetail>ul li').eq(im).removeClass('selected');
				if (curr_date == $('#crateOrderHome .panel-service .panel-time>div .timeDetail>ul li').eq(im).html()) {
					$('#crateOrderHome .panel-service .panel-time>div .timeDetail>ul li').eq(im).addClass('selected');
				}
			}
			for (let i = 0; i < order_timeList.length; i++) {
				if (curr_date == order_timeList[i].dayStr) {
					for (let j = 0; j < timeList[i].dayTimeData.amList.length; j++) {
						var dl_li_am = '';
						if (timeList[i].dayTimeData.amList[j].status == undefined || !timeList[i].dayTimeData.amList[j].status) {
							dl_li_am = $('<dd timestr=' + timeList[i].dayTimeData.amList[j].time + ' class="out-time">' + timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
						} else {
							dl_li_am = $('<dd timestr=' + timeList[i].dayTimeData.amList[j].time + '>' + timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
						}
						dlNode.append(dl_li_am);
					}
					for (let p = 0; p < timeList[0].dayTimeData.pmList.length; p++) {
						var dl_li_pm = $('<dd>' + timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
						if (timeList[i].dayTimeData.pmList[p].status == undefined || !timeList[i].dayTimeData.pmList[p].status) {
							dl_li_pm = $('<dd timestr=' + timeList[i].dayTimeData.pmList[p].time + ' class="out-time">' + timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
						} else {
							dl_li_pm = $('<dd timestr=' + timeList[i].dayTimeData.pmList[p].time + '>' + timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
						}
						dlNode.append(dl_li_pm);
					}
				}
			}
			for (let m = 0; m < dlNode.find('dd').length; m++) {
				if (curr_time == dlNode.find('dd').eq(m).attr('timestr')) {
					dlNode.find('dd').eq(m).addClass('selected');
					break;
				}
			}
		}
	}).off('click', '#crateOrderHome .panel-service .panel-time>div .timeDetail ul li').on('click', '#crateOrderHome .panel-service .panel-time>div .timeDetail ul li', function () {
		var clickliNode = $(this).parent().find('li');
		for (let im = 0; im < clickliNode.length; im++) {
			clickliNode.eq(im).removeClass('selected');
		}
		$(this).addClass('selected');
		let dlNode = $('#crateOrderHome .panel-service .panel-time>div .timeDetail dl');
		dlNode.empty();
		for (let i = 0; i < order_timeList.length; i++) {
			if ($(this).html() == order_timeList[i].dayStr) {
				for (let j = 0; j < order_timeList[i].dayTimeData.amList.length; j++) {
					var dl_li_am = '';
					if (order_timeList[i].dayTimeData.amList[j].status == undefined || !order_timeList[i].dayTimeData.amList[j].status) {
						dl_li_am = $('<dd timestr=' + order_timeList[i].dayTimeData.amList[j].time+' class="out-time">' + order_timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
					} else {
						dl_li_am = $('<dd timestr=' + order_timeList[i].dayTimeData.amList[j].time+'>' + order_timeList[i].dayTimeData.amList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.amList[j].serviceEndTime + '" /></dd>');
					}
					dlNode.append(dl_li_am);
				}
				for (let p = 0; p < order_timeList[i].dayTimeData.pmList.length; p++) {
					var dl_li_pm = '';
					if (order_timeList[i].dayTimeData.pmList[p].status == undefined || !order_timeList[i].dayTimeData.pmList[p].status) {
						dl_li_pm = $('<dd timestr=' + order_timeList[i].dayTimeData.pmList[p].time+' class="out-time">' + order_timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
					} else {
						dl_li_pm = $('<dd timestr=' + order_timeList[i].dayTimeData.pmList[p].time+'>' + order_timeList[i].dayTimeData.pmList[p].time + '<input class="serviceStartTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + order_timeList[i].dayTimeData.pmList[p].serviceEndTime + '" /></dd>');
					}
					dlNode.append(dl_li_pm);
				}
				for (let m = 0; m < dlNode.find('dd').length; m++) {
					if (!dlNode.find('dd').eq(m).hasClass('out-time')) {
						dlNode.find('dd').eq(m).addClass('selected');
						return false;
					}
				}
			}
		}
	}).off('click', '#crateOrderHome .panel-service .panel-time>div .timeDetail dl dd').on('click', '#crateOrderHome .panel-service .panel-time>div .timeDetail dl dd', function () {
		if (!$(this).hasClass('out-time')) {
			var clickliNode = $(this).parent().find('dd');
			for (let i = 0; i < clickliNode.length; i++) {
				clickliNode.eq(i).removeClass('selected');
			}
			$(this).addClass('selected');
		}

	}).off('click', '#crateOrderHome .panel-service .panel-time>div .time-top span:nth-child(1)').on('click', '#crateOrderHome .panel-service .panel-time>div .time-top span:nth-child(1)', function () {
		$('#crateOrderHome .panel-time>div').removeClass('service_hide');
	}).off('click', '#crateOrderHome .panel-service .panel-time>div .time-top span:nth-child(2)').on('click', '#crateOrderHome .panel-service .panel-time>div .time-top span:nth-child(2)', function () {
		var ul_liNOde = $('#crateOrderHome .panel-service .panel-time>div .timeDetail ul li');
		var dl_liNOde = $('#crateOrderHome .panel-service .panel-time>div .timeDetail dl dd');
		var ul_time = '';
		var dl_time = '';
		var dl_start_time = '';
		var dl_end_time = '';
		var flag = false;
		for (let i = 0; i < ul_liNOde.length; i++) {
			if (ul_liNOde.eq(i).hasClass('selected')) {
				ul_time = ul_liNOde[i].innerHTML;
			}
		}
		for (let j = 0; j < dl_liNOde.length; j++) {
			if (dl_liNOde.eq(j).hasClass('selected')) {
				dl_time = dl_liNOde.eq(j).attr('timestr');
				console.log(dl_time);
				dl_start_time = dl_liNOde.eq(j).find('.serviceStartTime').val();
				dl_end_time = dl_liNOde.eq(j).find('.serviceEndTime').val();
				flag = true;
			}
		}
		
		$('#crateOrderHome .panel-time>div').removeClass('service_hide');
		if (flag) {
			$('.panel-time i').empty();
			$('.panel-time i').attr('service_start_time', '');
			$('.panel-time i').attr('service_end_time', '');
			$('.panel-time i').attr('service_date', '');
			$('.panel-time i').attr('service_time', '');
			$('.panel-time i').html(ul_time + '&nbsp;&nbsp;' + dl_time);
			$('.panel-time i').attr('service_start_time', dl_start_time);
			$('.panel-time i').attr('service_end_time', dl_end_time);
			$('.panel-time i').attr('service_date', ul_time);
			$('.panel-time i').attr('service_time', dl_time);
		}
	}).off('click', '#crateOrderHome .serviceBtn').on('click', '#crateOrderHome .serviceBtn', function () {
		top.importOnceJS('js-script-kinsfolk', "js/app/rp/kinsfolk.js");
		top.setId('userId', $(this).attr('userId'));
		top.G_Fun_showAddKinsfolkPanel(id, '#crateOrderHome');
	}).off('click', '#crateOrderHome .servicePerson li').on('click', '#crateOrderHome .servicePerson li', function () {
		let folkLiNode = $('#crateOrderHome .servicePerson li');
		for (let i = 0; i < folkLiNode.length; i++) {
			folkLiNode.eq(i).removeClass('selected');
		}
		$(this).addClass('selected');
	}).off('click', '#crateOrderHome .service-detail-text ul li').on('click', '#crateOrderHome .service-detail-text ul li', function () {
		let service_detail_text = $('#crateOrderHome .service-detail-text ul li');
		for (let i = 0; i < service_detail_text.length; i++) {
			service_detail_text.eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#crateOrderHome .addressDetail li').on('click', '#crateOrderHome .addressDetail li', function () {
		for (let i = 0; i < $('#crateOrderHome .addressDetail li').length; i++) {
			$('#crateOrderHome .addressDetail li').eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#crateOrderHome .panel-payment .panel-money-detail ul li').on('click', '#crateOrderHome .panel-payment .panel-money-detail ul li', function () {
		for (let i = 0; i < $('#crateOrderHome .panel-payment .panel-money-detail ul li').length; i++) {
			$('#crateOrderHome .panel-payment .panel-money-detail ul li').eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#crateOrderHome .panel-footer .orderSubmit').on('click', '#crateOrderHome .panel-footer .orderSubmit', function () {
		//userId-addrId-kinsId-phone-priceId-serviceStartTime-serviceEndTime
		let home_securityAssess,home_phone, home_addrId, home_kinsId, home_priceId, home_serviceStartTime, home_serviceEndTime, paymentWay;
		//获取addrid
		for (let i = 0; i < $('#crateOrderHome .addressDetail li').length; i++) {
			if ($('#crateOrderHome .addressDetail li').eq(i).find('input[type=radio]').prop('checked')) {
				home_addrId = $('#crateOrderHome .addressDetail li').eq(i).attr('addrid');
			}
		}
		
		let pattern = /^1[34578]\d{9}$/;//手机号校验正则
		if (!pattern.test(phone)) {//随机生成的账号
			home_phone='';
		}else{
			//获取phone
			home_phone = $('#crateOrderHome .contactPhone').val();
			if (!pattern.test(home_phone)) {
				Toast.error("请输入正确的电话号码");
				return false;
			}
		}
		
		//获取kinsid
		for (let j = 0; j < $('#crateOrderHome .servicePerson li').length; j++) {
			if ($('#crateOrderHome .servicePerson li').eq(j).hasClass('selected')) {
				home_kinsId = $('#crateOrderHome .servicePerson li').eq(j).attr('kinsid');
			}
		}
		//获取priceid
		for (let p = 0; p < $('#crateOrderHome .service-detail-text ul li').length; p++) {
			if ($('#crateOrderHome .service-detail-text ul li').eq(p).find('input[type=radio]').prop('checked')) {
				home_priceId = $('#crateOrderHome .service-detail-text li').eq(p).attr('priceid');
			}
		}
		let timeNode = $('#crateOrderHome .panel-service .panel-time i');
		if (!timeNode.html()) {
			Toast.error("请选择服务时间！");
			return false;
		}
		if ($('#crateOrderHome .panel-money-detail ul li').eq(0).find('input[type=radio]').prop('checked')) {
			paymentWay = 1;
		} else {
			paymentWay = 2;
		}
		home_serviceStartTime = timeNode.attr('service_start_time');
		home_serviceEndTime = timeNode.attr('service_end_time');
		home_securityAssess=$('#crateOrderHome .panel-center .securityAssess textarea').val()||'';
		let params = {
			orderType: 2,
			userId: id,
			addrId: home_addrId,
			kinsId: home_kinsId,
			priceId: home_priceId,
			phone: home_phone,
			serviceStartTime: home_serviceStartTime,
			serviceEndTime: home_serviceEndTime,
			securityAssess:home_securityAssess,
		};
		console.log(params);
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/SAASCreateOrder  ',
			params: params
		}).then((res) => {
			var orderId = res.body.orderId;
			if (paymentWay == 1) {
				Toast.success("创建成功");
				$('#rp-wrapper').empty();
				$('#transparent-mask').hide();
				$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
			} else {
				orderGoDopay(orderId, id);
			}
		})
	})



	$('#crateOrderHome .panel-payment .panel-money-detail ul li').eq(0).find('input[type=radio]').prop('checked', 'checked');
	orderHomeServiceType();
	$('body').find('#crateOrderHome .serviceType').on('change', orderHomeServiceType);
	$('#crateOrderHome .phoneCall').val(phone);//单号
	$('#crateOrderHome .contactPhone').val(phone);//默认单号
	$(document).bind('click', function (e) {
		var src = e.target;
		if (src.className != 'service_hide' && src.className != 'orderhome_selectTime') {
			if (src.closest('.service_hide') == null) {
				$('#crateOrderHome .panel-time>div').removeClass('service_hide');
			}
		}
	})
}


//机构订单界面
function orderManage_HospitalDetail(str,data) {
	let crateOrderHospitalHtml = '<div id="crateOrderHospital" class="r_panel adduser">' +
		'    <div class="panel-header">' +
		'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'        <div class="modal-title">创建订单（请认真核对以下信息）</div>' +
		'    </div>' +
		'<div class="panel-center">' +
		'		<p class="panel-infos">住院手环以及入院通知单照片</p>'+
		'		<div class="panel-infopic">' +
		'			<ul>'+
//		'				<li class="haspic"><img src="http://s.1-1dr.com/f/signature/66/40/308274482265456640.png"/></li>'+
//		'				<li class="haspic"><img src="http://s.1-1dr.com/f/signature/66/40/308274482265456640.png"/></li>'+
		'				<li class="hos_pic1"><p>点击拍摄住院手环/入院通知单</p><img imgid="" src /></li>'+
		'				<li class="hos_pic2"><p>点击拍摄住院手环/入院通知单</p><img imgid="" src /></li>'+
		'			</ul>'+
		'  		</div>' +
		'	 <p class="panel-infos">下单账号信息</p>' +
		'	 <div class="panel-content">' +
		'		<ul><li><span>服务机构：</span><select class="orgService"></select></li><li><span>下单账号：</span><input class="phoneCall" type="number" placeholder="请先输入下单账号" /></li>' +
		'				<li><span>　住院号：</span><input class="hospital_orgno" type="text" placeholder="请输入住院号或扫描手环二维码"><i class="org_hide org-search">查询</i><p class="his-infos org_hide"></p></li>'+
		'				<li><span>　　性别：</span><select name="" class="hospital_sexselect"><option value="男" selected=selected>男</option><option value="女">女</option></select></li>'+
		'				<li><span>　　姓名：</span><input class="hospital_name" kinsid="0" type="text" placeholder="请输入姓名"></li>'+
		'				<li><span>　　年龄：</span><input class="hospital_ageInput" type="text" placeholder="请输入年龄"></li>'+
		'				<li><span>入院日期：</span><input class="hospital_date" name="hospital_org" type="text" placeholder="请选择入院日期"></li>'+
		'				<li><span>住院科室：</span><select class="departService org_hide"></select></li>'+
		'				<li><span>床号（没有可不填）：</span><input class="hospital_bed" name="hospital_bed" type="text" placeholder="请输入床号 如（19床）"></li>'+
		'		</ul>'+
		'		 <div class="panel-addr"><span>选择被服务人 :</span>' +
		'			 <ul class="order-w servicePerson"></ul><ul><li class="orderAddress serviceBtn" userId=>+新增家庭成员</li></ul>' +
		'		 </div>' +
//		'		 <ul><li class=li_phone><span>联系电话 :</span><input class="contactPhone" type="text" placeholder="请先输入联系电话" /></li></ul>' +
		'    </div>' +
		'	 <p class="panel-infos">服务信息</p>' +
		'	 <div class="panel-service">' +
		'	 	 <div class="panel-time">服务开始时间：<span class="orderHospital_selectTime">选择时间</span><i service_start_time="" service_end_time="" service_date="" service_time=""></i><div class="order-timebox"><div class="time-top"><span>取消</span><span>确定</span></div><div class="timeDetail"><div class="date-alias"></div><ul></ul><dl></dl></div></div></div>' +
		'		 <div class="panel-sevice-detail service-detail-text"><span>选择服务项 :</span>' +
		'			 <div class="serviceDetail-box"><div class="serviceDetail-top"><span><i class=selected>贴心专陪</i><i>温馨普陪</i></span></div><div class="serviceDetail-content"><ul class="serviceDetail-content-1 selected"></ul><ul class=serviceDetail-content-2></ul></div></div>' +
		'		 </div>' +
		'	 	<div class="select_gate"><span>门禁卡：</span><i><input type="checkbox" checked="checked"/><em>是否需要办理门禁卡</em></i></div>' +
		'	 </div>' +
		'		 <p class="panel-infos">支付信息</p>' +
		'	 <div class="panel-payment">' +
		'	 	 <div class="panel-money hospital_pre">预付款：<span>0.00</span>元</div>' +
		'	 	 <div class="panel-money entrance">门禁卡：<span>0.00</span>元</div>' +
		'	 	 <div class="panel-money hospital_count">总价　：<span>0.00</span>元</div>' +
//		'		 <div class="panel-money-detail"><span>收款方式:</span>' +
//		'			 <ul><li><input type="radio" name="money" value="" /><span>线上收款（线上收款请提示用户在客户端完成付款，付款时效为2小时内）</span></li>' +
//		'				 <li><input type="radio" name="money" value="" /><span>线下收款（线下收款请确保已现金收取预付款）</span></li></ul>' +
//		'		 </div>' +
		'	 </div>' +
		'</div>' +
		'	 <div class="panel-footer">' +
		' 		 <div class="footer-content"><span class="rp_close">取消</span><span class="orderSubmit footer-sure">下一步</span></div>' +
		'	 </div>' +
		'</div>';
	let crateOrderHospital_panel = new RPModalPanel('crateOrderHospital', crateOrderHospitalHtml);
	crateOrderHospital_panel.show();
	let dtd = $.Deferred();
	let userId='';
	$('#crateOrderHome').removeClass('rpshow');
	if(str=='hasone'){//识别---新建
		$('#crateOrderHospital .panel-infopic ul li:nth-child(1)').find('img').attr('src',data.imgUrl);
		$('#crateOrderHospital .panel-infopic ul li:nth-child(1)').find('img').attr('imgid',data.imageId);
		$('#crateOrderHospital .hospital_name').val(data.hospitalBra.name);
		$('#crateOrderHospital .hospital_orgno').val(data.hospitalBra.orgNO);
		$('#crateOrderHospital .panel-infopic ul li:nth-child(1)').addClass('haspic');
	}
	//图片识别
	$('#crateOrderHospital .panel-infopic ul li').off('click').on('click',function(){
		var self=$(this);
		orderManage_iframe_getphoto('inorder').then((res)=>{
			self.addClass('haspic');
			self.find('img').attr('src',res.imgUrl);
			self.find('img').attr('imgid',res.imageId);
			if(res.hospitalBra.orgNO==undefined||res.hospitalBra.name==undefined){
				Toast.error("图片识别失败");
			}else{
				Toast.success("图片识别成功");
				$('#crateOrderHospital .hospital_name').val(res.hospitalBra.name);
				$('#crateOrderHospital .hospital_orgno').val(res.hospitalBra.orgNO);
			}
		})
	});
	//扫描二维码------住院号
	$('#crateOrderHospital .hospital_orgno').keyup((evt)=>{
		if($('#crateOrderHospital .orgService option:selected').attr('ishis')=='false'){
			return false;
		}
		let org_num=$('#crateOrderHospital .hospital_orgno').val();
		if(org_num.indexOf("ZY")!=-1&&org_num.length==14){
			let arr=org_num.split('');
			arr.splice(0,4);
			$('#crateOrderHospital .hospital_orgno').val(arr.join(''));
		}
		if (evt.keyCode == 13) {//回车
			$('#crateOrderHospital .org-search').click();
		}
	})
	//点击根据住院号查询
	$('#crateOrderHospital .org-search').off('click').on('click',function(){
		let org_num=$('#crateOrderHospital .hospital_orgno').val();
		let httpUtilObj = new HttpUtil();
		let params={
			userId:userId,
			orgId:$('#crateOrderHospital .orgService option:selected').val(),
			orgNO:org_num,
		}
		if(!userId){
			Toast.error("请先输入正确的电话号码");
			return false;
		}
		if(!org_num){
			Toast.error("请输入住院号或扫描手环二维码");
			return false;
		}
		if(org_num.length!=10){
			Toast.error("请输入十位数的住院号");
			return false;
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetUserInfoByOrgNO',
			params: params
		}).then((res)=>{//10-未查询到该住院号，请暂时手动输入用户信息，1-院方系统出现问题，请暂时手动输入用户信息，进行提交订单”
			let code_data=res.body;
			if(code_data.hasOrder){
				hosCheckOrgNum(org_num);
			}
			if(code_data.rspFlag>=10){//不可进行下单
				$('#crateOrderHospital .his-infos').html(code_data.errorMsg).removeClass('org_hide');
				$('#crateOrderHospital .his-infos').animate({left:"+=15px"},50)
                .animate({left:"-=15px"},50)
                .animate({left:"-=15px"},50)
                .animate({left:"+=15px"},50)
                .animate({left:"+=15px"},50)
                .animate({left:"-=15px"},50);
			}else if(res.body.rspFlag==1){
				Toast.error("院方系统出现问题，请暂时手动输入用户信息，进行提交订单");
				return false;
			}else{//查询成功
				//admissionDate-bedNO-branchId-branchName-orgId-orgNO-sex-age-userName
				$('#crateOrderHospital .hospital_sexselect').attr('disabled',true).val(code_data.sex==1?"男":"女");
				$('#crateOrderHospital .hospital_name').attr('disabled',true).val(code_data.userName).attr('kinsId',code_data.kinsId);
				$('#crateOrderHospital .hospital_ageInput').attr('disabled',true).val(code_data.age).addClass('his-input');
				$('#crateOrderHospital .hospital_date').val(code_data.admissionDate);
				if(code_data.branchId){
					$('#crateOrderHospital .departService').attr('disabled',true).val(code_data.branchId);
				}
				if(code_data.bedNO!=''){
					$('#crateOrderHospital .hospital_bed').attr('disabled',true).val(code_data.bedNO);
				}else{
					$('#crateOrderHospital .hospital_bed').attr('disabled',false).val('');
				}
				orderHospitalService_detail();
				if($('#crateOrderHospital .servicePerson li.selected').length){
					for(let i=0;i<$('#crateOrderHospital .servicePerson li').length;i++){
						$('#crateOrderHospital .servicePerson li').eq(i).removeClass('selected');
					}
				}
			}
		})
	})
	function hosCheckOrgNum(num){
		bootbox.confirm({
			title: "提示",
			message: '查询该住院号已有订单，是否查看？',
			buttons: {
				confirm: {
					label: '查看订单',
					//					className: 'btn-success'
				},
				cancel: {
					label: '继续下单',
					//					className: 'btn-danger'
				}
			},
			callback: function (isConfirm) {
				if (isConfirm) {
					$('#rp-wrapper').empty();
					$('#transparent-mask').hide();
					dtd.resolve(num);
					return dtd.promise();
				}
			}
		});
	}
	//输入手机号进行用户选择
	$('#crateOrderHospital .phoneCall').keyup(function (event) {
		var key_phone=$('#crateOrderHospital .phoneCall').val();
		if(key_phone.length==11){
			var pattern_phone = /^1[34578]\d{9}$/;//手机号校验正则
			if(pattern_phone.test(key_phone)){
				let httpUtilObj = new HttpUtil();
				let params;
				if(str=='hasone'){
					params={
						phone:key_phone,
						kinsName:data.name,
						orgNO:data.orgNO,
					}
				}else{
					params={
						phone:key_phone,
					}
				}
				
				httpUtilObj.ajax({
					url: '/adminjson/SAASGetUserByPhone',
					params: params
				}).then((res)=>{
					userId=res.body.userId;
					$('#crateOrderHospital .orderAddress').attr('userId',res.body.userId);
					if(res.body.kinsName!=undefined){
						$('#crateOrderHospital .hospital_name').val(res.body.kinsName);
					}
					if(res.body.kinsId!=undefined){
						$('#crateOrderHospital .hospital_name').attr('kinsId',res.body.kinsId);
					}
					$('#crateOrderHospital .hospital_orgno').focus();//聚焦至住院号处
					//家庭成员，被服务人
					orderManage_getKinsfolk(res.body.userId, '#crateOrderHospital');
				})
			}else{
				Toast.error("请输入正确的电话号码");
				$('#crateOrderHospital').find('.servicePerson').empty();
			}
		}else{
			$('#crateOrderHospital').find('.servicePerson').empty();
		}
	});
	$('input[name="hospital_org"]').daterangepicker({
		singleDatePicker: true,
        showDropdowns: true,
        "locale": {
			"format": "YYYY-MM-DD",
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
		},
	}); 
	getOrderTime('#crateOrderHospital');//时间
	$('#crateOrderHospital .select_gate i input').off('click').on('click',function(){
		if($(this).prop('checked')){
			$(this).prop('checked',false);
		}else{
			$(this).prop('checked',true);
		}
	});
	$('body').off('click', '#crateOrderHospital .serviceBtn').on('click', '#crateOrderHospital .serviceBtn', function () {
		if(!$(this).attr('userId')){
			Toast.error("请先输入正确的电话号码");
			return false;
		}
		top.importOnceJS('js-script-kinsfolk', "js/app/rp/kinsfolk.js");
		top.setId('userId', $(this).attr('userId'));
		top.G_Fun_showAddKinsfolkPanel(userId, '#crateOrderHospital');
	}).off('click', '#crateOrderHospital .servicePerson li').on('click', '#crateOrderHospital .servicePerson li', function () {
		$('#crateOrderHospital .departService').attr('disabled',false);
		$('#crateOrderHospital .hospital_name').attr('disabled',true);
		$('#crateOrderHospital .hospital_sexselect').attr('disabled',true);
		$('#crateOrderHospital .hospital_ageInput').attr('disabled',true);
		let folkLiNode = $('#crateOrderHospital .servicePerson li');
		for (let i = 0; i < folkLiNode.length; i++) {
			folkLiNode.eq(i).removeClass('selected');
		}
		$(this).addClass('selected');
		$('#crateOrderHospital .hospital_name').val($(this).find('span strong').html());
		$('#crateOrderHospital .hospital_name').attr('kinsId',$(this).attr('kinsid'));
		$('#crateOrderHospital .hospital_ageInput').val($(this).find('span b').html());
		$('#crateOrderHospital .hospital_sexselect').val($(this).find('span i').html());
	}).off('click', '#crateOrderHospital .orderHospital_selectTime').on('click', '#crateOrderHospital .orderHospital_selectTime', function () {
		if ($('#crateOrderHospital .panel-time .order-timebox').hasClass('service_hide')) {
			$('#crateOrderHospital .panel-time .order-timebox').removeClass('service_hide');
		} else {
			$('#crateOrderHospital .panel-time .order-timebox').addClass('service_hide');
			//获取默认的时间
			let dlNode = $('#crateOrderHospital .panel-service .panel-time>div .timeDetail dl');
			dlNode.empty();
			let curr_date = $('.panel-time i').attr('service_date');
			let curr_time = $('.panel-time i').attr('service_time');
			let m_timeList = order_timeList;
			for (let im = 0; im < $('#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li').length; im++) {
				$('#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li').eq(im).removeClass('selected');
				if (curr_date == $('#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li').eq(im).html()) {
					$('#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li').eq(im).addClass('selected');
				}
			}
			for (let i = 0; i < order_timeList.length; i++) {
				if (curr_date == order_timeList[i].dayStr) {
					for (let j = 0; j < m_timeList[i].dayTimeData.mList.length; j++) {
						var dl_dd = '';
						if (m_timeList[i].dayTimeData.mList[j].status == undefined) {
							dl_dd = $('<dd timestr=' + m_timeList[i].dayTimeData.mList[j].timeStr + ' class="out-time">' + m_timeList[i].dayTimeData.mList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceEndTime + '" /></dd>');
						} else {
							dl_dd = $('<dd timestr=' + m_timeList[i].dayTimeData.mList[j].timeStr + '>' + m_timeList[i].dayTimeData.mList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceEndTime + '" /></dd>');
						}
						dlNode.append(dl_dd);
					}
					for (let m = 0; m < dlNode.find('dd').length; m++) {
						if (curr_time == dlNode.find('dd').eq(m).attr('timestr')) {
							dlNode.find('dd').eq(m).addClass('selected');
							break;
						}
					}
				}
			}
		}
	}).off('click', '#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li').on('click', '#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li', function () {
		var clickliNode = $(this).parent().find('li');
		for (let im = 0; im < clickliNode.length; im++) {
			clickliNode.eq(im).removeClass('selected');
		}
		$(this).addClass('selected');
		let dlNode = $('#crateOrderHospital .panel-service .panel-time>div .timeDetail dl');
		dlNode.empty();
		let m_timeList = order_timeList;
		console.log(m_timeList);
		for (let i = 0; i < order_timeList.length; i++) {
			if ($(this).html() == order_timeList[i].dayStr) {
				for (let j = 0; j < m_timeList[i].dayTimeData.mList.length; j++) {
					var dl_dd = '';
					if (m_timeList[i].dayTimeData.mList[j].status == undefined) {
						dl_dd = $('<dd timestr=' + m_timeList[i].dayTimeData.mList[j].timeStr + ' class="out-time">' + m_timeList[i].dayTimeData.mList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceEndTime + '" /></dd>');
					} else {
						dl_dd = $('<dd timestr=' + m_timeList[i].dayTimeData.mList[j].timeStr + '>' + m_timeList[i].dayTimeData.mList[j].time + '<input class="serviceStartTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceStartTime + '" /><input class="serviceEndTime" type="hidden" name="" value="' + m_timeList[i].dayTimeData.mList[j].serviceEndTime + '" /></dd>');
					}
					dlNode.append(dl_dd);
				}
				for (let m = 0; m < dlNode.find('dd').length; m++) {
					if (!dlNode.find('dd').eq(m).hasClass('out-time')) {
						dlNode.find('dd').eq(m).addClass('selected');
						return false;
					}
				}
			}
		}
	}).off('click', '#crateOrderHospital .panel-service .panel-time>div .timeDetail dl dd').on('click', '#crateOrderHospital .panel-service .panel-time>div .timeDetail dl dd', function () {
		if (!$(this).hasClass('out-time')) {
			var clickliNode = $(this).parent().find('dd');
			for (let i = 0; i < clickliNode.length; i++) {
				clickliNode.eq(i).removeClass('selected');
			}
			$(this).addClass('selected');
		}

	}).off('click', '#crateOrderHospital .panel-service .panel-time>div .time-top span:nth-child(1)').on('click', '#crateOrderHospital .panel-service .panel-time>div .time-top span:nth-child(1)', function () {
		$('#crateOrderHospital .panel-time>div').removeClass('service_hide');
	}).off('click', '#crateOrderHospital .panel-service .panel-time>div .time-top span:nth-child(2)').on('click', '#crateOrderHospital .panel-service .panel-time>div .time-top span:nth-child(2)', function () {
		var ul_liNOde = $('#crateOrderHospital .panel-service .panel-time>div .timeDetail>ul li');
		var dl_liNOde = $('#crateOrderHospital .panel-service .panel-time>div .timeDetail>dl dd');
		var ul_time = '';
		var dl_time = '';
		var flag = false;
		var dl_start_time = '';
		var dl_end_time = '';
		for (let i = 0; i < ul_liNOde.length; i++) {
			if (ul_liNOde.eq(i).hasClass('selected')) {
				ul_time = ul_liNOde[i].innerHTML;
			}
		}
		for (let j = 0; j < dl_liNOde.length; j++) {
			if (dl_liNOde.eq(j).hasClass('selected')) {
				dl_time = dl_liNOde.eq(j).attr('timestr');
				dl_start_time = dl_liNOde.eq(j).find('.serviceStartTime').val();
				dl_end_time = dl_liNOde.eq(j).find('.serviceEndTime').val();
				flag = true;
			}
		}
		$('#crateOrderHospital .panel-time>div').removeClass('service_hide');
		if (flag) {
			$('.panel-time i').empty();
			$('.panel-time i').attr('service_start_time', '');
			$('.panel-time i').attr('service_end_time', '');
			$('.panel-time i').attr('service_date', '');
			$('.panel-time i').attr('service_time', '');
			$('.panel-time i').html(ul_time + '&nbsp;&nbsp;' + dl_time);
			$('.panel-time i').attr('service_start_time', dl_start_time);
			$('.panel-time i').attr('service_end_time', dl_end_time);
			$('.panel-time i').attr('service_date', ul_time);
			$('.panel-time i').attr('service_time', dl_time);
		}
	}).off('click', '#crateOrderHospital .serviceDetail-content .serviceDetail-content-1 li').on('click', '#crateOrderHospital .serviceDetail-content .serviceDetail-content-1 li', function () {
		for (let i = 0; i < $('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1 li').length; i++) {
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1 li').eq(i).removeClass('selected');
		}
		$(this).addClass('selected');
		$('#crateOrderHospital .panel-payment .hospital_pre span').html($(this).attr('prefee'));
		if($('#crateOrderHospital .select_gate i input').prop('checked')){//选中门禁卡
			let pay=$(this).attr('totalfee');
			$('#crateOrderHospital .hospital_count span').html(pay);
		}else{
			let pay=$(this).attr('prefee');
			$('#crateOrderHospital .hospital_count span').html(pay);
		}
	}).off('click', '#crateOrderHospital .serviceDetail-content .serviceDetail-content-2 li').on('click', '#crateOrderHospital .serviceDetail-content .serviceDetail-content-2 li', function () {
		for (let i = 0; i < $('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2 li').length; i++) {
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2 li').eq(i).removeClass('selected');
		}
		$(this).addClass('selected');
		$('#crateOrderHospital .panel-payment .hospital_pre span').html($(this).attr('prefee'));
		if($('#crateOrderHospital .select_gate i input').prop('checked')){//选中门禁卡
			let pay=$(this).attr('totalfee');
			$('#crateOrderHospital .hospital_count span').html(pay);
		}else{
			let pay=$(this).attr('prefee');
			$('#crateOrderHospital .hospital_count span').html(pay);
		}
	}).off('click', '#crateOrderHospital .service-detail-text .serviceDetail-top span i').on('click', '#crateOrderHospital .service-detail-text .serviceDetail-top span i', function () {
		for (let i = 0; i < $('#crateOrderHospital .service-detail-text .serviceDetail-top span i').length; i++) {
			$('#crateOrderHospital .service-detail-text .serviceDetail-top span i').eq(i).removeClass('selected');
		}
		for(let k=0;k<$('#crateOrderHospital .serviceDetail-content-1 li').length;k++){
			$('#crateOrderHospital .serviceDetail-content-1 li').eq(k).removeClass('selected');
			if($('#crateOrderHospital .serviceDetail-content-1 li').eq(k).attr('defaultchecked')=='1'){
				$('#crateOrderHospital .serviceDetail-content-1 li').eq(k).addClass('selected');
			}
		}
		for(let lt=0;lt<$('#crateOrderHospital .serviceDetail-content-2 li').length;lt++){
			$('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).removeClass('selected');
			if($('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).attr('defaultchecked')=='1'){
				$('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).addClass('selected');
			}
		}
		$(this).addClass('selected');
		if ($('#crateOrderHospital .service-detail-text .serviceDetail-top span i').eq(0).hasClass('selected')) {
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').addClass('selected');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').removeClass('selected');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').css('display', 'block');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').css('display', 'none');
		} else {
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').removeClass('selected');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').addClass('selected');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').css('display', 'none');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').css('display', 'block');
		}
	}).off('click', '#crateOrderHospital .panel-payment .panel-money-detail ul li').on('click', '#crateOrderHospital .panel-payment .panel-money-detail ul li', function () {
		for (let i = 0; i < $('#crateOrderHospital .panel-payment .panel-money-detail ul li').length; i++) {
			$('#crateOrderHospital .panel-payment .panel-money-detail ul li').eq(i).find('input[type=radio]').prop('checked', false);
		}
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#crateOrderHospital .panel-footer .orderSubmit').on('click', '#crateOrderHospital .panel-footer .orderSubmit', function () {
		//userId-orgId-branchId-roomId-bedId-orderType-kinsId-phone-priceId-serviceStartTime-serviceEndTime
		let hospital_pic1,hospital_pic2,hospital_needExtra,hospital_orgNO,hospital_kinsName,hospital_age,hospital_sex,hospital_admissionDate,hospital_orgId, hospital_kinsId, hospital_priceId, hospital_serviceStartTime, hospital_serviceEndTime;
		hospital_orgId = $('#crateOrderHospital .orgService option:selected').val();//获取医院
		hospital_branchId = $('#crateOrderHospital .departService option:selected').val();//获取科室
		hospital_kinsId=$('#crateOrderHospital .hospital_name').attr('kinsid');
		hospital_pic1=$('#crateOrderHospital .panel-infopic ul li.hos_pic1 img').attr('imgid');
		hospital_pic2=$('#crateOrderHospital .panel-infopic ul li.hos_pic2 img').attr('imgid');
		let isHis=$('#crateOrderHospital .orgService option:selected').attr('ishis');//是否对接his
		let params={};
		if(userId==''){
			Toast.error("请输入下单账号！");
			return false;
		}
		hospital_orgNO=$('#crateOrderHospital .hospital_orgno').val();
		if(hospital_orgNO==''){
			Toast.error("请输入住院号！");
			return false;
		}
		if($('#crateOrderHospital .hospital_sexselect option:selected').val()=='男'){
			hospital_sex=1;
		}else{
			hospital_sex=2;
		}
		hospital_kinsName=$('#crateOrderHospital .hospital_name').val();
		if(hospital_kinsName==''){
			Toast.error("请输入姓名！");
			return false;
		}
		hospital_age=$('#crateOrderHospital .hospital_ageInput').val();
		if(hospital_age==''){
			Toast.error("请输入年龄！");
			return false;
		}
		hospital_admissionDate=$('#crateOrderHospital .hospital_date').val();
		if(hospital_admissionDate==''){
			Toast.error("请选择入院日期！");
			return false;
		}
		if($('#crateOrderHospital .select_gate i input').prop('checked')){
			hospital_needExtra=true;
		}else{
			hospital_needExtra=false;
		}
		let timeNode = $('#crateOrderHospital .panel-service .panel-time i');
		if (!timeNode.html()) {
			Toast.error("请选择服务时间！");
			return false;
		}
		hospital_serviceStartTime = timeNode.attr('service_start_time');
		hospital_serviceEndTime = timeNode.attr('service_end_time');
		if ($('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').eq(0).hasClass('selected')) {
			for (let i = 0; i < $('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').find('li').length; i++) {
				if ($('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').find('li').eq(i).hasClass('selected')) {
					hospital_priceId = $('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').find('li').eq(i).attr('priceid');
				}
			}
		}else{
			for (let i = 0; i < $('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').find('li').length; i++) {
				if ($('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').find('li').eq(i).hasClass('selected')) {
					hospital_priceId = $('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').find('li').eq(i).attr('priceid');
				}
			}
		}
		if(hospital_priceId==undefined){
			Toast.error("请选择所需服务！");
			return false;
		}
		let hospital_bedNO=$('#crateOrderHospital .hospital_bed').val();
		params = {
			pic1:hospital_pic1,
			pic2:hospital_pic2,
			orderType: 1,
			userId: userId,
			orgNO: hospital_orgNO,
			branchId: hospital_branchId,
			kinsId: hospital_kinsId,
			priceId: hospital_priceId,
			serviceStartTime: hospital_serviceStartTime,
			serviceEndTime: hospital_serviceEndTime,
			needExtra:hospital_needExtra,
			admissionDate:hospital_admissionDate,
			bedNO:hospital_bedNO,
		}
		if(isHis!='true'){//未连接his
			if(hospital_kinsId==0){
				params['kinsName']=hospital_kinsName;
				params['age']=hospital_age;
				params['sex']=hospital_sex;
			}
		}else{
			//his-infos---rspFlag>=10，停止下单
			if(!$('.his-infos').hasClass('org_hide')){
				Toast.error($('.his-infos').html());
				return false;
			}
			params['kinsName']=hospital_kinsName;
			params['age']=hospital_age;
			params['sex']=hospital_sex;
			params['isHis']=1;
		}
		console.log(params);
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/SAASCreateOrder',
			params: params
		}).then((res) => {
			var orderId = res.body.orderId;
			Toast.success("创建成功");
			top.tm.addTab('订单详情—'+hospital_kinsName, 'templates/orderDetail.html?orderId='+orderId);
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
//			$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
		})
	})
	orderHospitalServiceType_org();//服务类型-医院
	$('#crateOrderHospital .orgService').on('change', orderHospitalServiceType_depart);
	$('#crateOrderHospital .departService').on('change', orderHospitalService_detail);
	// $('#crateOrderHospital .roomService').on('change', orderHospitalService_bed);
//	$('#crateOrderHospital .phoneCall').val(phone);//默认单号
//	$('#crateOrderHospital .contactPhone').val(phone);//默认单号
	$('#crateOrderHospital .panel-payment .panel-money-detail ul li').eq(0).find('input[type=radio]').prop('checked', 'checked');
	$(document).bind('click', function (e) {
		var src = e.target;
		if (src.className != 'service_hide' && src.className != 'orderHospital_selectTime') {
			if (src.closest('.service_hide') == null) {
				$('#crateOrderHospital .panel-time>div').removeClass('service_hide');
			}
		}
	})
	return dtd.promise();
}
let orderHospitalServiceList = '';
function orderHospitalServiceType_org() {//获得权限的org和branch
	$('#crateOrderHospital .orgService').empty();
	let httpUtilObj = new HttpUtil();
	httpUtilObj.ajax({
		url: '/adminjson/SAASSearchOrder ',
	}).then((res) => {
		orderHospitalServiceList = res.body.rightJson;
		let orderHospital_orgList = res.body.rightJson.orgList;
		let orgServiceNode = $('#crateOrderHospital .orgService');//select
		for (let i = 0; i < orderHospital_orgList.length; i++) {
			let org_option = $('<option value=' + orderHospital_orgList[i].id + ' isHis='+(orderHospital_orgList[i].isHis==undefined?'false':orderHospital_orgList[i].isHis)+'>' + orderHospital_orgList[i].orgName + '</option>');
			orgServiceNode.append(org_option);
		}
		orderHospitalServiceType_depart('init');//服务类型-科室
	})
}
function orderHospitalServiceType_depart(str) {
	//住院号清空
	$('#crateOrderHospital .hospital_orgno').val('');
	$('#crateOrderHospital .departService').empty();
	let orgValue = $('#crateOrderHospital .orgService option:selected').val();//获取医院
	let orderHospital_departList = orderHospitalServiceList.branchMap[orgValue];
	let departServiceNode = $('#crateOrderHospital .departService');//select
	let isHis=$('#crateOrderHospital .orgService option:selected').attr('ishis');
	console.log(isHis);
	if(isHis=='true'){
		$('.org-search').removeClass('org_hide');
	}else{
		$('.org-search').addClass('org_hide');
	}
	if(str!='init'){//渲染后的change事件
		$('.his-infos').addClass('org_hide');//change成其他医院时
		if(!$('#crateOrderHome .servicePerson li.selected').length){//没有选择被陪护人
			$('#crateOrderHospital .hospital_sexselect').attr('disabled',false);
			$('#crateOrderHospital .hospital_name').attr('disabled',false).val('').attr('kinsId',0);
			$('#crateOrderHospital .hospital_ageInput').attr('disabled',false).removeClass('his-input').val('');
			$('#crateOrderHospital .hospital_date').val('');
			$('#crateOrderHospital .departService').attr('disabled',false);	
			$('#crateOrderHospital .hospital_bed').attr('disabled',false).val('');
		}
		if($('#crateOrderHospital .servicePerson li.selected').length){
			for(let i=0;i<$('#crateOrderHospital .servicePerson li').length;i++){
				$('#crateOrderHospital .servicePerson li').eq(i).removeClass('selected');
			}
		}
	}
	if (orderHospital_departList != undefined) {
		departServiceNode.removeClass('org_hide');
		departServiceNode.closest('li').removeClass('org_hide');
		for (let i = 0; i < orderHospital_departList.length; i++) {
			let depart_option='';
			if(i==0){
				depart_option= $('<option value=' + orderHospital_departList[i].id + ' selected=selected>' + orderHospital_departList[i].branchName + '</option>');	
			}else{
				depart_option=$('<option value=' + orderHospital_departList[i].id + '>' + orderHospital_departList[i].branchName + '</option>');	
			}
			departServiceNode.append(depart_option);
		}
		orderHospitalService_detail();//对应的服务类型
		// orderHospitalService_room();//对应的房间床号
	}else{
		$('#crateOrderHospital .serviceDetail-content-1').empty();
		$('#crateOrderHospital .serviceDetail-content-2').empty();
		departServiceNode.addClass('org_hide');
		departServiceNode.closest('li').addClass('org_hide');
	}
}
function orderHospitalService_detail_room() {
	orderHospitalService_detail();//对应的服务类型
	// orderHospitalService_room();//对应的房间床号
}
let orderHospitalServiceList_roomBed = '';
function orderHospitalService_room() {
	$('#crateOrderHospital .roomService').empty();
	let departValue = $('#crateOrderHospital .departService option:selected').val();//获取科室
	let httpUtilObj = new HttpUtil();
	let data = {
		branchId: departValue
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetRoomAndBed',
		params: data
	}).then((res) => {
		let orderHospital_roomList = res.body.roomList;
		orderHospitalServiceList_roomBed = res.body;
		let roomServiceNode = $('#crateOrderHospital .roomService');//select
		if (orderHospital_roomList != undefined) {
			for (let i = 0; i < orderHospital_roomList.length; i++) {
				let room_option = $('<option value=' + orderHospital_roomList[i].roomId + '>' + orderHospital_roomList[i].roomNo + '</option>')
				roomServiceNode.append(room_option);
			}
			orderHospitalService_bed();//对应的房间床号
		}
	})
}
function orderHospitalService_bed() {
	$('#crateOrderHospital .bedService').empty();
	let roomValue = $('#crateOrderHospital .roomService option:selected').val();//获取医院
	let orderHospital_bedList = orderHospitalServiceList_roomBed.bedMap[roomValue];
	let bedServiceNode = $('#crateOrderHospital .bedService');//select
	if (orderHospital_bedList != undefined) {
		for (let i = 0; i < orderHospital_bedList.length; i++) {
			let bed_option = $('<option value=' + orderHospital_bedList[i].bedId + '>' + orderHospital_bedList[i].bedNo + '</option>')
			bedServiceNode.append(bed_option);
		}
	}

}
function orderHospitalService_detail() {
	$('#crateOrderHospital .select_gate i input').prop('checked',true);//切换科室默认选中门禁卡
	$('#crateOrderHospital .serviceDetail-content-1').empty();
	$('#crateOrderHospital .serviceDetail-content-2').empty();
	let departValue = $('#crateOrderHospital .departService option:selected').val();//获取科室
	let httpUtilObj = new HttpUtil();
	let data = {
		branchId: departValue
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetPriceByCreateOrder',
		params: data
	}).then((res) => {//serviceDetail-content//entranceCardPrice//prepayAmount
		$('#crateOrderHospital .select_gate i').off('click').on('click',function(){
			if($(this).find('input').prop('checked')){
				$(this).find('input').prop('checked',false);
				$('#crateOrderHospital .entrance').css('display','none');
				let price_flag=false;//无套餐选中时
				if($('#crateOrderHospital .serviceDetail-top span i:nth-child(1)').hasClass('selected')){
//					let pay=$('#crateOrderHospital .serviceDetail-content-1 li.selected').attr('totalfee');
					let pay=$('#crateOrderHospital .serviceDetail-content-1 li.selected').attr('prefee');
					$('#crateOrderHospital .hospital_count span').html(pay);
					console.log('1-----'+pay);
					price_flag=true;
				}
				if($('#crateOrderHospital .serviceDetail-top span i:nth-child(2)').hasClass('selected')){
					let pay=$('#crateOrderHospital .serviceDetail-content-2 li.selected').attr('prefee');
					$('#crateOrderHospital .hospital_count span').html(pay);
					console.log('2-----'+pay);
					price_flag=true;
				}
				if(!price_flag){
					$('#crateOrderHospital .hospital_count span').html(res.body.entranceCardPrice);
				}
			}else{
				$('#crateOrderHospital .entrance').css('display','block');
				let price_flag=false;//无套餐选中时
				$(this).find('input').prop('checked',true);
				if($('#crateOrderHospital .serviceDetail-top span i:nth-child(1)').hasClass('selected')){
					let pay=$('#crateOrderHospital .serviceDetail-content-1 li.selected').attr('totalfee');
					$('#crateOrderHospital .hospital_count span').html(pay);
					console.log('3-----'+pay);
					price_flag=true;
				}
				if($('#crateOrderHospital .serviceDetail-top span i:nth-child(2)').hasClass('selected')){
					let pay=$('#crateOrderHospital .serviceDetail-content-2 li.selected').attr('totalfee');
					$('#crateOrderHospital .hospital_count span').html(pay);
					console.log('4-----'+pay);
					price_flag=true;
				}
				if(!price_flag){
					$('#crateOrderHospital .hospital_count span').html('0.00');
				}
			}
		});
		$('#crateOrderHospital .hospital_count span').html('0.00');
		$('#crateOrderHospital .panel-payment .hospital_pre span').html('0.00');//预付款
		if (parseFloat(res.body.entranceCardPrice) > 0) {
			$('#crateOrderHospital .select_gate').css('display','block');
			$('#crateOrderHospital .entrance').css('display','block');
			$('#crateOrderHospital .panel-payment .entrance span').html(res.body.entranceCardPrice);//门禁卡
		}else{
			$('#crateOrderHospital .select_gate').css('display','none');
			$('#crateOrderHospital .entrance').css('display','none');
		}
		let service_priceList12N = res.body.priceList12N;
		let service_priceList121 = res.body.priceList121;
		let service_1Node = $('#crateOrderHospital .serviceDetail-content-1');
		let service_2Node = $('#crateOrderHospital .serviceDetail-content-2');
		let service_flag=false;
		for (let i = 0; i < service_priceList121.length; i++) {
			let service_1 = $('<li totalfee="'+service_priceList121[i].totalPrice+'" prefee="'+service_priceList121[i].prepayFeeStr+'" priceid=' + service_priceList121[i].priceId + ' defaultchecked="'+service_priceList121[i].defaultStatus+'"><em></em><span>' + service_priceList121[i].serviceItem + '<i>' + service_priceList121[i].priceStr + '</i></span></li>');
			service_1Node.append(service_1);
		}
		for (let j = 0; j < service_priceList12N.length; j++) {
			let service_2 = $('<li totalfee="'+service_priceList12N[j].totalPrice+'" prefee="'+service_priceList12N[j].prepayFeeStr+'" priceid=' + service_priceList12N[j].priceId + ' defaultchecked="'+service_priceList12N[j].defaultStatus+'"><em></em><span>' + service_priceList12N[j].serviceItem + '<i>' + service_priceList12N[j].priceStr + '</i></span></li>');
			service_2Node.append(service_2);
		}
		$('#crateOrderHospital .serviceDetail-top span i:nth-child(1)').removeClass('selected');
		$('#crateOrderHospital .serviceDetail-top span i:nth-child(2)').removeClass('selected');
		$('#crateOrderHospital .serviceDetail-content-1').removeClass('selected');
		$('#crateOrderHospital .serviceDetail-content-2').removeClass('selected');
		for(let k=0;k<$('#crateOrderHospital .serviceDetail-content-1 li').length;k++){
			if($('#crateOrderHospital .serviceDetail-content-1 li').eq(k).attr('defaultchecked')=='1'){
				service_flag=true;
				$('#crateOrderHospital .panel-payment .hospital_pre span').html($('#crateOrderHospital .serviceDetail-content-1 li').eq(k).attr('prefee'));
				$('#crateOrderHospital .hospital_count span').html($('#crateOrderHospital .serviceDetail-content-1 li').eq(k).attr('totalfee'));
				$('#crateOrderHospital .serviceDetail-content-1 li').eq(k).addClass('selected');
				$('#crateOrderHospital .serviceDetail-top span i:nth-child(1)').addClass('selected');
				$('#crateOrderHospital .serviceDetail-content-1').addClass('selected');
				$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').css('display', 'block');
				$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').css('display', 'none');
				break;
			}
		}
		for(let lt=0;lt<$('#crateOrderHospital .serviceDetail-content-2 li').length;lt++){
			if($('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).attr('defaultchecked')=='1'){
				service_flag=true;
				$('#crateOrderHospital .panel-payment .hospital_pre span').html($('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).attr('prefee'));
				$('#crateOrderHospital .hospital_count span').html($('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).attr('totalfee'));
				$('#crateOrderHospital .serviceDetail-content-2 li').eq(lt).addClass('selected');
				$('#crateOrderHospital .serviceDetail-top span i:nth-child(2)').addClass('selected');
				$('#crateOrderHospital .serviceDetail-content-2').addClass('selected');
				$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').css('display', 'none');
				$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').css('display', 'block');
				break;
			}
		}
		if(!service_flag){//hospital_pre
			if (parseFloat(res.body.entranceCardPrice) > 0) {
				$('#crateOrderHospital .hospital_count span').html(res.body.entranceCardPrice);
			}else{
				$('#crateOrderHospital .hospital_count span').html('0.00');
			}
			$('#crateOrderHospital .serviceDetail-top span i:nth-child(1)').addClass('selected');
			$('#crateOrderHospital .serviceDetail-content-1').addClass('selected');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-1').css('display', 'block');
			$('#crateOrderHospital .serviceDetail-content .serviceDetail-content-2').css('display', 'none');
		}
		// $('#crateOrderHospital .serviceDetail-content-1 li:nth-child(1)').find('input[type=radio]').prop('checked', 'checked');
		// $('#crateOrderHospital .serviceDetail-content-2 li:nth-child(1)').find('input[type=radio]').prop('checked', 'checked');
	})
}
function orderHomeServiceType() {
	let serviceValue = $('#crateOrderHome select option:selected').val();
	let httpUtilObj = new HttpUtil();
	let data = {
		st: serviceValue
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetInsurePrice ',
		params: data
	}).then((res) => {
		let serviceList = res.body.price;
		let serviceUlNode = $('#crateOrderHome .service-detail-text ul');
		serviceUlNode.empty();
		for (let i = 0; i < serviceList.length; i++) {
			let serviceLiNode = $('<li priceid=' + serviceList[i].price.priceId + '><input type="radio" name="service" value="" /><span>' + serviceList[i].price.serviceItem + '<i>' + serviceList[i].price.priceStr + '</i></span></li>')
			serviceUlNode.append(serviceLiNode);
		}
		$('#crateOrderHome .service-detail-text ul li:nth-child(1) input[type=radio]').prop('checked', 'checked');
		$('#crateOrderHome .panel-payment .panel-money span').html(serviceList[0].prepayAmount);
	}, (res) => {
		let serviceUlNode = $('#crateOrderHome .service-detail-text ul');
		serviceUlNode.empty();
		let noneService = $('<li style="cursor:auto;color:red;">暂无服务</li>');
		$('#crateOrderHome .panel-payment .panel-money span').html('0.00');
		serviceUlNode.append(noneService);
	})
}
function orderManage_getKinsfolk(id, node) {
	let dtd = $.Deferred();
	let httpUtilObj = new HttpUtil();
	let data = {
		userId: id
	}
	httpUtilObj.ajax({
		url: '/adminjson/SAASListKinsfolk',
		params: data
	}).then((res) => {
		let folkList = res.body.list;
		let folkNode = $(node).find('.servicePerson');
		folkNode.empty();
		if(!folkList.length){
			dtd.resolve(folkList);
			return dtd.promise();
		}
		for (let i = 0; i < folkList.length; i++) {
			let folk_sex='';
			let liNode='';
			folk_sex= folkList[i].sex==undefined ? "" : folkList[i].sex == 1 ? '男' : '女';
			if(node=='#addInusreDetail'){//长护险参保人列表判断
				if(folkList[i].insureFlag){
					liNode = $('<li class="use" kinsid=' + folkList[i].kinsId + '><i></i><span><strong>' + folkList[i].name + '</strong><i>' + folk_sex + '</i><em><b>' + (folkList[i].age==undefined?'':folkList[i].age+'</b>岁') + '</em></em></span></li>');
				}
				folkNode.append(liNode);
			}else{
				liNode = $('<li class="use" kinsid=' + folkList[i].kinsId + '><i></i><span><strong>' + folkList[i].name + '</strong><i>' + folk_sex + '</i><em><b>' + (folkList[i].age==undefined?'':folkList[i].age+'</b>岁') + '</em></em></span></li>');
				folkNode.append(liNode);
			}
		}
		dtd.resolve(folkList);
		return dtd.promise();
	})
	return dtd.promise();
}
/***********新建订单结束 end*******************************/


function ImgTakeLook(){
	//点击查看图片大图
	$('.imgTakeView').off('click').on('click',function(){
		let imgUrl=$(this).attr('imgurl');
		let imgBac=$(this).hasClass('userSignPic')?'background:#ccc;':'';
		if(!imgUrl){
			Toast.error('暂无照片预览!');
			return false;
		}
		let img_box=`<div id='img-view-mask'></div>
				<div id='img-view'>
					<img src=${imgUrl} style="${imgBac}"/>
				</div>
			`
		$('body').append(img_box);
		$('#img-view').on('click',function(e){
			$('#img-view-mask').remove();
			$('#img-view').remove();
		})
	})
}

function theDay(status){//获取最近的小时数
	let dtd = $.Deferred();
	let str=new Date();
	console.log(str);
	//if(str.getHours() == 23 ) {
		let timeStamp = Date.parse(new Date()) + 1000*60*60;
		str=new Date(timeStamp);
	//}
	console.log(str);
	let t_year=str.getFullYear();
	let t_month=str.getMonth()+1>9?str.getMonth()+1:'0'+(str.getMonth()+1);
	let t_day=str.getDate()>9?str.getDate():'0'+str.getDate();
	let t_getHours=str.getHours()>9?str.getHours():'0'+str.getHours();
	let t_getMinutes=str.getMinutes()>9?str.getMinutes():'0'+str.getMinutes();
	if(status=='date'){
		let datehour=t_year+'-'+t_month+'-'+t_day+' '+t_getHours+':00';
		dtd.resolve(datehour);
		return dtd.promise();
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
/***********新建订单开始*******************************/
function G_Fun_showInsureHandlePanel(insureNO, type) {
	let panel = new RPModalPanel("panel_insure_handle", rp_showInsureHandlePanelHtml);
	panel.show();
	$('.js-select-insureHandleNure-HS,.js-btn-showInsureHandleNure-jkjl').attr('insureorderno',insureNO);
	//绑定，选择护士，护士长按钮
	$('body').off('click','.js-select-insureHandleNure-HS,.js-btn-showInsureHandleNure-jkjl').on('click','.js-select-insureHandleNure-HS,.js-btn-showInsureHandleNure-jkjl', function () {
		top.importOnceJS('js-select-nations', "js/app/modal/select_insure_handle_nure.js");
		let elem = $(this);
		let nurseType = elem.attr("nurseType");
		let insureOrderNO = elem.attr("insureorderno");
		let hsType=elem.attr("hsType");
		let type=elem.attr("type");
		top.G_OpenSelectInsureHandleNureWin(nurseType, insureOrderNO,hsType,type,'status5').then(function (data) {
			console.log("hs:" + JSON.stringify(data));
			elem.html(data["hgName"]);
			elem.attr('hgId', data.hgId);
		});
	});
	$("#panel_insure_handle .js-select-insureHandleNure").attr("hgId", "");
	$("#panel_insure_handle .js-select-insureHandleNure").html("选择领班护士").attr('insureOrderNO',insureNO);
	$(".js-select-insureHandleNureManager").attr("hgId", "");
	$(".js-select-insureHandleNureManager").html("选择健康经理");
	$("#panel_insure_handle .js-ipt-rejectDesc").val("");
	$("#panel_insure_handle .js-ipt-hsRejectDesc").val("");
	$("#panel_insure_handle .js-ipt-govRejectDesc").val("")
	$("#panel_insure_handle .js-ipt-remark").val("");
	$("#panel_insure_handle .js-ipt-hsRemark").val("");
	panel.find(".form_date").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

	let dtd = $.Deferred();
	var status = 0;
	theDay('date').then((time)=>{//获得时间最接近的小时数
		$('input[name="kfStartTime"]').val(time);
	});
	//客服评估
	//预约上门时间
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
	$('input[name="kfStartTime"]').datetimepicker({
		format: 'yyyy-mm-dd hh:00',
		minView:'day',
		startView:1,
		language:  'zh',
		autoclose:1,
	})
	//客服审核结果
	$('input[name=js-radio-kfHandle]').on("click", function () {
		let handleCode = $('input[name=js-radio-kfHandle]:checked').val();
		if (handleCode == 1) { //审核通过
			$("#panel_insure_handle .js-ipt-rejectDesc").hide();
			$("#panel_insure_handle .js-span-choseNurse").css('display','inline');
		} else {
			$("#panel_insure_handle .js-ipt-rejectDesc").show();
			$("#panel_insure_handle .js-span-choseNurse").css('display','none');
			$("#panel_insure_handle .js-select-insureHandleNure").attr("hgId", "");
			$("#panel_insure_handle .js-select-insureHandleNure").html("选择领班护士").attr('insureOrderNO',insureNO);
		}
		console.log("handleCode:" + handleCode);
	});

	//复审通过--客服联系
	$('input[name=js-radio-status-4]').on("click", function () {
		let handleCode = $('input[name=js-radio-status-4]:checked').val();
		let self=$(this);
		if (handleCode == 1) { //暂不下单
			$("#panel_insure_handle .js-select-insureHandleNure-status-4").attr("hgId", "");
			$("#panel_insure_handle .js-span-choseNurse-status-4 .js-btn-showInsureHandleNure-jkjl").html("指派健康经理").attr('insureOrderNO',insureNO);
			$("#panel_insure_handle .js-span-choseNurse-status-4").css('display','none');
		} else if(handleCode == 2){//预约下单
			$("#panel_insure_handle .js-span-choseNurse-status-4").css('display','inline');
		}
		console.log("handleCode:" + handleCode);
	});
	//专家复审结果
	$('input[name=js-radio-profession]').on("click", function () {
		let handleCode = $('input[name=js-radio-profession]:checked').val();
		let self=$(this);
		if (handleCode == 1) { //审核通过
			self.closest('div.col-sm-12').find('textarea').hide();
			$("#panel_insure_handle .js-span-choseNurse-profession").css('display','inline');
		} else if(handleCode == 2){//不能参加
			$("#panel_insure_handle .js-span-choseNurse-profession").css('display','none');
			self.closest('div.col-sm-12').find('textarea').hide();
			$("#panel_insure_handle .js-span-choseNurse-profession .js-select-insureHandleNure").attr("hgId", "");
			$("#panel_insure_handle .js-span-choseNurse-profession .js-select-insureHandleNure").html("选择领班护士").attr('insureOrderNO',insureNO);
		}else{//关闭申请单，不能复审
			$("#panel_insure_handle .js-span-choseNurse-profession .js-select-insureHandleNure").attr("hgId", "");
			$("#panel_insure_handle .js-span-choseNurse-profession .js-select-insureHandleNure").html("选择领班护士").attr('insureOrderNO',insureNO);
			self.closest('div.col-sm-12').find('textarea').show();
		}
		console.log("handleCode:" + handleCode);
	});

	//护士评估
	$('input[name=js-radio-hsHandle]').on("click", function () {
		var handleCode = $('input[name=js-radio-hsHandle]:checked').val();
		if (handleCode == 1) { //审核通过
			$("#panel_insure_handle .js-ipt-hsRejectDesc").hide();
			$("#panel_insure_handle .js-panel-isfocre").hide();
		} else {
			$("#panel_insure_handle .js-ipt-hsRejectDesc").show();
			$("#panel_insure_handle .js-panel-isfocre").show();
		}
		console.log("handleCode:" + handleCode);
	});

	//政府评估结果
	$('input[name=js-radio-govHandle]').on("click", function () {
		var handleCode = $('input[name=js-radio-govHandle]:checked').val();
		if (handleCode == 1) { //审核通过
			$("#panel_insure_handle .js-ipt-govRejectDesc").hide();
		} else {
			//$("#panel_insure_handle .js-ipt-rejectDesc").val("");
			$("#panel_insure_handle .js-ipt-govRejectDesc").show();
		}
		console.log("govHandleCode:" + handleCode);
	});

	//是否下单
	$('input[name=js-radio-Manager]').on("click", function () {
		var handleCode = $('input[name=js-radio-Manager]:checked').val();
		if (handleCode == 2) { //审核通过
			$(".js-span-Manager").show();
		} else {
			$(".js-span-Manager").hide();
			$(".js-select-insureHandleNureManager").attr("hgId", "");
			$(".js-select-insureHandleNureManager").html("选择健康经理");
		}
		console.log("handleCode:" + handleCode);
	});
	//获取长护险详情
	G_InsureModule.getInsureDetail(insureNO).then(function (data) {
		if (data && data.errorCode == 0 && data.body) {
			fillFormData(data.body);
		}
	});

	function fillFormData(data) {
		let insureData = data;
		let insureDetail = data.insureNO;
		let kinsDetail=data.kinsfolk;
		if (insureDetail) {
			//idCardFrontImg
			//img--url
			$("#panel_insure_handle .idCardFrontImg").attr('imgurl',kinsDetail.idPicUrl);
			$("#panel_insure_handle .idCardBackImg").attr('imgurl',kinsDetail.idPic2Url);
			$("#panel_insure_handle .healthCareImg").attr('imgurl',kinsDetail.healthCareImgUrl);
			$("#panel_insure_handle .kinsfolkImg").attr('src',kinsDetail.kinsfolkImgUrl);
			$("#panel_insure_handle #change_healthNo").html(insureDetail.healthCareNO||'');
			$("#panel_insure_handle #change_staffType").html(data.staffTypeStr);
			//代理人信息
			$("#panel_insure_handle #change_agentName").html(insureDetail.agencyName);
			$("#panel_insure_handle #change_agentRelation").html(insureDetail.agencyRelation);
			$("#panel_insure_handle #change_agentPhone").html(insureDetail.agencyPhone);
			//申请途径js-panel-foundWay
			$("#panel_insure_handle .js-panel-foundWay").html(data.foundWayStr);
			//申请待遇类别
			let t_applyTreatmentTypeStr=data.applyTreatmentTypeStr.split('+');
			if(t_applyTreatmentTypeStr.length==1){
				$("#panel_insure_handle .js-panel-applyType input[name=applyType]").eq(1).prop('checked',false);
			}else if(t_applyTreatmentTypeStr.length==2){
				$("#panel_insure_handle .js-panel-applyType input[name=applyType]").eq(1).prop('checked',true);
			}
			$("#panel_insure_handle .js-panel-applyType i:last").off('click').on('click',function(){
				if($('#panel_insure_handle .applyType-edit').hasClass('applyType-save')){
					return false;
				}
				if($(this).find('input').prop('checked')){
					$(this).find('input').prop('checked',false);
				}else{
					$(this).find('input').prop('checked',true);
				}
			})
			$("#panel_insure_handle .js-panel-applyType i:last input").off('click').on('click',function(){
				if($(this).prop('checked')){
					$(this).prop('checked',false);
				}else{
					$(this).prop('checked',true);
				}
			})
			$('#panel_insure_handle .applyType-edit').off('click').on('click',function(){
				if($(this).hasClass('applyType-save')){//编辑
					$("#panel_insure_handle .js-panel-applyType i:last input").attr('disabled',false);
					$(this).html('保存').removeClass('applyType-save');
				}else{
					let type='';
					if($("#panel_insure_handle .js-panel-applyType i:last input").prop('checked')){
						type=2;
					}else{
						type=1;
					}
					let httpUtilObj = new HttpUtil();
					let data={
						applyTreatmentType:type,
						insureNO:insureDetail.insureNO,
					}
					httpUtilObj.ajax({
						url: '/adminjson/SAASSaveOrUpdateInsure',
						params: data
					}).then((res)=>{
						$("#panel_insure_handle .js-panel-applyType i:last input").attr('disabled',true);
						$('#panel_insure_handle .applyType-edit').addClass('applyType-save').html('编辑');
					})
				}
			})
			//待遇类型
			$("#panel_insure_handle #change_treatType").html(data.treatmentTypeStr);
			$("#panel_insure_handle #change_assessType").html(data.assessTypeStr);
			$("#panel_insure_handle #change_insureGetType").html(data.insureGetTypeStr);
			//用户签名
			if(insureDetail.userSignPic){
				$("#panel_insure_handle .userSignPicUploadBtn").css('display','none');
				$("#panel_insure_handle .userSignPic").css('display','inline').attr('imgurl',insureDetail.userSignPic);
			}else{
				$("#panel_insure_handle .userSignPic").css('display','none');
				$("#panel_insure_handle .userSignPicUploadBtn").css('display','inline');
			}
			$("#panel_insure_handle .userSignPicUploadBtn").off('click').on('click',function(){
				$('body').find('#signature').empty();
				$('body').find('#signatureparent-box').css('display','block');
				$('body').find('#signatureparent').css({
					'display':'block',
					'transform':'translate(-'+Math.floor($('body').find('#signatureparent').width()/2)+'px,-'+Math.floor($('body').find('#signatureparent').height()/2)+'px)'
				});
				let signPic=$('body').find('#signature').jSignature({
					width:$('body').find('#signatureparent').width(),
					height:$('body').find('#signatureparent').height()-20,
					"decor-color":"transparent",
					'signatureLine':false,
					'color':"#000",
				});
				$('body').find('#signatureparent-box').off('click').on('click',function(){
					$('body').find('#signatureparent-box').css('display','none');
					$('body').find('#signatureparent').css('display','none');
				})
				$('body').find('#signatureparent .sign-reset').off('click').on('click',function(){
					signPic.jSignature('reset');
				})
				$('body').find('#signatureparent .sign-submit').off('click').on('click',function(){
					let sign_lenth=$('body').find('#signature').jSignature('getData', 'native').length;
					if(!sign_lenth){
						Toast.error('请签名！');
					}else{
						$('body').find('#signatureparent').css('display','none');
						$('body').find('#signatureparent-box').css('display','none');
						$('#cam-upload').addClass('order-show');
						$('#cam-upload-mask').addClass('order-show');
						let datapair = $('body').find('#signature').jSignature("getData", "image");
						let sign_src="data:" + datapair[0] + "," + datapair[1];
						$.ajax({
							type: 'post',
							url:  location.protocol+'//'+location.host+'/imageupload?type=signature',
							dataType: 'json',
							data: {
								base64:sign_src,
							},
							success: function(data){
								if(data.errCode==0){
									$('#cam-upload').removeClass('order-show');
									$('#cam-upload-mask').removeClass('order-show');
									Toast.success('签名上传成功！');
									$("#panel_insure_handle .userSignPicUploadBtn").css('display','none');
									$("#panel_insure_handle .userSignPic").css('display','inline').attr('imgUrl',data.imgUrl);
									signEntrustPic('userSignPic',data.imageId);
								}		
							},
							error: function(){
								Toast.error('签名上传失败！');
								$('#cam-upload').removeClass('order-show');
								$('#cam-upload-mask').removeClass('order-show');
							}
						})
					}
				})
			})
			//签名--协议update部分
			function signEntrustPic(str,id){
				let httpUtilObj = new HttpUtil();
				let data = new Object();
				data[str]=id;
				data['insureNO']=insureDetail.insureNO;
				httpUtilObj.ajax({
					url: '/adminjson/SAASSaveOrUpdateInsure',
					params: data
				})
			}
			//委托协议书
			if(insureDetail.entrustPic){
				$("#panel_insure_handle .entrustPicUploadBtn").css('display','none');
				$("#panel_insure_handle .entrustPic").css('display','inline').attr('imgurl',insureDetail.entrustPic);
			}else{
				$("#panel_insure_handle .entrustPic").css('display','none');
				$("#panel_insure_handle .entrustPicUploadBtn").css('display','inline');
			}
			//上传委托书
			$("#panel_insure_handle .entrustPicUploadBtn").off('click').on('click',function(){
				$(this).closest('td').find('input').click();
			})
			//图片上传逻辑
			$('#panel_insure_handle').find('input[name=entrustPicUpload]').off('click').on('click',function(){//批量导入
				top.importOnceJS('js-script-hg',"js/app/fun.js");
				let self=$(this);
				let ele=$(this).closest('td');
				uploadImg($('input[name=entrustPicUpload]'),'show').then((data)=>{
					entrustPicUploadRefresh(data,ele);
				})
			})
			//上传成功后显示--图片按钮
			function entrustPicUploadRefresh(data,ele){
				if(data.errCode!=0){
					Toast.error('上传失败！请选择正确的图片格式或上传图片过大');
					return false;
				}
				ele.find('.entrustPic').css('display','inline').attr('imgUrl',data.imgUrl);
				ele.find('.entrustPicUploadBtn').css('display','none');
				ImgTakeLook();//点击查看图片大图
				signEntrustPic('entrustPic',data.imageId);
			}
			//健康经理评估
			if(insureData.insure.isManagerShow){
				$("#panel_insure_handle .manage-table").css('display','table');
				$('#panel_insure_handle .js-panel-dudaoScoreADL').html(insureDetail.dudaoScoreADL>0?insureDetail.dudaoScoreADL+'分':'无');
				$('#panel_insure_handle .js-panel-securityAssess').html(insureDetail.securityAssess);
				$('#panel_insure_handle .js-panel-userStatusRemark').val(insureDetail.userStatusRemark);
				$('#panel_insure_handle .js-panel-manageDetail').html('【'+insureDetail.managerName+'】'+'　'+insureDetail.managerAssessTime);
			}else{
				$("#panel_insure_handle .manage-table").css('display','none');
			}
			$('#panel_insure_handle .check-dudaoScoreADL').attr({
				'insureNO':insureDetail.insureNO,
				'assessType':1,
			})
			//判断是否有健康经理评分
			if(insureDetail.dudaoScoreADL>0){
				$("#panel_insure_handle .check-dudaoScoreADL").css('display','inline-block');
			}else{
				$("#panel_insure_handle .check-dudaoScoreADL").css('display','none');
			}
			//点击查看健康经理adl评分
			$("#panel_insure_handle .check-dudaoScoreADL").off('click').on('click',function(){
				top.importOnceJS('js-script-insureADL', "js/app/modal/select_grade_personage.js");
				var elem = $(this);
				var insureNO = elem.attr("insureNO");
				var typeGrade = elem.attr("typeGrade");
				var id = '';
				var assessType = elem.attr("assessType");
				top.G_OpenSelectGradeWin(insureNO, typeGrade, id, assessType);
			})
			//客服审核
			/**初审中**/
			$("#panel_insure_handle .js-tr-status-0-done").show();
			/**初审中**/
			$("#panel_insure_handle .js-span-insureNO").html(insureDetail.insureNO);
			$("#panel_insure_handle .js-span-insureCreateTime").html(data.createTimeStr);
			$("#panel_insure_handle .js-panel-status").html(data.statusStr);
			$("#panel_insure_handle .js-panel-kinsInfo").html(insureDetail.kinsName + "　" + (insureDetail.sex==1?'男':'女') + "　" + insureDetail.age + "岁;　身高：" + (insureDetail.height||'170.0') + "cm;　体重：" + (insureDetail.weight||'65.0')+'kg');
			$("#panel_insure_handle .js-panel-kinsIdCard").html(insureDetail.idcard);
			$("#panel_insure_handle .js-panel-kinsMedicareType").html(kinsDetail.medicare);
			//语言
			let t_LanguageList=insureDetail.languageList;
			if(t_LanguageList.length){
				for(let i=0;i<t_LanguageList.length;i++){
					$("#panel_insure_handle .js-panel-language i input").eq(t_LanguageList[i]-1).prop('checked',true);
				}
			}
			$("#panel_insure_handle .js-panel-language i").off('click').on('click',function(){
				if($('#panel_insure_handle .language-edit').hasClass('language-save')){
					return false;
				}
				if($(this).find('input').prop('checked')){
					$(this).find('input').prop('checked',false);
				}else{
					$(this).find('input').prop('checked',true);
				}
			})
			$("#panel_insure_handle .js-panel-language i input").off('click').on('click',function(){
				if($(this).prop('checked')){
					$(this).prop('checked',false);
				}else{
					$(this).prop('checked',true);
				}
			})
			//语言编辑
			$('#panel_insure_handle .language-edit').off('click').on('click',function(){
				if($(this).hasClass('language-save')){//编辑
					$("#panel_insure_handle .js-panel-language i input").attr('disabled',false);
					$(this).html('保存').removeClass('language-save');
				}else{
					let languageStr=[];
					for(let i=0;i<$("#panel_insure_handle .js-panel-language i input").length;i++){
						if($("#panel_insure_handle .js-panel-language i input").eq(i).prop('checked')){
							languageStr.push(i+1);
						}
					}
					let httpUtilObj = new HttpUtil();
					let data={
						languageList:languageStr,
						insureNO:insureDetail.insureNO,
					}
					httpUtilObj.ajax({
						url: '/adminjson/SAASSaveOrUpdateInsure',
						params: data
					}).then((res)=>{
						$("#panel_insure_handle .js-panel-language i input").attr('disabled',true);
						$('#panel_insure_handle .language-edit').addClass('language-save').html('编辑');
					})
				}
			})
			$("#panel_insure_handle .js-panel-contactsName a").html(insureDetail.name);
			$("#panel_insure_handle .js-panel-contactsPhone a").html(insureDetail.phone);
			$("#panel_insure_handle .js-panel-addr").html('');
			$("#panel_insure_handle .js-panel-addr").html(insureDetail.province + insureDetail.city + insureDetail.district + insureDetail.building + insureDetail.addrDetail);
			ImgTakeLook();//点击查看图片大图
			//editor根据返回的response判断是否有效
			function processResponse(response, newValue) {
				if (response) {
					var errcode = response.errorCode;
					var msg = response.msg;
					if (errcode == 0) {
						Toast.success("操作成功!");
					} else {
						return msg;
					}
				}
			}
			$.fn.datepicker.defaultslanguage = 'cn';
			$.fn.editable.defaults.inputclass = 'form-control';
			$.fn.editable.defaults.send = 'always';
			$.fn.editable.defaults.ajaxOptions = {
				type: "POST",
				dataType: 'json'
			};
			//用于消除loading
			var displayFun = function (value, sourceData) {
				if (sourceData == undefined)
					return;
				var elem = $.grep(sourceData, function (o) {
					return o.value == value;
				});
				if (elem.length) {
					$(this).text(elem[0].text);
				} else {
					$(this).empty();
				}
			};
			//修改语言js-panel-language
			
			//修改待遇类型
			$('#change_treatType').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改待遇类型',
				prepend: "居家护理",
				source: [
				{
					value: 2,
					text: '机构护理'
				}
				],
				placement:'bottom',
				pk:1,
				params: function (params) {
					params['treatmentType']=params['value']==''?'2':'1';
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				display: displayFun
			});
			//评估类别
			$('#change_assessType').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改评估类别',
				prepend: "首次评估",
				source: [
				{
					value: 2,
					text: '复检评估'
				},{
					value: 3,
					text: '变更评估'
				}
				],
				placement:'bottom',
				pk:1,
				params: function (params) {
					params['assessType']=params['value']==''?'1':params['value']=='2'?'2':'3';
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				display: displayFun
			});
			//告知书领取方式--
			$('#change_insureGetType').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改领取方式',
				prepend: "邮寄",
				source: [
				{
					value: 2,
					text: '自行领取'
				}
				],
				placement:'bottom',
				pk:1,
				params: function (params) {
					params['insureGetType']=params['value']==''?'1':'2';
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				display: displayFun
			});
			//代理人信息
			$('#change_agentName').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改代理人姓名',
				value:insureDetail.agencyName||'',
				placement:'right',
				pk:'1',
				params: function (params) {
					params['agencyName']=params['value'];
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				validate: function (value) {
					if ($.trim(value) == '') {
						return '请填写代理人姓名';
					}
				}
			});
			$('#change_agentName').html(G_stringModule.getStr(insureDetail.agencyName,'未填写'));
			$('#change_agentRelation').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改代理人关系',
				value:insureDetail.agencyRelation||'',
				placement:'bottom',
				pk:'1',
				params: function (params) {
					params['agencyRelation']=params['value'];
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				validate: function (value) {
					if ($.trim(value) == '') {
						return '请填写代理人关系';
					}
				}
			});
			$('#change_agentRelation').html(G_stringModule.getStr(insureDetail.agencyRelation,'未填写'));
			$('#change_agentPhone').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改代理人电话',
				value:insureDetail.agencyPhone||'',
				placement:'bottom',
				pk:'1',
				params: function (params) {
					params['agencyPhone']=params['value'];
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				validate: function (value) {
					if ($.trim(value) == '') {
						return '请填写代理人电话';
					}
				}
			});
			$('#change_agentPhone').html(G_stringModule.getStr(insureDetail.agencyPhone,'未填写'));
			//修改人员类别
			$('#change_staffType').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改人员类别',
				prepend: "在职",
				source: [
				{
					value: 2,
					text: '退休'
				}
				],
				placement:'bottom',
				pk:1,
				params: function (params) {
					params['staffType']=params['value']==''?'1':'2';
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				display: displayFun
			});
			//修改医保卡号
			$('#change_healthNo').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改医保卡号',
				value:insureDetail.healthCareNO||'',
				placement:'bottom',
				pk:'1',
				params: function (params) {
					params['healthCareNO']=params['value'];
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				validate: function (value) {
					if ($.trim(value) == '') {
						return '请填写医保卡号';
					}
				}
			});
			$('#change_healthNo').html(G_stringModule.getStr(insureDetail.healthCareNO,'未填写'));
			//修改联系人姓名
			$('#change_name').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改联系人姓名',
				value:insureDetail.name,
				placement:'right',
				pk:'1',
				params: function (params) {
					params['addName']=params['value'];
					params['insureNO']=insureDetail.insureNO;
					return JSON.stringify(params);
				},
				validate: function (value) {
					if ($.trim(value) == '') {
						return '请填写用户名';
					}
				}
			});
			$('#change_name').html(G_stringModule.getStr(insureDetail.name,'未填写'));
			//修改联系人电话
			$('#change_phone').editable({
				url: '/adminjson/SAASSaveOrUpdateInsure',
				title:'修改联系人电话',
				value:insureDetail.phone,
				placement:'bottom',
				pk:'1',
				params: function (params) {
					params['phone']=params['value'];
					params['insureNO']=insureDetail.insureNO;
					params['name']=$('#change_name').html();
					return JSON.stringify(params);
				},
				validate: function (value) {
					if (!G_checkInputModule.checkPhone(value)) {
						return '请填写正确的手机号';
					}
				}
			});
			$('#change_phone').html(G_stringModule.getStr(insureDetail.phone,'未填写'));
			let change_node = $('<i insureid=' + insureDetail.insureNO + ' class="btn btn-primary btn-sm change_addr" style="margin-left:20px;">修改地址</i>');
			$("#panel_insure_handle .js-panel-addr").closest('td').append(change_node);
			$("#panel_insure_handle .js-panel-insure-detail-list").html(getInsureDetailListHtml(data));
			//填充已完成流程的进度类容
			status = insureDetail.status;
			console.log("status:" + status);
			if(status!=0){//除了客服审核---申请单信息都不可改
				//待遇类别
				$('.applyType-save').css('display','none');
				$('.js-panel-applyType i').css('cursor','auto');
				//待遇类型
				$('.js-panel-treatType').html($('.js-panel-treatType a').html());
				//评估类别
				$('.js-panel-assessType').html($('.js-panel-assessType a').html());
				//告知书领取方式
				$('.js-panel-insureGetType').html($('.js-panel-insureGetType a').html());
			}
			showProcessTr(insureDetail);//显示哪种角色
			fillProcessDoneTrContent(insureDetail,data,insureData,status);//根据adl评分显示
			$("#panel_insure_handle .js-panel-insure-detail-list a").attr("href", "javascript:void(0);");
			$("#panel_insure_handle .js-panel-insure-detail-list a").addClass('a-not');
		}
	}
	$('body').off('click', '#panel_insure_handle .change_addr').on('click', '#panel_insure_handle .change_addr', function () {
		top.importOnceJS('js-script-useraddress', "js/app/rp/useraddress.js");
		insureId = $(this).attr('insureid');
		top.G_Fun_showAddUserAddressPanel(insureId, 'change_addr').then((res)=>{
			$('#panel_insure_handle .js-panel-addr').html(res);
		})		
	})
	//显示哪种角色
	function showProcessTr(insureDetail) {
		$(".js-tr-process").hide();
		$(".js-tr-status-" + status).show();
	}
	//根据adl评分显示
	function fillProcessDoneTrContent(insureDetail,data,insureData,status) {
		var adl_insureNO_html = "<a href='javascript:void(0);' insureNO ='" + insureNO + "' class='js-grade-barthel'>开始评估</a>";
//		var adl_insureNO_html1 = "<a barthelScore="+insureDetail.scoreADL+" href='javascript:void(0);' insureNO ='" + insureNO + "' class='js-grade-barthel'>重新评估</a>";
		var adl_insureNO_html_download = '<a href="' + location.protocol + '//' + location.host + '/getAdlAssessResultPDF?insureNO=' + insureNO + '" download>下载pdf</a>';
		$(".adl_insureNO_html_a").html("").append(adl_insureNO_html);

		var mmse_insureNO_html = "<a href='javascript:void(0);' insureNO ='" + insureNO + "'  class='js-add-mmse-btn'>开始评估</a>";
		var mmse_insureNO_html1 = "<a href='javascript:void(0);' insureNO ='" + insureNO + "'  class='js-add-mmse-btn'>重新评估</a>";
		
		console.log(adl_insureNO_html_download);
		$(".mmse_insureNO_html_a").html("").append(mmse_insureNO_html);

		var medical_insureNO_html = "<a href='javascript:void(0);' insureNO ='" + insureNO + "' class='js-medical-barthel'>添加</a>";
		var medical_insureNO_html1 = "<a href='javascript:void(0);' insureNO ='" + insureNO + "' class='js-medical-barthel'>重新添加</a>";
		$(".medical_insureNO_html_a").html("").append(medical_insureNO_html);

		if (insureDetail.scoreADL >= 0) {
			var grade_adl_html = "<a score="+insureDetail.scoreADL+" href='javascript:void(0);' insureNO ='" + insureNO + "' typeGrade = '1' class='js-grade-barthel-self'> " + insureDetail.scoreADL + "分</a>";
			if(status===2||status===3||status===53||status===5||status===4||status === 52){//等待复审只能查看
				$(".adl_insureNO_html_a").html("<span class='js-adl-res'>" + grade_adl_html + "</span>" );
			}else{
				$(".adl_insureNO_html_a").html("<span class='js-adl-res'>" + grade_adl_html + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + adl_insureNO_html_download);
			}
		}
		if (insureDetail.scoreMMSE >= 0) {
			var grade_mmse_html = "<a href='javascript:void(0);' insureNO ='" + insureNO + "' typeGrade = '2' class='js-grade-barthel-self'> " + insureDetail.scoreMMSE + "分</a>";
			$(".mmse_insureNO_html_a").html("<span class='js-mmse-res'>" + grade_mmse_html + "</span>" + '&nbsp;&nbsp;&nbsp;&nbsp;' + mmse_insureNO_html1);
		}
		
		if(insureDetail.managerId > 0){
			$("#js-span-jkjl a").html(insureDetail.managerName).attr("hgId", insureDetail.managerId);
		} else if(insureDetail.managerId <= 0){
			$("#js-span-jkjl a").html("选择健康经理").removeAttr("hgId");
		}
		if (insureDetail.medicalList) {
			var medicals = "";
			for (var i = 0; i < insureDetail.medicalList.length; i++) {
				medicals += '<span class="btn btn-default btn-sm js-medicalselect-style">' + insureDetail.medicalList[i] + "</span>";
			}
			$(".medical_insureNO_html_a").html("<span class='js-medical-res'>" + medicals + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + medical_insureNO_html1);
		}
		var status = insureDetail.status||0;
		var detailList = data.detailList;
		var obj = {};
		if (detailList && detailList.length > 0) {
			detailList.forEach(function (item, index) {
				obj[item.detailType] = item;
			});
		}
		$(".js-tr-process-done-title").hide();
		$(".js-tr-process-done").hide();
		//status---2等待提交复审不需要确定按钮--初审驳回-客服驳回
		if(status===2||status===50){
			$('#panel_insure_handle .footer-content .js-btn-submit').css('display','none');
			$('#panel_insure_handle .footer-content .rp_close').css('display','inline-block');
		}else{
			$('#panel_insure_handle .footer-content .js-btn-submit').css('display','inline-block');
			$('#panel_insure_handle .footer-content .rp_close').css('display','none');
		}
		if (insureDetail.score < 0) {
			$("#panel_insure_handle .js-panel-selfADLScore").html("无");
			$("#panel_insure_handle .check-ADLScore").css('display','none');
		} else {
			$("#panel_insure_handle .js-panel-selfADLScore").html(insureDetail.score + "分");
			$("#panel_insure_handle .check-ADLScore").css('display','inline-block').attr({
				'assessType':3,
				'insureNO':insureDetail.insureNO,
			});
		}
		//点击查看adl评分
		$("#panel_insure_handle .check-ADLScore").off('click').on('click',function(){
			top.importOnceJS('js-script-insureADL', "js/app/modal/select_grade_personage.js");
			var elem = $(this);
			var insureNO = elem.attr("insureNO");
			var typeGrade = elem.attr("typeGrade");
			var id = '';
			var assessType = elem.attr("assessType");
			top.G_OpenSelectGradeWin(insureNO, typeGrade, id, assessType);
		})
		if (status == 0) {//客服审核
			$('.js-tr-status-0-done-title').show();
		} else if (status == 1 || status == 50) { //客服审核通过或者不通过
			fillStatusDoneData(0, obj[1], insureDetail);
		} else if (status == 2 || status == 51) { //护士复审通过或者不通过
			fillStatusDoneData(0, obj[1], insureDetail);
			//通过-不通过都反显
			$(".js-tr-status-1").show();
		} else if (status == 3) {//等待复审---隐藏复审情况
			$('.js-tr-status-1-done-title').hide();
			$('.js-tr-status-1-done').hide();
			$("#js-subtit_assess").show();
			$(".js-tr-status-1").show();
			$('.js-tr-status-3-done-title').show();
			fillStatusDoneData(0, obj[1], insureDetail);
			$(".panel-body").css("padding-bottom", "250px");
		}else if(status===53){//已关闭
			$("#js-subtit_assess").show();
			$(".js-tr-status-1").show();
			$('.js-tr-status-53-done-title').show();
		}else if(status===5){//复审中
			$("#js-subtit_assess").show();
			$(".js-tr-status-1").show();
			$('.js-tr-status-5-done-title').show();
			$(".panel-body").css("padding-bottom", "250px");
		}else if(status===4){
			$("#js-subtit_assess").show();
			$(".js-tr-status-1").show();
			$('.js-tr-status-5-done-title').show();
			$('.js-tr-status-4-kh').show();
			$(".panel-body").css("padding-bottom", "250px");
		} else if (status === 52) { //政府审核通过或者不通过
			$("#js-subtit_assess").show();
			$(".js-tr-status-1").show();
			$(".js-tr-status-4").show();
			$('.js-tr-status-5-done-title').show();
			$(".panel-body").css("padding-bottom", "250px");
		}
		if (status == 50) {
			$("#js-subtit_assess").hide();
		}
		if (status >= 2 && status != 50) {
			$(".adl_show_number").html(insureDetail.score + "分　"+adl_insureNO_html_download);
			$(".mmse_show_number").html(insureDetail.scoreMMSE + "分");
		}
		$(".js-div-status1-statusStr a").attr("href", "javascript:void(0);").addClass('a-not');
		//护士审核时---中重度智能障碍部分--heavy-img
		$('.heavyIll-label').off('click').on('click',function(){
			if($(this).find('input').prop('checked')){
				$('.heavyIll-box').addClass('order-show');
			}else{
				$('.heavyIll-box').removeClass('order-show');
			}
		})
		$('.heavyIll').off('click').on('click',function(){
			if($(this).prop('checked')){
				$('.heavyIll-box').addClass('order-show');
			}else{
				$('.heavyIll-box').removeClass('order-show');
			}
		})
		if(insureDetail.assessTime){
			$('#rp_subtit_s i').html('【'+insureDetail.nurseName+'】'+insureDetail.assessTime)
		}
		if(status===1||status===51){//护士驳回--可修改图片
			let t_Node=`<li class="empty-li">
				<img src />
				<input type="file" class="hidden js-upload-file-input heavyUpload" multiple="multiple" name="heavyUpload">
				<div class="text-desc order-show"><a href="#">+添加图片</a></div>
			</li>`;
			$('.heavy-img').append(t_Node);
			let upload_flag=true;//防多次点击
			$('body').find('.empty-li a').off('click').on('click',function(){//批量导入
				console.log('111');
				if(!upload_flag){
					return false;
				}
				upload_flag=false;
				$(this).closest('li').find('.heavyUpload').click();
				setTimeout(function(){
					upload_flag=true;
				},1000);
			});	
		}
		//图片上传逻辑
		$('body').find('input[name=heavyUpload]').off('click').on('click',function(){//批量导入
			top.importOnceJS('js-script-hg',"js/app/fun.js");
			let self=$(this);
			let ele=$(this).closest('ul');
			uploadImg($('input[name=heavyUpload]'),'show').then((data)=>{
				refreshUpload(data,ele);
			})
		})
		function refreshUpload(data,ele,str,status){
			if(str=='show'){//反显部分
				if(status===51){//护士驳回--可修改图片
					for(let i=0;i<data.length;i++){
						let t_Node=`<li class="img-li">
							<img class="order-show imgTakeView" imgid="${data[i].id}" imgurl="${data[i].url}" src="${data[i].url}" />
							<i class="del-icon"></i>
						</li>`;
						ele.find('.empty-li').before(t_Node);
					}
				}else{//等待复审图片只能看
					for(let i=0;i<data.length;i++){
						let t_Node=`<li class="img-li">
							<img class="order-show imgTakeView" imgid="${data[i].id}" imgurl="${data[i].url}" src="${data[i].url}" />
						</li>`;
						ele.append(t_Node);
					}
				}
			}else{
				if(data.errCode!=0){
					Toast.error('上传失败！请选择正确的图片格式或上传图片过大');
					return false;
				}
				for(let i=0;i<data.imageArray.length;i++){
					let t_Node=`<li class="img-li">
						<img class="order-show imgTakeView" imgid="${data.imageArray[i].imageId}" imgurl="${data.imageArray[i].imgUrl}" src="${data.imageArray[i].imgUrl}" />
						<i class="del-icon"></i>
					</li>`;
					ele.find('.empty-li').before(t_Node);
				}
			}
			if(ele.find('li').length>=10){
				ele.find('.empty-li').remove();
			}
			ImgTakeLook();//点击查看图片大图
			ele.find('.del-icon').css('display','block');
			ele.find('.del-icon').off('click').on('click',function(){
				let self_del=$(this);
				bootbox.confirm({
					title: "提示",
					message: '确认删除此图片？',
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
							self_del.closest('li').remove();
						}
					}
				});
			})
		}
		console.log('status------------------'+status);
		if(status===5){//复审中
			if(insureDetail.loseNurseId){
				$('.js-select-insureHandleNure-HS').html(insureDetail.loseNurseName).attr('hgid',insureDetail.loseNurseId);
			}
			//复审中的资质有效期
			status_5_date();
			function status_5_date(){
				var d1, d2;
				function dateString(dt) {
					var dy = dt.getFullYear();
					var dm = dt.getMonth() + 1;
					var dd = dt.getDate();
					return dy + '-' + (dm < 10 ? '0' + dm : dm) + '-' + dd;
				}
				var dt = new Date();
				dt.setDate(dt.getDate() + 365);
				d2 = dateString(dt);
				dt.setDate(dt.getDate()-365);
			
				d1 = dateString(dt);
				$("#status-5-begin").val(d1);
				$("#status-5-end").val(d2);
				$('input[name="daterange-order"]').daterangepicker({
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
				}, function (start, end, label) {
					$("#status-5-begin").val(start.format('YYYY-MM-DD'));
					$("#status-5-end").val(end.format('YYYY-MM-DD'));
				});
			}
			//复审时间
			$('.js-panel-status-5-time').html(insureDetail.loseAppointAssessTimeStr);
			$('.status-5-remark').html(insureDetail.loseRemark);
		}
		if(status===4||status===52){
			//复审时间
			$('.js-panel-status-4-time').html(insureDetail.loseAppointAssessTimeStr);
			$('.status-4-hsName').html(insureDetail.loseNurseName);
			$('.status-4-remark').html(insureDetail.loseRemark).attr('disabled',true);
			if(status===4){
				if(insureDetail.managerId){
					$('.js-btn-showInsureHandleNure-jkjl').html(insureDetail.managerName).attr('hgId',insureDetail.managerId)
				}
				$('.status-4-result').html("复审通过，审核结果有效期至 " + insureData.insure.aptitudeEndTimeStr);
			}else{
				$('.status-4-result').html("复审不通过，审核结果有效期至 " + insureData.insure.aptitudeEndTimeStr);
			}
		}
		if(status===2||status===51||status===3||status===53||status===5||status===4||status === 52){//等待提交终审----护士驳回
			
			if(status===51){//护士驳回可修改
				$('.js-ipt-hsCasePresentation').attr('disabled',false);
				$('.js-ipt-medicalHistory').attr('disabled',false);
				$('.js-ipt-hsRemark').attr('disabled',false);
			}else{
				$('.js-ipt-hsCasePresentation').attr('disabled',true);
				$('.js-ipt-medicalHistory').attr('disabled',true);
				$('.js-ipt-hsRemark').attr('disabled',true);
			}
			//病情描述
			$('.js-ipt-hsCasePresentation').val(insureDetail.hsCasePresentation);
			//评估情况说明
			$('.js-ipt-medicalHistory').val(insureDetail.medicalHistory);
			//备注
			$('.js-ipt-hsRemark').val(insureDetail.hsRemark);
			if(insureDetail.isAmentia){//选中中重度智能障碍
				$('.heavyIll-label input').prop('checked',true);
				refreshUpload(insureDetail.dysgnosiaePic,$('.heavyIll-box ul'),'show',status);
				$('.heavyIll-box').addClass('order-show');
			}else{
				$('.heavyIll-label input').prop('checked',false);
			}
			if(status===2||status===3||status===53||status===5||status===4||status === 52){
				$('.heavyIll-label input').attr('disabled',true);
			}else{
				$('.heavyIll-label input').attr('disabled',false);
			}
			//上传诊断
			if(insureDetail.caseDiagnosePic&&insureDetail.caseDiagnosePic.length){
				refreshUpload(insureDetail.caseDiagnosePic,$('.caseDiagnosePic-box ul'),'show',status);
			}
			//结果展示
			if(status===53){//已关闭处
				$('#panel_insure_handle .status-53-rejectDesc').html(insureDetail.closeRemark).attr('disabled',true);
			}
			if(status===2||status===3||status===53||status===5||status===4||status === 52){//护士评估通过--等待复审-结果为通过
				$('.status-result').append('<span>通过</span>').removeClass('col-sm-2').css('padding-left','15px');
				$('.status-result-box').css('display','none');
			}else if(status===51){
				$('.status-result').append('<span>不通过,不通过理由：'+insureData.insure.loseNoPassRemark+'</span>　　<span class="btn btn-primary btn-sm status-checkSuccess">资料已补全</span>').removeClass('col-sm-2').css('padding-left','15px');
				$('.status-result-box').css('display','none');
				//点击资料补全
				$('body').find('.status-checkSuccess').off('click').on('click',function(){
					bootbox.confirm({
						title: "提示",
						message: '是否将申请单变为等待提交复审状态？',
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
								sumitHandle_1(101);//已补全资料正确提交，并扭转状态
							}
						}
					});
				})
			}
		}
	}

	function fillStatusDoneData(status, data, insureDetail) {//0-''-insureDetail
		if (data) {
			$("#js-subtit_assess").show();
			$(".js-tr-status-" + status + "-done-title").show();
			$(".js-tr-status-" + status + "-done").show();
			var detailStatus = data.status;
			$("#panel_insure_handle .js-div-status" + status + "-statusStr").html(data.content);
			$("#panel_insure_handle .js-div-status" + status + "-remark").html(data.remark);
			$("#panel_insure_handle .js-div-status" + status + "-handler").html("【" + data.createStaffName + "】&nbsp;" + data.createTime);

			//hehehe
			console.log("detailStatus:" + detailStatus);
			if (detailStatus == 2) { //如果是驳回
				$("#panel_insure_handle .js-div-status" + status + "-rejectDesc").html(data.rejectDesc);
				$("#panel_insure_handle .js-tr-status" + status + "-rejectDesc").show();
			} else {//通过
				$("#panel_insure_handle .js-div-status" + status + "-rejectDesc").html("");
				$("#panel_insure_handle .js-tr-status" + status + "-rejectDesc").hide();
			}
			if (data.isForce && data.isForce == 1) {
				$("#panel_insure_handle .js-div-status" + status + "-isforce").html("强制提交");
				$("#panel_insure_handle .js-tr-status" + status + "-isforce").show();
			} else {
				$("#panel_insure_handle .js-div-status" + status + "-isforce").html("");
				$("#panel_insure_handle .js-tr-status" + status + "-isforce").hide();
			}
			if (insureDetail.isForce == 1) {
				$("#force_submit").hide();
			}

		}
	}
	//点击确定按钮
	panel.find(".js-btn-submit").off('click').on('click', function () {
		if (status === 0) {//客服审核
			sumitHandle_0();
		} else if (status === 1||status == 2||status == 51) {//护士初审--护士驳回--等待提交复审
			sumitHandle_1(status);
		}else if(status===3){//--等待复审
			sumitHandle_3();
		}else if (status === 4) {//复审通过
			sumitHandle_4();
		}else if(status===5){//复审中
			sumitHandle_5();
		}
	})

	function sumitHandle_0() { //提交客服初审结果
		let handleRet = $('input[name=js-radio-kfHandle]:checked').val();
		let rejectDesc = $("#panel_insure_handle .js-ipt-rejectDesc").val();
		let remark = $("#panel_insure_handle .js-ipt-remark").val();
		let hgId = $("#panel_insure_handle .js-select-insureHandleNure").attr("hgId");
		let dateTime = $("#panel_insure_handle input[name=kfStartTime]").val();
		if (handleRet === undefined) {
			Toast.error("请选择审核结果！");
			return false;
		} else if (handleRet == 1) {
			if (!hgId) {
				Toast.error("请选择领班护士！");
				return false;
			}
		} else if (handleRet === 2 && G_Util.isEmpty(rejectDesc)) {//驳回
			Toast.error("请填写驳回理由！");
			return false;
		}

		//{"insureNO":"2017051211505442 28860","assessType":1,"status":"1","hgId":"","remark":"测试客服评估不通过备注","rejectDesc":"测试客服评估不通过"}
		var param = {};
		param["insureNO"] = insureNO;
		param["assessType"] = 0;
		param["status"] = handleRet; //(1-通过 2-驳回)
		param["hgId"] = hgId;
		param["remark"] = remark;
		param["rejectDesc"] = rejectDesc;
		param["dateTime"] = dateTime;
		G_InsureModule.insureProcess(param).then(function (result) {
			if (result.errorCode == 0) {
				Toast.success("操作成功");
				panel.hide();
				dtd.resolve(result);
			}
		});
	}
	//护士初审
	function sumitHandle_1(status) { //提交护士审核结果101已补全资料
		let hsHandleRet = $('input[name=js-radio-hsHandle]:checked').val();
		let rejectDesc = $("#panel_insure_handle .js-ipt-hsRejectDesc").val();
		let remark = $("#panel_insure_handle .js-ipt-hsRemark").val();
		let t_hsCasePresentation = $("#panel_insure_handle .js-ipt-hsCasePresentation").val();
		let t_medicalHistory = $("#panel_insure_handle .js-ipt-medicalHistory").val();
		let barthelScoreAdl = $("#panel_insure_handle .js-grade-barthel-self").attr('score');
		let isForce = false;
		let param = {};//isAmentia=1 智障是否中重度智能障碍 0-否 1-是 
		/**
		dysgnosiaePic-中重度智能障碍照片
		caseDiagnosePic-诊断、病历或其他照片
		hsCasePresentation-病情描述
		* */
		let t_isAmentia='';
		let t_dysgnosiaePic=[];
		param["insureNO"] = insureNO;
		if(status==101){
			hsHandleRet=1;
		}
		if(status==2||status == 51){//等待提交复审-驳回时保存
			param["assessType"] = 51;
		}else{
			param["assessType"] = 1;
			param["status"] = hsHandleRet; //(1-通过 2-驳回)
		}
		param["remark"] = remark;
		param["rejectDesc"] = rejectDesc;
		param["isForce"] = isForce;
		param["barthelScoreAdl"] = barthelScoreAdl;
		param["hsCasePresentation"] = t_hsCasePresentation;
		param["medicalHistory"] = t_medicalHistory;
		if(!t_hsCasePresentation){
			Toast.error("请填写病情描述！");
			return false;
		}
		if(!(barthelScoreAdl&&parseFloat(barthelScoreAdl)>=0)&&hsHandleRet === 1){
			Toast.error("请先进行adl评估！");
			return false;
		}
		if($('.heavyIll-label input').prop('checked')){
			t_isAmentia=1;
			if(!$('.heavyIll-box li.img-li').length){
				Toast.error("请上传诊断书！");
				return false;
			}
			for(let i=0;i<$('.heavyIll-box li.img-li').length;i++){
				t_dysgnosiaePic.push($('.heavyIll-box li.img-li').eq(i).find('img').attr('imgid'));
			}
		}else{
			t_isAmentia=0;
		}
		let t_caseDiagnosePic=[];
		//上传诊断、病历或其他照片
		if($('.caseDiagnosePic-box li.img-li').length){
			for(let i=0;i<$('.caseDiagnosePic-box li.img-li').length;i++){
				t_caseDiagnosePic.push($('.caseDiagnosePic-box li.img-li').eq(i).find('img').attr('imgid'));
			}
		}
		//medicalHistory-评估情况说明
		if(!t_medicalHistory){
			Toast.error("请填写评估情况说明！");
			return false;
		}
		if (hsHandleRet === undefined&&status==1) {
			Toast.error("请选择审核结果！");
			return false;
		} else if (hsHandleRet == 2 && G_Util.isEmpty(rejectDesc)&&status==1) {//驳回
			Toast.error("请填写驳回理由！");
			return false;
		}
//		if (hsHandleRet == 2) {
//			isForce = $('#panel_insure_handle .js-chk-isfocre').attr('checked')
//		}
		param["isAmentia"] = t_isAmentia;
		param["dysgnosiaePic"] = t_dysgnosiaePic;
		param["caseDiagnosePic"] = t_caseDiagnosePic;
		//40-60需上传中重度图片，，60+不能申请
		if(barthelScoreAdl>40&&barthelScoreAdl<60&&!t_isAmentia&&hsHandleRet === 1){
			Toast.error("参保人ADL分数在40分~60分,需上传诊断书！");
			return false;
		}
		if(barthelScoreAdl>=60&&hsHandleRet === 1){
			Toast.error("参保人ADL分数在60分以上，不符合通过条件!");
			return false;
		}
		G_InsureModule.insureProcess(param).then(function (result) {
			if (result.errorCode == 0) {
				Toast.success("操作成功");
				panel.hide();
				dtd.resolve(result);
			}

		}, function (res) {
			if(res.errorCode==201){//请先指派护士，再进行操作
				top.importOnceJS('js-select-nations', "js/app/modal/select_insure_handle_nure.js");
				var nurseType = '10002';
				var insureOrderNO = insureNO;
				top.G_OpenSelectInsureHandleNureWin(nurseType, insureOrderNO);
			}
		});
	}
	function sumitHandle_3() { //录入机构审核结果---等待复审
		let handleRet = $('input[name=js-radio-profession]:checked').val();
		let rejectDesc = $("#panel_insure_handle .rejectDesc").val();
		let insureEndDate = $("#panel_insure_handle .js-span-choseNurse-profession input[name=kfStartTime]").val();
		let hgId = $("#panel_insure_handle .js-span-choseNurse-profession .js-select-insureHandleNure").attr("hgId");
		if (handleRet === undefined) {
			Toast.error("请选择审核结果！");
			return;
		}
		if (handleRet == 3 && !rejectDesc) {//驳回
			Toast.error("请填写驳回理由！");
			return;
		}
		if (handleRet == 1&&!hgId) {
			Toast.error("请选择领班护士长！");
			return false;
		}
		if (handleRet == 1&&!insureEndDate) {
			Toast.error("请选择上门时间！");
			return false;
		}
		var param = {};
		param["insureNO"] = insureNO;
		param["assessType"] = 3;
		param["status"] = handleRet; //(1-通过 2-驳回)
		param["rejectDesc"] = rejectDesc;
		param["dateTime"] = insureEndDate;
		param["hgId"] = hgId;
		console.log(param);
		G_InsureModule.insureProcess(param).then(function (result) {

			if (result.errorCode == 0) {
				Toast.success("操作成功");
				panel.hide();
				$("#panel_insure_handle .js-ipt-govRejectDesc").val("");
				dtd.resolve(result);
			}
		});
	}

	function sumitHandle_4() { // 指派健康经理
		var hgName = $(".js-btn-showInsureHandleNure-jkjl").html();
		var hgId = $(".js-btn-showInsureHandleNure-jkjl").attr("hgId");
		var status = $('input[name=js-radio-status-4]:checked').val();
		if (!status) {
			Toast.error("请选择联系客户！");
			return;
		}
		if (status === 2&&gId === undefined) {
			Toast.error("请选择健康经理！");
			return false;
		}
		var param = {};
		param["insureNO"] = insureNO;
		param["status"] = status;
		param["hgId"] = hgId;
		param["assessType"] = 4;
		param["hgName"] = hgName;
		param["guideType"] = 2;
		console.log(param);
		G_OrderModule.GuideStaff(param).then(function (result) {
			if (result.errorCode == 0) {
				Toast.success("操作成功");
				panel.hide();
				dtd.resolve(result);
			}
		});

	}
	function sumitHandle_5() { //复审中
		let handleRet = $('input[name=js-radio-status-5]:checked').val();
		let insureEndDate = $('#status-5-end').val();
		let hgId = $("#panel_insure_handle .js-select-insureHandleNure-HS").attr("hgId");
		let remark=$('.status-5-remark').val();
		var param = {};
		param["insureNO"] = insureNO;
		param["assessType"] = 5;
		param["status"] = handleRet; //(1-通过 2-驳回)
		param["dateTime"] = insureEndDate;
		param["hgId"] = hgId;
		param["remark"] = remark;
		console.log(param);
		if (handleRet === undefined) {
			Toast.error("请选择审核结果！");
			return;
		}
		if (!hgId) {
			Toast.error("请选择护士！");
			return false;
		}
		if (!insureEndDate) {
			Toast.error("请选择资质有效期！");
			return false;
		}
		console.log(param);
		G_InsureModule.insureProcess(param).then(function (result) {
			if (result.errorCode == 0) {
				Toast.success("操作成功");
				panel.hide();
				$("#panel_insure_handle .js-ipt-govRejectDesc").val("");
				dtd.resolve(result);
			}
		});
	}
	$("body").on('click', ".medicalInfo", function () {
		top.importOnceJS('js-select-medicalInfo', "js/app/rp/medical_info.js");
		var elem = $(this);
		top.G_OpenSelectBranchWin().then(function (data) {
			//			console.log("data:" + JSON.stringify(data));
			//			var branchNameArr = [];
			//			$.each(data, function(index,val) {
			//				branchNameArr.push(val.branchName);
			//			});
			//			elem.html(branchNameArr.join(","));
			//			elem.attr('branch',JSON.stringify(data));
		});
	});

	return dtd.promise();
}

function modal_show_pg_create(obj) {
	let show_pg_createHtml = '<div id="show_pg_create" class="r_panel">' +
		'<div class="panel-header">' +
		'<button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<h4 class="modal-title">居家订单评估</h4>' +
		'</div>' +
		'<div class="panel-body">' +
		'<p class="content-title rp_subtit">订单信息</p>' +
		'<div class="form-group">' +
		'<div class="pg-infos">' +
		'<p><i>订单编号：</i><span class=pg-username>' + obj.orderid + '</span><i>被服务人：<b>' + obj.kinsname + '</b></i></p>' +
		'<p><b class="form-required">*</b>评估护士：<span class="select_ps select-item" nurseType=10002>选择评估护士</span><i></i></p>' +
		'</div>' +
		'</div>' +
		'<p class="content-title rp_subtit">评估信息: </p>' +
		'<div class="form-group">' +
		'<div>' +
		'<p class="pg_medical"><i>病史描述：</i><span class="select_illness select-item">+添加</span><em></em></p>' +
		'<p>' +
		'<span style="margin-right: 50px;"><i><b class="form-required">*</b>脉搏：</i>　<input type="text" class="mbNum" placeholder=""/> 次/分</span>' +
		'<span><i><b class="form-required">*</b>体温：</i><input type="text" class="twNum" placeholder=""/> °C</span>' +
		'</p>' +
		'<p>' +
		'<span><i><b class="form-required">*</b>血压：</i>　<input class="xyNum" type="text" placeholder=""/> mmHg</span>' +
		'<span><i><b class="form-required">*</b>呼吸：</i><input class="hxNum" type="text" placeholder=""/> 次/分</span>' +
		'</p>' +
		'<p>' +
		'<span><i>并发症：</i>　<input class="illDesc" type="text" placeholder=""/></span>' +
		'</p>' +
		'<p class="treatDesc">' +
		'<span>' +
		'<i><b class="form-required">*</b>治疗情况：</i>' +
		'<em class=check_em><input type="checkbox" /><strong>未治疗</strong></em>' +
		'<em class=check_em><input type="checkbox" /><strong>药物治疗</strong></em>' +
		'<em class=check_em><input type="checkbox" /><strong>手术治疗</strong></em>' +
		'<input type="text" placeholder=""/>' +
		'</span>' +
		'</p>' +
		'<p class="hobby">' +
		'<span>' +
		'<i>嗜好：</i>' +
		'<em class=check_em><input type="checkbox" /><strong>嗜烟</strong></em>' +
		'<em class=check_em><input type="checkbox" /><strong>嗜酒</strong></em>' +
		'</span>' +
		'</p>' +
		'</div>	' +
		'</div>' +
		'<p class="content-title rp_subtit">残疾信息（残障人士评估专用）</p>' +
		'<div class="form-group">' +
		'<div class=disable-people>' +
		'<p>' +
		'<span><i>残疾人证号：　</i><input class="cjid" type="text" placeholder=""/></span>' +
		'</p>' +
		'<p>' +
		'<span>' +
		'<i>致残时间：　　</i>' +
		'<input class="cjtime form_date" type="text" placeholder=""/>' +
		'<i>类别：</i>' +
		'<select name="" class="cjtype">' +
		'<option value="1">视力</option>' +
		'<option value="2">听力</option>' +
		'<option value="3">言语</option>' +
		'<option value="4">肢体</option>' +
		'<option value="5">智力</option>' +
		'<option value="6">精神</option>' +
		'<option value="7">多重</option>' +
		'</select>' +
		'</span>' +
		'</p>' +
		'<p>' +
		'<span><i>等级：　　　　</i><input class="cjlevel" type="text" placeholder=""/></span>' +
		'</p>' +
		'<p>' +
		'<span class="disable-reason"><i>致残原因：　　</i><textarea class="cjdesc"></textarea></span>' +
		'</p>' +
		'</div>' +
		'</div>' +
		'<p class="content-title rp_subtit">评估结果：</p>' +
		'<div class="form-group">' +
		'<div class=pg-result>' +
		'<p>' +
		'<span>' +
		'<i class="commLevel">' +
		'<b class="form-required">*</b>感知觉与沟通 : ' +
		'<em class=radio_em><input type="radio" name="ganzhi" /><strong>1级</strong></em>' +
		'<em class=radio_em><input type="radio" name="ganzhi" /><strong>2级</strong></em>' +
		'<em class=radio_em><input type="radio" name="ganzhi" /><strong>3级</strong></em>' +
		'</i>' +
		'<i class="mindLevel">' +
		'<b class="form-required">*</b>精神状态 :　　' +
		'<em class=radio_em><input type="radio" name="jinshen" /><strong>1级</strong></em>' +
		'<em class=radio_em><input type="radio" name="jinshen" /><strong>2级</strong></em>' +
		'<em class=radio_em><input type="radio" name="jinshen" /><strong>3级</strong></em>' +
		'</i>' +
		'</span>' +
		'</p>' +
		'<p>' +
		'<span>' +
		'<i class="jujiaLevel">' +
		'<b class="form-required">*</b>居家环境安全 : ' +
		'<em class=radio_em><input type="radio" name="jujia"/><strong>1级</strong></em>' +
		'<em class=radio_em><input type="radio" name="jujia"/><strong>2级</strong></em>' +
		'<em class=radio_em><input type="radio" name="jujia" /><strong>3级</strong></em>' +
		'</i>' +
		'<i class="adlLevel">' +
		'<b class="form-required">*</b>日常生活活动 : ' +
		'<em class=radio_em><input type="radio" name="huodong" /><strong>1级</strong></em>' +
		'<em class=radio_em><input type="radio" name="huodong" /><strong>2级</strong></em>' +
		'<em class=radio_em><input type="radio" name="huodong" /><strong>3级</strong></em>' +
		'</i>' +
		'</span>' +
		'</p>' +
		'<p>' +
		'<span>' +
		'<i class="nurseLevel">' +
		'<b class="form-required">*</b>护理等级 :　　' +
		'<em class=radio_em><input type="radio" name="huli" /><strong>1级</strong></em>' +
		'<em class=radio_em><input type="radio" name="huli" /><strong>2级</strong></em>' +
		'<em class=radio_em><input type="radio" name="huli"/><strong>3级</strong></em>' +
		'</i>' +
		'</span>' +
		'</p>' +
		'</div>	' +
		'</div>' +
		'</div>' +
		'<div class="panel-footer">' +
		'<div class="form-group">' +
		'<div class="col-sm-12" style="text-align:center">' +
		'<button type="button" class="btn btn-success btn-money-submit">提交</button> ' +
		'<button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
		'</div>' +
		'</div>' +
		'</div>   ' +
		'</div>';
	var show_pg_create_modal = new RPModalPanel('show_pg_create', show_pg_createHtml);
	show_pg_create_modal.show();
	for (let i = 0; i < $('#show_pg_create .form-group p span em.radio_em').length; i++) {
		if (i == 0 || i == 3 || i == 6 || i == 9 || i == 12) {
			$('#show_pg_create .form-group p span em.radio_em').eq(i).find('input[type=radio]').prop('checked', 'checked');
		}
	}
	let pg_create_hgId = '';//护士id
	//病史描述
	let medicalList_arr = [];
	$('#show_pg_create').find(".form_date").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});
	//添加护士
	$('body').off('click', '#show_pg_create .select_ps').on('click', '#show_pg_create .select_ps', function () {
		top.importOnceJS('js-select-nations', "js/app/modal/select_insure_handle_nure.js");
		var elem = $(this);
		var nurseType = elem.attr('nurseType');
		var orderId = 'pgcreate';
		let hsType=elem.attr('hstype');
		top.G_OpenSelectInsureHandleNureWin(nurseType, orderId,hsType)
			.then(function (data) {
				console.log(data);//hgId-hgName
				pg_create_hgId = data.hgId;
				elem.closest('p').find('i').html('');
				elem.closest('p').find('i').html(data.hgName);
			});
	}).off('click', '#show_pg_create .form-group p span em.check_em').on('click', '#show_pg_create .form-group p span em.check_em', function () {
		if ($(this).find('input[type=checkbox]').prop('checked')) {
			$(this).find('input[type=checkbox]').prop('checked', false);
		} else {
			$(this).find('input[type=checkbox]').prop('checked', 'checked');
		}
	}).off('click', '#show_pg_create .form-group p span em.radio_em').on('click', '#show_pg_create .form-group p span em.radio_em', function () {
		$(this).find('input[type=radio]').prop('checked', 'checked');
	}).off('click', '#show_pg_create .form-group p span em.check_em input').on('click', '#show_pg_create .form-group p span em.check_em input', function () {
		if ($(this).prop('checked')) {
			$(this).prop('checked', false);
		} else {
			$(this).prop('checked', 'checked');
		}
	}).off('click', '#show_pg_create .select_illness').on('click', '#show_pg_create .select_illness', function () {//添加病史
		top.importOnceJS('js-script-medical', "js/app/rp/medical_history.js");
		var elem = $(this);
		var insureNO = 'pgcreate';
		top.G_Fun_showmedicalHandlePanel(insureNO).then(function (data) {
			medicalList_arr = data;
			elem.closest('p').find('em').empty();
			for (let i = 0; i < data.length; i++) {
				let node = $('<b class="btn btn-default btn-sm js-medicalselect-style">' + data[i] + '</b>');
				elem.closest('p').find('em').append(node);
			}
		});
	}).off('click', '#show_pg_create .btn-money-submit').on('click', '#show_pg_create .btn-money-submit', function () {
		//orderId-mbNum-twNum-xyNum-treatDesc-hobby-commLevel-mindLevel-jujiaLevel-adlLevel-nurseLevel
		let pg_create_mbNum, pg_create_twNum, pg_create_xyNum, pg_create_treatDesc, pg_create_hobby;
		let pg_create_commLevel, pg_create_mindLevel, pg_create_jujiaLevel, pg_create_adlLevel, pg_create_nurseLevel;
		let pg_create_medicalList, pg_create_cjID, pg_create_cjTime, pg_create_cjType, pg_create_cjLevel, pg_create_cjDesc;
		pg_create_mbNum = $('#show_pg_create .mbNum').val();
		pg_create_twNum = $('#show_pg_create .twNum').val();
		pg_create_xyNum = $('#show_pg_create .xyNum').val();
		let treat_arr = [];//治疗情况
		for (let i = 0; i < $('#show_pg_create .treatDesc em.check_em').length; i++) {
			if ($('#show_pg_create .treatDesc em.check_em').eq(i).find('input[type=checkbox]').prop('checked')) {
				treat_arr.push($('#show_pg_create .treatDesc em.check_em').eq(i).find('strong').html());
			}
		}
		if ($('#show_pg_create .treatDesc').find('input[type=text]').val()) {
			treat_arr.push($('#show_pg_create .treatDesc').find('input[type=text]').val());
		}
		let hobby_arr = [];//嗜好情况
		for (let j = 0; j < $('#show_pg_create .hobby span em').length; j++) {
			if ($('#show_pg_create .hobby span em').eq(j).find('input[type=checkbox]').prop('checked')) {
				hobby_arr.push($('#show_pg_create .hobby span em').eq(j).find('strong').html())
			}
		}
		pg_create_commLevel = pg_create_level('commLevel');
		pg_create_mindLevel = pg_create_level('mindLevel');
		pg_create_jujiaLevel = pg_create_level('jujiaLevel');
		pg_create_adlLevel = pg_create_level('adlLevel');
		pg_create_nurseLevel = pg_create_level('nurseLevel');
		pg_create_treatDesc = treat_arr;
		pg_create_hobby = hobby_arr;
		pg_create_medicalList = medicalList_arr;
		pg_create_cjID = $('#show_pg_create .cjid').val();
		pg_create_cjTime = $('#show_pg_create .cjtime').val();
		pg_create_cjType = $('#show_pg_create  .cjtype option:selected').val();
		pg_create_cjLevel = $('#show_pg_create .cjlevel').val();
		pg_create_cjDesc = $('#show_pg_create .cjdesc').val();
		pg_create_hxNum = $('#show_pg_create .hxNum').val();
		pg_create_illDesc = $('#show_pg_create .illDesc').val();
		if (!pg_create_hgId) {
			Toast.error("请选择评估护士！");
			return false;
		}
		if (!pg_create_mbNum || !pg_create_twNum || !pg_create_xyNum || !pg_create_hxNum || !pg_create_treatDesc.length || !pg_create_commLevel || !pg_create_mindLevel || !pg_create_jujiaLevel || !pg_create_adlLevel || !pg_create_nurseLevel) {
			Toast.error("请完善评估信息！");
			return false;
		}
		//orderId-mbNum-twNum-xyNum-treatDesc-hobby-commLevel-mindLevel-jujiaLevel-adlLevel-nurseLevel
		let params = {
			orderId: obj.orderid,
			hsId: pg_create_hgId,
			mbNum: pg_create_mbNum,
			twNum: pg_create_twNum,
			xyNum: pg_create_xyNum,
			treatDesc: pg_create_treatDesc,
			hobby: pg_create_hobby,
			commLevel: pg_create_commLevel,
			mindLevel: pg_create_mindLevel,
			jujiaLevel: pg_create_jujiaLevel,
			adlLevel: pg_create_adlLevel,
			nurseLevel: pg_create_nurseLevel,
			medicalList: pg_create_medicalList,
			cjID: pg_create_cjID,
			cjTime: pg_create_cjTime,
			cjType: pg_create_cjType,
			cjLevel: pg_create_cjLevel,
			cjDesc: pg_create_cjDesc,
			hxNum: pg_create_hxNum,
			illDesc: pg_create_illDesc,
		}
		console.log(params);
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/SAASAddOrderAssessResult',
			params: params
		}).then((res) => {
			Toast.success("创建成功");
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
		})
	})
}
function pg_create_level(str) {
	for (let i = 0; i < $('#show_pg_create').find('.' + str).find('em').length; i++) {
		if ($('#show_pg_create').find('.' + str).find('em').eq(i).find('input[type=radio]').prop('checked')) {
			return i + 1;
		}
	}
}
/********************新建长护险订单*****************/
function showInsureHandlePanel_addInsure(){
	let addInsurePhoneHtml = `<div id="addInsurePhone" class="r_panel nopadding">
		    <div class="panel-header">
		        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">新增长护险申请单</h4>
		    </div>
			 <div class="panel-center"><p class="panel-infos">申请账号信息</p>
		<div class="panel-content">
				  <ul><li><span>申请账号：</span><input class="phoneCall form-control" type="text" placeholder="请先输入申请账号" /></li><li><span class="random_phone">没有手机号码？点击这里生成随机账号 >></span></li></ul>
		    </div></div>
			 <div class="panel-footer">
		 		 <div class="footer-content"><span class="rp_close">取消</span><span>下一步</span></div>
			 </div>
		</div>`
	let addInsurePhone_panel = new RPModalPanel('addInsurePhone', addInsurePhoneHtml);
	addInsurePhone_panel.show();
	let dtd = $.Deferred();
	$('body').off('click','#addInsurePhone .panel-content ul li .random_phone').on('click','#addInsurePhone .panel-content ul li .random_phone',function(){
		bootbox.confirm({
			title: "系统提示",
			message: "是否使用随机账号创建订单？",
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
						url: '/adminjson/SAASCreateDiffnoUser',
					}).then((res)=>{
						addInusreDetail(res.body.userId, res.body.diffno);
					})
				}
			}
		});
		
	})
	$('body').off('click', '#addInsurePhone .panel-footer .footer-content span:nth-last-child(1)');
	$('body').on('click', '#addInsurePhone .panel-footer .footer-content span:nth-last-child(1)', addInsurePhoneSubmit)
	$('#addInsurePhone .phoneCall').keydown(function (event) {
		if (event.keyCode == 13) {//回车
			addInsurePhoneSubmit();//验证手机号进行下一步
		}
	});
	function addInsurePhoneSubmit() {
		let pattern = /^1[34578]\d{9}$/;//手机号校验正则
		let phoneNum = $('#addInsurePhone .phoneCall').val();
		if (!pattern.test(phoneNum)) {
			Toast.error("请输入正确的电话号码");
		} else {
			addInsureCheckPhone(phoneNum);
		}
	}
	
	//验证手机号进行下一步
	function addInsureCheckPhone(phone) {
		let httpUtilObj = new HttpUtil();
		let data = {
			phone: phone
		}
		let userId = '';
		httpUtilObj.ajax({
			url: '/adminjson/SAASCheckUserExist',
			params: data
		}).then((res) => {
			if (res.errorCode == 0) {
				userId = res.body.userId;
				if (userId) {//账号已存在
					addInusreDetail(userId, phone);
				} else {//账号不存在需要新建
					Toast.error("未检索到该手机号,请新增用户!");
					top.importOnceJS('js-script-adduser', "js/app/rp/adduser.js");
					top.G_Fun_showAddUserPanel(phone,'addInsure').then((res)=>{
						addInusreDetail(res.body.id, phone);
					})
				}
			}
		})
	}
	//新建订单页面
	function addInusreDetail(id,phone){
		let addInusreDetailHtml = `<div id="addInusreDetail" class="r_panel nopadding adduser">
			    <div class="panel-header">
			        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title">新增长护险申请单</h4>
			    </div>
				<div class="panel-center">
					<p class="panel-infos">申请人信息（必填）</p>
					<div class="panel-content">
						<ul>
							<li>
								<span>　　申请账号：</span>
								<input class="phoneCall form-control" type="text" disabled value="${phone}" />
							</li>
							<li>
								<span>参保人身份证：</span>
								<input class="form-control insureIdcard" type="text" placeholder="请输入参保人身份证" /><i class="idcard-msg" style="color:red;margin-left:15px;"></i>
							</li>
							<li>
								<span>　参保人姓名：</span>
								<input class="form-control insureName" type="text" placeholder="请输入参保人姓名" />
								<span>　　人员类别：</span>
								<select class="form-control insureStaffType">
									<option value=1>在职</option>
									<option value=2>退休</option>
								</select>
							</li>
							<li>
								<span>　医保卡类别：</span>
								<select class="form-control insureMedicareType">
									<option value=1>广州市职工医保</option>
									<option value=2>城镇医疗</option>
									<option value=3>公费医疗</option>
									<option value=4>新农合医保</option>
									<option value=5>其他类型</option>
								</select>
								<span>　　医保卡号：</span>
								<input class="form-control insurehealthCareNO" type="text" placeholder="请输入医保卡号" />
							</li>
						</ul>
				    </div>
				    <div>
				    	<ul class="ul-img-upload addInsure">
							<li class="insureIdPic">
								<input type="file" class="hidden js-upload-file-input insureUpload" multiple="multiple" name="insureUpload">
								<img class="imgTakeView" imgid="" imgurl="" src="" />
								<div class="text-desc order-show"><a href="#">+添加图片</a></div>
								<p class="pop-title">身份证正面照</p>
								<i class="del-icon"></i>
							</li>
							<li class="insureIdPic2">
								<input type="file" class="hidden js-upload-file-input insureUpload" multiple="multiple" name="insureUpload">
								<img class="imgTakeView" imgid="" imgurl="" src="" />
								<div class="text-desc order-show"><a href="#">+添加图片</a></div>
								<p class="pop-title">身份证反面照</p>
								<i class="del-icon"></i>
							</li>
							<li class="insureKinsfolkImg">
								<input type="file" class="hidden js-upload-file-input insureUpload" multiple="multiple" name="insureUpload">
								<img class="imgTakeView" imgid="" imgurl="" src="" />
								<div class="text-desc order-show"><a href="#">+添加图片</a></div>
								<p class="pop-title">参保人照片</p>
								<i class="del-icon"></i>
							</li>
							<li class="insureHealthCareImg">
								<input type="file" class="hidden js-upload-file-input insureUpload" multiple="multiple" name="insureUpload">
								<img class="imgTakeView" imgid="" imgurl="" src="" />
								<div class="text-desc order-show"><a href="#">+添加图片</a></div>
								<p class="pop-title">医保卡照片</p>
								<i class="del-icon"></i>
							</li>
						</ul>
				    </div>
				    <div class="panel-content">
					    <div class="panel-addr panel-person">
					    	<span>选择被服务人 :</span>
					    	<ul class="order-w servicePerson"></ul>
					    </div>
					</div>
					<p class="panel-infos">联系信息（必填）</p>
					<div class="panel-content">
					    <div class="panel-addr">
						    <span>联系地址 :</span>
						    <ul class="order-w addressDetail"></ul>
						    <ul><li class="orderAddress addressBtn" userid="${id}">+新增地址</li></ul>		 
					    </div>
					</div>
					<p class="panel-infos">代理人信息（没有可不填）</p>
					<div class="panel-content">
						<ul>
							<li>
								<span>代理人姓名：</span>
								<input class="form-control insureAgencyName" type="text" placeholder="请输入代理人姓名" />
							</li>
							<li>
								<span>代理人关系：</span>
								<input class="form-control insureAgencyRelation" type="text" placeholder="请输入代理人关系" />
							</li>
							<li>
								<span>代理人电话：</span>
								<input class="form-control insureAgencyPhone" type="number" placeholder="请输入代理人电话" />
							</li>
						</ul>
					</div>
					<p class="panel-infos">申请单信息（必填）</p>
					<div class="panel-content" style="margin-bottom:100px;">
						<ul>
							<li>
								<span>申请待遇类别：</span>
								<select class="form-control insureApplyTreatmentType">
									<option value=1>生活照料</option>
									<option value=2>生活照料+医疗护理</option>
								</select>
								<span>　　　　　　　　待遇类型：</span>
								<select class="form-control insureTreatmentType">
									<option value=1>居家护理</option>
									<option value=2>机构护理</option>
								</select>
							</li>
							<li>
								<span>　　评估类别：</span>
								<select class="form-control insureAssessType">
									<option value=1>首次评估</option>
									<option value=2>复检评估</option>
									<option value=3>变更评估</option>
								</select>
								<span>　　长护险告知书领取方式：</span>
								<select class="form-control insureGetType">
									<option value=1>邮寄</option>
									<option value=2>自取</option>
								</select>
							</li>
						</ul>
					</div>
				</div>
				<div class="panel-footer">
			 		<div class="footer-content"><span class="rp_close">取消</span><span class="sureSubmit">确定申请</span></div>
				</div>
			</div>`
		let addInusreDetail_panel = new RPModalPanel('addInusreDetail', addInusreDetailHtml);
		addInusreDetail_panel.show();
		insureImgUpload();//图片上传流程
		function insureImgUpload(){
			$('.text-desc').off('click').on('click',function(){
				$(this).closest('li').find('input').click();
			})
			//图片上传逻辑
			$('body').find('input[name=insureUpload]').off('click').on('click',function(){//批量导入
				top.importOnceJS('js-script-hg',"js/app/fun.js");
				let self=$(this);
				let ele=$(this).closest('li');
				uploadImg($('input[name=insureUpload]'),'show').then((data)=>{
					insureUpload(data,ele);
				})
			})
		}
		ImgTakeLook();
		function insureUpload(data,ele){
			if(data.errCode!=0){
				Toast.error('上传失败！请选择正确的图片格式或上传图片过大');
				return false;
			}
			ele.find('img').attr({
				'imgid':data.imageId,
				'imgurl':data.imgUrl,
				'src':data.imgUrl,
			}).addClass('order-show');
			ele.find('.text-desc').removeClass('order-show');
			ImgTakeLook();//点击查看图片大图
			ele.find('.del-icon').addClass('order-show');
			ele.find('.del-icon').off('click').on('click',function(){
				let self_del=$(this);
				bootbox.confirm({
					title: "提示",
					message: '确认删除此图片？',
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
							ele.closest('li').find('.text-desc').addClass('order-show');
							ele.closest('li').find('img').removeClass('order-show').attr({
								'imgid':'',
								'imgurl':'',
								'src':'',
							});
							ele.find('.del-icon').removeClass('order-show');
						}
					}
				});
			})
		}
		//选择被服务人
		orderManage_getKinsfolk(id,'#addInusreDetail').then((res)=>{
			if(!$('.servicePerson li').length){//没有符合条件的被服务人
				$('.panel-person').css('display','none');
			}else{
				$('.panel-person').css('display','block');
			}
			$('.servicePerson li').off('click').on('click', function () {
				let self=$(this);
				let kins_arr='';
				if(!$(this).hasClass('not-use')){
					for(let i=0;i<res.length;i++){
						if(res[i].kinsId==self.attr('kinsid')){
							kins_arr=res[i];
						}
					}
					$('.servicePerson li').removeClass('selected');
					self.addClass('selected');
					$('.insureName').val(self.find('strong').html()).attr({
						'disabled':true,
						'kinsid':self.attr('kinsid'),
					});
					$('.insureIdcard').val(kins_arr.idCardNo).attr('disabled',true);
					$('.insureStaffType').val(kins_arr.staffType).attr('disabled',true);
					$('.insureMedicareType').val(kins_arr.medicareType).attr('disabled',true);
					$('.insurehealthCareNO').val(kins_arr.healthCareNO).attr('disabled',true);
					$('.addInsure').find('.text-desc').removeClass('order-show');
					$('.addInsure').find('img').addClass('order-show');;
					$('.insureIdPic img').attr({
						'imgid':kins_arr.idPic,
						'src':kins_arr.idPicUrl,
						'imgurl':kins_arr.idPicUrl,
					});
					$('.insureIdPic2 img').attr({
						'imgid':kins_arr.idPic2Id,
						'src':kins_arr.idPic2Url,
						'imgurl':kins_arr.idPic2Url,
					});
					$('.insureKinsfolkImg img').attr({
						'imgid':kins_arr.kinsfolkImgId,
						'src':kins_arr.kinsfolkImgUrl,
						'imgurl':kins_arr.kinsfolkImgUrl,
					});
					$('.insureHealthCareImg img').attr({
						'imgid':kins_arr.healthCareImgId,
						'src':kins_arr.healthCareImgUrl,
						'imgurl':kins_arr.healthCareImgUrl,
					});
				}else{
					Toast.error('申请条件不符合！');
				}
			})
		})
		getOrderAddress(id, '#addInusreDetail');
		$('.addressBtn').off('click').on('click',function(){
			top.importOnceJS('js-script-useraddress', "js/app/rp/useraddress.js");
			top.setId('userId', $(this).attr('userId'));
			top.G_Fun_showAddUserAddressPanel(id, '#addInusreDetail').then((res)=>{
				getOrderAddress(id, '#addInusreDetail');
			})
		})
		$('body').off('click', '#addInusreDetail .addressDetail li').on('click', '#addInusreDetail .addressDetail li', function () {
			for (let i = 0; i < $('#addInusreDetail .addressDetail li').length; i++) {
				$('#addInusreDetail .addressDetail li').eq(i).find('input[type=radio]').prop('checked', false);
			}
			$(this).find('input[type=radio]').prop('checked', 'checked');
		})
		//输入手机号进行用户选择
		$('#addInusreDetail .insureIdcard').blur(function (event) {
			let key_idCardNo=$('#addInusreDetail .insureIdcard').val();
			let pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
            if (!pattern.test(key_idCardNo)) {
               $('.idcard-msg').html('请输入正确的身份证号码').addClass('idcard-msg-show')
				.animate({'margin-left':"+=15px"},50)
                .animate({'margin-left':"-=15px"},50)
                .animate({'margin-left':"-=15px"},50)
                .animate({'margin-left':"+=15px"},50)
                .animate({'margin-left':"+=15px"},50)
                .animate({'margin-left':"-=15px"},50);
            }else{
            	let httpUtilObj = new HttpUtil();
            	let data={
            		idCard:key_idCardNo,
            	}
				httpUtilObj.ajax({
					url: '/adminjson/SAASGetKinsfolkIdCard',
					params: data
				}).then((res)=>{
					if(res.body.isStatus!=0){
						$('.idcard-msg').html(res.body.insureDesc).addClass('idcard-msg-show')
						.animate({'margin-left':"+=15px"},50)
		                .animate({'margin-left':"-=15px"},50)
		                .animate({'margin-left':"-=15px"},50)
		                .animate({'margin-left':"+=15px"},50)
		                .animate({'margin-left':"+=15px"},50)
		                .animate({'margin-left':"-=15px"},50);
					}else{
						$('.idcard-msg').html('').removeClass('idcard-msg-show');
					}
				})
            }
		});
		$('#addInusreDetail .sureSubmit').off('click').on('click',function(){
			let name,idCardNo,staffType,medicareType,healthCareNO,idPic,idPic2,kinsfolkImg,healthCareImg,addrId;
			let insureGetType,agencyName,agencyRelation,agencyPhone,applyTreatmentType,treatmentType,assessType;
			name=$('.insureName').val();
			idCardNo=$('.insureIdcard').val();
			staffType=$('.insureStaffType').val();
			medicareType=$('.insureMedicareType').val();
			healthCareNO=$('.insurehealthCareNO').val();
			idPic=$('.insureIdPic img').attr('imgid');
			idPic2=$('.insureIdPic2 img').attr('imgid');
			kinsfolkImg=$('.insureKinsfolkImg img').attr('imgid');
			healthCareImg=$('.insureHealthCareImg img').attr('imgid');
			addrId=$('#addInusreDetail .addressDetail li .addr-input input[type=radio]:checked').closest('li').attr('addrid');
			agencyName=$('.insureAgencyName').val();
			agencyRelation=$('.insureAgencyRelation').val();
			agencyPhone=$('.insureAgencyPhone').val();
			applyTreatmentType=$('.insureApplyTreatmentType').val();
			treatmentType=$('.insureTreatmentType').val();
			assessType=$('.insureAssessType').val();
			insureGetType=$('.insureGetType').val();
			let params={};
			params={
				userId:id,
				addrId:addrId,
				agencyName:agencyName,
				agencyRelation:agencyRelation,
				agencyPhone:agencyPhone,
				applyTreatmentType:applyTreatmentType,
				treatmentType:treatmentType,
				assessType:assessType,
				insureGetType:insureGetType,
			}
			if($('.servicePerson li.selected').length){//从被服务人列表中选取
				params['kinsId']=$('.servicePerson li.selected').attr('kinsid');
			}else{//手动填写
				params['name']=name;
				params['idCardNo']=idCardNo;
				params['staffType']=staffType;
				params['medicareType']=medicareType;
				params['healthCareNO']=healthCareNO;
				params['idPic']=idPic;
				params['idPic2']=idPic2;
				params['kinsfolkImg']=kinsfolkImg;
				params['healthCareImg']=healthCareImg;
			}
			console.log(params);
			if(!idCardNo){
				Toast.error("请输入正确的身份证号码！");
				return false;
			}
			if(idCardNo){
				let pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
	            if (!pattern.test(idCardNo)) {
	                Toast.error("请输入正确的身份证号码！");
					return false;
	            }
			}
			if(!name){
				Toast.error("请输入参保人姓名！");
				return false;
			}
			if(!healthCareNO){
				Toast.error("请输入医保卡号！");
				return false;
			}
			if(!idPic){
				Toast.error("请上传身份证正面照！");
				return false;
			}
			if(!idPic2){
				Toast.error("请上传身份证反面照！");
				return false;
			}
			if(!kinsfolkImg){
				Toast.error("请上传参保人照片！");
				return false;
			}
			if(!healthCareImg){
				Toast.error("请上传医保卡照片！");
				return false;
			}
			if(!addrId){
				Toast.error("请填写联系人地址！");
				return false;
			}
			if(agencyPhone){
				let pattern = /^1[34578]\d{9}$/;//手机号校验正则
				if (!pattern.test(agencyPhone)) {
					Toast.error("请输入正确的代理人电话！");
					return false;
				} 
			}
			let httpUtilObj = new HttpUtil();
			httpUtilObj.ajax({
				url: '/adminjson/SAASAddInsureNew',
				params: params
			}).then((res)=>{
				Toast.success('操作成功！');
				$('#rp-wrapper').empty();
				$('#transparent-mask').hide();
				dtd.resolve();
				return dtd.promise();
			})
		})
	}
	return dtd.promise();
}
/********************新建长护险订单*****************/