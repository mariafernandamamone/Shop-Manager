/**
 * ============================================================================
 * PROJECT: Shop Manager CLI System
 * DESCRIPTION:
 * A store management application built using 2D arrays (matrices) and classic
 * loops (i, j) in Node.js.
 * ============================================================================
 */

// ============================================================================
// 1. DATA MATRICES & GLOBAL VARIABLES
// ============================================================================

// PRODUCTS MATRIX
// Rows: Products
// Columns: [0: ID, 1: Name, 2: Price, 3: AppliesDiscount]
let products = [
  [1, "Notebook Lenobo S400", 100, true],
  [2, "Celular Notorola G51", 35, false],
  [3, "TV Filips 43", 80, true],
  [4, "Auriculares Sorny", 15, false],
];

// USERS/CLIENTS MATRIX
// Rows: Clients
// Columns: [0: ID, 1: Name, 2: Email, 3: Phone]
let users = [
  [101, "María Mamone", "maria@email.com", "1122334455"],
  [102, "Juan Pérez", "juan@email.com", "1166778899"],
  [103, "Ana Gómez", "ana@email.com", "1144556677"],
];

// SHOPPING CART MATRIX (Initially empty)
// Rows: Items in cart
// Columns: [0: ID, 1: Name, 2: Price, 3: AppliesDiscount, 4: Quantity]
let shoppingCart = [];

// STORE SETTINGS ARRAY
// Indices: [0: Discount Rate (10%), 1: Discount Code]
let shopSettings = [0.1, "DESCUENTO10"];

// ============================================================================
// HELPER FUNCTIONS (UTILITY & CALCULATIONS)
// ============================================================================

/**
 * Helper Function #1: countTotalProducts
 * Column 4 is Quantity -> cart[i][4]
 */
function countTotalProducts(cart) {
  let totalUnits = 0;
  for (let i = 0; i < cart.length; i++) {
    totalUnits += cart[i][4];
  }
  return totalUnits;
}

/**
 * Helper Function #2: calculateSubtotal
 * Column 2 is Price -> cart[i][2]
 * Column 4 is Quantity -> cart[i][4]
 */
function calculateSubtotal(cart) {
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let price = cart[i][2];
    let quantity = cart[i][4];
    subtotal += price * quantity;
  }
  return subtotal;
}

/**
 * Helper Function #3: calculateDiscount
 * Column 2 is Price -> cart[i][2]
 * Column 3 is AppliesDiscount (boolean) -> cart[i][3]
 * Column 4 is Quantity -> cart[i][4]
 */
function calculateDiscount(cart, discountRate = shopSettings[0]) {
  let discountTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let appliesDiscount = cart[i][3];
    if (appliesDiscount === true) {
      let price = cart[i][2];
      let quantity = cart[i][4];
      discountTotal += price * quantity * discountRate;
    }
  }
  return discountTotal;
}

/**
 * Helper Function #4: displayCartItems
 * Reads each row i and logs columns 1, 2, and 4
 */
function displayCartItems(cart) {
  if (cart.length === 0) {
    console.log("Cart is empty");
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    let name = cart[i][1];
    let price = cart[i][2];
    let quantity = cart[i][4];
    let itemSubtotal = price * quantity;

    console.log(
      `- Product: ${name} | Price: $${price} | Quantity: ${quantity} | Subtotal: $${itemSubtotal}`,
    );
  }
}

// ============================================================================
// MAIN OPERATIONAL FUNCTIONS
// ============================================================================

/**
 * Main Operational Function #1: addProduct
 * Adds a product to the cart or increments its quantity if already present.
 *
 * @param {Array} cart - Global shopping cart array
 * @param {Array} products - Store product catalog
 * @param {number} productId - ID of the product to add
 * @param {number} quantity - Quantity units requested
 */
function addProduct(cart, products, productId, quantity) {
  // 1. Check if product exists in the catalog
  const catalogProduct = products.find((p) => p.id === productId);

  if (!catalogProduct) {
    console.log(
      `❌ Error: Product with ID ${productId} does not exist in store.`,
    );
    return false;
  }

  // 2. Check if product is already inside the shopping cart
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    // If it exists in cart, increment quantity
    cartItem.quantity += quantity;
    console.log(
      `Updated ${catalogProduct.name} quantity to ${cartItem.quantity}.`,
    );
  } else {
    // If new to cart, create a new object using spread operator
    cart.push({
      ...catalogProduct,
      quantity: quantity,
    });
    console.log(`Added ${quantity}x ${catalogProduct.name} to cart.`);
  }

  return true;
}
