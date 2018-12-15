import React from 'react';
import { Col, Form, FormGroup, Label, ButtonDropdown, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import SimpleDropdownItem  from './simpleDropdownItem.jsx';

const simpleDropdown = (props) => {

  return (
    <Form>
      <FormGroup row>
        <Label for="exampleEmail" sm={1} size="sm">{props.filter.label}</Label>
        <Col sm={2}>
          <UncontrolledButtonDropdown>
            <DropdownToggle caret color="primary">
              {props.filter.selected}
            </DropdownToggle>
            <DropdownMenu>
              {
                props.filter.options.map((option) => <SimpleDropdownItem key={option.id} val={option.val} handleChange={props.handleChange} filterId={props.filterId}/>)
              }
            </DropdownMenu>
          </UncontrolledButtonDropdown>        
        </Col>
      </FormGroup>
    </Form>
  );
}

export default simpleDropdown;