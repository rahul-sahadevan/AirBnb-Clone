const obj = localStorage.getItem("element");
const result = JSON.parse(obj);

const mainObj = localStorage.getItem("obj");
const parseObj = JSON.parse(mainObj);

const cIn = parseObj.checkinDate;
const cOut = parseObj.checkoutDate;

const rateForFiveDays = result.price.total * 83 * 5;
const cleaningFees = result.price.priceItems[1].amount * 83;
const airbnbFees = result.price.priceItems[2].amount * 83;
const totalFees = rateForFiveDays + cleaningFees + airbnbFees;


const gallery = document.querySelector(".gallery");
const title = document.querySelector(".title");
const roomDetails = document.querySelector(".room-details");
const amenties = document.querySelector(".details-list2");
const lat = result.lat;
const lng = result.lng;


let myLocation = localStorage.getItem("userLocation");
let obj2 = JSON.parse(myLocation);

const lat1 = obj2.lat;
const lng1 = obj2.lng;
console.log(lat1,lng1)

const hostLogo = document.querySelector(".host-image");
hostLogo.src = `${result.hostThumbnail}`;

const address = document.querySelector(".address");
address.innerText= result.address;


const iFrame = document.querySelector(".owner-location")
title.innerText = result.name;
console.log(result)

const fiveNightCard = document.querySelector(".five-night-rate");

function nightTotalRateCard(){
    fiveNightCard.innerHTML = `
        <h2 class="one-night=rate">₹${result.price.total * 83} <span class="night">/night</span></h2>
        <br>
        <div class="date-table">
            <div class="cin-cout">
                <div class="c-in">
                    <h5>CHECK IN</h5>
                    <p>${cIn.split("-").join("/")}</p>
                </div>
                <div class="c-out">
                    <h5>CHECK OUT</h5>
                    <p>${cOut.split("-").join("/")}</p>
                </div>
            </div>
            <div class="guest-in">
                <h5>GUESTS</h5>
                <p>2 guests</p>
            </div>
        </div>
        <br>
        <button class="reserve">Reserve</button>
        <div class="charges">
            <br>
            <p class="not-charge">you won't be charged yet</p>
            <br>
            <div class="fees">
                <p>₹${result.price.total * 83} x 5 nights</p>
                <p>₹${rateForFiveDays}</p>
            </div>
            <br>
            <div class="fees">
                <p>Cleaning fees</p>
                <p>₹${cleaningFees}</p>
            </div>
            <br>
            <div class="fees">
                <p>Airbnb Service fees</p>
                <p>₹${airbnbFees}</p>
            </div>
            <br>
        </div>
        <hr>
        <br>
        <div class="fees total-fees">
            <p>Total before taxes</p>
            <p>₹${totalFees}</p>
        </div>
    `
}

function amentyDetails(amenty){
    for(let i =0;i<amenty.length;i++){
        const li = document.createElement("li");
        li.innerText = amenty[i];
        amenties.append(li);
    }

}

function roomDetailsFun(result){
    roomDetails.innerHTML = `
        <h2>${result.type}, <span>India</span></h2>
        <div class="rooms">
            <p>5 guests·</p>
            <p>${result.bedrooms} bedroom·</p>
            <p>${result.beds} beds·</p>
            <p>${result.bathrooms} bathroom</p>
        </div>
        <div class="des-rating">
            <p class="stay-rating">★ ${result.rating} · <span>${result.reviewsCount} reviews</span></p>
        </div>
    `
}

function getImages(images){
    gallery.innerHTML = `
        <div class="gallery-img-1 A"><img src="${images[0]}"></div>
        <div class="g1">
            <div class="g2">
                <div class="B"><img src="${images[1]}"></div>
                <div class="C"><img src="${images[2]}"></div>
            </div>
            <div class="g3">
                <div class="C"><img src="${images[3]}"></div>
                <div class="E"><img src="${images[4]}"></div>
            </div>
        </div>

    `  
}
function initMap() {
    const map = new google.maps.Map(document.getElementById('mapi'), {
        center: { lat:lat1, lng:lng1 }, // Adjust the initial map center as needed
        zoom: 10, // Adjust the initial zoom level as needed
    });

    addMarker({lat:lat1,lng:lng1})
    addMarkerDesti({lat:lat,lng:lng})

    function addMarker(coords){
        var marker = new google.maps.Marker({
            position:coords,
            map:map,
            icon:'images/Avatar.png',
        })
    }
    function addMarkerDesti(coords){
        var marker = new google.maps.Marker({
            position:coords,
            map:map,
        })
    }

}
  
getImages(result.images)
roomDetailsFun(result)
amentyDetails(result.previewAmenities)
nightTotalRateCard();