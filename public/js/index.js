document.addEventListener('DOMContentLoaded', () => {


/* ==========================================================================
1. 手機版選單 (完全保留你的邏輯)
========================================================================== */

const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');


if (mobileBtn && mobileMenu) {


mobileBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    mobileMenu.classList.toggle('is-active');
});



document.addEventListener('click',(e)=>{

    if(
        !mobileMenu.contains(e.target) &&
        !mobileBtn.contains(e.target)
    ){

        mobileMenu.classList.remove('is-active');

    }

});


}



/* ==========================================================================
2. Decap 輪播圖片載入
========================================================================== */


async function loadCarousel(){


const track =
document.getElementById('carousel-track');


const dotsContainer =
document.getElementById('carousel-dots');



if(!track) return;



try{


const res =
await fetch('/data/carousel.json');


const data =
await res.json();



track.innerHTML =
data.map((item,index)=>`


<div class="carousel-slide 
${index===0?'active':''}">


<img src="${item.image}" 
alt="${item.title || ''}">


</div>


`).join("");





if(dotsContainer){


dotsContainer.innerHTML =


data.map((item,index)=>`


<span class="dot 
${index===0?'active':''}" 
data-slide="${index}">
</span>


`).join("");

}


initCarousel();


}

catch(error){

console.error(
"輪播資料載入失敗:",
error
);

}


}




/* ==========================================================================
3. 輪播控制
========================================================================== */


function initCarousel(){


const carouselTrack =
document.getElementById('carousel-track');


const prevBtn =
document.getElementById('prev-btn');


const nextBtn =
document.getElementById('next-btn');


const dots =
Array.from(
document.querySelectorAll('.dot')
);



if(!carouselTrack) return;



const slides =
Array.from(carouselTrack.children);



let currentIndex = 0;

let timer;



function updateCarousel(index){


if(index < 0){

currentIndex =
slides.length-1;


}

else if(index >= slides.length){

currentIndex=0;


}

else{


currentIndex=index;


}



carouselTrack.style.transform =
`translateX(-${currentIndex*100}%)`;



dots.forEach((dot,i)=>{

dot.classList.toggle(
'active',
i===currentIndex
);

});


}



function nextSlide(){

updateCarousel(
currentIndex+1
);

}



function prevSlide(){

updateCarousel(
currentIndex-1
);

}



function start(){

stop();

timer =
setInterval(
nextSlide,
4000
);

}



function stop(){

if(timer){

clearInterval(timer);

}

}



if(nextBtn){

nextBtn.onclick=()=>{

nextSlide();

start();

};

}



if(prevBtn){

prevBtn.onclick=()=>{

prevSlide();

start();

};

}



dots.forEach((dot,index)=>{


dot.onclick=()=>{


updateCarousel(index);

start();


};


});



const container =
carouselTrack.parentElement;


if(container){


container.addEventListener(
'mouseenter',
stop
);


container.addEventListener(
'mouseleave',
start
);


}



updateCarousel(0);

start();


}





/* ==========================================================================
4. 最新消息載入
========================================================================== */


async function loadNews(){


const container =
document.querySelector('.news-grid-6');



if(!container) return;



try{


const res =
await fetch('/data/news.json');


const news =
await res.json();



container.innerHTML =


news.slice(0,6)
.map(item=>`


<article class="news-card">


<div class="news-card-meta">


<span class="news-tag tag-green">

${item.tag}

</span>


<span class="news-date">

${item.date}

</span>


</div>



<h3 class="news-card-title">

${item.title}

</h3>



<p class="news-card-summary">

${item.summary}

</p>



</article>



`).join("");



}

catch(error){

console.error(
"新聞資料載入失敗:",
error
);


}


}





/* ==========================================================================
5. 最新消息跑馬燈
========================================================================== */


async function loadTicker(){


const ticker =
document.getElementById(
'ticker-track'
);



if(!ticker) return;



try{


const res =
await fetch('/data/news.json');


const news =
await res.json();



const items =
news.slice(0,5);



const loop =
[
...items,
...items
];



ticker.innerHTML =


loop.map(item=>`


<div class="ticker-item">

<span>

${item.title}

</span>

</div>


`).join("");



}

catch(error){


console.error(
"跑馬燈載入失敗:",
error
);


}


}




/* ==========================================================================
6. 啟動 CMS 功能
========================================================================== */


loadCarousel();


loadNews();


loadTicker();



});