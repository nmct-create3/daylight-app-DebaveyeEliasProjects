
const showResult = function(json) {
	console.log(json);
	let sunrise = json.city.sunrise + json.city.timezone;
	let sunset = json.city.sunset + json.city.timezone;
	let date = new Date();
	let time1 = date.getTime()/1000;

	let time =(time1 *1000)+ json.city.timezone;
	let percentage = 100 -((sunset - sunrise)/time)*100;
	console.error(percentage)
	let perc = ((sunset - sunrise)/time)*100
	console.error(perc)
	console.log(sunrise);
	console.log(sunset);
	console.log(time);
	document.querySelector(`.js-sun`).style.bottom = `${perc}%`;
	document.querySelector(`.js-sun`).style.left =  `${percentage}%`;
	let time2 = convertTImne(((date.getTime())/1000)+ json.city.timezone);
	document.querySelector(`.js-sun`).setAttribute("data-time",time2);
	document.querySelector(".js-sunrise").innerHTML = convertTImne(sunrise);
	document.querySelector(".js-sunset").innerHTML = convertTImne(sunset);
	let dateSunset = toDate(sunset);
	let dateSunrise = toDate(sunrise);
	if(date.getTime() > dateSunset.getTime() && date.getTime() > dateSunrise.getTime()){
		document.querySelector(".is-day").classList.add("is-night");
	}
	else{
		document.querySelector(".is-day").classList.remove("is-night");
	}
};

const toDate = function(millis){
	return new Date(millis * 1000);
}

const convertTImne = function(millis){
	let d = new Date(millis*1000);
	hours = format_two_digits(d.getUTCHours());
    minutes = format_two_digits(d.getUTCMinutes());
    seconds = format_two_digits(d.getSeconds());
    return hours + ":" + minutes;
}
const format_two_digits = function(n) {
    return n < 10 ? '0' + n : n;
}

let getAPI = (lat, lon) => {

	let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5c52657d3beb0a23dfe758162c224a9c&units=metric&lang=nl&cnt=1`;
    const endpoint = url;
    fetch(endpoint).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        showResult(json);
    }).catch(function(error) {
        console.error('An error occured, we handled it.', error);
    });
};

document.addEventListener('DOMContentLoaded', function() {
	getAPI(40.730610,-73.935242);
});
