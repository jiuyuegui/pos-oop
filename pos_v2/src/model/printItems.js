var PrintItems = function(wholeoutputs) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price;
  this.num = num;
  this.favorable = favorable;           //是否促销优惠，为布尔值
}

PrintItems.prototype.getPrintInfo() {
  var sign = this.getSign();
  return (
    this.getTitle + this.getPrintTime() + sign[0] + this.getPayInfo() + sign[0] +
    this.getPromotionInfo() + sign[0] + this.getSummary() + sign[1]
      );
}

PrintItems.prototype.getTitle() {
  return '***<没钱赚商店>购物清单***\n';
}

PrintItems.prototype.getSign() {
  var sign = [
      '----------------------\n',
      '**********************',
      ]
  return sign;
}

PrintItems.prototype.getPrintTime() {

}

PrintItems.prototype.getPayInfo() {
  var shoppingthings = new ShoppingItems(input);

}

PrintItems.prototype.getPromotionInfo() {
  var promotions = loadPromotions();
}

PrintItems.prototype.getSummary() {

}
