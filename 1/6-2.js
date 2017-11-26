<script>
    wx.ready(function () {
        //自动执行的
        wx.checkJsApi({
            jsApiList: [
                'chooseImage',
            ],
            success: function (res) {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res.checkResult.getLocation));
                // if (res.checkResult.getLocation == false) {
                    // alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    // return;
                // }
            }
        });
    });
    wx.error(function (res) {
        alert(res.errMsg);
    });
 function chooseImg_Opinion() {
                wx.chooseImage({
                    success: function (res) {
                        showImgs_Opinion(res);
                    }
                });
            }
 function showImgs_Opinion(res) {
//主要是这一块的代码
     var parent = document.getElementById('photo');
     var div = document.createElement("div");
    //设置 div 属性，如 id
    div.setAttribute("id", "imgDiv");
     var _html="";
    for(var i in res.localIds){
           var photoSrc=res.localIds[i];
           _html=_html+'
图片'+i+':<img src="'+photoSrc+'" height="200" width="200" />\n';
    }
　　div.innerHTML = _html;
　　parent.appendChild(div);
 </script>

