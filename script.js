const backBtn = document.querySelector('#backBtn');
const nextBtn = document.querySelector('#nextBtn');
const imgContainer = document.querySelector('.imgContainer');
const dogImg = document.querySelector('.dogImg');
const btnContainer = document.querySelector('#btnContainer');
const titleDog = document.querySelector('#titleDog');

backBtn.addEventListener('click', backDog);
nextBtn.addEventListener('click', nextDog);

let currentImgIndex;
let dogList = [];

let breeds = [];
let selectedBreed;

getDog();

function getDog() {
  fetch("https://dog.ceo/api/breeds/list/all")
  .then(processFetchResponse)
  .then(displayDogBreeds);
}

function processFetchResponse(response) {
  if(response.status === 404) {
    throw new Error('404 error');
  }

  return response.json();
}

function displayDogBreeds(data) {
  let firstBtn;

  for (const key in data.message) {
    let dogBtn = document.createElement('button');
    dogBtn.innerHTML = key;
    dogBtn.classList.add('getDogBtn');
    btnContainer.append(dogBtn);
    dogBtn.addEventListener('click', setSelectedBreed);
    
    if(!breeds.length){
      firstBtn = dogBtn;
    }

    breeds.push(key);
  }

  firstBtn.click();
}

function setSelectedBreed(e){
  const clickedBtn = e.target;

  disableBreedBtn(clickedBtn);

  const newBreed = clickedBtn.innerText;
  if(selectedBreed !== newBreed){
    selectedBreed = newBreed;
    titleDog.innerText = selectedBreed.toUpperCase();
    getBreedDog(selectedBreed);
  }
}

function disableBreedBtn(selectedBtn) {
  const disabledBtn = document.querySelector('.getDogBtn:disabled');
  if(disabledBtn){
    disabledBtn.disabled = false;
  }
  selectedBtn.disabled = true;
}

function getBreedDog(breedName) {
  fetch(`https://dog.ceo/api/breed/${breedName}/images`)
  .then(processFetchResponse)
  .then(useBreedDogData);
}

function useBreedDogData(data){
  dogList = data.message;

  currentImgIndex = 0;
  dogImg.src = dogList[currentImgIndex];
  console.log(dogList);
  titleDog.innerText = selectedBreed.toUpperCase();
}

function nextDog() {
  if(!dogList[currentImgIndex + 1]) {
    return;
  }

  currentImgIndex++;
  dogImg.src = dogList[currentImgIndex];
}

function backDog() {
  if(currentImgIndex < 1) {
    return;
  }
  currentImgIndex--;
  dogImg.src = dogList[currentImgIndex]
}
