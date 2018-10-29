import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import BuyerCompanyShippingAddressForm from './buyer_company_shipping_address_form.jsx';
import SkModal from '../../components/shared/modal/skModal.jsx';
const base_url = config.base_url;

class BuyerCompanyShippingAddressEdit extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            toGoback: false,
            id: null,
            address_1: '',
            fax_number: '',
            phone_number: '',
            buyer_company_name: '',
            buyer_company_id: null,		
            backToPage: '',
            errorModal: false,
            errorMessage: 'Please make sure you fill up the shipping address, phone number, fax number'
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
      const backToPage = `${api_base}/${buyer_company_id}${this.props.skState.apis['UPDATE']}/${id}`
      const api_url = `${base_url+api_base}/${buyer_company_id}.json`;      
      const shipping_address_api_url = `${base_url+backToPage}.json`
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

      axios.get(shipping_address_api_url)
      .then((res) => {
        _this.setState({
          id: res.data.id,
          address_1: res.data.address_1,
          phone_number: res.data.phone_number,
          fax_number: res.data.fax_number
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
        if (this.state.address_1.length === 0 ) {
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
                <Dashheader subtitle={'Buyer new'} title={this.state.buyer_company_name}/>
                <BuyerCompanyShippingAddressForm
                    data={this.state}
                    backToPage={this.state.backToPage} 
                    updateState={this.updateState} 
                    create={this.submit}/>
            </div>
        )
    }

}

export default BuyerCompanyShippingAddressEdit;	