<%@page import="com.yijianyi.busi.hg.service.HGService"%>
<%@page import="com.yijianyi.protocol.SaasModelPROTO.Company"%>
<%@page import="com.yijianyi.util.JsonUtil"%>
<%@page import="com.google.gson.JsonElement"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.yijianyi.util.CookieUtil"%>
<%@page import="com.yijianyi.bo.SidInfo"%>
<%@page import="com.yijianyi.common.SIDMgr"%>
<%@page import="com.yijianyi.util.db.DBRow"%>
<%@page import="com.yijianyi.util.NetUtil"%>
<%@page import="com.yijianyi.util.StringUtil"%>
<%@page import="com.yijianyi.saas.service.CompanyService"%>
<%@page import="com.google.gson.JsonArray"%>
<%@page import="com.google.gson.JsonObject"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
long companyId = NetUtil.getIntParameter(request, "companyId");
List<Company> cList = CompanyService.getCompanyList(1, 1000, null);
JsonArray staffList = HGService.getHGInfoListByCompanyId("", companyId, 0, null, 0, 0, 0, 1, 100);

long hgId = NetUtil.getLongParameter(request, "hgId");
if(hgId > 0) {
	String sid =SIDMgr.genMgrSid(hgId);
	CookieUtil.setCookie(response, "mgrSid", URLEncoder.encode(sid));
}
%>
<form>

<%
if(cList != null && cList.size()>0){
%>
<select name="companyId">
<%
for(Company storeInfo : cList){
	String selected = (companyId == storeInfo.getId() )?"selected":"";
%>
	<option <%=selected%> value="<%=storeInfo.getId()%>"><%=storeInfo.getCompanyName()%></option>
<%}%>
</select>
<%}%>

<%
if(staffList != null && staffList.size()>0){
%>
<select name="hgId">
<%
for(JsonElement e : staffList){
	JsonObject json = (JsonObject)e;
%>
	<option value="<%=JsonUtil.getInt(json, "id")%>"><%=JsonUtil.get(json, "fullName")%></option>
<%}%>
</select>
<%}%>

<input type="submit" value="提交"></br>
</form>
</br></br>

<a href="https://dev.1-1dr.com/erp/index.html" target="_blank">测试环境</a>
<br><br><br><br>
<a href="https://www.1-1dr.com/erp/index.html" target="_blank">正式环境</a>
