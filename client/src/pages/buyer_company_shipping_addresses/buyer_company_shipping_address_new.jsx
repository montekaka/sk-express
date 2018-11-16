import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import BuyerCompanyShippingAddressForm from './buyer_company_shipping_address_form.jsx';
import SkModal from '../../components/shared/modal/skModal.jsx';
const base_url = config.base_url;

class BuyerCompanyShippingAddressNew extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            toGoback: false,
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
        this.create = this.create.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.get = this.get.bind(this);
    }

    componentDidMount() {
        const buyer_company_id = this.props.params.params.buyer_company_id;
        this.get(buyer_company_id);
        // this.setState({backToPage: this.props.skState.apis['GET'], buyer_company_id: buyer_company_id});
    }

    get(buyer_company_id) {
      const api_base = `${this.props.skState.apis['PARENT_GET']}`
      this.setState({backToPage: `${api_base}/${buyer_company_id}`});
      const api_url = `${base_url+api_base}/${buyer_company_id}.json`;
      //this.setState({api_base: api_base})
      const _this = this;
      axios.get(api_url)
        .then((res) => {
          _this.setState({
            buyer_company_name: res.data.name,
            buyer_company_id: res.data.buyer_company_id
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
            this.create();
        }
    }

    create() {	
        const _this = this;    
        const new_api_base = `${base_url+this.state.backToPage+this.props.skState.apis['NEW']}.json`;		
        const data = this.state;
        axios.post(new_api_base, data)
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
        if (this.props.isAuthed === false) {
          return <Redirect to={'/'} />
        }                       
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

export default BuyerCompanyShippingAddressNew;	