// Shoppinglist.js

class ShoppingList {
    constructor() {
      this.items = [];
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    clear() {
      this.items = [];
    }
  
    getItems() {
      return this.items;
    }
  }
  
  export default ShoppingList;
  