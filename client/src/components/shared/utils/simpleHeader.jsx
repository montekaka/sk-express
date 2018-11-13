import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const SimpleHeader = (props) => {
	
	return (
    <div className="simple-header">
      <Row>
        <Col xs="6">
          <h3>{props.pageTitle}</h3>
        </Col>
        <Col xs="6">
          <h3 className="text-right">
            {props.pageName}
          </h3>
        </Col>
      </Row>
      <div className="hr-divider"></div>
    </div>
  );	
}

export default SimpleHeader;