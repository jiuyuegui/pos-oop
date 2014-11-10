function PrintItems(inputs) {     //抽象出输入对象，它具有处理自身格式以及构造打印信息等功能
  this.inputs = inputs;           //注意,若在函数中实现对该静态!数组!变量的赋值再修改,会保存修改结果
};

PrintItems.prototype.container = function() {
    var input = this.inputs;
    var tidyInputs = {};
    for(var i = 0; i < input.length; i++) {
      var n = 1;
      var temp = input[i];        //由于下面某些函数拆开写会多次调用该函数,故这是自己问题,待解决...
      if(input[i].indexOf('-') > 0) {
        n = parseInt((input[i].split('-'))[1]);
        input[i] = (input[i].split('-'))[0];
      }
      var key = input[i];
      if(!tidyInputs[key]) {
          tidyInputs[key] = 0;
      }
      tidyInputs[key] += n;
      input[i] = temp;
    }
    return tidyInputs;
};

PrintItems.prototype.wholeItems = function() {
  var inputsObj = this.container();
  var collection = [];
  for(var key in inputsObj) {   //若是不用hasOwnProperty,forin循环可能会找到原型对象导致遍历次数不确定
    if(inputsObj.hasOwnProperty(key)) {
    var shoppingitem = new ShoppingItems(key,inputsObj[key]);
    collection.push(shoppingitem.enrich());
    }
  }
  return collection;
};

PrintItems.prototype.getPrintInfo = function() {
  var sign = this.getSign();
  var title = this.getTitle();
  return (
    title[0] + this.getPrintTime() + sign[0] + this.getPayInfo() + sign[0] + title[1] +
    this.getPromotionInfo() + sign[0] + this.getSummary() + sign[1]
      );
};

PrintItems.prototype.getTitle = function() {
  var title = ['***<没钱赚商店>购物清单***\n','挥泪赠送商品：\n'];
  return title;
};

PrintItems.prototype.getSign = function() {
  var sign = [
      '----------------------\n',
      '**********************',
      ]
  return sign;
};

PrintItems.prototype.getPrintTime = function(){
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
      formattedDateString = '打印时间：' + year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second + '\n';
  return formattedDateString;
};

PrintItems.prototype.getPayInfo = function() {
  var items = this.wholeItems();
  var re = '';
  for(var i = 0; i < items.length; i++) {
    re += '名称：' + items[i].name + '，数量：' + items[i].num + items[i].unit + '，单价：' + (items[i].price).toFixed(2) + '(元)，小计：' + (this.sum(items[i])).toFixed(2) + '(元)\n';
  }
  return re;
};

PrintItems.prototype.getPromotionInfo = function() {
  var items = this.wholeItems();
  var re = '';
  for(var i = 0; i < items.length; i++) {
    if(items[i].favorable) {
      re += '名称：' + items[i].name + '，数量：' + Math.floor((items[i].num / 3)) + items[i].unit + '\n';
    }
  }
  return re;
};

PrintItems.prototype.getSummary = function() {
  var items = this.wholeItems();
  var re;
  var total = 0.0 , sum = 0.0 , save = 0.0;
  for(var i = 0; i < items.length; i++) {
    total += items[i].num * items[i].price;
    sum += this.sum(items[i]);
  }
  save = total - sum;
  re = '总计：' + sum.toFixed(2) + '(元)\n' + '节省：' + save.toFixed(2) + '(元)\n';
  return re;
};

PrintItems.prototype.sum = function(item) {
  if(item.favorable) {
    return (item.num - Math.floor(item.num / 3)) * item.price;
  }
  else
    return (item.num * item.price);
};
