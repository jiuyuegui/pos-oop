function printInventory(inputs) {
  var shoppingItems = new ShoppingItems(inputs);
  var printitems = new printItems(shoppingItems.wholeOutputs());
  return console.log(printItems.getPrintInfo());
}
