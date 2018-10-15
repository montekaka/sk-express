import React from 'react';
import { PaginationItem, PaginationLink  } from 'reactstrap';

const SkPaginationItem = (props) => {

  function handleClick() {
    props.handleClickPageNumber(props.pageNum)
  }

	return (
    <PaginationItem active={props.pageNum === props.currentPage}>
      <PaginationLink onClick={handleClick} >
        {props.pageNum}
      </PaginationLink>  
    </PaginationItem>
	)
};

export default SkPaginationItem;