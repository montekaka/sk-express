import React from 'react';
import { Pagination } from 'reactstrap';
import  SkPaginationItem  from './skPaginationItem.jsx';

const SkPagination = (props) => {
  let maxItems = props.totalPage > props.paginationMax ? props.paginationMax : props.totalPage;

  return (
    <Pagination aria-label="Page navigation">
      {
        [...Array(maxItems)].map((x, i) => <SkPaginationItem key={i} 
          pageNum={i+1} 
          currentPage={props.currentPage}
          handleClickPageNumber={props.handleClickPageNumber}/>)
      }
    </Pagination>
  )
};


export default SkPagination;