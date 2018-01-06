/**
 * banner管理模块
 */
//banner管理模块的数据对象
var information = {
	infoList : [],	//banner数据列表
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1 //当前页，默认为1
	}
};

var httpUtilObj = new HttpUtil();
$(document).ready(function(){
	
	loadInfoList(true,1);
	/**
	 * 私有常量集合
	 */
	
	//将加载数据的方法绑定到公共对象
	information.ajaxFileUpload = ajaxFileUpload;
	
	//将加载数据的方法绑定到公共对象
	var addInfoModal = new ModalPanel("#addInfo_panel");
	var showInfoModal = new ModalPanel("#showInfo_panel");
	


	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage,count){
//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count == 0){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		$("#pagination").pagination(count, {
            'items_per_page'      : information.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(information.paginationParam.pageNo != page_index){
            		//重新赋值当前页数
            		information.paginationParam.pageNo = page_index;
            		//重新载入数据
            		loadInfoList(false);
            	}
            },
            'current_page'        : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	/**
	 * banner数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */

	function loadInfoList(isAll){
		
		
		//收集查询控件的参数值
		information.searchParam = {
			pageNo : information.paginationParam.pageNo,	//请求页
			pageSize : information.paginationParam.pageSize	//每页记录数
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url :'/adminjson/SAASGetInformationList',
			params : information.searchParam
		}).then(function(data){
			//刷新列表
			refreshInfoList(data.body);
			
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * 查看机构数据
	 * @param {Object} id
	 */
	
	$('body').on('click','#showEditInfo',function(){
		var id = $(this).attr("infoId");
		showInfoModal.show();
		loadInfo(id);
		$("#edit_info_id").val(id);
	});
	//新增--bannerUpload上传图片
	$('input[name=bannerUpload]').off('click').on('click',function(){
		uploadImg($('input[name=bannerUpload]'),'show').then((data)=>{
			$('#info_imgUrl_add').attr({
	    		'src':data.imgUrl,
	    		'imgid':data.imageId,
	    	})
		})
	})
	//edit--bannerUpload上传图片
	$('input[name=editBannerUpload]').off('click').on('click',function(){
		uploadImg($('input[name=editBannerUpload]'),'show').then((data)=>{
			$('#info_imgUrl_edit').attr({
	    		'src':data.imgUrl,
	    		'imgid':data.imageId,
	    	})
		})
	})
	/**
	 * 刷新资讯列表
	 * @param {Object} data
	 */
	function refreshInfoList(data){
		var infoListHtml = template('infoListTemplate',data);
		$("#infoListContent").empty().html(infoListHtml);
	}
	
	/**
	 * banner编辑
	 */
	$('#editInfoBtn').on('click',function(){
		//收集数据
		var id = $("#edit_info_id").val();
		console.log("id"+id);
		var param = {
				id : id,
			title : $("#showInfo_mainheading").val(),
			sketch : $("#showInfo_subheading").val(),
			desc : $("#showInfo_desc").val(),
			url : $("#showInfo_url").val(),
			imgId	 : $("#info_imgId_edit").val(),
		};
		console.log($("#showInfo_mainheading").val());
		//发送请求
		httpUtilObj.ajax({
			url : '/adminjson/SAASUpdateInformation', 
			params : param
		}).then(function(result){
//			console.info('success:'+JSON.stringify(result));
			if(result.errorCode == 0){
				$.toast({
				    heading: '系统消息',
				    text: '操作成功！',
				    position: 'top-right',
				    icon: 'success',
				    loaderBg: '#9EC600',
				    stack: false
				});
				showInfoModal.hide();
				loadInfoList(true,1);
			}
		});
	});
	
	
	/**
	 * 资讯数据删除
	 * @param {Object} id
	 */
	
	$('body').on('click','#delInfo',function(){
		var id = $(this).attr("infoId");
		var box = bootbox.confirm({
			title: "系统提示",
			message: "删除后将不可恢复，请确认？",
			buttons: {
				confirm: {
					label: '确定',
					className: 'btn-success js-btn-focus'
				},
				cancel: {
					label: '取消',
					className: 'btn-danger'
				}
			},
			callback: function(isConfirm) {
				if(isConfirm) {
					httpUtilObj.ajax({
						url : '/adminjson/SAASDelInformation',
						params : {id : id}
					}).then(function(result){
						if(result.errorCode == 0){
						$.toast({
						    heading: '系统消息',
						    text: '操作成功！',
						    position: 'top-right',
						    icon: 'success',
						    loaderBg: '#9EC600',
						    stack: false
						});
						loadInfoList(true,1);
						}
					});
				}
			}
		});

	});
	
	
	/**
	 * 资讯数据回显
	 * @param {Object} id
	 */
	function loadInfo(id){
		//发送请求
		httpUtilObj.ajax({
			url : '/adminjson/SAASGetInformationList',
			params : {id : id}
		}).then(function(result){
			var data = result.body.info;
			if(result.errorCode == 0){
				$("#showInfo_mainheading").val(data.title);
				$("#showInfo_subheading").val(data.sketch);
				$("#addInfo_createTime").val(data.createTime);
				$("#info_imgUrl_edit").attr("src", data.imgUrl);
				$("#info_imgId_edit").val(data.imgId);
				$("#showInfo_url").val(data.url);
				$("#showInfo_desc").val(data.description);
			}
		});
	}
	
	
	//显示新增资讯面板按钮
	$("#showAddInfoBtn").click(function(){
		addInfoModal.show();	
		$("#file1").val('');
//		panelLoadData('addBanner_panel');
//		initBannerLevel('addBanner_panel');
	});
	
	//执行新增资讯
	$("#addInfoBtn").click(function(){
		//收集数据
		var param = {
			title : $("#addInfo_mianheading").val(),
			sketch : $("#addInfo_subheading").val(),
			desc : $("#addInfo_desc").val(),
			url : $("#addInfo_url").val(),
			imgId	 : $("#info_imgUrl_add").attr('imgid'),
		};
	
		//发送请求
		httpUtilObj.ajax({
			url : '/adminjson/SAASAddInformation', 
			params : param
		}).then(function(result){
			if(result.errorCode == 0){
				$.toast({
				    heading: '系统消息',
				    text: '操作成功！',
				    position: 'top-right',
				    icon: 'success',
				    loaderBg: '#9EC600',
				    stack: false
				});
				addInfoModal.hide();
				loadInfoList(true,1);
			}
		});
	});
	
});
