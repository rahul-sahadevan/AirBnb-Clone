const totalStay = document.querySelector(".total-stays");
const hotelLists = document.querySelector(".hotel-lists");
const hotelMap = document.querySelector(".hotel-list-map");

const elementList = localStorage.getItem("obj");
const elementList2 = JSON.parse(elementList);
console.log(elementList2);

const array = elementList2.arr;
const checkinDate = elementList2.checkinDate;
const checkoutDate = elementList2.checkoutDate;
console.log(elementList2)



totalStay.innerText = array.length+"+ stays in "+elementList2.searchVal;
// getHotelLocation(array[0].lat,array[0].lng);
let Your_Latitude = array[0].lat;
let Your_Longitude = array[0].lng;

const modalDiv = document.querySelector(".modal-div");

let userLocation;

window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            localStorage.setItem("userLocation",JSON.stringify(userLocation));
        });
    }
}

let myLocation = localStorage.getItem("userLocation");
let obj = JSON.parse(myLocation);
console.log(obj)
const lat1 = obj.lat;
const lng1 = obj.lng;

array.forEach(element => {
    createListingCard(element);
    
});

function createListingCard(element){
    const listCard = document.createElement("div");
    listCard.setAttribute("class","listing-card list")
    addModal(listCard,element);
   
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
                <p class="other-p">Distance from you: ${distaceCalculator(lat1,lng1,element.lat,element.lng)}KM</p>
                <p class="rate-per-night">₹ ${element.price.total*83} night</p>
            </div>
    
         `
    hotelLists.append(listCard);

}

function distaceCalculator(lat1, lon1, lat2, lon2) {
    console.log(lat1)
    // Convert latitude and longitude from degrees to radians
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);
  
    // Radius of the Earth in kilometers
    const radius = 6371.0;
  
    // Haversine formula
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance
    const distance = radius * c;
  
    return Math.ceil(distance);
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

function addModal(list,element){
    list.addEventListener("click",()=>{
        modalDiv.style.display = "block";
        hotelLists.style.filter = 'blur(5px)';
        localStorage.setItem("element",JSON.stringify(element))
        modalDiv.innerHTML = `
        <div class="cost">
            <h2 class="cost-break">Booking Cost Breakdown</h2>
            <p>Base Rate:${element.price.priceItems[0].amount * 83}₹</p>
            <p>Additional Fess: ${addtionalFess(element) * 83}₹</p>
            <p>Total Cost: ${element.price.total * 83}₹</p>
        </div>
        <div class="ok-div">
            <button class="ok-button" onclick = "closeModal()">OK</button>
            <button class="profile-button" onclick = "myProfile()">Profile</button>
        </div>
        `
        
    })
    
}
function myProfile(){

    window.location.href = "http://127.0.0.1:5500/house.html"
}
function addtionalFess(element){  
    return element.price.priceItems[1].amount + element.price.priceItems[2].amount;
}

function closeModal(){
    modalDiv.style.display = "none"
    hotelLists.style.filter = 'none';
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

