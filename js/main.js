// Navigation Bar
const appsButton = document.querySelector('#apps');
const appContainerSection = document.querySelector('.app-container');
const settingsButton = document.querySelector('#settings');
const settingsSection = document.querySelector('.apps-settings');
const addappButton = document.querySelector('#add-app');
const addappSection = document.querySelector('.add-app');

appsButton.addEventListener('click', () => {
	appContainerSection.classList.remove('hidden');
	addappSection.classList.add('hidden');
	addappButton.classList.remove('hidden');
	settingsSection.classList.add('hidden');
});

settingsButton.addEventListener('click', () => {
 	appContainerSection.classList.add('hidden');
	addappSection.classList.add('hidden');
	addappButton.classList.add('hidden');
	settingsSection.classList.remove('hidden');
});

addappButton.addEventListener('click', () => {
	appContainerSection.classList.add('hidden');
  	addappSection.classList.remove('hidden');
	settingsSection.classList.add('hidden');
});