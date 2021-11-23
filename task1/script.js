// dom stuff
const divDisplayDog = document.getElementById('image-display');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previouse');

// Event listener

nextBtn.addEventListener('click', fetchApi);
prevBtn.addEventListener('click', backBtnImage);

// Comunication with api
function fetchApi() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      getDogData(data);
      storePictureInArray(data)
    });
}

fetchApi();
// display image with dogs
function getDogData(value){
    divDisplayDog.style.backgroundImage = `url(${value.message})`;
    counter = 2
};

// store images
const arrayPicture = [];

function storePictureInArray(value) {
  arrayPicture.push(value.message);
};

// previouse btn functionality

let counter = 2;
function backBtnImage() { 
  divDisplayDog.style.backgroundImage = `url(${arrayPicture[arrayPicture.length - counter]})`;
  console.log(arrayPicture);
  console.log(arrayPicture[arrayPicture.length - counter]);
  counter++;
}

