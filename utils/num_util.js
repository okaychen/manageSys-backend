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

module.exports = {
	zero_fill: zero_fill
};