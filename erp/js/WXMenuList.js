window.onload = function() {
	/*
	 * $.post("getWXMenuList", { suggest : txt }, function(result) {
	 * 
	 * });
	 */
	$('.wx-content-submit').off('click').on('click',function(){
		let data;
		if($('.wx-content').val()){
			data={
				content:$('.wx-content').val(),
			}
		}else{
			Toast.error('提交内容不能为空！');
		}
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/SAASUpdateWXAutoReplay',
			params: data
		}).then((res)=>{
			Toast.success('操作成功！');
		})
	})
	var dataList = null;
	var arr = [];
	var brr = [];
	$.ajax({
		url : "/adminjson/SAASGetWXMenuList",
		async : false,
		success : function(data, status) {
			//旋转icon
			$('#ttt_head .ttt_item_tit.selected i.fa-refresh',parent.document).removeClass('refresh-rotation');
			//微信自动回复语
			if(data.body){
				$('.wx-content').text(data.body.autoReplay);
			}
			arr = data;
			brr = arr.body.menuList;
			// 遍历转化为数组的json字符串
			var html = "";
			for (var i=0;i<brr.length;i++){
				var menuId = brr[i].menuId;
				var menuName = brr[i].menuName;
				var menuType = brr[i].menuType;
				var menuMsg = '';
				if(menuType == 1) {
					menuMsg = brr[i].menuMsg;
				} else {
					menuMsg = brr[i].menuUrl;
				}
				
				html += '<tr>';
				if(i == 0) {
					html += '<td style="display:none" name="menuId">'+brr[i].menuId+'</td><td ><span onclick=showMenu('+menuId+',"'+menuName+'",' + menuType +',"' + menuMsg +'")>'+brr[i].menuName+'</span></td>'+
							'<td ><a href="#" onclick="addMenu('+menuId+')"><font color="blue">增加</td>'+
							'<td rowspan='+arr.body.total+'>'+
								'<div style="display:none" id="updateWXMenuInfo">'+
									'<input type="hidden" name="parentId" id="parentId" value="0" />'+
									'<input type="hidden" name="menuId" id="menuId" value="0" />'+
									'<input type="radio" value="2" name="menuType"/>链接&nbsp;&nbsp;&nbsp;'+
									'<input type="radio" value="1" name="menuType"/>内容&nbsp;&nbsp;&nbsp;<br>'+
									'菜单名称:<input type="text" name="menuName" id = "menuName" /><br>'+
									'菜单信息:<textarea name="menuMsg" rows="10" cols="20" id="menuMsg" ></textarea><br>'+
									'<input type="submit" value="提交" onclick="addWXMenu()">'+
								'</div>'+
							'</td>';
				} else {
					html += '<td style="display:none" name="menuId">'+brr[i].menuId+'</td><td ><span onclick=showMenu('+menuId+',"'+menuName+'",' + menuType +',"' + menuMsg +'")>'+brr[i].menuName+'</span></td>'+
							'<td ><a href="#" onclick="addMenu('+menuId+')"><font color="blue">增加</a></td>';
					if(brr[i].child.length == 0) {
						html += '<td><a href="#" onclick="delMenu('+menuId+')"><font color="blue">删除</a></td>';
					}
				}
				html += '</tr>';
				if(brr[i].child.length > 0) {
					for (var j = 0; j < brr[i].child.length; j++){
						var item = brr[i].child[j];
						var menuId = item.menuId;
						var menuName = item.menuName;
						var menuType = item.menuType;
						var menuMsg = '';
						if(menuType == 1) {
							menuMsg = item.menuMsg;
						} else {
							menuMsg = item.menuUrl;
						}
						html += '<tr>';
						html += '<td style="display:none" name="menuId">'+item.menuId+'</td>';
						html += '<td >&nbsp;&nbsp;&nbsp;●<span onclick=showMenu('+menuId + ',"' + menuName + '",' + menuType +',"' + menuMsg +'")>' + brr[i].child[j].menuName + '</span></td>';
						html += '<td><a href="#" onclick="delMenu('+menuId+')"><font color="blue">删除</a></td>';
						html += '</tr>';
					}
				}
			}
			html += '<tr><td colspan="4">'+JSON.stringify(arr.body.wxJson)+'</td></tr>'
			html += '<tr><td colspan="4"><a href="#" onclick="updateToWX()"><font color="blue">同步到微信</a></td></tr>'
			$("#WXMenuBody").html(html);
		}
	});
}

function updateToWX() {
	$.ajax({
		type: "post",
		url:"/adminjson/SAASUpdateMenuToWX",
		async : false,
		success : function(data, status){
			//var xx = JSON.parse(data);
			var xx = data
			if(xx.errorCode == 0) {
				alert("同步成功");
			} else {
				alert(xx.msg);
			}
		}
	});
}

// 增加菜单按钮的点击事件
function addMenu(menuId){
	$('#menuId').val(0);
	$('#parentId').val(menuId);
	$("input:radio[name=menuType]").attr("checked",false);
	$('#menuName').val("");
	$('#menuMsg').val("");
	$('#updateWXMenuInfo').show();
}

// 删除菜单按钮的点击事件
function delMenu(menuId){
	var data = {};
	data.menuId = menuId;
	var box = bootbox.confirm({
		title : "系统提示",
		message : "删除后将不可恢复，请确认？",
		buttons : {
			confirm : {
				label : '确定',
				className : 'btn-success js-btn-focus'
			},
			cancel : {
				label : '取消',
				className : 'btn-danger'
			}
		},
		callback : function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					type: "post",
					dataType: "json",
					data : JSON.stringify(data),
					url:"/adminjson/SAASDelWXMenu",
					async : false,
					success : function(data, status){
						if(data.errorCode == 0) {
							$('#updateWXMenuInfo').hide();
							window.onload();
						} else {
							alert(data.msg);
						}
					}
				});
			}
		}
	});
	
}

// 菜单按钮的点击事件
function showMenu(menuId, menuName, menuType, menuMsg){
	$('#menuId').val(menuId);
	$('#parentId').val(0);
	$(":radio[name='menuType'][value='" + menuType + "']").prop("checked", "checked");
	$('#menuName').val(menuName);
	$('#menuMsg').val(menuMsg);
	$('#updateWXMenuInfo').show();
}

//点击form表单中的提交按钮时,出发的ajax同步请求
function addWXMenu(){
	var menuId = $('#menuId').val();
	var parentId = $('#parentId').val();
	var menuType = $("input[name='menuType']:checked").val();
	var menuName = $('#menuName').val();
	var menuMsg = $('#menuMsg').val();
	var data = {};
	data.menuId = menuId;
	data.parentId = parentId;
	data.menuType = menuType;
	data.menuName = menuName;
	data.menuMsg = menuMsg;
	console.log(data);
	$.ajax({
		type: "post",
		dataType: "json",
		data : JSON.stringify(data),
		url:"/adminjson/SAASAddOrUpdateWXMenu",
		async : false,
		success : function(data, status){
			if(data.errorCode == 0) {
				$('#updateWXMenuInfo').hide();
				window.onload();
			} else {
				alert(data.msg);
			}
		}
	});
}


