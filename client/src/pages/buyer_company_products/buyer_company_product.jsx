import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
// import BuyerCompanyProductForm from './buyer_company_shipping_address_form.jsx';
import SkModal from '../../components/shared/modal/skModal.jsx';
const base_url = config.base_url;

class BuyerCompanyProduct extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            toGoback: false,
            id: null,
            product_id: null,
            internal_product_code: null,
            internal_product_name: null,
            external_price: null,
            external_unit_type: null,
            external_code: null,
            external_name: null,
            external_purchase_price_category_label: null,
            external_purchase_price_category_unit: null,
            external_contract_price_category_label: null,
            external_contract_price_category_unit: null,
            internal_price_category_list: [],
            buyer_company_name: '',
            buyer_company_id: null,		
            backToPage: '',
            errorModal: false,
            errorMessage: 'Please make sure you fill up the external product name and code'
        }
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);
        this.update = this.update.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.get = this.get.bind(this);
    }

    componentDidMount() {
        const buyer_company_id = this.props.params.params.buyer_company_id;
        const id = this.props.params.params.id;        
        this.get(buyer_company_id, id);
        // this.setState({backToPage: this.props.skState.apis['GET'], buyer_company_id: buyer_company_id});
    }

    get(buyer_company_id, id) {
      const api_base = `${this.props.skState.apis['PARENT_GET']}`
      const backToPage = `${api_base}/${buyer_company_id}${this.props.skState.apis['UPDATE']}`
      const api_url = `${base_url+api_base}/${buyer_company_id}.json`;      
      const product_api_url = `${base_url+backToPage}/${id}.json`
      const _this = this;
      axios.get(api_url)
        .then((res) => {
          _this.setState({
            buyer_company_name: res.data.name,
            buyer_company_id: res.data.id,
            backToPage: backToPage
          });
        })
        .catch((err) => {
          console.log(err);
        })

      axios.get(product_api_url)
      .then((res) => {
        _this.setState({
            id: res.data.id,
            product_id: res.data.product_id,
            internal_product_code: res.data.internal_product_code,
            internal_product_name: res.data.internal_product_name,
            external_price: res.data.external_price,
            external_unit_type: res.data.external_unit_type,
            external_code: res.data.external_code,
            external_name: res.data.external_name,
            external_purchase_price_category_label: res.data.external_purchase_price_category_label,
            external_purchase_price_category_unit: res.data.external_purchase_price_category_unit,
            external_contract_price_category_label: res.data.external_contract_price_category_label,
            external_contract_price_category_unit: res.data.external_contract_price_category_unit,
            internal_price_category_list: res.data.internal_price_category_list,
        });
      })
      .catch((err) => {
        console.log(err);
      })      
    }		

    updateState(newState) {
        const name = newState.name;
        const value = newState.value;
        this.setState({[name]: value});
    }

    submit() {		
        if (this.state.external_code.length === 0 || this.state.external_name.length === 0) {
            this.setState({errorModal: true});
            console.log('invalid...');
        } else {
            this.update();
        }
    }

    update() {	
        const _this = this;    
        const new_api_base = `${base_url+this.state.backToPage}.json`;		
        const data = this.state;
        axios.put(new_api_base, data)
        .then((res) => {
            _this.setState({toGoback: true});
            // redirect back
        })
        .catch((err) => {
            console.log(err);
            // show error using the modal..
        })
    }

    modalToggle(){
        const errorModal = !this.state.errorModal;
        this.setState({errorModal: errorModal});
    }

    render() {
        if (this.state.toGoback === true) {
            return <Redirect to={this.state.backToPage} />
        }				
        return (
            <div>
                <SkModal 
                    modal={this.state.errorModal} 
                    className={'error'} 
                    toggle={this.modalToggle}
                    modalTitle={'Error'}
                    message={this.state.errorMessage}
                    closeBtnLabel={'OK'}/>
                <Dashheader subtitle={'Product edit'} title={this.state.buyer_company_name}/>
            </div>
        )
    }

}

export default BuyerCompanyProduct;	