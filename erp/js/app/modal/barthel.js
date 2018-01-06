/***********ADL评分  begin******************************/
var grade_barthel_modal_html = '<div style="padding:50px 0;" class="modal fade" id="js-modal-grade_barthel-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
	'	<div class="modal-dialog" role="document"  style="width: 700px;height: 100%;margin-top: 0px;margin-bottom: 0px;">' +
	'		<div class="modal-content" style="display:flex;display:-webkit-flex;height: 100%;">' +
	'			<div class="modal-header" style="top: 0;position: fixed;width:700px;z-index:101;">' +
	'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        		<h4 class="modal-title" >ADL评分(<span>0</span>分)</h4>' +
	'      		</div>' +
	'      		<div class="modal-body" style="padding: 0 20px 50px 20px;overflow-y:auto;flex:1;-webkit-flex:1;margin-top:75px;">' +
	'      			<div class="js-div-barthelQuestionList">' +
	'      			</div>' +
	'      		</div>' +
	'      		<div class="modal-footer" style="position: fixed;bottom: 0;width: 700px;z-index: 100;background: #fff;left:0;">' +
	'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
	'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>' +
	'      		</div>' +
	'    	</div>' +
	'  	</div>' +
	'</div>';

/***********护士列表 begin*******************************/
var barthel_question_list_tpl =
	'<form class="form-horizontal js-form-barthel-question">' +
	'<table class="table">' +
	'{{each QAArry as item i}}' +
	'	<tr><td>' +
	'	<div class="js-question-item" id="{{item.id}}">' +
	'		<p class="js-label-question"  adlId="{{item.id}}" question="{{i}}"> {{i}}：</p>' +
	'		<ul class="cheap-select adl-assess">' +
	'			{{each item.answerList as answer j}}' +
	'				<li class="js-btn-barthel-answer" answer="{{answer.a}}" score="{{answer.score}}" option="{{answer.id}}"><em></em><span>{{answer.a}}</span></li>' +
	'			{{/each}}' +
//	'			<textarea class="form-control js-ipt-answerRemark" rows="1" placeholder="备注"></textarea>' +
	'		</div>' +
	'	</div>' +
	'	</td></tr>' +
	'{{/each}}' +
	'</table>' +
	'</form>';

var getBarthelQAHtml = function(data) {
	var render = template.compile(barthel_question_list_tpl);
	var html = render(data);
	return html;
}
/***********护士列表 end*********************************/

