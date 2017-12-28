//获取验证码
export const GET_SMS_CODE = '/json/GetSMSCode';
//登录
export const USER_LOGIN = '/json/Login';
//获取微信授权信息
export const GET_WX_OAUTH = '/json/GetWxOAuth';
//获取配置
export const GET_SETTING = '/json/GetSettings';
//获取医院
export const GET_ORG_LIST = '/json/GetOrgList';
//获取医院科室
export const GET_ORG_BRANCH = '/json/GetOrgAndBranch';
//获取病房和病床
export const GET_ROOM_AND_BED = '/json/GetRoomAndBed';
//获取订单时间
export const GET_ORDER_TIME = '/json/GetOrderTime';
//身份证识别
export const IDCARD_RECOGNIZE = '/json/IDCardRecognize';
//微信图片上传
export const UPLOAD_WX_IMAGE = '/json/GetImageToWx';
//添加亲属
export const ADD_FAMILY = '/json/AddKinsfolk';
//查询亲属列表（https://www.tapd.cn/20084501/markdown_wikis/view/#1120084501001000416）
export const GET_FAMILY_LIST = '/json/ListKinsfolk';
//获取亲属
export const GET_FAMILY = '/json/GetKinsfolk';
//修改亲属
export const UPD_FAMILY = '/json/UpdateKinsfolk';
//删除亲属（https://www.tapd.cn/20084501/markdown_wikis/view/#1120084501001000418）
export const DEL_FAMILY = '/json/DelKinsfolk';
//获取套餐（https://www.tapd.cn/20084501/markdown_wikis/view/#1120084501001000427）
export const GET_PRICE = '/json/GetPrice';
export const DOPAY_URL = "https://" + window.location.host + "/pay/doPay.jsp";
import {isApp,} from '../util/common.js';
import {Indicator,Toast} from 'mint-ui';
/**
 * 自定义http请求
 */
class Http {
  constructor() {
    //es6多次引入是引入引用，所以这里的xmlhttp也是单例的。不能应用多次请求
    this.xmlhttp = new XMLHttpRequest();
  }
  post(url, params) {
    let self = this;
    let xmlhttp = new XMLHttpRequest();
    //sid设置在cookie不生效，如果不为空的和重新设置在请求头
    let cookieSid = window.sid;
    if (window.location.hostname != 'localhost') {
      window.isPrd = true;
    }
    return new Promise((resolve, reject) => {
      var timer = setTimeout(() => { //请求500ms未结束显示indicator
        Indicator.open();
      }, 500);
      if (window.isPrd) { //线上环境
        //	        	console.log('线上环境');
        //这里this指向xmlhttp
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              clearTimeout(timer);
              Indicator.close();
              var temp = JSON.parse(xmlhttp.responseText);
              if (temp.errorCode == 0) {
                resolve(temp);
              } else if (temp.errorCode == 1) {
                Toast({
                  message: '用户未登录',
                  position: 'bottom',
                  duration: 2000
                });
                reject(temp);
              } else {
                if (temp.msg != '订单已过期') {
                  Toast({
                    message: temp.msg,
                    position: 'middle',
                    duration: 2000
                  });
                }
                reject(temp);
              }
            } else {
              Indicator.close();
              Toast({
                message: '加载错误',
                position: 'bottom',
                duration: 2000
              });
              reject();
            }
          }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        if (cookieSid && isApp) {
          xmlhttp.setRequestHeader("sid", decodeURIComponent(cookieSid));
        }
        xmlhttp.send(JSON.stringify(params));
      } else {
        console.log('测试环境'); //PsiMgsm%2B%2BpKOJsYFMkQvR1b9EGOCc7scw%2FHw6wUrNRQ%3D
        //V2FbpBDX5oqQwglCJkARPsoeyXeKP1aPA0rmYTT0sBs%3D
        //8Vwy80CBGfBanPyR5D%2FenIO0sSBkMVKoa6peAetArEc%3D
        //KTKJiPGpLN7%2FFX%2BwO9DOTjjDd6JE8SRbckq2%2Fyw3vNk%3D
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              clearTimeout(timer);
              Indicator.close();

              var temp = JSON.parse(xmlhttp.responseText);
              if (temp.errorCode == 0) {
                resolve(temp);
              } else if (temp.errorCode == 1) {
                //用户未登录
                Toast({
                  message: '用户未登录',
                  position: 'bottom',
                  duration: 5000
                });
                reject(temp);
              } else {
                if (temp.msg != '订单已过期') {
                  Toast({
                    message: temp.msg,
                    position: 'middle',
                    duration: 2000
                  });
                }
              }
            } else {
              Indicator.close();
              console.log('wr')
              Toast({
                message: '加载错误',
                position: 'bottom',
                duration: 5000
              });
              reject();
            }
          }
        };
        //	            xmlhttp.withCredentials = true;
        xmlhttp.open("POST", 'http://dev.1-1dr.com' + url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        xmlhttp.setRequestHeader("sid", decodeURIComponent("hsmahdY2iOHkwdIXeyh3SdAmiw6psI2bqoLubaFNVmk="));
        //xmlhttp.setRequestHeader("sid",decodeURIComponent(cookieSid));
        //ia7HyfJWXBbzh4JJbCENAVYfvYEEq9nLUDE/HlXdMAq2PNj+iorJx26bTD85PYGC
        //NnPd3LWCPlz%2FFX%2BwO9DOTjuQK7%2BYj6jUJvV%2BKyMe4dM%3D
        //IoNpjOHqbC4wkpqNtJWPk3b6CiO35U0SYgTLBdAEtTc=
        //22Q9cnME8lcQW6Rf3AqD%2BYN8O5gkjH8cb39n0%2B8NLIo%3D
        //QZNnyIB2l80OJERX3JPPOQ96DLtuhw94w%2FHw6wUrNRQ%3D
        //PsiMgsm%2B%2BpKOJsYFMkQvR1b9EGOCc7scw%2FHw6wUrNRQ%3D
        //ur4mMwYiSMrAkK5fwrlMQuatSzy%2Br3SQ0DOEBeFWCvA%3D
        //mlBl1bX%2BxFSQwglCJkARPg3vKuAFD0kTckq2%2Fyw3vNk%3D
        //dU0%2BJTQrAUuQwglCJkARPs%2Ft88CUHWh0wdhKCt9%2FfFM%3D
        //9ZbUD8avDXa65Qorx0aBMuQGyIr6JgZ5YgTLBdAEtTc=
        //epnpjuYJmgE9plGReqrtKjHLyd6IpU1Kw%2FHw6wUrNRQ%3D
        //uMCuHEsxhx49plGReqrtKklEHPgM20og0DOEBeFWCvA%3D
        //75KzTjQKwWE9plGReqrtKvb7T4VzT%2BJrA0rmYTT0sBs%3D
        xmlhttp.send(JSON.stringify(params));
      }
    });
  }

  paramToQuery(param) {
    let temp = [];
    for (let key in param) {
      temp.push(key, '=', param[key], '&');
    }
    return temp.slice(0, -1).join('');
  }
}

var http = new Http();
export default http;
