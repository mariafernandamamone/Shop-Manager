// data/mockData.js

// Preloaded Users (Exercise 2)
export const initialUsers = [
  { id: 0, name: "Carla", phone: "1545628984", email: "carla@gmail.com" },
  { id: 1, name: "Pedro", phone: "1545251245", email: "pedro@gmail.com" },
  { id: 2, name: "Lucas", phone: "1523357849", email: "lucas@gmail.com" },
  { id: 3, name: "Ana", phone: "15789456", email: "ana@gmail.com" }
];

// Preloaded Products (Exercise 3)
export const initialProducts = [
  { id: 1, name: "Notebook Lenobo S400", price: 100, appliesDiscount: true },
  { id: 2, name: "Celular Notorola G51", price: 35, appliesDiscount: false },
  { id: 3, name: "Smart TV Filips 43'", price: 190, appliesDiscount: true },
  { id: 4, name: "Sorny PS 7", price: 215, appliesDiscount: true }
];

// Global Shop Settings (Exercise 1)
export const SHOP_SETTINGS = {
  storeName: "TechStore Online",
  discountCode: "DESCUENTO10",
  discountPercentage: 0.10 // 10% off eligible items
};