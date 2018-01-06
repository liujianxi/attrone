/**
 * 角色管理页面
 */
$(document).ready(
		function() {
			loadRoleList(1);
			// 绑定事件
			$('.js-btn-showAddRolePanel').on('click', function() {
				top.importOnceJS('js-script-role', "js/app/rp/role.js");
				top.G_Fun_showAddRolePanel().then(function(data) {
					loadRoleList(1);
				});
			});
			$('#roleListTable').on('click', '.js-btn-delRole', function() {
				var roleId = $(this).attr("roleId");
				delRole(roleId);
			});
			$('#roleListTable').on('click', '.js-btn-loadRoleList', function() {
				loadRoleList(1);
			});
			$('#roleListTable').on('click', '.js-btn-getRole', function() {
				var roleId = $(this).attr("roleId");
				roleIds = roleId;
				getroleModal.show();
				loadRoleList2(roleId, 1);
				$("#add_role_id").val(roleId);
				paginationInit2 = false;
			});
			var roleIds = 0; 
			var pageNo = 0;
			var pageSize = 10;
			var pageNo2 = 0;
			var pageSize2 = 10;
			var paginationInit = false;
			var paginationInit2 = false;

			// 右侧面板
			var getroleModal = new ModalPanel("#getrole_panel");

			// 实例化请求帮助类
			var httpUtilObj = new HttpUtil();

			var delRole = function(id) {
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
							G_RoleModule.delRole(id).then(function(result) {
								if (result.errorCode == 0) {
									Toast.success("删除角色成功");
									loadRoleList(1);
								}
							});
						}
					}
				});
				box.one("shown.bs.modal", function() {
					box.find(".js-btn-focus").focus();
				});
			}

			// 删除角色
			$('#hgListTable').on('click', '.js-btn-delRoleByhg', function() {

				var roleId = $("#add_role_id").val();
				var hgId = $(this).attr("hgId");
				params = {
					roleId : roleId,
					hgId : hgId
				}
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
							httpUtilObj.ajax({
								url : '/adminjson/SAASDelHGRole',
								type : "POST",
								dataType : 'json',
								params : params
							}).then(function(rsult) {
								if (rsult.errorCode == 0) {
									// 初始化数据...
									loadRoleList2(roleId, pageNo2);
								}
							});
						}
					}
				});

			});

			// 初始化分页控件
			function initPagination(nowPage, count) {
				// 如果记录条目为0则隐藏分页控件
				if (count == 0) {
					$("#pagination").hide();
				} else {
					$("#pagination").show();
				}
				$("#pagination").pagination(count, {
					'items_per_page' : pageSize,
					'num_display_entries' : 5,
					'num_edge_entries' : 1,
					'prev_text' : "上一页",
					'next_text' : "下一页",
					'callback' : function(page_index) {
						console.log("callback:" + page_index + "::" + nowPage);
						if (paginationInit) {
							loadRoleList(page_index + 1);
						} else {
							paginationInit = true;
						}

					},
					'current_page' : (nowPage <= 1) ? 0 : (nowPage - 1)
				});
			}

			// 机构数据加载
			function loadRoleList(pageNo) {
				return G_orgModule.getRoleListData(pageNo, pageSize).then(
						function(data) {
							// 刷新列表
							refreshRoleList(data.body);
							// 初始化分页控件
							if (!paginationInit) {
								initPagination(0, data.body.count);
							}
						});
			}

			// 刷新机构列表
			function refreshRoleList(data) {
				var roleListHtml = template('roleListTemplate', data);
				$("#roleListContent").empty().html(roleListHtml);
			}

			// -----------------------右侧面板分页---------------------

			// 初始化分页控件
			function initPagination2(nowPage, count) {
				// 如果记录条目为0则隐藏分页控件
				if (count == 0) {
					$("#pagination2").hide();
				} else {
					$("#pagination2").show();
				}
				$("#pagination2").pagination(count, {
					'items_per_page' : pageSize,
					'num_display_entries' : 5,
					'num_edge_entries' : 1,
					'prev_text' : "上一页",
					'next_text' : "下一页",
					'callback' : function(page_index) {
						console.log("callback:" + page_index + "::" + nowPage);
						if (paginationInit2) {
							loadRoleList2(roleIds,page_index + 1);
						} else {
							paginationInit2 = true;
						}

					},
					'current_page' : (nowPage <= 1) ? 0 : (nowPage - 1)
				});
			}

			// 机构数据加载
			function loadRoleList2(roleId, pageNo2) {
				return G_orgModule.getRoleListData2(roleId, pageNo2, pageSize2)
						.then(function(data) {
							// 刷新列表
							refreshRoleList2(data.body);
							// 初始化分页控件
							if (!paginationInit2) {
								initPagination2(0, data.body.count);
							}
						});
			}

			// 刷新机构列表
			function refreshRoleList2(data) {

				var getHgListByIdHtml = template('hgListTemplate', {
					"hg" : data.hgList
				});
				$("#hgListContent").empty().html(getHgListByIdHtml);
			}

		});