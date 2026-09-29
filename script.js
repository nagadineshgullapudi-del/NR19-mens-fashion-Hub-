const products=[
{id:1,name:"Classic Oversized Tee",cat:"T-Shirts",price:899,old:1299,tag:"BESTSELLER"},
{id:2,name:"Premium Oxford Shirt",cat:"Shirts",price:1499,old:1999,tag:"NEW"},
{id:3,name:"Relaxed Straight Jeans",cat:"Jeans",price:1799,old:2499,tag:"TRENDING"},
{id:4,name:"Signature Bomber Jacket",cat:"Jackets",price:2499,old:3499,tag:"NEW"},
{id:5,name:"NR19 Essential Tee",cat:"T-Shirts",price:799,old:1199,tag:""},
{id:6,name:"Textured Overshirt",cat:"Shirts",price:1599,old:2199,tag:"NEW"},
{id:7,name:"Urban Cargo Jeans",cat:"Jeans",price:1899,old:2699,tag:""},
{id:8,name:"Heavyweight Hoodie",cat:"Hoodies",price:1699,old:2299,tag:"BESTSELLER"}
];
let cart=JSON.parse(localStorage.getItem("nr19cart")||"[]");

const productsEl=document.getElementById("products");
function money(n){return "₹"+n.toLocaleString("en-IN")}
function render(list=products){
 productsEl.innerHTML=list.map(p=>`<article class="product">
 <div class="product-img ${p.cat.slice(0,-1).toLowerCase()}">${p.tag?`<span class="tag">${p.tag}</span>`:""}<button class="quick" onclick="addToCart(${p.id})">ADD TO BAG +</button></div>
 <div class="product-info"><h3>${p.name}</h3><p>${p.cat}</p><div class="price"><b>${money(p.price)} <del>${money(p.old)}</del></b><span class="stars">★★★★★</span></div></div>
 </article>`).join("");
}
document.getElementById("filters").addEventListener("click",e=>{
 if(e.target.tagName!=="BUTTON")return;
 document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
 e.target.classList.add("active");
 const cat=e.target.dataset.cat;
 render(cat==="All"?products:products.filter(p=>p.cat===cat));
});
function addToCart(id){
 const p=products.find(x=>x.id===id); const found=cart.find(x=>x.id===id);
 if(found)found.qty++; else cart.push({...p,qty:1});
 saveCart(); openCart();
}
function saveCart(){localStorage.setItem("nr19cart",JSON.stringify(cart));updateCart()}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<p style="color:#777;padding-top:20px">Your bag is empty. Add something you like.</p>'}
 else box.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><br><small>${x.cat} • Qty ${x.qty}</small></div><div><b>${money(x.price*x.qty)}</b><br><button class="remove" onclick="removeItem(${x.id})">Remove</button></div></div>`).join("");
 document.getElementById("subtotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").style.display="block"}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").style.display="none"}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("searchBtn").onclick=()=>document.getElementById("searchModal").classList.add("open");
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchModal").classList.remove("open");
document.getElementById("searchInput").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 const box=document.getElementById("searchResults");
 box.innerHTML=(q?products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q)):products.slice(0,4)).map(p=>`<div class="search-result"><span>${p.name} · ${p.cat}</span><b>${money(p.price)}</b></div>`).join("");
});
document.querySelector(".checkout").onclick=()=>alert("Demo checkout. Connect a payment gateway before accepting real orders.");
updateCart();render();
