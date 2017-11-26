export function textFilter(text){
	return decodeURIComponent(text);
}
export function timeFilter(date){
	let that = new Date(date*1000);	
	let year=that.getFullYear();
	let month=that.getMonth();
	let day=that.getDate();
	return year+'-'+month+'-'+day;
}