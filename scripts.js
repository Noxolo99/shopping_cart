/** Shop cart functions */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/** Cards for shop */
let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div id="product-id-${id}" class="item">
          <img width="220" src="${img}" height="330" alt="image of a cake">
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>R ${price}</h2>
              <div class="buttons">
                <i onClick="decrement('${id}')" class="bi bi-dash-lg"></i>
                <div id="${id}" class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                <i onClick="increment('${id}')" class="bi bi-plus-lg"></i>
              </div> 
            </div>
          </div>
        </div>`;
    })
    .join(""));
};

generateShop();

/**
 * !Adding and removing items from the cart also updating cart
 */
let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({ id: id, item: 1 });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0) return;

  search.item -= 1;

  update(id);
  basket = basket.filter((x) => x.item !== 0); // Remove item if the quantity is 0
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search && search.item !== undefined) {
    document.getElementById(id).innerHTML = search.item;
  }
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

