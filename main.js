// import {
//   log,
//   logLevel,
//   logDef,
// } from "./node_modules/@nor/tinylog/lib/tinylog.js";

// import PhotoSwipeLightbox from "./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js";


// if this does not work - fix it by installing
// tinylog. See readme.md file for more info.

// log.setClient({ name: "Sandeps Webclient", version: "1.0.0" });
// log.logAll().showDate().whoami();

// Sticky nav bar
const nav = document.querySelector(".header-1");

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = nav.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }
});

// smooth scroll

const scrollLinks = document.querySelectorAll('.scroll-link');
const navHeight = nav.getBoundingClientRect().height;
scrollLinks.forEach((link)=>{
link.addEventListener('click',(e)=>{
e.preventDefault();
// Navigate to specific path
const id = e.currentTarget.getAttribute('href').slice(1);
const element =document.getElementById(id);
let position = element.offsetTop - navHeight;
window.scrollTo({
  left:0,
  top:position,
});
});
});

// Nav toggle button for mobile/tablet

const NavToggle = document.querySelector('.nav-toggle');
const Navigation = document.querySelector('.navigation');

NavToggle.addEventListener('click',()=>{
  Navigation.classList.toggle('active')
})

scrollLinks.forEach((item)=>{
 item.addEventListener('click',()=>{
  Navigation.classList.remove('active');
 })
})

// fetch json
// const ebooks = document.querySelector(".product-container");

// const fetchEbooks = async () => {
//   try {
//     const response = await fetch("release2.json");
//     // log.trace("Release2 JSON:", response);
//     const data = await response.json();
//     // log.trace(data);
//     return data;
//   } catch (error) {
//     alert(error);
//   }
// };
// fetchEbooks();

// const displayProducts = (list) => {
//   const productList = list
//     .map((product) => {
//       // log.trace("Product:", product);
//       const { id } = product;
//     //  let length = id.length
//       //  console.log(Math.floor(Math.random() * id));

//       // log.trace("Math random id", Math.random(id));
//       const { coverimgpath } = product;
//       // console.log(coverimgpath);
//       // function randomBook() {
//       //   const books = Object.keys(product);
//       //   return books[Math.floor(Math.random() * books.length)];
//       // }
//       // console.log(randomBook());
//       if (id <= 30) {
//         return `<div class="box">
//   <div class="ebook-images">
//     <img
//       class="ebook-image"
//       src="${coverimgpath}"
//       alt=""
//     />
//   </div>
//   <div class="store-pricing">
//     <!-- <h3>eBook</h3> -->
//     <div class="price"><span>$3.99</span></div>
//     <a href="#" class="buy-btn">Buy Now</a>
//   </div>
// </div>`;
//       }
//     })
//     .join("");
    
// ebooks.innerHTML = ` 
//       ${productList}
//    `;
  
// };

// const start = async () => {
//   const data = await fetchEbooks();
//   displayProducts(data);

// };

// await start();
// // log.info("Product Container", productContainer);


// fetch json for store
const ebooks = document.querySelector(".product-container");

const fetchEbooks = async () => {
  try {
    const response = await fetch("release2.json");
    // log.trace("Release2 JSON:", response);
    const data = await response.json();
    // log.trace(data);
    return data;
  } catch (error) {
    alert(error);
  }
};


function viewBooks(books) {
  ebooks.innerHTML = "";
  books.forEach((book) => {
    let box = document.createElement("div")
    box.classList.add("box")
    box.setAttribute("id", `box-${book.id}`)
      
    let images = document.createElement("div")
    images.classList.add("ebook-images")

    let image = document.createElement("img")
    image.classList.add("ebook-image")
    image.setAttribute("src", `${book.coverimgpath}`)
    image.setAttribute("alt", `${book.title}`)
    image.setAttribute("usd_price", `${book.usd_price}`);

    images.appendChild(image)

    let a = document.createElement("a")
    a.setAttribute("href", `https://tbtm.sale/book/${book.isbn}`)
    a.appendChild(image)
    box.appendChild(a)

    ebooks.appendChild(box)
  });
};



