function ShoppingItems(barcode,num) {   //抽象出打印的完整对象
    this.barcode = barcode;
    this.num = num;
};

this.prototype.enrich() {
  var allItems = loadAllItems();
  for(var j = 0; j<allItems.length; j++)
    if(this.barcode == allItems[j].barcode) {
       this.name = allItems[j].name;
       this.unit = allItems[j].unit;
       this.price = allItems[j].price;
       this.favorable = this.promotion();
       break;
    }
}

this.prototype.promotion() {
  var favor = false;
  var promotions = loadPromotions();
  for(var k = 0; k<promotions[0].barcodes.length; k++) {
    if((this.barcode == promotions[0].barcodes[k]) && (this.num >= 2)) {
      favor = true;
      break;
    }
  }
  return favor;
}
