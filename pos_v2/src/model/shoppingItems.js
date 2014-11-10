function ShoppingItems(barcode,num) {   //抽象出打印的完整对象
    this.barcode = barcode;
    this.num = num;
};

ShoppingItems.prototype.enrich = function() {
  var allItems = loadAllItems();
  for(var j = 0; j<allItems.length; j++)
    if(this.barcode == allItems[j].barcode) {
      var newitem = {
        barcode : this.barcode,
        name : allItems[j].name,
        num : this.num,
        unit : allItems[j].unit,
        price : allItems[j].price,
        favorable : this.promotion()
      };
      break;
    }
  return newitem;
}

ShoppingItems.prototype.promotion = function() {
  var favor = false;
  var promotions = loadPromotions();
  for(var k = 0; k<promotions[0].barcodes.length; k++)
    if((this.barcode == promotions[0].barcodes[k]) && (this.num >= 2)) {
      favor = true;
      break;
    }
  return favor;
}
