import React from 'react';
import { Pagination } from 'reactstrap';
import  SkPaginationItem  from './skPaginationItem.jsx';

const SkPagination = (props) => {

  return (
    <Pagination aria-label="Page navigation example">
      {
        [...Array(10)].map((x, i) => <SkPaginationItem key={i} pageNum={i+1} handleClickPageNumber={props.handleClickPageNumber}/>)
      }
    </Pagination>
  )
};


export default SkPagination;