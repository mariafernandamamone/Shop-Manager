/**
 * ============================================================================
 * PROJECT: Shop Manager CLI System
 * DESCRIPTION:
 * A terminal-based shopping cart and user management system built for a Master's
 * portfolio project. Uses 2D array matrices, matrix indices [i][j], primitive
 * types, and classic procedural control flows (loops and conditionals) in Node.js.
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
 * Counts the total quantity of item units stored in the cart.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @returns {number} The total count of item units across all rows.
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
 * Calculates the gross subtotal amount before applying any discounts.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @returns {number} Sum of (Unit Price * Quantity) for all cart items.
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
 * Calculates total monetary savings for eligible cart items.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @param {number} [discountRate=shopSettings[0]] - The percentage rate (e.g., 0.10).
 * @returns {number} Total currency amount saved via discount.
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
 * Logs an itemized list of items in the cart to the terminal.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @returns {void}
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
 * Adds a catalog product to the shopping cart or increases its quantity if already present.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @param {Array<Array>} productCatalog - The 2D store catalog matrix.
 * @param {number} productId - The ID of the item to add.
 * @param {number} quantity - Number of units requested.
 * @returns {boolean} True if successfully added/updated, false if product not found.
 */
function addProduct(cart, productCatalog, productId, quantity) {
  // 1. Search for the product in productCatalog matrix
  let productRow = null;
  for (let i = 0; i < productCatalog.length; i++) {
    if (productCatalog[i][0] === productId) {
      productRow = productCatalog[i];
      break;
    }
  }

  if (productRow === null) {
    console.log("❌ Error: Product ID not found in store catalog.");
    return false;
  }

  // 2. Check if the product is already in the cart matrix
  let foundInCart = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][0] === productId) {
      cart[i][4] += quantity; // Column 4 is Quantity
      foundInCart = true;
      console.log(`Updated ${cart[i][1]} quantity to ${cart[i][4]}.`);
      break;
    }
  }

  // 3. If not in cart, push a new row to the cart matrix
  if (foundInCart === false) {
    cart.push([
      productRow[0], // ID
      productRow[1], // Name
      productRow[2], // Price
      productRow[3], // AppliesDiscount
      quantity, // Quantity
    ]);
    console.log(`Added ${quantity}x ${productRow[1]} to cart.`);
  }

  return true;
}

/**
 * Removes a specific product completely from the shopping cart matrix by its ID.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @param {number} productId - The ID of the item to remove.
 * @returns {boolean} True if removed, false if product was not in cart.
 */
function removeProduct(cart, productId) {
  for (let i = 0; i < cart.length; i++) {
    // Column 0 contains the product ID
    if (cart[i][0] === productId) {
      let removedName = cart[i][1]; // Column 1 contains the product Name
      cart.splice(i, 1); // Deletes 1 row at index i
      console.log(`🗑️ Removed ${removedName} from cart.`);
      return true;
    }
  }

  console.log(`❌ Error: Product with ID ${productId} is not in your cart.`);
  return false;
}

/**
 * Empties all items from the shopping cart matrix.
 *
 * @param {Array<Array>} cart - The 2D shopping cart matrix.
 * @returns {void}
 */
function clearCart(cart) {
  cart.length = 0; // Completely clears the 2D matrix
  console.log("🧹 Shopping cart cleared!");
}

