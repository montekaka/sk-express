import React from 'react';
import OrderProductTable from './../../../../resource/orderProductTable.js';
import TablePagination from './../../components/shared/table-pagination/table-pagination.jsx';


const skState = OrderProductTable.skState;

const OrderProducts = (props) => {

	function handleUpdateTotalItems(totalPage, total) {
		console.log('hi', totalPage, total);
	}

	function handleClickItem(e) {		
		const selectedItem = e['selectedItem'];
		const _newOrderItem = {
			product_code: selectedItem['external_code'] ? selectedItem['external_code'] : '',
			product_name: selectedItem['external_name'] ? selectedItem['external_name'] : '',
			price: selectedItem['external_price'] ? selectedItem['external_price'] : 0,
			unit_price: selectedItem['external_price'] ? selectedItem['external_price'] : 0,
			product_id: selectedItem['product_id'],
			external_product_id: selectedItem['id'],
			order_price_category_label: selectedItem['external_purchase_price_category_label'] ? selectedItem['external_purchase_price_category_label'] : '',
			order_price_category_unit: selectedItem['external_purchase_price_category_unit'] ? selectedItem['external_purchase_price_category_unit']: 0,
			contracted_price_category_label: selectedItem['external_contract_price_category_label'] ? selectedItem['external_contract_price_category_label'] : '',
			contracted_price_category_unit: selectedItem['external_contract_price_category_unit'] ? selectedItem['external_contract_price_category_unit'] : 0,
		}
		props.newOrderItem.set(_newOrderItem);
		props.handleOnClick();
	}


	return (
		<div>
			<TablePagination
				base_url={props.base_url}
				perPage={8}
				skState={skState}
				handleClickItem={handleClickItem}
				handleUpdateTotalItems={handleUpdateTotalItems}
				pageItemsCount={10}
			/>
		</div>
	)
}

export default OrderProducts;