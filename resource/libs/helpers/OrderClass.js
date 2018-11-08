const OrderClass = function() {
  this.init();
};

OrderClass.prototype.set = function(item) {
  const keys = Object.keys(item);
  keys.forEach((key) => {
    if(this[key] !== undefined) {
      this[key] = item[key];
    }    
  });
};

OrderClass.prototype.reset = function(item) {
  this.init();
};

OrderClass.prototype.init = function() {
  this.id = -100;
  this.order_number = 'New Order ##';
  this.company_id = 0;
  this.buyer_company_id = 0;
  this.buyer_company_name = '';
  this.buyer_id = 0;
  this.buyer_name = '';
  this.email = '';
  this.phone_number = '';
  this.total_price = 0;
  this.total_unit = 0;
  this.order_delivery_date = Date.now();
  this.order_date = Date.now();
  this.billing_address = '';
  this.is_per_item_delivery_date = false;
  this.is_delivered = false;
  this.is_paid = false;
  this.invoice_id = 0;
  this.order_items = [];
};


exports.OrderClass = OrderClass;