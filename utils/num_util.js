function zero_fill(num, len) {
	num = parseInt(num);
	let max = Math.pow(10, len - 1);
	if (num > max) {
		return num;
	} else {
		let str = '000000000' + num;
		return str.substring(str.length - len);
	}
}

function getTimeOut(ts) {
	let curr_time = Date.parse(new Date()) / 1000; //当前的时间戳
	let surplus_time = 86400 - (curr_time - parseInt(ts));
	if (surplus_time < 0) {
		return false;
	} else { //处理成时间字符串
		let time_h = zero_fill(parseInt(surplus_time / 3600), 2);
		let time_m = zero_fill(parseInt((surplus_time % 3600) / 60), 2);
		let time_s = zero_fill(parseInt((surplus_time % 60)), 2);
		return time_h + ':' + time_m + ':' + time_s;
	}
	
}

module.exports = {
	zero_fill: zero_fill,
	getTimeOut: getTimeOut
};