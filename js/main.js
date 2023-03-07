document.addEventListener('DOMContentLoaded', function() {
	// Clock
	function updateClock() {
		var timezone = "Asia/Jakarta";
		var jam = moment().tz(timezone);
		const clockElement = document.getElementById('clock');
		var timeString = jam.format("MMM D, YYYY HH:mm:ss");
		clockElement.textContent = jam;
		document.getElementById("clock").innerHTML = timeString;
		setInterval(updateClock, 1000);
	}
	updateClock();

	// Navigation Bar
	const appsButton = document.querySelector('#apps');
	const settingsButton = document.querySelector('#settings');
	const appContainerSection = document.querySelector('.app-container');
	const settingsSection = document.querySelector('.apps-settings');

	appsButton.addEventListener('click', () => {
  		appContainerSection.classList.remove('hidden');
  		settingsSection.classList.add('hidden');
	});

	settingsButton.addEventListener('click', () => {
 	 	appContainerSection.classList.add('hidden');
  		settingsSection.classList.remove('hidden');
	});

	// Change Background Color
	const input = document.querySelector('#background-color-input');
	const body = document.getElementsByTagName('body')[0];
	const applyButton = document.querySelector('#apply-btn');
	const savedBackgroundColor = localStorage.getItem('backgroundColor');

	if (savedBackgroundColor) {
  		body.style.backgroundColor = savedBackgroundColor;
	}

	applyButton.addEventListener('click', function(event) {
		event.preventDefault();
 	 	body.style.backgroundColor = input.value;
		localStorage.setItem('backgroundColor', input.value);
	});

	const resetButton = document.querySelector('#reset-btn');

	resetButton.addEventListener('click', function(event) {
	  event.preventDefault();
	  body.style.backgroundColor = '';
	  localStorage.removeItem('backgroundColor');
	});

	// Color picker
	const colorPickerButton = document.getElementById('color-picker-button');
	const colorPicker = document.getElementById('color-picker');
	const canvas = document.getElementById('color-canvas');
	const context = canvas.getContext('2d');

	let selectedColor = null;

	colorPickerButton.addEventListener('click', function(event) {
		event.preventDefault();
		colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
	});

	canvas.addEventListener('click', function(event) {
		event.preventDefault();
		colorPicker.style.display = 'none';
  		if (selectedColor) {
			input.value = selectedColor;
		}
	});

	const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	for (let angle = 0; angle < 360; angle += 1) {
  		gradient.addColorStop(angle / 360, `hsl(${angle}, 100%, 50%)`);
	}
	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);


	function getColorAtPoint(x, y) {
  		const imageData = context.getImageData(x, y, 1, 1);
  		const rgba = imageData.data;
  		return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
	}

	canvas.addEventListener('mousemove', (event) => {
  		const rect = canvas.getBoundingClientRect();
  		const x = event.clientX - rect.left;
  		const y = event.clientY - rect.top;
  		selectedColor = getColorAtPoint(x, y);
	});

	canvas.addEventListener('mouseleave', () => {
  		selectedColor = null;
	});

});