<%@page import="com.yijianyi.util.DateUtil"%>
<%@page import="com.yijianyi.service.SmsService"%>
<%@page import="com.yijianyi.cache.RedisCacheKey"%>
<%@page import="com.yijianyi.common.Constant"%>
<%@page import="com.yijianyi.cache.RedisOperator"%>
<%@page import="com.yijianyi.util.StringUtil"%>
<%@page import="com.yijianyi.util.NetUtil"%>
<%@page import="com.google.gson.JsonArray"%>
<%@page import="com.google.gson.JsonObject"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<form action="?add">
</br>
</br>
手机号:<input type="text" name="phone">
<input type="submit" value="提交"></br>
</form>
<%
String phone = NetUtil.getStringParameter(request, "phone", "");
if(StringUtil.isNotEmpty(phone)){
	String code = "1234";
	long expireTime = System.currentTimeMillis() + 5 * 60 * 1000;
	RedisOperator.hset(RedisCacheKey.PK_VERIFYCODE + "_" + "Login", phone, code + "@" + expireTime);
	out.println("手机号：" + phone + ",验证码：" + code);
}else{
	out.println("请输入手机号");
}

%>