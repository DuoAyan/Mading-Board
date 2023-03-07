document.addEventListener('DOMContentLoaded', function() {
	// Clock
	function updateClock() {
		var timezone = "Asia/Jakarta";
		var jam = moment().tz(timezone);
		const clockElement = document.getElementById('clock');
		var timeString = jam.format("MMM D, YYYY HH:mm");
		clockElement.textContent = jam;
		document.getElementById("clock").innerHTML = timeString;
		setInterval(updateClock, 60000);
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
	const colorPreview = document.querySelector('#color-preview');
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
		input.value = null;
		selectedColor = null;
		colorPreview.style.backgroundColor = selectedColor;
	});

	// Color picker
	const colorPickerButton = document.getElementById('color-picker-button');
	const colorPickerPopup = document.getElementById('color-picker-popup');
	const colorPicker = document.getElementById('color-picker');
	const canvas = document.getElementById('color-canvas');
	const context = canvas.getContext('2d');
	context.canvas.willReadFrequently = true;

	let selectedColor = null;

	colorPickerButton.addEventListener('click', function(event) {
		event.preventDefault();
		colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
	});

	canvas.addEventListener('click', function(event) {
		event.preventDefault();
		if (selectedColor) {
			input.value = selectedColor;
			colorPreview.style.backgroundColor = input.value;
		}
	});

	const imageData = context.createImageData(canvas.width, canvas.height);
	const data = imageData.data;
	
	for (let i = 0; i < canvas.width; i++) {
	  for (let j = 0; j < canvas.height; j++) {
		const index = (i + j * canvas.width) * 4;
		data[index] = i;
		data[index + 1] = 255 - j;
		data[index + 2] = j;
		data[index + 3] = 255;
	  }
	}
	
	context.putImageData(imageData, 0, 0);

	function getColorAtPoint(x, y) {
		const imageData = context.getImageData(x, y, 1, 1);
		const rgba = imageData.data;
		return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
	  }

	canvas.addEventListener('mousemove', (event) => {
  		const rect = canvas.getBoundingClientRect();
  		const x = event.clientX - rect.left;
  		const y = event.clientY - rect.top;
		const colorPickerPopupX = x;
		const colorPickerPopupY = y - 50;
		selectedColor = getColorAtPoint(x, y);
		colorPickerPopup.style.display = 'block';
		colorPickerPopup.style.left = colorPickerPopupX + 'px';
		colorPickerPopup.style.top = colorPickerPopupY + 'px';
		colorPickerPopup.textContent = selectedColor;
	});

	canvas.addEventListener('mouseout', function(event) {
		colorPickerPopup.style.display = 'none';
  	});	
	  document.addEventListener('mousedown', function(event) {
		if (!colorPicker.contains(event.target) && event.target !== colorPickerButton) {
			colorPicker.style.display = 'none';
		}
	});	
});