const all = await fetchEbooks();

function pickRandomBooks(max, books) {
  let randomBooks = [];
  let ids = books.map((book) => book.id);
  let listPos = [];
  for (let i = 0; i < max; i++) {
    let id = Math.floor(Math.random() * ids.length);
    if (!listPos.includes(id)) {
      listPos.push(id);
    } else {
      i--;
    }
  }
  // log.info("Random Ids:", listPos);
  for (let i = 0; i < listPos.length; i++) {
    let book = books[listPos[i]];
    randomBooks.push(book);
  }
  // log.info("Random Books:", randomBooks);
  return randomBooks;
}

const showRandomBooks = async () => {
  let books = pickRandomBooks(30, all);
  viewBooks(books);
  //  const productContainer = document.querySelector(".product-container");
  const slide = document.querySelector(".box");
};

showRandomBooks();

//run showRandomBooks function every 5 seconds
setInterval(showRandomBooks, 100000);

// popup

// custom slider
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slider = document.getElementById("slider");
const boxes = document.querySelectorAll('.box')
// const position = boxes[0].getBoundingClientRect().width;
// console.log(position);

  // let containerDimensions = slider.getBoundingClientRect();
  // let containerWidth = containerDimensions.width;
  // nextBtn.addEventListener("click", () => {
  //   slider.scrollLeft += containerWidth;
  // });
  // prevBtn.addEventListener("click", () => {
  //   slider.scrollLeft -= containerWidth;
  // });

// slider autoplay
let maxScrollLeft = slider.scrollWidth - slider.clientWidth;

function autoplay() {
  if (slider.scrollLeft > (maxScrollLeft - 1)) {
    clearInterval(play)
    slider.scrollLeft -= slider.scrollWidth;
  }
  else {   
    slider.scrollLeft += 1;
  }
}

let play = setInterval(autoplay,50);


  nextBtn.addEventListener("click", () => {
    clearInterval(play);
    slider.scrollLeft += 700;

  });

  prevBtn.addEventListener("click", () => {
    clearInterval(play);
    slider.scrollLeft -= 700;
  });

boxes.forEach((box)=>{
  
  box.addEventListener('mouseover',()=>{
    clearInterval(play);
  })
  box.addEventListener('mouseleave',()=>{
    return play = setInterval(autoplay,50 );
  })
})

 let collage = pickRandomBooks(102, all);

//////////////////////////////////////////////////
//
// Making a collage of books from the json file
// See https://photoswipe.com/getting-started/
// Install: npm i photoswipe --save
//
//////////////////////////////////////////////////

const gallery = document.getElementById("gallery");

function ShowGallery() {
  gallery.innerHTML = "";
  collage = pickRandomBooks(102, all);

  //generate a-element for each picture from the collage array
  collage.forEach((collage) => {
    let a = document.createElement("a");
    a.href = `${collage.coverimgpath}`;
    a.setAttribute("data-pswp-width", "800");
    a.setAttribute("data-pswp-height", "1290");
    a.target = "_blank";
    let img = document.createElement("img");
    img.src = `${collage.coverimgpath}`;
    img.alt = `${collage.title}`;
    img.width = "40";
    img.height = "62.5";
    a.appendChild(img);
    gallery.appendChild(a);
  });

  // const lightbox = new PhotoSwipeLightbox({
  //   // may select multiple "galleries"
  //   gallery: "#gallery",
  //   // Elements within gallery (slides)
  //   children: "a",
  //   // setup PhotoSwipe Core dynamic import
  //   pswpModule: () =>
  //     import("./node_modules/photoswipe/dist/photoswipe.esm.js"),
  // });
  // lightbox.init();
}

ShowGallery();

//after 30 seconds clear the gallery and generate a new collage
setInterval(ShowGallery, 60000);
