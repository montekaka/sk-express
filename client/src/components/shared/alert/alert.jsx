import React from 'react';
import { Alert } from 'reactstrap';

const SkAlert = (props) => {
  return (
    <div>
      {props.isAlerts &&  
        <Alert color="success" className="skAlert">
          <h4 className="alert-heading">Well done!</h4>
        </Alert>       
      }
    </div>
  );
}

export default SkAlert;