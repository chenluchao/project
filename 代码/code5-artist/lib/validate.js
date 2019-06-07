function checkMobile(str) {
  var re = /^1\d{10}$/;
  return re.test(str);
}

function checkCode(str) {
  var re = /^\d{4}$/;
  return re.test(str);
}

function checkStringLength(str, min, max) {
  return str.length >= min && str.length <= max;
}


module.exports = {
	checkMobile: checkMobile,
	checkStringLength: checkStringLength
}