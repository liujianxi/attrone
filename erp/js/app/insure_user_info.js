/**
 * 长护险管理模块
 */

$(document).ready(function () {

	var httpUtilObj = new HttpUtil();

	$(".js-btn-showapplyListbyif").on('click', function () {
		var idcard = $("#q_idcard").val();
		var data = {};
		data.idcard = idcard;
		$(".js-userInfo-contain").show();
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetInsureDetail',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function (result) {
			if (result.errorCode == 0) {
//				alert("ssss");
				//用户详情加载
				var insureDetailHtml = template('InsureDetailTemplate', { "insure": result.body.insure });
				$("#InsureDetailContent").empty().html(insureDetailHtml);
				//长护险申请记录
				var insureapplyHtml = template('InsureapplyTemplate', { "applyList": result.body.insure.insureList });
				$("#InsureapplyContent").empty().html(insureapplyHtml);
//				//长护险评估记录
//				var insureADLMMSEHtml = template('InsureADLMMSETemplate', { "assessList": result.body.insure.assessList });
//				$("#InsureAssessContent").empty().html(insureADLMMSEHtml);
				
				var tmp = '';
				result.body.insure.assessList.forEach(function (item, index) {
					tmp += '<tr>' ;
					if (item.judge != 0){
						tmp += '<td><a href="javascript:void(0);" typeGrade=2 id="'+item.id+'" assessType="'+item.assessType+'" insureNO="'+item.insureNO+'" class="js-lookMMSETab-link" title="MMSE评估">MMSE评估</a></td>';
					} else {
						tmp += '<td><a href="javascript:void(0);" typeGrade=1 id="'+item.id+'" assessType="'+item.assessType+'" insureNO="'+item.insureNO+'" class="js-lookADLTab-link" title="ADL评估">ADL评估</a> ';
						if(item.assessType == 2){
							tmp += '<a href="' + location.protocol + '//' + location.host + '/getAdlAssessResultPDF?insureAssessAdl=' + item.id + '" download>下载pdf</a>';
						}
						tmp += '</td>';
					}
					tmp += '<td>'+item.score+'</td>';
					if(item.assessType == 0) {
						tmp += '<td>用户自评</td>';
					} else if(item.assessType == 1){
						tmp += '<td>客服评估</td>';
					} else if(item.assessType == 2){
						tmp += '<td>护士评估</td>';
					}
					tmp += '<td>'+(item.createStaffName == undefined ? "" : item.createStaffName)+'</td>';
					tmp += '<td>'+item.createTime+'</td>'+
					'</tr>';
				});
				$('#InsureAssessContent').html(tmp);

				//				//长护险联系记录
				//				var insurerelationHtml = template('InsurerelationTemplate', {"relation":result.body});
				//				$("#InsurerelationContent").empty().html(insurerelationHtml);
				//长护险服务记录
				var insureserveHtml = template('InsureserveTemplate', { "orderList": result.body.insure.insureOrderList });
				$("#InsureserveContent").empty().html(insureserveHtml);
				//长护险补贴记录
				var insuresubsidyHtml = template('InsuresubsidyTemplate', { "accountRecordList": result.body.insure.accountRecordList });
				$("#InsuresubsidyContent").empty().html(insuresubsidyHtml);
			}
		});
	});


	function applyList() {
		var insurekey = httpUtilObj.getTabParams();
		console.log("insurekey" + insurekey);
		var idcard = insurekey.key;
		var insureNO = insurekey.insureNO;
		var data = {};
		data.idcard = idcard;
		data.insureNO = insureNO;
		//发送请求

		if (idcard == null && insureNO == null) {
			$(".js-userInfo-contain").hide();
		} else {
			httpUtilObj.ajax({
				url: '/adminjson/SAASGetInsureDetail',
				type: "POST",
				dataType: 'json',
				params: data
			}).then(function (result) {
				if (result.errorCode == 0) {
					//用户详情加载
					var insureDetailHtml = template('InsureDetailTemplate', { "insure": result.body.insure });
					$("#InsureDetailContent").empty().html(insureDetailHtml);
					//长护险申请记录
					var insureapplyHtml = template('InsureapplyTemplate', { "applyList": result.body.insure.insureList });
					$("#InsureapplyContent").empty().html(insureapplyHtml);
					//长护险评估记录
					var tmp = '';
					result.body.insure.assessList.forEach(function (item, index) {
						tmp += '<tr>' ;
						if (item.judge != 0){
							tmp += '<td><a href="javascript:void(0);" typeGrade=2 id="'+item.id+'" assessType="'+item.assessType+'" insureNO="'+item.insureNO+'" class="js-lookMMSETab-link" title="MMSE评估">MMSE评估</a></td>';
						} else {
							tmp += '<td><a href="javascript:void(0);" typeGrade=1 id="'+item.id+'" assessType="'+item.assessType+'" insureNO="'+item.insureNO+'" class="js-lookADLTab-link" title="ADL评估">ADL评估</a> ';
							if(item.assessType == 2){
								tmp += '<a href="' + location.protocol + '//' + location.host + '/getAdlAssessResultPDF?insureAssessAdl=' + item.id + '" download>下载pdf</a>';
							}
							tmp += '</td>';
						}
						tmp += '<td>'+item.score+'</td>';
						if(item.assessType == 0) {
							tmp += '<td>用户自评</td>';
						} else if(item.assessType == 1){
							tmp += '<td>客服评估</td>';
						} else if(item.assessType == 2){
							tmp += '<td>护士评估</td>';
						}
						tmp += '<td>'+(item.createStaffName == undefined ? "" : item.createStaffName)+'</td>';
						tmp += '<td>'+item.createTime+'</td>'+
						'</tr>';
					});
					$('#InsureAssessContent').html(tmp);
//					var insureADLMMSEHtml = template('InsureADLMMSETemplate', { "assessList": result.body.insure.assessList });
//					$("#InsureAssessContent").empty().html(insureADLMMSEHtml);
					//				//长护险联系记录
					//				var insurerelationHtml = template('InsurerelationTemplate', {"relation":result.body});
					//				$("#InsurerelationContent").empty().html(insurerelationHtml);
					//长护险服务记录
					var insureserveHtml = template('InsureserveTemplate', { "orderList": result.body.insure.insureOrderList });
					$("#InsureserveContent").empty().html(insureserveHtml);
					//长护险补贴记录
					var insuresubsidyHtml = template('InsuresubsidyTemplate', { "accountRecordList": result.body.insure.accountRecordList });
					$("#InsuresubsidyContent").empty().html(insuresubsidyHtml);
				}
			});
		}
	}


	$("body").on('click', ".js-lookADLTab-link", function () {
		top.importOnceJS('js-script-insureADL', "js/app/modal/select_grade_personage.js");
		var elem = $(this);
		var insureNO = elem.attr("insureNO");
		var typeGrade = elem.attr("typeGrade");
		var id = elem.attr("id");
		var assessType = elem.attr("assessType");
		top.G_OpenSelectGradeWin(insureNO, typeGrade, id, assessType).then(function (data) {
		});
	});
	$("body").on('click', ".js-lookMMSETab-link", function () {
		top.importOnceJS('js-script-insureMMSE', "js/app/modal/select_grade_personage.js");
		var elem = $(this);
		var insureNO = elem.attr("insureNO");
		var typeGrade = elem.attr("typeGrade");
		var id = elem.attr("id");
		var assessType = elem.attr("assessType");
		top.G_OpenSelectGradeWin(insureNO, typeGrade, id, assessType).then(function (data) {
		});
	});

	applyList();
});