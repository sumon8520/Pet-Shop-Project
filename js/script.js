// Category Button Fetch Section
const loadCategoryBtn = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => loadDisplayBtn(data.categories))
}

// Display the all button in ui section
const loadDisplayBtn = (items) => {
  const buttonContainer = document.getElementById('btn-container');
  items.forEach((item) => {
    const button = document.createElement('button');
    button.onclick = () => showThePetCategoryId(item.category);
    button.classList.add('btn');
    button.classList.add('p-6');
    button.innerHTML = `
        <img class = "w-[25px]" src ="${item.category_icon}"/>
        <h2>${item.category}</h2>`
    buttonContainer.append(button);
  })
}

// Show The Categories Id With Pet Section
const showThePetCategoryId = (Id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${Id}`)
    .then(res => res.json())
    .then(data => displayTheAllCategory(data.data))
}

// Fetach The All Pet Section
const LoadAllPetsCategory = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayTheAllCategory(data.pets))
}

// Show The All Pets Display Of Ui Section
const displayTheAllCategory = (pets) => {
  const allThePetContainer = document.getElementById('pet-container');
  allThePetContainer.innerHTML = '';


  if (pets.length === 0) {
    allThePetContainer.classList.remove('grid')
    allThePetContainer.innerHTML = `
    <div class= "text-center border-t md:border-none">
    <div><img class= "mx-auto" src= "images/error.webp"/></div>
    <h2 class="text-3xl font-bold">No Information Available</h2>
    <p class="text-gray-500 mb-12">It is a long established fact that a reader will be distracted by the readable content of a <br> page when looking at 
    its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
      
    `;
    return;
  }
  else{
    allThePetContainer.classList.add('grid')
  }
  pets.forEach((pet) => {
    const card = document.createElement('div');
    card.classList.add('card')
    card.classList.add('parent-container')
    card.innerHTML = `
  <figure>
    <img class="rounded-md w-full h-full p-4 object-cover"
      src="${pet.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body text-gray-600">
      <h2 class="font-bold">${pet.pet_name}</h2>
      <p class=text-gray-500"><i class="fa-solid fa-qrcode mr-3"></i>${pet.breed}</p>
      <p class=text-gray-500"><i class="fa-regular fa-calendar mr-3"></i>${pet.date_of_birth}</p>
      <p class=text-gray-500"><i class="fa-solid fa-venus mr-3"></i>${pet.gender}</p>
      <p class=text-gray-500"><i class="fa-solid fa-dollar-sign mr-3"></i>${pet.price}</p>

      <div class= "flex justify-between">
      <button class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
      <button class="btn">Adopt</button>
      <button onclick = "petDetails(${pet.petId})" class="btn">Details</button>
      </div>
</div>
        `
    allThePetContainer.append(card);
  })
}
const petDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  .then(res => res.json())
  .then(data => petDetailsDisplay(data))
}
// pet details display funtion
const petDetailsDisplay = (data) => {
console.log(data)
const detailsContainer = document.getElementById('details-container');
detailsContainer.innerHTML = `
  <img class="mx-auto" src = "${data.petData.image}"/>
  <p>PetId: ${data.petData.petId}</p>
  <p>Pet Breed: ${data.petData.petId}</p>
  <p>CateGory :${data.petData.category}</p>
  <p>Data Of Birth: ${data.petData.date_of_birth}</p>
  <p>${data.petData.gender}</p>
  <p>Gender: ${data.petData.pet_details}</p>
`
  document.getElementById('customModal').showModal()
  
}




loadCategoryBtn();
LoadAllPetsCategory();