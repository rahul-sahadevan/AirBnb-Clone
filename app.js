const searchInput = document.getElementById("location");
const checkinDate = document.getElementById("check-in");
const checkoutDate = document.getElementById("check-out");
const guestCount = document.getElementById("guest");
const searchBtn = document.getElementById("searchInput");

document.addEventListener('DOMContentLoaded', function() {
    searchBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchInput.value}&checkin=${checkinDate.value}&checkout=${checkoutDate.value}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9aa4fc57f3msh4a940688b572b19p1cb731jsn64b05df2b354',
                'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
        };
        async function x(){
            try {
                const response = await fetch(url,options);
                const result = await response.json();
                
                console.log(result.results);
                const arr = result.results;
                let obj = {
                    arr:arr,
                    checkinDate:checkinDate.value,
                    checkoutDate:checkoutDate.value,
                    searchVal:searchInput.value
                }
                localStorage.setItem("obj",JSON.stringify(obj));
                const a = document.createElement("a");
                a.href = "listing.html"
                a.target = "_blank";
                window.location = a;
            } 
            catch (error) {
                console.error(error);
            }
            
        }
        x();
    
    })
    
});









