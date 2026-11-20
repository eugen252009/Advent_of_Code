Array.prototype.flip = function(n = 2) {
	console.log(this);
	const width = this.length / n;
	const res = [];
	for (let index = 0; index < this.length; index++) {
		for (let index1 = 0; index1 < width; index1++) {
			const element1 = this[index];
			res.push(element1);
		}
	}
	return res;
};
