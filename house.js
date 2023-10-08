const obj = localStorage.getItem("element");
const result = JSON.parse(obj);

const gallery = document.querySelector(".gallery");
const title = document.querySelector(".title");
title.innerText = result.name;
console.log(result)


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

getImages(result.images)