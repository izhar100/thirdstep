let productdata = JSON.parse(localStorage.getItem("product")) || null;

let alldata = [];
let fetcheddata = [];
window.addEventListener("load", () => {
  fetchdata(1);
});

//filter variables start
let filterby = document.getElementById("filterby");
let checkbrand = document.querySelectorAll(".checkbrand");
let size = document.querySelectorAll(".btn");
let price = document.querySelectorAll(".price");
//filter variables end

let url = `https://63c77a71e52516043f3eaecd.mockapi.io/beverage`;
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    alldata = data;
    //console.log(alldata);
  });

let procount = document.getElementById("procount");

let totaldatacount = null;

function fetchdata(pageNumber) {
  fetch(
    `https://63c77a71e52516043f3eaecd.mockapi.io/beverage?page=${pageNumber}&limit=16`
  )
    .then((res) => {
      showpages(65, 16);
      return res.json();
    })
    .then((data) => {
      fetcheddata = data;
      totaldatacount = alldata.length;
      procount.textContent = `${data[0].id}-${data[data.length - 1].id} of ${
        alldata.length - 1
      } products`;
      displaydata(data);
    })
    .catch((err) => {
      console.log(err);
    });
}


let products=document.getElementById('products')
function displaydata(data){
    let count=data.length;
    products.innerHTML="";

    //product append

    data.map((item,index)=>{
        let div1=document.createElement("div")
        let divheart=document.createElement("div")
        divheart.setAttribute("id","heart")
        let heartimg=document.createElement("img")
        heartimg.src="https://cdn-icons-png.flaticon.com/512/14/14949.png?w=740&t=st=1676993626~exp=1676994226~hmac=27ebdcbb39c748208d4449aaa3f26253fae641221cbcee5eb68deea33ebae884";
        divheart.append(heartimg);
        let cardimg=document.createElement("div");
        cardimg.setAttribute("id","img1");
        let cardimage1=document.createElement("img")
        cardimage1.setAttribute("class","firstimage")
        cardimage1.src=item.image1;
        cardimg.append(cardimage1);
        let proinfo=document.createElement("div")
        proinfo.setAttribute("id","proinfo")
        let h2=document.createElement("h2")
        h2.textContent="SALE";
        let h3=document.createElement("h3")
        h3.textContent=item.brand;
        let protitle=document.createElement("p")
        protitle.setAttribute("id","protitle")
        protitle.setAttribute("class","producttitle")
        protitle.textContent=item.name;
        protitle.addEventListener("click",()=>{
            productdata=item;
            localStorage.setItem("product",JSON.stringify(productdata))
        })

        let prices=document.createElement("div")
        prices.setAttribute("id","prices")
        let price1=document.createElement("p")
        price1.setAttribute("id","price1")
        price1.textContent="$"+item.price+".99";
        prices.append(price1)
        let rating=document.createElement("div")
        rating.setAttribute("id","rating")
        let star1=document.createElement("i")
        star1.setAttribute("class","fa-solid fa-star")
        let star2=document.createElement("i")
        star2.setAttribute("class","fa-solid fa-star")
        let star3=document.createElement("i")
        star3.setAttribute("class","fa-solid fa-star")
        let star4=document.createElement("i")
        star4.setAttribute("class","fa-solid fa-star")
        let star5=document.createElement("i")
        star5.setAttribute("class","fa-regular fa-star-half-stroke")
        rating.append(star1,star2,star3,star4,star5)
        let coupon=document.createElement("p")
        coupon.textContent="Coupon Excluded";
        proinfo.append(h2,h3,protitle,prices,rating)
        div1.append(divheart,cardimg,proinfo,coupon)
        products.append(div1)
    })

    //product append end
}

let pages=document.getElementById("pages")


let brandchkbox=document.getElementById("brdchk")
let brandplus=document.getElementById('brandplus')
let flag=false;
brandplus.addEventListener("click",()=>{
    flag=!flag;
    if(flag==true){
        brandplus.textContent="_";
        brandplus.style.marginBottom="30px";
        brandchkbox.style.display="block";
    }
    else if(flag==false){
        brandplus.textContent="+";
        brandplus.style.marginBottom="0px";
        brandchkbox.style.display="none";
    }
})

let pricecheckbox=document.getElementById("prcchk")
let priceplus=document.getElementById("priceplus")
priceplus.addEventListener("click",()=>{
    flag=!flag;
    if(flag==true){
        priceplus.textContent="_";
        priceplus.style.marginBottom="30px";
        pricecheckbox.style.display="block";
    }
    else if(flag==false){
        priceplus.textContent="+";
        priceplus.style.marginBottom="0px";
        pricecheckbox.style.display="none";
    }
})


  return card;
}
let pages = document.getElementById("pages");

let brandchkbox = document.getElementById("brdchk");
let brandplus = document.getElementById("brandplus");
let flag = false;
brandplus.addEventListener("click", () => {
  flag = !flag;
  if (flag == true) {
    brandplus.textContent = "_";
    brandplus.style.marginBottom = "30px";
    brandchkbox.style.display = "block";
  } else if (flag == false) {
    brandplus.textContent = "+";
    brandplus.style.marginBottom = "0px";
    brandchkbox.style.display = "none";
  }
});

let pricecheckbox = document.getElementById("prcchk");
let priceplus = document.getElementById("priceplus");
priceplus.addEventListener("click", () => {
  flag = !flag;
  if (flag == true) {
    priceplus.textContent = "_";
    priceplus.style.marginBottom = "30px";
    pricecheckbox.style.display = "block";
  } else if (flag == false) {
    priceplus.textContent = "+";
    priceplus.style.marginBottom = "0px";
    pricecheckbox.style.display = "none";
  }
});

function pagebtn(text, pageNumber) {
  return `<button class="pagebtn" data-page-number="${pageNumber}">${text}</button>&nbsp;&nbsp;`;
}

function showpages(total, limit) {
  let allpages = 5;
  let pagedata = [];
  for (let i = 1; i < allpages; i++) {
    pagedata.push(pagebtn(i, i));
  }
  pages.innerHTML = `${pagedata.map((item) => item).join(" ")}`;
  let allbtn = document.querySelectorAll(".pagebtn");
  for (let btn of allbtn) {
    btn.addEventListener("click", (e) => {
      let pageNumber = e.target.dataset["pageNumber"];
      fetchdata(pageNumber);
    });
  }
}

//apply filter from here

filterby.addEventListener("change", () => {
  if (filterby.value == "top" || filterby.value == "newest") {
    let newdata = [];
    for (let i = 0; i < 16; i++) {
      newdata.push(alldata[i]);
    }
    displaydata(newdata);
  }
});

//end filter code

setTimeout(function () {
  let producttitle = document.querySelectorAll("p");
  console.log(producttitle);
  for (let i = 0; i < producttitle.length; i++) {
    producttitle[i].addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(alldata[i]));
    });
  }
}, 1000);
