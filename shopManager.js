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
import {
  initialUsers,
  initialProducts,
  SHOP_SETTINGS,
} from "./data/mockData.js";

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
 */
function calculateSubtotal(cart) {
  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.price * item.quantity;
  }
  return subtotal;
}

/**
 * Helper Function #3: calculateDiscount
 * @param {Array} cart - Array of product objects in the cart
 * @param {number} discountRate - The percentage discount (e.g., 0.10 for 10%)
 * @returns {number} Total monetary discount amount applied
 */
function calculateDiscount(
  cart,
  discountRate = SHOP_SETTINGS.discountPercentage,
) {
  let discountTotal = 0;
  for (const item of cart) {
    if (item.appliesDiscount) {
      discountTotal += item.price * item.quantity * discountRate;
    }
  }
  return discountTotal;
}

/**
 * Helper Function #4: displayCartItems
 * @param {Array} cart - Array of product objects in the cart
 */
function displayCartItems(cart) {
  if (cart.length === 0) {
    console.log("Cart is empty");
    return;
  }

  for (const item of cart) {
    console.log(`
        - Item name: ${item.name}
        - Unit price: $${item.price}
        - Quantity: ${item.quantity}
        - Item subtotal: $${item.price * item.quantity}`);
  }
}
