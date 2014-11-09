function PrintItems(inputs) {     //抽象出输入对象，它具有处理自身格式以及构造打印信息等功能
  this.inputs = inputs;
  this.container(input);          //规整输入数据
  this.wholeItems();              //获取完整item
};

PrintItems.prototype.container(inputs) {
    var tidyInputs = {};
    for(var i = 0; i<inputs.length; i++) {
      var n = 1;
      if(/-/g.test(inputs[i])) {
        var index = input.search(Reg);
        n = parseInt(input.substr(index+1,(input.length+1)));
        input[i] = input.substr(0,index);
      }
      var key = inputs[i];
      if(!tidyInputs[key]) {
          tidyInputs[key] = 0;
      }
      tidyInputs[key] += n;
    }
    return tidyInputs;
}

PrintItems.prototype.wholeItems() {
  var inputsObj = this.container(this.inputs);
  var collection = [];
  for(var key in inputsObj) {
    var shoppingitem = new ShoppingItems(key,inputsObj[key]);
    collection.push(shoppingitem.enrich());
  }
  return collection;
}

PrintItems.prototype.getPrintInfo() {
  var sign = this.getSign();
  var title = this.getTitle();
  return (
    title[0] + this.getPrintTime() + sign[0] + this.getPayInfo() + sign[0] + title[1] +
    this.getPromotionInfo() + sign[0] + this.getSummary() + sign[1]
      );
}

PrintItems.prototype.getTitle() {
  var title = ['***<没钱赚商店>购物清单***\n','挥泪赠送商品：\n'];
  return title;
}

PrintItems.prototype.getSign() {
  var sign = [
      '----------------------\n',
      '**********************',
      ]
  return sign;
}

PrintItems.prototype.getPrintTime() {
  var dateDigitToString = function (num) {
      return num < 10 ? '0' + num : num;
  };
  var currentDate = new Date(),
      year = dateDigitToString(currentDate.getFullYear()),
      month = dateDigitToString(currentDate.getMonth() + 1),
      date = dateDigitToString(currentDate.getDate()),
      hour = dateDigitToString(currentDate.getHours()),
      minute = dateDigitToString(currentDate.getMinutes()),
      second = dateDigitToString(currentDate.getSeconds()),
      formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return formattedDateString;
}

PrintItems.prototype.getPayInfo() {
  var items = this.wholeItems();
  var re = '';
  for(var i = 0; i < items.length; i++) {
    re += '名称：' + items[i].name + '，数量：' + items[i].num + items[i].unit + '，单价：' + (items[i].price).fixed(2) + '(元)，小计：' + (this.sum(items[i])).fixed(2) + '(元)\n';
  }
  return re;
}

PrintItems.prototype.getPromotionInfo() {
  var items = this.wholeItems();
  var re = '';
  for(var i = 0; i < items.length; i++) {
    if(items[i].favorable) {
      re += '名称：' + items[i].name + '，数量：' + Math.floor((items[i].num / 3)) + '瓶\n';
    }
  }
  return re;
}

PrintItems.prototype.getSummary() {
  var items = this.wholeItems();
  var re;
  var sum = 0.0 , save = 0.0;
  for(var i = 0; i < items.length; i++) {
    total += items[i].num * items[i].price();
    sum += this.sum(item[i]);
  }
  save = total - sum;
  re = '总计：' + sum + '(元)\n' + '节省：' + save + '(元)\n';
  return re;
}

PrintItems.prototype.sum(item) {
  if(item.favorable) {
    return (item.num - Math.floor(item.num / 3)) * item.price;
  }
}
