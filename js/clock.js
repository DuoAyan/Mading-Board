// Clock
const clockElement = document.getElementById('clock');
function updateClock() {
	const jam = moment().startOf('minute').add(moment().second(), 'seconds').format('HH:mm:ss DD MMM YYYY');
	clockElement.textContent = jam;
}
updateClock();
setInterval(updateClock, 1000);