var G_OpenGradeBarthelWin = function(insureNO) {
	$("#js-modal-grade_barthel-win").remove();
	if($('#js-modal-grade_barthel-win').length > 0) {} else {
		$("body").append(grade_barthel_modal_html);
	}
	$('#js-modal-grade_barthel-win').modal('show');

	var winObj = $('#js-modal-grade_barthel-win');
	var barthelQADiv = $("#js-modal-grade_barthel-win .js-div-barthelQuestionList");
	var OKBtn = $("#js-modal-grade_barthel-win .js-btn-ok");

	var barthQA = {//eat-carry-face-toilet-water-walk-stair-wear-faec-pee
		"QAArry": {
			"1 进食：指用餐具将食物由容器送到口中、咀嚼、吞咽等过程": {
				"answerList": [{
					"a": "需极大帮助或完全依赖他人，或有留置营养管（0分）",
					"score": 0,
					'id':3,
				}, {
					"a": "需部分帮助（5分）",
					"score": 5,
					'id':2,
				}, {
					"a": "可独立进食（10分）",
					"score": 10,
					'id':1,
				}],
				"id": "eat"
			},
			"2 床椅双向转移": {
				"answerList": [{
					"a": "完全依赖他人（0分）",
					"score": 0,
					'id':4,
				}, {
					"a": "需极大帮助（5分）",
					"score": 5,
					'id':3,
				}, {
					"a": "需部分帮助（10分）",
					"score": 10,
					'id':2,
				}, {
					"a": "可独立完成（15分）",
					"score": 15,
					'id':1,
				}],
				"id": "carry"
			},
			"3 个人卫生：指洗脸、刷牙、梳头、刮脸等": {
				"answerList": [{
					"a": "需他人帮助（0分）",
					"score": 0,
					'id':2,
				}, {
					"a": "可自己独立完成（5分）",
					"score": 5,
					'id':1,
				}],
				"id": "face"
			},
			"4 如厕：包括去厕所、解开衣裤、擦净、整理衣裤、冲水": {
				"answerList": [{
					"a": "需极大帮助或完全依赖他人;（0分）",
					"score": 0,
					'id':3,
				}, {
					"a": "需部分帮助（需他人搀扶去厕所、需他人帮忙冲水或整理衣裤等）（5分）",
					"score": 5,
					'id':2,
				}, {
					"a": "可独立完成（10分）",
					"score": 10,
					'id':1,
				}],
				"id": "toilet"
			},
			"5 洗澡": {
				"answerList": [{
					"a": "在洗澡过程中需他人帮助（0分）",
					"score": 0,
					'id':2,
				}, {
					"a": "准备好洗澡水后，可自己独立完成洗澡过程（5分）",
					"score": 5,
					'id':1,
				}],
				"id": "water"
			},
			"6 平地行走（不能行走时使用轮椅）": {
				"answerList": [{
					"a": "使用轮椅需要帮助（0分）",
					"score": 0,
					'id':4,
				}, {
					"a": "使用轮椅独立完成（5分）",
					"score": 5,
					'id':3,
				}, {
					"a": "平地行走需要帮助（10分）",
					"score": 10,
					'id':2,
				}, {
					"a": "平地行走独立完成（15分）",
					"score": 15,
					'id':1,
				}],
				"id": "walk"
			},
			"7 上下楼梯": {
				"answerList": [{
					"a": "需极大帮助或完全依赖他人;（0分）",
					"score": 0,
					'id':3,
				}, {
					"a": "需部分帮助（5分）",
					"score": 5,
					'id':2,
				}, {
					"a": "可独立上下楼梯（10分）",
					"score": 10,
					'id':1,
				}],
				"id": "stair"
			},
			"8 穿衣：指穿脱衣服、系扣、拉拉链、穿脱鞋袜、系鞋带": {
				"answerList": [{
					"a": "需极大帮助或完全依赖他人（0分）",
					"score": 0,
					'id':3,
				}, {
					"a": "需部分帮助（能自己穿脱，但需他人帮助整理衣物、系扣/鞋带、拉拉链）（5分）",
					"score": 5,
					'id':2,
				}, {
					"a": "可自己独立完成（10分）",
					"score": 10,
					'id':1,
				}],
				"id": "wear"
			},
			"9 大便控制": {
				"answerList": [{
					"a": "完全失控（0分）",
					"score": 0,
					'id':3,
				}, {
					"a": "偶尔失控;（5分）",
					"score": 5,
					'id':2,
				}, {
					"a": "可控制大便;（10分）",
					"score": 10,
					'id':1,
				}],
				"id": "faec"
			},
			"10 小便控制": {
				"answerList": [{
					"a": "完全失控，或留置导尿管（0分）",
					"score": 0,
					'id':3,
				}, {
					"a": "偶尔失控;（5分）",
					"score": 5,
					'id':2,
				}, {
					"a": "可控制小便;（10分）",
					"score": 10,
					'id':1,
				}],
				"id": "pee"
			}
		}
	};
	var tableHtml = getBarthelQAHtml(barthQA);
	barthelQADiv.html(tableHtml);
	//计算分数
	var calScore = function() {
		var selectAnswers = $(".js-btn-barthel-answer.selected");
		var totalScore = 0;
		selectAnswers.each(function(index) {
			var score = parseInt($(this).attr("score"));
			totalScore += score;
		});
		return totalScore;
	}

	var gradeBarthelResult = function() {
		var gradeResult = {};
		var answerResult = {};
		$(".js-question-item").each(function(index) {
			var isSelect = $(this).find(".js-btn-barthel-answer.selected");
			var adlId = $(this).find(".js-label-question").attr("adlId");
			if(isSelect.length > 0) {
				var answer = $(this).find(".js-btn-barthel-answer.selected").attr("answer");
				var score = $(this).find(".js-btn-barthel-answer.selected").attr("score");
				var option = $(this).find(".js-btn-barthel-answer.selected").attr("option");
				var answerObj = {};
				answerObj["id"] = option;
				answerObj["answer"] = answer;
				answerObj["score"] = score;
				answerResult[adlId] = answerObj;
			}
		});
		gradeResult["answerResult"] = answerResult;
		gradeResult["totalScore"] = calScore();
		return gradeResult;
	}

	var checkForm = function() {
		var answers = $(".js-btn-barthel-answer.selected");
		var questions = $(".js-question-item");
		if(answers.length != questions.length) {
			Toast.error("请填写完整所有题目");
			return false;
		}
		return true;
	}

	barthelQADiv.on('click', '.js-btn-barthel-answer', function() {
		let ulNode=$(this).closest('ul');
		for(let i=0;i<ulNode.find('.js-btn-barthel-answer').length;i++){
			ulNode.find('.js-btn-barthel-answer').eq(i).removeClass('selected');
			$(this).addClass('selected');
		}
		$('#js-modal-grade_barthel-win .modal-title span').html(calScore());
	});

	var dtd = $.Deferred();
	OKBtn.off('click').on('click', function() {
		var param = gradeBarthelResult();
		param["insureNO"] = insureNO;
		param["isCommit"] = 2;
		param["score"] = calScore();
		if(!checkForm()) {
			return false;
		}
		console.log(param);
		doHttp(param, '/adminjson/SAASInsureADLAssess').then(function(data) {
			if(data && data.errorCode == 0 && data.body) {
				Toast.success("操作成功");
				var score = data.body.score;
				$(".js-adl-res").html("");
				dtd.resolve(score);

			}
		});
		winObj.modal('hide');
		OKBtn.unbind("click");
	});
	return dtd.promise();
}
/***********ADL评分  end******************************/