var CamID  = -1;  //此例程默认以第一个摄像头打开
var SupportFormat;    //设备支持的视频格式代号：1->MJPG; 2->YUY2 
var OpenFormat;      //打开格式：0->YUY；1->MJPG
var captureCount = 0;
var queryBase;
var video_flag=false;
function loadActiveX() {

    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
         //IE浏览器加载控件
        document.getElementById("ActiveXDivOne").innerHTML = "<OBJECT id=\"axCam_Ocx\"  classid=\"clsid:CE2D72F2-AD28-4013-A24B-C3F76C5A1944\" width=\"100%\" height=\"544px\" ></OBJECT>";
    }
    else {
        //其他浏览器加载控件
        document.getElementById("ActiveXDivOne").innerHTML = "<OBJECT id=\"axCam_Ocx\" type=\"application/x-camera\"  clsid=\"{CE2D72F2-AD28-4013-A24B-C3F76C5A1944}\"  width=\"100%\" height=\"544px\" ></OBJECT>";
     }
}
//开启摄像头
function StartVideo() 
{
    var i = axCam_Ocx.CAM_Open(0, 1, '3264', '2448');
}
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'); 
    var ctx = canvas.getContext('2d'); 
    var img = new Image; 
    img.src = url;
    img.crossOrigin = 'Anonymous'; 
    img.onload = function(){
	  var width = img.width;
	  var height = img.height;
	  // 按比例压缩2倍
	  var rate = (width<height ? width/height : height/width)/2;
	  canvas.width = width*rate; 
	  canvas.height = height*rate; 
	  ctx.drawImage(img,0,0,width,height,0,0,width*rate,height*rate); 
	  var dataURL = canvas.toDataURL(outputFormat || 'image/png'); 
	  callback.call(this, dataURL); 
	  canvas = null; 
    };
}
//获取设备;
function GetDevice() {

    var i = 0;
    if(typeof axCam_Ocx.GetDevCount !== "function"){
    	Toast.error('此功能需高拍仪和360浏览器配合使用，请检查');
    	return false;
    }
    var devCount = axCam_Ocx.GetDevCount();
    var obj = document.getElementById("DeviceName");
    
    for (i = 0; i < devCount; i++) 
    {
        var DevName = axCam_Ocx.GetDevFriendName(i);
        var objOption = document.createElement("option");
        objOption.text = DevName;
        objOption.value = i;
        obj.options.add(objOption);
    }
    if (devCount > 0) {

        CamID = axCam_Ocx.GetMainCameraID();   //获取主摄像头ID
        if (CamID < 0) {
            console.log("没有主头设备");
            obj.value = 0;
        }
        else {
            obj.value = CamID;
         }
    }  

    var FormatSum  = 0;  //设备支持的视频格式代号总和
    var scount  = axCam_Ocx.GetFormatCount(CamID);   //获取设备支持的视频格式数目
    for (var k = 0; k < scount; k++)
    {
            FormatSum = FormatSum + axCam_Ocx.GetFormatNumber(k);    //GetFormatNumber（）获取设备支持的视频格式代号
    }
               
    //判断视频格式代号总和的值
    switch(FormatSum)
    {
        case 1:   //（设备只支持MJPG格式）
            OpenFormat = 1 ;     //打开格式为MJPG
            SupportFormat = 1;
            break;
        case 2:   //（设备只支持YUY2格式）
            OpenFormat = 0 ;     //打开格式为YUY
            SupportFormat = 2;
            break;
        case 3:   //（设备支持MJPG与YUY2两种格式）
            OpenFormat = 1 ;     //默认打开格式为MJPG
            SupportFormat = 1;
            break;
    }

    GetDeviceResolution();  //获取分辨率
}
//获取分辨率
function GetDeviceResolution() 
{
    var i = 0;
    var resCount = axCam_Ocx.GetResolutionCount(CamID, SupportFormat); //获取设备支持的分辨率数目
    video_flag=true;//设备完好
    var obj = document.getElementById("Resolution");
    for (i = 0; i < resCount; i++) {
        var mResolution = axCam_Ocx.GetResolution(i);
        var objOption = document.createElement("option");
        objOption.text = mResolution;
        objOption.value = i;
        obj.options.add(objOption);
    }
    if (resCount > 0) obj.value = 0;
}
//setTimeout(function(){
//	
//},1000);
setTimeout(function(){
	StartVideo() ;//默认打开摄像头
	GetDevice();
},2000);
function SetCutType(){
	if ($("#autocut").prop('checked')) {
		axCam_Ocx.CusCrop(1);//手动裁切
//      axCam_Ocx.SetAutoCut(1);//自动裁切
    }
    if ($("#handlecut").prop('checked')) {
        axCam_Ocx.CusCrop(1);//手动裁切
    }
}
function orderManage_iframe_getphoto(setType){
	GetDevice();
	var order_newImg1,order_newImg2;
	var dtd = $.Deferred();
	var curr_type=setType;//inorder---newset
	axCam_Ocx.BestSize();
	axCam_Ocx.CusCrop(1);//手动裁切
	document.getElementById("camBox").style.visibility='visible';
	$('#camBox-mask').addClass('order-show');
	$('body').on('click','#cam-btn ul li:nth-child(1)',function(){
		document.getElementById("camBox").style.visibility='hidden';
		$('#camBox-mask').removeClass('order-show');
	});
	$('body').off('click','#cam-btn ul li:nth-child(2)').on('click','#cam-btn ul li:nth-child(2)',function(){
		Capture();//拍照
	});
	$('body').on('click','#cam-select ul li',function(){
		$(this).find('input').prop('checked','checked');
		SetCutType();
	});
	//抓图拍照
	function Capture() {
		captureCount = captureCount + 1;
	    var path = "D:\\Img_" + captureCount;
	    var suffix = ".jpg";
	    path = path + suffix;
		axCam_Ocx.CaptureImage(path);
		setTimeout(function(){
			var basestr= axCam_Ocx.GetBase64FromFile(path);
		    queryBase="data:image/png;base64," + basestr;
		    if(!$("#autocut").prop('checked')){//手环
		    	order_ajaxFileUpload(queryBase);
		    }else{
		    	convertImgToBase64(queryBase, function(base64Img){
		          // base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
		         order_ajaxFileUpload(base64Img);
		       });
		    }
		    
		},500);
	}
	function order_ajaxFileUpload(str) {//上传图片
		document.getElementById("camBox").style.visibility='hidden';
		$('#camBox-mask').removeClass('order-show');
		$('#cam-upload').addClass('order-show');
		$('#cam-upload-mask').addClass('order-show');
		if($('#camBox').css('visibility')!='hidden'){
			return false;
		}
		if(curr_type=='inorder'){
			$('#cam-upload-box p').html('正在上传识别...');
		}else{
			$('#cam-upload-box p').html('正在上传...');
		}
		let load_flag=false;
		let photo_time=setTimeout(function(){
    		if(!load_flag){
    			$('#cam-upload').removeClass('order-show');
				$('#cam-upload-mask').removeClass('order-show');
				Toast.error("上传失败，请重试");	
    		}
    	},15000);
    	let params={
    		base64: str,
    	}
    	if(curr_type=='inorder'){//上传--识别---新建
			params['needOCR']=1;
		}
	    $.ajax({
				type: 'post',
				url:  location.protocol+'//'+location.host+'/imageupload?type=signature',
				dataType: 'json',
				data:params,
				success: function(data){//imgUrl
					if(data.errCode==0){
						load_flag=true;
						clearTimeout(photo_time);
						$('#cam-upload').removeClass('order-show');
						$('#cam-upload-mask').removeClass('order-show');
						dtd.resolve(data);
						return dtd.promise();
					} else {
						$('#cam-upload').removeClass('order-show');
						$('#cam-upload-mask').removeClass('order-show');
						Toast.error("上传失败，请重试");
					}		
				},
				error: function(){
					$('#cam-upload').removeClass('order-show');
					$('#cam-upload-mask').removeClass('order-show');
					Toast.error("上传失败，请重试");		
				}
			})
	    	
	}
	function getImgInfo(imgId, imgUrl) {
		$('#cam-upload-box p').html('正在识别...');
		var params = {
			imgId : imgId,
			imgUrl: imgUrl,
		}
		let httpUtilObj = new HttpUtil();
		httpUtilObj.ajax({
			url: '/adminjson/OrgNORecognize ',
			params: params
		}).then((res)=>{
			$('#cam-upload').removeClass('order-show');
			$('#cam-upload-mask').removeClass('order-show');
			if(res.errorCode==0){
				var data={
					hospital:res.body.hospitalBra,
					img:order_newImg1
				};
				dtd.resolve(data);
				return dtd.promise();
			}
		},(res)=>{
			$('#cam-upload').removeClass('order-show');
			$('#cam-upload-mask').removeClass('order-show');
			Toast.error("图片识别失败");
		})
	}
	return dtd.promise();
}