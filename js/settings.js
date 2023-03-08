// Customization
const root = document.documentElement;
const body = document.getElementsByTagName('body')[0];
const input = document.querySelector('#color-input');
const applyButton = document.querySelector('#apply-btn');
const resetButton = document.querySelector('#reset-btn');
const bgButton = document.getElementById('bg-button');
const contentbgButton = document.getElementById('content-bg-button');
const fontButton = document.getElementById('font-button');
const secondaryfontButton = document.getElementById('secondary-font-button');
const buttonColor = document.getElementById('button-color');
const savedBgColor = localStorage.getItem('bgColor');
const savedcontentBgColor = localStorage.getItem('contentbgColor');
const savedFontColor = localStorage.getItem('fontColor');
const savedsecondaryFontColor = localStorage.getItem('secondaryfontColor');
const savedbuttonColor = localStorage.getItem('buttonColor');
const colorPickerPopup = document.querySelector('.color-picker-popup');
const colorPicker = document.querySelector('.color-picker');
const colorPreview = document.querySelector('#color-preview');
const canvas = document.querySelector('.color-canvas');
const context = canvas.getContext('2d');
const imageData = context.createImageData(canvas.width, canvas.height);
const data = imageData.data;
context.canvas.willReadFrequently = true;
if (savedBgColor) {
  body.style.backgroundColor = savedBgColor;
}
if (savedcontentBgColor) {
  root.style.setProperty('--content-bg-color', savedcontentBgColor);
}
if (savedFontColor) {
  root.style.setProperty('--font-color', savedFontColor);
}
if (savedsecondaryFontColor) {
  root.style.setProperty('--secondary-font-color', savedsecondaryFontColor);
}
if (savedbuttonColor) {
  root.style.setProperty('--button-color', savedbuttonColor);
}

// Color picker
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
function getColorAtPoint(x, y) {
  const imageData = context.getImageData(x, y + 50, 10, 10);
  const rgba = imageData.data;
  const hex = "#" + ((1 << 24) + (rgba[0] << 16) + (rgba[1] << 8) + rgba[2]).toString(16).slice(1).toUpperCase();
  return hex;
}

// Color picker button logic
document.addEventListener('mousedown', function(event) {
  if (!colorPicker.contains(event.target)) {
    colorPicker.style.display = 'none';
    input.value = null;
    selectedColor = null;
  }
});	
canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  selectedColor = getColorAtPoint(x, y);
  const colorPickerPopupX = x;
  const colorPickerPopupY = y - 50;
  colorPickerPopup.style.display = 'block';
  colorPickerPopup.style.left = colorPickerPopupX + 'px';
  colorPickerPopup.style.top = colorPickerPopupY + 'px';
  colorPickerPopup.textContent = selectedColor;
  colorPickerPopup.style.color = selectedColor;
});
canvas.addEventListener('mouseout', function(event) {
  colorPickerPopup.style.display = 'none';
});	
resetButton.addEventListener('click', function(event) {
  event.preventDefault();
  input.value = null;
  selectedColor = null;
  colorPreview.style.backgroundColor = selectedColor;
  input.style.color = selectedColor;
});
canvas.addEventListener('click', function(event) {
  event.preventDefault();
  if (selectedColor) {
    input.value = selectedColor;
    input.style.color = input.value;
    colorPreview.style.backgroundColor = input.value;
  }
});
applyButton.addEventListener('click', applyButtonClick);
function applyButtonClick(event) {
  event.preventDefault();
  if (activeButton === bgButton) {
    body.style.backgroundColor = input.value;
    localStorage.setItem('bgColor', input.value);
  } else if (activeButton === contentbgButton) {
    root.style.setProperty('--content-bg-color', input.value);
    localStorage.setItem('contentbgColor', input.value);
  } else if (activeButton === fontButton) {
    root.style.setProperty('--font-color', input.value);
    localStorage.setItem('fontColor', input.value);
  } else if (activeButton === secondaryfontButton) {
    root.style.setProperty('--secondary-font-color', input.value);
    localStorage.setItem('secondaryfontColor', input.value);
  } else if (activeButton === buttonColor) {
    root.style.setProperty('--button-color', input.value);
    localStorage.setItem('buttonColor', input.value);
  }
}
// Customization button
let activeButton = null;

bgButton.addEventListener('click', function(event) {
  event.preventDefault();
  colorPreview.style.backgroundColor = selectedColor;
  input.style.color = selectedColor;
  colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
  const buttonRect = bgButton.getBoundingClientRect();
  colorPicker.style.top = buttonRect.bottom + 'px';
  colorPicker.style.left = buttonRect.left + 50 +'px';
  activeButton = bgButton;
});
contentbgButton.addEventListener('click', function(event) {
  event.preventDefault();
  colorPreview.style.backgroundColor = selectedColor;
  input.style.color = selectedColor;
  colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
  const buttonRect = contentbgButton.getBoundingClientRect();
  colorPicker.style.top = buttonRect.bottom + 'px';
  colorPicker.style.left = buttonRect.left + 50 + 'px';
  activeButton = contentbgButton;
});
fontButton.addEventListener('click', function(event) {
  event.preventDefault();
  colorPreview.style.backgroundColor = selectedColor;
  input.style.color = selectedColor;
  colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
  const buttonRect = fontButton.getBoundingClientRect();
  colorPicker.style.top = buttonRect.bottom + 'px';
  colorPicker.style.left = buttonRect.left + 50 + 'px';
  activeButton = fontButton;
});
secondaryfontButton.addEventListener('click', function(event) {
  event.preventDefault();
  colorPreview.style.backgroundColor = selectedColor;
  input.style.color = selectedColor;
  colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
  const buttonRect = secondaryfontButton.getBoundingClientRect();
  colorPicker.style.top = buttonRect.bottom + 'px';
  colorPicker.style.left = buttonRect.left + 50 + 'px';
  activeButton = secondaryfontButton;
});
buttonColor.addEventListener('click', function(event) {
  event.preventDefault();
  colorPreview.style.backgroundColor = selectedColor;
  input.style.color = selectedColor;
  colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
  const buttonRect = buttonColor.getBoundingClientRect();
  colorPicker.style.top = buttonRect.bottom + 'px';
  colorPicker.style.left = buttonRect.left + 50 + 'px';
  activeButton = buttonColor;
});

