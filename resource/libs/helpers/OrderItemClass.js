const moment = require('moment');
const now = moment().format('YYYY-MM-DD');

const OrderItemClass = function() {
  this.init();
};

OrderItemClass.prototype.set = function(item) {
  const keys = Object.keys(item);
  keys.forEach((key) => {
    if(this[key] !== undefined) {
      this[key] = item[key];
    }    
  });
};

OrderItemClass.prototype.updateTotalPrice = function() {
  this.total_price = this.price * this.total_price;
}

OrderItemClass.prototype.reset = function(item) {
  this.init();
};

OrderItemClass.prototype.init = function() {
  this.id = -100;
  this.order_id = 0;
  this.external_product_id = 0;
  this.product_id = 0;
  this.product_code = '';
  this.product_name = '';
  this.is_delivered = false;
  this.price = 0;
  this.unit_price = 0;
  this.delivery_date = now;
  this.total_unit = 0;
  this.total_price = 0;  
  this.delivery_note_id = '';
  this.quantity_per_bundle = 0;
  this.order_price_category_label = '';
  this.order_price_category_unit = 0;
  this.contracted_price_category_label = '';
  this.contracted_price_category_unit = 0; 
  this.internal_price_category_list = [];
};

exports.OrderItemClass = OrderItemClass;