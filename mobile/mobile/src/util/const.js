export const APP_CONSTANT = {
	//高德地图KEY
	AMAP_KEY : '76995f30ba8965c259c624c3a3fa5777',
	BANNER_LIST : [
		'http://s.1-1dr.com/f/banner/44/96/257900031556714496.jpg',
		'http://s.1-1dr.com/f/banner/32/64/257899445054603264.jpg']
}

//常亮配置： 不需要校验手机号的页面跳转
export const NO_CHECK_PHONE = [
	'index',
	'login',
	'agreement'
];

//app上不校验登陆的页面(只有协议页会出现app没有登录)
export const APP_NO_CHECK_LOGIN = [
	'longprotectintro',
	'agreement',
	'newsList01',
	'newsList02',
	'newsList03'
];