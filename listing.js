const totalStay = document.querySelector(".total-stays");
const hotelLists = document.querySelector(".hotel-lists");

const elementList = localStorage.getItem("obj");
const elementList2 = JSON.parse(elementList);
console.log(elementList2);

const array = elementList2.arr;
const checkinDate = elementList2.checkinDate;
const checkoutDate = elementList2.checkoutDate;
console.log(elementList2)

const okBtn = document.querySelector(".ok-button");

totalStay.innerText = array.length+"+ stays in "+elementList2.searchVal;
// getHotelLocation(array[0].lat,array[0].lng);
let Your_Latitude = array[0].lat;
let Your_Longitude = array[0].lng;

const modalDiv = document.querySelector(".modal-div");

array.forEach(element => {
    createListingCard(element);
    
});

function createListingCard(element){
    const listCard = document.createElement("div");
    listCard.setAttribute("class","listing-card list")
    listCard.addEventListener('click', () => {
        showModal();
      });
   
        listCard.innerHTML = `

            <div class="pic-heart">
                <img src="${element.images[0]}" alt="" class="hotel-img">
                <img class="heart" src="./images/heart.png" alt="">

            </div>
            <div class="name-head-rating">
                <div class="des-rating">
                    <p class="stay-des">${element.name}</p>
                    <p class="stay-rating"><img src="./images/star.png" alt=""><span>
                    ${element.rating}(<span>${element.reviewsCount}</span>)</span></p>

                </div>
                <p class="other-p">${element.type}</p>
                <p class="other-p">${element.beds} beds</p>
                <p class="other-p">${checkoutDate.split("-").splice(1).join("-")} Oct</p>
                <p class="rate-per-night">₹ ${element.price.total*83} night</p>
            </div>
    
         `
    hotelLists.append(listCard);

}
function showModal() {
    console.log("xxx")
   
  }
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: array[0].lat, lng: array[0].lng }, // Adjust the initial map center as needed
      zoom: 10, // Adjust the initial zoom level as needed
    });

    for(let i =1;i<array.length;i++){
        addMarker({lat:array[i].lat,lng:array[i].lng})
    }


    function addMarker(coords){
        var marker = new google.maps.Marker({
            position:coords,
            map:map,
        })
    }
  }
// Your JavaScript code here, including event listeners and function calls