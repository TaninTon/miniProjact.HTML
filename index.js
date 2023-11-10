let products = [
    {
        id: 1,
        name: "FIGUR MASHIRO V.1 ",
        price: 1150,
        img: "Fixger No game no like/01-1200x1200.jpg",
    },

    {
        id: 2,
        name: "FIGUR MASHIRO V.2",
        price: 1100,
        img: "Fixger No game no like/18cm-Anime-No-Game-No-Life-Figure-Original-Coreful-Shiro-Model-Dolls-Figurine-Pvc-Action-Figure.jpg",
    },

    {
        id: 3,
        name: "FIGUR MASHIRO V.3",
        price: 1200,
        img: "Fixger No game no like/618J11OXIqL._AC_UF894,1000_QL80_.jpg",
    },
    {
        id: 4,
        name: "FIGUR MASHIRO V.4",
        price: 2888,
        img: "Fixger No game no like/e_1675213.jpg",
    },

    {
        id: 5,
        name: "FIGUR MASHIRO V.5",
        price: 2500,
        img: "Fixger No game no like/elp5x6.jpg",
    },

    {
        id: 6,
        name: "FIGUR MASHIRO V.6 ",
        price: 3400,
        img: "Fixger No game no like/gjyzk5.jpg",
    },

    {
        id: 7,
        name: "FIGUR MASHIRO V.7",
        price: 2900,
        img: "Fixger No game no like/182bbf97b47240f6b3a81fb7b741ecc8.jpg",
    },

    {
        id: 8,
        name: "FIGUR MASHIRO V.8",
        price: 20000,
        img: "Fixger No game no like/teeS3GVQ2HQ0M81220211948.jpg",
    },
]
let carts = JSON.parse(localStorage.getItem("cart-local")) || [];
const topElements = document.getElementById("top");
if (topElements) {
    topElements.innerHTML =`
    <div class="nav-container">
        <a href="projact.html">
        <img class="logo" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/lion-fire-logo-design-template-free-89daa14626ac403bd3cf6282036663ff_screen.jpg?ts=1572094154">
        </a>

        <div class="profile">
            <p class="profile-name">Zerotow</p>
            <div class="profile-cart">
            <a href="CART.html">
            <i class="bi bi-basket"></i>
            </a>
            <div class="cartcount">
            ${carts.length}
        </div>
            </div>
                </div>
            </div>
        </div>
    </div>`;
}
const getProducts = (products) => {
    const productListEl =  document.getElementById("products");
    if (productListEl){
        productListEl.innerHTML = null;
    }
    for (const product of products) {
      const divEl = document.createElement("div");
      divEl.className = "product";
      divEl.innerHTML = `<div class="product-items" onclick="detailAlert(${product.id})">
      <img class="product-img" src="${product.img}" alt="">
      <p style="font-size: 1.2rem;">${product.name}</p>
      <p style="font-size: 1rem;">${product.price}THB</p>
  </div>
      `;
  
      if(productListEl)
        productListEl.appendChild(divEl);
    }
  }
getProducts(products)
const detailAlert = (productId) => {
    const product = products.find((p) => p.id === productId);
  
    Swal.fire({
      title: product.name,
      confirmButtonText:"ตกลง",
      html: `
    <div>
      <ul class="list-group">
        <li class="list-group-item"><B>ราคา</B> : ${product.price}</li>
      </ul>
  
      <div class ="add-cart">
        <div class="me-2" >
        <input 
          type="number" 
          value="2" 
          class="form-control" 
          id="cart-input">
  
        </div>
        <div>
        <button type="button" class="btn btn-primary" onclick="addProductToCart(${product.id})">
         <i class="bi bi-cart2"></i> 
         เพิ่มสินค้า
         </button>
        </div>
      </div>
      
    </div>
      `,
      imageUrl: product.img,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };
  const addProductToCart = (productId) =>{
    const product = products.find(p => p.id === productId);
    const cart = {
      id : Math.floor(Math.random() *100000),
      productId : product.id,
      quantity : document.getElementById("cart-input").value
    };
    carts.push(cart)
  
    localStorage.setItem("cart-local" , JSON.stringify(carts));
    getNav();
    Swal.close();
  
  };
  
  const getCart = (carts) => {
    const cartlistEl = document.getElementById("cart-list");
    if(cartlistEl){
      cartlistEl.innerHTML = null;
    }
    for (const cart of carts) {
      
      const product = products.find(p => p.id === cart.productId);
      const trEl = document.createElement("tr");
      trEl.innerHTML = ` 
      <th scope="row">
      <img src="${product.img}" class="img-cart" alt="">
      </th>
  <td>${new Intl.NumberFormat('th-TH').format(product.price)}</td>
  <td >
      <input 
      min="0"
      style="width: 4rem;"
      value=${cart.quantity}
      onchange="onChangeCart(${cart.id})"
      class="form-control"
      type="number"
      id ="cart-input-quantity${cart.id}"
      >
  </td>
  <td>${new Intl.NumberFormat('th-TH').format(cart.quantity * product.price)}</td>
  <td>
    <button type="button" class="btn btn-danger" onclick = "removeCart(${cart.id})">
      <i class="bi bi-archive"></i> 
    </button>
  </td>
    `;
      if(cartlistEl)cartlistEl.appendChild(trEl);
    }
  };
  
  getCart(carts);
  const removeCart = (cartId) => {
    const newCart = carts.filter(c => c.id !== cartId);
    localStorage.setItem("cart-local", JSON.stringify(newCart));
  
    let cartlocal = JSON.parse(localStorage.getItem("cart-local")) || [];
    carts = cartlocal;
    getCart(cartlocal);
  
  };
      
  const onChangeCart = (cartId) => {
    const value = document.getElementById("cart-input-quantity" + cartId).value;
    const cart = carts.find(c => c.id === cartId);
  
    cart.quantity = value;
  
    if(cart.quantity <= 0) removeCart (cartId);
    else{
        localStorage.removeItem("cart-local" , JSON.stringify(cart));
        getCart(carts);
      };
  
    }
    const searchProduct = () => {
        const text = document.getElementById("search-product").value;
        const newProduct = 
        products.filter(p => 
          p.name.toLowerCase().includes(text.toLowerCase()));
      
        getProducts(newProduct);
      };