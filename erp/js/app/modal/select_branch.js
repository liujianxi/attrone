
/***********选择机构 begin******************************/

var selectbranch_modal_html = '<div class="modal fade" id="js-modal-selectbranch-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >选择科室</h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'      			<div class="ms-container">'+
'      				<div class="ms-selection" style="float:left;width:35%">'+
'						<div class="title"><span>选择医院</span></div>'+
'						<div class="body">'+
'      						<ul class="ms-list js-modal-orgListGroup">'+
'      						</ul>'+
'      					</div>'+
'      				</div>'+

'      				<div class="ms-selection" style="float:left;widhth:30%">'+
'						<div class="title"><span>选择科室</span></div>'+
'						<div class="body">'+
'      						<ul class="ms-list js-modal-branchListGroup">'+
'      						</ul>'+
'      					</div>'+
'      				</div>'+
'      				<div class="ms-selection" style="float:left;width:25px;height:100%;background: transparent url(\'images/switch.png\') no-repeat 50% 50%;">&nbsp;'+
'						<div class="body">'+
'      					</div>'+
'      				</div>'+
'      				<div class="ms-selection" style="float:left;widhth:30%">'+
'						<div class="title"><span>已选科室</span></div>'+
'						<div class="body">'+
'      						<ul class="ms-list js-modal-selectBranchListGroup">'+
'      						</ul>'+
'      					</div>'+
'      				</div>'+
'      			</div>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

var G_OpenSelectBranchWin = function(phone){
	if($('#js-modal-selectbranch-win').length > 0 ){
	}else{
		$("body").append(selectbranch_modal_html);
	}
	$('#js-modal-selectbranch-win').modal('show');
	
	var orgListGroup = $("#js-modal-selectbranch-win .js-modal-orgListGroup");
	var branchListGroup = $("#js-modal-selectbranch-win .js-modal-branchListGroup");
	var selectBranchListGroup = $("#js-modal-selectbranch-win .js-modal-selectBranchListGroup");
	var OKBtn = $("#js-modal-selectbranch-win .js-btn-ok");
	var $list = $("#js-modal-selectbranch-win .js-btn-ok");
	
	var lastMovedDom = false;
	$(".ms-list").on('mousemove',"li", function(){
		if (lastMovedDom === this) return;
		lastMovedDom = this;
		var elems = $(".ms-list li");
		elems.on('mouseenter', function(){
			elems.removeClass('ms-hover');
			$(this).addClass('ms-hover');
		});
		console.log("mousemove " + $(this).html());
     })
	
	
	var orgList;
	var getBranchList = function(orgId){
		var branchList;
		$.each(orgList, function(i,org){
			if(org.id == orgId){
				branchList = org.branchList;
				return false;
			}
		});
		return branchList;
	}
	var getSelectBranchObj = function(){
		var branchArray = [];
		$.each(selectBranchListGroup.find("li"),function(){
			var obj = {};
			obj['branchId'] = $(this).attr('branchId');
			obj['branchName'] = $(this).html();
			branchArray.push(obj);
		});
		return branchArray;
	}
	
	var fillOrgListGroup = function(orgList){
		orgListGroup.html('');
		$.each(orgList, function(i,org){
			orgListGroup.append('<li class="ms-elem-selection" orgId="' + org.id + '"><span>' + org.orgName + '</span></li>');
		});
	}
	var fillBranchListGroup = function(branchList){
		branchListGroup.html('');
		selectBranchListGroup.html('');
		$.each(branchList, function(i,branch){
			branchListGroup.append('<li class="ms-elem-selection" branchId="' + branch.id + '"><span>' + branch.branchName + '</span></li>');
		});
	}
	
	orgListGroup.on('click','li',function(){
		var orgId = $(this).attr("orgId");
		var branchList = getBranchList(orgId);
		//console.log("branchList" + JSON.stringify(branchList));
		fillBranchListGroup(branchList);
	});

	branchListGroup.on('click','li',function(){
		selectBranchListGroup.append($(this));
	});
	selectBranchListGroup.on('click','li',function(){
		branchListGroup.append($(this));
	});
	
	G_orgModule.getOrgListData().then(function(data){
		if(data && (data.errorCode == 0) && data.body && data.body.orgBranchList){
			orgList = data.body.orgBranchList;
			//console.log(JSON.stringify(orgList));
			fillOrgListGroup(orgList);
		}
	});
	
	var dtd = $.Deferred();
	OKBtn.on('click',function(){
		var data = getSelectBranchObj();
		if(!data.length){
			Toast.error("请先选择科室");
			return false;
		}
		dtd.resolve(data);
		$('#js-modal-selectbranch-win').modal('hide');
	});
	return dtd.promise();
}
/***********选择机构 end******************************/