const showResult = function(json) {
	//millisecondjes krijgen EN timezone toepassen
	let sunriseMillis = json.city.sunrise * 1000;
	let sunsetMillis = json.city.sunset * 1000;
	let currentDateMillis = new Date().getTime();

	//Dates waarmee we gaan werken
	let sunriseDate = new Date(sunriseMillis);
	let sunsetDate = new Date(sunsetMillis);
	let currentTime = new Date(currentDateMillis);
	

	//Minutekes calculeren
	let sunsetMinutes = toMinutes(sunsetDate) + json.city.timezone;
	let sunriseMinutes = toMinutes(sunriseDate)+ json.city.timezone;
	let currentMinutes = toMinutes(currentTime)+ json.city.timezone;

	//Calculating percentage
	let percentage2 = Math.round(((currentMinutes - sunriseMinutes)/(sunsetMinutes - sunriseMinutes))*100);
	let timeOfDayLeft = sunsetMinutes - currentMinutes;
	let sunriseString = `${sunriseDate.getHours()}:${doMinutesThingy(sunriseDate.getMinutes())}`;
	let sunsetString = `${sunsetDate.getHours()}:${doMinutesThingy(sunsetDate.getMinutes())}`;
	let currentString = `${currentTime.getHours()}:${doMinutesThingy(currentTime.getMinutes())}`;

	//showing time
	document.querySelector(`.js-sunrise`).innerHTML = sunriseString;
	document.querySelector(`.js-sunset`).innerHTML = sunsetString;
	document.querySelector(`.js-sun`).setAttribute(`data-time`, currentString);
	document.querySelector(`.js-time-left`).innerHTML = timeOfDayLeft + " ";
	document.querySelector(`.js-sun`).style.bottom = `${percentage2}%`;
	document.querySelector(`.js-sun`).style.left = `${percentage2}%`;
	document.querySelector(`.js-location`).innerHTML = `${json.city.name}, ${json.city.country}`

	







};

const toMinutes = function(date) {
	let mins = 0
	for ( let i = 0; i < date.getHours(); i++){
		mins += 60;
	}
	mins += date.getMinutes();
	return mins;

};

const toDate = function(millis){
	return new Date(millis * 1000);
}

const doMinutesThingy = function(n) {
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
	getAPI(50.819478,3.257726);
});
