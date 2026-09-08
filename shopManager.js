/**
 * ============================================================================
 * PROJECT: Shop Manager CLI System
 * DESCRIPTION:
 * An integrated store management application built with Node.js.
 * This application unifies user management, product inventory browsing, 
 * interactive shopping cart operations, and automated checkout processes 
 * with discount calculations.
 *
 * ARCHITECTURE:
 * - Data Layer: Mock datasets for clients and products (data/mockData.js)
 * - Logic Layer: Functional modular helper and operational functions
 * - Interface Layer: Terminal interaction and menu navigation
 * ============================================================================
 */

// 1. IMPORT MOCK DATA
import { initialUsers, initialProducts, SHOP_SETTINGS } from './data/mockData.js';

// 2. GLOBAL STATE
let users = [...initialUsers];
let products = [...initialProducts];
let shoppingCart = [];

// ============================================================================
// HELPER FUNCTIONS (UTILITY & CALCULATIONS)
// ============================================================================

/**
 * Helper Function #1: countTotalProducts
 * @param {Array} cart - Array of product objects currently in the cart
 * @returns {number} The total count of all unit quantities combined
 * 
 * INSTRUCTIONS:
 * 1. Create a variable initialized to 0 (e.g., let total = 0).
 * 2. Loop through the cart array using a for...of loop.
 * 3. Add each item's quantity property to total (total += item.quantity).
 * 4. Return total.
 */
function countTotalProducts(cart) {
    let total = 0;
    for (const item of cart) {
        total += item.quantity;
    }
    return total;
}

/**
 * Helper Function #2: calculateSubtotal
 * @param {Array} cart - Array of product objects in the cart
 * @returns {number} Total monetary value before any discounts
 * 
 * INSTRUCTIONS:
 * 1. Create a variable initialized to 0 (e.g., let subtotal = 0).
 * 2. Loop through the cart array.
 * 3. Multiply item.price * item.quantity and add it to subtotal.
 * 4. Return subtotal.
 */
function calculateSubtotal(cart) {
  // TODO: Implement logic here
}

/**
 * Helper Function #3: calculateDiscount
 * @param {Array} cart - Array of product objects in the cart
 * @param {number} discountRate - The percentage discount (e.g., 0.10 for 10%)
 * @returns {number} Total monetary discount amount applied
 * 
 * INSTRUCTIONS:
 * 1. Create a variable initialized to 0 (e.g., let discountTotal = 0).
 * 2. Loop through the cart array.
 * 3. IF item.appliesDiscount is true:
 *    calculate (item.price * item.quantity) * discountRate and add to discountTotal.
 * 4. Return discountTotal.
 */
function calculateDiscount(cart, discountRate = SHOP_SETTINGS.discountPercentage) {
  // TODO: Implement logic here
}

/**
 * Helper Function #4: displayCartItems
 * @param {Array} cart - Array of product objects in the cart
 * 
 * INSTRUCTIONS:
 * 1. Check if cart.length === 0. If true, print "Cart is empty" and exit.
 * 2. Loop through cart items using console.log() to print:
 *    - Item name
 *    - Unit price
 *    - Quantity
 *    - Item subtotal (price * quantity)
 */
function displayCartItems(cart) {
  // TODO: Implement logic here
}