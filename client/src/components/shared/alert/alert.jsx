import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';

const SkAlert = (props) => {
  return (
    <div>      
      <Alert color="success" className="skAlert" isOpen={props.isAlerts}>
      	<h4 className="alert-heading">{props.message}</h4>
      	<p>
      		To view the detail, please click <Link to={props.link_to} className="alert-link">here</Link>
      	</p>          
      </Alert>      
    </div>
  );
}

export default SkAlert;